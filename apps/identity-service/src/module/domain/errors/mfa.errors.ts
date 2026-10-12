/**
 * MFA Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class MfaNotFoundError extends NotFoundError {
  constructor(authId: string) {
    super('Mfa', authId);
    this.name = 'MfaNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class MfaAlreadyEnabledError extends ConflictError {
  constructor(authId: string) {
    super(`MFA already enabled for auth "${authId}"`, 'mfaEnabled');
    this.name = 'MfaAlreadyEnabledError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidMfaMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid MFA method "${value}". Allowed: ${allowed.join(', ')}`, 'mfaMethod');
    this.name = 'InvalidMfaMethodError';
  }
}

// ─── Authentication (401) ───────────────────
export class MfaRequiredError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `MFA required for auth "${authId}"`,
      'MFA_REQUIRED',
      { authId },
    );
    this.name = 'MfaRequiredError';
  }
}

export class MfaInvalidCodeError extends BusinessRuleError {
  constructor(method: string, attempt: number, maxAttempts: number) {
    super(
      `Invalid MFA code (attempt ${attempt}/${maxAttempts})`,
      'MFA_INVALID_CODE',
      { method, attempt, maxAttempts },
    );
    this.name = 'MfaInvalidCodeError';
  }
}

export class MfaNotEnabledError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `MFA not enabled for auth "${authId}"`,
      'MFA_NOT_ENABLED',
      { authId },
    );
    this.name = 'MfaNotEnabledError';
  }
}

export class MfaCodeExpiredError extends BusinessRuleError {
  constructor(expiredAt: string) {
    super(`MFA code expired at ${expiredAt}`, 'MFA_CODE_EXPIRED', { expiredAt });
    this.name = 'MfaCodeExpiredError';
  }
}

export class MfaMaxAttemptsError extends BusinessRuleError {
  constructor(authId: string, attempts: number) {
    super(
      `Max MFA attempts exceeded (${attempts}) for auth "${authId}"`,
      'MFA_MAX_ATTEMPTS',
      { authId, attempts },
    );
    this.name = 'MfaMaxAttemptsError';
  }
}

export class BackupCodeExhaustedError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `All backup codes exhausted for auth "${authId}"`,
      'BACKUP_CODE_EXHAUSTED',
      { authId },
    );
    this.name = 'BackupCodeExhaustedError';
  }
}

export class BackupCodeInvalidError extends BusinessRuleError {
  constructor(code: string) {
    super(
      `Invalid backup code "${code.slice(0, 4)}****"`,
      'BACKUP_CODE_INVALID',
      { codeLength: code.length },
    );
    this.name = 'BackupCodeInvalidError';
  }
}

export class MfaChallengeExpiredError extends BusinessRuleError {
  constructor(challengeId: string) {
    super(
      `MFA challenge "${challengeId}" has expired`,
      'MFA_CHALLENGE_EXPIRED',
      { challengeId },
    );
    this.name = 'MfaChallengeExpiredError';
  }
}
