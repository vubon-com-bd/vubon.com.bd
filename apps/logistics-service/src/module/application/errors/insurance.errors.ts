/**
 * Insurance Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class InsuranceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Insurance', id); this.name = 'InsuranceNotFoundApplicationError'; }
}
export class InsuranceByPolicyNotFoundError extends ApplicationNotFoundError {
  constructor(policy: string) { super('Insurance', `policy:${policy}`); this.name = 'InsuranceByPolicyNotFoundError'; }
}
export class InsuranceClaimNotFoundError extends ApplicationNotFoundError {
  constructor(claimId: string) { super('InsuranceClaim', claimId); this.name = 'InsuranceClaimNotFoundError'; }
}

export class CreateInsuranceError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Insurance.create] ${msg}`, field); this.name = 'CreateInsuranceError'; }
}
export class InsuranceActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[Insurance.${action}] ${msg}`, field); this.name = 'InsuranceActionError'; }
}

export class InsuranceAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.INSURANCE_NOT_AVAILABLE;
  readonly httpStatus = 409;
  constructor(policy: string) { super(`Insurance "${policy}" already exists`, { policy }); this.name = 'InsuranceAlreadyExistsError'; }
}
export class InsuranceStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_INSURANCE_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Insurance "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'InsuranceStateConflictError';
  }
}
export class InsuranceNotClaimableError extends ApplicationError {
  readonly code = ERROR_CODE.INSURANCE_CLAIM_FAILED;
  readonly httpStatus = 400;
  constructor(id: string, reason: string) {
    super(`Insurance "${id}" not claimable: ${reason}`, { id, reason });
    this.name = 'InsuranceNotClaimableError';
  }
}
export class InsuranceOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Insurance.${op} failed: ${cause}`, { op }); this.name = 'InsuranceOperationError'; }
}
