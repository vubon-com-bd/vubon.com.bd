import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ForecastFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Forecast failed: ${reason}`, { reason });
  }
}

export class InsufficientDataForForecastError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(required: number, provided: number) {
    super(`Insufficient data for forecast: need ${required}, have ${provided}`, {
      required,
      provided,
    });
  }
}
