/**
 * BillingAddressLine Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 255;

export class BillingAddressLineVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BillingAddressLineVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BillingAddressLine must be a string', 'addressLine');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `BillingAddressLine must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'addressLine',
      );
    }
    return new BillingAddressLineVO(trimmed);
  }

  static reconstitute(raw: string): BillingAddressLineVO {
    return new BillingAddressLineVO(raw);
  }
}
