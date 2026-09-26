import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { OrderEntity } from '../entities/order.entity';
import { OrderCancelPolicyService } from '../services/order-cancel-policy.service';

export class CanCancelOrderSpecification extends Specification<OrderEntity> {
  isSatisfiedBy(candidate: OrderEntity): boolean {
    if (candidate.isDeleted()) return false;
    return OrderCancelPolicyService.canCancel(candidate.status.value);
  }
}
