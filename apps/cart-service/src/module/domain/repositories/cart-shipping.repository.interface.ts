import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartShippingEntity } from '../entities/cart-shipping.entity';
import { CartShippingIdVO } from '../value-objects/primitives/cart-shipping-id.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';

export interface CartShippingRepository extends BaseRepository<CartShippingEntity, CartShippingIdVO> {
  findByCartId(cartId: CartIdVO): Promise<CartShippingEntity | null>;
  deleteByCartId(cartId: CartIdVO): Promise<void>;
}
