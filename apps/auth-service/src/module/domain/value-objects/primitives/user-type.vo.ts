import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_TYPE } from '@vubon/shared-constants/user';
import { InvalidTypeError } from '../../errors/user.errors';

const VALID_USER_TYPES = new Set<string>(Object.values(USER_TYPE));

export class UserTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserTypeVO {
    if (!VALID_USER_TYPES.has(raw)) {
      throw new InvalidTypeError(raw);
    }
    return new UserTypeVO(raw);
  }
}
