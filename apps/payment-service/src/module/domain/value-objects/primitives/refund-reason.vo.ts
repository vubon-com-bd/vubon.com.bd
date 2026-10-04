/**
 * RefundReason Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 500;
const MIN = 3;

export class RefundReasonVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RefundReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Refund reason must be a string', 'reason');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN) {
      throw new ValidationError(`Refund reason must be at least ${MIN} chars`, 'reason');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Refund reason exceeds ${MAX} chars`, 'reason');
    }
    return new RefundReasonVO(trimmed);
  }

  static reconstitute(raw: string): RefundReasonVO {
    return new RefundReasonVO(raw);
  }
}
