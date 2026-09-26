import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SearchFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_SEARCH_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Search failed: ${reason}`, { reason });
  }
}

export class InvalidQueryError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_SEARCH_INVALID_QUERY;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Invalid query: ${reason}`, { reason });
  }
}
