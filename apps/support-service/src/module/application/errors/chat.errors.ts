/**
 * Live chat application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ChatSessionNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly sessionId: string) {
    super(`Chat session not found: ${sessionId}`, { sessionId });
    this.name = 'ChatSessionNotFoundException';
  }
}

export class ChatSessionEndedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly sessionId: string) {
    super(`Chat session already ended: ${sessionId}`, { sessionId });
    this.name = 'ChatSessionEndedException';
  }
}

export class ChatSessionNotActiveException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly sessionId: string) {
    super(`Chat session is not active: ${sessionId}`, { sessionId });
    this.name = 'ChatSessionNotActiveException';
  }
}
