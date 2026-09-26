import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ProviderUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(provider: string, reason: string) {
    super(`Provider ${provider} unavailable: ${reason}`, { provider, reason });
  }
}

export class ProviderTimeoutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(provider: string, timeoutMs: number) {
    super(`Provider ${provider} timed out after ${timeoutMs}ms`, { provider, timeoutMs });
  }
}

export class ProviderRateLimitError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_RATE_LIMIT;
  readonly httpStatus = 429;

  constructor(provider: string) {
    super(`Provider ${provider} rate limit exceeded`, { provider });
  }
}

export class ProviderAuthError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_AUTH_FAILED;
  readonly httpStatus = 401;

  constructor(provider: string) {
    super(`Provider ${provider} authentication failed`, { provider });
  }
}
