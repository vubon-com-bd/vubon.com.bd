/**
 * Abandoned Cart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AbandonedCartEntity } from '../entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '../value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const ABANDONED_CART_REPOSITORY = Symbol('ABANDONED_CART_REPOSITORY');

export interface AbandonedListOptions {
  readonly page: number;
  readonly limit: number;
  readonly status?: string;
  readonly minCartValue?: number;
  readonly sortDir?: 'asc' | 'desc';
}

export interface AbandonedPaginationResult {
  readonly items: readonly AbandonedCartEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface AbandonedStats {
  readonly total: number;
  readonly pending: number;
  readonly reminded: number;
  readonly recovered: number;
  readonly lost: number;
  readonly recoveryRate: number;
  readonly averageCartValue: number;
}

export interface AbandonedCartRepository
  extends BaseRepository<AbandonedCartEntity, string> {
  findByIdVO(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null>;
  findByCartId(cartId: CartIdVO): Promise<AbandonedCartEntity | null>;
  findByUserId(userId: CartUserIdVO): Promise<readonly AbandonedCartEntity[]>;
  findPending(): Promise<readonly AbandonedCartEntity[]>;
  findReadyForReminder(): Promise<readonly AbandonedCartEntity[]>;
  findPaginated(options: AbandonedListOptions): Promise<AbandonedPaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<AbandonedStats>;
  countByStatus(status: string): Promise<number>;
}
