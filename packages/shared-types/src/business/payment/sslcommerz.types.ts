import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { SSLCOMMERZ } from '@vubon/shared-constants/src/business/payment/sslcommerz.constants';
import { Payment } from './payment.types';

export interface SSLCommerzPayment extends BaseEntity {
  sslId: string;
  paymentId: string;
  payment: Payment;
  transactionId: string;
  sessionKey: string;
  type: keyof typeof SSLCOMMERZ.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  validationId?: string;
  cardType?: string;
  cardNumber?: string;
  bankTransactionId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
