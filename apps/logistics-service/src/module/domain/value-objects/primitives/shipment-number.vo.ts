import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { InvalidShipmentNumberError } from '../../errors/shipment.errors';

export class ShipmentNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShipmentNumberVO {
    BaseCodeVO.validateNonEmpty(raw, 'ShipmentNumber');
    const pattern = new RegExp(`^${SHIPMENT.TRACKING_NUMBER_PREFIX}\\d+$`);
    if (!pattern.test(raw)) {
      throw new InvalidShipmentNumberError(raw);
    }
    return new ShipmentNumberVO(raw);
  }
}
