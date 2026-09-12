import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { STRIPE } from '@vubon/shared-constants/src/business/payment/stripe.constants';
import { Payment } from './payment.types';

export interface StripePayment extends BaseEntity {
  stripeId: string;
  paymentId: string;
  payment: Payment;
  paymentIntentId: string;
  type: keyof typeof STRIPE.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  clientSecret: string;
  customerId?: string;
  paymentMethodId?: string;
  chargeId?: string;
  webhookEvents: string[];
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
