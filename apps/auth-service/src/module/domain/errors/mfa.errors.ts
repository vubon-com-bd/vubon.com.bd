/**
 * MFA Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class MfaNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_MFA_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`MFA not configured for user: ${userId}`, { userId });
  }
}

export class MfaRequiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_MFA_REQUIRED;
  readonly httpStatus = 401;

  constructor(userId: string) {
    super(`MFA required for user: ${userId}`, { userId });
  }
}

export class MfaInvalidError extends DomainError {
  readonly code = ERROR_CODE.AUTH_MFA_INVALID;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Invalid MFA: ${reason}`, { reason });
  }
}

export class MfaAlreadyEnabledError extends DomainError {
  readonly code = ERROR_CODE.AUTH_MFA_ALREADY_ENABLED;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`MFA already enabled for user: ${userId}`, { userId });
  }
}

export class MfaDisabledError extends DomainError {
  readonly code = ERROR_CODE.AUTH_MFA_DISABLED;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`MFA disabled for user: ${userId}`, { userId });
  }
}
