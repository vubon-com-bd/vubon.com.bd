import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(SHIPMENT_PRIORITY));

export class ShipmentPriorityVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShipmentPriorityVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid shipment priority: ${raw}`);
    }
    return new ShipmentPriorityVO(raw);
  }
}
