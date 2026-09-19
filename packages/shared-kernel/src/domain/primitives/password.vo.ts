import { SECURITY } from '@vubon/shared-constants/security';
import { BaseVO } from '../base/base.vo';

export abstract class BasePasswordVO extends BaseVO<string> {
  protected constructor(value: string) {
    super(value);
  }

  protected static validate(raw: string): void {
    if (raw.length < SECURITY.PASSWORD_MIN_LENGTH) {
      throw new Error(`Password too short (min ${SECURITY.PASSWORD_MIN_LENGTH})`);
    }
    if (raw.length > SECURITY.PASSWORD_MAX_LENGTH) {
      throw new Error(`Password too long (max ${SECURITY.PASSWORD_MAX_LENGTH})`);
    }
    if (SECURITY.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(raw)) {
      throw new Error('Password must contain uppercase');
    }
    if (SECURITY.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(raw)) {
      throw new Error('Password must contain lowercase');
    }
    if (SECURITY.PASSWORD_REQUIRE_NUMBER && !/[0-9]/.test(raw)) {
      throw new Error('Password must contain number');
    }
    if (SECURITY.PASSWORD_REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(raw)) {
      throw new Error('Password must contain symbol');
    }
  }
}

export class PasswordVO extends BasePasswordVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): PasswordVO {
    BasePasswordVO.validate(raw);
    return new PasswordVO(raw);
  }
}
