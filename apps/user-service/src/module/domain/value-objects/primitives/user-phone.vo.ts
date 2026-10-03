/**
 * UserPhone Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Extends BasePhoneVO — uses REGEX.PHONE_BD and REGEX.PHONE_INTL.
 */
import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives/phone.vo';
import type { Phone } from '@vubon/shared-types/common';

export class UserPhoneVO extends BasePhoneVO {
  private constructor(value: Phone) {
    super(value);
  }

  static create(raw: string): UserPhoneVO {
    if (typeof raw !== 'string') {
      throw new Error('Phone must be a string');
    }
    UserPhoneVO.validate(raw);
    return new UserPhoneVO(UserPhoneVO.normalize(raw));
  }

  static from(raw: Phone): UserPhoneVO {
    return new UserPhoneVO(raw);
  }

  isBangladeshi(): boolean {
    return /^(\+880|880|0)1[3-9]\d{8}$/.test(this.value);
  }

  getOperatorCode(): string {
    if (!this.isBangladeshi()) return '';
    const digits = this.value.replace(/^(\+880|880|0)/, '');
    return digits.slice(0, 2);
  }

  toE164(): string {
    if (this.isBangladeshi()) {
      const digits = this.value.replace(/^(\+880|880|0)/, '');
      return `+880${digits}`;
    }
    if (this.value.startsWith('+')) return this.value;
    return `+${this.value}`;
  }

  toMasked(): string {
    if (this.value.length < 6) return '***';
    const first = this.value.slice(0, 3);
    const last = this.value.slice(-2);
    return `${first}****${last}`;
  }
}
