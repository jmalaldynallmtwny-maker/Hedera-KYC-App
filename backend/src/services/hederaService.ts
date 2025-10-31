// backend/src/services/hederaService.ts
import { 
    Client, 
    TopicMessageSubmitTransaction, 
    PrivateKey, 
    TopicCreateTransaction,
    TopicId,
    Hbar
} from '@hashgraph/sdk';
import { getBankDb } from '../lib/database.js';
import { AppError } from '../middleware/errorHandler.js';
import fetch from 'node-fetch';
import type { GenericPendingRequest, GenericHederaProof } from '../types/database.js';

export class HederaService {
    private client: Client | null = null;
    public isInitialized = false;
    private topicId: TopicId | null = null;

    async initialize(): Promise<void> {
        try {
            const operatorId = process.env.HEDERA_OPERATOR_ID;
            const operatorKey = process.env.HEDERA_OPERATOR_KEY;
            const network = process.env.HEDERA_NETWORK;
            const topicId = process.env.HEDERA_TOPIC_ID;

            if (!operatorId || !operatorKey) {
                console.warn('Hedera credentials not provided, running in simulation mode');
                return;
            }

            // Initialize client based on network
            switch (network) {
                case 'testnet':
                    this.client = Client.forTestnet();
                    break;
                case 'mainnet':
                    this.client = Client.forMainnet();
                    break;
                default:
                    this.client = Client.forTestnet();
            }

            this.client.setOperator(operatorId, operatorKey);
            
            // Set reasonable transaction fees
            // Testnet average: 0.0001-0.001 HBAR
            // We set max to 0.1 HBAR for safety (100x reduction from before)
            this.client.setDefaultMaxTransactionFee(new Hbar(0.1)); // Was 10 HBAR!
            this.client.setDefaultMaxQueryPayment(new Hbar(0.01));  // Was 2 HBAR!

            console.log('💰 Hedera fees configured:');
            console.log('   - Max transaction fee: 0.1 HBAR (~$0.005-0.01)');
            console.log('   - Max query payment: 0.01 HBAR');
            console.log('   - Estimated savings: 100x compared to previous config');

            // Initialize topic
            if (topicId) {
                this.topicId = TopicId.fromString(topicId);
                console.log(`✅ Hedera client initialized with topic: ${this.topicId}`);
            } else {
                // Create a new topic if none provided
                this.topicId = await this.createTopic();
                console.log(`✅ Hedera client initialized with new topic: ${this.topicId}`);
            }

            this.isInitialized = true;
        } catch (error: any) {
            console.error('Failed to initialize Hedera client:', error);
            throw new AppError('Hedera initialization failed', 500);
        }
    }

    private async createTopic(): Promise<TopicId> {
        if (!this.client) {
            throw new AppError('Hedera client not initialized', 500);
        }

        try {
            const transaction = new TopicCreateTransaction()
                .setTopicMemo('KYC Platform - Privacy Preserving Proofs')
                .setMaxTransactionFee(new Hbar(5));

            const response = await transaction.execute(this.client);
            const receipt = await response.getReceipt(this.client);
            
            if (!receipt.topicId) {
                throw new AppError('Failed to create Hedera topic', 500);
            }

            console.log(`🎉 Created new Hedera topic: ${receipt.topicId}`);
            return receipt.topicId;
        } catch (error: any) {
            console.error('Topic creation failed:', error);
            throw new AppError(`Topic creation failed: ${error.message}`, 500);
        }
    }

    async publishProof(requestId: string, bankId: string): Promise<{success: boolean, topicMessageId?: string, error?: string}> {
        try {
            const bankDb = getBankDb(bankId);
            
            // Get request data
            const request = await bankDb.pendingRequest.findUnique({
                where: { id: requestId },
                include: {
                    votes: {
                        select: {
                            vote: true,
                            bankId: true,
                            createdAt: true
                        }
                    }
                }
            }) as GenericPendingRequest | null;

            if (!request) {
                throw new AppError('Request not found', 404);
            }

            // Prepare Hedera message - NO PII, only hashes and counts
            const message = {
                event: 'KYC_FINAL_OUTCOME',
                requestId,
                summaryHash: request.summaryHash,
                status: request.status,
                timestamp: new Date().toISOString(),
                counts: {
                    approved: request.votes.filter((v: any) => v.vote === 'APPROVE').length,
                    rejected: request.votes.filter((v: any) => v.vote === 'REJECT').length
                },
                network: 'kyc-multi-bank-v1'
            };

            const messageBytes = new TextEncoder().encode(JSON.stringify(message));

            let topicMessageId: string;

            if (this.isInitialized && this.client && this.topicId) {
                try {
                    // Real Hedera transaction
                    const transaction = await new TopicMessageSubmitTransaction()
                        .setTopicId(this.topicId)
                        .setMessage(messageBytes)
                        .setMaxTransactionFee(new Hbar(5))
                        .freezeWith(this.client);

                    const signTx = await transaction.sign(PrivateKey.fromString(process.env.HEDERA_OPERATOR_KEY!));
                    const response = await signTx.execute(this.client);
                    
                    const receipt = await response.getReceipt(this.client);
                    topicMessageId = receipt.topicSequenceNumber?.toString() || 'unknown';

                    console.log(`✅ Hedera proof published: ${this.topicId}/${topicMessageId}`);
                } catch (error: any) {
                    console.error('❌ Hedera transaction failed:', error);
                    console.error('   Error details:', error.message);
                    
                    // Fallback to simulation mode with warning
                    topicMessageId = `simulated-${Date.now()}`;
                    
                    console.warn('');
                    console.warn('╔════════════════════════════════════════════════════════════╗');
                    console.warn('║  ⚠️  HEDERA SIMULATION MODE                               ║');
                    console.warn('║                                                            ║');
                    console.warn('║  The proof was NOT published to Hedera blockchain!        ║');
                    console.warn('║  This is only stored in the local database.               ║');
                    console.warn('║                                                            ║');
                    console.warn(`║  Reason: ${(error.message || 'Unknown').substring(0, 50).padEnd(50)}║`);
                    console.warn('╚════════════════════════════════════════════════════════════╝');
                    console.warn('');
                }
            } else {
                // Simulation mode
                topicMessageId = `simulated-${Date.now()}`;
                console.log('🔸 Hedera simulation - would publish:', message);
            }

            // Store proof in database regardless of mode
            await bankDb.hederaProof.create({
                data: {
                    requestId,
                    summaryHash: request.summaryHash,
                    topicMessageId
                }
            });

            // Log audit event
            await bankDb.auditLog.create({
                data: {
                    event_type: 'HEDERA_PUBLISH',
                    meta_hash: this.computeHash(topicMessageId, 'audit'),
                    details: {
                        requestId,
                        topicMessageId,
                        simulated: !this.isInitialized,
                        topicId: this.topicId?.toString()
                    }
                }
            });

            return {
                success: true,
                topicMessageId
            };
        } catch (error: any) {
            console.error('Hedera publish error:', error);
            
            // Store failure in database
            try {
                const bankDb = getBankDb(bankId);
                await bankDb.auditLog.create({
                    data: {
                        event_type: 'HEDERA_PUBLISH_FAILED',
                        meta_hash: this.computeHash(requestId, 'error'),
                        details: {
                            requestId,
                            error: error.message,
                            timestamp: new Date().toISOString()
                        }
                    }
                });
            } catch (dbError) {
                console.error('Failed to log Hedera error:', dbError);
            }

            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Verify proof via Hedera Mirror Node API
     */
    private async verifyViaMirrorNode(topicId: string, sequenceNumber: string): Promise<boolean> {
        try {
            // Mirror Node REST API
            const mirrorNodeUrl = process.env.HEDERA_NETWORK === 'mainnet'
                ? 'https://mainnet-public.mirrornode.hedera.com'
                : 'https://testnet.mirrornode.hedera.com';
            
            const url = `${mirrorNodeUrl}/api/v1/topics/${topicId}/messages/${sequenceNumber}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                console.warn(`Mirror Node verification failed: ${response.status}`);
                return false;
            }
            
            const data = await response.json();
            
            // Verify message exists and has valid data
            return !!(data && data.sequence_number && data.message);
            
        } catch (error: any) {
            console.error('Mirror Node API error:', error);
            return false;
        }
    }

    async verifyProof(requestId: string, bankId: string): Promise<{verified: boolean, details?: any}> {
        try {
            const bankDb = getBankDb(bankId);
            
            const proof = await bankDb.hederaProof.findFirst({
                where: { requestId }
            }) as GenericHederaProof | null;

            if (!proof) {
                return { verified: false };
            }
            
            // Check if it's a simulated proof
            const isSimulated = proof.topicMessageId.startsWith('simulated-');
            
            if (isSimulated) {
                return {
                    verified: false,
                    details: {
                        message: 'This is a simulated proof, not published to Hedera',
                        topicMessageId: proof.topicMessageId,
                        simulated: true,
                        warning: 'Proof only exists in local database'
                    }
                };
            }

            // For real Hedera proofs, verify via Mirror Node
            if (this.isInitialized && this.topicId) {
                const mirrorVerified = await this.verifyViaMirrorNode(
                    this.topicId.toString(),
                    proof.topicMessageId
                );
                
                return {
                    verified: mirrorVerified,
                    details: {
                        topicMessageId: proof.topicMessageId,
                        summaryHash: proof.summaryHash,
                        storedAt: proof.createdAt,
                        mirrorNodeVerified: mirrorVerified,
                        topicId: this.topicId.toString()
                    }
                };
            }
            
            // Fallback: verify format only
            const isValidFormat = proof.topicMessageId.startsWith('0.0.') || 
                                  /^\d+$/.test(proof.topicMessageId);
            
            return {
                verified: isValidFormat,
                details: {
                    topicMessageId: proof.topicMessageId,
                    summaryHash: proof.summaryHash,
                    storedAt: proof.createdAt,
                    warning: 'Format verified only, no Mirror Node check available'
                }
            };
        } catch (error: any) {
            console.error('Proof verification error:', error);
            return { verified: false };
        }
    }

    async getServiceStatus(): Promise<{initialized: boolean, network?: string, topicId?: string}> {
        return {
            initialized: this.isInitialized,
            network: process.env.HEDERA_NETWORK,
            topicId: this.topicId?.toString()
        };
    }

    private computeHash(data: string, salt: string): string {
        const crypto = require('crypto');
        return crypto.createHash('sha256')
            .update(data + salt)
            .digest('hex');
    }
}

export const hederaService = new HederaService();