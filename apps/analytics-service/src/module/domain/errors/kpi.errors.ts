/**
 * KPI Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class KpiNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly kpiId: string) {
    super(`KPI "${kpiId}" not found`, { kpiId });
    this.name = 'KpiNotFoundError';
  }
}

export class KpiThresholdError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly threshold: number,
    public readonly reason: string
  ) {
    super(`Invalid KPI threshold ${threshold}%: ${reason}`, { threshold, reason });
    this.name = 'KpiThresholdError';
  }
}

export class KpiBreachError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(
    public readonly kpiId: string,
    public readonly kpiName: string,
    public readonly actual: number,
    public readonly target: number,
    public readonly achievementPercent: number
  ) {
    super(
      `KPI "${kpiName}" breached: ${achievementPercent.toFixed(1)}% (actual ${actual}, target ${target})`,
      { kpiId, kpiName, actual, target, achievementPercent }
    );
    this.name = 'KpiBreachError';
  }
}

export class KpiInactiveError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly kpiId: string) {
    super(`KPI "${kpiId}" is inactive`, { kpiId });
    this.name = 'KpiInactiveError';
  }
}

export class KpiTargetError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly target: number,
    public readonly reason: string
  ) {
    super(`Invalid KPI target ${target}: ${reason}`, { target, reason });
    this.name = 'KpiTargetError';
  }
}
