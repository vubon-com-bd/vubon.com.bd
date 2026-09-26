import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ProviderNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(providerId: string) {
    super(`Provider not found: ${providerId}`, { providerId });
  }
}

export class ProviderUnavailableError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(providerId: string) {
    super(`Provider unavailable: ${providerId}`, { providerId });
  }
}

export class ProviderTimeoutError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(providerId: string, timeoutMs: number) {
    super(`Provider ${providerId} timed out after ${timeoutMs}ms`, {
      providerId,
      timeoutMs,
    });
  }
}

export class ProviderRateLimitError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_RATE_LIMIT;
  readonly httpStatus = 429;

  constructor(providerId: string) {
    super(`Provider rate limit exceeded: ${providerId}`, { providerId });
  }
}

export class ProviderAuthError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_PROVIDER_AUTH_FAILED;
  readonly httpStatus = 401;

  constructor(providerId: string) {
    super(`Provider authentication failed: ${providerId}`, { providerId });
  }
}
