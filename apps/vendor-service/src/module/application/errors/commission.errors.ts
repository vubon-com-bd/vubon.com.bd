/**
 * Vendor Commission Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class CommissionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(commissionId: string) {
    super('VendorCommission', commissionId);
    this.name = 'CommissionNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class CommissionValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CommissionValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class CommissionUpdateError extends CommandError {
  constructor(commissionId: string, reason: string) {
    super(`Commission "${commissionId}" update failed: ${reason}`, 'UpdateCommission');
    this.name = 'CommissionUpdateError';
  }
}

export class CommissionCalculationError extends CommandError {
  constructor(reason: string) {
    super(`Commission calculation failed: ${reason}`, 'CalculateCommission');
    this.name = 'CommissionCalculationError';
  }
}

// ─── Query errors (400) ───────────────────
export class CommissionQueryError extends QueryError {
  constructor(reason: string) {
    super(`Commission query failed: ${reason}`, 'CommissionQuery');
    this.name = 'CommissionQueryError';
  }
}

// ─── Conflict (409) ───────────────────────
export class CommissionAlreadyActiveApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string) {
    super(`Vendor "${vendorId}" already has an active commission config`, { vendorId });
    this.name = 'CommissionAlreadyActiveApplicationError';
  }
}
