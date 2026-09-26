import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ForecastNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_FORECAST_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(forecastId: string) {
    super(`Forecast not found: ${forecastId}`, { forecastId });
  }
}

export class ForecastFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_FORECAST_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Forecast failed: ${reason}`, { reason });
  }
}

export class InsufficientDataForForecastError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_FORECAST_INSUFFICIENT_DATA;
  readonly httpStatus = 400;

  constructor(required: number, provided: number) {
    super(`Insufficient data for forecast: need ${required}, have ${provided}`, {
      required,
      provided,
    });
  }
}
