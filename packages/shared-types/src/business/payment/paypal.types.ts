/**
 * PayPal Types
 * PayPal সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PAYPAL } from '@vubon/shared-constants';

export interface PayPalPayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof PAYPAL.STATUS)[keyof typeof PAYPAL.STATUS];
  clientId: string;
  clientSecret: string;
  sandbox: boolean;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PayPalCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PayPalUpdateInput {
  status?: (typeof PAYPAL.STATUS)[keyof typeof PAYPAL.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface PayPalResponse {
  paypalPayment: PayPalPayment;
}
