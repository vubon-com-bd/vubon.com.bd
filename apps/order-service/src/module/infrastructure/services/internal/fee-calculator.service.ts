/**
 * FeeCalculatorService — order fee + VAT
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';

export interface FeeInput {
  readonly amount: number;
  readonly currency: string;
  readonly gateway?: string;
}

export interface FeeBreakdown {
  readonly grossAmount: number;
  readonly gatewayFee: number;
  readonly vat: number;
  readonly totalFee: number;
  readonly netAmount: number;
  readonly currency: string;
}

@Injectable()
export class FeeCalculatorService {
  private static readonly VAT_RATE = 0.15;
  private static readonly GATEWAY_RATES: Record<string, number> = {
    bkash: 0.0185,
    nagad: 0.015,
    rocket: 0.02,
    sslcommerz: 0.025,
    stripe: 0.029,
    paypal: 0.034,
    default: 0.02,
  };

  calculate(input: FeeInput): FeeBreakdown {
    const rate = FeeCalculatorService.GATEWAY_RATES[input.gateway ?? 'default'] ?? 0.02;
    const gatewayFee = this.round(input.amount * rate);
    const vat = this.round(gatewayFee * FeeCalculatorService.VAT_RATE);
    const totalFee = this.round(gatewayFee + vat);
    const netAmount = this.round(input.amount - totalFee);
    return {
      grossAmount: this.round(input.amount),
      gatewayFee,
      vat,
      totalFee,
      netAmount,
      currency: input.currency.toUpperCase(),
    };
  }

  private round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
