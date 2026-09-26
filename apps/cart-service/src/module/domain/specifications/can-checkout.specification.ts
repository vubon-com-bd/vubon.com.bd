import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CartEntity } from '../entities/cart.entity';

export class CanCheckoutSpecification extends Specification<CartEntity> {
  isSatisfiedBy(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    if (cart.isEmpty) return false;
    if (cart.status.value !== 'active') return false;
    return cart.grandTotal > 0;
  }
}
