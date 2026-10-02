/**
 * Cart Coupon Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartCouponEntity } from '../entities/cart-coupon.entity.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export const CART_COUPON_REPOSITORY = Symbol('CART_COUPON_REPOSITORY');

export interface CartCouponRepository extends BaseRepository<CartCouponEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null>;
  findByCode(cartId: CartIdVO, code: string): Promise<CartCouponEntity | null>;
  findActiveByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null>;
  existsByCartId(cartId: CartIdVO): Promise<boolean>;
  deleteByCartId(cartId: CartIdVO): Promise<number>;
}
