/**
 * TransactionReference Value Object — max 128 chars
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TRANSACTION_LIMIT } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TransactionReferenceVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TransactionReferenceVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Reference must be a string', 'reference');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Reference cannot be empty', 'reference');
    }
    if (trimmed.length > TRANSACTION_LIMIT.REFERENCE_MAX_LENGTH) {
      throw new ValidationError(
        `Reference exceeds ${TRANSACTION_LIMIT.REFERENCE_MAX_LENGTH} chars`,
        'reference',
      );
    }
    return new TransactionReferenceVO(trimmed);
  }

  static reconstitute(raw: string): TransactionReferenceVO {
    return new TransactionReferenceVO(raw);
  }
}
