import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';

export class CanDeliverSpecification extends Specification<DeliveryEntity> {
  isSatisfiedBy(delivery: DeliveryEntity): boolean {
    return (
      delivery.status.value === DELIVERY_STATUS.OUT_FOR_DELIVERY ||
      delivery.status.value === DELIVERY_STATUS.IN_TRANSIT
    );
  }
}
