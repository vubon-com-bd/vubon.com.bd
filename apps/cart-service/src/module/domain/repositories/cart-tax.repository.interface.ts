import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartTaxEntity } from '../entities/cart-tax.entity';
import { CartTaxIdVO } from '../value-objects/primitives/cart-tax-id.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';

export interface CartTaxRepository extends BaseRepository<CartTaxEntity, CartTaxIdVO> {
  findByCartId(cartId: CartIdVO): Promise<readonly CartTaxEntity[]>;
  deleteByCartId(cartId: CartIdVO): Promise<void>;
}
