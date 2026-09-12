import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PAYMENT_SPLIT } from '@vubon/shared-constants/src/business/payment/payment-split.constants';
import { Payment } from './payment.types';

export interface SplitParty {
  partyId: string;
  name: string;
  amount: Money;
  percentage: number;
  status: 'pending' | 'processed' | 'completed' | 'failed';
  metadata: Record<string, unknown>;
}

export interface PaymentSplit extends BaseEntity {
  splitId: string;
  paymentId: string;
  payment: Payment;
  status: keyof typeof PAYMENT_SPLIT.STATUS | string;
  type: keyof typeof PAYMENT_SPLIT.TYPES | string;
  parties: SplitParty[];
  isCompleted: boolean;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}
