/**
 * Session Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SessionNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SESSION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(sessionId: string) {
    super(`Session not found: ${sessionId}`, { sessionId });
  }
}

export class SessionExpiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 401;

  constructor(sessionId: string, expiredAt: string) {
    super(`Session ${sessionId} expired at ${expiredAt}`, {
      sessionId,
      expiredAt,
    });
  }
}

export class SessionRevokedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SESSION_REVOKED;
  readonly httpStatus = 401;

  constructor(sessionId: string, reason?: string) {
    super(`Session ${sessionId} revoked`, { sessionId, reason });
  }
}
