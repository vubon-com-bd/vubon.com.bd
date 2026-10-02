/**
 * Category application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CategoryNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(categoryId: string) {
    super(`Category "${categoryId}" not found`, { categoryId });
    this.name = 'CategoryNotFoundApplicationError';
  }
}

export class CategorySlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Category slug "${slug}" already exists`, { slug });
    this.name = 'CategorySlugConflictError';
  }
}

export class CategoryOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Category operation failed: ${reason}`, { reason });
    this.name = 'CategoryOperationFailedError';
  }
}
