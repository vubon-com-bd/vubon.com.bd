import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartVoucherEntity } from '../entities/cart-voucher.entity';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';

export interface CartVoucherRepository extends BaseRepository<CartVoucherEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartVoucherEntity | null>;
  deleteByCartId(cartId: CartIdVO): Promise<void>;
}
