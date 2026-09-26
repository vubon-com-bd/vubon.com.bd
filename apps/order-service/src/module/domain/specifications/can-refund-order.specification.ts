import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { OrderEntity } from '../entities/order.entity';

export class CanRefundOrderSpecification extends Specification<OrderEntity> {
  isSatisfiedBy(candidate: OrderEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (!candidate.paymentId) return false;
    return ['cancelled', 'returned'].includes(candidate.status.value);
  }
}
