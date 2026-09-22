import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class KycOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`KYC operation failed: ${reason}`, { reason });
  }
}

export class KycNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`KYC not found for user: ${userId}`, { userId });
  }
}

export class KycNotAllowedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(reason: string) {
    super(`KYC not allowed: ${reason}`, { reason });
  }
}
