import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidUserAvatarError } from '../../errors/user.errors';

export class UserAvatarVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserAvatarVO {
    if (!REGEX.URL.test(raw)) {
      throw new InvalidUserAvatarError(raw);
    }
    return new UserAvatarVO(raw);
  }
}
