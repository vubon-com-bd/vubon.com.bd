/**
 * CartTax Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartTaxEntity } from '../entities/cart-tax.entity.js';

export const CART_TAX_REPOSITORY = Symbol('CART_TAX_REPOSITORY');

export interface CartTaxListFilter {
  readonly cartId?: string;
  readonly label?: string;
  readonly inclusive?: boolean;
  readonly minRate?: number;
  readonly maxRate?: number;
}

export interface CartTaxListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'taxAmount' | 'rate';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartTaxListFilter;
}

export interface CartTaxPaginationResult {
  readonly items: readonly CartTaxEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartTaxStats {
  readonly total: number;
  readonly totalTaxAmount: number;
  readonly averageRate: number;
  readonly inclusiveCount: number;
  readonly exclusiveCount: number;
}

export interface CartTaxRepository extends BaseRepository<CartTaxEntity, string> {
  findByCartId(cartId: string): Promise<readonly CartTaxEntity[]>;
  findInclusiveByCartId(cartId: string): Promise<readonly CartTaxEntity[]>;
  findExclusiveByCartId(cartId: string): Promise<readonly CartTaxEntity[]>;

  findPaginated(options: CartTaxListOptions): Promise<CartTaxPaginationResult>;
  getStats(filter?: CartTaxListFilter): Promise<CartTaxStats>;

  // Bulk
  deleteByCartId(cartId: string): Promise<number>;
  recalculateByCartId(cartId: string, baseAmount: number): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
