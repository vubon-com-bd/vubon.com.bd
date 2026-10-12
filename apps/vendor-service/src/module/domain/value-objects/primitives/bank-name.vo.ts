/**
 * BankName Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 120;

export class BankNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Bank name must be a string', 'bankName');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Bank name must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'bankName',
      );
    }
    if (!/^[\p{L}\p{N}\s'.,&\-()]+$/u.test(normalized)) {
      throw new ValidationError('Bank name contains invalid characters', 'bankName');
    }
    return new BankNameVO(normalized);
  }

  static reconstitute(raw: string): BankNameVO {
    return new BankNameVO(raw);
  }

  /** Heuristic: does the name include a bank keyword? */
  looksLikeBank(): boolean {
    const keywords = ['bank', 'bkash', 'nagad', 'rocket', 'islami', 'commercial', 'limited'];
    const lower = this.value.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  }
}
