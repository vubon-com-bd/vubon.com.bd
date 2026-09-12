import { ValueObject } from '../base/base.vo';
import { REGEX } from '@vubon/shared-constants';
import * as bcrypt from 'bcryptjs';

export interface PasswordStrength {
  score: number;
  label: 'weak' | 'medium' | 'strong';
  containsUppercase: boolean;
  containsLowercase: boolean;
  containsNumber: boolean;
  containsSpecial: boolean;
  length: number;
}

export class Password extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('Password cannot be empty');
    }
    // Use REGEX from shared-constants for password validation
    if (!REGEX.PASSWORD.test(this._value)) {
      throw new Error(
        'Password must be at least 8 characters, contain uppercase, lowercase and number'
      );
    }
  }

  hash(): string {
    return bcrypt.hashSync(this._value, 10);
  }

  compare(hashed: string): boolean {
    return bcrypt.compareSync(this._value, hashed);
  }

  validateStrength(): PasswordStrength {
    const value = this._value;
    const containsUppercase = /[A-Z]/.test(value);
    const containsLowercase = /[a-z]/.test(value);
    const containsNumber = /[0-9]/.test(value);
    const containsSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const length = value.length;

    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (containsUppercase) score++;
    if (containsLowercase) score++;
    if (containsNumber) score++;
    if (containsSpecial) score++;

    let label: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 5) label = 'strong';
    else if (score >= 3) label = 'medium';

    return {
      score,
      label,
      containsUppercase,
      containsLowercase,
      containsNumber,
      containsSpecial,
      length,
    };
  }

  isStrong(): boolean {
    return this.validateStrength().label === 'strong';
  }

  isMedium(): boolean {
    return this.validateStrength().label === 'medium';
  }

  isWeak(): boolean {
    return this.validateStrength().label === 'weak';
  }

  static generate(length: number = 12): Password {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return new Password(password);
  }
}
