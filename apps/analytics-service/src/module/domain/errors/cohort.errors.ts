/**
 * Cohort Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CohortNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly cohortId: string) {
    super(`Cohort "${cohortId}" not found`, { cohortId });
    this.name = 'CohortNotFoundError';
  }
}

export class InsufficientCohortDataError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly cohortId: string,
    public readonly currentSize: number,
    public readonly minSize: number
  ) {
    super(
      `Cohort "${cohortId}" has insufficient data: ${currentSize}/${minSize}`,
      { cohortId, currentSize, minSize }
    );
    this.name = 'InsufficientCohortDataError';
  }
}

export class InvalidCohortPeriodError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly period: string,
    public readonly reason: string
  ) {
    super(`Invalid cohort period "${period}": ${reason}`, { period, reason });
    this.name = 'InvalidCohortPeriodError';
  }
}

export class CohortInactiveError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(public readonly cohortId: string) {
    super(`Cohort "${cohortId}" is inactive`, { cohortId });
    this.name = 'CohortInactiveError';
  }
}

export class CohortRetentionError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly cohortId: string,
    public readonly reason: string
  ) {
    super(`Retention calculation failed for cohort "${cohortId}": ${reason}`, {
      cohortId,
      reason,
    });
    this.name = 'CohortRetentionError';
  }
}
