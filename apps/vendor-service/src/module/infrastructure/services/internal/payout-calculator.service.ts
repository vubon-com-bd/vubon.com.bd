import { Injectable } from '@nestjs/common';

export interface PayoutCalculation {
  readonly gross: number;
  readonly commission: number;
  readonly net: number;
  readonly currency: string;
}

@Injectable()
export class PayoutCalculatorService {
  calculate(
    items: readonly { orderAmount: number; commissionAmount: number }[],
    currency: string = 'BDT',
  ): PayoutCalculation {
    const gross = items.reduce((sum, i) => sum + i.orderAmount, 0);
    const commission = items.reduce((sum, i) => sum + i.commissionAmount, 0);
    const net = gross - commission;

    return {
      gross: Math.round(gross * 100) / 100,
      commission: Math.round(commission * 100) / 100,
      net: Math.round(net * 100) / 100,
      currency,
    };
  }
}
