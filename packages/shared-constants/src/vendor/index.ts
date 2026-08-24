/**
 * Vendor Constants Index
 * Export all vendor constants and types for easy importing
 */

// Vendor Notification Constants
export {
  VENDOR_NOTIFICATION,
  vendorNotificationGetTypeLabel,
  vendorNotificationGetStatusLabel,
  vendorNotificationGetPriorityLabel,
  vendorNotificationGetCategoryLabel,
  vendorNotificationGetEventLabel,
  vendorNotificationGetChannelLabel,
  vendorNotificationIsDelivered,
  vendorNotificationIsFailed,
  vendorNotificationGetTemplateLabel,
} from './vendor-notification.constants';

export type {
  VendorNotificationType,
  VendorNotificationStatus,
  VendorNotificationPriority,
  VendorNotificationCategory,
  VendorNotificationEvent,
  VendorNotificationChannel,
  VendorNotificationTemplate,
} from './vendor-notification.constants';

// Vendor Feature Constants
export {
  VENDOR_FEATURE,
  vendorFeatureGetTypeLabel,
  vendorFeatureGetStatusLabel,
  vendorFeatureGetCategoryLabel,
  vendorFeatureGetAccessLevelLabel,
  vendorFeatureIsActive,
  vendorFeatureGetFlagLabel,
} from './vendor-feature.constants';

export type {
  VendorFeatureType,
  VendorFeatureStatus,
  VendorFeatureCategory,
  VendorFeatureAccessLevel,
  VendorFeatureFlag,
} from './vendor-feature.constants';

// Vendor Permission Constants
export {
  VENDOR_PERMISSION_MODULES,
  VENDOR_PERMISSION_ACTIONS,
  VENDOR_PERMISSION_ROLES,
  VENDOR_PERMISSION_LEVELS,
  VENDOR_PERMISSION_DEFAULTS,
  vendorPermissionGetModuleLabel,
  vendorPermissionGetActionLabel,
  vendorPermissionGetRoleLabel,
  vendorPermissionGetLevelLabel,
  vendorPermissionHasPermission,
  vendorPermissionGetRolePermissions,
} from './vendor-permission.constants';

export type {
  VendorPermissionModule,
  VendorPermissionAction,
  VendorPermissionRole,
  VendorPermissionLevel,
} from './vendor-permission.constants';

// Vendor Error Constants
export {
  VENDOR_ERROR,
  vendorErrorGetMessage,
  vendorErrorGetCategory,
  vendorErrorGetSeverity,
  vendorErrorIsRetryable,
  vendorErrorGetHttpStatus,
} from './vendor-error.constants';

export type {
  VendorErrorCode,
  VendorErrorCategory,
  VendorErrorSeverity,
} from './vendor-error.constants';

// Vendor Constants
export {
  VENDOR,
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
} from './vendor.constants';

export type {
  VendorType,
  VendorStatus,
  VendorTier,
  VendorVerification,
  VendorApproval,
  VendorSuspension,
  VendorCommission,
} from './vendor.constants';

// Vendor Status Constants
export {
  VENDOR_STATUS,
  vendorStatusGetLabel,
  vendorStatusIsActive,
  vendorStatusIsRestricted,
  vendorStatusIsActiveOrInactive,
  vendorStatusGetCategory,
  vendorStatusCanTransition,
} from './vendor-status.constants';

export type {
  VendorStatusType,
  VendorStatusCategory,
  VendorStatusColor,
  VendorStatusIcon,
  VendorStatusTransition,
} from './vendor-status.constants';

// Vendor Type Constants
export {
  VENDOR_TYPE_TYPES,
  VENDOR_TYPE_CATEGORIES,
  VENDOR_TYPE_COLORS,
  VENDOR_TYPE_ICONS,
  VENDOR_TYPE_REQUIREMENTS,
  VENDOR_TYPE_BENEFITS,
  vendorTypeGetLabel,
  vendorTypeGetCategory,
  vendorTypeGetColor,
  vendorTypeGetIcon,
  vendorTypeGetRequirements,
} from './vendor-type.constants';

export type {
  VendorTypeType,
  VendorTypeCategory,
  VendorTypeColor,
  VendorTypeIcon,
} from './vendor-type.constants';

// Vendor Tier Constants
export {
  VENDOR_TIER_TYPES,
  VENDOR_TIER_LEVELS,
  VENDOR_TIER_REQUIREMENTS,
  VENDOR_TIER_COLORS,
  VENDOR_TIER_ICONS,
  VENDOR_TIER_BENEFITS,
  vendorTierGetLabel,
  vendorTierGetLevel,
  vendorTierGetColor,
  vendorTierGetIcon,
  vendorTierGetRequirements,
  vendorTierGetBenefits,
  vendorTierGetCommissionRate,
} from './vendor-tier.constants';

export type {
  VendorTierType,
  VendorTierLevel,
  VendorTierRequirements,
  VendorTierColor,
  VendorTierIcon,
} from './vendor-tier.constants';

// Vendor Verification Constants
export {
  VENDOR_VERIFICATION,
  vendorVerificationGetLabel,
  vendorVerificationIsVerified,
  vendorVerificationIsPending,
  vendorVerificationIsFailed,
  vendorVerificationGetCategory,
  vendorVerificationGetDocumentLabel,
  vendorVerificationGetStepLabel,
} from './vendor-verification.constants';

export type {
  VendorVerificationType,
  VendorVerificationCategory,
  VendorVerificationColor,
  VendorVerificationIcon,
  VendorVerificationDocument,
  VendorVerificationStep,
} from './vendor-verification.constants';

// Vendor Approval Constants
export {
  VENDOR_APPROVAL,
  vendorApprovalGetLabel,
  vendorApprovalIsApproved,
  vendorApprovalIsPending,
  vendorApprovalIsRejected,
  vendorApprovalGetCategory,
  vendorApprovalGetReasonLabel,
  vendorApprovalGetActionLabel,
} from './vendor-approval.constants';

export type {
  VendorApprovalType,
  VendorApprovalCategory,
  VendorApprovalColor,
  VendorApprovalIcon,
  VendorApprovalReason,
  VendorApprovalAction,
} from './vendor-approval.constants';

// Vendor Suspension Constants
export {
  VENDOR_SUSPENSION,
  vendorSuspensionGetLabel,
  vendorSuspensionIsActive,
  vendorSuspensionIsPending,
  vendorSuspensionIsPermanent,
  vendorSuspensionGetCategory,
  vendorSuspensionGetReasonLabel,
  vendorSuspensionGetDuration,
} from './vendor-suspension.constants';

export type {
  VendorSuspensionType,
  VendorSuspensionCategory,
  VendorSuspensionColor,
  VendorSuspensionIcon,
  VendorSuspensionReason,
} from './vendor-suspension.constants';

// Vendor Commission Constants
export {
  VENDOR_COMMISSION,
  vendorCommissionGetTypeLabel,
  vendorCommissionGetCategoryLabel,
  vendorCommissionGetStatusLabel,
  vendorCommissionGetColor,
  vendorCommissionGetRateForAmount,
  vendorCommissionCalculate,
  vendorCommissionIsActive,
  vendorCommissionGetPeriodLabel,
} from './vendor-commission.constants';

export type {
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionColor,
  VendorCommissionTier,
  VendorCommissionPeriod,
} from './vendor-commission.constants';

// Vendor Settlement Constants
export {
  VENDOR_SETTLEMENT,
  vendorSettlementGetTypeLabel,
  vendorSettlementGetStatusLabel,
  vendorSettlementGetMethodLabel,
  vendorSettlementGetFrequencyLabel,
  vendorSettlementIsCompleted,
  vendorSettlementIsPending,
  vendorSettlementIsFailed,
  vendorSettlementGetPeriodLabel,
} from './vendor-settlement.constants';

export type {
  VendorSettlementType,
  VendorSettlementStatus,
  VendorSettlementMethod,
  VendorSettlementFrequency,
  VendorSettlementPeriod,
} from './vendor-settlement.constants';

// Vendor Performance Constants
export {
  VENDOR_PERFORMANCE,
  vendorPerformanceGetMetricLabel,
  vendorPerformanceGetStatusLabel,
  vendorPerformanceGetColor,
  vendorPerformanceGetStatusFromScore,
  vendorPerformanceGetPeriodLabel,
  vendorPerformanceGetMetricWeight,
  vendorPerformanceIsGood,
  vendorPerformanceIsPoor,
} from './vendor-performance.constants';

export type {
  VendorPerformanceMetric,
  VendorPerformanceStatus,
  VendorPerformancePeriod,
  VendorPerformanceScore,
  VendorPerformanceColor,
  VendorPerformanceIcon,
} from './vendor-performance.constants';

// Vendor Rating Constants
export {
  VENDOR_RATING,
  vendorRatingGetTypeLabel,
  vendorRatingGetLevel,
  vendorRatingGetLevelLabel,
  vendorRatingGetColor,
  vendorRatingGetStars,
  vendorRatingGetCategory,
  vendorRatingIsPositive,
  vendorRatingIsNegative,
  vendorRatingGetAverageScore,
} from './vendor-rating.constants';

export type {
  VendorRatingType,
  VendorRatingLevel,
  VendorRatingScore,
  VendorRatingColor,
  VendorRatingIcon,
  VendorRatingCategory,
} from './vendor-rating.constants';

// Vendor Review Constants
export {
  VENDOR_REVIEW,
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
} from './vendor-review.constants';

export type {
  VendorReviewType,
  VendorReviewStatus,
  VendorReviewCategory,
  VendorReviewColor,
  VendorReviewIcon,
  VendorReviewHelpfulness,
} from './vendor-review.constants';

// Vendor Bank Account Constants
export {
  VENDOR_BANK_ACCOUNT,
  vendorBankAccountGetTypeLabel,
  vendorBankAccountGetStatusLabel,
  vendorBankAccountGetCurrencyLabel,
  vendorBankAccountIsActive,
  vendorBankAccountIsVerified,
  vendorBankAccountCanTransact,
  vendorBankAccountGetVerificationMethodLabel,
} from './vendor-bank-account.constants';

export type {
  VendorBankAccountType,
  VendorBankAccountStatus,
  VendorBankAccountCurrency,
  VendorBankAccountVerificationMethod,
} from './vendor-bank-account.constants';

// Vendor Shipping Constants
export {
  VENDOR_SHIPPING,
  vendorShippingGetTypeLabel,
  vendorShippingGetStatusLabel,
  vendorShippingGetCarrierLabel,
  vendorShippingGetMethodLabel,
  vendorShippingGetZoneLabel,
  vendorShippingIsDelivered,
  vendorShippingIsInTransit,
  vendorShippingIsFailed,
  vendorShippingGetCarrierCost,
  vendorShippingGetExpressCost,
  vendorShippingGetOvernightCost,
  vendorShippingGetSameDayCost,
  vendorShippingGetDeliveryTime,
  vendorShippingGetCODCost,
  vendorShippingIsFree,
  vendorShippingGetCheapestCarrier,
} from './vendor-shipping.constants';

export type {
  VendorShippingType,
  VendorShippingStatus,
  VendorShippingCarrier,
  VendorShippingMethod,
  VendorShippingZone,
} from './vendor-shipping.constants';

// Vendor Return Policy Constants
export {
  VENDOR_RETURN_POLICY,
  vendorReturnPolicyGetTypeLabel,
  vendorReturnPolicyGetStatusLabel,
  vendorReturnPolicyGetReasonLabel,
  vendorReturnPolicyGetPeriodDays,
  vendorReturnPolicyIsActive,
  vendorReturnPolicyIsReturnable,
  vendorReturnPolicyGetFee,
} from './vendor-return-policy.constants';

export type {
  VendorReturnPolicyType,
  VendorReturnPolicyStatus,
  VendorReturnReason,
  VendorReturnCondition,
  VendorReturnRestriction,
} from './vendor-return-policy.constants';

// Vendor Warranty Constants
export {
  VENDOR_WARRANTY,
  vendorWarrantyGetTypeLabel,
  vendorWarrantyGetStatusLabel,
  vendorWarrantyGetCoverageLabel,
  vendorWarrantyGetPeriodMonths,
  vendorWarrantyIsActive,
  vendorWarrantyIsValid,
  vendorWarrantyHasWarranty,
  vendorWarrantyGetExclusionLabel,
} from './vendor-warranty.constants';

export type {
  VendorWarrantyType,
  VendorWarrantyStatus,
  VendorWarrantyCoverage,
  VendorWarrantyCondition,
  VendorWarrantyExclusion,
} from './vendor-warranty.constants';

// Vendor Support Constants
export {
  VENDOR_SUPPORT,
  vendorSupportGetTypeLabel,
  vendorSupportGetStatusLabel,
  vendorSupportGetPriorityLabel,
  vendorSupportGetChannelLabel,
  vendorSupportGetCategoryLabel,
  vendorSupportIsOpen,
  vendorSupportIsResolved,
  vendorSupportGetResponseTime,
  vendorSupportGetResolutionTime,
} from './vendor-support.constants';

export type {
  VendorSupportType,
  VendorSupportStatus,
  VendorSupportPriority,
  VendorSupportChannel,
  VendorSupportCategory,
} from './vendor-support.constants';

// Vendor Document Constants
export * from './vendor-document';

// Vendor Payout Constants
export * from './vendor-payout';

// Vendor Subscription Constants
export * from './vendor-subscription';

// Vendor Ticket Constants
export * from './vendor-ticket';

// Vendor Invoice Constants
export * from './vendor-invoice';

// Vendor Team Constants
export * from './vendor-team';

// Vendor Activity Constants
export * from './vendor-activity';
