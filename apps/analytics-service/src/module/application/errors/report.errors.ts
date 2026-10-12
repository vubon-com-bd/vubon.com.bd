/**
 * Report Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReportGenerationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(public readonly reportId: string, reason: string) {
    super(`Report generation failed for "${reportId}": ${reason}`, { reportId, reason });
    this.name = 'ReportGenerationFailedError';
  }
}

export class ReportExportLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(public readonly requested: number, public readonly max: number) {
    super(`Export limit exceeded: ${requested} > ${max}`, { requested, max });
    this.name = 'ReportExportLimitExceededError';
  }
}
