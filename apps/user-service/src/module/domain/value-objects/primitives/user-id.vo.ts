import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { UserId } from '@vubon/shared-types/common';
import { InvalidUserIdError } from '../../errors/user.errors';

export class UserIdVO extends BaseVO<UserId> {
  private constructor(value: UserId) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidUserIdError('UserId cannot be empty');
    }
    return new UserIdVO(raw as UserId);
  }
}
