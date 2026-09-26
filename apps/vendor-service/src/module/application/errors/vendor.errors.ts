import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class VendorAlreadyExistsError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(ownerId: string) {
    super(`Vendor already exists for owner: ${ownerId}`, { ownerId });
  }
}

export class VendorRegistrationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Vendor registration failed: ${reason}`, { reason });
  }
}

export class VendorNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(vendorId: string) {
    super(`Vendor not found: ${vendorId}`, { vendorId });
  }
}
