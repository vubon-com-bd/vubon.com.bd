import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { OrderEntity } from '../entities/order.entity';
import { OrderReturnPolicyService } from '../services/order-return-policy.service';

export class CanReturnOrderSpecification extends Specification<OrderEntity> {
  constructor(private readonly deliveredAt: Date | null) {
    super();
  }

  isSatisfiedBy(candidate: OrderEntity): boolean {
    if (candidate.isDeleted()) return false;
    return OrderReturnPolicyService.canReturn(
      candidate.status.value,
      this.deliveredAt,
    );
  }
}
