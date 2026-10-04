/**
 * Cart Item Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartItemEntity } from '../entities/cart-item.entity.js';
import { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const CART_ITEM_REPOSITORY = Symbol('CART_ITEM_REPOSITORY');

export interface CartItemRepository extends BaseRepository<CartItemEntity, string> {
  findByIdVO(id: CartItemIdVO): Promise<CartItemEntity | null>;
  findByCartId(cartId: CartIdVO): Promise<readonly CartItemEntity[]>;
  findByProduct(
    cartId: CartIdVO,
    productId: CartProductIdVO,
    variantId?: string,
  ): Promise<CartItemEntity | null>;
  findAvailableByCartId(cartId: CartIdVO): Promise<readonly CartItemEntity[]>;
  findUnavailableByCartId(cartId: CartIdVO): Promise<readonly CartItemEntity[]>;
  countByCartId(cartId: CartIdVO): Promise<number>;
  deleteByCartId(cartId: CartIdVO): Promise<number>;
  markRemoved(id: string): Promise<void>;
}
