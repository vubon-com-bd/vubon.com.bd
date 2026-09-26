/**
 * Message domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';

export class MessageNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_MESSAGE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly messageId: MessageIdVO) {
    super(`Message not found: ${messageId.value}`, { messageId: messageId.value });
    this.name = 'MessageNotFoundError';
  }
}

export class MessageCannotEditError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_MESSAGE_CANNOT_EDIT;
  readonly httpStatus = 409;
  constructor(public readonly messageId: MessageIdVO, public readonly reason: string) {
    super(`Cannot edit message: ${reason}`, { messageId: messageId.value, reason });
    this.name = 'MessageCannotEditError';
  }
}

export class ConversationClosedForMessageError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CONVERSATION_CLOSED_FOR_MESSAGE;
  readonly httpStatus = 409;
  constructor(public readonly conversationId: ConversationIdVO) {
    super(`Cannot send message to closed conversation: ${conversationId.value}`, {
      conversationId: conversationId.value,
    });
    this.name = 'ConversationClosedForMessageError';
  }
}
