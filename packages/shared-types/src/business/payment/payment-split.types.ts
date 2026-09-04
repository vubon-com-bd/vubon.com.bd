/**
 * Payment Split Types
 * পেমেন্ট স্প্লিট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Payment } from './payment.types';

export interface PaymentSplit extends BaseEntity {
  paymentId: string;
  payment: Payment;
  recipientId: string;
  amount: number;
  currency: string;
  percentage: number;
  status: 'pending' | 'processed' | 'completed' | 'failed';
  metadata?: Record<string, string | number | boolean>;
  processedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSplitCreateInput {
  paymentId: string;
  recipientId: string;
  amount: number;
  percentage: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentSplitUpdateInput {
  status?: 'pending' | 'processed' | 'completed' | 'failed';
  processedAt?: Date;
  completedAt?: Date;
}

export interface PaymentSplitResponse {
  paymentSplit: PaymentSplit;
}
