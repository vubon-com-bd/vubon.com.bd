import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VALIDATION } from '@vubon/shared-constants/common';
import { InvalidNameError } from '../../errors/user.errors';

export class UserNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1) {
      throw new InvalidNameError(raw);
    }
    if (typeof VALIDATION.NAME_MAX_LENGTH === 'number' &&
        trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new InvalidNameError(raw);
    }
    return new UserNameVO(trimmed);
  }
}
