/**
 * FeeCalculatorService — commission + VAT calculator for products
 * @module product-service/infrastructure/services/internal
 *
 * Product-specific business rules:
 *  - Platform commission: 10% (default)
 *  - VAT (BD): 15%
 */
import { Injectable } from '@nestjs/common';

export const FEE_CALCULATOR_SERVICE = Symbol('FEE_CALCULATOR_SERVICE');

export interface CommissionInput {
  readonly amount: number;
  readonly currency: string;
  readonly commissionRate?: number;
}

export interface CommissionBreakdown {
  readonly grossAmount: number;
  readonly commission: number;
  readonly vat: number;
  readonly totalFee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly commissionRate: number;
}

@Injectable()
export class FeeCalculatorService {
  private static readonly DEFAULT_COMMISSION = 0.10;
  private static readonly VAT_RATE = 0.15;

  calculate(input: CommissionInput): CommissionBreakdown {
    const rate = input.commissionRate ?? FeeCalculatorService.DEFAULT_COMMISSION;
    const commission = this.round(input.amount * rate);
    const vat = this.round(commission * FeeCalculatorService.VAT_RATE);
    const totalFee = this.round(commission + vat);
    const netAmount = this.round(input.amount - totalFee);

    return {
      grossAmount: this.round(input.amount),
      commission,
      vat,
      totalFee,
      netAmount,
      currency: input.currency.toUpperCase(),
      commissionRate: rate,
    };
  }

  private round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
