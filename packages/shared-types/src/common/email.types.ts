import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export class Email implements BaseValueObject<string> {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): string {
    return this._value;
  }

  // VALIDATION.EMAIL ব্যবহার করে ভ্যালিডেশন
  isValid(): boolean {
    if (!this._value || typeof this._value !== 'string') {
      return false;
    }

    const trimmed = this._value.trim();

    // VALIDATION থেকে ইমেইল কনফিগারেশন
    const minLength = VALIDATION.EMAIL?.MIN_LENGTH || 5;
    const maxLength = VALIDATION.EMAIL?.MAX_LENGTH || 254;
    const pattern =
      VALIDATION.EMAIL?.PATTERN || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    const regex = new RegExp(pattern);

    // দৈর্ঘ্য চেক
    if (trimmed.length < minLength || trimmed.length > maxLength) {
      return false;
    }

    // প্যাটার্ন চেক
    if (!regex.test(trimmed)) {
      return false;
    }

    return true;
  }

  equals(other: Email): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase();
  }

  // VALIDATION.EMAIL ব্যবহার করে ডোমেইন পাওয়া
  getDomain(): string {
    const parts = this._value.split('@');
    return parts.length === 2 ? parts[1] : '';
  }

  // VALIDATION.EMAIL ব্যবহার করে ইউজারনেম পাওয়া
  getUsername(): string {
    const parts = this._value.split('@');
    return parts.length === 2 ? parts[0] : '';
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল নরমালাইজ
  normalize(): Email {
    const trimmed = this._value.trim().toLowerCase();
    return new Email(trimmed);
  }

  // VALIDATION.EMAIL ব্যবহার করে ডোমেইন ভ্যালিডেশন
  isDomainValid(): boolean {
    const domain = this.getDomain();
    if (!domain) return false;

    // ডোমেইন ফরম্যাট চেক
    const domainPattern =
      /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল রিপোর্ট
  getValidationReport(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    details: {
      username: string;
      domain: string;
      length: number;
      hasValidDomain: boolean;
    };
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const trimmed = this._value.trim();

    // VALIDATION থেকে কনফিগারেশন
    const minLength = VALIDATION.EMAIL?.MIN_LENGTH || 5;
    const maxLength = VALIDATION.EMAIL?.MAX_LENGTH || 254;
    const pattern =
      VALIDATION.EMAIL?.PATTERN || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    const regex = new RegExp(pattern);

    // খালি চেক
    if (!trimmed) {
      errors.push('Email is required');
      return {
        isValid: false,
        errors,
        warnings,
        details: {
          username: '',
          domain: '',
          length: 0,
          hasValidDomain: false,
        },
      };
    }

    // দৈর্ঘ্য চেক
    if (trimmed.length < minLength) {
      errors.push(`Email must be at least ${minLength} characters`);
    }
    if (trimmed.length > maxLength) {
      errors.push(`Email must be at most ${maxLength} characters`);
    }

    // প্যাটার্ন চেক
    if (!regex.test(trimmed)) {
      errors.push('Invalid email format');
    }

    // @ চেক
    if (!trimmed.includes('@')) {
      errors.push('Email must contain @ symbol');
    }

    // ডোমেইন চেক
    const parts = trimmed.split('@');
    const username = parts.length === 2 ? parts[0] : '';
    const domain = parts.length === 2 ? parts[1] : '';

    if (username && username.length === 0) {
      errors.push('Username cannot be empty');
    }

    if (domain && domain.length === 0) {
      errors.push('Domain cannot be empty');
    }

    // ডোমেইন ফরম্যাট চেক
    const hasValidDomain = this.isDomainValid();
    if (domain && !hasValidDomain) {
      errors.push('Invalid domain format');
    }

    // ওয়ার্নিং
    if (trimmed.length > 50) {
      warnings.push('Email is quite long');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      details: {
        username,
        domain,
        length: trimmed.length,
        hasValidDomain,
      },
    };
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল মাস্ক
  mask(): string {
    const parts = this._value.split('@');
    if (parts.length !== 2) return this._value;

    const username = parts[0];
    const domain = parts[1];

    if (username.length <= 2) {
      return `${username}@${domain}`;
    }

    const maskedUsername =
      username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল টাইপ চেক
  isGmail(): boolean {
    const domain = this.getDomain().toLowerCase();
    return domain === 'gmail.com' || domain === 'googlemail.com';
  }

  isOutlook(): boolean {
    const domain = this.getDomain().toLowerCase();
    return domain === 'outlook.com' || domain === 'hotmail.com' || domain === 'live.com';
  }

  isYahoo(): boolean {
    const domain = this.getDomain().toLowerCase();
    return domain === 'yahoo.com' || domain === 'yahoo.co.uk' || domain === 'yahoo.co.in';
  }

  isCorporate(): boolean {
    const domain = this.getDomain().toLowerCase();
    const freeDomains = [
      'gmail.com',
      'googlemail.com',
      'outlook.com',
      'hotmail.com',
      'live.com',
      'yahoo.com',
      'yahoo.co.uk',
      'yahoo.co.in',
      'aol.com',
      'protonmail.com',
      'mail.com',
    ];
    return !freeDomains.includes(domain);
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল ফরম্যাট পাওয়া
  getFormat(): 'gmail' | 'outlook' | 'yahoo' | 'corporate' | 'other' {
    if (this.isGmail()) return 'gmail';
    if (this.isOutlook()) return 'outlook';
    if (this.isYahoo()) return 'yahoo';
    if (this.isCorporate()) return 'corporate';
    return 'other';
  }

  // VALIDATION.EMAIL ব্যবহার করে ইমেইল কনফিগারেশন
  getValidationConfig(): {
    minLength: number;
    maxLength: number;
    pattern: string;
    regex: RegExp;
  } {
    const pattern =
      VALIDATION.EMAIL?.PATTERN || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
    return {
      minLength: VALIDATION.EMAIL?.MIN_LENGTH || 5,
      maxLength: VALIDATION.EMAIL?.MAX_LENGTH || 254,
      pattern: pattern,
      regex: new RegExp(pattern),
    };
  }

  toString(): string {
    return this._value;
  }

  toJSON(): {
    value: string;
    isValid: boolean;
    username: string;
    domain: string;
    format: string;
    masked: string;
  } {
    return {
      value: this._value,
      isValid: this.isValid(),
      username: this.getUsername(),
      domain: this.getDomain(),
      format: this.getFormat(),
      masked: this.mask(),
    };
  }
}

export type EmailString = string;

// VALIDATION.EMAIL ব্যবহার করে ইমেইল ফ্যাক্টরি
export type EmailFactory = {
  create(value: string): Email;
  createValid(value: string): Email | null;
  normalize(value: string): Email;
};

// VALIDATION.EMAIL ব্যবহার করে ইমেইল জেনারেটর
export const EmailGenerator: EmailFactory = {
  create: (value: string): Email => new Email(value),

  createValid: (value: string): Email | null => {
    const email = new Email(value);
    return email.isValid() ? email : null;
  },

  normalize: (value: string): Email => {
    return new Email(value.trim().toLowerCase());
  },
};

// VALIDATION.EMAIL ব্যবহার করে ইমেইল অপশন
export interface EmailOptions {
  normalize?: boolean;
  validate?: boolean;
  mask?: boolean;
}

// VALIDATION.EMAIL ব্যবহার করে ইমেইল কনফিগ
export const EMAIL_CONFIG = {
  minLength: VALIDATION.EMAIL?.MIN_LENGTH || 5,
  maxLength: VALIDATION.EMAIL?.MAX_LENGTH || 254,
  pattern: VALIDATION.EMAIL?.PATTERN || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  freeDomains: [
    'gmail.com',
    'googlemail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'yahoo.com',
    'yahoo.co.uk',
    'yahoo.co.in',
    'aol.com',
    'protonmail.com',
    'mail.com',
  ],
} as const;
