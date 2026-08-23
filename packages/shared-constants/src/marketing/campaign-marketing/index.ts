/**
 * Campaign Marketing Constants Index
 * Export all campaign marketing constants and types for easy importing
 */

// Campaign Constants
export {
  MARKETINGCAMPAIGN,
  marketingcampaignGetObjectiveLabel,
  marketingcampaignGetScopeLabel,
  marketingcampaignGetPhaseLabel,
  marketingcampaignGetPriorityLabel,
  marketingcampaignGetRiskLevelLabel,
  marketingcampaignGetSeasonLabel,
  marketingcampaignGetUrgencyLabel,
  marketingcampaignIsValidObjective,
  marketingcampaignIsValidPriority,
  marketingcampaignGetDefaultDuration,
  marketingcampaignGetDefaultBudget,
  marketingcampaignGetDefaultPriority,
  marketingcampaignIsHighPriority,
  marketingcampaignIsUrgent,
  marketingcampaignIsHighRisk,
} from './campaign.constants';

export type {
  MarketingCampaignObjective,
  MarketingCampaignScope,
  MarketingCampaignPhase,
  MarketingCampaignPriority,
  MarketingCampaignRiskLevel,
  MarketingCampaignSeason,
  MarketingCampaignUrgency,
  MarketingCampaignDefault,
  MarketingCampaignLimit,
} from './campaign.constants';

// Campaign Type Constants
export {
  MARKETINGCAMPAIGN_TYPE,
  marketingcampaignGetTypeLabel,
  marketingcampaignGetSubTypeLabel,
  marketingcampaignGetCategoryLabel,
  marketingcampaignGetFocusAreaLabel,
  marketingcampaignGetComplexityLabel,
  marketingcampaignGetScaleLabel,
  marketingcampaignIsAcquisitionType,
  marketingcampaignIsRetentionType,
  marketingcampaignIsBrandingType,
} from './campaign-type.constants';

export type {
  MarketingCampaignTypeType,
  MarketingCampaignSubType,
  MarketingCampaignCategory,
  MarketingCampaignFocusArea,
  MarketingCampaignComplexity,
  MarketingCampaignScale,
} from './campaign-type.constants';

// Campaign Status Constants
export {
  MARKETINGCAMPAIGN_STATUS,
  marketingcampaignGetStatusLabel,
  marketingcampaignGetStatusCategory,
  marketingcampaignGetStatusColor,
  marketingcampaignGetStatusPriority,
  marketingcampaignIsActiveStatus,
  marketingcampaignIsPausedStatus,
  marketingcampaignIsCompletedStatus,
  marketingcampaignIsEditableStatus,
  marketingcampaignCanTransition,
} from './campaign-status.constants';

export type {
  MarketingCampaignStatusType,
  MarketingCampaignStatusCategory,
  MarketingCampaignStatusColor,
  MarketingCampaignStatusTransition,
  MarketingCampaignStatusPriority,
} from './campaign-status.constants';

// Campaign Channel Constants
export {
  MARKETINGCAMPAIGN_CHANNEL,
  marketingcampaignGetChannelLabel,
  marketingcampaignGetChannelCategory,
  marketingcampaignGetChannelCost,
  marketingcampaignGetChannelEffectiveness,
  marketingcampaignGetChannelReach,
  marketingcampaignIsDigitalChannel,
  marketingcampaignIsSocialChannel,
  marketingcampaignGetChannelScore,
} from './campaign-channel.constants';

export type {
  MarketingCampaignChannel,
  MarketingCampaignChannelCategory,
  MarketingCampaignChannelCost,
  MarketingCampaignChannelEffectiveness,
  MarketingCampaignChannelReach,
} from './campaign-channel.constants';

// Campaign Budget Constants
export {
  MARKETINGCAMPAIGN_BUDGET,
  marketingcampaignGetBudgetTypeLabel,
  marketingcampaignGetAllocationMethodLabel,
  marketingcampaignGetBudgetStatusLabel,
  marketingcampaignGetBudgetPeriodLabel,
  marketingcampaignGetCurrencySymbol,
  marketingcampaignIsBudgetExhausted,
  marketingcampaignIsBudgetActive,
  marketingcampaignCalculateDailyBudget,
  marketingcampaignCalculateRemainingBudget,
  marketingcampaignGetBudgetUtilization,
  marketingcampaignIsWithinBudget,
  marketingcampaignGetDefaultBudgetType,
  marketingcampaignGetDefaultCurrency,
} from './campaign-budget.constants';

export type {
  MarketingCampaignBudgetType,
  MarketingCampaignAllocationMethod,
  MarketingCampaignBudgetStatus,
  MarketingCampaignBudgetPeriod,
  MarketingCampaignCurrency,
  MarketingCampaignBudgetLimit,
  MarketingCampaignBudgetDefault,
} from './campaign-budget.constants';

// Campaign Target Constants
export {
  MARKETINGCAMPAIGN_TARGET,
  marketingcampaignGetAudienceLabel,
  marketingcampaignGetDemographicLabel,
  marketingcampaignGetGeographyLabel,
  marketingcampaignGetBehaviorLabel,
  marketingcampaignGetPsychographicLabel,
  marketingcampaignGetDeviceLabel,
  marketingcampaignGetOSLabel,
  marketingcampaignGetExclusionLabel,
  marketingcampaignGetDefaultAudience,
  marketingcampaignGetMaxTargetGroups,
  marketingcampaignGetDefaultRadius,
  marketingcampaignIsValueSegment,
  marketingcampaignIsBehaviorSegment,
} from './campaign-target.constants';

export type {
  MarketingCampaignTargetAudience,
  MarketingCampaignDemographic,
  MarketingCampaignGeography,
  MarketingCampaignBehavior,
  MarketingCampaignPsychographic,
  MarketingCampaignDevice,
  MarketingCampaignOS,
  MarketingCampaignExclusion,
  MarketingCampaignTargetDefault,
} from './campaign-target.constants';
