/**
 * CheckoutId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CheckoutIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CheckoutIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CheckoutId cannot be empty', 'checkoutId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CheckoutId must be a valid UUID', 'checkoutId');
    }
    return new CheckoutIdVO(trimmed);
  }

  static reconstitute(raw: string): CheckoutIdVO {
    return new CheckoutIdVO(raw);
  }
}
