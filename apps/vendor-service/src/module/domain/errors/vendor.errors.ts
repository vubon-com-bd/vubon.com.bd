/**
 * Vendor domain errors
 * @module vendor-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class VendorNotFoundError extends NotFoundError {
  constructor(vendorId: string) {
    super('Vendor', vendorId);
    this.name = 'VendorNotFoundError';
  }
}

export class VendorAlreadyExistsError extends ConflictError {
  constructor(field: string, value: string) {
    super(`Vendor with ${field} "${value}" already exists`, field);
    this.name = 'VendorAlreadyExistsError';
  }
}

export class VendorSlugConflictError extends ConflictError {
  constructor(slug: string) {
    super(`Vendor slug "${slug}" is already taken`, 'slug');
    this.name = 'VendorSlugConflictError';
  }
}

export class VendorEmailConflictError extends ConflictError {
  constructor(email: string) {
    super(`Vendor email "${email}" is already registered`, 'email');
    this.name = 'VendorEmailConflictError';
  }
}

export class InvalidVendorStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVendorStatusError';
  }
}

export class InvalidVendorTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidVendorTypeError';
  }
}

export class InvalidVendorBusinessTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid vendor business type "${value}". Allowed: ${allowed.join(', ')}`,
      'businessType',
    );
    this.name = 'InvalidVendorBusinessTypeError';
  }
}

export class InvalidVendorTierError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor tier "${value}". Allowed: ${allowed.join(', ')}`, 'tier');
    this.name = 'InvalidVendorTierError';
  }
}

export class InvalidVendorStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, vendorId?: string) {
    super(
      `Cannot transition vendor status from "${from}" to "${to}"`,
      'INVALID_VENDOR_STATUS_TRANSITION',
      { from, to, vendorId },
    );
    this.name = 'InvalidVendorStatusTransitionError';
  }
}

export class VendorNotApprovedError extends BusinessRuleError {
  constructor(vendorId: string, status: string) {
    super(
      `Vendor "${vendorId}" is not approved (status: ${status})`,
      'VENDOR_NOT_APPROVED',
      { vendorId, status },
    );
    this.name = 'VendorNotApprovedError';
  }
}

export class VendorSuspendedError extends BusinessRuleError {
  constructor(vendorId: string, reason?: string) {
    super(
      `Vendor "${vendorId}" is suspended${reason ? `: ${reason}` : ''}`,
      'VENDOR_SUSPENDED',
      { vendorId, reason },
    );
    this.name = 'VendorSuspendedError';
  }
}

export class VendorInactiveError extends BusinessRuleError {
  constructor(vendorId: string) {
    super(
      `Vendor "${vendorId}" is inactive`,
      'VENDOR_INACTIVE',
      { vendorId },
    );
    this.name = 'VendorInactiveError';
  }
}
