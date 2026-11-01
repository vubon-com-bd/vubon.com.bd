/**
 * Two-Factor Auth Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class TwoFactorNotFoundError extends NotFoundError {
  constructor(authId: string) {
    super('TwoFactor', authId);
    this.name = 'TwoFactorNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class TwoFactorAlreadyEnabledError extends ConflictError {
  constructor(authId: string) {
    super(`2FA already enabled for auth "${authId}"`, 'twoFactorEnabled');
    this.name = 'TwoFactorAlreadyEnabledError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidTwoFactorMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid 2FA method "${value}". Allowed: ${allowed.join(', ')}`,
      'twoFactorMethod',
    );
    this.name = 'InvalidTwoFactorMethodError';
  }
}

// ─── Business Rule (400) ───────────────────
export class TwoFactorNotEnabledError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `2FA not enabled for auth "${authId}"`,
      'TWO_FACTOR_NOT_ENABLED',
      { authId },
    );
    this.name = 'TwoFactorNotEnabledError';
  }
}

export class TwoFactorRequiredError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `2FA is required for auth "${authId}"`,
      'TWO_FACTOR_REQUIRED',
      { authId },
    );
    this.name = 'TwoFactorRequiredError';
  }
}

export class TwoFactorInvalidCodeError extends BusinessRuleError {
  constructor(authId: string, method: string, attempt: number, maxAttempts: number) {
    super(
      `Invalid 2FA code for auth "${authId}" (attempt ${attempt}/${maxAttempts})`,
      'TWO_FACTOR_INVALID_CODE',
      { authId, method, attempt, maxAttempts },
    );
    this.name = 'TwoFactorInvalidCodeError';
  }
}
