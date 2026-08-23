/**
 * Lead Generation Marketing Constants Index
 * Export all lead generation marketing constants and types for easy importing
 */

// Lead Generation Constants
export {
  MARKETINGLEAD,
  marketingleadGetTypeLabel,
  marketingleadGetChannelLabel,
  marketingleadGetMethodLabel,
  marketingleadGetScoreLabel,
  marketingleadGetDefaultScore,
  marketingleadGetDefaultConversionRate,
  marketingleadGetQualificationThreshold,
  marketingleadIsInbound,
  marketingleadIsOutbound,
  marketingleadIsQualified,
  marketingleadIsHot,
  marketingleadIsWarm,
  marketingleadIsCold,
} from './lead-generation.constants';

export type {
  MarketingLeadType,
  MarketingLeadCategory,
  MarketingLeadChannel,
  MarketingLeadMethod,
  MarketingLeadScore,
  MarketingLeadConversionRate,
  MarketingLeadDefault,
  MarketingLeadLimit,
} from './lead-generation.constants';

// Lead Generation Status Constants
export {
  MARKETINGLEAD_STATUS as MARKETINGLEAD_GEN_STATUS,
  marketingleadGetStatusLabel as marketingleadGenGetStatusLabel,
  marketingleadGetStatusColor as marketingleadGenGetStatusColor,
  marketingleadGetStatusCategory as marketingleadGenGetStatusCategory,
  marketingleadIsActive as marketingleadGenIsActive,
  marketingleadIsPending as marketingleadGenIsPending,
  marketingleadIsCompleted as marketingleadGenIsCompleted,
  marketingleadCanTransition as marketingleadGenCanTransition,
} from './lead-generation-status.constants';

export type {
  MarketingLeadStatusType as MarketingLeadGenStatusType,
  MarketingLeadStatusColor as MarketingLeadGenStatusColor,
  MarketingLeadStatusCategory as MarketingLeadGenStatusCategory,
  MarketingLeadStatusOrder as MarketingLeadGenStatusOrder,
  MarketingLeadStatusTransition as MarketingLeadGenStatusTransition,
} from './lead-generation-status.constants';

// Lead Generation Type Constants
export {
  MARKETINGLEAD_TYPE,
  marketingleadGetCategoryLabel as marketingleadTypeGetCategoryLabel,
  marketingleadGetSubTypeLabel,
  marketingleadGetStrategyLabel,
  marketingleadGetFunnelStageLabel,
  marketingleadGetChannelLabel as marketingleadTypeGetChannelLabel,
  marketingleadIsInboundCategory,
  marketingleadIsOutboundCategory,
  marketingleadIsEarlyFunnelStage,
  marketingleadIsMidFunnelStage,
  marketingleadIsLateFunnelStage,
} from './lead-generation-type.constants';

export type {
  MarketingLeadCategoryType,
  MarketingLeadSubType,
  MarketingLeadStrategy,
  MarketingLeadFunnelStage,
  MarketingLeadChannelType,
} from './lead-generation-type.constants';

// Lead Status Constants
export {
  MARKETINGLEAD_STATUS as MARKETINGLEAD_LEAD_STATUS,
  marketingleadGetStatusLabel as marketingleadLeadGetStatusLabel,
  marketingleadGetStatusColor as marketingleadLeadGetStatusColor,
  marketingleadGetStatusCategory as marketingleadLeadGetStatusCategory,
  marketingleadIsQualified as marketingleadLeadIsQualified,
  marketingleadIsActive as marketingleadLeadIsActive,
  marketingleadIsLost,
  marketingleadCanTransition as marketingleadLeadCanTransition,
} from './lead-status.constants';

export type {
  MarketingLeadStatusType as MarketingLeadLeadStatusType,
  MarketingLeadStatusColor as MarketingLeadLeadStatusColor,
  MarketingLeadStatusCategory as MarketingLeadLeadStatusCategory,
  MarketingLeadStatusOrder as MarketingLeadLeadStatusOrder,
  MarketingLeadStatusTransition as MarketingLeadLeadStatusTransition,
} from './lead-status.constants';

// Lead Source Constants
export {
  MARKETINGLEAD_SOURCE,
  marketingleadGetSourceLabel,
  marketingleadGetSourceCategory,
  marketingleadGetSourceQualityScore,
  marketingleadGetSourceTrustLevel,
  marketingleadGetSourceCostLevel,
  marketingleadGetDefaultSource,
  marketingleadIsOrganicSource,
  marketingleadIsPaidSource,
  marketingleadIsHighQualitySource,
} from './lead-source.constants';

export type {
  MarketingLeadSource,
  MarketingLeadSourceCategory,
  MarketingLeadSourceQualityScore,
  MarketingLeadSourceTrustLevel,
  MarketingLeadSourceCostLevel,
  MarketingLeadSourceDefault,
} from './lead-source.constants';
