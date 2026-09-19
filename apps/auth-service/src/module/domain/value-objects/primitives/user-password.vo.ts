import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SECURITY } from '@vubon/shared-constants/security';
import { WeakPasswordError } from '../../errors/password.errors';

export class UserPasswordVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserPasswordVO {
    if (raw.length < SECURITY.PASSWORD_MIN_LENGTH) {
      throw new WeakPasswordError(
        `minimum length is ${SECURITY.PASSWORD_MIN_LENGTH}`,
      );
    }
    if (raw.length > SECURITY.PASSWORD_MAX_LENGTH) {
      throw new WeakPasswordError(
        `maximum length is ${SECURITY.PASSWORD_MAX_LENGTH}`,
      );
    }
    if (SECURITY.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(raw)) {
      throw new WeakPasswordError('uppercase required');
    }
    if (SECURITY.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(raw)) {
      throw new WeakPasswordError('lowercase required');
    }
    if (SECURITY.PASSWORD_REQUIRE_NUMBER && !/\d/.test(raw)) {
      throw new WeakPasswordError('number required');
    }
    if (SECURITY.PASSWORD_REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(raw)) {
      throw new WeakPasswordError('symbol required');
    }
    return new UserPasswordVO(raw);
  }
}
