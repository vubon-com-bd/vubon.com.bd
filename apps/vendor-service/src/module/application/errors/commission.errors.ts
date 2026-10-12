/**
 * Application-level commission errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CommissionConfigNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_COMMISSION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(vendorId: string) {
    super(`Commission config not found for vendor "${vendorId}"`, { vendorId });
    this.name = 'CommissionConfigNotFoundError';
  }
}

export class CommissionConfigConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 409;
  constructor(vendorId: string) {
    super(
      `Active commission config already exists for vendor "${vendorId}"`,
      { vendorId },
    );
    this.name = 'CommissionConfigConflictError';
  }
}

export class CommissionCalculationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_COMMISSION_NOT_CALCULATED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Commission calculation failed: ${reason}`, { reason });
    this.name = 'CommissionCalculationFailedError';
  }
}
