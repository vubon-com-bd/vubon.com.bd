/**
 * PaymentId Value Object (cross-service reference → payment-service)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PaymentIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PaymentId cannot be empty', 'paymentId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PaymentId must be a valid UUID', 'paymentId');
    }
    return new PaymentIdVO(trimmed);
  }

  static reconstitute(raw: string): PaymentIdVO {
    return new PaymentIdVO(raw);
  }
}
