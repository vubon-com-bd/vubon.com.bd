import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants/auth';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID = new Set<string>(Object.values(AUTH_LOGIN_ATTEMPT_STATUS));

export class LoginAttemptStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LoginAttemptStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new LoginAttemptStatusVO(raw);
  }
}
