import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { USER_STATUS } from '@vubon/shared-constants/user';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID_USER_STATUSES = new Set<string>(Object.values(USER_STATUS));

export class UserStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserStatusVO {
    if (!VALID_USER_STATUSES.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new UserStatusVO(raw);
  }
}
