/**
 * FailureCode Value Object (short machine-readable code)
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 50;
const PATTERN = /^[A-Z0-9_\-]+$/;

export class FailureCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FailureCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Failure code must be a string', 'failureCode');
    }
    const upper = raw.trim().toUpperCase();
    if (upper.length === 0 || upper.length > MAX) {
      throw new ValidationError(`Failure code must be 1-${MAX} chars`, 'failureCode');
    }
    if (!PATTERN.test(upper)) {
      throw new ValidationError('Failure code must be A-Z, 0-9, _, -', 'failureCode');
    }
    return new FailureCodeVO(upper);
  }

  static reconstitute(raw: string): FailureCodeVO {
    return new FailureCodeVO(raw);
  }
}
