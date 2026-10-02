/**
 * Cart Merger Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartMergerEntity } from '../entities/cart-merger.entity.js';
import { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export const CART_MERGER_REPOSITORY = Symbol('CART_MERGER_REPOSITORY');

export interface CartMergerRepository extends BaseRepository<CartMergerEntity, string> {
  findByIdVO(id: CartMergerIdVO): Promise<CartMergerEntity | null>;
  findBySourceCartId(cartId: CartIdVO): Promise<readonly CartMergerEntity[]>;
  findByTargetCartId(cartId: CartIdVO): Promise<readonly CartMergerEntity[]>;
  findLatestByTargetCartId(cartId: CartIdVO): Promise<CartMergerEntity | null>;
  countByTargetCartId(cartId: CartIdVO): Promise<number>;
}
