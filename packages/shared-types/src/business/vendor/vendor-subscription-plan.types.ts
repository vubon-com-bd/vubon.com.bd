/**
 * Vendor Subscription Plan Types
 * ভেন্ডর সাবস্ক্রিপশন প্ল্যান সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface VendorSubscriptionPlan extends BaseEntity {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  tier: 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'enterprise';
  price: number;
  currency: string;
  interval: 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  intervalCount: number;
  features: string[];
  maxProducts: number;
  maxOrders: number;
  maxCustomers: number;
  commissionRate: number;
  isActive: boolean;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSubscriptionPlanCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  tier: 'basic' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'enterprise';
  price: number;
  currency?: string;
  interval: 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  intervalCount?: number;
  features?: string[];
  maxProducts?: number;
  maxOrders?: number;
  maxCustomers?: number;
  commissionRate?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSubscriptionPlanUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  price?: number;
  currency?: string;
  interval?: 'monthly' | 'quarterly' | 'bi_annual' | 'annual';
  intervalCount?: number;
  features?: string[];
  maxProducts?: number;
  maxOrders?: number;
  maxCustomers?: number;
  commissionRate?: number;
  isActive?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSubscriptionPlanResponse {
  vendorSubscriptionPlan: VendorSubscriptionPlan;
}
