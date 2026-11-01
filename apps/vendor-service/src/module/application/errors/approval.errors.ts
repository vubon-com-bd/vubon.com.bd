/**
 * Vendor Approval Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ──────────────────────
export class ApprovalNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(approvalId: string) {
    super('VendorApproval', approvalId);
    this.name = 'ApprovalNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class ApprovalValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'ApprovalValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class VendorApprovalError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" approval failed: ${reason}`, 'ApproveVendor');
    this.name = 'VendorApprovalError';
  }
}

export class VendorRejectionError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" rejection failed: ${reason}`, 'RejectVendor');
    this.name = 'VendorRejectionError';
  }
}

export class ApprovalInfoRequestError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" info request failed: ${reason}`, 'RequestInfo');
    this.name = 'ApprovalInfoRequestError';
  }
}

// ─── Conflict (409) ───────────────────────
export class ApprovalIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string) {
    super(`Idempotency key "${key}" already processed`, { key });
    this.name = 'ApprovalIdempotencyConflictError';
  }
}

export class MaxResubmissionsExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, max: number) {
    super(`Vendor "${vendorId}" exceeded max resubmissions (${max})`, { vendorId, max });
    this.name = 'MaxResubmissionsExceededApplicationError';
  }
}
