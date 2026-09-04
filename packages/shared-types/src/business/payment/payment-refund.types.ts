/**
 * Payment Refund Types
 * পেমেন্ট রিফান্ড সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Payment } from './payment.types';

export interface PaymentRefund extends BaseEntity {
  paymentId: string;
  payment: Payment;
  amount: number;
  currency: string;
  reason: string;
  reasonBangla?: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed' | 'failed';
  gatewayRefundId?: string;
  metadata?: Record<string, string | number | boolean>;
  approvedBy?: string;
  processedBy?: string;
  approvedAt?: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRefundCreateInput {
  paymentId: string;
  amount: number;
  reason: string;
  reasonBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentRefundUpdateInput {
  status?: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed' | 'failed';
  gatewayRefundId?: string;
  approvedBy?: string;
  processedBy?: string;
  approvedAt?: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
}

export interface PaymentRefundResponse {
  paymentRefund: PaymentRefund;
}
