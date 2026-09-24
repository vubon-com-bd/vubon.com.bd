import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class ChatbotNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(chatbotId: string) {
    super(`Chatbot not found: ${chatbotId}`, { chatbotId });
  }
}

export class IntentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(intentId: string) {
    super(`Intent not found: ${intentId}`, { intentId });
  }
}
