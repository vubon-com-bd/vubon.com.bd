/**
 * User Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class UserNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('User', userId);
    this.name = 'UserNotFoundError';
  }
}

export class UserNotFoundByEmailError extends NotFoundError {
  constructor(email: string) {
    super('User', email);
    this.name = 'UserNotFoundByEmailError';
  }
}

// ─── Conflict (409) ────────────────────────
export class UserAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`User with email "${email}" already exists`, 'email');
    this.name = 'UserAlreadyExistsError';
  }
}

export class UserAlreadyActiveError extends ConflictError {
  constructor(userId: string) {
    super(`User "${userId}" is already active`, 'status');
    this.name = 'UserAlreadyActiveError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidUserStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid user status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidUserStatusError';
  }
}

export class InvalidUserTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid user type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidUserTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class UserSuspendedError extends BusinessRuleError {
  constructor(userId: string, reason?: string) {
    super(
      `User "${userId}" is suspended${reason ? `: ${reason}` : ''}`,
      'USER_SUSPENDED',
      { userId, reason },
    );
    this.name = 'UserSuspendedError';
  }
}

export class UserInactiveError extends BusinessRuleError {
  constructor(userId: string) {
    super(`User "${userId}" is inactive`, 'USER_INACTIVE', { userId });
    this.name = 'UserInactiveError';
  }
}

export class UserDeletedError extends BusinessRuleError {
  constructor(userId: string) {
    super(`User "${userId}" is deleted`, 'USER_DELETED', { userId });
    this.name = 'UserDeletedError';
  }
}

export class UserCannotBeDeletedError extends BusinessRuleError {
  constructor(userId: string, reason: string) {
    super(
      `User "${userId}" cannot be deleted: ${reason}`,
      'USER_CANNOT_BE_DELETED',
      { userId, reason },
    );
    this.name = 'UserCannotBeDeletedError';
  }
}

export class UserEmailNotVerifiedError extends BusinessRuleError {
  constructor(userId: string) {
    super(
      `User "${userId}" email is not verified`,
      'USER_EMAIL_NOT_VERIFIED',
      { userId },
    );
    this.name = 'UserEmailNotVerifiedError';
  }
}

export class InvalidUserStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, userId?: string) {
    super(
      `Cannot transition user status from "${from}" to "${to}"`,
      'INVALID_USER_STATUS_TRANSITION',
      { from, to, userId },
    );
    this.name = 'InvalidUserStatusTransitionError';
  }
}
