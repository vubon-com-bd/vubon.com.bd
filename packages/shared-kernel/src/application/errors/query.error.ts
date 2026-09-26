/**
 * Query Error
 * @module shared-kernel/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class QueryError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(
    message: string,
    public readonly queryType?: string,
    public readonly queryId?: string
  ) {
    super(message, { queryType, queryId });
    this.name = 'QueryError';
  }
}

export class QueryValidationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(
    message: string,
    public readonly queryType: string,
    public readonly field?: string
  ) {
    super(message, { queryType, field });
    this.name = 'QueryValidationError';
  }
}
