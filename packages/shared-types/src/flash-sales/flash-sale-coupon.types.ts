/**
 * Flash Sale Coupon Types
 * Type definitions for flash sale coupons based on shared-constants
 * @module FlashSaleCouponTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales coupon
// ============================================================
import {
  // Coupon Core
  FLASH_SALE_COUPON,
  FlashSaleCouponType,
  FlashSaleCouponCategory,
  FlashSaleCouponGeneration,
  FlashSaleCouponFormat,
  FlashSaleCouponApplication,
  FlashSaleCouponRestriction,
  flashsalesCouponGetTypeLabel,
  flashsalesCouponGetCategoryLabel,
  flashsalesCouponGetGenerationLabel,
  flashsalesCouponGetFormatLabel,
  flashsalesCouponGetApplicationLabel,
  flashsalesCouponGetRestrictionLabel,
  flashsalesCouponIsValidType,
  flashsalesCouponIsValidCategory,
  flashsalesCouponIsValidFormat,
  flashsalesCouponGetDefaultDiscountPercentage,
  flashsalesCouponGetDefaultMaxUses,
  flashsalesCouponGetDefaultMaxUsesPerUser,
  flashsalesCouponGetDefaultDurationDays,
  flashsalesCouponGetDefaultCodeLength,
  flashsalesCouponGetMaxDiscountPercentage,
  flashsalesCouponGetMaxFixedAmount,
  flashsalesCouponGetMaxUses,
  flashsalesCouponGetMaxCodeLength,
  flashsalesCouponGetMinCodeLength,
  flashsalesCouponGetMaxBulkGeneration,
  flashsalesCouponGenerateRandomCode,
  // Coupon Type
  FLASH_SALE_COUPON_TYPE,
  FlashSaleCouponTypeCategory,
  FlashSaleCouponTypeComplexity,
  FlashSaleCouponTypeScope,
  FlashSaleCouponTypeFrequency,
  FlashSaleCouponTypeTrigger,
  FlashSaleCouponTypePriority,
  FlashSaleCouponTypeStacking,
  flashsalesCouponTypeGetCategoryLabel,
  flashsalesCouponTypeGetComplexityLabel,
  flashsalesCouponTypeGetScopeLabel,
  flashsalesCouponTypeGetFrequencyLabel,
  flashsalesCouponTypeGetTriggerLabel,
  flashsalesCouponTypeGetPriorityLabel,
  flashsalesCouponTypeGetStackingLabel,
  flashsalesCouponTypeIsValidCategory,
  flashsalesCouponTypeIsValidScope,
  flashsalesCouponTypeIsValidTrigger,
  flashsalesCouponTypeIsStackable,
  flashsalesCouponTypeIsExclusive,
  flashsalesCouponTypeIsHighPriority,
  // Coupon Status
  FLASH_SALE_COUPON_STATUS,
  FlashSaleCouponStatusType,
  FlashSaleCouponStatusCategory,
  FlashSaleCouponStatusColor,
  FlashSaleCouponStatusPriority,
  FlashSaleCouponAvailability,
  flashsalesCouponStatusGetLabel,
  flashsalesCouponStatusGetCategory,
  flashsalesCouponStatusGetColor,
  flashsalesCouponStatusGetPriority,
  flashsalesCouponStatusIsActive,
  flashsalesCouponStatusIsAvailable,
  flashsalesCouponStatusIsTerminated,
  flashsalesCouponStatusCanTransitionTo,
  flashsalesCouponStatusGetAvailableTransitions,
  flashsalesCouponStatusCanApprove,
  flashsalesCouponStatusCanReject,
  flashsalesCouponStatusCanSchedule,
  flashsalesCouponStatusCanActivate,
  flashsalesCouponStatusCanPause,
  flashsalesCouponStatusCanResume,
  flashsalesCouponStatusCanComplete,
  flashsalesCouponStatusCanExpire,
  flashsalesCouponStatusCanCancel,
  flashsalesCouponStatusCanDelete,
  flashsalesCouponStatusGetAvailabilityLabel,
  flashsalesCouponStatusIsValid,
  flashsalesCouponStatusIsValidAvailability,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Coupon Extended Types
// ============================================================

/**
 * Flash Sale Coupon
 */
export interface FlashSaleCoupon extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  code: string;
  type: FlashSaleCouponType;
  category: FlashSaleCouponCategory;
  generation: FlashSaleCouponGeneration;
  format: FlashSaleCouponFormat;
  application: FlashSaleCouponApplication;
  restriction: FlashSaleCouponRestriction;
  status: FlashSaleCouponStatusType;
  availability: FlashSaleCouponAvailability;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  maxUses: number;
  usedCount: number;
  maxUsesPerUser: number;
  durationDays: number;
  isActive: boolean;
  isAvailable: boolean;
  isTerminated: boolean;
  isStackable: boolean;
  isExclusive: boolean;
  isHighPriority: boolean;
  startsAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Coupon Filter
 */
export interface FlashSaleCouponFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  codes?: string[];
  types?: FlashSaleCouponType[];
  categories?: FlashSaleCouponCategory[];
  generations?: FlashSaleCouponGeneration[];
  formats?: FlashSaleCouponFormat[];
  applications?: FlashSaleCouponApplication[];
  restrictions?: FlashSaleCouponRestriction[];
  statuses?: FlashSaleCouponStatusType[];
  availabilities?: FlashSaleCouponAvailability[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  isTerminated?: boolean;
  isStackable?: boolean;
  isExclusive?: boolean;
  isHighPriority?: boolean;
  minDiscountValue?: number;
  maxDiscountValue?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Coupon Statistics
 */
export interface FlashSaleCouponStatistics {
  flashSaleId: ID;
  totalCoupons: number;
  activeCoupons: number;
  availableCoupons: number;
  terminatedCoupons: number;
  stackableCoupons: number;
  exclusiveCoupons: number;
  highPriorityCoupons: number;
  byType: Record<FlashSaleCouponType, number>;
  byCategory: Record<FlashSaleCouponCategory, number>;
  byStatus: Record<FlashSaleCouponStatusType, number>;
  byGeneration: Record<FlashSaleCouponGeneration, number>;
  byFormat: Record<FlashSaleCouponFormat, number>;
  byApplication: Record<FlashSaleCouponApplication, number>;
  byRestriction: Record<FlashSaleCouponRestriction, number>;
  byAvailability: Record<FlashSaleCouponAvailability, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalUses: number;
  averageUses: number;
  maxUses: number;
  minUses: number;
  totalDiscountGiven: number;
  averageDiscountGiven: number;
  maxDiscountGiven: number;
  minDiscountGiven: number;
  mostFrequentType: FlashSaleCouponType;
  mostFrequentCategory: FlashSaleCouponCategory;
  mostFrequentStatus: FlashSaleCouponStatusType;
}

/**
 * Flash Sale Coupon Summary
 */
export interface FlashSaleCouponSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCoupons: number;
  active: number;
  available: number;
  terminated: number;
  stackable: number;
  exclusive: number;
  highPriority: number;
  byType: Record<FlashSaleCouponType, number>;
  byCategory: Record<FlashSaleCouponCategory, number>;
  byStatus: Record<FlashSaleCouponStatusType, number>;
  byGeneration: Record<FlashSaleCouponGeneration, number>;
  byFormat: Record<FlashSaleCouponFormat, number>;
  byApplication: Record<FlashSaleCouponApplication, number>;
  byRestriction: Record<FlashSaleCouponRestriction, number>;
  byAvailability: Record<FlashSaleCouponAvailability, number>;
  couponTrend: {
    date: Date;
    total: number;
    active: number;
    available: number;
  }[];
  topTypes: {
    type: FlashSaleCouponType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleCouponCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleCouponStatusType;
    count: number;
    label: string;
  }[];
  usageMetrics: {
    totalUses: number;
    averageUses: number;
    totalDiscountGiven: number;
    averageDiscountGiven: number;
  };
}

/**
 * Flash Sale Coupon Configuration
 */
export interface FlashSaleCouponConfiguration {
  enabled: boolean;
  defaultType: FlashSaleCouponType;
  defaultCategory: FlashSaleCouponCategory;
  defaultGeneration: FlashSaleCouponGeneration;
  defaultFormat: FlashSaleCouponFormat;
  defaultApplication: FlashSaleCouponApplication;
  defaultRestriction: FlashSaleCouponRestriction;
  defaultStatus: FlashSaleCouponStatusType;
  defaultDiscountPercentage: number;
  defaultMaxUses: number;
  defaultMaxUsesPerUser: number;
  defaultDurationDays: number;
  defaultCodeLength: number;
  maxDiscountPercentage: number;
  maxFixedAmount: number;
  maxUses: number;
  maxCodeLength: number;
  minCodeLength: number;
  maxBulkGeneration: number;
  requireApproval: boolean;
  allowStacking: boolean;
  allowExclusive: boolean;
  allowHighPriority: boolean;
  autoGenerateCode: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnSchedule: boolean;
  notificationOnActivate: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnComplete: boolean;
  notificationOnExpire: boolean;
  notificationOnCancel: boolean;
  notificationOnDelete: boolean;
  alertConfig?: FlashSaleCouponAlertConfig;
}

/**
 * Flash Sale Coupon Alert Configuration
 */
export interface FlashSaleCouponAlertConfig {
  enabled: boolean;
  highUsageAlert: boolean;
  highUsageThreshold: number;
  lowUsageAlert: boolean;
  lowUsageThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Coupon History
 */
export interface FlashSaleCouponHistory extends BaseEntity, Timestamp {
  id: ID;
  couponId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'schedule'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'expire'
    | 'cancel'
    | 'delete'
    | 'restore'
    | 'use'
    | 'bulk_generate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Coupon Validation
 */
export interface FlashSaleCouponValidation {
  isValid: boolean;
  couponId: ID;
  flashSaleId: ID;
  code: string;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Coupon Export
 */
export interface FlashSaleCouponExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleCouponFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Coupon Usage
 */
export interface FlashSaleCouponUsage extends BaseEntity, Timestamp {
  id: ID;
  couponId: ID;
  flashSaleId: ID;
  userId: ID;
  orderId: ID;
  discountAmount: number;
  metadata?: Metadata;
}

/**
 * Flash Sale Coupon Bulk Generation
 */
export interface FlashSaleCouponBulkGeneration extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  count: number;
  codes: string[];
  type: FlashSaleCouponType;
  category: FlashSaleCouponCategory;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  maxUsesPerUser: number;
  durationDays: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Coupon Core
  FLASH_SALE_COUPON,
  FlashSaleCouponType,
  FlashSaleCouponCategory,
  FlashSaleCouponGeneration,
  FlashSaleCouponFormat,
  FlashSaleCouponApplication,
  FlashSaleCouponRestriction,
  flashsalesCouponGetTypeLabel,
  flashsalesCouponGetCategoryLabel,
  flashsalesCouponGetGenerationLabel,
  flashsalesCouponGetFormatLabel,
  flashsalesCouponGetApplicationLabel,
  flashsalesCouponGetRestrictionLabel,
  flashsalesCouponIsValidType,
  flashsalesCouponIsValidCategory,
  flashsalesCouponIsValidFormat,
  flashsalesCouponGetDefaultDiscountPercentage,
  flashsalesCouponGetDefaultMaxUses,
  flashsalesCouponGetDefaultMaxUsesPerUser,
  flashsalesCouponGetDefaultDurationDays,
  flashsalesCouponGetDefaultCodeLength,
  flashsalesCouponGetMaxDiscountPercentage,
  flashsalesCouponGetMaxFixedAmount,
  flashsalesCouponGetMaxUses,
  flashsalesCouponGetMaxCodeLength,
  flashsalesCouponGetMinCodeLength,
  flashsalesCouponGetMaxBulkGeneration,
  flashsalesCouponGenerateRandomCode,
  // Coupon Type
  FLASH_SALE_COUPON_TYPE,
  FlashSaleCouponTypeCategory,
  FlashSaleCouponTypeComplexity,
  FlashSaleCouponTypeScope,
  FlashSaleCouponTypeFrequency,
  FlashSaleCouponTypeTrigger,
  FlashSaleCouponTypePriority,
  FlashSaleCouponTypeStacking,
  flashsalesCouponTypeGetCategoryLabel,
  flashsalesCouponTypeGetComplexityLabel,
  flashsalesCouponTypeGetScopeLabel,
  flashsalesCouponTypeGetFrequencyLabel,
  flashsalesCouponTypeGetTriggerLabel,
  flashsalesCouponTypeGetPriorityLabel,
  flashsalesCouponTypeGetStackingLabel,
  flashsalesCouponTypeIsValidCategory,
  flashsalesCouponTypeIsValidScope,
  flashsalesCouponTypeIsValidTrigger,
  flashsalesCouponTypeIsStackable,
  flashsalesCouponTypeIsExclusive,
  flashsalesCouponTypeIsHighPriority,
  // Coupon Status
  FLASH_SALE_COUPON_STATUS,
  FlashSaleCouponStatusType,
  FlashSaleCouponStatusCategory,
  FlashSaleCouponStatusColor,
  FlashSaleCouponStatusPriority,
  FlashSaleCouponAvailability,
  flashsalesCouponStatusGetLabel,
  flashsalesCouponStatusGetCategory,
  flashsalesCouponStatusGetColor,
  flashsalesCouponStatusGetPriority,
  flashsalesCouponStatusIsActive,
  flashsalesCouponStatusIsAvailable,
  flashsalesCouponStatusIsTerminated,
  flashsalesCouponStatusCanTransitionTo,
  flashsalesCouponStatusGetAvailableTransitions,
  flashsalesCouponStatusCanApprove,
  flashsalesCouponStatusCanReject,
  flashsalesCouponStatusCanSchedule,
  flashsalesCouponStatusCanActivate,
  flashsalesCouponStatusCanPause,
  flashsalesCouponStatusCanResume,
  flashsalesCouponStatusCanComplete,
  flashsalesCouponStatusCanExpire,
  flashsalesCouponStatusCanCancel,
  flashsalesCouponStatusCanDelete,
  flashsalesCouponStatusGetAvailabilityLabel,
  flashsalesCouponStatusIsValid,
  flashsalesCouponStatusIsValidAvailability,
};
