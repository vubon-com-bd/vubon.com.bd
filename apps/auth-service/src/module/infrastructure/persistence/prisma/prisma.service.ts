/**
 * Prisma service for database connection management
 * Wraps Prisma client as a NestJS service for the authentication module
 */

import { Injectable, type OnModuleInit, type OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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

  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  public async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  public async getHealthStatus(): Promise<{
    connected: boolean;
    latency: number;
    version: string | null;
  }> {
    const start = Date.now();
    try {
      const result = (await this.$queryRaw`SELECT version()`) as Array<{ version: string }>;
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

  public async resetPool(): Promise<void> {
    await this.$disconnect();
    await this.$connect();
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
