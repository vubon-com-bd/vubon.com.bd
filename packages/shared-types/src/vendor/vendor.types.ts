/**
 * Vendor Types
 * Type definitions for vendor module based on shared-constants
 * @module VendorTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Email,
  PhoneNumber,
  Address,
  Currency,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Core Vendor
  VENDOR,
  VendorType,
  VendorStatus,
  VendorTier,
  VendorVerification,
  VendorApproval,
  VendorSuspension,
  VendorCommission,
  vendorGetTypeLabel,
  vendorGetStatusLabel,
  vendorGetTierLabel,
  vendorGetVerificationLabel,
  vendorGetApprovalLabel,
  vendorGetSuspensionLabel,
  vendorGetCommissionLabel,
  vendorIsActive,
  vendorIsVerified,
  vendorIsApproved,
  vendorCanSell,
  // Vendor Status
  VENDOR_STATUS,
  VendorStatusType,
  VendorStatusCategory,
  VendorStatusColor,
  VendorStatusIcon,
  VendorStatusTransition,
  vendorStatusGetLabel,
  vendorStatusIsActive,
  vendorStatusIsRestricted,
  vendorStatusIsActiveOrInactive,
  vendorStatusGetCategory,
  vendorStatusCanTransition,
  // Vendor Type
  VENDOR_TYPE_TYPES,
  VENDOR_TYPE_CATEGORIES,
  VENDOR_TYPE_COLORS,
  VENDOR_TYPE_ICONS,
  VENDOR_TYPE_REQUIREMENTS,
  VENDOR_TYPE_BENEFITS,
  VendorTypeType,
  VendorTypeCategory,
  VendorTypeColor,
  VendorTypeIcon,
  vendorTypeGetLabel,
  vendorTypeGetCategory,
  vendorTypeGetColor,
  vendorTypeGetIcon,
  vendorTypeGetRequirements,
  // Vendor Tier
  VENDOR_TIER_TYPES,
  VENDOR_TIER_LEVELS,
  VENDOR_TIER_REQUIREMENTS,
  VENDOR_TIER_COLORS,
  VENDOR_TIER_ICONS,
  VENDOR_TIER_BENEFITS,
  VendorTierType,
  VendorTierLevel,
  VendorTierRequirements,
  VendorTierColor,
  VendorTierIcon,
  vendorTierGetLabel,
  vendorTierGetLevel,
  vendorTierGetColor,
  vendorTierGetIcon,
  vendorTierGetRequirements,
  vendorTierGetBenefits,
  vendorTierGetCommissionRate,
  // Vendor Verification
  VENDOR_VERIFICATION,
  VendorVerificationType,
  VendorVerificationCategory,
  VendorVerificationColor,
  VendorVerificationIcon,
  VendorVerificationDocument,
  VendorVerificationStep,
  vendorVerificationGetLabel,
  vendorVerificationIsVerified,
  vendorVerificationIsPending,
  vendorVerificationIsFailed,
  vendorVerificationGetCategory,
  vendorVerificationGetDocumentLabel,
  vendorVerificationGetStepLabel,
  // Vendor Approval
  VENDOR_APPROVAL,
  VendorApprovalType,
  VendorApprovalCategory,
  VendorApprovalColor,
  VendorApprovalIcon,
  VendorApprovalReason,
  VendorApprovalAction,
  vendorApprovalGetLabel,
  vendorApprovalIsApproved,
  vendorApprovalIsPending,
  vendorApprovalIsRejected,
  vendorApprovalGetCategory,
  vendorApprovalGetReasonLabel,
  vendorApprovalGetActionLabel,
  // Vendor Suspension
  VENDOR_SUSPENSION,
  VendorSuspensionType,
  VendorSuspensionCategory,
  VendorSuspensionColor,
  VendorSuspensionIcon,
  VendorSuspensionReason,
  vendorSuspensionGetLabel,
  vendorSuspensionIsActive,
  vendorSuspensionIsPending,
  vendorSuspensionIsPermanent,
  vendorSuspensionGetCategory,
  vendorSuspensionGetReasonLabel,
  vendorSuspensionGetDuration,
  // Vendor Commission
  VENDOR_COMMISSION,
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionColor,
  VendorCommissionTier,
  VendorCommissionPeriod,
  vendorCommissionGetTypeLabel,
  vendorCommissionGetCategoryLabel,
  vendorCommissionGetStatusLabel,
  vendorCommissionGetColor,
  vendorCommissionGetRateForAmount,
  vendorCommissionCalculate,
  vendorCommissionIsActive,
  vendorCommissionGetPeriodLabel,
  // Vendor Settlement
  VENDOR_SETTLEMENT,
  VendorSettlementType,
  VendorSettlementStatus,
  VendorSettlementMethod,
  VendorSettlementFrequency,
  VendorSettlementPeriod,
  vendorSettlementGetTypeLabel,
  vendorSettlementGetStatusLabel,
  vendorSettlementGetMethodLabel,
  vendorSettlementGetFrequencyLabel,
  vendorSettlementIsCompleted,
  vendorSettlementIsPending,
  vendorSettlementIsFailed,
  vendorSettlementGetPeriodLabel,
  // Vendor Performance
  VENDOR_PERFORMANCE,
  VendorPerformanceMetric,
  VendorPerformanceStatus,
  VendorPerformancePeriod,
  VendorPerformanceScore,
  VendorPerformanceColor,
  VendorPerformanceIcon,
  vendorPerformanceGetMetricLabel,
  vendorPerformanceGetStatusLabel,
  vendorPerformanceGetColor,
  vendorPerformanceGetStatusFromScore,
  vendorPerformanceGetPeriodLabel,
  vendorPerformanceGetMetricWeight,
  vendorPerformanceIsGood,
  vendorPerformanceIsPoor,
  // Vendor Rating
  VENDOR_RATING,
  VendorRatingType,
  VendorRatingLevel,
  VendorRatingScore,
  VendorRatingColor,
  VendorRatingIcon,
  VendorRatingCategory,
  vendorRatingGetTypeLabel,
  vendorRatingGetLevel,
  vendorRatingGetLevelLabel,
  vendorRatingGetColor,
  vendorRatingGetStars,
  vendorRatingGetCategory,
  vendorRatingIsPositive,
  vendorRatingIsNegative,
  vendorRatingGetAverageScore,
  // Vendor Review
  VENDOR_REVIEW,
  VendorReviewType,
  VendorReviewStatus,
  VendorReviewCategory,
  VendorReviewColor,
  VendorReviewIcon,
  VendorReviewHelpfulness,
  vendorReviewGetTypeLabel,
  vendorReviewGetStatusLabel,
  vendorReviewIsApproved,
  vendorReviewIsPending,
  vendorReviewIsVisible,
  vendorReviewGetCategory,
  vendorReviewGetCategoryLabel,
  vendorReviewIsPositive,
  vendorReviewIsNegative,
  vendorReviewGetHelpfulnessLabel,
  // Vendor Bank Account
  VENDOR_BANK_ACCOUNT,
  VendorBankAccountType,
  VendorBankAccountStatus,
  VendorBankAccountCurrency,
  VendorBankAccountVerificationMethod,
  vendorBankAccountGetTypeLabel,
  vendorBankAccountGetStatusLabel,
  vendorBankAccountGetCurrencyLabel,
  vendorBankAccountIsActive,
  vendorBankAccountIsVerified,
  vendorBankAccountCanTransact,
  vendorBankAccountGetVerificationMethodLabel,
  // Vendor Shipping
  VENDOR_SHIPPING,
  VendorShippingType,
  VendorShippingStatus,
  VendorShippingCarrier,
  VendorShippingMethod,
  VendorShippingZone,
  vendorShippingGetTypeLabel,
  vendorShippingGetStatusLabel,
  vendorShippingGetCarrierLabel,
  vendorShippingGetMethodLabel,
  vendorShippingIsDelivered,
  vendorShippingIsInTransit,
  vendorShippingIsFailed,
  // Vendor Return Policy
  VENDOR_RETURN_POLICY,
  VendorReturnPolicyType,
  VendorReturnPolicyStatus,
  VendorReturnReason,
  VendorReturnCondition,
  VendorReturnRestriction,
  vendorReturnPolicyGetTypeLabel,
  vendorReturnPolicyGetStatusLabel,
  vendorReturnPolicyGetReasonLabel,
  vendorReturnPolicyGetPeriodDays,
  vendorReturnPolicyIsActive,
  vendorReturnPolicyIsReturnable,
  vendorReturnPolicyGetFee,
  // Vendor Warranty
  VENDOR_WARRANTY,
  VendorWarrantyType,
  VendorWarrantyStatus,
  VendorWarrantyCoverage,
  VendorWarrantyCondition,
  VendorWarrantyExclusion,
  vendorWarrantyGetTypeLabel,
  vendorWarrantyGetStatusLabel,
  vendorWarrantyGetCoverageLabel,
  vendorWarrantyGetPeriodMonths,
  vendorWarrantyIsActive,
  vendorWarrantyIsValid,
  vendorWarrantyHasWarranty,
  vendorWarrantyGetExclusionLabel,
  // Vendor Support
  VENDOR_SUPPORT,
  VendorSupportType,
  VendorSupportStatus,
  VendorSupportPriority,
  VendorSupportChannel,
  VendorSupportCategory,
  vendorSupportGetTypeLabel,
  vendorSupportGetStatusLabel,
  vendorSupportGetPriorityLabel,
  vendorSupportGetChannelLabel,
  vendorSupportGetCategoryLabel,
  vendorSupportIsOpen,
  vendorSupportIsResolved,
  vendorSupportGetResponseTime,
  vendorSupportGetResolutionTime,
  // Vendor Notification
  VENDOR_NOTIFICATION,
  VendorNotificationType,
  VendorNotificationStatus,
  VendorNotificationPriority,
  VendorNotificationCategory,
  VendorNotificationEvent,
  VendorNotificationChannel,
  VendorNotificationTemplate,
  vendorNotificationGetTypeLabel,
  vendorNotificationGetStatusLabel,
  vendorNotificationGetPriorityLabel,
  vendorNotificationGetCategoryLabel,
  vendorNotificationGetEventLabel,
  vendorNotificationGetChannelLabel,
  vendorNotificationIsDelivered,
  vendorNotificationIsFailed,
  vendorNotificationGetTemplateLabel,
  // Vendor Feature
  VENDOR_FEATURE,
  VendorFeatureType,
  VendorFeatureStatus,
  VendorFeatureCategory,
  VendorFeatureAccessLevel,
  VendorFeatureFlag,
  vendorFeatureGetTypeLabel,
  vendorFeatureGetStatusLabel,
  vendorFeatureGetCategoryLabel,
  vendorFeatureGetAccessLevelLabel,
  vendorFeatureIsActive,
  vendorFeatureGetFlagLabel,
  // Vendor Permission
  VENDOR_PERMISSION_MODULES,
  VENDOR_PERMISSION_ACTIONS,
  VENDOR_PERMISSION_ROLES,
  VENDOR_PERMISSION_LEVELS,
  VENDOR_PERMISSION_DEFAULTS,
  VendorPermissionModule,
  VendorPermissionAction,
  VendorPermissionRole,
  VendorPermissionLevel,
  vendorPermissionGetModuleLabel,
  vendorPermissionGetActionLabel,
  vendorPermissionGetRoleLabel,
  vendorPermissionGetLevelLabel,
  vendorPermissionHasPermission,
  vendorPermissionGetRolePermissions,
  // Vendor Error
  VENDOR_ERROR,
  VendorErrorCode,
  VendorErrorCategory,
  VendorErrorSeverity,
  vendorErrorGetMessage,
  vendorErrorGetCategory,
  vendorErrorGetSeverity,
  vendorErrorIsRetryable,
  vendorErrorGetHttpStatus,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Extended Types (রিনেম করা হয়েছে কনফ্লিক্ট এড়াতে)
// ============================================================

/**
 * Vendor
 */
export interface Vendor extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: VendorTypeType;
  status: VendorStatusType;
  tier: VendorTierType;
  name: string;
  slug: string;
  email: Email;
  phone: PhoneNumber;
  address: Address;
  logo?: string;
  banner?: string;
  description?: string;
  verification: VendorVerification;
  approval: VendorApproval;
  suspension: VendorSuspension;
  commission: VendorCommission;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  canSell: boolean;
  metadata?: Metadata;
}

/**
 * Vendor verification detail
 */
export interface VendorVerificationDetail extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorVerificationType;
  category: VendorVerificationCategory;
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'cancelled';
  documents: VendorVerificationDocument[];
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor approval detail
 */
export interface VendorApprovalDetail extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorApprovalType;
  category: VendorApprovalCategory;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  reason?: VendorApprovalReason;
  action?: VendorApprovalAction;
  approvedBy?: ID;
  approvedAt?: Date;
  rejectedAt?: Date;
  comments?: string;
  metadata?: Metadata;
}

/**
 * Vendor suspension detail
 */
export interface VendorSuspensionDetail extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorSuspensionType;
  category: VendorSuspensionCategory;
  reason: VendorSuspensionReason;
  isActive: boolean;
  isPending: boolean;
  isPermanent: boolean;
  suspendedAt: Date;
  unsuspendedAt?: Date;
  durationDays?: number;
  metadata?: Metadata;
}

/**
 * Vendor commission detail
 */
export interface VendorCommissionDetail extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorCommissionType;
  category: VendorCommissionCategory;
  status: VendorCommissionStatus;
  rate: number;
  tiers: VendorCommissionTier[];
  period: VendorCommissionPeriod;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Vendor settlement
 */
export interface VendorSettlement extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorSettlementType;
  status: VendorSettlementStatus;
  method: VendorSettlementMethod;
  frequency: VendorSettlementFrequency;
  amount: number;
  currency: Currency;
  period: VendorSettlementPeriod;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  settledAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor rating
 */
export interface VendorRating extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorRatingType;
  level: VendorRatingLevel;
  score: VendorRatingScore;
  category: VendorRatingCategory;
  isPositive: boolean;
  isNegative: boolean;
  averageScore: number;
  totalReviews: number;
  metadata?: Metadata;
}

/**
 * Vendor review
 */
export interface VendorReview extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorReviewType;
  status: VendorReviewStatus;
  category: VendorReviewCategory;
  rating: number;
  title: string;
  content: string;
  helpfulness: VendorReviewHelpfulness;
  isApproved: boolean;
  isPending: boolean;
  isVisible: boolean;
  isPositive: boolean;
  isNegative: boolean;
  metadata?: Metadata;
}

/**
 * Vendor bank account
 */
export interface VendorBankAccount extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorBankAccountType;
  status: VendorBankAccountStatus;
  accountNumber: string;
  bankName: string;
  branchName: string;
  accountHolderName: string;
  currency: VendorBankAccountCurrency;
  isActive: boolean;
  isVerified: boolean;
  canTransact: boolean;
  verificationMethod: VendorBankAccountVerificationMethod;
  metadata?: Metadata;
}

/**
 * Vendor shipping
 */
export interface VendorShipping extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorShippingType;
  status: VendorShippingStatus;
  carrier: VendorShippingCarrier;
  method: VendorShippingMethod;
  zone: VendorShippingZone;
  trackingNumber?: string;
  isDelivered: boolean;
  isInTransit: boolean;
  isFailed: boolean;
  shippedAt?: Date;
  deliveredAt?: Date;
  estimatedDelivery?: Date;
  metadata?: Metadata;
}

/**
 * Vendor return policy
 */
export interface VendorReturnPolicy extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorReturnPolicyType;
  status: VendorReturnPolicyStatus;
  reason: VendorReturnReason;
  condition: VendorReturnCondition;
  restriction: VendorReturnRestriction;
  isActive: boolean;
  isReturnable: boolean;
  periodDays: number;
  fee?: number;
  metadata?: Metadata;
}

/**
 * Vendor warranty
 */
export interface VendorWarranty extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorWarrantyType;
  status: VendorWarrantyStatus;
  coverage: VendorWarrantyCoverage;
  condition: VendorWarrantyCondition;
  exclusion: VendorWarrantyExclusion;
  isActive: boolean;
  isValid: boolean;
  hasWarranty: boolean;
  periodMonths: number;
  metadata?: Metadata;
}

/**
 * Vendor support
 */
export interface VendorSupport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorSupportType;
  status: VendorSupportStatus;
  priority: VendorSupportPriority;
  channel: VendorSupportChannel;
  category: VendorSupportCategory;
  subject: string;
  message: string;
  isOpen: boolean;
  isResolved: boolean;
  responseTime?: number;
  resolutionTime?: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Vendor
  VENDOR,
  VendorType,
  VendorStatus,
  VendorTier,
  VendorVerification,
  VendorApproval,
  VendorSuspension,
  VendorCommission,
  vendorGetTypeLabel,
  vendorGetStatusLabel,
  vendorGetTierLabel,
  vendorGetVerificationLabel,
  vendorGetApprovalLabel,
  vendorGetSuspensionLabel,
  vendorGetCommissionLabel,
  vendorIsActive,
  vendorIsVerified,
  vendorIsApproved,
  vendorCanSell,
  // Vendor Status
  VENDOR_STATUS,
  VendorStatusType,
  VendorStatusCategory,
  VendorStatusColor,
  VendorStatusIcon,
  VendorStatusTransition,
  vendorStatusGetLabel,
  vendorStatusIsActive,
  vendorStatusIsRestricted,
  vendorStatusIsActiveOrInactive,
  vendorStatusGetCategory,
  vendorStatusCanTransition,
  // Vendor Type
  VENDOR_TYPE_TYPES,
  VENDOR_TYPE_CATEGORIES,
  VENDOR_TYPE_COLORS,
  VENDOR_TYPE_ICONS,
  VENDOR_TYPE_REQUIREMENTS,
  VENDOR_TYPE_BENEFITS,
  VendorTypeType,
  VendorTypeCategory,
  VendorTypeColor,
  VendorTypeIcon,
  vendorTypeGetLabel,
  vendorTypeGetCategory,
  vendorTypeGetColor,
  vendorTypeGetIcon,
  vendorTypeGetRequirements,
  // Vendor Tier
  VENDOR_TIER_TYPES,
  VENDOR_TIER_LEVELS,
  VENDOR_TIER_REQUIREMENTS,
  VENDOR_TIER_COLORS,
  VENDOR_TIER_ICONS,
  VENDOR_TIER_BENEFITS,
  VendorTierType,
  VendorTierLevel,
  VendorTierRequirements,
  VendorTierColor,
  VendorTierIcon,
  vendorTierGetLabel,
  vendorTierGetLevel,
  vendorTierGetColor,
  vendorTierGetIcon,
  vendorTierGetRequirements,
  vendorTierGetBenefits,
  vendorTierGetCommissionRate,
  // Vendor Verification
  VENDOR_VERIFICATION,
  VendorVerificationType,
  VendorVerificationCategory,
  VendorVerificationColor,
  VendorVerificationIcon,
  VendorVerificationDocument,
  VendorVerificationStep,
  vendorVerificationGetLabel,
  vendorVerificationIsVerified,
  vendorVerificationIsPending,
  vendorVerificationIsFailed,
  vendorVerificationGetCategory,
  vendorVerificationGetDocumentLabel,
  vendorVerificationGetStepLabel,
  // Vendor Approval
  VENDOR_APPROVAL,
  VendorApprovalType,
  VendorApprovalCategory,
  VendorApprovalColor,
  VendorApprovalIcon,
  VendorApprovalReason,
  VendorApprovalAction,
  vendorApprovalGetLabel,
  vendorApprovalIsApproved,
  vendorApprovalIsPending,
  vendorApprovalIsRejected,
  vendorApprovalGetCategory,
  vendorApprovalGetReasonLabel,
  vendorApprovalGetActionLabel,
  // Vendor Suspension
  VENDOR_SUSPENSION,
  VendorSuspensionType,
  VendorSuspensionCategory,
  VendorSuspensionColor,
  VendorSuspensionIcon,
  VendorSuspensionReason,
  vendorSuspensionGetLabel,
  vendorSuspensionIsActive,
  vendorSuspensionIsPending,
  vendorSuspensionIsPermanent,
  vendorSuspensionGetCategory,
  vendorSuspensionGetReasonLabel,
  vendorSuspensionGetDuration,
  // Vendor Commission
  VENDOR_COMMISSION,
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionColor,
  VendorCommissionTier,
  VendorCommissionPeriod,
  vendorCommissionGetTypeLabel,
  vendorCommissionGetCategoryLabel,
  vendorCommissionGetStatusLabel,
  vendorCommissionGetColor,
  vendorCommissionGetRateForAmount,
  vendorCommissionCalculate,
  vendorCommissionIsActive,
  vendorCommissionGetPeriodLabel,
  // Vendor Settlement
  VENDOR_SETTLEMENT,
  VendorSettlementType,
  VendorSettlementStatus,
  VendorSettlementMethod,
  VendorSettlementFrequency,
  VendorSettlementPeriod,
  vendorSettlementGetTypeLabel,
  vendorSettlementGetStatusLabel,
  vendorSettlementGetMethodLabel,
  vendorSettlementGetFrequencyLabel,
  vendorSettlementIsCompleted,
  vendorSettlementIsPending,
  vendorSettlementIsFailed,
  vendorSettlementGetPeriodLabel,
  // Vendor Performance
  VENDOR_PERFORMANCE,
  VendorPerformanceMetric,
  VendorPerformanceStatus,
  VendorPerformancePeriod,
  VendorPerformanceScore,
  VendorPerformanceColor,
  VendorPerformanceIcon,
  vendorPerformanceGetMetricLabel,
  vendorPerformanceGetStatusLabel,
  vendorPerformanceGetColor,
  vendorPerformanceGetStatusFromScore,
  vendorPerformanceGetPeriodLabel,
  vendorPerformanceGetMetricWeight,
  vendorPerformanceIsGood,
  vendorPerformanceIsPoor,
  // Vendor Rating
  VENDOR_RATING,
  VendorRatingType,
  VendorRatingLevel,
  VendorRatingScore,
  VendorRatingColor,
  VendorRatingIcon,
  VendorRatingCategory,
  vendorRatingGetTypeLabel,
  vendorRatingGetLevel,
  vendorRatingGetLevelLabel,
  vendorRatingGetColor,
  vendorRatingGetStars,
  vendorRatingGetCategory,
  vendorRatingIsPositive,
  vendorRatingIsNegative,
  vendorRatingGetAverageScore,
  // Vendor Review
  VENDOR_REVIEW,
  VendorReviewType,
  VendorReviewStatus,
  VendorReviewCategory,
  VendorReviewColor,
  VendorReviewIcon,
  VendorReviewHelpfulness,
  vendorReviewGetTypeLabel,
  vendorReviewGetStatusLabel,
  vendorReviewIsApproved,
  vendorReviewIsPending,
  vendorReviewIsVisible,
  vendorReviewGetCategory,
  vendorReviewGetCategoryLabel,
  vendorReviewIsPositive,
  vendorReviewIsNegative,
  vendorReviewGetHelpfulnessLabel,
  // Vendor Bank Account
  VENDOR_BANK_ACCOUNT,
  VendorBankAccountType,
  VendorBankAccountStatus,
  VendorBankAccountCurrency,
  VendorBankAccountVerificationMethod,
  vendorBankAccountGetTypeLabel,
  vendorBankAccountGetStatusLabel,
  vendorBankAccountGetCurrencyLabel,
  vendorBankAccountIsActive,
  vendorBankAccountIsVerified,
  vendorBankAccountCanTransact,
  vendorBankAccountGetVerificationMethodLabel,
  // Vendor Shipping
  VENDOR_SHIPPING,
  VendorShippingType,
  VendorShippingStatus,
  VendorShippingCarrier,
  VendorShippingMethod,
  VendorShippingZone,
  vendorShippingGetTypeLabel,
  vendorShippingGetStatusLabel,
  vendorShippingGetCarrierLabel,
  vendorShippingGetMethodLabel,
  vendorShippingIsDelivered,
  vendorShippingIsInTransit,
  vendorShippingIsFailed,
  // Vendor Return Policy
  VENDOR_RETURN_POLICY,
  VendorReturnPolicyType,
  VendorReturnPolicyStatus,
  VendorReturnReason,
  VendorReturnCondition,
  VendorReturnRestriction,
  vendorReturnPolicyGetTypeLabel,
  vendorReturnPolicyGetStatusLabel,
  vendorReturnPolicyGetReasonLabel,
  vendorReturnPolicyGetPeriodDays,
  vendorReturnPolicyIsActive,
  vendorReturnPolicyIsReturnable,
  vendorReturnPolicyGetFee,
  // Vendor Warranty
  VENDOR_WARRANTY,
  VendorWarrantyType,
  VendorWarrantyStatus,
  VendorWarrantyCoverage,
  VendorWarrantyCondition,
  VendorWarrantyExclusion,
  vendorWarrantyGetTypeLabel,
  vendorWarrantyGetStatusLabel,
  vendorWarrantyGetCoverageLabel,
  vendorWarrantyGetPeriodMonths,
  vendorWarrantyIsActive,
  vendorWarrantyIsValid,
  vendorWarrantyHasWarranty,
  vendorWarrantyGetExclusionLabel,
  // Vendor Support
  VENDOR_SUPPORT,
  VendorSupportType,
  VendorSupportStatus,
  VendorSupportPriority,
  VendorSupportChannel,
  VendorSupportCategory,
  vendorSupportGetTypeLabel,
  vendorSupportGetStatusLabel,
  vendorSupportGetPriorityLabel,
  vendorSupportGetChannelLabel,
  vendorSupportGetCategoryLabel,
  vendorSupportIsOpen,
  vendorSupportIsResolved,
  vendorSupportGetResponseTime,
  vendorSupportGetResolutionTime,
  // Vendor Notification
  VENDOR_NOTIFICATION,
  VendorNotificationType,
  VendorNotificationStatus,
  VendorNotificationPriority,
  VendorNotificationCategory,
  VendorNotificationEvent,
  VendorNotificationChannel,
  VendorNotificationTemplate,
  vendorNotificationGetTypeLabel,
  vendorNotificationGetStatusLabel,
  vendorNotificationGetPriorityLabel,
  vendorNotificationGetCategoryLabel,
  vendorNotificationGetEventLabel,
  vendorNotificationGetChannelLabel,
  vendorNotificationIsDelivered,
  vendorNotificationIsFailed,
  vendorNotificationGetTemplateLabel,
  // Vendor Feature
  VENDOR_FEATURE,
  VendorFeatureType,
  VendorFeatureStatus,
  VendorFeatureCategory,
  VendorFeatureAccessLevel,
  VendorFeatureFlag,
  vendorFeatureGetTypeLabel,
  vendorFeatureGetStatusLabel,
  vendorFeatureGetCategoryLabel,
  vendorFeatureGetAccessLevelLabel,
  vendorFeatureIsActive,
  vendorFeatureGetFlagLabel,
  // Vendor Permission
  VENDOR_PERMISSION_MODULES,
  VENDOR_PERMISSION_ACTIONS,
  VENDOR_PERMISSION_ROLES,
  VENDOR_PERMISSION_LEVELS,
  VENDOR_PERMISSION_DEFAULTS,
  VendorPermissionModule,
  VendorPermissionAction,
  VendorPermissionRole,
  VendorPermissionLevel,
  vendorPermissionGetModuleLabel,
  vendorPermissionGetActionLabel,
  vendorPermissionGetRoleLabel,
  vendorPermissionGetLevelLabel,
  vendorPermissionHasPermission,
  vendorPermissionGetRolePermissions,
  // Vendor Error
  VENDOR_ERROR,
  VendorErrorCode,
  VendorErrorCategory,
  VendorErrorSeverity,
  vendorErrorGetMessage,
  vendorErrorGetCategory,
  vendorErrorGetSeverity,
  vendorErrorIsRetryable,
  vendorErrorGetHttpStatus,
};
