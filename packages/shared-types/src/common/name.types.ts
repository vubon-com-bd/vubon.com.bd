import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export interface NameData {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export class Name implements BaseValueObject<NameData> {
  private _data: NameData;

  constructor(data: NameData) {
    this._data = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
    };
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): NameData {
    return { ...this._data };
  }

  // প্রয়োজনীয় অন্যান্য গেটার
  get firstName(): string {
    return this._data.firstName;
  }
  get lastName(): string {
    return this._data.lastName;
  }
  get middleName(): string | undefined {
    return this._data.middleName;
  }

  // VALIDATION ব্যবহার করে ভ্যালিডেশন
  isValid(): boolean {
    // VALIDATION থেকে নামের জন্য নিয়ম নেওয়া
    const minLength = VALIDATION.NAME?.MIN_LENGTH || 2;
    const maxLength = VALIDATION.NAME?.MAX_LENGTH || 50;

    return (
      !!this._data.firstName &&
      !!this._data.lastName &&
      this._data.firstName.length >= minLength &&
      this._data.firstName.length <= maxLength &&
      this._data.lastName.length >= minLength &&
      this._data.lastName.length <= maxLength &&
      /^[a-zA-Z\s\-']+$/.test(this._data.firstName) &&
      /^[a-zA-Z\s\-']+$/.test(this._data.lastName)
    );
  }

  equals(other: Name): boolean {
    return this.getFullName() === other.getFullName();
  }

  getFullName(): string {
    return this._data.middleName
      ? `${this._data.firstName} ${this._data.middleName} ${this._data.lastName}`
      : `${this._data.firstName} ${this._data.lastName}`;
  }

  getInitials(): string {
    const first = this._data.firstName.charAt(0).toUpperCase();
    const last = this._data.lastName.charAt(0).toUpperCase();
    return `${first}${last}`;
  }

  // VALIDATION ব্যবহার করে নাম ফরম্যাট করা
  getFormattedName(): string {
    const firstName =
      this._data.firstName.charAt(0).toUpperCase() + this._data.firstName.slice(1).toLowerCase();
    const lastName =
      this._data.lastName.charAt(0).toUpperCase() + this._data.lastName.slice(1).toLowerCase();
    const middleName = this._data.middleName
      ? this._data.middleName.charAt(0).toUpperCase() + this._data.middleName.slice(1).toLowerCase()
      : undefined;

    return middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
  }

  // VALIDATION ব্যবহার করে নামের টাইপ চেক
  isValidFirstName(): boolean {
    const minLength = VALIDATION.NAME?.MIN_LENGTH || 2;
    const maxLength = VALIDATION.NAME?.MAX_LENGTH || 50;
    return (
      this._data.firstName.length >= minLength &&
      this._data.firstName.length <= maxLength &&
      /^[a-zA-Z\s\-']+$/.test(this._data.firstName)
    );
  }

  isValidLastName(): boolean {
    const minLength = VALIDATION.NAME?.MIN_LENGTH || 2;
    const maxLength = VALIDATION.NAME?.MAX_LENGTH || 50;
    return (
      this._data.lastName.length >= minLength &&
      this._data.lastName.length <= maxLength &&
      /^[a-zA-Z\s\-']+$/.test(this._data.lastName)
    );
  }

  // VALIDATION ব্যবহার করে নামের দৈর্ঘ্য চেক
  getLength(): { firstName: number; lastName: number; middleName?: number; total: number } {
    return {
      firstName: this._data.firstName.length,
      lastName: this._data.lastName.length,
      middleName: this._data.middleName?.length,
      total: this.getFullName().length,
    };
  }

  // VALIDATION ব্যবহার করে নাম ভ্যালিডেশন রুলস পাওয়া
  getValidationRules(): {
    minLength: number;
    maxLength: number;
    pattern: RegExp;
  } {
    return {
      minLength: VALIDATION.NAME?.MIN_LENGTH || 2,
      maxLength: VALIDATION.NAME?.MAX_LENGTH || 50,
      pattern: /^[a-zA-Z\s\-']+$/,
    };
  }

  // VALIDATION ব্যবহার করে নামের ভ্যালিডিটি রিপোর্ট
  getValidationReport(): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const rules = this.getValidationRules();

    // প্রথম নাম চেক
    if (!this._data.firstName) {
      errors.push('First name is required');
    } else if (this._data.firstName.length < rules.minLength) {
      errors.push(`First name must be at least ${rules.minLength} characters`);
    } else if (this._data.firstName.length > rules.maxLength) {
      errors.push(`First name must be at most ${rules.maxLength} characters`);
    } else if (!rules.pattern.test(this._data.firstName)) {
      errors.push('First name contains invalid characters');
    }

    // শেষ নাম চেক
    if (!this._data.lastName) {
      errors.push('Last name is required');
    } else if (this._data.lastName.length < rules.minLength) {
      errors.push(`Last name must be at least ${rules.minLength} characters`);
    } else if (this._data.lastName.length > rules.maxLength) {
      errors.push(`Last name must be at most ${rules.maxLength} characters`);
    } else if (!rules.pattern.test(this._data.lastName)) {
      errors.push('Last name contains invalid characters');
    }

    // মিডল নাম চেক (যদি থাকে)
    if (this._data.middleName && this._data.middleName.length > 0) {
      if (this._data.middleName.length > rules.maxLength) {
        warnings.push(`Middle name is longer than recommended (${rules.maxLength} characters)`);
      }
      if (!rules.pattern.test(this._data.middleName)) {
        warnings.push('Middle name contains invalid characters');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  toString(): string {
    return this.getFullName();
  }

  toJSON(): NameData & {
    fullName: string;
    initials: string;
    formattedName: string;
    isValid: boolean;
  } {
    return {
      ...this._data,
      fullName: this.getFullName(),
      initials: this.getInitials(),
      formattedName: this.getFormattedName(),
      isValid: this.isValid(),
    };
  }
}
