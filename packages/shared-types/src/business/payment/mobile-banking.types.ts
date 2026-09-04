/**
 * Mobile Banking Types
 * মোবাইল ব্যাংকিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface MobileBanking extends BaseEntity {
  paymentId: string;
  provider: 'bkash' | 'nagad' | 'rocket' | 'dbbl' | 'city_bank' | 'brac_bank';
  accountNumber: string;
  accountName?: string;
  transactionId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  note?: string;
  metadata?: Record<string, string | number | boolean>;
  completedAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MobileBankingCreateInput {
  paymentId: string;
  provider: 'bkash' | 'nagad' | 'rocket' | 'dbbl' | 'city_bank' | 'brac_bank';
  accountNumber: string;
  accountName?: string;
  transactionId?: string;
  amount: number;
  currency?: string;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface MobileBankingUpdateInput {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  completedAt?: Date;
  failedAt?: Date;
}

export interface MobileBankingResponse {
  mobileBanking: MobileBanking;
}
