/**
 * Cart Types
 * Type definitions for cart module based on shared-constants
 * @module CartTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Core
  CART,
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  CartSession,
  CartDefault,
  CartLimit,
  CartError,
  cartGetTypeLabel,
  cartGetCategoryLabel,
  cartGetStatusLabel,
  cartGetPriorityLabel,
  cartGetErrorLabel,
  cartIsActive,
  cartIsAbandoned,
  cartIsConverted,
  cartIsEditable,
  cartGetDefaultExpiryHours,
  cartGetDefaultMaxItems,
  cartGetDefaultCurrency,
  // Cart Status
  CART_STATUS,
  CartStatusType,
  CartStatusColor,
  CartStatusCategory,
  CartStatusOrder,
  CartStatusTransition,
  cartStatusGetStatusLabel,
  cartGetStatusColor,
  cartGetStatusCategory,
  cartIsActiveStatus,
  cartIsAbandonedStatus,
  cartIsConvertedStatus,
  cartIsEditableStatus,
  cartCanTransition,
  // Cart Item
  CART_ITEM,
  CartItemType,
  CartItemStatus,
  CartItemDiscountType,
  CartItemDefault,
  CartItemLimit,
  CartItemError,
  cartitemGetTypeLabel,
  cartitemGetStatusLabel,
  cartitemGetDiscountTypeLabel,
  cartitemGetErrorLabel,
  cartitemIsAvailable,
  cartitemIsInStock,
  cartitemGetDefaultQuantity,
  cartitemGetMaxQuantity,
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
  // Cart Promotion
  CART_PROMOTION,
  CartPromotionType,
  CartPromotionCategory,
  CartPromotionStatus,
  CartPromotionTrigger,
  CartPromotionAction,
  CartPromotionPriority,
  CartPromotionDefault,
  CartPromotionLimit,
  CartPromotionError,
  cartpromotionGetTypeLabel,
  cartpromotionGetCategoryLabel,
  cartpromotionGetStatusLabel,
  cartpromotionGetTriggerLabel,
  cartpromotionGetActionLabel,
  cartpromotionGetErrorLabel,
  cartpromotionIsActive,
  cartpromotionIsAutoType,
  cartpromotionIsCodeType,
  cartpromotionIsFlashSale,
  // Abandoned Cart
  ABANDONED_CART,
  AbandonedCartStatus,
  AbandonedCartReminderType,
  AbandonedCartRecoveryChannel,
  AbandonedCartRecoveryStatus,
  AbandonedCartReason,
  AbandonedCartDefault,
  AbandonedCartLimit,
  AbandonedCartError,
  abandonedcartGetStatusLabel,
  abandonedcartGetReminderTypeLabel,
  abandonedcartGetRecoveryChannelLabel,
  abandonedcartGetRecoveryStatusLabel,
  abandonedcartGetReasonLabel,
  abandonedcartGetErrorLabel,
  abandonedcartIsRecovered,
  abandonedcartIsActive,
  abandonedcartGetDefaultAbandonmentThreshold,
  abandonedcartGetDefaultFirstReminder,
  abandonedcartGetDefaultMaxReminders,
  // Cart Settings
  CART_SETTINGS,
  CartSettingsCategory,
  CartSettingType,
  CartSettingStatus,
  CartSettingScope,
  CartSettingDefault,
  CartSettingsLimit,
  CartSettingsError,
  cartsettingsGetCategoryLabel,
  cartsettingsGetTypeLabel,
  cartsettingsGetStatusLabel,
  cartsettingsGetScopeLabel,
  cartsettingsGetErrorLabel,
  cartsettingsIsActive,
  cartsettingsIsGlobal,
  cartsettingsIsUserScope,
  cartsettingsGetDefaultCurrency,
  cartsettingsGetDefaultLocale,
  cartsettingsGetDefaultMaxItems,
  cartsettingsGetDefaultSessionTimeout,
  // Shipping
  SHIPPING,
  ShippingType,
  ShippingCategory,
  ShippingStatus,
  ShippingMethod,
  ShippingCarrier,
  ShippingCalculationType,
  ShippingDefault,
  ShippingLimit,
  ShippingError,
  shippingGetTypeLabel,
  shippingGetCategoryLabel,
  shippingGetStatusLabel,
  shippingGetMethodLabel,
  shippingGetCarrierLabel,
  shippingGetCalculationTypeLabel,
  shippingGetErrorLabel,
  shippingIsActive,
  shippingIsDomestic,
  shippingIsInternational,
  shippingGetDefaultCost,
  shippingGetDefaultFreeThreshold,
  shippingGetDefaultDeliveryDays,
  // Tax
  TAX,
  TaxType,
  TaxCategory,
  TaxStatus,
  TaxCalculationType,
  TaxJurisdiction,
  TaxRate,
  TaxDefault,
  TaxLimit,
  TaxError,
  taxGetTypeLabel,
  taxGetCategoryLabel,
  taxGetStatusLabel,
  taxGetCalculationTypeLabel,
  taxGetJurisdictionLabel,
  taxGetErrorLabel,
  taxIsActive,
  taxIsStandard,
  taxIsExempt,
  taxIsZero,
  taxGetDefaultRate,
  taxGetDefaultRounding,
  taxGetMaxRate,
  taxCalculate,
  // Cart Error
  CART_ERROR,
  CART_ERROR_CODES,
  CART_ERROR_MESSAGES,
  CartErrorCategory,
  CartErrorSeverity,
  CartErrorSource,
  CartErrorCode,
  CartErrorDefault,
  carterrorGetCategoryLabel,
  carterrorGetSeverityLabel,
  carterrorGetSourceLabel,
  carterrorGetMessage,
  carterrorGetDefaultCategory,
  carterrorGetDefaultSeverity,
  carterrorGetDefaultRetryCount,
  carterrorIsRetryable,
  carterrorIsValidationError,
  carterrorIsPermissionError,
} from '@vubon/shared-constants';

// ============================================================
// Cart Extended Types
// ============================================================

/**
 * Cart item
 */
export interface CartItem extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  type: CartItemType;
  status: CartItemStatus;
  quantity: number;
  price: number;
  total: number;
  currency: string;
  discountType?: CartItemDiscountType;
  discountAmount?: number;
  isAvailable: boolean;
  isInStock: boolean;
  metadata?: Metadata;
}

/**
 * Cart
 */
export interface Cart extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: CartType;
  category: CartCategory;
  status: CartStatusType;
  priority: CartPriority;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  coupon?: CartCoupon;
  promotions: CartPromotion[];
  isActive: boolean;
  isAbandoned: boolean;
  isConverted: boolean;
  isEditable: boolean;
  expiresAt: Date;
  lastActivityAt: Date;
  metadata?: Metadata;
}

/**
 * Cart coupon
 */
export interface CartCoupon extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  code: string;
  type: CouponType;
  category: CouponCategory;
  status: CouponStatus;
  discount: number;
  discountType: CouponDiscountType;
  maxDiscount?: number;
  minOrderAmount?: number;
  metadata?: Metadata;
}

/**
 * Cart promotion
 */
export interface CartPromotion extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  type: CartPromotionType;
  category: CartPromotionCategory;
  status: CartPromotionStatus;
  trigger: CartPromotionTrigger;
  action: CartPromotionAction;
  priority: CartPromotionPriority;
  discount: number;
  discountType: CouponDiscountType;
  maxDiscount?: number;
  minOrderAmount?: number;
  isActive: boolean;
  isAutoType: boolean;
  isCodeType: boolean;
  isFlashSale: boolean;
  metadata?: Metadata;
}

/**
 * Cart filter
 */
export interface CartFilter {
  userIds?: ID[];
  types?: CartType[];
  categories?: CartCategory[];
  statuses?: CartStatusType[];
  priorities?: CartPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minTotal?: number;
  maxTotal?: number;
  isActive?: boolean;
  isAbandoned?: boolean;
  isConverted?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
}

/**
 * Cart statistics
 */
export interface CartStatistics {
  userId: ID;
  totalCarts: number;
  activeCarts: number;
  abandonedCarts: number;
  convertedCarts: number;
  byType: Record<CartType, number>;
  byCategory: Record<CartCategory, number>;
  byStatus: Record<CartStatusType, number>;
  byPriority: Record<CartPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCartValue: number;
  maxCartValue: number;
  minCartValue: number;
  totalItems: number;
  averageItems: number;
  mostFrequentType: CartType;
  mostFrequentCategory: CartCategory;
  mostFrequentStatus: CartStatusType;
}

/**
 * Cart summary
 */
export interface CartSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  abandoned: number;
  converted: number;
  byType: Record<CartType, number>;
  byCategory: Record<CartCategory, number>;
  byStatus: Record<CartStatusType, number>;
  byPriority: Record<CartPriority, number>;
  cartTrend: {
    date: Date;
    total: number;
    active: number;
    abandoned: number;
  }[];
  topTypes: {
    type: CartType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: CartCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: CartStatusType;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalValue: number;
    averageValue: number;
    totalItems: number;
    averageItems: number;
  };
}

/**
 * Cart configuration
 */
export interface CartConfiguration {
  enabled: boolean;
  defaultType: CartType;
  defaultCategory: CartCategory;
  defaultPriority: CartPriority;
  defaultCurrency: string;
  defaultMaxItems: number;
  defaultExpiryHours: number;
  allowGuestCart: boolean;
  allowMultipleCarts: boolean;
  maxCartsPerUser: number;
  autoMerge: boolean;
  mergeStrategy: 'newest' | 'oldest' | 'largest' | 'smallest';
  notificationOnAbandon: boolean;
  notificationOnConvert: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: CartAlertConfig;
}

/**
 * Cart alert configuration
 */
export interface CartAlertConfig {
  enabled: boolean;
  abandonmentAlert: boolean;
  abandonmentThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Cart history
 */
export interface CartHistory extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'add_item'
    | 'remove_item'
    | 'update_item'
    | 'apply_coupon'
    | 'remove_coupon'
    | 'apply_promotion'
    | 'remove_promotion'
    | 'convert'
    | 'abandon'
    | 'restore'
    | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart validation
 */
export interface CartValidation {
  isValid: boolean;
  cartId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart export
 */
export interface CartExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CartFilter;
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
  // Cart Core
  CART,
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  CartSession,
  CartDefault,
  CartLimit,
  CartError,
  cartGetTypeLabel,
  cartGetCategoryLabel,
  cartGetStatusLabel,
  cartGetPriorityLabel,
  cartGetErrorLabel,
  cartIsActive,
  cartIsAbandoned,
  cartIsConverted,
  cartIsEditable,
  cartGetDefaultExpiryHours,
  cartGetDefaultMaxItems,
  cartGetDefaultCurrency,
  // Cart Status
  CART_STATUS,
  CartStatusType,
  CartStatusColor,
  CartStatusCategory,
  CartStatusOrder,
  CartStatusTransition,
  cartStatusGetStatusLabel,
  cartGetStatusColor,
  cartGetStatusCategory,
  cartIsActiveStatus,
  cartIsAbandonedStatus,
  cartIsConvertedStatus,
  cartIsEditableStatus,
  cartCanTransition,
  // Cart Item
  CART_ITEM,
  CartItemType,
  CartItemStatus,
  CartItemDiscountType,
  CartItemDefault,
  CartItemLimit,
  CartItemError,
  cartitemGetTypeLabel,
  cartitemGetStatusLabel,
  cartitemGetDiscountTypeLabel,
  cartitemGetErrorLabel,
  cartitemIsAvailable,
  cartitemIsInStock,
  cartitemGetDefaultQuantity,
  cartitemGetMaxQuantity,
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
  // Cart Promotion
  CART_PROMOTION,
  CartPromotionType,
  CartPromotionCategory,
  CartPromotionStatus,
  CartPromotionTrigger,
  CartPromotionAction,
  CartPromotionPriority,
  CartPromotionDefault,
  CartPromotionLimit,
  CartPromotionError,
  cartpromotionGetTypeLabel,
  cartpromotionGetCategoryLabel,
  cartpromotionGetStatusLabel,
  cartpromotionGetTriggerLabel,
  cartpromotionGetActionLabel,
  cartpromotionGetErrorLabel,
  cartpromotionIsActive,
  cartpromotionIsAutoType,
  cartpromotionIsCodeType,
  cartpromotionIsFlashSale,
  // Abandoned Cart
  ABANDONED_CART,
  AbandonedCartStatus,
  AbandonedCartReminderType,
  AbandonedCartRecoveryChannel,
  AbandonedCartRecoveryStatus,
  AbandonedCartReason,
  AbandonedCartDefault,
  AbandonedCartLimit,
  AbandonedCartError,
  abandonedcartGetStatusLabel,
  abandonedcartGetReminderTypeLabel,
  abandonedcartGetRecoveryChannelLabel,
  abandonedcartGetRecoveryStatusLabel,
  abandonedcartGetReasonLabel,
  abandonedcartGetErrorLabel,
  abandonedcartIsRecovered,
  abandonedcartIsActive,
  abandonedcartGetDefaultAbandonmentThreshold,
  abandonedcartGetDefaultFirstReminder,
  abandonedcartGetDefaultMaxReminders,
  // Cart Settings
  CART_SETTINGS,
  CartSettingsCategory,
  CartSettingType,
  CartSettingStatus,
  CartSettingScope,
  CartSettingDefault,
  CartSettingsLimit,
  CartSettingsError,
  cartsettingsGetCategoryLabel,
  cartsettingsGetTypeLabel,
  cartsettingsGetStatusLabel,
  cartsettingsGetScopeLabel,
  cartsettingsGetErrorLabel,
  cartsettingsIsActive,
  cartsettingsIsGlobal,
  cartsettingsIsUserScope,
  cartsettingsGetDefaultCurrency,
  cartsettingsGetDefaultLocale,
  cartsettingsGetDefaultMaxItems,
  cartsettingsGetDefaultSessionTimeout,
  // Shipping
  SHIPPING,
  ShippingType,
  ShippingCategory,
  ShippingStatus,
  ShippingMethod,
  ShippingCarrier,
  ShippingCalculationType,
  ShippingDefault,
  ShippingLimit,
  ShippingError,
  shippingGetTypeLabel,
  shippingGetCategoryLabel,
  shippingGetStatusLabel,
  shippingGetMethodLabel,
  shippingGetCarrierLabel,
  shippingGetCalculationTypeLabel,
  shippingGetErrorLabel,
  shippingIsActive,
  shippingIsDomestic,
  shippingIsInternational,
  shippingGetDefaultCost,
  shippingGetDefaultFreeThreshold,
  shippingGetDefaultDeliveryDays,
  // Tax
  TAX,
  TaxType,
  TaxCategory,
  TaxStatus,
  TaxCalculationType,
  TaxJurisdiction,
  TaxRate,
  TaxDefault,
  TaxLimit,
  TaxError,
  taxGetTypeLabel,
  taxGetCategoryLabel,
  taxGetStatusLabel,
  taxGetCalculationTypeLabel,
  taxGetJurisdictionLabel,
  taxGetErrorLabel,
  taxIsActive,
  taxIsStandard,
  taxIsExempt,
  taxIsZero,
  taxGetDefaultRate,
  taxGetDefaultRounding,
  taxGetMaxRate,
  taxCalculate,
  // Cart Error
  CART_ERROR,
  CART_ERROR_CODES,
  CART_ERROR_MESSAGES,
  CartErrorCategory,
  CartErrorSeverity,
  CartErrorSource,
  CartErrorCode,
  CartErrorDefault,
  carterrorGetCategoryLabel,
  carterrorGetSeverityLabel,
  carterrorGetSourceLabel,
  carterrorGetMessage,
  carterrorGetDefaultCategory,
  carterrorGetDefaultSeverity,
  carterrorGetDefaultRetryCount,
  carterrorIsRetryable,
  carterrorIsValidationError,
  carterrorIsPermissionError,
};
