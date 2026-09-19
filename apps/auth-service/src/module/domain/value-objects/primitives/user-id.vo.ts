import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { UserId } from '@vubon/shared-types/common';

export class UserIdVO extends BaseVO<UserId> {
  private constructor(value: UserId) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(raw as UserId);
  }
}
