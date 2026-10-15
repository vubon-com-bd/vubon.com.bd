/**
 * CartVoucher Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartVoucherEntity } from '../entities/cart-voucher.entity.js';

export const CART_VOUCHER_REPOSITORY = Symbol('CART_VOUCHER_REPOSITORY');

export interface CartVoucherListFilter {
  readonly cartId?: string;
  readonly code?: string;
  readonly status?: string;
  readonly minRemaining?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface CartVoucherListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'remainingAmount' | 'appliedAmount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartVoucherListFilter;
}

export interface CartVoucherPaginationResult {
  readonly items: readonly CartVoucherEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartVoucherStats {
  readonly total: number;
  readonly totalApplied: number;
  readonly totalRemaining: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface CartVoucherRepository extends BaseRepository<CartVoucherEntity, string> {
  // Cart-scoped
  findByCartId(cartId: string): Promise<readonly CartVoucherEntity[]>;
  findUsableByCartId(cartId: string): Promise<CartVoucherEntity | null>;
  existsByCartAndCode(cartId: string, code: string): Promise<boolean>;
  findByCartAndCode(cartId: string, code: string): Promise<CartVoucherEntity | null>;

  // Code-scoped
  findByCode(code: string): Promise<readonly CartVoucherEntity[]>;

  // Status
  findByStatus(status: string): Promise<readonly CartVoucherEntity[]>;
  findExpired(beforeDate: Date): Promise<readonly CartVoucherEntity[]>;

  // Pagination + Stats
  findPaginated(options: CartVoucherListOptions): Promise<CartVoucherPaginationResult>;
  getStats(filter?: CartVoucherListFilter): Promise<CartVoucherStats>;

  // Bulk
  deleteByCartId(cartId: string): Promise<number>;
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
