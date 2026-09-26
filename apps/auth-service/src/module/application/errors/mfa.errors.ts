/**
 * MFA Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class MfaRequiredAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_REQUIRED;
  readonly httpStatus = 401;

  constructor(userId: string, methods: readonly string[] = []) {
    super('MFA verification required', { userId, methods });
  }
}

export class MfaInvalidAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_INVALID;
  readonly httpStatus = 401;

  constructor(reason = 'Invalid MFA code') {
    super(reason);
  }
}

export class MfaNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`MFA not configured for user: ${userId}`, { userId });
  }
}

export class MfaAlreadyEnabledAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_ALREADY_ENABLED;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`MFA already enabled for user: ${userId}`, { userId });
  }
}

export class MfaDisabledAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_MFA_DISABLED;
  readonly httpStatus = 400;

  constructor(userId: string) {
    super(`MFA is disabled for user: ${userId}`, { userId });
  }
}
