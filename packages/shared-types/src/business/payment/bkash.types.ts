/**
 * bKash Types
 * bKash সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { BKASH } from '@vubon/shared-constants';

export interface BkashPayment extends BaseEntity {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: (typeof BKASH.STATUS)[keyof typeof BKASH.STATUS];
  apiKey: string;
  secret: string;
  username: string;
  password: string;
  sandbox: boolean;
  metadata?: Record<string, string | number | boolean>;
  paidAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BkashCreateInput {
  paymentId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface BkashUpdateInput {
  status?: (typeof BKASH.STATUS)[keyof typeof BKASH.STATUS];
  transactionId?: string;
  paidAt?: Date;
  failedAt?: Date;
}

export interface BkashResponse {
  bkashPayment: BkashPayment;
}
