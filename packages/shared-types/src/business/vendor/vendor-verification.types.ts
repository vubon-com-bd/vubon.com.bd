/**
 * Vendor Verification Types
 * ভেন্ডর যাচাই সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants';

export interface VendorVerification extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  status: (typeof VENDOR_VERIFICATION.STATUS)[keyof typeof VENDOR_VERIFICATION.STATUS];
  type: (typeof VENDOR_VERIFICATION.TYPES)[keyof typeof VENDOR_VERIFICATION.TYPES];
  method: (typeof VENDOR_VERIFICATION.METHODS)[keyof typeof VENDOR_VERIFICATION.METHODS];
  code?: string;
  token?: string;
  attempts: number;
  maxAttempts: number;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  verifiedBy?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorVerificationCreateInput {
  vendorId: string;
  type: (typeof VENDOR_VERIFICATION.TYPES)[keyof typeof VENDOR_VERIFICATION.TYPES];
  method: (typeof VENDOR_VERIFICATION.METHODS)[keyof typeof VENDOR_VERIFICATION.METHODS];
  code?: string;
  token?: string;
  maxAttempts?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorVerificationUpdateInput {
  status?: (typeof VENDOR_VERIFICATION.STATUS)[keyof typeof VENDOR_VERIFICATION.STATUS];
  attempts?: number;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  verifiedBy?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorVerificationResponse {
  vendorVerification: VendorVerification;
}
