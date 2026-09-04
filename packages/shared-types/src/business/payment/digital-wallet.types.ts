/**
 * Digital Wallet Types
 * ডিজিটাল ওয়ালেট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface DigitalWallet extends BaseEntity {
  userId: string;
  walletId: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'suspended' | 'closed';
  walletType: 'user' | 'vendor' | 'platform';
  metadata?: Record<string, string | number | boolean>;
  lastTransactionAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DigitalWalletTransaction extends BaseEntity {
  walletId: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  transactionType:
    'payment' | 'refund' | 'transfer' | 'deposit' | 'withdrawal' | 'fee' | 'adjustment';
  referenceId?: string;
  referenceType?: string;
  description?: string;
  descriptionBangla?: string;
  balanceBefore: number;
  balanceAfter: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
}

export interface DigitalWalletCreateInput {
  userId: string;
  walletId: string;
  currency?: string;
  walletType?: 'user' | 'vendor' | 'platform';
  metadata?: Record<string, string | number | boolean>;
}

export interface DigitalWalletUpdateInput {
  status?: 'active' | 'inactive' | 'suspended' | 'closed';
  balance?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface DigitalWalletResponse {
  digitalWallet: DigitalWallet;
}
