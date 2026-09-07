import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export class Password implements BaseValueObject<string> {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): string {
    return this._value;
  }

  isValid(): boolean {
    // VALIDATION.PASSWORD ব্যবহার করে ভ্যালিডেশন
    const minLength = VALIDATION.PASSWORD?.MIN_LENGTH ?? 8;
    const maxLength = VALIDATION.PASSWORD?.MAX_LENGTH ?? 72;
    const pattern = VALIDATION.PASSWORD?.PATTERN;

    // দৈর্ঘ্য পরীক্ষা
    if (this._value.length < minLength || this._value.length > maxLength) {
      return false;
    }

    // প্যাটার্ন পরীক্ষা
    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(this._value)) {
        return false;
      }
    }

    return true;
  }

  equals(other: Password): boolean {
    return this._value === other._value;
  }

  hash(): string {
    // বাস্তবিক প্রয়োগে bcrypt বা অনুরূপ লাইব্রেরি ব্যবহার করবেন
    return `hashed_${this._value}`;
  }

  verify(plainText: string): boolean {
    return this._value === plainText;
  }

  // পাসওয়ার্ডের শক্তি নির্ণয়
  getStrength(): 'weak' | 'medium' | 'strong' {
    const minLength = VALIDATION.PASSWORD?.MIN_LENGTH ?? 8;
    let score = 0;

    // দৈর্ঘ্য স্কোর
    if (this._value.length >= 12) {
      score += 3;
    } else if (this._value.length >= minLength) {
      score += 2;
    } else if (this._value.length >= minLength - 2) {
      score += 1;
    }

    // বড় অক্ষর
    if (/[A-Z]/.test(this._value)) {
      score += 1;
    }

    // ছোট অক্ষর
    if (/[a-z]/.test(this._value)) {
      score += 1;
    }

    // সংখ্যা
    if (/\d/.test(this._value)) {
      score += 1;
    }

    // বিশেষ অক্ষর
    if (/[!@#$%^&*(),.?":{}|<>]/.test(this._value)) {
      score += 1;
    }

    if (score >= 6) return 'strong';
    if (score >= 4) return 'medium';
    return 'weak';
  }

  // VALIDATION.PASSWORD থেকে ভ্যালিডেশন রুলস পাওয়া
  getValidationRules(): {
    minLength: number;
    maxLength: number;
    pattern: string;
  } {
    return {
      minLength: VALIDATION.PASSWORD?.MIN_LENGTH ?? 8,
      maxLength: VALIDATION.PASSWORD?.MAX_LENGTH ?? 72,
      pattern:
        VALIDATION.PASSWORD?.PATTERN ??
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    };
  }

  // পাসওয়ার্ডের মান পরীক্ষা
  checkConstraints(): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const rules = this.getValidationRules();

    if (this._value.length < rules.minLength) {
      errors.push(`Password must be at least ${rules.minLength} characters`);
    }
    if (this._value.length > rules.maxLength) {
      errors.push(`Password must be at most ${rules.maxLength} characters`);
    }
    if (!/[A-Z]/.test(this._value)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(this._value)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(this._value)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this._value)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // মাস্ক করা পাসওয়ার্ড
  mask(): string {
    return '*'.repeat(this._value.length);
  }

  toString(): string {
    return this.mask();
  }

  toJSON(): {
    masked: string;
    strength: 'weak' | 'medium' | 'strong';
    isValid: boolean;
  } {
    return {
      masked: this.mask(),
      strength: this.getStrength(),
      isValid: this.isValid(),
    };
  }
}

export type PasswordString = string;

// VALIDATION.PASSWORD থেকে টাইপ
export type PasswordValidationRules = {
  minLength: number;
  maxLength: number;
  pattern: string;
};

// পাসওয়ার্ড অপশন
export interface PasswordOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// পাসওয়ার্ড জেনারেটর
export interface PasswordGenerator {
  generate(options?: PasswordOptions): Password;
  generateRandom(length?: number): Password;
  generateMemorable(wordCount?: number): Password;
  generatePin(length?: number): Password;
}

// পাসওয়ার্ড ভ্যালিডেটর
export interface PasswordValidator {
  validate(password: string): {
    isValid: boolean;
    errors: string[];
  };
  getStrength(password: string): 'weak' | 'medium' | 'strong';
}
