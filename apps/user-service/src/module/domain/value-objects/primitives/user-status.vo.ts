import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { USER_STATUS } from '@vubon/shared-constants/user';
import { InvalidUserStatusError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(USER_STATUS));

export class UserStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidUserStatusError(raw);
    }
    return new UserStatusVO(raw);
  }

  isActive(): boolean {
    return this.value === 'active';
  }

  isSuspended(): boolean {
    return this.value === 'suspended';
  }
}
