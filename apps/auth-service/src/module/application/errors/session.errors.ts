import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SessionNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 404;

  constructor(sessionId: string) {
    super(`Session not found: ${sessionId}`, { sessionId });
  }
}

export class SessionOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Session operation failed: ${reason}`, { reason });
  }
}
