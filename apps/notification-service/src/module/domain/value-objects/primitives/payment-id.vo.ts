/**
 * PaymentId Value Object (Cross-Service Reference)
 * @module notification-service/domain/value-objects/primitives
 *
 * ⚠️ External Aggregate Reference — Payment service এর Payment।
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import type { PaymentId } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 128;

export class PaymentIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PaymentId cannot be empty', 'paymentId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`PaymentId exceeds ${MAX_LENGTH} chars`, 'paymentId');
    }
    return new PaymentIdVO(trimmed);
  }

  static reconstitute(raw: string): PaymentIdVO {
    return new PaymentIdVO(raw);
  }

  toBranded(): PaymentId {
    return this.value as PaymentId;
  }

  static fromBranded(branded: PaymentId): PaymentIdVO {
    return new PaymentIdVO(branded as string);
  }
}
