import { PrismaClient as CitizensClient } from '../../prisma/src/generated/citizens/index.js';
import { PrismaClient as BayBankClient } from '../../prisma/src/generated/baybank/index.js';
import { PrismaClient as OasisBankClient } from '../../prisma/src/generated/oasisbank/index.js';
import { PrismaClient as ZenBankClient } from '../../prisma/src/generated/zenbank/index.js';
import { PrismaClient as ArcBankClient } from '../../prisma/src/generated/arcbank/index.js';
import { PrismaClient as NexBankClient } from '../../prisma/src/generated/nexbank/index.js';
import { getErrorMessage } from '../utils/typeGuards.js';

// Note: Prisma clients should be generated using: npm run db:generate:all

// ===================================
// Type Definitions
// ===================================

// Union type for all bank database clients
export type BankClient = BayBankClient | OasisBankClient | ZenBankClient | ArcBankClient | NexBankClient;

// Bank ID type for type safety
export type BankId = 'baybank' | 'oasisbank' | 'zenbank' | 'arcbank' | 'nexbank';

// Bank registry type
type BankRegistry = {
  [K in BankId]: BankClient;
};

// ===================================
// Database Client Instances
// ===================================

let citizensPrisma: CitizensClient;
let baybankPrisma: BayBankClient;
let oasisbankPrisma: OasisBankClient;
let zenbankPrisma: ZenBankClient;
let arcbankPrisma: ArcBankClient;
let nexbankPrisma: NexBankClient;

// Strongly-typed bank registry
const bankRegistry: Partial<BankRegistry> = {};

// ===================================
// Database Connection Management
// ===================================

export const connectDatabases = async (): Promise<void> => {
  try {
    console.log('🔌 Connecting to multiple databases...');
    
    type LogLevel = 'info' | 'query' | 'warn' | 'error';
    const logOptions: LogLevel[] = process.env.NODE_ENV === 'development' 
      ? ['error', 'warn'] 
      : ['error'];

    // Connect to citizens database
    citizensPrisma = new CitizensClient({
      log: logOptions
    });
    await citizensPrisma.$connect();
    console.log('✅ Citizens DB connected');

    // Connect to bank databases with type safety
    baybankPrisma = new BayBankClient({ log: logOptions });
    await baybankPrisma.$connect();
    bankRegistry.baybank = baybankPrisma;
    console.log('✅ baybank DB connected');

    oasisbankPrisma = new OasisBankClient({ log: logOptions });
    await oasisbankPrisma.$connect();
    bankRegistry.oasisbank = oasisbankPrisma;
    console.log('✅ oasisbank DB connected');

    zenbankPrisma = new ZenBankClient({ log: logOptions });
    await zenbankPrisma.$connect();
    bankRegistry.zenbank = zenbankPrisma;
    console.log('✅ zenbank DB connected');

    arcbankPrisma = new ArcBankClient({ log: logOptions });
    await arcbankPrisma.$connect();
    bankRegistry.arcbank = arcbankPrisma;
    console.log('✅ arcbank DB connected');

    nexbankPrisma = new NexBankClient({ log: logOptions });
    await nexbankPrisma.$connect();
    bankRegistry.nexbank = nexbankPrisma;
    console.log('✅ nexbank DB connected');

    console.log('🎉 All databases connected successfully');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Database connection error:', message);
    throw new Error(`Failed to connect to databases: ${message}`);
  }
};

// ===================================
// Database Getters
// ===================================

export const getCitizensDb = (): CitizensClient => {
  if (!citizensPrisma) {
    throw new Error('Citizens database not initialized');
  }
  return citizensPrisma;
};

// Generic getter with improved type safety
export const getBankDb = (bankId: string): BankClient => {
  // Validate bank ID
  const validBankIds: BankId[] = ['baybank', 'oasisbank', 'zenbank', 'arcbank', 'nexbank'];
  if (!validBankIds.includes(bankId as BankId)) {
    throw new Error(`Invalid bank ID: ${bankId}. Must be one of: ${validBankIds.join(', ')}`);
  }

  const bankPrisma = bankRegistry[bankId as BankId];
  if (!bankPrisma) {
    throw new Error(`Bank database not initialized: ${bankId}`);
  }
  return bankPrisma;
};

// Individual bank getters for full type safety
export const getBayBankDb = (): BayBankClient => {
  if (!baybankPrisma) throw new Error('BayBank database not initialized');
  return baybankPrisma;
};

export const getOasisBankDb = (): OasisBankClient => {
  if (!oasisbankPrisma) throw new Error('OasisBank database not initialized');
  return oasisbankPrisma;
};

export const getZenBankDb = (): ZenBankClient => {
  if (!zenbankPrisma) throw new Error('ZenBank database not initialized');
  return zenbankPrisma;
};

export const getArcBankDb = (): ArcBankClient => {
  if (!arcbankPrisma) throw new Error('ArcBank database not initialized');
  return arcbankPrisma;
};

export const getNexBankDb = (): NexBankClient => {
  if (!nexbankPrisma) throw new Error('NexBank database not initialized');
  return nexbankPrisma;
};

// Get all bank databases
export const getAllBankDbs = (): Partial<BankRegistry> => {
  return { ...bankRegistry };
};

// Get list of available bank IDs
export const getAvailableBankIds = (): BankId[] => {
  return Object.keys(bankRegistry) as BankId[];
};

// ===================================
// Database Disconnection
// ===================================

export const disconnectDatabases = async (): Promise<void> => {
  try {
    console.log('🔌 Disconnecting databases...');
    
    if (citizensPrisma) {
      await citizensPrisma.$disconnect().catch(err => 
        console.error('Error disconnecting citizens DB:', err)
      );
    }
    
    // Disconnect all bank databases
    const disconnectPromises = Object.entries(bankRegistry).map(([bankId, prisma]) =>
      prisma.$disconnect().catch(err => 
        console.error(`Error disconnecting ${bankId} DB:`, err)
      )
    );
    
    await Promise.all(disconnectPromises);
    
    console.log('✅ All database connections closed');
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('Error disconnecting databases:', message);
  }
};

// ===================================
// Health Check
// ===================================

export interface DatabaseHealth {
  citizens: boolean;
  [key: string]: boolean;
}

export const checkDatabaseHealth = async (): Promise<DatabaseHealth> => {
  const health: DatabaseHealth = { citizens: false };

  // Check citizens database
  try {
    if (citizensPrisma) {
      await citizensPrisma.$queryRaw`SELECT 1`;
      health.citizens = true;
    }
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('Citizens DB health check failed:', message);
    health.citizens = false;
  }

  // Check each bank database
  for (const [bankId, client] of Object.entries(bankRegistry)) {
    try {
      await client.$queryRaw`SELECT 1`;
      health[bankId] = true;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error(`${bankId} DB health check failed:`, message);
      health[bankId] = false;
    }
  }

  return health;
};

// ===================================
// Utility Functions
// ===================================

// Check if a bank ID is valid
export const isValidBankId = (bankId: string): bankId is BankId => {
  return ['baybank', 'oasisbank', 'zenbank', 'arcbank', 'nexbank'].includes(bankId);
};

// Get bank name from ID
export const getBankName = (bankId: BankId): string => {
  const bankNames: Record<BankId, string> = {
    baybank: 'BayBank',
    oasisbank: 'OasisBank',
    zenbank: 'ZenBank',
    arcbank: 'ArcBank',
    nexbank: 'NexBank'
  };
  return bankNames[bankId];
};
