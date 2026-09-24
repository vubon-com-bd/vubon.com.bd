import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class ChatNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(chatId: string) {
    super(`Chat not found: ${chatId}`, { chatId });
  }
}

export class ChatAlreadyEndedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(chatId: string) {
    super(`Chat already ended: ${chatId}`, { chatId });
  }
}
