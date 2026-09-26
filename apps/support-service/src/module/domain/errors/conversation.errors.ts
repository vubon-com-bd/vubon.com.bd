/**
 * Conversation domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';

export class ConversationNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CONVERSATION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly conversationId: ConversationIdVO) {
    super(`Conversation not found: ${conversationId.value}`, {
      conversationId: conversationId.value,
    });
    this.name = 'ConversationNotFoundError';
  }
}

export class ConversationAlreadyClosedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CONVERSATION_ALREADY_CLOSED;
  readonly httpStatus = 409;
  constructor(public readonly conversationId: ConversationIdVO) {
    super(`Conversation already closed: ${conversationId.value}`, {
      conversationId: conversationId.value,
    });
    this.name = 'ConversationAlreadyClosedError';
  }
}

export class ConversationTerminalError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CONVERSATION_TERMINAL;
  readonly httpStatus = 409;
  constructor(public readonly conversationId: ConversationIdVO, public readonly action: string) {
    super(`Cannot ${action} a terminal conversation`, {
      conversationId: conversationId.value, action,
    });
    this.name = 'ConversationTerminalError';
  }
}
