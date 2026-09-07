import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export class PhoneNumber implements BaseValueObject<string> {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): string {
    return this._value;
  }

  isValid(): boolean {
    // VALIDATION.PHONE ব্যবহার করে ভ্যালিডেশন
    const minLength = VALIDATION.PHONE?.MIN_LENGTH ?? 10;
    const maxLength = VALIDATION.PHONE?.MAX_LENGTH ?? 15;
    const bdPattern = VALIDATION.PHONE?.BD_PATTERN;

    // শুধুমাত্র সংখ্যা, প্লাস, স্পেস এবং হাইফেন অনুমোদিত
    const cleaned = this._value.replace(/[\s\-]/g, '');

    // বেসিক দৈর্ঘ্য পরীক্ষা
    if (cleaned.length < minLength || cleaned.length > maxLength) {
      return false;
    }

    // বাংলাদেশ প্যাটার্ন পরীক্ষা
    if (bdPattern) {
      const regex = new RegExp(bdPattern);
      if (regex.test(this._value)) {
        return true;
      }
    }

    // সাধারণ ফোন নম্বর প্যাটার্ন (যদি BD_PATTERN না থাকে)
    const basicPattern = /^\+?[0-9]{10,15}$/;
    if (basicPattern.test(cleaned)) {
      return true;
    }

    return false;
  }

  equals(other: PhoneNumber): boolean {
    return this._value === other._value;
  }

  // ক্লিন করা
  clean(): string {
    return this._value.replace(/[\s\-]/g, '');
  }

  getCountryCode(): string {
    const cleaned = this.clean();
    if (cleaned.startsWith('+')) {
      const parts = cleaned.split(' ');
      return parts[0] || '';
    }
    if (cleaned.startsWith('880')) {
      return '+880';
    }
    return '';
  }

  getNationalNumber(): string {
    const cleaned = this.clean();
    if (cleaned.startsWith('+')) {
      const parts = cleaned.split(' ');
      return parts.slice(1).join('') || cleaned.substring(1);
    }
    if (cleaned.startsWith('880')) {
      return cleaned.substring(3);
    }
    if (cleaned.startsWith('0')) {
      return cleaned.substring(1);
    }
    return cleaned;
  }

  // VALIDATION.PHONE থেকে ভ্যালিডেশন রুলস পাওয়া
  getValidationRules(): {
    minLength: number;
    maxLength: number;
    bdPattern: string;
  } {
    return {
      minLength: VALIDATION.PHONE?.MIN_LENGTH ?? 10,
      maxLength: VALIDATION.PHONE?.MAX_LENGTH ?? 15,
      bdPattern: VALIDATION.PHONE?.BD_PATTERN ?? '^(?:\\+880|0|88)?(1[3-9]\\d{8})$',
    };
  }

  // ফোন নম্বর ফরম্যাট করা
  format(style?: 'international' | 'national' | 'e164'): string {
    const cleaned = this.clean();
    const countryCode = this.getCountryCode();
    const nationalNumber = this.getNationalNumber();

    switch (style) {
      case 'international':
        if (countryCode) {
          return `${countryCode} ${nationalNumber}`;
        }
        return cleaned;

      case 'national':
        return nationalNumber;

      case 'e164':
        if (countryCode) {
          return `${countryCode}${nationalNumber}`;
        }
        return cleaned;

      default:
        return cleaned;
    }
  }

  // ফোন নম্বরের টাইপ চেক
  isMobile(): boolean {
    const cleaned = this.clean();
    // বাংলাদেশ মোবাইল নম্বর: 11 ডিজিট (01XXXXXXXXX)
    return cleaned.length === 11 && cleaned.startsWith('01');
  }

  isLandline(): boolean {
    const cleaned = this.clean();
    // বাংলাদেশ ল্যান্ডলাইন: 8-10 ডিজিট
    return cleaned.length >= 8 && cleaned.length <= 10 && !cleaned.startsWith('01');
  }

  isTollFree(): boolean {
    const cleaned = this.clean();
    return (
      cleaned.startsWith('1800') ||
      cleaned.startsWith('1888') ||
      cleaned.startsWith('1877') ||
      cleaned.startsWith('1866')
    );
  }

  // ভ্যালিডেশন চেক
  checkConstraints(): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const rules = this.getValidationRules();
    const cleaned = this.clean();

    if (cleaned.length < rules.minLength) {
      errors.push(`Phone number must be at least ${rules.minLength} digits`);
    }
    if (cleaned.length > rules.maxLength) {
      errors.push(`Phone number must be at most ${rules.maxLength} digits`);
    }
    if (!/^[0-9+]+$/.test(cleaned)) {
      errors.push('Phone number must contain only digits and +');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toString(): string {
    return this.format('international');
  }

  toJSON(): {
    value: string;
    formatted: string;
    countryCode: string;
    nationalNumber: string;
    isValid: boolean;
  } {
    return {
      value: this._value,
      formatted: this.format('international'),
      countryCode: this.getCountryCode(),
      nationalNumber: this.getNationalNumber(),
      isValid: this.isValid(),
    };
  }
}

export type PhoneString = string;

// VALIDATION.PHONE থেকে টাইপ
export type PhoneValidationRules = {
  minLength: number;
  maxLength: number;
  bdPattern: string;
};

// ফোন নম্বর অপশন
export interface PhoneOptions {
  minLength?: number;
  maxLength?: number;
  defaultCountry?: string;
}

// ফোন নম্বর পার্সার
export interface PhoneParser {
  parse(value: string): PhoneNumber;
  parseWithCountry(value: string, countryCode: string): PhoneNumber;
  isValid(value: string): boolean;
}

// ফোন নম্বর জেনারেটর
export interface PhoneGenerator {
  generate(): PhoneNumber;
  generateWithCountry(countryCode: string): PhoneNumber;
  generateRandom(): PhoneNumber;
}
