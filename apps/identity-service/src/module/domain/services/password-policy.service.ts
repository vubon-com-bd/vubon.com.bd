/**
 * PasswordPolicyService
 * @module identity-service/domain/services
 */
import { AUTH_PASSWORD } from '@vubon/shared-constants/auth';
import { SECURITY } from '@vubon/shared-constants/security';

export interface PasswordPolicy {
  readonly minLength: number;
  readonly maxLength: number;
  readonly requireUppercase: boolean;
  readonly requireLowercase: boolean;
  readonly requireNumber: boolean;
  readonly requireSymbol: boolean;
  readonly historyCount: number;
  readonly expiryDays: number;
  readonly bcryptRounds: number;
}

export class PasswordPolicyService {
  static current(): PasswordPolicy {
    return {
      minLength: AUTH_PASSWORD.MIN_LENGTH,
      maxLength: AUTH_PASSWORD.MAX_LENGTH,
      requireUppercase: AUTH_PASSWORD.REQUIRE_UPPERCASE,
      requireLowercase: AUTH_PASSWORD.REQUIRE_LOWERCASE,
      requireNumber: AUTH_PASSWORD.REQUIRE_NUMBER,
      requireSymbol: AUTH_PASSWORD.REQUIRE_SYMBOL,
      historyCount: AUTH_PASSWORD.HISTORY_COUNT,
      expiryDays: AUTH_PASSWORD.EXPIRY_DAYS,
      bcryptRounds: AUTH_PASSWORD.BCRYPT_ROUNDS,
    };
  }

  static bcryptRounds(): number {
    return Math.min(
      SECURITY.BCRYPT_MAX_ROUNDS,
      Math.max(SECURITY.BCRYPT_MIN_ROUNDS, AUTH_PASSWORD.BCRYPT_ROUNDS),
    );
  }

  static expiryDate(nowMs: number = Date.now()): Date {
    return new Date(nowMs + AUTH_PASSWORD.EXPIRY_DAYS * 24 * 3600 * 1000);
  }

  static historyLimit(): number {
    return AUTH_PASSWORD.HISTORY_COUNT;
  }

  static resetTokenExpirySeconds(): number {
    return AUTH_PASSWORD.RESET_TOKEN_EXPIRY_SECONDS;
  }

  static maxResetAttempts(): number {
    return AUTH_PASSWORD.MAX_RESET_ATTEMPTS;
  }
}
