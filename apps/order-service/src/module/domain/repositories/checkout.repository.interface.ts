/**
 * Checkout Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CheckoutEntity } from '../entities/checkout.entity.js';
import type { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo.js';

// ─── DI Token ──────────────────────────────
export const CHECKOUT_REPOSITORY = Symbol('CHECKOUT_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface CheckoutListFilter {
  readonly customerId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── List Options ──────────────────────────
export interface CheckoutListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CheckoutListFilter;
}

// ─── Pagination Result ─────────────────────
export interface CheckoutPaginationResult {
  readonly items: readonly CheckoutEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Main Interface ────────────────────────
export interface CheckoutRepository extends BaseRepository<CheckoutEntity, string> {
  findByIdVO(id: CheckoutIdVO): Promise<CheckoutEntity | null>;
  findByCustomer(customerId: string): Promise<readonly CheckoutEntity[]>;
  findByStatus(status: string): Promise<readonly CheckoutEntity[]>;
  findPaginated(options: CheckoutListOptions): Promise<CheckoutPaginationResult>;
  findExpired(olderThanMinutes: number): Promise<readonly CheckoutEntity[]>;
  findAbandoned(olderThanMinutes: number): Promise<readonly CheckoutEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
