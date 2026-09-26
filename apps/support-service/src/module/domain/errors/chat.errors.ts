/**
 * Live chat domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export class ChatNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHAT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly chatId: LiveChatIdVO) {
    super(`Live chat not found: ${chatId.value}`, { chatId: chatId.value });
    this.name = 'ChatNotFoundError';
  }
}

export class ChatAlreadyEndedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHAT_ALREADY_ENDED;
  readonly httpStatus = 409;
  constructor(public readonly chatId: LiveChatIdVO) {
    super(`Live chat already ended: ${chatId.value}`, { chatId: chatId.value });
    this.name = 'ChatAlreadyEndedError';
  }
}

export class ChatTerminalError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHAT_TERMINAL;
  readonly httpStatus = 409;
  constructor(public readonly chatId: LiveChatIdVO, public readonly action: string) {
    super(`Cannot ${action} a terminal chat`, { chatId: chatId.value, action });
    this.name = 'ChatTerminalError';
  }
}

export class ChatAgentAlreadyAssignedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHAT_TERMINAL;
  readonly httpStatus = 409;
  constructor(public readonly chatId: LiveChatIdVO, public readonly agentId: AgentIdVO) {
    super(`Agent already assigned to chat: ${agentId.value}`, {
      chatId: chatId.value, agentId: agentId.value,
    });
    this.name = 'ChatAgentAlreadyAssignedError';
  }
}
