/**
 * Prisma Service (NestJS injectable)
 * @module shared-kernel/infrastructure/persistence/prisma
 *
 * Gracefully degrades when the native engine cannot load (e.g. Termux ARM64).
 * In that case `$connect()` is skipped and the client is marked unhealthy.
 */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_CONFIG } from '@vubon/shared-config/infrastructure';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private engineAvailable = true;

  constructor() {
    super({
      datasources: {
        db: { url: DATABASE_CONFIG.url },
      },
      log: DATABASE_CONFIG.logging
        ? (['query', 'info', 'warn', 'error'] as ('query' | 'info' | 'warn' | 'error')[])
        : (['warn', 'error'] as ('warn' | 'error')[]),
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('✅ Prisma connected to database');
    } catch (err) {
      this.engineAvailable = false;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `⚠️ Prisma connection skipped (engine unavailable in this environment): ${msg.slice(0, 120)}`,
      );
      this.logger.warn(
        '⚠️ Auth service will start WITHOUT database — endpoints will return 503 until a compatible engine is available.',
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.engineAvailable) return;
    try {
      await this.$disconnect();
    } catch {
      /* ignore */
    }
  }

  async isHealthy(): Promise<boolean> {
    if (!this.engineAvailable) return false;
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  isEngineAvailable(): boolean {
    return this.engineAvailable;
  }
}
