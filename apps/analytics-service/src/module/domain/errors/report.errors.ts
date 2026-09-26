import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ReportNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 404;

  constructor(reportId: string) {
    super(`Report not found: ${reportId}`, { reportId });
  }
}

export class ReportGenerationError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Report generation failed: ${reason}`, { reason });
  }
}
