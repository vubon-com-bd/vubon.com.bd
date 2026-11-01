/**
 * BankAccountNumber Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - 6-34 chars (international range for IBAN/BBAN)
 * - Alphanumeric only (no spaces)
 * - Never logged raw; use masked()
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 6;
const MAX_LENGTH = 34;
const PATTERN = /^[A-Z0-9]+$/;

export class BankAccountNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankAccountNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BankAccountNumber must be a string', 'bankAccountNumber');
    }
    const normalized = raw.trim().toUpperCase().replace(/[\s-]/g, '');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `BankAccountNumber must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'bankAccountNumber',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'BankAccountNumber must be alphanumeric',
        'bankAccountNumber',
      );
    }
    return new BankAccountNumberVO(normalized);
  }

  static reconstitute(raw: string): BankAccountNumberVO {
    return new BankAccountNumberVO(raw);
  }

  /** Mask all but last 4 chars for safe display */
  masked(): string {
    const tail = this.value.slice(-4);
    const head = '*'.repeat(Math.max(0, this.value.length - 4));
    return `${head}${tail}`;
  }
}
