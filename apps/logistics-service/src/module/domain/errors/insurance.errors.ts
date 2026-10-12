/**
 * Insurance domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { INSURANCE_STATUS, INSURANCE_TYPE, INSURANCE_COVERAGE, INSURANCE_CLAIM_STATUS, INSURANCE } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(INSURANCE_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(INSURANCE_TYPE) as readonly string[];
const ALLOWED_COVERAGES = Object.values(INSURANCE_COVERAGE) as readonly string[];
const ALLOWED_CLAIM_STATUSES = Object.values(INSURANCE_CLAIM_STATUS) as readonly string[];

export class InsuranceNotFoundError extends NotFoundError {
  constructor(insuranceId: string) {
    super('Insurance', insuranceId);
    this.name = 'InsuranceNotFoundError';
  }
}

export class InsurancePolicyAlreadyExistsError extends ConflictError {
  constructor(policyNumber: string) {
    super(`Insurance with policy "${policyNumber}" already exists`, 'policyNumber');
    this.name = 'InsurancePolicyAlreadyExistsError';
  }
}

export class InvalidInsuranceStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid insurance status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidInsuranceStatusError';
  }
}

export class InvalidInsuranceTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid insurance type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidInsuranceTypeError';
  }
}

export class InvalidInsuranceCoverageError extends ValidationError {
  constructor(value: string) {
    super(`Invalid insurance coverage "${value}". Allowed: ${ALLOWED_COVERAGES.join(', ')}`, 'coverage');
    this.name = 'InvalidInsuranceCoverageError';
  }
}

export class InvalidInsuranceClaimStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid insurance claim status "${value}". Allowed: ${ALLOWED_CLAIM_STATUSES.join(', ')}`, 'claimStatus');
    this.name = 'InvalidInsuranceClaimStatusError';
  }
}

export class InvalidInsuranceStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition insurance status from "${from}" to "${to}"`,
      'INVALID_INSURANCE_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidInsuranceStatusTransitionError';
  }
}

export class InvalidInsuranceClaimStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition insurance claim status from "${from}" to "${to}"`,
      'INVALID_INSURANCE_CLAIM_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidInsuranceClaimStatusTransitionError';
  }
}

export class InsuranceNotAvailableError extends BusinessRuleError {
  constructor(reason: string) {
    super(
      `Insurance not available: ${reason}`,
      'INSURANCE_NOT_AVAILABLE',
      { reason },
    );
    this.name = 'InsuranceNotAvailableError';
  }
}

export class InsuranceAmountOutOfRangeError extends ValidationError {
  constructor(value: number) {
    super(
      `Insurance amount ${value} out of range [${INSURANCE.MIN_VALUE}, ${INSURANCE.MAX_VALUE}]`,
      'amount',
    );
    this.name = 'InsuranceAmountOutOfRangeError';
  }
}

export class InsuranceClaimFailedError extends BusinessRuleError {
  constructor(policyNumber: string, reason: string) {
    super(
      `Insurance claim failed for "${policyNumber}": ${reason}`,
      'INSURANCE_CLAIM_FAILED',
      { policyNumber, reason },
    );
    this.name = 'InsuranceClaimFailedError';
  }
}

export class InsuranceClaimWindowExpiredError extends BusinessRuleError {
  constructor(policyNumber: string, expiredAt: string) {
    super(
      `Insurance claim window for "${policyNumber}" expired at ${expiredAt}`,
      'INSURANCE_CLAIM_WINDOW_EXPIRED',
      { policyNumber, expiredAt, max: INSURANCE.CLAIM_WINDOW_DAYS },
    );
    this.name = 'InsuranceClaimWindowExpiredError';
  }
}
