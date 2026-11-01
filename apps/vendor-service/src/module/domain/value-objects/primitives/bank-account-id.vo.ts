/**
 * BankAccountId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class BankAccountIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankAccountIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('BankAccountId cannot be empty', 'bankAccountId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('BankAccountId must be a valid UUID', 'bankAccountId');
    }
    return new BankAccountIdVO(trimmed);
  }

  static reconstitute(raw: string): BankAccountIdVO {
    return new BankAccountIdVO(raw);
  }
}
