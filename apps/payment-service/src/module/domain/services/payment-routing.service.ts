import { PAYMENT_GATEWAY, PAYMENT_METHOD } from '@vubon/shared-constants/business/payment';

export class PaymentRoutingService {
  /**
   * Pick the most suitable gateway for the given method.
   */
  pickGateway(method: string): string {
    const map: Record<string, string> = {
      [PAYMENT_METHOD.CARD]: PAYMENT_GATEWAY.STRIPE,
      [PAYMENT_METHOD.CREDIT_CARD]: PAYMENT_GATEWAY.STRIPE,
      [PAYMENT_METHOD.DEBIT_CARD]: PAYMENT_GATEWAY.STRIPE,
      [PAYMENT_METHOD.MOBILE_BANKING]: PAYMENT_GATEWAY.BKASH,
      [PAYMENT_METHOD.WALLET]: PAYMENT_GATEWAY.BKASH,
      [PAYMENT_METHOD.CASH_ON_DELIVERY]: PAYMENT_GATEWAY.MANUAL,
    };
    return map[method] ?? PAYMENT_GATEWAY.MANUAL;
  }
}
