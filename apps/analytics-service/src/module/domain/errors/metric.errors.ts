/**
 * Metric Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class MetricNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly metricId: string) {
    super(`Metric "${metricId}" not found`, { metricId });
    this.name = 'MetricNotFoundError';
  }
}

export class MetricAggregationError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(
    public readonly metricName: string,
    public readonly aggregationType: string,
    public readonly reason: string
  ) {
    super(
      `Cannot aggregate metric "${metricName}" using "${aggregationType}": ${reason}`,
      { metricName, aggregationType, reason }
    );
    this.name = 'MetricAggregationError';
  }
}

export class MetricUnitMismatchError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly metricName: string,
    public readonly expectedUnit: string,
    public readonly actualUnit: string
  ) {
    super(
      `Unit mismatch for metric "${metricName}": expected "${expectedUnit}", got "${actualUnit}"`,
      { metricName, expectedUnit, actualUnit }
    );
    this.name = 'MetricUnitMismatchError';
  }
}

export class MetricValueOutOfRangeError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly value: number,
    public readonly unit: string,
    public readonly min?: number,
    public readonly max?: number
  ) {
    super(
      `Metric value ${value} out of range for unit "${unit}"`,
      { value, unit, min, max }
    );
    this.name = 'MetricValueOutOfRangeError';
  }
}

export class InvalidMetricOperationError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly operation: string,
    public readonly metricType: string
  ) {
    super(
      `Operation "${operation}" not supported for metric type "${metricType}"`,
      { operation, metricType }
    );
    this.name = 'InvalidMetricOperationError';
  }
}
