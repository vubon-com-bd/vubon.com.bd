import { PAYMENT_METHOD, PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';

/**
 * Fee rates per gateway (in percent, 0–100).
 */
const GATEWAY_FEE_PERCENT: Record<string, number> = {
  [PAYMENT_GATEWAY.STRIPE]: 2.9,
  [PAYMENT_GATEWAY.PAYPAL]: 3.49,
  [PAYMENT_GATEWAY.BKASH]: 1.85,
  [PAYMENT_GATEWAY.NAGAD]: 1.85,
  [PAYMENT_GATEWAY.MANUAL]: 0,
};

export interface FeeBreakdown {
  readonly gatewayFee: number;
  readonly netAmount: number;
}

export class FeeCalculationService {
  calculate(amount: number, gateway: string, method: string): FeeBreakdown {
    void method;
    const percent = GATEWAY_FEE_PERCENT[gateway] ?? 0;
    const gatewayFee = Math.round(amount * percent) / 100;
    return {
      gatewayFee,
      netAmount: Math.round((amount - gatewayFee) * 100) / 100,
    };
  }

  forMethod(amount: number, method: string): FeeBreakdown {
    const gateway = method === PAYMENT_METHOD.CASH_ON_DELIVERY
      ? PAYMENT_GATEWAY.MANUAL
      : PAYMENT_GATEWAY.STRIPE;
    return this.calculate(amount, gateway, method);
  }
}
