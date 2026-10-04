/**
 * PaymentGatewayRouterService — decides which gateway to use
 * @module payment-service/domain/services
 *
 * Business rules:
 *  - BDT + mobile_banking/wallet → local BD gateway (bkash/nagad/rocket)
 *  - BDT + card/net_banking → aggregator (sslcommerz)
 *  - USD/EUR/GBP + card → stripe
 *  - USD + wallet → paypal
 *  - cash_on_delivery → manual (no gateway)
 *  - Preferred gateway wins if compatible
 */
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import type { PaymentMethodVO } from '../value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo.js';
import { CurrencyVO } from '../value-objects/primitives/currency.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface GatewaySelectionInput {
  readonly method: PaymentMethodVO;
  readonly currency: CurrencyVO;
  readonly amount: number;
  readonly preferredGateway?: PaymentGatewayVO;
  /** Available gateways (based on env `PAYMENT_GATEWAY_CONFIG.supportedGateways`). */
  readonly availableGateways?: readonly PaymentGatewayVO[];
}

export interface GatewaySelectionResult {
  readonly gateway: PaymentGatewayVO | null;
  readonly reason: string;
}

export class PaymentGatewayRouterService {
  /**
   * Select the best gateway for the given input, or `null` if none required
   * (e.g. cash on delivery).
   */
  static select(input: GatewaySelectionInput): GatewaySelectionResult {
    // Cash on delivery — no gateway
    if (input.method.isCash()) {
      return { gateway: null, reason: 'cash_on_delivery — no gateway needed' };
    }

    const available = (input.availableGateways ?? this.defaultAvailable()).filter((g) =>
      g.supportsCurrency(input.currency.value),
    );

    if (available.length === 0) {
      throw new BusinessRuleError(
        `No gateway available for currency "${input.currency.value}"`,
        'NO_GATEWAY_AVAILABLE',
        { currency: input.currency.value },
      );
    }

    // Preferred gateway wins if compatible
    if (input.preferredGateway) {
      const preferred = available.find((g) => g.value === input.preferredGateway!.value);
      if (preferred && this.methodSupportsGateway(input.method, preferred)) {
        return { gateway: preferred, reason: 'preferred_gateway' };
      }
    }

    // Route by method + currency
    const candidates = available.filter((g) => this.methodSupportsGateway(input.method, g));
    if (candidates.length === 0) {
      throw new BusinessRuleError(
        `No gateway supports method "${input.method.value}"`,
        'NO_GATEWAY_FOR_METHOD',
        { method: input.method.value },
      );
    }

    // Currency-aware preference
    const currency = input.currency.value;
    const picked = this.pickBest(candidates, currency, input.method);
    return { gateway: picked, reason: `routed: ${currency}+${input.method.value}` };
  }

  private static pickBest(
    candidates: readonly PaymentGatewayVO[],
    currency: string,
    method: PaymentMethodVO,
  ): PaymentGatewayVO {
    const wanted = this.recommend(currency, method);
    for (const w of wanted) {
      const found = candidates.find((c) => c.value === w);
      if (found) return found;
    }
    // fallback: first available
    return candidates[0]!;
  }

  private static recommend(currency: string, method: PaymentMethodVO): readonly string[] {
    if (currency === 'BDT') {
      if (method.isCard()) {
        return [PAYMENT_GATEWAY.SSLCOMMERZ, PAYMENT_GATEWAY.STRIPE, PAYMENT_GATEWAY.MANUAL];
      }
      if (method.isMobileBanking()) {
        return [PAYMENT_GATEWAY.BKASH, PAYMENT_GATEWAY.NAGAD, PAYMENT_GATEWAY.ROCKET];
      }
      if (method.isBankBased()) {
        return [PAYMENT_GATEWAY.SSLCOMMERZ, PAYMENT_GATEWAY.MANUAL];
      }
      return [PAYMENT_GATEWAY.SSLCOMMERZ, PAYMENT_GATEWAY.MANUAL];
    }
    // international currencies
    if (method.isCard()) {
      return [PAYMENT_GATEWAY.STRIPE, PAYMENT_GATEWAY.PAYPAL];
    }
    return [PAYMENT_GATEWAY.STRIPE, PAYMENT_GATEWAY.PAYPAL, PAYMENT_GATEWAY.SSLCOMMERZ];
  }

  private static methodSupportsGateway(
    method: PaymentMethodVO,
    gateway: PaymentGatewayVO,
  ): boolean {
    if (gateway.isManual()) return true;
    if (gateway.isLocal()) {
      return method.isMobileBanking() || method.isCash();
    }
    if (gateway.isAggregator()) {
      return method.isCard() || method.isMobileBanking() || method.isBankBased();
    }
    if (gateway.isInternational()) {
      return method.isCard() || method.isBankBased();
    }
    return true;
  }

  private static defaultAvailable(): readonly PaymentGatewayVO[] {
    return [
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.BKASH),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.NAGAD),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.ROCKET),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.SSLCOMMERZ),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.STRIPE),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.PAYPAL),
      PaymentGatewayVO.reconstitute(PAYMENT_GATEWAY.MANUAL),
    ];
  }
}
