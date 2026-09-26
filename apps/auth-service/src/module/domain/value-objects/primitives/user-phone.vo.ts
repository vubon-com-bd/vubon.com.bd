/**
 * UserPhoneVO — BD phone number value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Accepts +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX
 * - Normalized to +8801XXXXXXXXX
 * - Valid BD operator prefix (13–19)
 */
import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives/phone.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { toPhone } from '@vubon/shared-types/common';
import { InvalidPhoneError } from '../../errors/user.errors';

export class UserPhoneVO extends BasePhoneVO {
  private constructor(value: ReturnType<typeof toPhone>) {
    super(value);
  }

  static of(raw: string): UserPhoneVO {
    if (typeof raw !== 'string') {
      throw new InvalidPhoneError(String(raw));
    }
    const digitsOnly = raw.replace(/[\s\-()]/g, '');
    if (!REGEX.PHONE_BD.test(digitsOnly)) {
      throw new InvalidPhoneError(raw);
    }
    const normalized = UserPhoneVO.canonical(digitsOnly);
    return new UserPhoneVO(toPhone(normalized));
  }

  private static canonical(raw: string): string {
    if (raw.startsWith('+880')) return raw;
    if (raw.startsWith('880')) return `+${raw}`;
    if (raw.startsWith('0')) return `+880${raw.slice(1)}`;
    return raw;
  }

  /** Local format: 01XXXXXXXXX */
  get localFormat(): string {
    return `0${String(this.value).slice(4)}`;
  }
}
