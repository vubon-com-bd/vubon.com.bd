import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { USER_GENDER } from '@vubon/shared-constants/user';
import { InvalidUserGenderError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(USER_GENDER));

export class UserGenderVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserGenderVO {
    if (!VALID.has(raw)) {
      throw new InvalidUserGenderError(raw);
    }
    return new UserGenderVO(raw);
  }
}
