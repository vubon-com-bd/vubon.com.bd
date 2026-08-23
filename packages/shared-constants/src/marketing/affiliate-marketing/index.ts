/**
 * Affiliate Marketing Constants Index
 * Export all affiliate marketing constants and types for easy importing
 */

// Affiliate Constants
export {
  MARKETINGAFFILIATE,
  marketingaffiliateGetTypeLabel,
  marketingaffiliateGetLevelLabel,
  marketingaffiliateGetTierLabel,
  marketingaffiliateGetSourceLabel,
  marketingaffiliateGetVerticalLabel,
  marketingaffiliateGetMetricLabel,
  marketingaffiliateGetDefaultCookieDuration,
  marketingaffiliateIsTopTier,
  marketingaffiliateIsBusinessType,
  marketingaffiliateIsIndividualType,
} from './affiliate.constants';

export type {
  MarketingAffiliateType,
  MarketingAffiliateLevel,
  MarketingAffiliateTier,
  MarketingAffiliateSource,
  MarketingAffiliateVertical,
  MarketingAffiliateMetric,
  MarketingAffiliateDefault,
  MarketingAffiliateLimit,
} from './affiliate.constants';

// Affiliate Status Constants
export {
  MARKETINGAFFILIATE_STATUS,
  marketingaffiliateGetStatusLabel,
  marketingaffiliateGetStatusColor,
  marketingaffiliateGetStatusCategory,
  marketingaffiliateIsActiveStatus,
  marketingaffiliateIsSuspendedStatus,
  marketingaffiliateIsTerminatedStatus,
  marketingaffiliateIsFraudStatus,
  marketingaffiliateCanTransition,
} from './affiliate-status.constants';

export type {
  MarketingAffiliateStatusType,
  MarketingAffiliateStatusColor,
  MarketingAffiliateStatusCategory,
  MarketingAffiliateStatusOrder,
  MarketingAffiliateStatusTransition,
} from './affiliate-status.constants';

// Affiliate Type Constants
export {
  MARKETINGAFFILIATE_TYPE,
  marketingaffiliateGetCategoryLabel,
  marketingaffiliateGetSubTypeLabel,
  marketingaffiliateGetSpecializationLabel,
  marketingaffiliateGetExperienceLevelLabel,
  marketingaffiliateGetVerificationStatusLabel,
  marketingaffiliateGetEngagementTypeLabel,
  marketingaffiliateIsIndividualCategory,
  marketingaffiliateIsBusinessCategory,
  marketingaffiliateIsVerified,
  marketingaffiliateIsPendingVerification,
} from './affiliate-type.constants';

export type {
  MarketingAffiliateCategory,
  MarketingAffiliateSubType,
  MarketingAffiliateSpecialization,
  MarketingAffiliateExperienceLevel,
  MarketingAffiliateVerificationStatus,
  MarketingAffiliateEngagementType,
} from './affiliate-type.constants';

// Affiliate Commission Constants
export {
  MARKETINGAFFILIATE_COMMISSION,
  marketingaffiliateGetCommissionTypeLabel,
  marketingaffiliateGetCommissionStructureLabel,
  marketingaffiliateGetCommissionCalculationLabel,
  marketingaffiliateGetCommissionTrackingLabel,
  marketingaffiliateGetAttributionWindowLabel,
  marketingaffiliateIsPercentageCommission,
  marketingaffiliateIsFixedCommission,
  marketingaffiliateIsTieredCommission,
  marketingaffiliateIsRecurringCommission,
  marketingaffiliateGetDefaultAttributionDays,
  marketingaffiliateGetDefaultMinimumEarnings,
  marketingaffiliateCalculateCommission,
} from './affiliate-commission.constants';

export type {
  MarketingAffiliateCommissionType,
  MarketingAffiliateCommissionStructure,
  MarketingAffiliateCommissionCalculation,
  MarketingAffiliateCommissionRate,
  MarketingAffiliateCommissionTracking,
  MarketingAffiliateAttributionWindow,
  MarketingAffiliateCommissionDefault,
  MarketingAffiliateCommissionLimit,
} from './affiliate-commission.constants';

// Affiliate Payout Constants
export {
  MARKETINGAFFILIATE_PAYOUT,
  marketingaffiliateGetPayoutMethodLabel,
  marketingaffiliateGetPayoutFrequencyLabel,
  marketingaffiliateGetPayoutCurrencySymbol,
  marketingaffiliateGetPayoutTypeLabel,
  marketingaffiliateGetPayoutFee,
  marketingaffiliateIsPayoutComplete,
  marketingaffiliateIsPayoutPending,
  marketingaffiliateIsPayoutFailed,
  marketingaffiliateGetDefaultPayoutMethod,
  marketingaffiliateGetMinimumPayout,
  marketingaffiliateCalculatePayoutAfterFee,
} from './affiliate-payout.constants';

export type {
  MarketingAffiliatePayoutMethod,
  MarketingAffiliatePayoutFrequency,
  MarketingAffiliatePayoutCurrency,
  MarketingAffiliatePayoutType,
  MarketingAffiliatePayoutThreshold,
  MarketingAffiliatePayoutFee,
  MarketingAffiliatePayoutLimit,
  MarketingAffiliatePayoutDefault,
} from './affiliate-payout.constants';

// Affiliate Payout Status Constants
export {
  MARKETINGAFFILIATE_PAYOUT_STATUS,
  marketingaffiliateGetPayoutStatusColor,
  marketingaffiliateGetPayoutStatusCategory,
  marketingaffiliateIsPayoutCompleted,
  marketingaffiliateIsPayoutInProgress,
  marketingaffiliateCanTransitionPayout,
} from './affiliate-payout-status.constants';

export type {
  MarketingAffiliatePayoutStatusColor,
  MarketingAffiliatePayoutStatusCategory,
  MarketingAffiliatePayoutStatusOrder,
  MarketingAffiliatePayoutStatusTransition,
} from './affiliate-payout-status.constants';

// Note: MarketingAffiliatePayoutStatusType is already exported from affiliate-payout.constants
// To avoid duplicate export, we don't re-export it here
