import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AbandonedCartEntity } from '../entities/abandoned-cart.entity';

export class CanRecoverSpecification extends Specification<AbandonedCartEntity> {
  isSatisfiedBy(cart: AbandonedCartEntity): boolean {
    if (cart.recoveredAt !== null) return false;
    if (cart.itemCount === 0) return false;
    return cart.status.value === 'abandoned';
  }
}
