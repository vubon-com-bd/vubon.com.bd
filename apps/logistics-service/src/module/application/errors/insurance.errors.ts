/**
 * Insurance application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InsuranceNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.INSURANCE_NOT_AVAILABLE;
  readonly httpStatus = 404;
  constructor(public readonly insuranceId: string) {
    super(`Insurance "${insuranceId}" not found`, { insuranceId });
    this.name = 'InsuranceNotFoundApplicationError';
  }
}

export class InsuranceNotAvailableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.INSURANCE_NOT_AVAILABLE;
  readonly httpStatus = 409;
  constructor(reason: string) {
    super(`Insurance not available: ${reason}`, { reason });
    this.name = 'InsuranceNotAvailableApplicationError';
  }
}

export class InsuranceOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly insuranceId?: string) {
    super(`Insurance ${operation} failed: ${reason}`, { operation, insuranceId });
    this.name = 'InsuranceOperationFailedApplicationError';
  }
}

export class InsuranceClaimFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.INSURANCE_CLAIM_FAILED;
  readonly httpStatus = 400;
  constructor(public readonly insuranceId: string, reason: string) {
    super(`Insurance claim failed for "${insuranceId}": ${reason}`, { insuranceId, reason });
    this.name = 'InsuranceClaimFailedApplicationError';
  }
}
