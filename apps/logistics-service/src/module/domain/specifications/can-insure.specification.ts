import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ShipmentEntity } from '../entities/shipment.entity';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

export class CanInsureSpecification extends Specification<ShipmentEntity> {
  isSatisfiedBy(shipment: ShipmentEntity): boolean {
    if (shipment.isDeleted()) return false;
    if (shipment.weight && shipment.weight.toKg() > SHIPMENT.MAX_WEIGHT_KG) {
      return false;
    }
    return true;
  }
}
