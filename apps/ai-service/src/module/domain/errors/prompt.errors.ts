import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PromptTooLongError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(tokens: number, max: number) {
    super(`Prompt too long: ${tokens} tokens (max ${max})`, { tokens, max });
  }
}

export class RateLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.RATE_LIMIT_EXCEEDED;
  readonly httpStatus = 429;

  constructor(provider: string) {
    super(`Rate limit exceeded for provider: ${provider}`, { provider });
  }
}

export class ContentFilteredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Content filtered: ${reason}`, { reason });
  }
}
