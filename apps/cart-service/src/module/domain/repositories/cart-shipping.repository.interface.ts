/**
 * CartShipping Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartShippingEntity } from '../entities/cart-shipping.entity.js';

export const CART_SHIPPING_REPOSITORY = Symbol('CART_SHIPPING_REPOSITORY');

export interface CartShippingListFilter {
  readonly cartId?: string;
  readonly method?: string;
  readonly minCost?: number;
  readonly maxCost?: number;
  readonly hasAddress?: boolean;
}

export interface CartShippingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'cost' | 'estimatedDays';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartShippingListFilter;
}

export interface CartShippingPaginationResult {
  readonly items: readonly CartShippingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartShippingStats {
  readonly total: number;
  readonly totalCost: number;
  readonly averageCost: number;
  readonly byMethod: Readonly<Record<string, number>>;
}

export interface CartShippingRepository extends BaseRepository<CartShippingEntity, string> {
  findByCartId(cartId: string): Promise<CartShippingEntity | null>;
  findByMethod(method: string): Promise<readonly CartShippingEntity[]>;
  findWithoutAddress(): Promise<readonly CartShippingEntity[]>;
  findWithAddress(): Promise<readonly CartShippingEntity[]>;

  findPaginated(options: CartShippingListOptions): Promise<CartShippingPaginationResult>;
  getStats(filter?: CartShippingListFilter): Promise<CartShippingStats>;

  // Bulk
  deleteByCartId(cartId: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
