/**
 * PhoneNumber Value Object — BD or international
 * @module notification-service/domain/value-objects/primitives
 */
import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PhoneNumberVO extends BasePhoneVO {
  private constructor(value: string) {
    super(value as never);
  }

  static create(raw: string): PhoneNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Phone number must be a string', 'phone');
    }
    const normalized = raw.replace(/\s+/g, '');
    if (normalized.length === 0) {
      throw new ValidationError('Phone number cannot be empty', 'phone');
    }
    if (normalized.length > VALIDATION.PHONE_MAX_LENGTH) {
      throw new ValidationError(
        `Phone number too long (max ${VALIDATION.PHONE_MAX_LENGTH})`,
        'phone',
      );
    }
    if (!REGEX.PHONE_BD.test(normalized) && !REGEX.PHONE_INTL.test(normalized)) {
      throw new ValidationError(`Invalid phone number: ${normalized}`, 'phone');
    }
    return new PhoneNumberVO(normalized);
  }

  static reconstitute(raw: string): PhoneNumberVO {
    return new PhoneNumberVO(raw);
  }

  isBangladeshi(): boolean {
    return REGEX.PHONE_BD.test(this.value);
  }

  isInternational(): boolean {
    return !this.isBangladeshi();
  }

  /** Mask middle digits. */
  masked(): string {
    if (this.value.length <= 6) return '***';
    return `${this.value.slice(0, 4)}***${this.value.slice(-3)}`;
  }
}
