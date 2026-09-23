import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ShipmentEntity } from '../entities/shipment.entity';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';

const RETURN_WINDOW_DAYS = 7;

export class CanReturnSpecification extends Specification<ShipmentEntity> {
  isSatisfiedBy(shipment: ShipmentEntity): boolean {
    if (shipment.status.value !== SHIPMENT_STATUS.DELIVERED) return false;
    const deliveredAt = new Date(shipment.updatedAt).getTime();
    const elapsed = Date.now() - deliveredAt;
    return elapsed <= RETURN_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  }
}
