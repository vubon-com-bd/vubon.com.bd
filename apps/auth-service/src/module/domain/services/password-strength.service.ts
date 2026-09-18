import { SECURITY } from '@vubon/shared-constants/security';
import { WeakPasswordError } from '../errors/password.errors';

export class PasswordStrengthService {
  validate(raw: string): void {
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
      throw new WeakPasswordError('uppercase letter required');
    }
    if (SECURITY.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(raw)) {
      throw new WeakPasswordError('lowercase letter required');
    }
    if (SECURITY.PASSWORD_REQUIRE_NUMBER && !/\d/.test(raw)) {
      throw new WeakPasswordError('number required');
    }
    if (SECURITY.PASSWORD_REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(raw)) {
      throw new WeakPasswordError('special character required');
    }
  }

  score(raw: string): number {
    let score = 0;
    if (raw.length >= SECURITY.PASSWORD_MIN_LENGTH) score += 1;
    if (raw.length >= 12) score += 1;
    if (/[A-Z]/.test(raw)) score += 1;
    if (/[a-z]/.test(raw)) score += 1;
    if (/\d/.test(raw)) score += 1;
    if (/[^A-Za-z0-9]/.test(raw)) score += 1;
    return score;
  }

  isStrong(raw: string): boolean {
    return this.score(raw) >= 5;
  }
}
