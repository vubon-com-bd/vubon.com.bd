import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class BillingAddressLineVO extends BaseVO<string> {
  static readonly MIN_LENGTH = 3;
  static readonly MAX_LENGTH = 255;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BillingAddressLineVO {
    const trimmed = raw.trim();
    if (trimmed.length < BillingAddressLineVO.MIN_LENGTH) {
      throw new ValidationError(
        'BillingAddressLine',
        `must be at least ${BillingAddressLineVO.MIN_LENGTH} characters`,
      );
    }
    if (trimmed.length > BillingAddressLineVO.MAX_LENGTH) {
      throw new ValidationError(
        'BillingAddressLine',
        `must not exceed ${BillingAddressLineVO.MAX_LENGTH} characters`,
      );
    }
    return new BillingAddressLineVO(trimmed);
  }
}
