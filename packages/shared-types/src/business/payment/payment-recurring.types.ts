import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PAYMENT_RECURRING } from '@vubon/shared-constants/src/business/payment/payment-recurring.constants';
import { Payment } from './payment.types';

export interface PaymentRecurring extends BaseEntity {
  recurringId: string;
  paymentId: string;
  payment: Payment;
  status: keyof typeof PAYMENT_RECURRING.STATUS | string;
  type: keyof typeof PAYMENT_RECURRING.TYPES | string;
  frequency: string;
  interval: number;
  amount: Money;
  currency: string;
  startDate: Date;
  endDate?: Date;
  nextBillingDate: Date;
  lastBillingDate?: Date;
  retryCount: number;
  maxRetries: number;
  isActive: boolean;
  isPaused: boolean;
  isCancelled: boolean;
  metadata: Record<string, unknown>;
}
