/**
 * Vendor Commission Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorCommissionNotFoundError extends NotFoundError {
  constructor(commissionId: string) {
    super('VendorCommission', commissionId);
    this.name = 'VendorCommissionNotFoundError';
  }
}

export class InvalidCommissionTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid commission type "${value}". Allowed: ${allowed.join(', ')}`, 'commissionType');
    this.name = 'InvalidCommissionTypeError';
  }
}

export class CommissionRateOutOfRangeError extends ValidationError {
  constructor(rate: number, min: number, max: number) {
    super(`Commission rate ${rate} out of range [${min}, ${max}]`, 'rate');
    this.name = 'CommissionRateOutOfRangeError';
  }
}

export class CommissionCalculationError extends BusinessRuleError {
  constructor(reason: string, context?: Readonly<Record<string, unknown>>) {
    super(`Commission calculation failed: ${reason}`, 'COMMISSION_CALCULATION_FAILED', context);
    this.name = 'CommissionCalculationError';
  }
}
