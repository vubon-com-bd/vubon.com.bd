/**
 * Prisma service for database connection management
 * Wraps Prisma client as a NestJS service for the authentication module using composition
 */

import { Injectable, type OnModuleInit, type OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { databaseConfig } from '../../config/database.config';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly prismaClient: PrismaClient;

  constructor() {
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
    });
  }

  public get client(): PrismaClient {
    return this.prismaClient;
  }

  public async onModuleInit(): Promise<void> {
    await this.prismaClient.$connect();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  /**
   * Check if database is connected
   */
  public async isConnected(): Promise<boolean> {
    try {
      await this.prismaClient.$queryRaw`SELECT 1`;
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
      const result = (await this.prismaClient.$queryRaw`SELECT version()`) as Array<{ version: string }>;
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
    await this.prismaClient.$disconnect();
    await this.prismaClient.$connect();
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
