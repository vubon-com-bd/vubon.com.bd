/**
 * AccountHolderName Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Must match bank records — allow letters, spaces, dots, hyphens.
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 150;

export class AccountHolderNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AccountHolderNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Account holder name must be a string', 'accountHolderName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Account holder name must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'accountHolderName',
      );
    }
    if (!/^[\p{L}\s'.\-]+$/u.test(normalized)) {
      throw new ValidationError(
        'Account holder name may contain only letters, spaces, dots, hyphens, apostrophes',
        'accountHolderName',
      );
    }
    return new AccountHolderNameVO(normalized);
  }

  static reconstitute(raw: string): AccountHolderNameVO {
    return new AccountHolderNameVO(raw);
  }

  hasMultipleWords(): boolean {
    return this.value.trim().split(/\s+/).length > 1;
  }
}
