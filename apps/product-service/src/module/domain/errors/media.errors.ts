import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class MediaNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(mediaId: string) {
    super(`Media not found: ${mediaId}`, { mediaId });
  }
}

export class MediaLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(limit: number) {
    super(`Media limit exceeded: max ${limit}`, { limit });
  }
}

export class InvalidMediaTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(mediaType: string) {
    super(`Invalid media type: ${mediaType}`, { mediaType });
  }
}
