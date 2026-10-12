/**
 * Packaging application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class PackagingNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;
  constructor(public readonly packagingId: string) {
    super(`Packaging "${packagingId}" not found`, { packagingId });
    this.name = 'PackagingNotFoundApplicationError';
  }
}

export class PackagingOutOfStockApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;
  constructor(public readonly packagingId: string) {
    super(`Packaging "${packagingId}" is out of stock`, { packagingId });
    this.name = 'PackagingOutOfStockApplicationError';
  }
}

export class PackagingOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly packagingId?: string) {
    super(`Packaging ${operation} failed: ${reason}`, { operation, packagingId });
    this.name = 'PackagingOperationFailedApplicationError';
  }
}
