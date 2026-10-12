/**
 * Metric Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class MetricAggregationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(public readonly metricName: string, reason: string) {
    super(`Aggregation failed for "${metricName}": ${reason}`, { metricName, reason });
    this.name = 'MetricAggregationFailedError';
  }
}

export class MetricQueryTimeoutError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_TIMEOUT;
  readonly httpStatus = 504;

  constructor(public readonly timeoutMs: number) {
    super(`Metric query timed out after ${timeoutMs}ms`, { timeoutMs });
    this.name = 'MetricQueryTimeoutError';
  }
}
