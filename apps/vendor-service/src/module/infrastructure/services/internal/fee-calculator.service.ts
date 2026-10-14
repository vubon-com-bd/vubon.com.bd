/**
 * FeeCalculatorService — payout fee + VAT calculator
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';

export interface FeeBreakdown {
  readonly grossAmount: number;
  readonly gatewayFee: number;
  readonly vat: number;
  readonly totalFee: number;
  readonly netAmount: number;
  readonly currency: string;
}

const VAT_RATE = 0.15;

const FEE_RATES: Record<string, number> = {
  bank_transfer: 0.005,
  mobile_banking: 0.01,
  paypal: 0.025,
  stripe: 0.02,
  wise: 0.015,
  payoneer: 0.018,
  cash: 0,
  cheque: 0,
};

@Injectable()
export class FeeCalculatorService {
  calculate(input: {
    readonly amount: number;
    readonly currency?: string;
    readonly method?: string;
  }): FeeBreakdown {
    const currency = (input.currency ?? 'BDT').toUpperCase();
    const rate = FEE_RATES[input.method ?? 'bank_transfer'] ?? 0.005;
    const gatewayFee = this.round(input.amount * rate);
    const vat = this.round(gatewayFee * VAT_RATE);
    const totalFee = this.round(gatewayFee + vat);
    const netAmount = this.round(input.amount - totalFee);

    return {
      grossAmount: this.round(input.amount),
      gatewayFee,
      vat,
      totalFee,
      netAmount,
      currency,
    };
  }

  private round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
