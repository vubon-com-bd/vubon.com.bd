/**
 * PaymentFeeService — calculates gateway fee + VAT (BD 15%)
 * @module payment-service/domain/services
 *
 * Business rules (BD):
 *  - bKash:      1.85% (merchant rate)
 *  - Nagad:      1.5%
 *  - Rocket:     1.8%
 *  - SSLCommerz: 2.5% (BDT) / 3.5% (international)
 *  - Stripe:     2.9% + fixed per currency
 *  - PayPal:     3.49% + fixed
 *  - manual/cash: 0%
 *  - VAT on gateway fee: 15% (BD)
 */
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo.js';

export interface FeeInput {
  readonly amount: number;
  readonly currency: string;
  readonly gateway?: PaymentGatewayVO | null;
}

export interface FeeBreakdown {
  readonly grossAmount: number;
  readonly gatewayFee: number;
  readonly vat: number;
  readonly totalFee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly vatRate: number;
}

export class PaymentFeeService {
  private static readonly VAT_RATE = 0.15;
  private static readonly VAT_EXEMPT_CURRENCIES = new Set(['USD', 'EUR', 'GBP']);

  static calculate(input: FeeInput): FeeBreakdown {
    if (!Number.isFinite(input.amount) || input.amount < 0) {
      throw new BusinessRuleError('Invalid amount for fee calculation', 'INVALID_FEE_AMOUNT');
    }
    const gatewayFee = this.gatewayFee(input);
    const vatRate = this.VAT_EXEMPT_CURRENCIES.has(input.currency.toUpperCase())
      ? 0
      : this.VAT_RATE;
    const vat = this.round(gatewayFee * vatRate);
    const totalFee = this.round(gatewayFee + vat);
    const netAmount = this.round(input.amount - totalFee);

    return {
      grossAmount: this.round(input.amount),
      gatewayFee,
      vat,
      totalFee,
      netAmount,
      currency: input.currency.toUpperCase(),
      vatRate,
    };
  }

  private static gatewayFee(input: FeeInput): number {
    const amount = input.amount;
    const gateway = input.gateway?.value;

    switch (gateway) {
      case PAYMENT_GATEWAY.BKASH:
        return this.round(amount * 0.0185);
      case PAYMENT_GATEWAY.NAGAD:
        return this.round(amount * 0.015);
      case PAYMENT_GATEWAY.ROCKET:
        return this.round(amount * 0.018);
      case PAYMENT_GATEWAY.SSLCOMMERZ:
        return this.round(
          amount * (input.currency === 'BDT' ? 0.025 : 0.035),
        );
      case PAYMENT_GATEWAY.STRIPE:
        return this.round(amount * 0.029 + this.stripeFixed(input.currency));
      case PAYMENT_GATEWAY.PAYPAL:
        return this.round(amount * 0.0349 + this.paypalFixed(input.currency));
      case PAYMENT_GATEWAY.MANUAL:
      case undefined:
      case null:
        return 0;
      default:
        return this.round(amount * 0.02); // default 2%
    }
  }

  private static stripeFixed(currency: string): number {
    const map: Record<string, number> = {
      USD: 0.3,
      EUR: 0.25,
      GBP: 0.2,
      BDT: 2.0,
    };
    return map[currency.toUpperCase()] ?? 0.3;
  }

  private static paypalFixed(currency: string): number {
    const map: Record<string, number> = {
      USD: 0.49,
      EUR: 0.39,
      GBP: 0.39,
    };
    return map[currency.toUpperCase()] ?? 0.49;
  }

  /** Split fee: what customer sees vs what merchant gets. */
  static reverseFromNet(netAmount: number, currency: string, gateway: PaymentGatewayVO): number {
    // approximate — not commonly used but available
    return this.round(netAmount * 1.02);
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
