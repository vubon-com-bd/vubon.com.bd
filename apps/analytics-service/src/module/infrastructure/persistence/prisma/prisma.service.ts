/**
 * Analytics Prisma Service (NestJS injectable)
 * @module analytics-service/infrastructure/persistence/prisma
 *
 * Termux/Android এ Prisma native engine (glibc-linked x86_64/ARM64) চলে না
 * কারণ Termux Bionic libc ব্যবহার করে। তাই graceful degraded mode:
 *   - PRISMA_SKIP_ENGINE_BOOTSTRAP=true হলে Prisma instantiate করি না
 *   - `isEngineAvailable()` false returns
 *   - Repository calls `PrismaEngineUnavailableError` throw করে
 *
 * Production (Ubuntu/Debian linux) এ PRISMA_SKIP_ENGINE_BOOTSTRAP unset থাকলে
 * full Prisma functionality কাজ করবে।
 */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

const ENGINE_UNAVAILABLE_MESSAGE =
  'Prisma engine unavailable on this platform. ' +
  'Database-backed analytics features are degraded.';

export class PrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;

  constructor() {
    super(ENGINE_UNAVAILABLE_MESSAGE);
    this.name = 'PrismaEngineUnavailableError';
  }
}

@Injectable()
export class AnalyticsPrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AnalyticsPrismaService.name);
  private engineAvailable = false;
  private readonly client: Record<string, unknown> | null = null;

  constructor() {
    const skip = process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] === 'true';
    if (skip) {
      this.logger.warn(
        '⚠️ PRISMA_SKIP_ENGINE_BOOTSTRAP=true — Prisma disabled (degraded mode)',
      );
      this.engineAvailable = false;
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('@prisma/client') as {
        PrismaClient: new (opts?: unknown) => Record<string, unknown>;
      };
      this.client = new mod.PrismaClient({
        datasources: {
          db: {
            url:
              process.env['ANALYTICS_DATABASE_URL'] ??
              process.env['DATABASE_URL'] ??
              'postgresql://localhost:5432/vubon',
          },
        },
      });
      this.engineAvailable = true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(
        `⚠️ Prisma init failed (${msg.slice(0, 100)}) — degraded mode`,
      );
      this.engineAvailable = false;
    }
  }

  async onModuleInit(): Promise<void> {
    if (!this.engineAvailable || !this.client) return;
    try {
      const connect = this.client['$connect'] as (() => Promise<void>) | undefined;
      await connect?.();
      this.logger.log('✅ Analytics Prisma connected');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`⚠️ Prisma connect failed: ${msg.slice(0, 120)}`);
      this.engineAvailable = false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.engineAvailable || !this.client) return;
    try {
      const disconnect = this.client['$disconnect'] as (() => Promise<void>) | undefined;
      await disconnect?.();
    } catch {
      /* ignore */
    }
  }

  async isHealthy(): Promise<boolean> {
    return this.engineAvailable;
  }

  isEngineAvailable(): boolean {
    return this.engineAvailable;
  }

  /**
   * Wraps a Prisma delegate call. Throws PrismaEngineUnavailableError if
   * engine is unavailable. All repositories should call this.
   */
  async withEngine<TResult>(
    operation: (client: Record<string, unknown>) => Promise<TResult>
  ): Promise<TResult> {
    if (!this.engineAvailable || !this.client) {
      throw new PrismaEngineUnavailableError();
    }
    return operation(this.client);
  }

  /**
   * Accessor for Prisma model delegates. Returns the delegate or throws
   * PrismaEngineUnavailableError when engine is off.
   */
  getModel<TDelegate>(name: string): TDelegate {
    if (!this.engineAvailable || !this.client) {
      throw new PrismaEngineUnavailableError();
    }
    const delegate = this.client[name];
    if (!delegate) {
      throw new Error(`Prisma delegate '${name}' not found`);
    }
    return delegate as TDelegate;
  }
}
