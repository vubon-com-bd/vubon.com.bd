/**
 * FailureReason Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 500;

export class FailureReasonVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FailureReasonVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Failure reason must be a string', 'failureReason');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Failure reason cannot be empty', 'failureReason');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Failure reason exceeds ${MAX} chars`, 'failureReason');
    }
    return new FailureReasonVO(trimmed);
  }

  static reconstitute(raw: string): FailureReasonVO {
    return new FailureReasonVO(raw);
  }
}
