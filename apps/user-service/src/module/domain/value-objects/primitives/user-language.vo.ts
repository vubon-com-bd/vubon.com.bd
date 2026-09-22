import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidUserLanguageError } from '../../errors/user.errors';

const VALID = new Set(['en', 'bn', 'ar', 'hi', 'ur']);

export class UserLanguageVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserLanguageVO {
    if (!VALID.has(raw)) {
      throw new InvalidUserLanguageError(raw);
    }
    return new UserLanguageVO(raw);
  }
}
