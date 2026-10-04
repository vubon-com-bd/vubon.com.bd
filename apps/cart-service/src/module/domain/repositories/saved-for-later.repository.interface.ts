/**
 * Saved For Later Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SavedForLaterEntity } from '../entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '../value-objects/primitives/saved-item-id.vo.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const SAVED_FOR_LATER_REPOSITORY = Symbol('SAVED_FOR_LATER_REPOSITORY');

export interface SavedListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortDir?: 'asc' | 'desc';
}

export interface SavedPaginationResult {
  readonly items: readonly SavedForLaterEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SavedForLaterRepository
  extends BaseRepository<SavedForLaterEntity, string> {
  findByIdVO(id: SavedItemIdVO): Promise<SavedForLaterEntity | null>;
  findByUserId(userId: CartUserIdVO): Promise<readonly SavedForLaterEntity[]>;
  findByProduct(
    userId: CartUserIdVO,
    productId: CartProductIdVO,
    variantId?: string,
  ): Promise<SavedForLaterEntity | null>;
  findActiveByUserId(userId: CartUserIdVO): Promise<readonly SavedForLaterEntity[]>;
  findPaginated(
    userId: CartUserIdVO,
    options: SavedListOptions,
  ): Promise<SavedPaginationResult>;
  countByUserId(userId: CartUserIdVO): Promise<number>;
}
