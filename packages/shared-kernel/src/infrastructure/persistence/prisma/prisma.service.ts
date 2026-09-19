/**
 * Prisma Service (NestJS injectable)
 * @module shared-kernel/infrastructure/persistence/prisma
 *
 * Values আসে shared-config/infrastructure/database থেকে।
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_CONFIG } from '@vubon/shared-config/infrastructure';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: DATABASE_CONFIG.url,
        },
      },
      log: DATABASE_CONFIG.logging
        ? ((['query', 'info', 'warn', 'error'] as const).slice() as (
            'query' | 'info' | 'warn' | 'error'
          )[])
        : ((['warn', 'error'] as const).slice() as ('warn' | 'error')[]),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /**
   * Health check — returns true if DB responds
   */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
