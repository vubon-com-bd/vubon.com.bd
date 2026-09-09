import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { User } from '../../user/user.types';
import { Order } from '../checkout/order.types';
import { PAYMENT_STATUS } from '@vubon/shared-constants/src/business/payment/payment-status.constants';
import { PaymentMethod } from './payment-method.types';
import { PaymentVerification } from './payment-verification.types';
import { PaymentRefund } from './payment-refund.types';
import { Transaction } from './transaction.types';

export interface PaymentMetadata {
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  sessionId: string;
  gatewayResponse?: Record<string, unknown>;
  errorMessage?: string;
}

export interface Payment extends BaseEntity {
  paymentId: string;
  orderId: string;
  order: Order;
  userId: string;
  user: User;
  method: PaymentMethod;
  status: keyof typeof PAYMENT_STATUS | string;
  amount: Money;
  currency: string;
  transactionId?: string;
  transaction: Transaction;
  verification: PaymentVerification;
  refunds: PaymentRefund[];
  isCompleted: boolean;
  isFailed: boolean;
  isRefunded: boolean;
  isPartialRefunded: boolean;
  initiatedAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  metadata: PaymentMetadata;
}
