/**
 * Brand application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class BrandNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(brandId: string) {
    super(`Brand "${brandId}" not found`, { brandId });
    this.name = 'BrandNotFoundApplicationError';
  }
}

export class BrandSlugConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Brand slug "${slug}" already exists`, { slug });
    this.name = 'BrandSlugConflictError';
  }
}

export class BrandOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Brand operation failed: ${reason}`, { reason });
    this.name = 'BrandOperationFailedError';
  }
}
