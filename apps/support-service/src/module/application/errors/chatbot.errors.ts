/**
 * Chatbot application errors
 * @module support-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ChatbotNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly chatbotId: string) {
    super(`Chatbot not found: ${chatbotId}`, { chatbotId });
    this.name = 'ChatbotNotFoundException';
  }
}

export class ChatbotInactiveException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly chatbotId: string) {
    super(`Chatbot is inactive: ${chatbotId}`, { chatbotId });
    this.name = 'ChatbotInactiveException';
  }
}
