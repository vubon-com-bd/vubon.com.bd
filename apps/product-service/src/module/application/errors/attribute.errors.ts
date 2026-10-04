/**
 * Attribute application errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class AttributeNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(attributeId: string) {
    super(`Attribute "${attributeId}" not found`, { attributeId });
    this.name = 'AttributeNotFoundApplicationError';
  }
}

export class AttributeOperationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Attribute operation failed: ${reason}`, { reason });
    this.name = 'AttributeOperationFailedError';
  }
}
