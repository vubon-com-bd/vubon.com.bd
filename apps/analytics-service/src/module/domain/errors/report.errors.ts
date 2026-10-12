/**
 * Report Domain Errors
 * @module analytics-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReportNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(public readonly reportId: string) {
    super(`Report "${reportId}" not found`, { reportId });
    this.name = 'ReportNotFoundError';
  }
}

export class ReportGenerationError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(
    public readonly reportId: string,
    public readonly reason: string
  ) {
    super(`Failed to generate report "${reportId}": ${reason}`, {
      reportId,
      reason,
    });
    this.name = 'ReportGenerationError';
  }
}

export class InvalidScheduleError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly frequency: string,
    public readonly reason: string
  ) {
    super(`Invalid schedule "${frequency}": ${reason}`, { frequency, reason });
    this.name = 'InvalidScheduleError';
  }
}

export class ReportStatusTransitionError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly reportId: string,
    public readonly fromStatus: string,
    public readonly toStatus: string
  ) {
    super(
      `Cannot transition report "${reportId}" from "${fromStatus}" to "${toStatus}"`,
      { reportId, fromStatus, toStatus }
    );
    this.name = 'ReportStatusTransitionError';
  }
}

export class ReportFormatNotAllowedError extends DomainError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(
    public readonly format: string,
    public readonly frequency: string
  ) {
    super(
      `Format "${format}" not allowed for frequency "${frequency}"`,
      { format, frequency }
    );
    this.name = 'ReportFormatNotAllowedError';
  }
}

export class ReportLimitExceededError extends DomainError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;

  constructor(
    public readonly userId: string,
    public readonly currentCount: number,
    public readonly maxCount: number
  ) {
    super(
      `Report limit exceeded for user "${userId}": ${currentCount}/${maxCount}`,
      { userId, currentCount, maxCount }
    );
    this.name = 'ReportLimitExceededError';
  }
}
