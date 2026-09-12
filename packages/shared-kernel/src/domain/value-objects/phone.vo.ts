import { ValueObject } from '../base/base.vo';
import { REGEX } from '@vubon/shared-constants';

export interface PhoneNumber {
  countryCode: string;
  number: string;
  full: string;
}

export class Phone extends ValueObject<PhoneNumber> {
  protected validate(): void {
    if (!this._value.number || this._value.number.length === 0) {
      throw new Error('Phone number is required');
    }
    // Validate based on country code
    if (this._value.countryCode === '+880') {
      if (!REGEX.PHONE.test(this._value.number)) {
        throw new Error('Invalid Bangladesh phone number');
      }
    }
  }

  get countryCode(): string {
    return this._value.countryCode;
  }

  get number(): string {
    return this._value.number;
  }

  get full(): string {
    return this._value.full;
  }

  get isBangladesh(): boolean {
    return this.countryCode === '+880';
  }

  get operator(): 'gp' | 'robi' | 'airtel' | 'banglaLink' | 'teletalk' | 'unknown' {
    if (!this.isBangladesh) return 'unknown';
    const prefix = this.number.slice(-11, -8);
    switch (prefix) {
      case '017':
        return 'gp';
      case '018':
        return 'robi';
      case '019':
        return 'banglaLink';
      case '016':
        return 'airtel';
      case '015':
        return 'teletalk';
      default:
        return 'unknown';
    }
  }

  format(): string {
    if (this.isBangladesh) {
      const num = this.number.slice(-11);
      return `+88 ${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7)}`;
    }
    return this.full;
  }

  mask(): string {
    const visible = this.number.slice(-4);
    const masked = '*'.repeat(this.number.length - 4);
    return `${this.countryCode} ${masked}${visible}`;
  }

  static fromBangladesh(number: string): Phone {
    const clean = number.replace(/\D/g, '');
    if (!REGEX.PHONE.test(clean)) {
      throw new Error('Invalid Bangladesh phone number');
    }
    return new Phone({
      countryCode: '+880',
      number: clean,
      full: `+880${clean}`,
    });
  }

  static fromInternational(countryCode: string, number: string): Phone {
    const clean = number.replace(/\D/g, '');
    return new Phone({
      countryCode,
      number: clean,
      full: `${countryCode}${clean}`,
    });
  }
}
