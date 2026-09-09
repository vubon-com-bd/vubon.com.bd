import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { PAYMENT_SUBSCRIPTION } from '@vubon/shared-constants/src/business/payment/payment-subscription.constants';
import { PaymentRecurring } from './payment-recurring.types';

export interface PaymentSubscription extends BaseEntity {
  subscriptionId: string;
  userId: string;
  user: User;
  status: keyof typeof PAYMENT_SUBSCRIPTION.STATUS | string;
  type: keyof typeof PAYMENT_SUBSCRIPTION.TYPES | string;
  planId: string;
  planName: string;
  amount: Money;
  currency: string;
  recurring: PaymentRecurring;
  trialStartDate?: Date;
  trialEndDate?: Date;
  startDate: Date;
  endDate?: Date;
  nextBillingDate: Date;
  isActive: boolean;
  isPaused: boolean;
  isCancelled: boolean;
  isExpired: boolean;
  metadata: Record<string, unknown>;
}
