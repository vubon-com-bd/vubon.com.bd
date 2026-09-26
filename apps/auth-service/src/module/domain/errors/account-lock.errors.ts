/**
 * Account Lock Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class AccountLockedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_ACCOUNT_LOCKED;
  readonly httpStatus = 403;

  constructor(userId: string, reason: string, until: string) {
    super(`Account ${userId} locked (${reason}) until ${until}`, {
      userId,
      reason,
      until,
    });
  }
}

export class AccountNotLockedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_ACCOUNT_NOT_LOCKED;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`Account ${userId} is not locked`, { userId });
  }
}

export class TooManyAttemptsError extends DomainError {
  readonly code = ERROR_CODE.AUTH_TOO_MANY_ATTEMPTS;
  readonly httpStatus = 429;

  constructor(attempts: number, maxAttempts: number) {
    super(`Too many login attempts: ${attempts} >= ${maxAttempts}`, {
      attempts,
      maxAttempts,
    });
  }
}
