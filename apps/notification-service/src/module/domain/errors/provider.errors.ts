import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class ProviderNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(name: string) {
    super(`Provider not found: ${name}`, { name });
  }
}

export class ProviderTimeoutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(name: string) {
    super(`Provider timeout: ${name}`, { name });
  }
}

export class ProviderUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(name: string) {
    super(`Provider unavailable: ${name}`, { name });
  }
}
