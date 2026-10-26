/**
 * Notification Base Prisma Repository
 * @module notification-service/infrastructure/persistence/prisma
 *
 * ⚠️ Kernel PrismaService extends PrismaClient — all model delegates
 * (this.prisma.notification, this.prisma.notificationTemplate, etc.)
 * are directly accessible.
 *
 * ⚠️ NOTE on PrismaTransactionClient:
 *   Kernel exports it from `repositories/` subfolder, but its root barrel
 *   `@vubon/shared-kernel/infrastructure/persistence/prisma` does NOT re-export
 *   it (barrel only exports `repositories/base.prisma.repository.js` which
 *   lacks this type). So we re-declare the same structural type here.
 */
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export { PrismaService };

/**
 * Re-export kernel BasePrismaRepository (from repositories subfolder).
 */
export { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

/**
 * Prisma Transaction Client — structural type (same as kernel root file).
 * Kernel's barrel doesn't re-export this, so we declare it here.
 */
export interface PrismaTransactionClient {
  readonly [key: string]: unknown;
}

/**
 * Generic Prisma delegate shape for type-safe repository access.
 */
export interface PrismaDelegate<TModel> {
  findUnique(args: unknown): Promise<TModel | null>;
  findFirst(args?: unknown): Promise<TModel | null>;
  findMany(args?: unknown): Promise<TModel[]>;
  create(args: unknown): Promise<TModel>;
  update(args: unknown): Promise<TModel>;
  delete(args: unknown): Promise<TModel>;
  deleteMany(args?: unknown): Promise<{ count: number }>;
  updateMany(args: unknown): Promise<{ count: number }>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<unknown>;
  groupBy(args: unknown): Promise<unknown[]>;
}

/**
 * Notification Base Prisma Repository — inherited by all notification repos.
 */
export abstract class NotificationBasePrismaRepository {
  constructor(protected readonly prisma: PrismaService) {}

  /**
   * Access typed Prisma model delegate.
   */
  protected model<TModel>(name: string): PrismaDelegate<TModel> {
    return (this.prisma as unknown as Record<string, PrismaDelegate<TModel>>)[name];
  }

  /**
   * Check engine availability (Termux-safe).
   */
  protected isEngineAvailable(): boolean {
    return this.prisma.isEngineAvailable();
  }

  /**
   * Assert engine available.
   */
  protected assertEngine(): void {
    if (!this.isEngineAvailable()) {
      throw new PrismaEngineUnavailableError();
    }
  }
}


/**
 * PrismaEngineUnavailableError
 * @module notification-service/infrastructure/persistence/prisma
 *
 * Thrown when Prisma engine cannot bootstrap (e.g., Termux ARM64 glibc mismatch)।
 * Repository operations should be skipped or degraded।
 */
export class PrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;

  constructor() {
    super(
      'Prisma engine is not available on this platform (Termux ARM64) — DB operations disabled',
    );
    this.name = 'PrismaEngineUnavailableError';
  }
}
