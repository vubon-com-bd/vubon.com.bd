/**
 * Payment Types
 * পেমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Order } from '../checkout/order.types';
import { PAYMENT_STATUS } from '@vubon/shared-constants';
import { PaymentMethod } from './payment-method.types';
import { PaymentTransaction } from './payment-transaction.types';

export interface Payment extends BaseEntity {
  orderId: string;
  order: Order;
  userId: string;
  user?: User;
  amount: number;
  currency: string;
  status: (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
  method: PaymentMethod;
  transaction: PaymentTransaction;
  gateway: string;
  gatewayTransactionId?: string;
  paymentIntent?: string;
  clientSecret?: string;
  receiptUrl?: string;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentCreateInput {
  orderId: string;
  userId: string;
  amount: number;
  currency?: string;
  method: string;
  gateway: string;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentUpdateInput {
  status?: (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
  gatewayTransactionId?: string;
  paymentIntent?: string;
  clientSecret?: string;
  receiptUrl?: string;
  paidAt?: Date;
  failedAt?: Date;
  refundedAt?: Date;
}

export interface PaymentResponse {
  payment: Payment;
}

export interface PaymentSummary {
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
  totalRefunded: number;
  totalAmount: number;
}
