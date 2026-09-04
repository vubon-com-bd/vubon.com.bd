/**
 * Vendor Subscription Types
 * ভেন্ডর সাবস্ক্রিপশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';
import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';
import { VendorSubscriptionPlan } from './vendor-subscription-plan.types';

export interface VendorSubscription extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  planId: string;
  plan: VendorSubscriptionPlan;
  status: (typeof VENDOR_SUBSCRIPTION.STATUS)[keyof typeof VENDOR_SUBSCRIPTION.STATUS];
  startDate: Date;
  endDate?: Date;
  trialStartDate?: Date;
  trialEndDate?: Date;
  nextBillingDate?: Date;
  lastBillingDate?: Date;
  cancelledAt?: Date;
  pausedAt?: Date;
  resumeAt?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSubscriptionCreateInput {
  vendorId: string;
  planId: string;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSubscriptionUpdateInput {
  status?: (typeof VENDOR_SUBSCRIPTION.STATUS)[keyof typeof VENDOR_SUBSCRIPTION.STATUS];
  endDate?: Date;
  nextBillingDate?: Date;
  lastBillingDate?: Date;
  cancelledAt?: Date;
  pausedAt?: Date;
  resumeAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSubscriptionResponse {
  vendorSubscription: VendorSubscription;
}
