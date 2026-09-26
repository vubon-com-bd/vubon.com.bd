import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ProviderUnavailableApplicationError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(providerName: string) {
    super(`Provider unavailable: ${providerName}`, { providerName });
  }
}

export class ProviderTimeoutApplicationError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(providerName: string) {
    super(`Provider timeout: ${providerName}`, { providerName });
  }
}
