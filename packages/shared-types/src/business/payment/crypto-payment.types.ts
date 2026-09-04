/**
 * Crypto Payment Types
 * ক্রিপ্টো পেমেন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CryptoPayment extends BaseEntity {
  paymentId: string;
  currency:
    'btc' | 'eth' | 'usdt' | 'bnb' | 'xrp' | 'ada' | 'sol' | 'dot' | 'doge' | 'shib' | 'other';
  amount: number;
  fiatAmount: number;
  fiatCurrency: string;
  walletAddress: string;
  transactionId?: string;
  blockHash?: string;
  blockNumber?: number;
  confirmations: number;
  requiredConfirmations: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';
  metadata?: Record<string, string | number | boolean>;
  completedAt?: Date;
  failedAt?: Date;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CryptoPaymentCreateInput {
  paymentId: string;
  currency:
    'btc' | 'eth' | 'usdt' | 'bnb' | 'xrp' | 'ada' | 'sol' | 'dot' | 'doge' | 'shib' | 'other';
  amount: number;
  fiatAmount: number;
  fiatCurrency?: string;
  walletAddress: string;
  transactionId?: string;
  requiredConfirmations?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface CryptoPaymentUpdateInput {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';
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
