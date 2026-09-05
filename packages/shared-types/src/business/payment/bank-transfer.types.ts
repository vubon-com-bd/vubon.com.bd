/**
 * Bank Transfer Types
 * ব্যাংক ট্রান্সফার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { BANK_TRANSFER } from '@vubon/shared-constants';

export interface BankTransfer extends BaseEntity {
  paymentId: string;
  bankName: string;
  bankNameBangla?: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  swiftCode?: string;
  branchName?: string;
  branchCode?: string;
  referenceNumber?: string;
  transferDate?: Date;
  status: (typeof BANK_TRANSFER.STATUS)[keyof typeof BANK_TRANSFER.STATUS];
  amount: number;
  currency: string;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
  completedAt?: Date;
  failedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankTransferCreateInput {
  paymentId: string;
  bankName: string;
  bankNameBangla?: string;
  accountNumber: string;
  accountName: string;
  routingNumber?: string;
  swiftCode?: string;
  branchName?: string;
  branchCode?: string;
  referenceNumber?: string;
  transferDate?: Date;
  amount: number;
  currency?: string;
  note?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface BankTransferUpdateInput {
  status?: (typeof BANK_TRANSFER.STATUS)[keyof typeof BANK_TRANSFER.STATUS];
  referenceNumber?: string;
  transferDate?: Date;
  completedAt?: Date;
  failedAt?: Date;
}

export interface BankTransferResponse {
  bankTransfer: BankTransfer;
}
