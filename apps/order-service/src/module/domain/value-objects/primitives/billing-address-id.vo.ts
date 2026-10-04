/**
 * BillingAddressId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BillingAddressIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): BillingAddressIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('BillingAddressId cannot be empty', 'billingAddressId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('BillingAddressId must be a valid UUID', 'billingAddressId');
    }
    return new BillingAddressIdVO(trimmed);
  }

  static reconstitute(raw: string): BillingAddressIdVO {
    return new BillingAddressIdVO(raw);
  }
}
