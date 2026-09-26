import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class VectorNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(vectorId: string) {
    super(`Vector not found: ${vectorId}`, { vectorId });
  }
}

export class IndexNotBuiltError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(indexId: string) {
    super(`Vector index not built: ${indexId}`, { indexId });
  }
}
