import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class GatewayTimeoutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(gateway: string) {
    super(`Gateway timeout: ${gateway}`, { gateway });
  }
}

export class GatewayUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(gateway: string) {
    super(`Gateway unavailable: ${gateway}`, { gateway });
  }
}
