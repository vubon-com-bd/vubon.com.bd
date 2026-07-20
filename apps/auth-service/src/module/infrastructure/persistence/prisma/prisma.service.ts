/**
 * Prisma service for database connection management
 * Wraps Prisma client as a NestJS service for the authentication module
 */

import { Injectable, type OnModuleInit, type OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { databaseConfig } from '../../config/database.config';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly prismaClient: PrismaClient;

  constructor() {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: databaseConfig.url,
        },
      },
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
      errorFormat: 'pretty',
    }) as unknown as PrismaClient;
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
  }

  public get client(): PrismaClient {
    return this.prismaClient;
  }

  public async onModuleInit(): Promise<void> {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    await (this.prismaClient as unknown as { $connect: () => Promise<void> }).$connect();
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  }

  public async onModuleDestroy(): Promise<void> {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    await (this.prismaClient as unknown as { $disconnect: () => Promise<void> }).$disconnect();
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  }

  /**
   * Check if database is connected
   */
  public async isConnected(): Promise<boolean> {
    try {
      /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
      await (this.prismaClient as unknown as { $queryRaw: (query: TemplateStringsArray) => Promise<unknown> }).$queryRaw`SELECT 1`;
      /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get database health status
   */
  public async getHealthStatus(): Promise<{
    connected: boolean;
    latency: number;
    version: string | null;
  }> {
    const start = Date.now();
    try {
      /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
      const result = (await (this.prismaClient as unknown as { 
        $queryRaw: (query: TemplateStringsArray) => Promise<unknown> 
      }).$queryRaw`SELECT version()`) as Array<{ version: string }>;
      /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
      const latency = Date.now() - start;
      return {
        connected: true,
        latency,
        version: result[0]?.version ?? null,
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
   * Reset database connection pool
   */
  public async resetPool(): Promise<void> {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    const client = this.prismaClient as unknown as { 
      $disconnect: () => Promise<void>; 
      $connect: () => Promise<void>; 
    };
    await client.$disconnect();
    await client.$connect();
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
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
