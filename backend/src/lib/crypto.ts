// backend/src/lib/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

export interface EncryptionResult {
  encrypted: string;
  iv: string;
  tag: string;
}

export interface DecryptionResult {
  decrypted: string;
}

export class CryptoService {
  private static algorithm = 'aes-256-gcm';
  private static key: Buffer;

  static initialize(): void {
    // Verify AES_KEY
    if (!process.env.AES_KEY || process.env.AES_KEY === 'CHANGE_THIS_IN_PRODUCTION') {
      console.error('');
      console.error('╔════════════════════════════════════════════════════════════╗');
      console.error('║  ❌ FATAL ERROR: AES_KEY not configured!                  ║');
      console.error('║                                                            ║');
      console.error('║  The encryption key is required for secure operations.    ║');
      console.error('║  Running without proper encryption is a SECURITY RISK!    ║');
      console.error('║                                                            ║');
      console.error('║  To fix this:                                              ║');
      console.error('║  1. Run: bash scripts/generate-secrets.sh                 ║');
      console.error('║  2. Check that .env file has proper AES_KEY value         ║');
      console.error('║  3. Restart the application                                ║');
      console.error('╚════════════════════════════════════════════════════════════╝');
      console.error('');
      process.exit(1); // EXIT IMMEDIATELY
    }

    // Verify NNI_SALT
    if (!process.env.NNI_SALT || process.env.NNI_SALT === 'CHANGE_THIS_IN_PRODUCTION') {
      console.error('');
      console.error('╔════════════════════════════════════════════════════════════╗');
      console.error('║  ❌ FATAL ERROR: NNI_SALT not configured!                 ║');
      console.error('║                                                            ║');
      console.error('║  The NNI salt is required for hashing citizen IDs.        ║');
      console.error('║                                                            ║');
      console.error('║  To fix this:                                              ║');
      console.error('║  1. Run: bash scripts/generate-secrets.sh                 ║');
      console.error('║  2. Check that .env file has proper NNI_SALT value        ║');
      console.error('║  3. Restart the application                                ║');
      console.error('╚════════════════════════════════════════════════════════════╝');
      console.error('');
      process.exit(1); // EXIT IMMEDIATELY
    }

    // Derive secure key
    const salt = process.env.NNI_SALT;
    this.key = createHash('sha256')
      .update(String(process.env.AES_KEY))
      .update(salt)
      .digest();
    
    console.log('✅ Crypto service initialized with secure keys');
    console.log(`   - Algorithm: ${this.algorithm}`);
    console.log(`   - Key length: ${this.key.length * 8} bits`);
  }

  static encrypt(text: string): EncryptionResult {
    if (!this.key) {
      this.initialize();
    }

    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const tag = (cipher as any).getAuthTag() as Buffer;

    return {
      encrypted,
      iv: iv.toString('base64'),
      tag: tag.toString('base64')
    };
  }

  static decrypt(encryptedData: EncryptionResult): string {
    if (!this.key) {
      this.initialize();
    }

    const iv = Buffer.from(encryptedData.iv, 'base64');
    const tag = Buffer.from(encryptedData.tag, 'base64');
    const encrypted = Buffer.from(encryptedData.encrypted, 'base64');

    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    (decipher as any).setAuthTag(tag);

    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  static encryptStatusToken(payload: object): string {
    const text = JSON.stringify(payload);
    const result = this.encrypt(text);

    return Buffer.from(
      JSON.stringify({
        iv: result.iv,
        tag: result.tag,
        data: result.encrypted
      })
    ).toString('base64');
  }

  static decryptStatusToken(token: string): any {
    try {
      const tokenData = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
      const decrypted = this.decrypt({
        encrypted: tokenData.data,
        iv: tokenData.iv,
        tag: tokenData.tag
      });

      return JSON.parse(decrypted);
    } catch (error: unknown) {
      throw new Error('Invalid or expired status token');
    }
  }

  static hashNNI(nni: string): string {
    const salt = process.env.NNI_SALT || 'default-salt';
    return createHash('sha256')
      .update(nni + salt)
      .digest('hex');
  }

  static generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  static computeSummaryHash(payload: any, salt: string): string {
    const canonicalJson = JSON.stringify(payload, Object.keys(payload || {}).sort());
    return createHash('sha256')
      .update(canonicalJson + salt)
      .digest('hex');
  }
}

// Initialize on module load
CryptoService.initialize();

// Export helpers
export const encrypt = (text: string) => CryptoService.encrypt(text);
export const decrypt = (data: EncryptionResult) => CryptoService.decrypt(data);
export const encryptStatusToken = (payload: object) => CryptoService.encryptStatusToken(payload);
export const decryptStatusToken = (token: string) => CryptoService.decryptStatusToken(token);
export const hashNNI = (nni: string) => CryptoService.hashNNI(nni);
export const generateSalt = () => CryptoService.generateSalt();
export const computeSummaryHash = (payload: any, salt: string) => CryptoService.computeSummaryHash(payload, salt);
