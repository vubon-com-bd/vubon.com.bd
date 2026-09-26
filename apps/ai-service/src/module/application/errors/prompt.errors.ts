import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class PromptNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROMPT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(promptId: string) {
    super(`Prompt not found: ${promptId}`, { promptId });
  }
}

export class PromptTooLongError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROMPT_TOO_LONG;
  readonly httpStatus = 400;

  constructor(tokens: number, max: number) {
    super(`Prompt exceeds token limit: ${tokens} > ${max}`, { tokens, max });
  }
}

export class ContentFilteredError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROMPT_CONTENT_FILTERED;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Content filtered: ${reason}`, { reason });
  }
}

export class CompletionFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_COMPLETION_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Completion failed: ${reason}`, { reason });
  }
}
