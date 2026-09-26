import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ShipmentEntity } from '../entities/shipment.entity';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';

export class CanRefundShippingSpecification extends Specification<ShipmentEntity> {
  isSatisfiedBy(shipment: ShipmentEntity): boolean {
    return (
      shipment.status.value === SHIPMENT_STATUS.CANCELLED ||
      shipment.status.value === SHIPMENT_STATUS.RETURNED ||
      shipment.status.value === SHIPMENT_STATUS.FAILED
    );
  }
}
