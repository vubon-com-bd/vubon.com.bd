import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import type { Email } from '@vubon/shared-types/common';
import { InvalidEmailError } from '../../errors/user.errors';

export class UserEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): UserEmailVO {
    try {
      BaseEmailVO.validate(raw);
    } catch {
      throw new InvalidEmailError(raw);
    }
    return new UserEmailVO(BaseEmailVO.normalize(raw));
  }
}
