import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'standard',
  'express',
  'overnight',
  'same_day',
  'pickup',
  'international',
]);

export class CartShippingMethodVO extends BaseTypeVO<string> {
  static create(value: string): CartShippingMethodVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid shipping method: ${value}`);
    }
    return new CartShippingMethodVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
