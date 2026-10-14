/**
 * Vendor Domain Errors
 * @module vendor-service/domain/errors
 *
 * Typed error hierarchy — HTTP layer এ auto-map হয়।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class VendorNotFoundError extends NotFoundError {
  constructor(vendorId: string) {
    super('Vendor', vendorId);
    this.name = 'VendorNotFoundError';
  }
}

export class VendorProfileNotFoundError extends NotFoundError {
  constructor(vendorId: string) {
    super('VendorProfile', vendorId);
    this.name = 'VendorProfileNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class VendorSlugAlreadyExistsError extends ConflictError {
  constructor(slug: string) {
    super(`Vendor slug "${slug}" already exists`, 'slug');
    this.name = 'VendorSlugAlreadyExistsError';
  }
}

export class VendorEmailAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`Vendor email "${email}" already exists`, 'email');
    this.name = 'VendorEmailAlreadyExistsError';
  }
}

export class VendorUserAlreadyHasVendorError extends ConflictError {
  constructor(userId: string) {
    super(`User "${userId}" already owns a vendor account`, 'userId');
    this.name = 'VendorUserAlreadyHasVendorError';
  }
}

// ─── Validation (422) ──────────────────────
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

export class InvalidVendorTierError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor tier "${value}". Allowed: ${allowed.join(', ')}`, 'tier');
    this.name = 'InvalidVendorTierError';
  }
}

export class InvalidVendorBusinessTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor business type "${value}". Allowed: ${allowed.join(', ')}`, 'businessType');
    this.name = 'InvalidVendorBusinessTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
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

export class VendorCannotBeApprovedError extends BusinessRuleError {
  constructor(vendorId: string, reason: string) {
    super(
      `Vendor "${vendorId}" cannot be approved: ${reason}`,
      'VENDOR_CANNOT_BE_APPROVED',
      { vendorId, reason },
    );
    this.name = 'VendorCannotBeApprovedError';
  }
}

export class VendorCannotBeSuspendedError extends BusinessRuleError {
  constructor(vendorId: string, status: string) {
    super(
      `Vendor "${vendorId}" cannot be suspended in status "${status}"`,
      'VENDOR_CANNOT_BE_SUSPENDED',
      { vendorId, status },
    );
    this.name = 'VendorCannotBeSuspendedError';
  }
}

export class VendorCannotBeDeletedError extends BusinessRuleError {
  constructor(vendorId: string, status: string) {
    super(
      `Vendor "${vendorId}" cannot be deleted in status "${status}"`,
      'VENDOR_CANNOT_BE_DELETED',
      { vendorId, status },
    );
    this.name = 'VendorCannotBeDeletedError';
  }
}

export class VendorNotVerifiedError extends BusinessRuleError {
  constructor(vendorId: string) {
    super(
      `Vendor "${vendorId}" is not fully verified`,
      'VENDOR_NOT_VERIFIED',
      { vendorId },
    );
    this.name = 'VendorNotVerifiedError';
  }
}

export class VendorInsufficientTierError extends BusinessRuleError {
  constructor(vendorId: string, currentTier: string, requiredTier: string) {
    super(
      `Vendor "${vendorId}" tier "${currentTier}" is below required "${requiredTier}"`,
      'VENDOR_INSUFFICIENT_TIER',
      { vendorId, currentTier, requiredTier },
    );
    this.name = 'VendorInsufficientTierError';
  }
}

export class VendorLimitExceededError extends BusinessRuleError {
  constructor(vendorId: string, limit: string, max: number, current: number) {
    super(
      `Vendor "${vendorId}" exceeded ${limit} limit: ${current}/${max}`,
      'VENDOR_LIMIT_EXCEEDED',
      { vendorId, limit, max, current },
    );
    this.name = 'VendorLimitExceededError';
  }
}
