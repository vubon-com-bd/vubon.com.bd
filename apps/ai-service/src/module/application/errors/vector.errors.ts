import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class VectorNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_VECTOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(vectorId: string) {
    super(`Vector not found: ${vectorId}`, { vectorId });
  }
}

export class VectorIndexNotReadyError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_VECTOR_INDEX_NOT_READY;
  readonly httpStatus = 503;

  constructor(indexId: string) {
    super(`Vector index not ready: ${indexId}`, { indexId });
  }
}

export class VectorSearchFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_VECTOR_SEARCH_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Vector search failed: ${reason}`, { reason });
  }
}
