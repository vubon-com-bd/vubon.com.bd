/**
 * Vendor Payout Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorPayoutNotFoundError extends NotFoundError {
  constructor(payoutId: string) {
    super('VendorPayout', payoutId);
    this.name = 'VendorPayoutNotFoundError';
  }
}

export class InvalidPayoutStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payout status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidPayoutStatusError';
  }
}

export class InvalidPayoutMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid payout method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidPayoutMethodError';
  }
}

export class PayoutBelowMinimumError extends BusinessRuleError {
  constructor(vendorId: string, amount: number, min: number) {
    super(
      `Payout amount ${amount} is below minimum ${min} for vendor "${vendorId}"`,
      'PAYOUT_BELOW_MINIMUM',
      { vendorId, amount, min },
    );
    this.name = 'PayoutBelowMinimumError';
  }
}

export class PayoutAboveMaximumError extends BusinessRuleError {
  constructor(vendorId: string, amount: number, max: number) {
    super(
      `Payout amount ${amount} exceeds maximum ${max} for vendor "${vendorId}"`,
      'PAYOUT_ABOVE_MAXIMUM',
      { vendorId, amount, max },
    );
    this.name = 'PayoutAboveMaximumError';
  }
}

export class PayoutNotEligibleError extends BusinessRuleError {
  constructor(vendorId: string, reason: string) {
    super(
      `Vendor "${vendorId}" not eligible for payout: ${reason}`,
      'PAYOUT_NOT_ELIGIBLE',
      { vendorId, reason },
    );
    this.name = 'PayoutNotEligibleError';
  }
}

export class PayoutAlreadyProcessedError extends ConflictError {
  constructor(payoutId: string, status: string) {
    super(`Payout "${payoutId}" already processed (status: ${status})`, 'payoutId');
    this.name = 'PayoutAlreadyProcessedError';
  }
}

export class PayoutInsufficientBalanceError extends BusinessRuleError {
  constructor(vendorId: string, requested: number, available: number) {
    super(
      `Vendor "${vendorId}" requested ${requested} but available ${available}`,
      'PAYOUT_INSUFFICIENT_BALANCE',
      { vendorId, requested, available },
    );
    this.name = 'PayoutInsufficientBalanceError';
  }
}
