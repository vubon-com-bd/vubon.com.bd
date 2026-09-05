/**
 * Crypto Payment Types
 * ক্রিপ্টো পেমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { CRYPTO_PAYMENT } from '@vubon/shared-constants';

export interface CryptoPayment extends BaseEntity {
  paymentId: string;
  currency: (typeof CRYPTO_PAYMENT.CURRENCIES)[keyof typeof CRYPTO_PAYMENT.CURRENCIES];
  amount: number;
  fiatAmount: number;
  fiatCurrency: string;
  walletAddress: string;
  transactionId?: string;
  blockHash?: string;
  blockNumber?: number;
  confirmations: number;
  requiredConfirmations: number;
  status: (typeof CRYPTO_PAYMENT.STATUS)[keyof typeof CRYPTO_PAYMENT.STATUS];
  metadata?: Record<string, string | number | boolean>;
  completedAt?: Date;
  failedAt?: Date;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CryptoPaymentCreateInput {
  paymentId: string;
  currency: (typeof CRYPTO_PAYMENT.CURRENCIES)[keyof typeof CRYPTO_PAYMENT.CURRENCIES];
  amount: number;
  fiatAmount: number;
  fiatCurrency?: string;
  walletAddress: string;
  transactionId?: string;
  requiredConfirmations?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface CryptoPaymentUpdateInput {
  status?: (typeof CRYPTO_PAYMENT.STATUS)[keyof typeof CRYPTO_PAYMENT.STATUS];
  transactionId?: string;
  blockHash?: string;
  blockNumber?: number;
  confirmations?: number;
  completedAt?: Date;
  failedAt?: Date;
  expiredAt?: Date;
}

export interface CryptoPaymentResponse {
  cryptoPayment: CryptoPayment;
}
