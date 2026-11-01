/**
 * Auth Domain Errors
 * @module identity-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class AuthNotFoundError extends NotFoundError {
  constructor(authId: string) {
    super('Auth', authId);
    this.name = 'AuthNotFoundError';
  }
}

export class AuthNotFoundByUserError extends NotFoundError {
  constructor(userId: string) {
    super('Auth', userId);
    this.name = 'AuthNotFoundByUserError';
  }
}

// ─── Conflict (409) ────────────────────────
export class AuthAlreadyExistsError extends ConflictError {
  constructor(identifier: string) {
    super(`Auth with identifier "${identifier}" already exists`, 'identifier');
    this.name = 'AuthAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidAuthTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid auth type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidAuthTypeError';
  }
}

export class InvalidAuthStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid auth status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidAuthStatusError';
  }
}

export class InvalidAuthProviderError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid auth provider "${value}". Allowed: ${allowed.join(', ')}`, 'provider');
    this.name = 'InvalidAuthProviderError';
  }
}

export class InvalidAuthMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid auth method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidAuthMethodError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvalidAuthStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, authId?: string) {
    super(
      `Cannot transition auth status from "${from}" to "${to}"`,
      'INVALID_AUTH_STATUS_TRANSITION',
      { from, to, authId },
    );
    this.name = 'InvalidAuthStatusTransitionError';
  }
}

export class AuthLockedError extends BusinessRuleError {
  constructor(authId: string, lockedUntil: string) {
    super(
      `Auth "${authId}" is locked until ${lockedUntil}`,
      'AUTH_LOCKED',
      { authId, lockedUntil },
    );
    this.name = 'AuthLockedError';
  }
}

export class AuthExpiredError extends BusinessRuleError {
  constructor(authId: string, expiredAt: string) {
    super(`Auth "${authId}" expired at ${expiredAt}`, 'AUTH_EXPIRED', {
      authId,
      expiredAt,
    });
    this.name = 'AuthExpiredError';
  }
}

export class AuthUnverifiedError extends BusinessRuleError {
  constructor(authId: string, reason?: string) {
    super(
      `Auth "${authId}" is not verified${reason ? `: ${reason}` : ''}`,
      'AUTH_UNVERIFIED',
      { authId, reason },
    );
    this.name = 'AuthUnverifiedError';
  }
}

/**
 * InvalidCredentialsError — wrong password / no credential
 */
export class InvalidCredentialsError extends BusinessRuleError {
  constructor() {
    super(
      'Invalid email or password',
      'AUTH_INVALID_CREDENTIALS',
      { reason: 'invalid_credentials' },
    );
  }
}
