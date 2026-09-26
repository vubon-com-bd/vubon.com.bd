import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class EmbeddingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_EMBEDDING_FAILED;
  readonly httpStatus = 500;

  constructor(sourceId: string, reason: string) {
    super(`Embedding failed for ${sourceId}: ${reason}`, { sourceId, reason });
  }
}

export class DimensionMismatchError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_EMBEDDING_DIMENSION_MISMATCH;
  readonly httpStatus = 400;

  constructor(expected: number, actual: number) {
    super(`Dimension mismatch: expected ${expected}, got ${actual}`, {
      expected,
      actual,
    });
  }
}

export class BatchTooLargeError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_EMBEDDING_BATCH_TOO_LARGE;
  readonly httpStatus = 413;

  constructor(size: number, max: number) {
    super(`Embedding batch too large: ${size} > ${max}`, { size, max });
  }
}
