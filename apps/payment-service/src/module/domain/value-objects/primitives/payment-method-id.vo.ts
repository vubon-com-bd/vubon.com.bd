/**
 * PaymentMethodId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PaymentMethodIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentMethodIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PaymentMethodId cannot be empty', 'paymentMethodId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PaymentMethodId must be a valid UUID', 'paymentMethodId');
    }
    return new PaymentMethodIdVO(trimmed);
  }

  static reconstitute(raw: string): PaymentMethodIdVO {
    return new PaymentMethodIdVO(raw);
  }
}
