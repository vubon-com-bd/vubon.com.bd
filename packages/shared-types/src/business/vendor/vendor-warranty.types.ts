/**
 * Vendor Warranty Types
 * ভেন্ডর ওয়ারেন্টি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_WARRANTY } from '@vubon/shared-constants';

export interface VendorWarranty extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_WARRANTY.TYPES)[keyof typeof VENDOR_WARRANTY.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  coverage: (typeof VENDOR_WARRANTY.COVERAGE)[keyof typeof VENDOR_WARRANTY.COVERAGE];
  durationDays: number;
  isActive: boolean;
  terms?: string;
  termsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorWarrantyCreateInput {
  vendorId: string;
  type: (typeof VENDOR_WARRANTY.TYPES)[keyof typeof VENDOR_WARRANTY.TYPES];
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  coverage: (typeof VENDOR_WARRANTY.COVERAGE)[keyof typeof VENDOR_WARRANTY.COVERAGE];
  durationDays: number;
  terms?: string;
  termsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorWarrantyUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  coverage?: (typeof VENDOR_WARRANTY.COVERAGE)[keyof typeof VENDOR_WARRANTY.COVERAGE];
  durationDays?: number;
  isActive?: boolean;
  terms?: string;
  termsBangla?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorWarrantyResponse {
  vendorWarranty: VendorWarranty;
}
