/**
 * Media application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class MediaNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(mediaId: string) {
    super(`Media "${mediaId}" not found`, { mediaId });
    this.name = 'MediaNotFoundApplicationError';
  }
}

export class MediaOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Media operation failed: ${reason}`, { reason });
    this.name = 'MediaOperationFailedError';
  }
}
