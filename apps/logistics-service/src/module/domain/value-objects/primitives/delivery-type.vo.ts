import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';

const VALID = new Set<string>(Object.values(DELIVERY_TYPE));

export class DeliveryTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid delivery type: ${raw}`);
    }
    return new DeliveryTypeVO(raw);
  }
}
