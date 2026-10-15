/**
 * AbandonedCart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AbandonedCartEntity } from '../entities/abandoned-cart.entity.js';
import type { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo.js';

export const ABANDONED_CART_REPOSITORY = Symbol('ABANDONED_CART_REPOSITORY');

export interface AbandonedCartListFilter {
  readonly userId?: string;
  readonly cartId?: string;
  readonly status?: string;
  readonly minCartValue?: number;
  readonly maxCartValue?: number;
  readonly minReminders?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface AbandonedCartListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'abandonedAt' | 'cartValue';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AbandonedCartListFilter;
}

export interface AbandonedCartPaginationResult {
  readonly items: readonly AbandonedCartEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface AbandonedCartStats {
  readonly total: number;
  readonly totalValue: number;
  readonly averageValue: number;
  readonly recoveredCount: number;
  readonly recoveryRate: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface AbandonedCartRepository
  extends BaseRepository<AbandonedCartEntity, string> {
  findByIdVO(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null>;

  findByCartId(cartId: string): Promise<AbandonedCartEntity | null>;
  findByUserId(userId: string): Promise<readonly AbandonedCartEntity[]>;
  findByStatus(status: string): Promise<readonly AbandonedCartEntity[]>;

  // Cron-support queries
  findPendingReminders(maxReminders: number): Promise<readonly AbandonedCartEntity[]>;
  findLostCandidates(olderThanDays: number): Promise<readonly AbandonedCartEntity[]>;
  findRecoverable(): Promise<readonly AbandonedCartEntity[]>;
  findRecovered(): Promise<readonly AbandonedCartEntity[]>;

  findPaginated(
    options: AbandonedCartListOptions,
  ): Promise<AbandonedCartPaginationResult>;
  getStats(filter?: AbandonedCartListFilter): Promise<AbandonedCartStats>;

  // Bulk
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
