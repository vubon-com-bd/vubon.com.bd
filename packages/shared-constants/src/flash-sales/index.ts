/**
 * Flash Sales Constants Index
 * Export all flash sales constants and types for easy importing
 */

// Flash Sale Error Constants
export {
  FLASH_SALE_ERROR,
  flashsalesErrorGetMessage,
  flashsalesErrorGetHttpStatus,
  flashsalesErrorGetCategory,
  flashsalesErrorGetSeverity,
  flashsalesErrorGetRetryType,
  flashsalesErrorIsRetryable,
  flashsalesErrorIsCritical,
  flashsalesErrorIsClientError,
  flashsalesErrorIsServerError,
} from './flash-sale-error.constants';

export type {
  FlashSaleErrorCategory,
  FlashSaleErrorCode,
  FlashSaleErrorSeverity,
  FlashSaleErrorRetry,
} from './flash-sale-error.constants';

// Share Constants
export {
  FLASH_SALE_SHARE,
  flashsalesShareGetTypeLabel,
  flashsalesShareGetPlatformLabel,
  flashsalesShareGetCategoryLabel,
  flashsalesShareGetContentLabel,
  flashsalesShareGetVisibilityLabel,
  flashsalesShareGetAnalyticLabel,
  flashsalesShareIsValidType,
  flashsalesShareIsValidPlatform,
  flashsalesShareIsValidCategory,
  flashsalesShareIsValidContent,
  flashsalesShareIsSocialPlatform,
  flashsalesShareIsMessagingPlatform,
  flashsalesShareGetDefaultMaxSharesPerDay,
  flashsalesShareGetDefaultMaxSharesPerUser,
  flashsalesShareGetDefaultExpiryDays,
  flashsalesShareGetMaxSharesPerDay,
  flashsalesShareGetMaxSharesPerUser,
  flashsalesShareGetMaxMessageLength,
  flashsalesShareGetMaxImageSizeMB,
  flashsalesShareGetMaxVideoSizeMB,
} from './share/flash-sale-share.constants';

export type {
  FlashSaleShareType,
  FlashSaleSharePlatform,
  FlashSaleShareCategory,
  FlashSaleShareContent,
  FlashSaleShareVisibility,
  FlashSaleShareAnalytic,
} from './share/flash-sale-share.constants';

// Share Type Constants
export {
  FLASH_SALE_SHARE_TYPE,
  flashsalesShareTypeGetCategoryLabel,
  flashsalesShareTypeGetComplexityLabel,
  flashsalesShareTypeGetScopeLabel,
  flashsalesShareTypeGetFrequencyLabel,
  flashsalesShareTypeGetTriggerLabel,
  flashsalesShareTypeGetPriorityLabel,
  flashsalesShareTypeGetEngagementLabel,
  flashsalesShareTypeIsValidCategory,
  flashsalesShareTypeIsValidScope,
  flashsalesShareTypeIsValidTrigger,
  flashsalesShareTypeIsHighPriority,
  flashsalesShareTypeIsRecurring,
  flashsalesShareTypeIsViral,
} from './share/flash-sale-share-type.constants';

export type {
  FlashSaleShareTypeCategory,
  FlashSaleShareTypeComplexity,
  FlashSaleShareTypeScope,
  FlashSaleShareTypeFrequency,
  FlashSaleShareTypeTrigger,
  FlashSaleShareTypePriority,
  FlashSaleShareTypeEngagement,
} from './share/flash-sale-share-type.constants';

// Share Status Constants
export {
  FLASH_SALE_SHARE_STATUS,
  flashsalesShareStatusGetLabel,
  flashsalesShareStatusGetCategory,
  flashsalesShareStatusGetColor,
  flashsalesShareStatusGetPriority,
  flashsalesShareStatusIsActive,
  flashsalesShareStatusIsComplete,
  flashsalesShareStatusCanTransitionTo,
  flashsalesShareStatusGetAvailableTransitions,
  flashsalesShareStatusCanProcess,
  flashsalesShareStatusCanComplete,
  flashsalesShareStatusCanRetry,
  flashsalesShareStatusCanCancel,
  flashsalesShareStatusCanArchive,
  flashsalesShareStatusGetDeliveryStatusLabel,
  flashsalesShareStatusGetEngagementStatusLabel,
  flashsalesShareStatusIsValid,
  flashsalesShareStatusIsValidDeliveryStatus,
  flashsalesShareStatusIsValidEngagementStatus,
} from './share/flash-sale-share-status.constants';

export type {
  FlashSaleShareStatusType,
  FlashSaleShareStatusCategory,
  FlashSaleShareStatusColor,
  FlashSaleShareStatusPriority,
  FlashSaleShareDeliveryStatus,
  FlashSaleShareEngagementStatus,
} from './share/flash-sale-share-status.constants';

// Wishlist Constants
export {
  FLASH_SALE_WISHLIST,
  flashsalesWishlistGetTypeLabel,
  flashsalesWishlistGetCategoryLabel,
  flashsalesWishlistGetPriorityLabel,
  flashsalesWishlistGetStatusLabel,
  flashsalesWishlistGetSharingLabel,
  flashsalesWishlistGetAccessLabel,
  flashsalesWishlistIsValidType,
  flashsalesWishlistIsValidCategory,
  flashsalesWishlistIsValidPriority,
  flashsalesWishlistIsValidStatus,
  flashsalesWishlistIsActive,
  flashsalesWishlistIsShared,
  flashsalesWishlistIsCollaborative,
  flashsalesWishlistIsPublic,
  flashsalesWishlistIsPrivate,
  flashsalesWishlistGetDefaultMaxItems,
  flashsalesWishlistGetDefaultMaxSharedUsers,
  flashsalesWishlistGetDefaultMaxCollaborators,
  flashsalesWishlistGetMaxItems,
  flashsalesWishlistGetMaxSharedUsers,
  flashsalesWishlistGetMaxWishlistsPerUser,
  flashsalesWishlistGetMinNameLength,
  flashsalesWishlistGetMaxNameLength,
} from './wishlist/flash-sale-wishlist.constants';

export type {
  FlashSaleWishlistType,
  FlashSaleWishlistCategory,
  FlashSaleWishlistPriority,
  FlashSaleWishlistStatus,
  FlashSaleWishlistSharing,
  FlashSaleWishlistAccess,
} from './wishlist/flash-sale-wishlist.constants';

// Wishlist Status Constants
export {
  FLASH_SALE_WISHLIST_STATUS,
  flashsalesWishlistStatusGetLabel,
  flashsalesWishlistStatusGetCategory,
  flashsalesWishlistStatusGetColor,
  flashsalesWishlistStatusGetPriority,
  flashsalesWishlistStatusIsActive,
  flashsalesWishlistStatusIsApproved,
  flashsalesWishlistStatusIsTerminated,
  flashsalesWishlistStatusCanTransitionTo,
  flashsalesWishlistStatusGetAvailableTransitions,
  flashsalesWishlistStatusCanApprove,
  flashsalesWishlistStatusCanReject,
  flashsalesWishlistStatusCanActivate,
  flashsalesWishlistStatusCanPause,
  flashsalesWishlistStatusCanResume,
  flashsalesWishlistStatusCanArchive,
  flashsalesWishlistStatusCanDelete,
  flashsalesWishlistStatusGetItemStatusLabel,
  flashsalesWishlistStatusGetItemPriorityLabel,
  flashsalesWishlistStatusIsValid,
  flashsalesWishlistStatusIsValidItemStatus,
  flashsalesWishlistStatusIsValidItemPriority,
} from './wishlist/flash-sale-wishlist-status.constants';

export type {
  FlashSaleWishlistStatusType,
  FlashSaleWishlistStatusCategory,
  FlashSaleWishlistStatusColor,
  FlashSaleWishlistStatusPriority,
  FlashSaleWishlistItemStatus,
  FlashSaleWishlistItemPriority,
} from './wishlist/flash-sale-wishlist-status.constants';

// Voucher Constants
export {
  FLASH_SALE_VOUCHER,
  flashsalesVoucherGetTypeLabel,
  flashsalesVoucherGetCategoryLabel,
  flashsalesVoucherGetDenominationLabel,
  flashsalesVoucherGetValueTypeLabel,
  flashsalesVoucherGetRedemptionLabel,
  flashsalesVoucherGetExpiryLabel,
  flashsalesVoucherGetTransferLabel,
  flashsalesVoucherIsValidType,
  flashsalesVoucherIsValidCategory,
  flashsalesVoucherGetDefaultDenomination,
  flashsalesVoucherGetDefaultValidityDays,
  flashsalesVoucherGetDefaultCodeLength,
  flashsalesVoucherGetMaxValue,
  flashsalesVoucherGetMinValue,
  flashsalesVoucherGetMaxRedemptions,
  flashsalesVoucherGetMaxCodeLength,
  flashsalesVoucherGetMinCodeLength,
  flashsalesVoucherGetMaxBulkGeneration,
  flashsalesVoucherGenerateRandomCode,
} from './voucher/flash-sale-voucher.constants';

export type {
  FlashSaleVoucherType,
  FlashSaleVoucherCategory,
  FlashSaleVoucherDenomination,
  FlashSaleVoucherValueType,
  FlashSaleVoucherRedemption,
  FlashSaleVoucherExpiry,
  FlashSaleVoucherTransfer,
} from './voucher/flash-sale-voucher.constants';

// Voucher Type Constants
export {
  FLASH_SALE_VOUCHER_TYPE,
  flashsalesVoucherTypeGetCategoryLabel,
  flashsalesVoucherTypeGetComplexityLabel,
  flashsalesVoucherTypeGetScopeLabel,
  flashsalesVoucherTypeGetFrequencyLabel,
  flashsalesVoucherTypeGetTriggerLabel,
  flashsalesVoucherTypeGetUsageLabel,
  flashsalesVoucherTypeGetPriorityLabel,
  flashsalesVoucherTypeIsValidCategory,
  flashsalesVoucherTypeIsValidScope,
  flashsalesVoucherTypeIsValidTrigger,
  flashsalesVoucherTypeIsRecurring,
  flashsalesVoucherTypeIsOneTime,
  flashsalesVoucherTypeIsHighPriority,
} from './voucher/flash-sale-voucher-type.constants';

export type {
  FlashSaleVoucherTypeCategory,
  FlashSaleVoucherTypeComplexity,
  FlashSaleVoucherTypeScope,
  FlashSaleVoucherTypeFrequency,
  FlashSaleVoucherTypeTrigger,
  FlashSaleVoucherTypeUsage,
  FlashSaleVoucherTypePriority,
} from './voucher/flash-sale-voucher-type.constants';

// Voucher Status Constants
export {
  FLASH_SALE_VOUCHER_STATUS,
  flashsalesVoucherStatusGetLabel,
  flashsalesVoucherStatusGetCategory,
  flashsalesVoucherStatusGetColor,
  flashsalesVoucherStatusGetPriority,
  flashsalesVoucherStatusIsActive,
  flashsalesVoucherStatusIsAvailable,
  flashsalesVoucherStatusIsRedeemed,
  flashsalesVoucherStatusIsTerminated,
  flashsalesVoucherStatusCanTransitionTo,
  flashsalesVoucherStatusGetAvailableTransitions,
  flashsalesVoucherStatusCanApprove,
  flashsalesVoucherStatusCanReject,
  flashsalesVoucherStatusCanSchedule,
  flashsalesVoucherStatusCanActivate,
  flashsalesVoucherStatusCanPause,
  flashsalesVoucherStatusCanResume,
  flashsalesVoucherStatusCanRedeem,
  flashsalesVoucherStatusCanPartialRedeem,
  flashsalesVoucherStatusCanComplete,
  flashsalesVoucherStatusCanExpire,
  flashsalesVoucherStatusCanCancel,
  flashsalesVoucherStatusCanDelete,
  flashsalesVoucherStatusGetAvailabilityLabel,
  flashsalesVoucherStatusIsValid,
  flashsalesVoucherStatusIsValidAvailability,
} from './voucher/flash-sale-voucher-status.constants';

export type {
  FlashSaleVoucherStatusType,
  FlashSaleVoucherStatusCategory,
  FlashSaleVoucherStatusColor,
  FlashSaleVoucherStatusPriority,
  FlashSaleVoucherAvailability,
} from './voucher/flash-sale-voucher-status.constants';

// Coupon Constants
export {
  FLASH_SALE_COUPON,
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
} from './coupon/flash-sale-coupon.constants';

export type {
  FlashSaleCouponType,
  FlashSaleCouponCategory,
  FlashSaleCouponGeneration,
  FlashSaleCouponFormat,
  FlashSaleCouponApplication,
  FlashSaleCouponRestriction,
} from './coupon/flash-sale-coupon.constants';

// Coupon Type Constants
export {
  FLASH_SALE_COUPON_TYPE,
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
} from './coupon/flash-sale-coupon-type.constants';

export type {
  FlashSaleCouponTypeCategory,
  FlashSaleCouponTypeComplexity,
  FlashSaleCouponTypeScope,
  FlashSaleCouponTypeFrequency,
  FlashSaleCouponTypeTrigger,
  FlashSaleCouponTypePriority,
  FlashSaleCouponTypeStacking,
} from './coupon/flash-sale-coupon-type.constants';

// Coupon Status Constants
export {
  FLASH_SALE_COUPON_STATUS,
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
} from './coupon/flash-sale-coupon-status.constants';

export type {
  FlashSaleCouponStatusType,
  FlashSaleCouponStatusCategory,
  FlashSaleCouponStatusColor,
  FlashSaleCouponStatusPriority,
  FlashSaleCouponAvailability,
} from './coupon/flash-sale-coupon-status.constants';

// Inventory Constants
export {
  FLASH_SALE_INVENTORY,
  flashsalesInventoryGetTypeLabel,
  flashsalesInventoryGetCategoryLabel,
  flashsalesInventoryGetStatusLabel,
  flashsalesInventoryGetAllocationLabel,
  flashsalesInventoryGetTrackingLabel,
  flashsalesInventoryGetUnitLabel,
  flashsalesInventoryIsValidType,
  flashsalesInventoryIsValidCategory,
  flashsalesInventoryIsValidStatus,
  flashsalesInventoryIsAvailable,
  flashsalesInventoryIsSold,
  flashsalesInventoryIsReserved,
  flashsalesInventoryIsDamaged,
  flashsalesInventoryGetDefaultMaxQuantity,
  flashsalesInventoryGetDefaultReorderLevel,
  flashsalesInventoryGetDefaultSafetyStock,
  flashsalesInventoryGetMaxQuantity,
  flashsalesInventoryGetMaxReservations,
  flashsalesInventoryGetReservationTimeoutMinutes,
  flashsalesInventoryGetBufferPercentage,
} from './inventory/flash-sale-inventory.constants';

export type {
  FlashSaleInventoryType,
  FlashSaleInventoryCategory,
  FlashSaleInventoryStatus,
  FlashSaleInventoryAllocation,
  FlashSaleInventoryTracking,
  FlashSaleInventoryUnit,
} from './inventory/flash-sale-inventory.constants';

// Inventory Status Constants
export {
  FLASH_SALE_INVENTORY_STATUS,
  flashsalesInventoryStatusGetLabel,
  flashsalesInventoryStatusGetCategory,
  flashsalesInventoryStatusGetColor,
  flashsalesInventoryStatusGetPriority,
  flashsalesInventoryStatusIsActive,
  flashsalesInventoryStatusIsApproved,
  flashsalesInventoryStatusIsTerminated,
  flashsalesInventoryStatusCanTransitionTo,
  flashsalesInventoryStatusGetAvailableTransitions,
  flashsalesInventoryStatusCanApprove,
  flashsalesInventoryStatusCanReject,
  flashsalesInventoryStatusCanActivate,
  flashsalesInventoryStatusCanPause,
  flashsalesInventoryStatusCanResume,
  flashsalesInventoryStatusCanSoldOut,
  flashsalesInventoryStatusCanDiscontinue,
  flashsalesInventoryStatusCanDelete,
  flashsalesInventoryStatusGetAvailabilityLabel,
  flashsalesInventoryStatusGetStockLevelLabel,
  flashsalesInventoryStatusIsValid,
  flashsalesInventoryStatusIsValidAvailability,
  flashsalesInventoryStatusIsValidStockLevel,
} from './inventory/flash-sale-inventory-status.constants';

export type {
  FlashSaleInventoryStatusType,
  FlashSaleInventoryStatusCategory,
  FlashSaleInventoryStatusColor,
  FlashSaleInventoryStatusPriority,
  FlashSaleInventoryAvailability,
  FlashSaleInventoryStockLevel,
} from './inventory/flash-sale-inventory-status.constants';

// Notification Constants
export {
  FLASH_SALE_NOTIFICATION,
  flashsalesNotificationGetTypeLabel,
  flashsalesNotificationGetChannelLabel,
  flashsalesNotificationGetPriorityLabel,
  flashsalesNotificationGetTemplateLabel,
  flashsalesNotificationGetTimingLabel,
  flashsalesNotificationGetFrequencyLabel,
  flashsalesNotificationGetAudienceLabel,
  flashsalesNotificationIsValidType,
  flashsalesNotificationIsValidChannel,
  flashsalesNotificationIsValidPriority,
  flashsalesNotificationIsHighPriority,
  flashsalesNotificationIsLowPriority,
  flashsalesNotificationGetDefaultChannel,
  flashsalesNotificationGetDefaultPriority,
  flashsalesNotificationGetMaxRecipients,
  flashsalesNotificationGetMaxRetries,
  flashsalesNotificationGetMaxNotificationsPerDay,
  flashsalesNotificationGetMinSubjectLength,
  flashsalesNotificationGetMaxSubjectLength,
  flashsalesNotificationGetMinBodyLength,
  flashsalesNotificationGetMaxBodyLength,
} from './notification/flash-sale-notification.constants';

export type {
  FlashSaleNotificationType,
  FlashSaleNotificationChannel,
  FlashSaleNotificationPriority,
  FlashSaleNotificationTemplate,
  FlashSaleNotificationTiming,
  FlashSaleNotificationFrequency,
  FlashSaleNotificationAudience,
} from './notification/flash-sale-notification.constants';

// Notification Type Constants
export {
  FLASH_SALE_NOTIFICATION_TYPE,
  flashsalesNotificationTypeGetCategoryLabel,
  flashsalesNotificationTypeGetComplexityLabel,
  flashsalesNotificationTypeGetScopeLabel,
  flashsalesNotificationTypeGetDeliveryLabel,
  flashsalesNotificationTypeGetLanguageLabel,
  flashsalesNotificationTypeGetFormatLabel,
  flashsalesNotificationTypeGetActionLabel,
  flashsalesNotificationTypeIsValidCategory,
  flashsalesNotificationTypeIsValidScope,
  flashsalesNotificationTypeIsValidLanguage,
  flashsalesNotificationTypeIsValidFormat,
  flashsalesNotificationTypeIsUrgent,
  flashsalesNotificationTypeIsPromotional,
} from './notification/flash-sale-notification-type.constants';

export type {
  FlashSaleNotificationTypeCategory,
  FlashSaleNotificationTypeComplexity,
  FlashSaleNotificationTypeScope,
  FlashSaleNotificationTypeDelivery,
  FlashSaleNotificationTypeLanguage,
  FlashSaleNotificationTypeFormat,
  FlashSaleNotificationTypeAction,
} from './notification/flash-sale-notification-type.constants';

// Notification Status Constants
export {
  FLASH_SALE_NOTIFICATION_STATUS,
  flashsalesNotificationStatusGetLabel,
  flashsalesNotificationStatusGetCategory,
  flashsalesNotificationStatusGetColor,
  flashsalesNotificationStatusGetPriority,
  flashsalesNotificationStatusIsActive,
  flashsalesNotificationStatusIsDelivered,
  flashsalesNotificationStatusIsFailed,
  flashsalesNotificationStatusCanTransitionTo,
  flashsalesNotificationStatusGetAvailableTransitions,
  flashsalesNotificationStatusCanApprove,
  flashsalesNotificationStatusCanReject,
  flashsalesNotificationStatusCanSchedule,
  flashsalesNotificationStatusCanQueue,
  flashsalesNotificationStatusCanProcess,
  flashsalesNotificationStatusCanSend,
  flashsalesNotificationStatusCanRetry,
  flashsalesNotificationStatusCanCancel,
  flashsalesNotificationStatusCanArchive,
  flashsalesNotificationStatusGetDeliveryStatusLabel,
  flashsalesNotificationStatusIsValid,
  flashsalesNotificationStatusIsValidDeliveryStatus,
} from './notification/flash-sale-notification-status.constants';

export type {
  FlashSaleNotificationStatusType,
  FlashSaleNotificationStatusCategory,
  FlashSaleNotificationStatusColor,
  FlashSaleNotificationStatusPriority,
  FlashSaleNotificationDeliveryStatus,
} from './notification/flash-sale-notification-status.constants';

// Rule Constants
export {
  FLASH_SALE_RULE,
  flashsalesRuleGetTypeLabel,
  flashsalesRuleGetCategoryLabel,
  flashsalesRuleGetPriorityLabel,
  flashsalesRuleGetOperatorLabel,
  flashsalesRuleGetConditionLabel,
  flashsalesRuleGetActionLabel,
  flashsalesRuleGetEffectLabel,
  flashsalesRuleIsValidType,
  flashsalesRuleIsValidPriority,
  flashsalesRuleIsValidOperator,
  flashsalesRuleIsValidAction,
  flashsalesRuleIsHighPriority,
  flashsalesRuleIsLowPriority,
  flashsalesRuleGetDefaultPriority,
  flashsalesRuleGetDefaultOperator,
  flashsalesRuleGetDefaultCondition,
  flashsalesRuleGetMaxRules,
  flashsalesRuleGetMaxConditions,
  flashsalesRuleGetMaxActions,
  flashsalesRuleGetMaxNesting,
} from './rule/flash-sale-rule.constants';

export type {
  FlashSaleRuleType,
  FlashSaleRuleCategory,
  FlashSaleRulePriority,
  FlashSaleRuleOperator,
  FlashSaleRuleCondition,
  FlashSaleRuleAction,
  FlashSaleRuleEffect,
} from './rule/flash-sale-rule.constants';

// Rule Type Constants
export {
  FLASH_SALE_RULE_TYPE,
  flashsalesRuleTypeGetCategoryLabel,
  flashsalesRuleTypeGetComplexityLabel,
  flashsalesRuleTypeGetScopeLabel,
  flashsalesRuleTypeGetFrequencyLabel,
  flashsalesRuleTypeGetTriggerLabel,
  flashsalesRuleTypeGetExecutionLabel,
  flashsalesRuleTypeGetValidationLabel,
  flashsalesRuleTypeIsValidCategory,
  flashsalesRuleTypeIsValidScope,
  flashsalesRuleTypeIsValidTrigger,
  flashsalesRuleTypeIsComplex,
  flashsalesRuleTypeIsSimple,
} from './rule/flash-sale-rule-type.constants';

export type {
  FlashSaleRuleTypeCategory,
  FlashSaleRuleTypeComplexity,
  FlashSaleRuleTypeScope,
  FlashSaleRuleTypeFrequency,
  FlashSaleRuleTypeTrigger,
  FlashSaleRuleTypeExecution,
  FlashSaleRuleTypeValidation,
} from './rule/flash-sale-rule-type.constants';

// Rule Status Constants
export {
  FLASH_SALE_RULE_STATUS,
  flashsalesRuleStatusGetLabel,
  flashsalesRuleStatusGetCategory,
  flashsalesRuleStatusGetColor,
  flashsalesRuleStatusGetPriority,
  flashsalesRuleStatusIsActive,
  flashsalesRuleStatusIsApproved,
  flashsalesRuleStatusIsArchived,
  flashsalesRuleStatusCanTransitionTo,
  flashsalesRuleStatusGetAvailableTransitions,
  flashsalesRuleStatusCanApprove,
  flashsalesRuleStatusCanReject,
  flashsalesRuleStatusCanActivate,
  flashsalesRuleStatusCanPause,
  flashsalesRuleStatusCanResume,
  flashsalesRuleStatusCanDeprecate,
  flashsalesRuleStatusCanDelete,
  flashsalesRuleStatusIsValid,
} from './rule/flash-sale-rule-status.constants';

export type {
  FlashSaleRuleStatusType,
  FlashSaleRuleStatusCategory,
  FlashSaleRuleStatusColor,
  FlashSaleRuleStatusPriority,
} from './rule/flash-sale-rule-status.constants';

// Participant Constants
export {
  FLASH_SALE_PARTICIPANT,
  flashsalesParticipantGetTypeLabel,
  flashsalesParticipantGetCategoryLabel,
  flashsalesParticipantGetRoleLabel,
  flashsalesParticipantGetEngagementLabel,
  flashsalesParticipantGetActivityLabel,
  flashsalesParticipantGetParticipationLabel,
  flashsalesParticipantIsValidType,
  flashsalesParticipantIsValidCategory,
  flashsalesParticipantIsValidRole,
  flashsalesParticipantIsActive,
  flashsalesParticipantIsEngaged,
  flashsalesParticipantGetDefaultMaxParticipants,
  flashsalesParticipantGetDefaultMaxItems,
  flashsalesParticipantGetMaxParticipantsPerSale,
  flashsalesParticipantGetEngagementScore,
  flashsalesParticipantGetParticipationRank,
} from './participant/flash-sale-participant.constants';

export type {
  FlashSaleParticipantType,
  FlashSaleParticipantCategory,
  FlashSaleParticipantRole,
  FlashSaleParticipantEngagement,
  FlashSaleParticipantActivity,
  FlashSaleParticipantParticipation,
} from './participant/flash-sale-participant.constants';

// Participant Status Constants
export {
  FLASH_SALE_PARTICIPANT_STATUS,
  flashsalesParticipantStatusGetLabel,
  flashsalesParticipantStatusGetCategory,
  flashsalesParticipantStatusGetColor,
  flashsalesParticipantStatusGetPriority,
  flashsalesParticipantStatusIsActive,
  flashsalesParticipantStatusIsVerified,
  flashsalesParticipantStatusIsRestricted,
  flashsalesParticipantStatusIsComplete,
  flashsalesParticipantStatusCanTransitionTo,
  flashsalesParticipantStatusGetAvailableTransitions,
  flashsalesParticipantStatusCanVerify,
  flashsalesParticipantStatusCanApprove,
  flashsalesParticipantStatusCanActivate,
  flashsalesParticipantStatusCanEngage,
  flashsalesParticipantStatusCanPause,
  flashsalesParticipantStatusCanResume,
  flashsalesParticipantStatusCanBlock,
  flashsalesParticipantStatusCanSuspend,
  flashsalesParticipantStatusCanComplete,
  flashsalesParticipantStatusCanCancel,
  flashsalesParticipantStatusGetAccessLevel,
  flashsalesParticipantStatusIsValid,
} from './participant/flash-sale-participant-status.constants';

export type {
  FlashSaleParticipantStatusType,
  FlashSaleParticipantStatusCategory,
  FlashSaleParticipantStatusColor,
  FlashSaleParticipantStatusPriority,
  FlashSaleParticipantAccessLevel,
} from './participant/flash-sale-participant-status.constants';

// Schedule Constants
export {
  FLASH_SALE_SCHEDULE,
  flashsalesScheduleGetTypeLabel,
  flashsalesScheduleGetFrequencyLabel,
  flashsalesScheduleGetDayLabel,
  flashsalesScheduleGetWeekLabel,
  flashsalesScheduleGetMonthLabel,
  flashsalesScheduleGetTimezoneLabel,
  flashsalesScheduleGetCronExpression,
  flashsalesScheduleIsValidType,
  flashsalesScheduleIsValidFrequency,
  flashsalesScheduleGetDefaultTimezone,
  flashsalesScheduleGetMaxSchedulesPerDay,
  flashsalesScheduleGetMinDuration,
  flashsalesScheduleGetMaxDuration,
  flashsalesScheduleIsRecurring,
} from './schedule/flash-sale-schedule.constants';

export type {
  FlashSaleScheduleType,
  FlashSaleScheduleFrequency,
  FlashSaleScheduleDay,
  FlashSaleScheduleWeek,
  FlashSaleScheduleMonth,
  FlashSaleScheduleTimezone,
  FlashSaleScheduleTimeFormat,
  FlashSaleScheduleCronExpression,
} from './schedule/flash-sale-schedule.constants';

// Schedule Status Constants
export {
  FLASH_SALE_SCHEDULE_STATUS,
  flashsalesScheduleStatusGetLabel,
  flashsalesScheduleStatusGetCategory,
  flashsalesScheduleStatusGetColor,
  flashsalesScheduleStatusGetPriority,
  flashsalesScheduleStatusIsActive,
  flashsalesScheduleStatusIsApproved,
  flashsalesScheduleStatusIsComplete,
  flashsalesScheduleStatusCanTransitionTo,
  flashsalesScheduleStatusGetAvailableTransitions,
  flashsalesScheduleStatusCanApprove,
  flashsalesScheduleStatusCanReject,
  flashsalesScheduleStatusCanSchedule,
  flashsalesScheduleStatusCanExecute,
  flashsalesScheduleStatusCanPause,
  flashsalesScheduleStatusCanResume,
  flashsalesScheduleStatusCanCancel,
  flashsalesScheduleStatusIsValid,
} from './schedule/flash-sale-schedule-status.constants';

export type {
  FlashSaleScheduleStatusType,
  FlashSaleScheduleStatusCategory,
  FlashSaleScheduleStatusColor,
  FlashSaleScheduleStatusPriority,
} from './schedule/flash-sale-schedule-status.constants';

// Schedule Type Constants
export {
  FLASH_SALE_SCHEDULE_TYPE,
  flashsalesScheduleTypeGetCategoryLabel,
  flashsalesScheduleTypeGetComplexityLabel,
  flashsalesScheduleTypeGetScopeLabel,
  flashsalesScheduleTypeGetPriorityLabel,
  flashsalesScheduleTypeGetPatternLabel,
  flashsalesScheduleTypeGetIntervalLabel,
  flashsalesScheduleTypeGetExecutionLabel,
  flashsalesScheduleTypeIsValidCategory,
  flashsalesScheduleTypeIsValidPriority,
  flashsalesScheduleTypeIsValidInterval,
  flashsalesScheduleTypeGetIntervalMinutes,
} from './schedule/flash-sale-schedule-type.constants';

export type {
  FlashSaleScheduleTypeCategory,
  FlashSaleScheduleTypeComplexity,
  FlashSaleScheduleTypeScope,
  FlashSaleScheduleTypePriority,
  FlashSaleScheduleTypePattern,
  FlashSaleScheduleTypeInterval,
  FlashSaleScheduleTypeExecution,
} from './schedule/flash-sale-schedule-type.constants';

// Bundle Deal Constants
export {
  BUNDLE_DEAL,
  flashsalesBundleDealGetTypeLabel,
  flashsalesBundleDealGetCategoryLabel,
  flashsalesBundleDealGetCompositionLabel,
  flashsalesBundleDealGetPricingLabel,
  flashsalesBundleDealGetRuleLabel,
  flashsalesBundleDealIsValidType,
  flashsalesBundleDealIsValidCategory,
  flashsalesBundleDealGetDefaultMaxItems,
  flashsalesBundleDealGetDefaultMinItems,
  flashsalesBundleDealGetDefaultDiscount,
  flashsalesBundleDealGetMaxDiscount,
  flashsalesBundleDealGetMaxItemsLimit,
} from './bundle-deal/bundle-deal.constants';

export type {
  BundleDealType,
  BundleDealCategory,
  BundleDealComposition,
  BundleDealPricing,
  BundleDealRule,
} from './bundle-deal/bundle-deal.constants';

// Bundle Deal Type Constants
export {
  BUNDLE_DEAL_TYPE,
  flashsalesBundleDealTypeGetCategoryLabel,
  flashsalesBundleDealTypeGetComplexityLabel,
  flashsalesBundleDealTypeGetScopeLabel,
  flashsalesBundleDealTypeGetAudienceLabel,
  flashsalesBundleDealTypeGetFrequencyLabel,
  flashsalesBundleDealTypeGetTriggerLabel,
  flashsalesBundleDealTypeGetDurationLabel,
  flashsalesBundleDealTypeGetDurationHours,
  flashsalesBundleDealTypeIsValidCategory,
  flashsalesBundleDealTypeIsValidAudience,
} from './bundle-deal/bundle-deal-type.constants';

export type {
  BundleDealTypeCategory,
  BundleDealTypeComplexity,
  BundleDealTypeScope,
  BundleDealTypeAudience,
  BundleDealTypeFrequency,
  BundleDealTypeTrigger,
  BundleDealTypeDuration,
} from './bundle-deal/bundle-deal-type.constants';

// Bundle Deal Status Constants
export {
  BUNDLE_DEAL_STATUS,
  flashsalesBundleDealStatusGetLabel,
  flashsalesBundleDealStatusGetCategory,
  flashsalesBundleDealStatusGetColor,
  flashsalesBundleDealStatusGetPriority,
  flashsalesBundleDealStatusIsActive,
  flashsalesBundleDealStatusIsScheduled,
  flashsalesBundleDealStatusIsComplete,
  flashsalesBundleDealStatusCanTransitionTo,
  flashsalesBundleDealStatusGetAvailableTransitions,
  flashsalesBundleDealStatusCanStart,
  flashsalesBundleDealStatusCanPause,
  flashsalesBundleDealStatusCanResume,
  flashsalesBundleDealStatusCanEnd,
  flashsalesBundleDealStatusCanCancel,
  flashsalesBundleDealStatusIsValid,
} from './bundle-deal/bundle-deal-status.constants';

export type {
  BundleDealStatusType,
  BundleDealStatusCategory,
  BundleDealStatusColor,
  BundleDealStatusPriority,
} from './bundle-deal/bundle-deal-status.constants';

// Product Deal Constants
export {
  PRODUCT_DEAL,
  flashsalesProductDealGetTypeLabel,
  flashsalesProductDealGetCategoryLabel,
  flashsalesProductDealGetScopeLabel,
  flashsalesProductDealGetApplicationLabel,
  flashsalesProductDealGetConditionLabel,
  flashsalesProductDealIsValidType,
  flashsalesProductDealIsValidScope,
  flashsalesProductDealGetDefaultMaxDiscount,
  flashsalesProductDealGetDefaultMaxFixedAmount,
  flashsalesProductDealGetMaxProducts,
  flashsalesProductDealGetMaxVariants,
} from './product-deal/product-deal.constants';

export type {
  ProductDealType,
  ProductDealCategory,
  ProductDealScope,
  ProductDealApplication,
  ProductDealCondition,
} from './product-deal/product-deal.constants';

// Product Deal Status Constants
export {
  PRODUCT_DEAL_STATUS,
  flashsalesProductDealStatusGetLabel,
  flashsalesProductDealStatusGetCategory,
  flashsalesProductDealStatusGetColor,
  flashsalesProductDealStatusGetPriority,
  flashsalesProductDealStatusIsActive,
  flashsalesProductDealStatusIsScheduled,
  flashsalesProductDealStatusIsComplete,
  flashsalesProductDealStatusCanTransitionTo,
  flashsalesProductDealStatusGetAvailableTransitions,
  flashsalesProductDealStatusCanStart,
  flashsalesProductDealStatusCanPause,
  flashsalesProductDealStatusCanResume,
  flashsalesProductDealStatusCanEnd,
  flashsalesProductDealStatusCanCancel,
  flashsalesProductDealStatusIsValid,
} from './product-deal/product-deal-status.constants';

export type {
  ProductDealStatusType,
  ProductDealStatusCategory,
  ProductDealStatusColor,
  ProductDealStatusPriority,
} from './product-deal/product-deal-status.constants';

// Flash Sale Constants
export {
  FLASH_SALE,
  flashSaleGetTypeLabel,
  flashSaleGetStatusLabel,
  flashSaleGetPriorityLabel,
  flashSaleGetTimeframeLabel,
  flashSaleGetFrequencyLabel,
  flashSaleGetVisibilityLabel,
  flashSaleGetFeatureLabel,
  flashSaleGetConditionLabel,
  flashSaleIsValidType,
  flashSaleIsValidStatus,
  flashSaleIsValidPriority,
  flashSaleIsActive,
  flashSaleIsScheduled,
  flashSaleIsComplete,
  flashSaleGetTimeframeMinutes,
  flashSaleGetDefaultDuration,
  flashSaleGetMaxProducts,
  flashSaleGetMaxDiscount,
} from './flash-sale.constants';

export type {
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
} from './flash-sale.constants';

// Flash Sale Status Constants
export {
  FLASH_SALE_STATUS,
  flashSaleStatusGetLabel,
  flashSaleStatusGetCategory,
  flashSaleStatusGetColor,
  flashSaleStatusGetPriority,
  flashSaleStatusIsActive,
  flashSaleStatusIsScheduled,
  flashSaleStatusIsComplete,
  flashSaleStatusCanTransitionTo,
  flashSaleStatusGetAvailableTransitions,
  flashSaleStatusCanStart,
  flashSaleStatusCanPause,
  flashSaleStatusCanResume,
  flashSaleStatusCanEnd,
  flashSaleStatusCanCancel,
  flashSaleStatusIsValid,
} from './flash-sale-status.constants';

export type {
  FlashSaleStatusType,
  FlashSaleStatusCategory,
  FlashSaleStatusColor,
  FlashSaleStatusPriority,
} from './flash-sale-status.constants';

// Flash Sale Type Constants
export {
  FLASH_SALE_TYPE,
  flashSaleTypeGetCategoryLabel,
  flashSaleTypeGetComplexityLabel,
  flashSaleTypeGetScopeLabel,
  flashSaleTypeGetAudienceLabel,
  flashSaleTypeGetChannelLabel,
  flashSaleTypeGetTriggerLabel,
  flashSaleTypeGetEngagementLabel,
  flashSaleTypeGetPerformanceLabel,
  flashSaleTypeIsValidCategory,
  flashSaleTypeIsValidAudience,
} from './flash-sale-type.constants';

export type {
  FlashSaleTypeCategory,
  FlashSaleTypeComplexity,
  FlashSaleTypeScope,
  FlashSaleTypeAudience,
  FlashSaleTypeChannel,
  FlashSaleTypeTrigger,
  FlashSaleTypeEngagement,
  FlashSaleTypePerformance,
} from './flash-sale-type.constants';

// Flash Sale Priority Constants
export {
  FLASH_SALE_PRIORITY,
  flashSalePriorityGetLevelLabel,
  flashSalePriorityGetScore,
  flashSalePriorityGetColor,
  flashSalePriorityGetSLATarget,
  flashSalePriorityGetResourceAllocation,
  flashSalePriorityGetWeight,
  flashSalePriorityGetEscalation,
  flashSalePriorityIsUrgent,
  flashSalePriorityIsHigh,
  flashSalePriorityIsLow,
  flashSalePriorityIsValid,
  flashSalePriorityGetPriorityFromScore,
} from './flash-sale-priority.constants';

export type {
  FlashSalePriorityLevel,
  FlashSalePriorityScore,
  FlashSalePriorityColor,
  FlashSalePrioritySLATarget,
  FlashSalePriorityResourceAllocation,
  FlashSalePriorityWeight,
  FlashSalePriorityEscalation,
} from './flash-sale-priority.constants';

// Deal Constants
export {
  DEAL,
  flashsalesDealGetTypeLabel,
  flashsalesDealGetCategoryLabel,
  flashsalesDealGetChannelLabel,
  flashsalesDealIsValidType,
  flashsalesDealIsValidCategory,
  flashsalesDealGetDefaultMaxUses,
  flashsalesDealGetDefaultMaxUsesPerUser,
  flashsalesDealGetMaxDiscountPercentage,
  flashsalesDealGetMaxFixedAmount,
} from './deal/deal.constants';

export type { DealType, DealCategory, DealChannel } from './deal/deal.constants';

// Deal Type Constants
export {
  DEAL_TYPE,
  flashsalesDealTypeGetCategoryLabel,
  flashsalesDealTypeGetComplexityLabel,
  flashsalesDealTypeGetScopeLabel,
  flashsalesDealTypeGetFrequencyLabel,
  flashsalesDealTypeGetTriggerLabel,
  flashsalesDealTypeGetDurationLabel,
  flashsalesDealTypeGetDurationHours,
  flashsalesDealTypeIsValidCategory,
  flashsalesDealTypeIsValidScope,
} from './deal/deal-type.constants';

export type {
  DealTypeCategory,
  DealTypeComplexity,
  DealTypeScope,
  DealTypeFrequency,
  DealTypeTrigger,
  DealTypeDuration,
} from './deal/deal-type.constants';

// Deal Status Constants
export {
  DEAL_STATUS,
  flashsalesDealStatusGetLabel,
  flashsalesDealStatusGetCategory,
  flashsalesDealStatusGetColor,
  flashsalesDealStatusGetPriority,
  flashsalesDealStatusIsActive,
  flashsalesDealStatusIsScheduled,
  flashsalesDealStatusIsComplete,
  flashsalesDealStatusCanTransitionTo,
  flashsalesDealStatusGetAvailableTransitions,
  flashsalesDealStatusIsValid,
} from './deal/deal-status.constants';

export type {
  DealStatusType,
  DealStatusCategory,
  DealStatusColor,
  DealStatusPriority,
} from './deal/deal-status.constants';

// Deal Priority Constants
export {
  DEAL_PRIORITY,
  flashsalesDealPriorityGetLevelLabel,
  flashsalesDealPriorityGetScore,
  flashsalesDealPriorityGetColor,
  flashsalesDealPriorityGetSLATarget,
  flashsalesDealPriorityGetResourceAllocation,
  flashsalesDealPriorityGetWeight,
  flashsalesDealPriorityIsUrgent,
  flashsalesDealPriorityIsHigh,
  flashsalesDealPriorityIsLow,
  flashsalesDealPriorityIsValid,
  flashsalesDealPriorityGetPriorityFromScore,
} from './deal/deal-priority.constants';

export type {
  DealPriorityLevel,
  DealPriorityScore,
  DealPriorityColor,
  DealPrioritySLATarget,
  DealPriorityResourceAllocation,
  DealPriorityWeight,
} from './deal/deal-priority.constants';

// Deal Discount Type Constants
export {
  DEAL_DISCOUNT_TYPE,
  flashsalesDealDiscountTypeGetTypeLabel,
  flashsalesDealDiscountTypeGetCalculationLabel,
  flashsalesDealDiscountTypeGetApplicationLabel,
  flashsalesDealDiscountTypeGetTierTypeLabel,
  flashsalesDealDiscountTypeIsValidType,
  flashsalesDealDiscountTypeIsValidApplication,
} from './deal/deal-discount-type.constants';

export type {
  DealDiscountTypeType,
  DealDiscountCalculation,
  DealDiscountApplication,
  DealDiscountTierType,
} from './deal/deal-discount-type.constants';

// Deal Restriction Constants
export {
  DEAL_RESTRICTION,
  flashsalesDealRestrictionGetTypeLabel,
  flashsalesDealRestrictionGetConditionLabel,
  flashsalesDealRestrictionGetOperatorLabel,
  flashsalesDealRestrictionGetValidationLabel,
  flashsalesDealRestrictionIsValidType,
  flashsalesDealRestrictionIsValidOperator,
} from './deal/deal-restriction.constants';

export type {
  DealRestrictionType,
  DealRestrictionCondition,
  DealRestrictionOperator,
  DealRestrictionValidation,
} from './deal/deal-restriction.constants';

// Deal Target Constants
export {
  DEAL_TARGET,
  flashsalesDealTargetGetTypeLabel,
  flashsalesDealTargetGetSegmentLabel,
  flashsalesDealTargetGetCriteriaLabel,
  flashsalesDealTargetGetPriorityLabel,
  flashsalesDealTargetIsValidType,
  flashsalesDealTargetIsValidSegment,
  flashsalesDealTargetIsHighValue,
  flashsalesDealTargetIsNewCustomer,
} from './deal/deal-target.constants';

export type {
  DealTargetType,
  DealTargetSegment,
  DealTargetCriteria,
  DealTargetPriority,
} from './deal/deal-target.constants';
