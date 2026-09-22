import type { CurrencyCode } from '@vubon/shared-types/common';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import { VendorCommissionEntity } from '../entities/vendor-commission.entity';

export class PayoutCalculatorService {
  calculateNetPayout(
    commissions: readonly VendorCommissionEntity[],
    currency: CurrencyCode,
  ): PayoutAmountVO {
    const total = commissions.reduce(
      (sum, c) => sum + c.commissionAmount.amount,
      0,
    );
    return PayoutAmountVO.create(Math.round(total * 100) / 100, currency);
  }

  calculateGrossAmount(
    commissions: readonly VendorCommissionEntity[],
    currency: CurrencyCode,
  ): PayoutAmountVO {
    const gross = commissions.reduce(
      (sum, c) => sum + c.orderAmount.amount,
      0,
    );
    return PayoutAmountVO.create(Math.round(gross * 100) / 100, currency);
  }
}
