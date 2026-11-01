/**
 * Credential Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Authentication (401) ───────────────────
export class CredentialMismatchError extends BusinessRuleError {
  constructor(identifier: string) {
    super(
      `Invalid credentials for "${identifier}"`,
      'CREDENTIAL_MISMATCH',
      { identifier },
    );
    this.name = 'CredentialMismatchError';
  }
}

export class PasswordExpiredError extends BusinessRuleError {
  constructor(authId: string, expiredAt: string) {
    super(
      `Password expired at ${expiredAt} for auth "${authId}"`,
      'PASSWORD_EXPIRED',
      { authId, expiredAt },
    );
    this.name = 'PasswordExpiredError';
  }
}

export class PasswordReusedError extends BusinessRuleError {
  constructor(authId: string, historyCount: number) {
    super(
      `Password was used before (last ${historyCount} passwords not allowed)`,
      'PASSWORD_REUSED',
      { authId, historyCount },
    );
    this.name = 'PasswordReusedError';
  }
}

export class PasswordTooWeakError extends ValidationError {
  constructor(reasons: readonly string[]) {
    super(`Password too weak: ${reasons.join('; ')}`, 'password');
    this.name = 'PasswordTooWeakError';
  }
}

export class PasswordHashInvalidError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid password hash: ${reason}`, 'passwordHash');
    this.name = 'PasswordHashInvalidError';
  }
}

export class CurrentPasswordMismatchError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `Current password does not match for auth "${authId}"`,
      'CURRENT_PASSWORD_MISMATCH',
      { authId },
    );
    this.name = 'CurrentPasswordMismatchError';
  }
}

export class PasswordPolicyViolationError extends ValidationError {
  constructor(field: string, message: string) {
    super(`Password policy violation: ${message}`, field);
    this.name = 'PasswordPolicyViolationError';
  }
}
