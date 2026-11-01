/**
 * SavedForLater Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SavedForLaterEntity } from '../entities/saved-for-later.entity.js';
import type { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo.js';

export const SAVED_FOR_LATER_REPOSITORY = Symbol('SAVED_FOR_LATER_REPOSITORY');

export interface SavedForLaterListFilter {
  readonly userId?: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface SavedForLaterListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'savedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SavedForLaterListFilter;
}

export interface SavedForLaterPaginationResult {
  readonly items: readonly SavedForLaterEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SavedForLaterStats {
  readonly total: number;
  readonly activeCount: number;
  readonly movedCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface SavedForLaterRepository
  extends BaseRepository<SavedForLaterEntity, string> {
  findByIdVO(id: SavedItemIdVO): Promise<SavedForLaterEntity | null>;

  findByUserId(userId: string): Promise<readonly SavedForLaterEntity[]>;
  findActiveByUserId(userId: string): Promise<readonly SavedForLaterEntity[]>;
  findByUserAndProduct(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<SavedForLaterEntity | null>;
  existsForUser(userId: string, productId: string, variantId?: string): Promise<boolean>;

  findByStatus(status: string): Promise<readonly SavedForLaterEntity[]>;
  findMovedToCart(): Promise<readonly SavedForLaterEntity[]>;

  findPaginated(
    options: SavedForLaterListOptions,
  ): Promise<SavedForLaterPaginationResult>;
  getStats(filter?: SavedForLaterListFilter): Promise<SavedForLaterStats>;

  // Cron
  findStale(inactiveDays: number): Promise<readonly SavedForLaterEntity[]>;
  findPurgeable(olderThanDays: number): Promise<readonly SavedForLaterEntity[]>;

  // Bulk
  deleteByUserId(userId: string): Promise<number>;
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
