/**
 * Vendor Settlement Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorSettlementNotFoundError extends NotFoundError {
  constructor(settlementId: string) {
    super('VendorSettlement', settlementId);
    this.name = 'VendorSettlementNotFoundError';
  }
}

export class InvalidSettlementStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid settlement status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidSettlementStatusError';
  }
}

export class SettlementBelowMinimumError extends BusinessRuleError {
  constructor(vendorId: string, amount: number, min: number) {
    super(
      `Settlement amount ${amount} is below minimum ${min} for vendor "${vendorId}"`,
      'SETTLEMENT_BELOW_MINIMUM',
      { vendorId, amount, min },
    );
    this.name = 'SettlementBelowMinimumError';
  }
}
