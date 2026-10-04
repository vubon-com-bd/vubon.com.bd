/**
 * PaymentGateway Value Object — includes currency/region capability map
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { InvalidPaymentGatewayError } from '../../errors/payment.errors.js';

type GatewayValue = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];
const ALLOWED = Object.values(PAYMENT_GATEWAY) as readonly string[];

const BD_LOCAL_GATEWAYS: readonly string[] = [
  PAYMENT_GATEWAY.BKASH,
  PAYMENT_GATEWAY.NAGAD,
  PAYMENT_GATEWAY.ROCKET,
  PAYMENT_GATEWAY.UPAY,
  PAYMENT_GATEWAY.SURECASH,
];

const BD_AGGREGATOR_GATEWAYS: readonly string[] = [
  PAYMENT_GATEWAY.SSLCOMMERZ,
];

const INTL_GATEWAYS: readonly string[] = [
  PAYMENT_GATEWAY.STRIPE,
  PAYMENT_GATEWAY.PAYPAL,
  PAYMENT_GATEWAY.BRAINTREE,
  PAYMENT_GATEWAY.SQUARE,
  PAYMENT_GATEWAY.RAZORPAY,
];

const BD_SUPPORTED_CURRENCIES = new Set(['BDT']);
const INTL_SUPPORTED_CURRENCIES = new Set(['USD', 'EUR', 'GBP', 'BDT']);

export class PaymentGatewayVO extends BaseVO<GatewayValue> {
  private constructor(value: GatewayValue) {
    super(value);
  }

  static create(raw: string): PaymentGatewayVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidPaymentGatewayError(raw, ALLOWED);
    }
    return new PaymentGatewayVO(raw as GatewayValue);
  }

  static reconstitute(raw: string): PaymentGatewayVO {
    return new PaymentGatewayVO(raw as GatewayValue);
  }

  isLocal(): boolean {
    return BD_LOCAL_GATEWAYS.includes(this.value);
  }

  isAggregator(): boolean {
    return BD_AGGREGATOR_GATEWAYS.includes(this.value);
  }

  isInternational(): boolean {
    return INTL_GATEWAYS.includes(this.value);
  }

  isManual(): boolean {
    return this.value === PAYMENT_GATEWAY.MANUAL;
  }

  supportsCurrency(currency: string): boolean {
    const upper = currency.toUpperCase();
    if (this.isLocal()) return BD_SUPPORTED_CURRENCIES.has(upper);
    if (this.isAggregator()) return BD_SUPPORTED_CURRENCIES.has(upper) || upper === 'USD';
    if (this.isInternational()) return INTL_SUPPORTED_CURRENCIES.has(upper);
    return true;
  }

  supportsWebhooks(): boolean {
    return !this.isManual();
  }

  requiresRedirect(): boolean {
    return !this.isInternational() && !this.isManual();
  }
}
