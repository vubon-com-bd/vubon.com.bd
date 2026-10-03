/**
 * Cart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartEntity } from '../entities/cart.entity.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { CartSessionIdVO } from '../value-objects/primitives/session-id.vo.js';

export const CART_REPOSITORY = Symbol('CART_REPOSITORY');

export interface CartListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly hasItems?: boolean;
  readonly expired?: boolean;
}

export interface CartListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastActivityAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartListFilter;
}

export interface CartPaginationResult {
  readonly items: readonly CartEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CartRepository extends BaseRepository<CartEntity, string> {
  findByIdVO(id: CartIdVO): Promise<CartEntity | null>;
  findByUserId(userId: CartUserIdVO): Promise<CartEntity | null>;
  findBySessionId(sessionId: CartSessionIdVO): Promise<CartEntity | null>;
  findActiveByUserId(userId: CartUserIdVO): Promise<CartEntity | null>;
  findAllByUserId(userId: CartUserIdVO): Promise<readonly CartEntity[]>;
  findExpired(before: string): Promise<readonly CartEntity[]>;
  findInactive(since: string): Promise<readonly CartEntity[]>;
  findPaginated(options: CartListOptions): Promise<CartPaginationResult>;
  countByUserId(userId: CartUserIdVO): Promise<number>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
