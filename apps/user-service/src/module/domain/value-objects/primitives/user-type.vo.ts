import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { USER_TYPE } from '@vubon/shared-constants/user';
import { InvalidUserTypeError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(USER_TYPE));

export class UserTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidUserTypeError(raw);
    }
    return new UserTypeVO(raw);
  }
}
