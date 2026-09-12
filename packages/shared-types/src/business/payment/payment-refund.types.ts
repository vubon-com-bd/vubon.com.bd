import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PAYMENT_REFUND } from '@vubon/shared-constants/src/business/payment/payment-refund.constants';
import { Payment } from './payment.types';

export interface PaymentRefund extends BaseEntity {
  refundId: string;
  paymentId: string;
  payment: Payment;
  status: keyof typeof PAYMENT_REFUND.STATUS | string;
  type: keyof typeof PAYMENT_REFUND.TYPES | string;
  amount: Money;
  reason: string;
  description?: string;
  transactionId?: string;
  isCompleted: boolean;
  isFailed: boolean;
  requestedAt: Date;
  approvedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  metadata: Record<string, unknown>;
}
