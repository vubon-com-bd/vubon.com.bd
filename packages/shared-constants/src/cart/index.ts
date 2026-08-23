/**
 * Cart Constants Index
 * Export all cart constants and types for easy importing
 */

// Cart Constants
export {
  CART,
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
} from './cart.constants';

export type {
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  CartSession,
  CartDefault,
  CartLimit,
  CartError,
} from './cart.constants';

// Cart Status Constants
export {
  CART_STATUS,
  cartGetStatusLabel as cartStatusGetStatusLabel,
  cartGetStatusColor,
  cartGetStatusCategory,
  cartIsActiveStatus,
  cartIsAbandonedStatus,
  cartIsConvertedStatus,
  cartIsEditableStatus,
  cartCanTransition,
} from './cart-status.constants';

export type {
  CartStatusType,
  CartStatusColor,
  CartStatusCategory,
  CartStatusOrder,
  CartStatusTransition,
} from './cart-status.constants';

// Cart Item Constants
export {
  CART_ITEM,
  cartitemGetTypeLabel,
  cartitemGetStatusLabel,
  cartitemGetDiscountTypeLabel,
  cartitemGetErrorLabel,
  cartitemIsAvailable,
  cartitemIsInStock,
  cartitemGetDefaultQuantity,
  cartitemGetMaxQuantity,
} from './cart-item.constants';

export type {
  CartItemType,
  CartItemStatus,
  CartItemDiscountType,
  CartItemDefault,
  CartItemLimit,
  CartItemError,
} from './cart-item.constants';

// Coupon Constants
export {
  COUPON,
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
} from './coupon.constants';

export type {
  CouponType,
  CouponCategory,
  CouponStatus,
  CouponApplicability,
  CouponRestriction,
  CouponDefault,
  CouponLimit,
  CouponError,
} from './coupon.constants';

// Coupon Type Constants
export {
  COUPON_TYPE,
  coupontypeGetCategoryLabel,
  coupontypeGetSubTypeLabel,
  coupontypeGetGenerationMethodLabel,
  coupontypeGetValidationRuleLabel,
  coupontypeIsDiscountCategory,
  coupontypeIsShippingCategory,
  coupontypeIsGiftCategory,
  coupontypeIsLoyaltyCategory,
} from './coupon-type.constants';

export type {
  CouponCategoryType,
  CouponSubType,
  CouponGenerationMethod,
  CouponValidationRule,
  CouponPriority,
} from './coupon-type.constants';

// Coupon Discount Type Constants
export {
  COUPON_DISCOUNT,
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
} from './coupon-discount-type.constants';

export type {
  CouponDiscountType,
  CouponDiscountCalculation,
  CouponDiscountLevel,
  CouponDiscountEligibility,
  CouponDiscountValidity,
  CouponDiscountCombination,
  CouponDiscountDefault,
  CouponDiscountLimit,
} from './coupon-discount-type.constants';

// Coupon Restriction Constants
export {
  COUPON_RESTRICTION,
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
} from './coupon-restriction.constants';

export type {
  CouponRestrictionType,
  CouponRestrictionOperator,
  CouponRestrictionCondition,
  CouponRestrictionPriority,
  CouponRestrictionAction,
  CouponRestrictionDefault,
  CouponRestrictionLimit,
} from './coupon-restriction.constants';

// Cart Promotion Constants
export {
  CART_PROMOTION,
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
} from './cart-promotion.constants';

export type {
  CartPromotionType,
  CartPromotionCategory,
  CartPromotionStatus,
  CartPromotionTrigger,
  CartPromotionAction,
  CartPromotionPriority,
  CartPromotionDefault,
  CartPromotionLimit,
  CartPromotionError,
} from './cart-promotion.constants';

// Abandoned Cart Constants
export {
  ABANDONED_CART,
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
} from './abandoned-cart.constants';

export type {
  AbandonedCartStatus,
  AbandonedCartReminderType,
  AbandonedCartRecoveryChannel,
  AbandonedCartRecoveryStatus,
  AbandonedCartReason,
  AbandonedCartDefault,
  AbandonedCartLimit,
  AbandonedCartError,
} from './abandoned-cart.constants';

// Cart Settings Constants
export {
  CART_SETTINGS,
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
} from './cart-settings.constants';

export type {
  CartSettingsCategory,
  CartSettingType,
  CartSettingStatus,
  CartSettingScope,
  CartSettingDefault,
  CartSettingsLimit,
  CartSettingsError,
} from './cart-settings.constants';

// Shipping Constants
export {
  SHIPPING,
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
} from './shipping.constants';

export type {
  ShippingType,
  ShippingCategory,
  ShippingStatus,
  ShippingMethod,
  ShippingCarrier,
  ShippingCalculationType,
  ShippingDefault,
  ShippingLimit,
  ShippingError,
} from './shipping.constants';

// Tax Constants
export {
  TAX,
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
} from './tax.constants';

export type {
  TaxType,
  TaxCategory,
  TaxStatus,
  TaxCalculationType,
  TaxJurisdiction,
  TaxRate,
  TaxDefault,
  TaxLimit,
  TaxError,
} from './tax.constants';

// Cart Error Constants
export {
  CART_ERROR,
  CART_ERROR_CODES,
  CART_ERROR_MESSAGES,
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
} from './cart-error.constants';

export type {
  CartErrorCategory,
  CartErrorSeverity,
  CartErrorSource,
  CartErrorCode,
  CartErrorDefault,
} from './cart-error.constants';
