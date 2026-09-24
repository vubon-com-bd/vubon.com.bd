import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class ConversationNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(conversationId: string) {
    super(`Conversation not found: ${conversationId}`, { conversationId });
  }
}

export class ConversationAlreadyClosedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(conversationId: string) {
    super(`Conversation already closed: ${conversationId}`, { conversationId });
  }
}
