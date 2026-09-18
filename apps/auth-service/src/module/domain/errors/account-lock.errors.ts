import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class AccountLockedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_ACCOUNT_LOCKED;
  readonly httpStatus = 423;

  constructor(userId: string) {
    super(`Account locked: ${userId}`, { userId });
  }
}

export class TooManyAttemptsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOO_MANY_ATTEMPTS;
  readonly httpStatus = 429;

  constructor(userId: string) {
    super(`Too many login attempts: ${userId}`, { userId });
  }
}
