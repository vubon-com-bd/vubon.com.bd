/**
 * PaymentRoutingService
 * @module payment-service/domain/services
 *
 * Selects the best gateway for a payment based on:
 *   - currency support
 *   - amount range
 *   - method compatibility
 *   - availability (active + not in maintenance)
 *
 * Priority rules:
 *   1. Local BD methods (bKash/Nagad) preferred for BDT
 *   2. Card gateway (Stripe) for international currencies
 *   3. First available gateway as fallback
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  PAYMENT_GATEWAY,
  PAYMENT_METHOD,
} from '@vubon/shared-constants/business/payment';
import type { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import type { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';

export interface PaymentRoutingInput {
  readonly amount: number;
  readonly currency: string;
  readonly method: PaymentMethodTypeVO;
  readonly gateways: readonly PaymentGatewayEntity[];
}

export interface PaymentRoutingResult {
  readonly gateway: PaymentGatewayEntity;
  readonly reason: string;
  readonly priority: number;
}

const LOCAL_BD_GATEWAYS: readonly string[] = [
  PAYMENT_GATEWAY.BKASH,
  PAYMENT_GATEWAY.NAGAD,
  PAYMENT_GATEWAY.ROCKET,
  PAYMENT_GATEWAY.UPAY,
  PAYMENT_GATEWAY.SSLCOMMERZ,
];

const CARD_GATEWAYS: readonly string[] = [
  PAYMENT_GATEWAY.STRIPE,
  PAYMENT_GATEWAY.PAYPAL,
  PAYMENT_GATEWAY.BRAINTREE,
  PAYMENT_GATEWAY.SQUARE,
  PAYMENT_GATEWAY.RAZORPAY,
];

export class PaymentRoutingService {
  static selectGateway(input: PaymentRoutingInput): PaymentRoutingResult {
    const { amount, currency, method, gateways } = input;

    if (method.isCod()) {
      throw new BusinessRuleError(
        'Cash on delivery does not require a gateway',
        'COD_NO_GATEWAY_REQUIRED',
        { method: method.method },
      );
    }

    const eligible = gateways.filter(
      (g) => g.isAvailable() && g.supportsCurrency(currency) && g.supportsAmount(amount),
    );

    if (eligible.length === 0) {
      throw new BusinessRuleError(
        `No available gateway supports ${currency} ${amount}`,
        'NO_GATEWAY_AVAILABLE',
        { currency, amount, method: method.method },
      );
    }

    const scored = eligible.map((g) => ({
      gateway: g,
      priority: this.scoreGateway(g, method, currency),
    }));
    scored.sort((a, b) => b.priority - a.priority);

    const best = scored[0]!;
    return {
      gateway: best.gateway,
      reason: this.explainChoice(best.gateway, method, currency),
      priority: best.priority,
    };
  }

  private static scoreGateway(
    gateway: PaymentGatewayEntity,
    method: PaymentMethodTypeVO,
    currency: string,
  ): number {
    const provider = gateway.provider.provider;
    let score = 0;

    if (currency.toUpperCase() === 'BDT' && LOCAL_BD_GATEWAYS.includes(provider)) {
      score += 100;
    }
    if (method.isCard() && CARD_GATEWAYS.includes(provider)) {
      score += 80;
    }
    if (method.isMobileBanking() && LOCAL_BD_GATEWAYS.includes(provider)) {
      score += 90;
    }
    if (!method.requiresGateway() && provider === PAYMENT_GATEWAY.MANUAL) {
      score += 10;
    }
    return score;
  }

  private static explainChoice(
    gateway: PaymentGatewayEntity,
    method: PaymentMethodTypeVO,
    currency: string,
  ): string {
    const provider = gateway.provider.provider;
    if (currency.toUpperCase() === 'BDT' && LOCAL_BD_GATEWAYS.includes(provider)) {
      return `Local BD gateway for ${currency}`;
    }
    if (method.isCard() && CARD_GATEWAYS.includes(provider)) {
      return `Card gateway ${provider}`;
    }
    return `Fallback gateway ${provider}`;
  }
}
