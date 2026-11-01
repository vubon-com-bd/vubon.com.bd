/**
 * PhoneNumber Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PhoneNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PhoneNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Phone cannot be empty', 'phone');
    }
    const normalized = raw.replace(/[\s\-()]/g, '');
    if (normalized.length > VALIDATION.PHONE_MAX_LENGTH) {
      throw new ValidationError(`Phone too long (max ${VALIDATION.PHONE_MAX_LENGTH})`, 'phone');
    }
    if (!REGEX.PHONE_BD.test(normalized) && !REGEX.PHONE_INTL.test(normalized)) {
      throw new ValidationError(`Invalid phone: ${normalized}`, 'phone');
    }
    return new PhoneNumberVO(normalized);
  }

  static reconstitute(raw: string): PhoneNumberVO {
    return new PhoneNumberVO(raw);
  }

  get isBangladesh(): boolean {
    return REGEX.PHONE_BD.test(this.value);
  }

  get isInternational(): boolean {
    return REGEX.PHONE_INTL.test(this.value);
  }

  get masked(): string {
    if (this.value.length <= 4) return this.value;
    return `${'*'.repeat(this.value.length - 4)}${this.value.slice(-4)}`;
  }
}
