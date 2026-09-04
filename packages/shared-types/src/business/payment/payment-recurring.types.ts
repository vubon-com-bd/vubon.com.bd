/**
 * Payment Recurring Types
 * পেমেন্ট রিকারিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface PaymentRecurring extends BaseEntity {
  userId: string;
  amount: number;
  currency: string;
  frequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  interval: number;
  startDate: Date;
  endDate?: Date;
  nextPaymentDate: Date;
  lastPaymentDate?: Date;
  status: 'active' | 'paused' | 'cancelled' | 'completed' | 'failed';
  method: string;
  gateway: string;
  gatewaySubscriptionId?: string;
  paymentId?: string;
  metadata?: Record<string, string | number | boolean>;
  pausedAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRecurringCreateInput {
  userId: string;
  amount: number;
  currency?: string;
  frequency: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  interval?: number;
  startDate: Date;
  endDate?: Date;
  method: string;
  gateway: string;
  gatewaySubscriptionId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentRecurringUpdateInput {
  status?: 'active' | 'paused' | 'cancelled' | 'completed' | 'failed';
  amount?: number;
  endDate?: Date;
  nextPaymentDate?: Date;
  lastPaymentDate?: Date;
  pausedAt?: Date;
  cancelledAt?: Date;
  completedAt?: Date;
}

export interface PaymentRecurringResponse {
  paymentRecurring: PaymentRecurring;
}
