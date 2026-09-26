import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidUserNameError } from '../../errors/user.errors';

export class UserNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      throw new InvalidUserNameError('Name must be 1-100 characters');
    }
    return new UserNameVO(trimmed);
  }
}
