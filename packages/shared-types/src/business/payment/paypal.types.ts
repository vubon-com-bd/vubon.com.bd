import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PAYPAL } from '@vubon/shared-constants/src/business/payment/paypal.constants';
import { Payment } from './payment.types';

export interface PaypalPayment extends BaseEntity {
  paypalId: string;
  paymentId: string;
  payment: Payment;
  orderId: string;
  type: keyof typeof PAYPAL.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  payerId?: string;
  paymentToken?: string;
  transactionId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
