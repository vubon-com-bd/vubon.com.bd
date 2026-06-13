/**
 * Prisma Client Configuration
 * 
 * @module prisma/prisma.config
 * 
 * @description
 * Prisma ORM client configuration with connection pooling,
 * logging, and graceful shutdown.
 * 
 * Enterprise Rules:
 * ✅ Pure infrastructure - No business logic
 * ✅ Singleton pattern for hot reload
 * ✅ Connection pooling for performance
 * ✅ Graceful shutdown handling
 */

import { PrismaClient, Prisma } from '@prisma/client';

// ============================================================
// Types
// ============================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ============================================================
// Logging Configuration
// ============================================================

const getLogLevels = (): Prisma.LogLevel[] => {
  const isDev = process.env.NODE_ENV === 'development';
  const isTest = process.env.NODE_ENV === 'test';
  
  if (isTest) {
    return ['error']; // Minimal logging in tests
  }
  
  if (isDev) {
    return ['query', 'info', 'warn', 'error'];
  }
  
  return ['error', 'warn']; // Production: only errors and warnings
};

// ============================================================
// Slow Query Detection
// ============================================================

let queryCount = 0;

const logQuery = (query: string, params: string, duration: number) => {
  queryCount++;
  
  if (duration > 1000) {
    console.warn(`⚠️ Slow query (${duration}ms): ${query}`);
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Query #${queryCount}: ${duration}ms`);
  }
};

// ============================================================
// Prisma Client Factory
// ============================================================

const createPrismaClient = (): PrismaClient => {
  const client = new PrismaClient({
    log: getLogLevels(),
    errorFormat: 'pretty',
    
    // Connection pool configuration
    // @ts-ignore - Connection pool config (Prisma 5.x)
    connection: {
      pool: {
        min: parseInt(process.env.DB_POOL_MIN || '2', 10),
        max: parseInt(process.env.DB_POOL_MAX || '10', 10),
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
        acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000', 10),
      },
    },
  });
  
  // Query logging middleware (for slow query detection)
  if (process.env.NODE_ENV !== 'production' || process.env.DB_LOGGING_ENABLED === 'true') {
    client.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;
      
      // Log query details
      if (process.env.NODE_ENV === 'development' || duration > 1000) {
        logQuery(params.model ? `${params.model}.${params.action}` : params.action, JSON.stringify(params.args), duration);
      }
      
      return result;
    });
  }
  
  // Error handling
  client.$on('error' as never, (error: any) => {
    console.error('Prisma Client Error:', error);
  });
  
  return client;
};

// ============================================================
// Singleton Instance
// ============================================================

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Prevent multiple instances in development (for hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// ============================================================
// Graceful Shutdown
// ============================================================

const disconnectPrisma = async () => {
  console.log('🛑 Disconnecting Prisma...');
  await prisma.$disconnect();
  console.log('✅ Prisma disconnected');
};

// Handle graceful shutdown signals
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM');
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT');
  await disconnectPrisma();
  process.exit(0);
});

// Handle beforeExit for tests
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// ============================================================
// Health Check Helper
// ============================================================

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

// ============================================================
// Transaction Helper
// ============================================================

export const runInTransaction = async <T>(
  callback: (tx: PrismaClient) => Promise<T>,
): Promise<T> => {
  return prisma.$transaction(callback);
};

// ============================================================
// Query Helpers
// ============================================================

export const paginate = <T>(
  items: T[],
  page: number,
  limit: number,
): { items: T[]; total: number; page: number; limit: number; totalPages: number } => {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    items: items.slice(start, end),
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit),
  };
};

export default prisma;
