import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ProviderNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(providerId: string) {
    super(`Provider not found: ${providerId}`, { providerId });
  }
}

export class ProviderUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(providerId: string) {
    super(`Provider unavailable: ${providerId}`, { providerId });
  }
}

export class ProviderTimeoutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(providerId: string, timeoutMs: number) {
    super(`Provider ${providerId} timed out after ${timeoutMs}ms`, {
      providerId,
      timeoutMs,
    });
  }
}
