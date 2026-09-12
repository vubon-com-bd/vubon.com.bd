import { ValueObject } from '../base/base.vo';

export class Code extends ValueObject<string> {
  protected validate(): void {
    if (!this._value || this._value.length === 0) {
      throw new Error('Code cannot be empty');
    }
    if (!/^[A-Z0-9]+$/.test(this._value)) {
      throw new Error('Code must contain only uppercase letters and numbers');
    }
  }

  get length(): number {
    return this._value.length;
  }

  isEqual(code: Code): boolean {
    return this._value === code._value;
  }

  isMatch(pattern: string): boolean {
    return new RegExp(pattern).test(this._value);
  }

  startsWith(prefix: string): boolean {
    return this._value.startsWith(prefix);
  }

  endsWith(suffix: string): boolean {
    return this._value.endsWith(suffix);
  }

  contains(substring: string): boolean {
    return this._value.includes(substring);
  }

  static generate(
    length: number = 8,
    prefix: string = '',
    suffix: string = '',
    options?: { numbers?: boolean; letters?: boolean }
  ): Code {
    const numbers = options?.numbers !== false;
    const letters = options?.letters !== false;
    let chars = '';
    if (numbers) chars += '0123456789';
    if (letters) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return new Code(`${prefix}${code}${suffix}`);
  }

  static generateOTP(length: number = 6): Code {
    return Code.generate(length, '', '', { numbers: true, letters: false });
  }

  static generateCoupon(prefix: string = 'CPN', length: number = 8): Code {
    return Code.generate(length, `${prefix}-`, '');
  }

  static generateReferral(prefix: string = 'REF'): Code {
    return Code.generate(8, `${prefix}-`);
  }

  static fromString(value: string): Code {
    return new Code(value);
  }
}
