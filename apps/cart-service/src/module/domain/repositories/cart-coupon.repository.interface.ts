/**
 * CartCoupon Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartCouponEntity } from '../entities/cart-coupon.entity.js';

export const CART_COUPON_REPOSITORY = Symbol('CART_COUPON_REPOSITORY');

export interface CartCouponListFilter {
  readonly cartId?: string;
  readonly code?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface CartCouponListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'appliedDiscountAmount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartCouponListFilter;
}

export interface CartCouponPaginationResult {
  readonly items: readonly CartCouponEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartCouponStats {
  readonly total: number;
  readonly totalDiscountGiven: number;
  readonly averageDiscount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface CartCouponRepository extends BaseRepository<CartCouponEntity, string> {
  // Cart-scoped
  findByCartId(cartId: string): Promise<readonly CartCouponEntity[]>;
  findUsableByCartId(cartId: string): Promise<CartCouponEntity | null>;
  existsByCartAndCode(cartId: string, code: string): Promise<boolean>;
  findByCartAndCode(cartId: string, code: string): Promise<CartCouponEntity | null>;

  // Code-scoped
  findByCode(code: string): Promise<readonly CartCouponEntity[]>;

  // Status
  findByStatus(status: string): Promise<readonly CartCouponEntity[]>;
  findExpired(beforeDate: Date): Promise<readonly CartCouponEntity[]>;

  // Pagination + Stats
  findPaginated(options: CartCouponListOptions): Promise<CartCouponPaginationResult>;
  getStats(filter?: CartCouponListFilter): Promise<CartCouponStats>;

  // Bulk
  deleteByCartId(cartId: string): Promise<number>;
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
