import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { NAGAD } from '@vubon/shared-constants/src/business/payment/nagad.constants';
import { Payment } from './payment.types';

export interface NagadPayment extends BaseEntity {
  nagadId: string;
  paymentId: string;
  payment: Payment;
  transactionId: string;
  type: keyof typeof NAGAD.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  merchantId?: string;
  orderId?: string;
  paymentRefId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
