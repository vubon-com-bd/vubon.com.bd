/**
 * Vendor Application Errors
 * @module vendor-service/application/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class VendorNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(vendorId: string) {
    super('Vendor', vendorId);
    this.name = 'VendorNotFoundApplicationError';
  }
}

export class VendorBySlugNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(slug: string) {
    super('VendorBySlug', slug);
    this.name = 'VendorBySlugNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class VendorValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'VendorValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class VendorRegistrationError extends CommandError {
  constructor(reason: string) {
    super(`Vendor registration failed: ${reason}`, 'RegisterVendor');
    this.name = 'VendorRegistrationError';
  }
}

export class VendorUpdateError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" update failed: ${reason}`, 'UpdateVendor');
    this.name = 'VendorUpdateError';
  }
}

export class VendorDeleteError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" delete failed: ${reason}`, 'DeleteVendor');
    this.name = 'VendorDeleteError';
  }
}

export class VendorProfileUpdateError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" profile update failed: ${reason}`, 'UpdateVendorProfile');
    this.name = 'VendorProfileUpdateError';
  }
}

export class VendorBusinessUpdateError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" business update failed: ${reason}`, 'UpdateVendorBusiness');
    this.name = 'VendorBusinessUpdateError';
  }
}

// ─── Conflict (409) ───────────────────────
export class VendorIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(
      `Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`,
      { key, existingId },
    );
    this.name = 'VendorIdempotencyConflictError';
  }
}

export class VendorSlugConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(slug: string) {
    super(`Vendor slug "${slug}" already exists`, { slug });
    this.name = 'VendorSlugConflictApplicationError';
  }
}

export class VendorEmailConflictApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(email: string) {
    super(`Vendor email "${email}" already registered`, { email });
    this.name = 'VendorEmailConflictApplicationError';
  }
}

export class VendorUserAlreadyHasVendorApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`User "${userId}" already owns a vendor account`, { userId });
    this.name = 'VendorUserAlreadyHasVendorApplicationError';
  }
}

// ─── Service unavailable (503) ────────────
export class VendorServiceUnavailableError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(service: string, reason?: string) {
    super(`Vendor service "${service}" unavailable${reason ? `: ${reason}` : ''}`, {
      service,
      reason,
    });
    this.name = 'VendorServiceUnavailableError';
  }
}

// ─── Query errors (400) ───────────────────
export class VendorQueryError extends QueryError {
  constructor(reason: string) {
    super(`Vendor query failed: ${reason}`, 'VendorQuery');
    this.name = 'VendorQueryError';
  }
}
