/**
 * Collection application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CollectionNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(collectionId: string) {
    super(`Collection "${collectionId}" not found`, { collectionId });
    this.name = 'CollectionNotFoundApplicationError';
  }
}

export class CollectionSlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Collection slug "${slug}" already exists`, { slug });
    this.name = 'CollectionSlugConflictError';
  }
}

export class CollectionOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Collection operation failed: ${reason}`, { reason });
    this.name = 'CollectionOperationFailedError';
  }
}
