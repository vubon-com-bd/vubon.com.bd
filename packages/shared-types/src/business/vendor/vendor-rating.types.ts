/**
 * Vendor Rating Types
 * ভেন্ডর রেটিং সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_RATING } from '@vubon/shared-constants';

export interface VendorRating extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  type: (typeof VENDOR_RATING.TYPES)[keyof typeof VENDOR_RATING.TYPES];
  value: number;
  count: number;
  average: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorRatingCreateInput {
  vendorId: string;
  type: (typeof VENDOR_RATING.TYPES)[keyof typeof VENDOR_RATING.TYPES];
  value: number;
  count?: number;
  distribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorRatingUpdateInput {
  value?: number;
  count?: number;
  average?: number;
  distribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorRatingResponse {
  vendorRating: VendorRating;
}

export interface VendorRatingSummary {
  overall: number;
  product: number;
  service: number;
  delivery: number;
  communication: number;
  totalRatings: number;
}
