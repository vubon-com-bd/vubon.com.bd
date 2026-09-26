import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(DELIVERY_STATUS));

export class DeliveryStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid delivery status: ${raw}`);
    }
    return new DeliveryStatusVO(raw);
  }
}
