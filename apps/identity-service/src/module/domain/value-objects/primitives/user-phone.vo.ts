/**
 * UserPhone Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserPhoneVO extends BasePhoneVO {
  private constructor(value: string) {
    super(value as never);
  }

  static create(raw: string): UserPhoneVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserPhone cannot be empty', 'phone');
    }
    const digits = raw.trim().replace(/[\s-]/g, '');
    if (!REGEX.PHONE_BD.test(digits) && !REGEX.PHONE_INTL.test(digits)) {
      throw new ValidationError('Invalid user phone format', 'phone');
    }
    return new UserPhoneVO(digits);
  }

  static reconstitute(raw: string): UserPhoneVO {
    return new UserPhoneVO(raw);
  }

  get isBangladeshi(): boolean {
    return REGEX.PHONE_BD.test(this.value);
  }
}
