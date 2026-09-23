import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { ShipmentNumberVO } from '../value-objects/primitives/shipment-number.vo';

export class ShipmentNumberService {
  generate(sequence: number): ShipmentNumberVO {
    const padded = String(sequence).padStart(
      SHIPMENT.TRACKING_NUMBER_LENGTH - SHIPMENT.TRACKING_NUMBER_PREFIX.length,
      '0',
    );
    return ShipmentNumberVO.create(`${SHIPMENT.TRACKING_NUMBER_PREFIX}${padded}`);
  }
}
