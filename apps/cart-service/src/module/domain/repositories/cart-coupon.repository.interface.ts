import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartCouponEntity } from '../entities/cart-coupon.entity';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';

export interface CartCouponRepository extends BaseRepository<CartCouponEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null>;
  deleteByCartId(cartId: CartIdVO): Promise<void>;
}
