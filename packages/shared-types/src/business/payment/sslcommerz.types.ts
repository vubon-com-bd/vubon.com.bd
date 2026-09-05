/**
 * SSLCommerz Types
 * SSLCommerz সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { SSLCOMMERZ } from '@vubon/shared-constants';

export interface SSLCommerzPayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof SSLCOMMERZ.STATUS)[keyof typeof SSLCOMMERZ.STATUS];
  storeId: string;
  storePassword: string;
  sandbox: boolean;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SSLCommerzCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SSLCommerzUpdateInput {
  status?: (typeof SSLCOMMERZ.STATUS)[keyof typeof SSLCOMMERZ.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface SSLCommerzResponse {
  sslcommerzPayment: SSLCommerzPayment;
}
