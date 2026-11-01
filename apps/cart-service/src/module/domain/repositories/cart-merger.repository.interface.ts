/**
 * CartMerger Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartMergerEntity } from '../entities/cart-merger.entity.js';
import type { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo.js';

export const CART_MERGER_REPOSITORY = Symbol('CART_MERGER_REPOSITORY');

export interface CartMergerListFilter {
  readonly sourceCartId?: string;
  readonly targetCartId?: string;
  readonly strategy?: string;
  readonly completed?: boolean;
  readonly failed?: boolean;
  readonly hasConflicts?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface CartMergerListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'mergedAt' | 'itemsMerged' | 'conflicts';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartMergerListFilter;
}

export interface CartMergerPaginationResult {
  readonly items: readonly CartMergerEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartMergerStats {
  readonly total: number;
  readonly completedCount: number;
  readonly failedCount: number;
  readonly totalItemsMerged: number;
  readonly totalConflicts: number;
  readonly successRate: number;
  readonly byStrategy: Readonly<Record<string, number>>;
}

export interface CartMergerRepository extends BaseRepository<CartMergerEntity, string> {
  findByIdVO(id: CartMergerIdVO): Promise<CartMergerEntity | null>;

  findBySourceCartId(sourceCartId: string): Promise<readonly CartMergerEntity[]>;
  findByTargetCartId(targetCartId: string): Promise<readonly CartMergerEntity[]>;
  findByCartId(cartId: string): Promise<readonly CartMergerEntity[]>;

  findCompleted(): Promise<readonly CartMergerEntity[]>;
  findFailed(): Promise<readonly CartMergerEntity[]>;
  findWithConflicts(): Promise<readonly CartMergerEntity[]>;
  findIncomplete(): Promise<readonly CartMergerEntity[]>;

  findPaginated(options: CartMergerListOptions): Promise<CartMergerPaginationResult>;
  getStats(filter?: CartMergerListFilter): Promise<CartMergerStats>;

  // Cron-support queries
  findStale(inactiveMinutes: number): Promise<readonly CartMergerEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
