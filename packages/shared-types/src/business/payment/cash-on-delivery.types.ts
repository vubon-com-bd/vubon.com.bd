import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { CASH_ON_DELIVERY } from '@vubon/shared-constants/src/business/payment/cash-on-delivery.constants';
import { Payment } from './payment.types';

export interface CashOnDeliveryPayment extends BaseEntity {
  codId: string;
  paymentId: string;
  payment: Payment;
  type: keyof typeof CASH_ON_DELIVERY.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  collectedBy?: string;
  collectedAt?: Date;
  isCollected: boolean;
  collectionCharge: Money;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
