/**
 * CartItem Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartItemEntity } from '../entities/cart-item.entity.js';
import type { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo.js';

export const CART_ITEM_REPOSITORY = Symbol('CART_ITEM_REPOSITORY');

export interface CartItemListFilter {
  readonly cartId?: string;
  readonly productId?: string;
  readonly variantId?: string;
  readonly status?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface CartItemListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'unitPrice' | 'quantity';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartItemListFilter;
}

export interface CartItemPaginationResult {
  readonly items: readonly CartItemEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartItemStats {
  readonly total: number;
  readonly totalQuantity: number;
  readonly totalValue: number;
  readonly averageUnitPrice: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface CartItemRepository extends BaseRepository<CartItemEntity, string> {
  findByIdVO(id: CartItemIdVO): Promise<CartItemEntity | null>;

  // Cart-scoped
  findByCartId(cartId: string): Promise<readonly CartItemEntity[]>;
  findActiveByCartId(cartId: string): Promise<readonly CartItemEntity[]>;
  countByCartId(cartId: string): Promise<number>;

  // Product-scoped
  findByProductId(productId: string): Promise<readonly CartItemEntity[]>;
  findInCartByProduct(
    cartId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItemEntity | null>;
  existsInCart(cartId: string, productId: string, variantId?: string): Promise<boolean>;

  // Status
  findByStatus(status: string): Promise<readonly CartItemEntity[]>;
  findUnavailableItems(): Promise<readonly CartItemEntity[]>;

  // Pagination + Stats
  findPaginated(options: CartItemListOptions): Promise<CartItemPaginationResult>;
  getStats(filter?: CartItemListFilter): Promise<CartItemStats>;

  // Cron
  findStale(inactiveMinutes: number): Promise<readonly CartItemEntity[]>;

  // Bulk
  deleteByCartId(cartId: string): Promise<number>;
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
