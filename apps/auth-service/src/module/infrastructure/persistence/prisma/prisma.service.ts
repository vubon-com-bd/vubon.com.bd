/**
 * Prisma service for database connection management
 * Wraps Prisma client as a NestJS service for the authentication module
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

import { databaseConfig } from '../../config/database.config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: databaseConfig.url,
        },
      },
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /**
   * Execute a transaction with Prisma
   */
  async transaction<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return this.$transaction(async (prisma) => {
      return callback(prisma);
    });
  }

  /**
   * Execute a transaction with isolation level
   */
  async transactionWithIsolation<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>,
    isolationLevel: Prisma.TransactionIsolationLevel = 'ReadCommitted'
  ): Promise<T> {
    return this.$transaction(
      async (prisma) => {
        return callback(prisma);
      },
      {
        isolationLevel,
      }
    );
  }

  /**
   * Execute a batch transaction
   */
  async batchTransaction<T>(
    operations: Array<(prisma: Prisma.TransactionClient) => Promise<T>>
  ): Promise<T[]> {
    return this.$transaction(async (prisma) => {
      const results: T[] = [];
      for (const operation of operations) {
        const result = await operation(prisma);
        results.push(result);
      }
      return results;
    });
  }

  /**
   * Check if database is connected
   */
  async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get database health status
   */
  async getHealthStatus(): Promise<{
    connected: boolean;
    latency: number;
    version: string | null;
  }> {
    const start = Date.now();
    try {
      const result = await this.$queryRaw<Array<{ version: string }>>`SELECT version()`;
      const latency = Date.now() - start;
      return {
        connected: true,
        latency,
        version: result[0]?.version || null,
      };
    } catch {
      return {
        connected: false,
        latency: Date.now() - start,
        version: null,
      };
    }
  }

  /**
   * Get database statistics
   */
  async getStatistics(): Promise<{
    totalConnections: number;
    activeConnections: number;
    idleConnections: number;
    waitingConnections: number;
  }> {
    try {
      const result = await this.$queryRaw<Array<{
        total: number;
        active: number;
        idle: number;
        waiting: number;
      }>>`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE state = 'active') as active,
          COUNT(*) FILTER (WHERE state = 'idle') as idle,
          COUNT(*) FILTER (WHERE state = 'idle in transaction') as waiting
        FROM pg_stat_activity
        WHERE datname = current_database()
      `;

      return {
        totalConnections: Number(result[0]?.total) || 0,
        activeConnections: Number(result[0]?.active) || 0,
        idleConnections: Number(result[0]?.idle) || 0,
        waitingConnections: Number(result[0]?.waiting) || 0,
      };
    } catch {
      return {
        totalConnections: 0,
        activeConnections: 0,
        idleConnections: 0,
        waitingConnections: 0,
      };
    }
  }

  /**
   * Reset database connection pool
   */
  async resetPool(): Promise<void> {
    await this.$disconnect();
    await this.$connect();
  }

  /**
   * Create a new Prisma client instance for a specific schema
   */
  withSchema(schema: string): PrismaClient {
    return new PrismaClient({
      datasources: {
        db: {
          url: `${databaseConfig.url}?schema=${schema}`,
        },
      },
    });
  }

  /**
   * Execute raw SQL query
   */
  async executeRaw<T = unknown>(query: string, params?: unknown[]): Promise<T> {
    void params;
    return this.$executeRaw`${Prisma.raw(query)}` as Promise<T>;
  }

  /**
   * Execute raw SQL query and return results
   */
  async queryRaw<T = unknown>(query: string, params?: unknown[]): Promise<T> {
    void params;
    return this.$queryRaw`${Prisma.raw(query)}` as Promise<T>;
  }
}

export class PrismaServiceFactory {
  public static create(): PrismaService {
    return new PrismaService();
  }
}

export const prismaServiceProvider = {
  provide: PrismaService,
  useClass: PrismaService,
};

export default PrismaService;
