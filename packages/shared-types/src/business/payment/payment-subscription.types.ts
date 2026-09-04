/**
 * Payment Subscription Types
 * পেমেন্ট সাবস্ক্রিপশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';

export interface PaymentSubscription extends BaseEntity {
  userId: string;
  user?: User;
  name: string;
  nameBangla?: string;
  description?: string;
  price: number;
  currency: string;
  interval: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  intervalCount: number;
  trialPeriodDays?: number;
  trialStartDate?: Date;
  trialEndDate?: Date;
  startDate: Date;
  endDate?: Date;
  nextBillingDate: Date;
  lastBillingDate?: Date;
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'cancelled' | 'completed' | 'failed';
  paymentMethod: string;
  gateway: string;
  gatewaySubscriptionId?: string;
  metadata?: Record<string, string | number | boolean>;
  features: string[];
  cancelAtPeriodEnd: boolean;
  cancelledAt?: Date;
  pausedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSubscriptionCreateInput {
  userId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  price: number;
  currency?: string;
  interval: 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  intervalCount?: number;
  trialPeriodDays?: number;
  startDate?: Date;
  paymentMethod: string;
  gateway: string;
  gatewaySubscriptionId?: string;
  metadata?: Record<string, string | number | boolean>;
  features?: string[];
}

export interface PaymentSubscriptionUpdateInput {
  status?: 'active' | 'trialing' | 'past_due' | 'paused' | 'cancelled' | 'completed' | 'failed';
  price?: number;
  endDate?: Date;
  nextBillingDate?: Date;
  lastBillingDate?: Date;
  metadata?: Record<string, string | number | boolean>;
  features?: string[];
  cancelAtPeriodEnd?: boolean;
}

export interface PaymentSubscriptionResponse {
  paymentSubscription: PaymentSubscription;
}
