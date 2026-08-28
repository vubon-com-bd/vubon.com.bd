/**
 * Vendor Subscription Plan Types
 * Type definitions for vendor subscription plans based on shared-constants
 * @module VendorSubscriptionPlanTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor subscription
// ============================================================
import {
  // Vendor Subscription Plan
  VENDOR_SUBSCRIPTION_PLAN,
  VendorSubscriptionPlanType,
  VendorSubscriptionPlanCategory,
  VendorSubscriptionPlanFeatures,
  VendorSubscriptionPlanColor,
  VendorSubscriptionPlanIcon,
  vendorSubscriptionPlanGetLabel,
  vendorSubscriptionPlanGetCategory,
  vendorSubscriptionPlanGetFeatures,
  vendorSubscriptionPlanGetPrice,
  vendorSubscriptionPlanGetColor,
  vendorSubscriptionPlanGetDiscount,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Subscription Plan Extended Types
// ============================================================

/**
 * Vendor subscription plan
 */
export interface VendorSubscriptionPlan extends BaseEntity, Timestamp {
  id: ID;
  type: VendorSubscriptionPlanType;
  category: VendorSubscriptionPlanCategory;
  features: VendorSubscriptionPlanFeatures;
  name: string;
  description?: string;
  price: number;
  currency: Currency;
  discount: number;
  discountType: 'percentage' | 'fixed';
  isActive: boolean;
  isDefault: boolean;
  color: VendorSubscriptionPlanColor;
  icon: VendorSubscriptionPlanIcon;
  order: number;
  metadata?: Metadata;
}

/**
 * Vendor subscription plan filter
 */
export interface VendorSubscriptionPlanFilter {
  ids?: ID[];
  types?: VendorSubscriptionPlanType[];
  categories?: VendorSubscriptionPlanCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  searchTerm?: string;
}

/**
 * Vendor subscription plan statistics
 */
export interface VendorSubscriptionPlanStatistics {
  totalPlans: number;
  activePlans: number;
  defaultPlans: number;
  byType: Record<VendorSubscriptionPlanType, number>;
  byCategory: Record<VendorSubscriptionPlanCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePrice: number;
  maxPrice: number;
  minPrice: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  mostFrequentType: VendorSubscriptionPlanType;
  mostFrequentCategory: VendorSubscriptionPlanCategory;
}

/**
 * Vendor subscription plan summary
 */
export interface VendorSubscriptionPlanSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPlans: number;
  active: number;
  default: number;
  byType: Record<VendorSubscriptionPlanType, number>;
  byCategory: Record<VendorSubscriptionPlanCategory, number>;
  planTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: VendorSubscriptionPlanType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorSubscriptionPlanCategory;
    count: number;
    label: string;
  }[];
  pricingSummary: {
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  };
  discountSummary: {
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

/**
 * Vendor subscription plan configuration
 */
export interface VendorSubscriptionPlanConfiguration {
  enabled: boolean;
  defaultType: VendorSubscriptionPlanType;
  defaultCategory: VendorSubscriptionPlanCategory;
  defaultCurrency: Currency;
  allowCustomPlans: boolean;
  maxPlans: number;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  maxDiscount: number;
  requireDescription: boolean;
  requireFeatures: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: VendorSubscriptionPlanAlertConfig;
}

/**
 * Vendor subscription plan alert configuration
 */
export interface VendorSubscriptionPlanAlertConfig {
  enabled: boolean;
  duplicatePlanAlert: boolean;
  inactivePlanAlert: boolean;
  priceChangeAlert: boolean;
  priceChangeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor subscription plan history
 */
export interface VendorSubscriptionPlanHistory extends BaseEntity, Timestamp {
  id: ID;
  planId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'price_change'
    | 'discount_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor subscription plan validation
 */
export interface VendorSubscriptionPlanValidation {
  isValid: boolean;
  planId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor subscription plan export
 */
export interface VendorSubscriptionPlanExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorSubscriptionPlanFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Vendor Subscription Plan
  VENDOR_SUBSCRIPTION_PLAN,
  VendorSubscriptionPlanType,
  VendorSubscriptionPlanCategory,
  VendorSubscriptionPlanFeatures,
  VendorSubscriptionPlanColor,
  VendorSubscriptionPlanIcon,
  vendorSubscriptionPlanGetLabel,
  vendorSubscriptionPlanGetCategory,
  vendorSubscriptionPlanGetFeatures,
  vendorSubscriptionPlanGetPrice,
  vendorSubscriptionPlanGetColor,
  vendorSubscriptionPlanGetDiscount,
};
