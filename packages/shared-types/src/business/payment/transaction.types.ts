import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { TRANSACTION } from '@vubon/shared-constants/src/business/payment/transaction.constants';
import { Payment } from './payment.types';

export interface Transaction extends BaseEntity {
  transactionId: string;
  paymentId: string;
  payment: Payment;
  type: keyof typeof TRANSACTION.TYPES | string;
  status: keyof typeof TRANSACTION.STATUS | string;
  amount: Money;
  currency: string;
  reference: string;
  gateway: string;
  gatewayTransactionId: string;
  isCompleted: boolean;
  isFailed: boolean;
  isReversed: boolean;
  metadata: Record<string, unknown>;
  occurredAt: Date;
}
