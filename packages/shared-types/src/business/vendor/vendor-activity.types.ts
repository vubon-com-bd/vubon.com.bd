/**
 * Vendor Activity Types
 * ভেন্ডর অ্যাক্টিভিটি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_ACTIVITY } from '@vubon/shared-constants';

export interface VendorActivity extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_ACTIVITY.TYPES)[keyof typeof VENDOR_ACTIVITY.TYPES];
  description: string;
  descriptionBangla?: string;
  status: (typeof VENDOR_ACTIVITY.STATUS)[keyof typeof VENDOR_ACTIVITY.STATUS];
  priority: (typeof VENDOR_ACTIVITY.PRIORITY)[keyof typeof VENDOR_ACTIVITY.PRIORITY];
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
}

export interface VendorActivityCreateInput {
  vendorId: string;
  type: (typeof VENDOR_ACTIVITY.TYPES)[keyof typeof VENDOR_ACTIVITY.TYPES];
  description: string;
  descriptionBangla?: string;
  status?: (typeof VENDOR_ACTIVITY.STATUS)[keyof typeof VENDOR_ACTIVITY.STATUS];
  priority?: (typeof VENDOR_ACTIVITY.PRIORITY)[keyof typeof VENDOR_ACTIVITY.PRIORITY];
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorActivityResponse {
  vendorActivity: VendorActivity;
}
