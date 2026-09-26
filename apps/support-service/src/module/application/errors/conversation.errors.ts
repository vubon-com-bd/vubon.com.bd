/**
 * Conversation application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ConversationNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly conversationId: string) {
    super(`Conversation not found: ${conversationId}`, { conversationId });
    this.name = 'ConversationNotFoundException';
  }
}

export class ConversationClosedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly conversationId: string) {
    super(`Conversation is closed: ${conversationId}`, { conversationId });
    this.name = 'ConversationClosedException';
  }
}

export class ConversationUnauthorizedException extends ApplicationError {
  readonly code = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(public readonly conversationId: string, public readonly action: string) {
    super(`Not allowed to ${action} conversation ${conversationId}`, {
      conversationId,
      action,
    });
    this.name = 'ConversationUnauthorizedException';
  }
}
