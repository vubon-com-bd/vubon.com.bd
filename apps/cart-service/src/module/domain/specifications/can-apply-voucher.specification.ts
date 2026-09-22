import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CartEntity } from '../entities/cart.entity';

export class CanApplyVoucherSpecification extends Specification<CartEntity> {
  isSatisfiedBy(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    if (cart.status.value !== 'active') return false;
    if (cart.subtotal <= 0) return false;
    return true;
  }
}
