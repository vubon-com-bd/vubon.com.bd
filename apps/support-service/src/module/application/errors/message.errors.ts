/**
 * Message application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class MessageNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly messageId: string) {
    super(`Message not found: ${messageId}`, { messageId });
    this.name = 'MessageNotFoundException';
  }
}

export class MessageCannotEditException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 409;

  constructor(public readonly messageId: string, public readonly reason: string) {
    super(`Cannot edit message: ${reason}`, { messageId, reason });
    this.name = 'MessageCannotEditException';
  }
}
