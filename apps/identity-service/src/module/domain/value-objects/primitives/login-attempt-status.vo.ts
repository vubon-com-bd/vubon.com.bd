/**
 * LoginAttemptStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants/auth';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type LoginAttemptStatusValue = 'success' | 'failed' | 'locked' | 'blocked';

const VALID_STATUSES: readonly string[] = Object.values(AUTH_LOGIN_ATTEMPT_STATUS);

export class LoginAttemptStatusVO extends BaseStatusVO<LoginAttemptStatusValue> {
  private constructor(value: LoginAttemptStatusValue) {
    super(value);
  }

  static create(raw: string): LoginAttemptStatusVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('LoginAttemptStatus cannot be empty', 'loginAttemptStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid LoginAttemptStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'loginAttemptStatus',
      );
    }
    return new LoginAttemptStatusVO(normalized as LoginAttemptStatusValue);
  }

  static success(): LoginAttemptStatusVO { return new LoginAttemptStatusVO('success'); }
  static failed(): LoginAttemptStatusVO { return new LoginAttemptStatusVO('failed'); }
  static locked(): LoginAttemptStatusVO { return new LoginAttemptStatusVO('locked'); }
  static blocked(): LoginAttemptStatusVO { return new LoginAttemptStatusVO('blocked'); }

  static reconstitute(raw: string): LoginAttemptStatusVO {
    return new LoginAttemptStatusVO(raw as LoginAttemptStatusValue);
  }

  isSuccess(): boolean { return this.value === 'success'; }
  isFailed(): boolean { return this.value === 'failed'; }
  isLocked(): boolean { return this.value === 'locked'; }
  isBlocked(): boolean { return this.value === 'blocked'; }
  isTerminal(): boolean { return this.isLocked() || this.isBlocked(); }
  countsAsFailure(): boolean { return !this.isSuccess(); }
}
