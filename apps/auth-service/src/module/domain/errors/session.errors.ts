import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SessionExpiredError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-002';
  readonly httpStatus = 401;

  constructor(sessionId: string) {
    super(`Session expired: ${sessionId}`, { sessionId });
  }
}

export class SessionRevokedError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-003';
  readonly httpStatus = 401;

  constructor(sessionId: string) {
    super(`Session revoked: ${sessionId}`, { sessionId });
  }
}
