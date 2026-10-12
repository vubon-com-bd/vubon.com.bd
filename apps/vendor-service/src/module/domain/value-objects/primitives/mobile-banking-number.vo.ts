/**
 * MobileBankingNumber Value Object — bKash / Nagad / Rocket account number
 * @module vendor-service/domain/value-objects/primitives
 *
 * BD mobile banking accounts are tied to mobile numbers (11 digits starting 01).
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const LOCAL_PATTERN = /^01[3-9]\d{8}$/;
const INTL_PATTERN = /^8801[3-9]\d{8}$/;

export class MobileBankingNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MobileBankingNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Mobile banking number must be a string', 'mobileBankingNumber');
    }
    const digits = raw.replace(/\D+/g, '');
    if (!LOCAL_PATTERN.test(digits) && !INTL_PATTERN.test(digits)) {
      throw new ValidationError(
        'Mobile banking number must be a valid BD mobile number (01XXXXXXXXX)',
        'mobileBankingNumber',
      );
    }
    return new MobileBankingNumberVO(digits);
  }

  static reconstitute(raw: string): MobileBankingNumberVO {
    return new MobileBankingNumberVO(raw);
  }

  /** Return in local format (01XXXXXXXXX). */
  toLocalFormat(): string {
    return this.value.startsWith('880') ? `0${this.value.slice(3)}` : this.value;
  }

  /** Return in international format (8801XXXXXXXXX). */
  toInternationalFormat(): string {
    return this.value.startsWith('880') ? this.value : `880${this.value.slice(1)}`;
  }

  masked(): string {
    return `${this.value.slice(0, 5)}****${this.value.slice(-2)}`;
  }
}
