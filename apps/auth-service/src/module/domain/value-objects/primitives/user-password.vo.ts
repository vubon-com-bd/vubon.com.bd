/**
 * UserPasswordVO — Plain password (pre-hash) value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Min 8 chars, Max 128 chars
 * - Must contain: lowercase, uppercase, digit, special char
 * - Must NOT contain the user's email local-part
 * - Must NOT be a common weak password
 * - Immutable, never logged, toJSON returns redacted string
 */
import { BasePasswordVO } from '@vubon/shared-kernel/domain/primitives/password.vo';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { WeakPasswordError } from '../../errors/password.errors';

const WEAK_PASSWORDS = new Set<string>([
  'password', 'password1', 'password123', '12345678', '123456789',
  'qwerty123', 'admin123', 'letmein', 'welcome1', 'iloveyou',
]);

export class UserPasswordVO extends BasePasswordVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string, context?: { email?: string }): UserPasswordVO {
    if (typeof raw !== 'string') {
      throw new WeakPasswordError(['Password must be a string']);
    }

    const missing = UserPasswordVO.checkRequirements(raw);
    if (missing.length > 0) {
      throw new WeakPasswordError(missing);
    }

    if (WEAK_PASSWORDS.has(raw.toLowerCase())) {
      throw new WeakPasswordError(['Password is in the common weak list']);
    }

    if (context?.email) {
      const localPart = context.email.split('@')[0]?.toLowerCase();
      if (localPart && localPart.length >= 3 && raw.toLowerCase().includes(localPart)) {
        throw new WeakPasswordError(['Password must not contain your email']);
      }
    }

    return new UserPasswordVO(raw);
  }

  private static checkRequirements(raw: string): string[] {
    const missing: string[] = [];
    if (raw.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      missing.push(`min length ${VALIDATION.PASSWORD_MIN_LENGTH}`);
    }
    if (raw.length > VALIDATION.PASSWORD_MAX_LENGTH) {
      missing.push(`max length ${VALIDATION.PASSWORD_MAX_LENGTH}`);
    }
    if (!REGEX.PASSWORD_STRONG.test(raw)) {
      missing.push('lowercase, uppercase, digit, and special char');
    }
    return missing;
  }

  /** Never leak password in JSON serialization */
  override toJSON(): string {
    return '***REDACTED***';
  }

  override toString(): string {
    return '***REDACTED***';
  }
}
