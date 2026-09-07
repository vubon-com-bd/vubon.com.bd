import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export type ID = string | number;

export class IDVO implements BaseValueObject<ID> {
  private _value: ID;

  constructor(value: ID) {
    this._value = value;
  }

  get value(): ID {
    return this._value;
  }

  // VALIDATION ব্যবহার করে আইডি ভ্যালিডেশন
  isValid(): boolean {
    if (this._value === null || this._value === undefined) {
      return false;
    }

    // স্ট্রিং আইডি চেক
    if (typeof this._value === 'string') {
      // UUID প্যাটার্ন চেক (যদি UUID হয়)
      if (this._value.includes('-') && this._value.length === 36) {
        const uuidPattern =
          VALIDATION.UUID?.PATTERN ||
          '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
        const regex = new RegExp(uuidPattern, 'i');
        return regex.test(this._value);
      }

      // স্লাগ প্যাটার্ন চেক (যদি স্লাগ হয়)
      if (this._value.includes('-') && !this._value.includes(' ')) {
        const slugPattern = VALIDATION.SLUG?.PATTERN || '^[a-z0-9]+(?:-[a-z0-9]+)*$';
        const regex = new RegExp(slugPattern);
        return regex.test(this._value);
      }

      // সাধারণ স্ট্রিং আইডি - খালি নয় এবং দৈর্ঘ্য যাচাই
      const minLength = VALIDATION.STRING?.MIN_LENGTH || 1;
      const maxLength = VALIDATION.STRING?.MAX_LENGTH || 255;
      return (
        this._value.length >= minLength &&
        this._value.length <= maxLength &&
        this._value.trim().length > 0
      );
    }

    // নাম্বার আইডি চেক
    if (typeof this._value === 'number') {
      const minValue = VALIDATION.NUMBER?.MIN || 0;
      const maxValue = VALIDATION.NUMBER?.MAX || 999999999;
      return (
        this._value >= minValue &&
        this._value <= maxValue &&
        Number.isInteger(this._value) &&
        this._value >= 0
      );
    }

    return false;
  }

  // VALIDATION ব্যবহার করে আইডি টাইপ চেক
  isUUID(): boolean {
    if (typeof this._value !== 'string') return false;
    const uuidPattern =
      VALIDATION.UUID?.PATTERN ||
      '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
    const regex = new RegExp(uuidPattern, 'i');
    return regex.test(this._value);
  }

  isSlug(): boolean {
    if (typeof this._value !== 'string') return false;
    const slugPattern = VALIDATION.SLUG?.PATTERN || '^[a-z0-9]+(?:-[a-z0-9]+)*$';
    const regex = new RegExp(slugPattern);
    return regex.test(this._value);
  }

  isNumeric(): boolean {
    return typeof this._value === 'number';
  }

  isString(): boolean {
    return typeof this._value === 'string';
  }

  // VALIDATION ব্যবহার করে আইডি দৈর্ঘ্য চেক (শুধু স্ট্রিং এর জন্য)
  getLength(): number {
    if (typeof this._value === 'string') {
      return this._value.length;
    }
    return String(this._value).length;
  }

  // VALIDATION ব্যবহার করে ভ্যালিডেশন রিপোর্ট
  getValidationReport(): {
    isValid: boolean;
    type: 'uuid' | 'slug' | 'string' | 'number' | 'unknown';
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let type: 'uuid' | 'slug' | 'string' | 'number' | 'unknown' = 'unknown';

    if (this._value === null || this._value === undefined) {
      errors.push('ID cannot be null or undefined');
      return { isValid: false, type, errors, warnings };
    }

    // টাইপ নির্ধারণ
    if (typeof this._value === 'string') {
      if (this.isUUID()) {
        type = 'uuid';
      } else if (this.isSlug()) {
        type = 'slug';
      } else {
        type = 'string';
      }
    } else if (typeof this._value === 'number') {
      type = 'number';
    }

    // ভ্যালিডেশন - string টাইপের জন্য
    if (type === 'string' || type === 'uuid' || type === 'slug') {
      const strValue = this._value as string;
      const minLength =
        type === 'slug' ? VALIDATION.SLUG?.MIN_LENGTH || 1 : VALIDATION.STRING?.MIN_LENGTH || 1;
      const maxLength =
        type === 'slug' ? VALIDATION.SLUG?.MAX_LENGTH || 100 : VALIDATION.STRING?.MAX_LENGTH || 255;

      if (strValue.length < minLength) {
        errors.push(`ID must be at least ${minLength} characters`);
      }
      if (strValue.length > maxLength) {
        errors.push(`ID must be at most ${maxLength} characters`);
      }
      if (strValue.trim().length === 0) {
        errors.push('ID cannot be empty or whitespace');
      }

      // UUID স্পেসিফিক ভ্যালিডেশন
      if (type === 'uuid') {
        const pattern =
          VALIDATION.UUID?.PATTERN ||
          '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
        const regex = new RegExp(pattern, 'i');
        if (!regex.test(strValue)) {
          errors.push('Invalid UUID format');
        }
      }

      // Slug স্পেসিফিক ভ্যালিডেশন
      if (type === 'slug') {
        const pattern = VALIDATION.SLUG?.PATTERN || '^[a-z0-9]+(?:-[a-z0-9]+)*$';
        const regex = new RegExp(pattern);
        if (!regex.test(strValue)) {
          errors.push('Invalid slug format');
        }
      }

      // ওয়ার্নিং - শুধু স্ট্রিং এর জন্য
      if (strValue.length > 50) {
        warnings.push('ID is longer than recommended (50 characters)');
      }
    }

    // ভ্যালিডেশন - number টাইপের জন্য
    if (type === 'number') {
      const numValue = this._value as number;
      const minValue = VALIDATION.NUMBER?.MIN || 0;
      const maxValue = VALIDATION.NUMBER?.MAX || 999999999;

      if (numValue < minValue) {
        errors.push(`Number ID must be at least ${minValue}`);
      }
      if (numValue > maxValue) {
        errors.push(`Number ID must be at most ${maxValue}`);
      }
      if (!Number.isInteger(numValue)) {
        errors.push('Number ID must be an integer');
      }
      if (numValue < 0) {
        errors.push('Number ID must be a positive number');
      }

      // ওয়ার্নিং - শুধু নাম্বার এর জন্য
      if (numValue > 999999) {
        warnings.push('Number ID is larger than recommended (999999)');
      }
    }

    return {
      isValid: errors.length === 0,
      type,
      errors,
      warnings,
    };
  }

  // VALIDATION ব্যবহার করে আইডি নরমালাইজ
  normalize(): IDVO {
    if (typeof this._value === 'string') {
      const trimmed = this._value.trim();
      if (this.isUUID() || this.isSlug()) {
        return new IDVO(trimmed.toLowerCase());
      }
      return new IDVO(trimmed);
    }
    return new IDVO(this._value);
  }

  // VALIDATION ব্যবহার করে আইডি ভ্যালিডিটি চেক
  checkValidity(): boolean {
    return this.isValid();
  }

  equals(other: IDVO): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return String(this._value);
  }

  toJSON(): { value: ID; type: string; isValid: boolean } {
    const report = this.getValidationReport();
    return {
      value: this._value,
      type: report.type,
      isValid: report.isValid,
    };
  }
}

// ID টাইপের জন্য হেল্পার ইউটিলিটি
export const ID_TYPES = {
  UUID: 'uuid',
  NUMBER: 'number',
  STRING: 'string',
  SLUG: 'slug',
} as const;

export type IDType = keyof typeof ID_TYPES;

// VALIDATION ব্যবহার করে আইডি ফ্যাক্টরি
export type IDFactory = {
  createUUID(): IDVO;
  createSlug(value: string): IDVO;
  createNumeric(value: number): IDVO;
  createString(value: string): IDVO;
  create(value: ID): IDVO;
};

// VALIDATION ব্যবহার করে আইডি জেনারেটর
export const IDGenerator: IDFactory = {
  createUUID: () => {
    // সিম্পল UUID জেনারেশন
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return new IDVO(uuid);
  },
  createSlug: (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return new IDVO(slug);
  },
  createNumeric: (value: number) => {
    const minValue = VALIDATION.NUMBER?.MIN || 0;
    const maxValue = VALIDATION.NUMBER?.MAX || 999999999;
    const clamped = Math.max(minValue, Math.min(maxValue, Math.floor(value)));
    return new IDVO(clamped);
  },
  createString: (value: string) => {
    const trimmed = value.trim();
    const maxLength = VALIDATION.STRING?.MAX_LENGTH || 255;
    const truncated = trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
    return new IDVO(truncated);
  },
  create: (value: ID) => {
    return new IDVO(value);
  },
};

// VALIDATION ব্যবহার করে আইডি অপশন
export interface IDOptions {
  type?: IDType;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// VALIDATION ব্যবহার করে আইডি কনফিগ
export const ID_CONFIG = {
  UUID: {
    pattern:
      VALIDATION.UUID?.PATTERN ||
      '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  },
  SLUG: {
    minLength: VALIDATION.SLUG?.MIN_LENGTH || 1,
    maxLength: VALIDATION.SLUG?.MAX_LENGTH || 100,
    pattern: VALIDATION.SLUG?.PATTERN || '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  },
  STRING: {
    minLength: VALIDATION.STRING?.MIN_LENGTH || 1,
    maxLength: VALIDATION.STRING?.MAX_LENGTH || 255,
  },
  NUMBER: {
    min: VALIDATION.NUMBER?.MIN || 0,
    max: VALIDATION.NUMBER?.MAX || 999999999,
  },
} as const;
