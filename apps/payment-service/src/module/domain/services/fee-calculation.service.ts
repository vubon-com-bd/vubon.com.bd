/**
 * FeeCalculationService
 * @module payment-service/domain/services
 *
 * Business rules:
 *   - Platform fee: 2.5% (Stripe), 1.8% (bKash), 1.5% (Nagad)
 *   - BD VAT: 15% on platform fee (BDT only)
 *   - USD/EUR/GBP: no VAT
 *   - COD: flat 20 BDT
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  PAYMENT_GATEWAY,
  PAYMENT_METHOD,
} from '@vubon/shared-constants/business/payment';

export interface FeeCalculationInput {
  readonly amount: number;
  readonly currency: string;
  readonly provider: string;
  readonly method: string;
}

export interface FeeBreakdown {
  readonly grossAmount: number;
  readonly platformFee: number;
  readonly vatAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly vatRate: number;
  readonly feeRate: number;
}

const VAT_RATE = 0.15;
const VAT_EXEMPT_CURRENCIES = new Set(['USD', 'EUR', 'GBP', 'JPY']);

const GATEWAY_FEE_RATES: Readonly<Record<string, number>> = {
  [PAYMENT_GATEWAY.STRIPE]: 0.025,
  [PAYMENT_GATEWAY.PAYPAL]: 0.034,
  [PAYMENT_GATEWAY.BKASH]: 0.018,
  [PAYMENT_GATEWAY.NAGAD]: 0.015,
  [PAYMENT_GATEWAY.ROCKET]: 0.018,
  [PAYMENT_GATEWAY.SSLCOMMERZ]: 0.023,
  [PAYMENT_GATEWAY.MANUAL]: 0,
};

const COD_FEE = 20;

export class FeeCalculationService {
  static calculate(input: FeeCalculationInput): FeeBreakdown {
    const { amount, currency, provider, method } = input;

    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Amount must be non-negative', 'amount');
    }

    if (method === PAYMENT_METHOD.CASH_ON_DELIVERY) {
      const fee = Math.min(COD_FEE, amount);
      return {
        grossAmount: this.round(amount),
        platformFee: fee,
        vatAmount: 0,
        netAmount: this.round(amount - fee),
        currency: currency.toUpperCase(),
        vatRate: 0,
        feeRate: 0,
      };
    }

    const rate = GATEWAY_FEE_RATES[provider] ?? 0.025;
    const platformFee = this.round(amount * rate);
    const vatRate = VAT_EXEMPT_CURRENCIES.has(currency.toUpperCase()) ? 0 : VAT_RATE;
    const vatAmount = this.round(platformFee * vatRate);
    const netAmount = this.round(amount - platformFee - vatAmount);

    return {
      grossAmount: this.round(amount),
      platformFee,
      vatAmount,
      netAmount,
      currency: currency.toUpperCase(),
      vatRate,
      feeRate: rate,
    };
  }

  static platformFeeOf(amount: number, provider: string): number {
    const rate = GATEWAY_FEE_RATES[provider] ?? 0.025;
    return this.round(amount * rate);
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
