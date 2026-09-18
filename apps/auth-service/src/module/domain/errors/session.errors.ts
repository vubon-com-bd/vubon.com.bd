import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SessionExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_EXPIRED;
  readonly httpStatus = 401;

  constructor(sessionId: string) {
    super(`Session expired: ${sessionId}`, { sessionId });
  }
}

export class SessionRevokedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SESSION_REVOKED;
  readonly httpStatus = 401;

  constructor(sessionId: string) {
    super(`Session revoked: ${sessionId}`, { sessionId });
  }
}
