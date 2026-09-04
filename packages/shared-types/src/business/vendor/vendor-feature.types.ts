/**
 * Vendor Feature Types
 * ভেন্ডর ফিচার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface VendorFeature extends BaseEntity {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  code: string;
  category: 'basic' | 'advanced' | 'premium' | 'enterprise';
  isActive: boolean;
  isPaid: boolean;
  price?: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorFeatureCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  code: string;
  category: 'basic' | 'advanced' | 'premium' | 'enterprise';
  isPaid?: boolean;
  price?: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorFeatureUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  isActive?: boolean;
  isPaid?: boolean;
  price?: number;
  currency?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorFeatureResponse {
  vendorFeature: VendorFeature;
}
