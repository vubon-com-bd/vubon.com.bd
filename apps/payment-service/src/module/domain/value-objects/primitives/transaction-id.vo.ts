/**
 * TransactionId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TransactionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TransactionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TransactionId cannot be empty', 'transactionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('TransactionId must be a valid UUID', 'transactionId');
    }
    return new TransactionIdVO(trimmed);
  }

  static reconstitute(raw: string): TransactionIdVO {
    return new TransactionIdVO(raw);
  }
}
