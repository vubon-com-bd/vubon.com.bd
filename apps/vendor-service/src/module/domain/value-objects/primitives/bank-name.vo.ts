/**
 * BankName Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export class BankNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BankName must be a string', 'bankName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `BankName must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'bankName',
      );
    }
    return new BankNameVO(normalized);
  }

  static reconstitute(raw: string): BankNameVO {
    return new BankNameVO(raw);
  }
}
