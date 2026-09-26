import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class EmbeddingFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Embedding failed: ${reason}`, { reason });
  }
}

export class DimensionMismatchError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(expected: number, actual: number) {
    super(`Dimension mismatch: expected ${expected}, got ${actual}`, {
      expected,
      actual,
    });
  }
}
