import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(SHIPMENT_TYPE));

export class ShipmentTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShipmentTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid shipment type: ${raw}`);
    }
    return new ShipmentTypeVO(raw);
  }
}
