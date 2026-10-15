/**
 * GuestCart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { GuestCartEntity } from '../entities/guest-cart.entity.js';
import type { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo.js';

export const GUEST_CART_REPOSITORY = Symbol('GUEST_CART_REPOSITORY');

export interface GuestCartListFilter {
  readonly cartId?: string;
  readonly status?: string;
  readonly minItemCount?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface GuestCartListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'itemCount' | 'expiresAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: GuestCartListFilter;
}

export interface GuestCartPaginationResult {
  readonly items: readonly GuestCartEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface GuestCartStats {
  readonly total: number;
  readonly activeCount: number;
  readonly mergedCount: number;
  readonly abandonedCount: number;
  readonly averageItemCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface GuestCartRepository extends BaseRepository<GuestCartEntity, string> {
  findByIdVO(id: GuestCartIdVO): Promise<GuestCartEntity | null>;

  findByToken(token: string): Promise<GuestCartEntity | null>;
  findByCartId(cartId: string): Promise<GuestCartEntity | null>;
  findByStatus(status: string): Promise<readonly GuestCartEntity[]>;

  // Cron-support queries
  findExpired(beforeDate: Date): Promise<readonly GuestCartEntity[]>;
  findMergable(): Promise<readonly GuestCartEntity[]>;
  findStaleAbandonable(inactiveHours: number): Promise<readonly GuestCartEntity[]>;

  findPaginated(options: GuestCartListOptions): Promise<GuestCartPaginationResult>;
  getStats(filter?: GuestCartListFilter): Promise<GuestCartStats>;

  // Bulk
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;
}
