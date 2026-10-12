/**
 * KPI Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class KpiEvaluationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 422;

  constructor(public readonly kpiId: string, reason: string) {
    super(`KPI evaluation failed for "${kpiId}": ${reason}`, { kpiId, reason });
    this.name = 'KpiEvaluationFailedError';
  }
}

export class KpiAlreadyEvaluatedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly kpiId: string) {
    super(`KPI "${kpiId}" already evaluated recently`, { kpiId });
    this.name = 'KpiAlreadyEvaluatedError';
  }
}
