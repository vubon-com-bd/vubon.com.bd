/**
 * Insurance Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InsuranceNotFoundError extends NotFoundError {
  constructor(insuranceId: string) {
    super('Insurance', insuranceId);
    this.name = 'InsuranceNotFoundError';
  }
}

export class PolicyNumberAlreadyExistsError extends ConflictError {
  constructor(policyNumber: string) {
    super(`Policy "${policyNumber}" already exists`, 'policyNumber');
    this.name = 'PolicyNumberAlreadyExistsError';
  }
}

export class InsuranceClaimNotFoundError extends NotFoundError {
  constructor(claimId: string) {
    super('InsuranceClaim', claimId);
    this.name = 'InsuranceClaimNotFoundError';
  }
}

export class ClaimNumberAlreadyExistsError extends ConflictError {
  constructor(claimNumber: string) {
    super(`Claim "${claimNumber}" already exists`, 'claimNumber');
    this.name = 'ClaimNumberAlreadyExistsError';
  }
}

export class InvalidInsuranceStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid insurance status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidInsuranceStatusError';
  }
}

export class InvalidInsuranceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid insurance type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidInsuranceTypeError';
  }
}

export class InvalidClaimStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid claim status "${value}". Allowed: ${allowed.join(', ')}`,
      'claimStatus',
    );
    this.name = 'InvalidClaimStatusError';
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

export class InsuranceAlreadyExpiredError extends BusinessRuleError {
  constructor(insuranceId: string, expiresAt: string) {
    super(
      `Insurance "${insuranceId}" expired at ${expiresAt}`,
      'INSURANCE_ALREADY_EXPIRED',
      { insuranceId, expiresAt },
    );
    this.name = 'InsuranceAlreadyExpiredError';
  }
}

export class InsuranceClaimNotAllowedError extends BusinessRuleError {
  constructor(insuranceId: string, reason: string) {
    super(
      `Cannot file claim on "${insuranceId}": ${reason}`,
      'INSURANCE_CLAIM_NOT_ALLOWED',
      { insuranceId, reason },
    );
    this.name = 'InsuranceClaimNotAllowedError';
  }
}

export class InsuranceClaimAlreadyResolvedError extends BusinessRuleError {
  constructor(claimId: string, status: string) {
    super(
      `Claim "${claimId}" already resolved (status: "${status}")`,
      'INSURANCE_CLAIM_ALREADY_RESOLVED',
      { claimId, status },
    );
    this.name = 'InsuranceClaimAlreadyResolvedError';
  }
}

export class InsuranceValueOutOfRangeError extends ValidationError {
  constructor(value: number, min: number, max: number) {
    super(
      `Insurance value ${value} out of range (${min}-${max})`,
      'value',
    );
    this.name = 'InsuranceValueOutOfRangeError';
  }
}
