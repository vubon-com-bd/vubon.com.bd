import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidUserTimezoneError } from '../../errors/user.errors';

export class UserTimezoneVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserTimezoneVO {
    if (!raw || raw.length < 3 || raw.length > 64) {
      throw new InvalidUserTimezoneError(raw);
    }
    return new UserTimezoneVO(raw);
  }
}
