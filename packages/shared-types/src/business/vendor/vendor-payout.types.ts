/**
 * Vendor Payout Types
 * ভেন্ডর পেআউট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { PAYOUT_STATUS } from '@vubon/shared-constants';
import { VendorPayoutMethod } from './vendor-payout-method.types';

export interface VendorPayout extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  amount: number;
  currency: string;
  status: (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS];
  method: VendorPayoutMethod;
  referenceId?: string;
  transactionId?: string;
  bankAccountId?: string;
  mobileBankingId?: string;
  description?: string;
  descriptionBangla?: string;
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  processedBy?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorPayoutCreateInput {
  vendorId: string;
  amount: number;
  currency?: string;
  methodId: string;
  description?: string;
  descriptionBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPayoutUpdateInput {
  status?: (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS];
  referenceId?: string;
  transactionId?: string;
  processedAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  processedBy?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPayoutResponse {
  vendorPayout: VendorPayout;
}

export interface VendorPayoutSummary {
  totalPending: number;
  totalProcessed: number;
  totalCompleted: number;
  totalFailed: number;
  totalAmount: number;
}
