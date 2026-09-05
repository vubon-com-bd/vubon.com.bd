/**
 * Stripe Types
 * Stripe সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { STRIPE } from '@vubon/shared-constants';

export interface StripePayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof STRIPE.STATUS)[keyof typeof STRIPE.STATUS];
  apiKey: string;
  webhookSecret: string;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StripeCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface StripeUpdateInput {
  status?: (typeof STRIPE.STATUS)[keyof typeof STRIPE.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface StripeResponse {
  stripePayment: StripePayment;
}
