import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { OrderEntity } from '../entities/order.entity';

export class CanDeliverOrderSpecification extends Specification<OrderEntity> {
  isSatisfiedBy(candidate: OrderEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.status.value === 'shipped';
  }
}
