/**
 * Payment Verification Types
 * পেমেন্ট যাচাই সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface PaymentVerification extends BaseEntity {
  paymentId: string;
  status: 'pending' | 'verified' | 'failed' | 'expired';
  method: 'otp' | 'callback' | 'webhook' | 'manual';
  code?: string;
  attempts: number;
  maxAttempts: number;
  verifiedAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentVerificationCreateInput {
  paymentId: string;
  method: 'otp' | 'callback' | 'webhook' | 'manual';
  code?: string;
  maxAttempts?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentVerificationUpdateInput {
  status?: 'pending' | 'verified' | 'failed' | 'expired';
  code?: string;
  attempts?: number;
  verifiedAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface PaymentVerificationResponse {
  paymentVerification: PaymentVerification;
}
