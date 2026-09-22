import { CommissionRateVO } from '../value-objects/primitives/commission-rate.vo';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo';

export class CommissionCalculatorService {
  calculate(orderAmount: PayoutAmountVO, rate: CommissionRateVO): PayoutAmountVO {
    const commission = orderAmount.amount * (rate.numeric / 100);
    return PayoutAmountVO.create(
      Math.round(commission * 100) / 100,
      orderAmount.currency,
    );
  }

  calculateNetAmount(
    orderAmount: PayoutAmountVO,
    rate: CommissionRateVO,
  ): PayoutAmountVO {
    const commission = this.calculate(orderAmount, rate);
    return PayoutAmountVO.create(
      Math.round((orderAmount.amount - commission.amount) * 100) / 100,
      orderAmount.currency,
    );
  }
}
