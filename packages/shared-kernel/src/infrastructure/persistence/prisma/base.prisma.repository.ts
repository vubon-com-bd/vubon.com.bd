/**
 * Base Prisma Repository
 * @module shared-kernel/infrastructure/persistence/prisma
 *
 * Abstract adapter for BaseRepository (from domain) using Prisma।
 */
import type { BaseEntity } from '@vubon/shared-types/common';
import type { BaseRepository } from '../../../domain/base/base.repository.interface';
import type { PrismaService } from './prisma.service';

/**
 * Minimal Prisma transaction-client shape.
 * Actual type comes from @prisma/client when the host app
 * generates its client, but we keep it framework-agnostic here.
 */
export interface PrismaTransactionClient {
  readonly [key: string]: unknown;
}

export abstract class BasePrismaRepository<
  TEntity extends BaseEntity<TId>,
  TId = string,
> implements BaseRepository<TEntity, TId> {
  protected constructor(protected readonly prisma: PrismaService) {}

  abstract findById(id: TId): Promise<TEntity | null>;
  abstract findAll(): Promise<readonly TEntity[]>;
  abstract save(entity: TEntity): Promise<TEntity>;
  abstract delete(id: TId): Promise<void>;

  async exists(id: TId): Promise<boolean> {
    const entity = await this.findById(id);
    return entity !== null;
  }

  /**
   * Runs a function inside a Prisma transaction.
   * The callback receives the transaction client (typed as PrismaTransactionClient).
   */
  protected async transaction<TResult>(
    fn: (tx: PrismaTransactionClient) => Promise<TResult>
  ): Promise<TResult> {
    return this.prisma.$transaction(async (tx: PrismaTransactionClient): Promise<TResult> =>
      fn(tx)
    );
  }
}
