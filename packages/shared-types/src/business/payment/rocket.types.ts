import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { ROCKET } from '@vubon/shared-constants/src/business/payment/rocket.constants';
import { Payment } from './payment.types';

export interface RocketPayment extends BaseEntity {
  rocketId: string;
  paymentId: string;
  payment: Payment;
  transactionId: string;
  type: keyof typeof ROCKET.TYPES | string;
  amount: Money;
  currency: string;
  status: string;
  pin?: string;
  referenceId?: string;
  gatewayResponse: Record<string, unknown>;
  metadata: Record<string, unknown>;
}
