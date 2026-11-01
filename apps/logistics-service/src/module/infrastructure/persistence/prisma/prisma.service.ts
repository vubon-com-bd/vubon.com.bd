/**
 * Logistics Prisma Service (Termux-safe)
 * @module logistics-service/infrastructure/persistence/prisma
 *
 * ⚠️ PRISMA_SKIP_ENGINE_BOOTSTRAP=true → graceful degraded (memory mode)
 * ⚠️ withEngine<T>() wrapper guards ALL repo calls
 * ⚠️ Throws PrismaEngineUnavailableError → PrismaUnavailableFilter → 503
 */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

const ENGINE_UNAVAILABLE_MSG =
  'Prisma engine unavailable on this platform. DB-backed features are degraded.';

export class PrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;
  constructor() {
    super(ENGINE_UNAVAILABLE_MSG);
    this.name = 'PrismaEngineUnavailableError';
  }
}

@Injectable()
export class LogisticsPrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(LogisticsPrismaService.name);
  private engineAvailable = false;
  private readonly client: Record<string, unknown> | null = null;

  constructor() {
    const skip = process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] === 'true';
    if (skip) {
      this.logger.warn('⚠️  PRISMA_SKIP_ENGINE_BOOTSTRAP=true — Prisma disabled');
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('@prisma/client') as {
        PrismaClient: new (opts?: unknown) => Record<string, unknown>;
      };
      this.client = new mod.PrismaClient({
        datasources: {
          db: { url: process.env['DATABASE_URL'] ?? 'postgresql://localhost:5432/vubon' },
        },
      });
      this.engineAvailable = true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`⚠️  Prisma init failed (${msg.slice(0, 100)}) — degraded`);
    }
  }

  async onModuleInit(): Promise<void> {
    if (!this.engineAvailable || !this.client) return;
    try {
      const connect = this.client['$connect'] as (() => Promise<void>) | undefined;
      await connect?.();
      this.logger.log('✅ Logistics Prisma connected');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`⚠️  Prisma connect failed: ${msg.slice(0, 120)}`);
      this.engineAvailable = false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.engineAvailable || !this.client) return;
    try {
      const disconnect = this.client['$disconnect'] as (() => Promise<void>) | undefined;
      await disconnect?.();
    } catch { /* ignore */ }
  }

  async isHealthy(): Promise<boolean> { return this.engineAvailable; }
  isEngineAvailable(): boolean { return this.engineAvailable; }

  async withEngine<TResult>(
    operation: (client: Record<string, unknown>) => Promise<TResult>,
  ): Promise<TResult> {
    if (!this.engineAvailable || !this.client) throw new PrismaEngineUnavailableError();
    return operation(this.client);
  }

  getModel<TDelegate>(name: string): TDelegate {
    if (!this.engineAvailable || !this.client) throw new PrismaEngineUnavailableError();
    const delegate = this.client[name];
    if (!delegate) throw new Error(`Prisma delegate '${name}' not found`);
    return delegate as TDelegate;
  }
}
