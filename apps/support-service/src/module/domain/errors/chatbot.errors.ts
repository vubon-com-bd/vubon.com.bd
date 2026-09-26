/**
 * Chatbot domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';

export class ChatbotNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHATBOT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly chatbotId: ChatbotIdVO) {
    super(`Chatbot not found: ${chatbotId.value}`, { chatbotId: chatbotId.value });
    this.name = 'ChatbotNotFoundError';
  }
}

export class ChatbotInactiveError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHATBOT_NOT_OPERATIONAL;
  readonly httpStatus = 409;
  constructor(public readonly chatbotId: ChatbotIdVO) {
    super(`Chatbot is not operational: ${chatbotId.value}`, { chatbotId: chatbotId.value });
    this.name = 'ChatbotInactiveError';
  }
}

export class ChatbotIntentNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHATBOT_INTENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly intentId: ChatbotIntentIdVO) {
    super(`Chatbot intent not found: ${intentId.value}`, { intentId: intentId.value });
    this.name = 'ChatbotIntentNotFoundError';
  }
}

export class ChatbotIntentDuplicateError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_CHATBOT_INTENT_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(public readonly intentId: ChatbotIntentIdVO) {
    super(`Chatbot intent already registered: ${intentId.value}`, { intentId: intentId.value });
    this.name = 'ChatbotIntentDuplicateError';
  }
}
