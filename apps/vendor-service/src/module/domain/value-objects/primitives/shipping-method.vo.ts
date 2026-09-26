import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidShippingMethodError } from '../../errors/vendor.errors';

const VALID = new Set<string>([
  'standard',
  'express',
  'same_day',
  'pickup',
  'courier',
]);

export class ShippingMethodVO extends BaseTypeVO {
  static create(value: string): ShippingMethodVO {
    if (!VALID.has(value)) {
      throw new InvalidShippingMethodError(value);
    }
    return new ShippingMethodVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
