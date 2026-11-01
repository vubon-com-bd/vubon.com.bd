/**
 * Account Lock Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';

// ─── Not Found (404) ───────────────────────
export class AccountLockNotFoundError extends NotFoundError {
  constructor(authId: string) {
    super('AccountLock', authId);
    this.name = 'AccountLockNotFoundError';
  }
}

// ─── Business Rule (423 Locked) ─────────────
export class AccountLockedError extends BusinessRuleError {
  constructor(authId: string, lockedUntil: string, reason: string) {
    super(
      `Account locked until ${lockedUntil}: ${reason}`,
      'ACCOUNT_LOCKED',
      { authId, lockedUntil, reason },
    );
    this.name = 'AccountLockedError';
  }
}

// ─── Rate Limit (429) ───────────────────────
export class TooManyLoginAttemptsError extends BusinessRuleError {
  constructor(identifier: string, attempts: number, lockDurationSeconds: number) {
    super(
      `Too many login attempts (${attempts}) for "${identifier}". Locked for ${lockDurationSeconds}s`,
      'TOO_MANY_LOGIN_ATTEMPTS',
      { identifier, attempts, lockDurationSeconds },
    );
    this.name = 'TooManyLoginAttemptsError';
  }
}

export class TooManyLoginAttemptsPerIpError extends BusinessRuleError {
  constructor(ipAddress: string, attempts: number, maxAttempts: number) {
    super(
      `Too many login attempts from IP "${ipAddress}" (${attempts}/${maxAttempts})`,
      'TOO_MANY_LOGIN_ATTEMPTS_PER_IP',
      { ipAddress, attempts, maxAttempts },
    );
    this.name = 'TooManyLoginAttemptsPerIpError';
  }
}

// ─── Business Rule (400) ───────────────────
export class AccountAlreadyLockedError extends BusinessRuleError {
  constructor(authId: string, lockedUntil: string) {
    super(
      `Account "${authId}" is already locked until ${lockedUntil}`,
      'ACCOUNT_ALREADY_LOCKED',
      { authId, lockedUntil },
    );
    this.name = 'AccountAlreadyLockedError';
  }
}

export class AccountNotLockedError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `Account "${authId}" is not locked`,
      'ACCOUNT_NOT_LOCKED',
      { authId },
    );
    this.name = 'AccountNotLockedError';
  }
}
