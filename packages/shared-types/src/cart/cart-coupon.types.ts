/**
 * Cart Coupon Types
 * Type definitions for cart coupons based on shared-constants
 * @module CartCouponTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import CartCoupon from cart.types
// ============================================================
import type { CartCoupon } from './cart.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Coupon
  COUPON,
  CouponType,
  CouponCategory,
  CouponStatus,
  CouponApplicability,
  CouponRestriction,
  CouponDefault,
  CouponLimit,
  CouponError,
  couponGetTypeLabel,
  couponGetCategoryLabel,
  couponGetStatusLabel,
  couponGetApplicabilityLabel,
  couponGetRestrictionLabel,
  couponGetErrorLabel,
  couponIsActive,
  couponIsValid,
  couponGetDefaultDiscount,
  couponGetDefaultValidityDays,
  couponGetMaxDiscount,
  couponIsPercentageType,
  couponIsFixedType,
  couponIsFreeShippingType,
  // Coupon Type
  COUPON_TYPE,
  CouponCategoryType,
  CouponSubType,
  CouponGenerationMethod,
  CouponValidationRule,
  CouponPriority,
  coupontypeGetCategoryLabel,
  coupontypeGetSubTypeLabel,
  coupontypeGetGenerationMethodLabel,
  coupontypeGetValidationRuleLabel,
  coupontypeIsDiscountCategory,
  coupontypeIsShippingCategory,
  coupontypeIsGiftCategory,
  coupontypeIsLoyaltyCategory,
  // Coupon Discount Type
  COUPON_DISCOUNT,
  CouponDiscountType,
  CouponDiscountCalculation,
  CouponDiscountLevel,
  CouponDiscountEligibility,
  CouponDiscountValidity,
  CouponDiscountCombination,
  CouponDiscountDefault,
  CouponDiscountLimit,
  coupondiscountGetTypeLabel,
  coupondiscountGetCalculationLabel,
  coupondiscountGetLevelLabel,
  coupondiscountGetEligibilityLabel,
  coupondiscountGetValidityLabel,
  coupondiscountGetCombinationLabel,
  coupondiscountIsPercentage,
  coupondiscountIsFixed,
  coupondiscountIsTiered,
  coupondiscountIsVolume,
  coupondiscountIsBundle,
  coupondiscountGetDefaultPercentage,
  coupondiscountGetMaxPercentage,
  coupondiscountGetDefaultFixedAmount,
  // Coupon Restriction
  COUPON_RESTRICTION,
  CouponRestrictionType,
  CouponRestrictionOperator,
  CouponRestrictionCondition,
  CouponRestrictionPriority,
  CouponRestrictionAction,
  CouponRestrictionDefault,
  CouponRestrictionLimit,
  couponrestrictionGetTypeLabel,
  couponrestrictionGetOperatorLabel,
  couponrestrictionGetConditionLabel,
  couponrestrictionGetActionLabel,
  couponrestrictionIsOrderRestriction,
  couponrestrictionIsProductRestriction,
  couponrestrictionIsCustomerRestriction,
  couponrestrictionIsTimeRestriction,
  couponrestrictionGetDefaultOperator,
  couponrestrictionGetDefaultPriority,
} from '@vubon/shared-constants';

// ============================================================
// Cart Coupon Extended Types
// ============================================================

/**
 * Cart coupon filter
 */
export interface CartCouponFilter {
  cartIds?: ID[];
  userIds?: ID[];
  types?: CouponType[];
  categories?: CouponCategory[];
  statuses?: CouponStatus[];
  discountTypes?: CouponDiscountType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minDiscount?: number;
  maxDiscount?: number;
  isActive?: boolean;
  isValid?: boolean;
  isPercentageType?: boolean;
  isFixedType?: boolean;
  isFreeShippingType?: boolean;
  searchTerm?: string;
  code?: string;
}

/**
 * Cart coupon statistics
 */
export interface CartCouponStatistics {
  cartId: ID;
  totalCoupons: number;
  activeCoupons: number;
  validCoupons: number;
  percentageCoupons: number;
  fixedCoupons: number;
  freeShippingCoupons: number;
  byType: Record<CouponType, number>;
  byCategory: Record<CouponCategory, number>;
  byStatus: Record<CouponStatus, number>;
  byDiscountType: Record<CouponDiscountType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalDiscount: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  mostFrequentType: CouponType;
  mostFrequentCategory: CouponCategory;
  mostFrequentDiscountType: CouponDiscountType;
}

/**
 * Cart coupon summary
 */
export interface CartCouponSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCoupons: number;
  active: number;
  valid: number;
  percentage: number;
  fixed: number;
  freeShipping: number;
  byType: Record<CouponType, number>;
  byCategory: Record<CouponCategory, number>;
  byStatus: Record<CouponStatus, number>;
  byDiscountType: Record<CouponDiscountType, number>;
  couponTrend: {
    date: Date;
    total: number;
    active: number;
    applied: number;
  }[];
  topTypes: {
    type: CouponType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: CouponCategory;
    count: number;
    label: string;
  }[];
  topDiscountTypes: {
    type: CouponDiscountType;
    count: number;
    label: string;
  }[];
  financialImpact: {
    totalDiscount: number;
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

/**
 * Cart coupon configuration
 */
export interface CartCouponConfiguration {
  enabled: boolean;
  defaultType: CouponType;
  defaultCategory: CouponCategory;
  defaultDiscountType: CouponDiscountType;
  defaultDiscount: number;
  maxDiscount: number;
  defaultValidityDays: number;
  maxCouponsPerCart: number;
  allowStacking: boolean;
  stackingStrategy: 'sequential' | 'best' | 'combined';
  requireCode: boolean;
  codeLength: number;
  codePrefix: string;
  maxUsesPerCoupon: number;
  maxUsesPerUser: number;
  notificationOnApply: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: CartCouponAlertConfig;
}

/**
 * Cart coupon alert configuration
 */
export interface CartCouponAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  usageThresholdAlert: boolean;
  codeGenerationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  usageThreshold: number;
  expiryThreshold: number;
}

/**
 * Cart coupon history
 */
export interface CartCouponHistory extends BaseEntity, Timestamp {
  id: ID;
  couponId: ID;
  cartId: ID;
  userId: ID;
  action: 'apply' | 'remove' | 'expire' | 'update' | 'code_generate' | 'code_redeem';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart coupon validation
 */
export interface CartCouponValidation {
  isValid: boolean;
  coupon: CartCoupon;
  cartId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart coupon code
 */
export interface CartCouponCode extends BaseEntity, Timestamp {
  id: ID;
  couponId: ID;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  usedBy?: ID;
  expiresAt?: Date;
  maxUses: number;
  usedCount: number;
  metadata?: Metadata;
}

/**
 * Cart coupon restriction
 */
export interface CartCouponRestriction extends BaseEntity, Timestamp {
  id: ID;
  couponId: ID;
  type: CouponRestrictionType;
  operator: CouponRestrictionOperator;
  value: unknown;
  priority: CouponRestrictionPriority;
  action: CouponRestrictionAction;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Cart coupon export
 */
export interface CartCouponExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CartCouponFilter;
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
  // Coupon
  COUPON,
  CouponType,
  CouponCategory,
  CouponStatus,
  CouponApplicability,
  CouponRestriction,
  CouponDefault,
  CouponLimit,
  CouponError,
  couponGetTypeLabel,
  couponGetCategoryLabel,
  couponGetStatusLabel,
  couponGetApplicabilityLabel,
  couponGetRestrictionLabel,
  couponGetErrorLabel,
  couponIsActive,
  couponIsValid,
  couponGetDefaultDiscount,
  couponGetDefaultValidityDays,
  couponGetMaxDiscount,
  couponIsPercentageType,
  couponIsFixedType,
  couponIsFreeShippingType,
  // Coupon Type
  COUPON_TYPE,
  CouponCategoryType,
  CouponSubType,
  CouponGenerationMethod,
  CouponValidationRule,
  CouponPriority,
  coupontypeGetCategoryLabel,
  coupontypeGetSubTypeLabel,
  coupontypeGetGenerationMethodLabel,
  coupontypeGetValidationRuleLabel,
  coupontypeIsDiscountCategory,
  coupontypeIsShippingCategory,
  coupontypeIsGiftCategory,
  coupontypeIsLoyaltyCategory,
  // Coupon Discount Type
  COUPON_DISCOUNT,
  CouponDiscountType,
  CouponDiscountCalculation,
  CouponDiscountLevel,
  CouponDiscountEligibility,
  CouponDiscountValidity,
  CouponDiscountCombination,
  CouponDiscountDefault,
  CouponDiscountLimit,
  coupondiscountGetTypeLabel,
  coupondiscountGetCalculationLabel,
  coupondiscountGetLevelLabel,
  coupondiscountGetEligibilityLabel,
  coupondiscountGetValidityLabel,
  coupondiscountGetCombinationLabel,
  coupondiscountIsPercentage,
  coupondiscountIsFixed,
  coupondiscountIsTiered,
  coupondiscountIsVolume,
  coupondiscountIsBundle,
  coupondiscountGetDefaultPercentage,
  coupondiscountGetMaxPercentage,
  coupondiscountGetDefaultFixedAmount,
  // Coupon Restriction
  COUPON_RESTRICTION,
  CouponRestrictionType,
  CouponRestrictionOperator,
  CouponRestrictionCondition,
  CouponRestrictionPriority,
  CouponRestrictionAction,
  CouponRestrictionDefault,
  CouponRestrictionLimit,
  couponrestrictionGetTypeLabel,
  couponrestrictionGetOperatorLabel,
  couponrestrictionGetConditionLabel,
  couponrestrictionGetActionLabel,
  couponrestrictionIsOrderRestriction,
  couponrestrictionIsProductRestriction,
  couponrestrictionIsCustomerRestriction,
  couponrestrictionIsTimeRestriction,
  couponrestrictionGetDefaultOperator,
  couponrestrictionGetDefaultPriority,
};
