/**
 * BankAccountNumber Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * BD bank account numbers: 10-20 digits (varies by bank).
 * International: allow alphanumeric up to 34 (IBAN max).
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 34;
const PATTERN = /^[A-Z0-9]+$/;

export class BankAccountNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankAccountNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Bank account number must be a string', 'bankAccountNumber');
    }
    const normalized = raw.replace(/\s+/g, '').toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Bank account number must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'bankAccountNumber',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'Bank account number may contain only A-Z and 0-9',
        'bankAccountNumber',
      );
    }
    return new BankAccountNumberVO(normalized);
  }

  static reconstitute(raw: string): BankAccountNumberVO {
    return new BankAccountNumberVO(raw);
  }

  isNumericOnly(): boolean {
    return /^\d+$/.test(this.value);
  }

  /** Never log full account number — show last 4. */
  masked(): string {
    if (this.value.length <= 4) return '****';
    return `${'*'.repeat(this.value.length - 4)}${this.value.slice(-4)}`;
  }

  last4(): string {
    return this.value.slice(-4);
  }
}
