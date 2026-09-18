import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidPhoneError } from '../../errors/user.errors';

export class UserPhoneVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserPhoneVO {
    const normalized = raw.replace(/\s+/g, '');
    if (!REGEX.PHONE_BD.test(normalized) && !REGEX.PHONE_INTL.test(normalized)) {
      throw new InvalidPhoneError(raw);
    }
    return new UserPhoneVO(normalized);
  }
}
