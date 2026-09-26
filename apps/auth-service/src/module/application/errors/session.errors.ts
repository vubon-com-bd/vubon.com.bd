/**
 * Session Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SessionNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(sessionId: string) {
    super(`Session not found: ${sessionId}`, { sessionId });
  }
}

export class SessionExpiredAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 401;

  constructor(sessionId: string, expiredAt?: string) {
    super(
      expiredAt
        ? `Session ${sessionId} expired at ${expiredAt}`
        : `Session ${sessionId} has expired`,
      { sessionId, expiredAt },
    );
  }
}

export class SessionRevokedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_REVOKED;
  readonly httpStatus = 401;

  constructor(sessionId: string, reason?: string) {
    super(
      `Session ${sessionId} was revoked${reason ? `: ${reason}` : ''}`,
      { sessionId, reason },
    );
  }
}
