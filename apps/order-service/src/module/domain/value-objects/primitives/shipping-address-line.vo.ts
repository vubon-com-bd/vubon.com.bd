import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class ShippingAddressLineVO extends BaseVO<string> {
  static readonly MIN_LENGTH = 3;
  static readonly MAX_LENGTH = 255;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShippingAddressLineVO {
    const trimmed = raw.trim();
    if (trimmed.length < ShippingAddressLineVO.MIN_LENGTH) {
      throw new ValidationError(
        'ShippingAddressLine',
        `must be at least ${ShippingAddressLineVO.MIN_LENGTH} characters`,
      );
    }
    if (trimmed.length > ShippingAddressLineVO.MAX_LENGTH) {
      throw new ValidationError(
        'ShippingAddressLine',
        `must not exceed ${ShippingAddressLineVO.MAX_LENGTH} characters`,
      );
    }
    return new ShippingAddressLineVO(trimmed);
  }
}
