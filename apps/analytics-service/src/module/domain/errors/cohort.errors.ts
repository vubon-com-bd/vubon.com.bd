import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CohortNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 404;

  constructor(cohortId: string) {
    super(`Cohort not found: ${cohortId}`, { cohortId });
  }
}

export class InsufficientCohortDataError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(actual: number, minimum: number) {
    super(`Insufficient cohort data: ${actual}, minimum ${minimum}`, {
      actual,
      minimum,
    });
  }
}
