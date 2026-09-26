import type { CurrencyCode } from '@vubon/shared-types/common';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';
import { VendorCommissionEntity } from '../entities/vendor-commission.entity';

export interface SettlementCalculation {
  readonly gross: PayoutAmountVO;
  readonly commission: PayoutAmountVO;
  readonly net: PayoutAmountVO;
}

export class SettlementCalculatorService {
  calculate(
    commissions: readonly VendorCommissionEntity[],
    currency: CurrencyCode,
  ): SettlementCalculation {
    const gross = commissions.reduce(
      (sum, c) => sum + c.orderAmount.amount,
      0,
    );
    const commissionTotal = commissions.reduce(
      (sum, c) => sum + c.commissionAmount.amount,
      0,
    );
    const net = gross - commissionTotal;

    return {
      gross: PayoutAmountVO.create(Math.round(gross * 100) / 100, currency),
      commission: PayoutAmountVO.create(
        Math.round(commissionTotal * 100) / 100,
        currency,
      ),
      net: PayoutAmountVO.create(Math.round(net * 100) / 100, currency),
    };
  }

  isDue(periodEnd: Date, now: Date = new Date()): boolean {
    return periodEnd.getTime() <= now.getTime();
  }
}
