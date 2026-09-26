import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartItemEntity } from '../entities/cart-item.entity';
import { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface CartItemRepository extends BaseRepository<CartItemEntity, CartItemIdVO> {
  findByCartId(cartId: CartIdVO): Promise<readonly CartItemEntity[]>;
  findByProduct(cartId: CartIdVO, productId: ProductIdVO): Promise<CartItemEntity | null>;
  deleteByCartId(cartId: CartIdVO): Promise<void>;
}
