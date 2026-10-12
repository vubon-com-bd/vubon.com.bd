/**
 * Application-level vendor errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VendorAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SLUG_EXISTS;
  readonly httpStatus = 409;
  constructor(ownerId?: string) {
    super(
      ownerId ? `Vendor already exists for owner "${ownerId}"` : 'Vendor already exists',
      { ownerId },
    );
    this.name = 'VendorAlreadyExistsError';
  }
}

export class VendorRegistrationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Vendor registration failed: ${reason}`, { reason });
    this.name = 'VendorRegistrationFailedError';
  }
}

export class VendorUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Vendor update failed: ${reason}`, { reason });
    this.name = 'VendorUpdateFailedError';
  }
}

export class VendorSlugUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_SLUG_EXISTS;
  readonly httpStatus = 409;
  constructor(slug: string) {
    super(`Vendor slug "${slug}" is unavailable`, { slug });
    this.name = 'VendorSlugUnavailableError';
  }
}

export class VendorActivationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_NOT_APPROVED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Vendor activation failed: ${reason}`, { reason });
    this.name = 'VendorActivationFailedError';
  }
}

export class VendorOnboardingIncompleteError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_NOT_APPROVED;
  readonly httpStatus = 422;
  constructor(missingSteps: readonly string[]) {
    super(
      `Vendor onboarding incomplete. Missing: ${missingSteps.join(', ')}`,
      { missingSteps },
    );
    this.name = 'VendorOnboardingIncompleteError';
  }
}

export class VendorNotActiveError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_NOT_ACTIVE;
  readonly httpStatus = 403;
  constructor(vendorId: string) {
    super(`Vendor "${vendorId}" is not active`, { vendorId });
    this.name = 'VendorNotActiveError';
  }
}

export class VendorNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(vendorId: string) {
    super(`Vendor "${vendorId}" not found`, { vendorId });
    this.name = 'VendorNotFoundError';
  }
}
