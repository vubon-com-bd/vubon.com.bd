import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class FunnelNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 404;

  constructor(funnelId: string) {
    super(`Funnel not found: ${funnelId}`, { funnelId });
  }
}

export class FunnelStepError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Funnel step error: ${reason}`, { reason });
  }
}
