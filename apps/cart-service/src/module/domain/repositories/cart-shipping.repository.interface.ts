/**
 * Cart Shipping Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartShippingEntity } from '../entities/cart-shipping.entity.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export const CART_SHIPPING_REPOSITORY = Symbol('CART_SHIPPING_REPOSITORY');

export interface CartShippingRepository
  extends BaseRepository<CartShippingEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartShippingEntity | null>;
  findByAddressId(addressId: string): Promise<readonly CartShippingEntity[]>;
  upsertForCart(
    cartId: CartIdVO,
    entity: CartShippingEntity,
  ): Promise<CartShippingEntity>;
  deleteByCartId(cartId: CartIdVO): Promise<number>;
}
