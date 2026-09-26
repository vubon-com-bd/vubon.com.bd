import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { CartEntity } from '../entities/cart.entity';

export class CanSaveForLaterSpecification extends Specification<CartEntity> {
  isSatisfiedBy(cart: CartEntity): boolean {
    if (cart.isDeleted()) return false;
    return cart.itemCount > 0;
  }
}
