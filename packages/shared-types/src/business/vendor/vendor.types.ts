/**
 * Vendor Types
 * ভেন্ডর সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { VENDOR_STATUS } from '@vubon/shared-constants';

export interface Vendor extends BaseEntity {
  userId: string;
  user: User;
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  descriptionBangla?: string;
  logo?: string;
  coverImage?: string;
  status: (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];
  type:
    | 'individual'
    | 'business'
    | 'manufacturer'
    | 'distributor'
    | 'wholesaler'
    | 'retailer'
    | 'importer'
    | 'exporter'
    | 'dropshipper';
  tier: 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'enterprise';
  rating: number;
  reviewCount: number;
  productCount: number;
  orderCount: number;
  revenue: number;
  isVerified: boolean;
  isApproved: boolean;
  approvedAt?: Date;
  verifiedAt?: Date;
  joinedAt: Date;
  lastActiveAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface VendorCreateInput {
  userId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  logo?: string;
  coverImage?: string;
  type?:
    | 'individual'
    | 'business'
    | 'manufacturer'
    | 'distributor'
    | 'wholesaler'
    | 'retailer'
    | 'importer'
    | 'exporter'
    | 'dropshipper';
  tier?: 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'enterprise';
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  logo?: string;
  coverImage?: string;
  status?: (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];
  type?:
    | 'individual'
    | 'business'
    | 'manufacturer'
    | 'distributor'
    | 'wholesaler'
    | 'retailer'
    | 'importer'
    | 'exporter'
    | 'dropshipper';
  tier?: 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'enterprise';
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorResponse {
  vendor: Vendor;
}

export interface VendorSummary {
  totalVendors: number;
  activeVendors: number;
  pendingVendors: number;
  verifiedVendors: number;
  totalRevenue: number;
  averageRating: number;
}
