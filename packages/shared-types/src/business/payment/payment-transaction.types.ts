/**
 * Payment Transaction Types
 * পেমেন্ট ট্রানজেকশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { TRANSACTION_STATUS } from '@vubon/shared-constants';

export interface PaymentTransaction extends BaseEntity {
  paymentId: string;
  transactionId: string;
  gatewayTransactionId?: string;
  amount: number;
  currency: string;
  status: (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];
  type: 'payment' | 'authorize' | 'capture' | 'refund' | 'void';
  responseCode?: string;
  responseMessage?: string;
  responseData?: Record<string, string | number | boolean | object>;
  gateway: string;
  method: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentTransactionCreateInput {
  paymentId: string;
  transactionId: string;
  gatewayTransactionId?: string;
  amount: number;
  currency?: string;
  type: 'payment' | 'authorize' | 'capture' | 'refund' | 'void';
  gateway: string;
  method: string;
  responseCode?: string;
  responseMessage?: string;
  responseData?: Record<string, string | number | boolean | object>;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentTransactionUpdateInput {
  status?: (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];
  responseCode?: string;
  responseMessage?: string;
  responseData?: Record<string, string | number | boolean | object>;
}

export interface PaymentTransactionResponse {
  paymentTransaction: PaymentTransaction;
}
