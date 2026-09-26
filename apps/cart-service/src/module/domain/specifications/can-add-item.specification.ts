import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CartEntity } from '../entities/cart.entity';

export class CanAddItemSpecification extends Specification<CartEntity> {
  isSatisfiedBy(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    return cart.status.value === 'active';
  }
}
