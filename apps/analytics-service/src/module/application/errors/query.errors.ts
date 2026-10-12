/**
 * Query Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InvalidQueryError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;

  constructor(reason: string) {
    super(`Invalid query: ${reason}`, { reason });
    this.name = 'InvalidQueryError';
  }
}

export class QueryExecutionFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(public readonly queryType: string, reason: string) {
    super(`Query "${queryType}" failed: ${reason}`, { queryType, reason });
    this.name = 'QueryExecutionFailedError';
  }
}
