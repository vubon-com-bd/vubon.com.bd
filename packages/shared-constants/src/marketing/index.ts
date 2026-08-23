/**
 * Marketing Constants Index
 * Export all marketing constants and types for easy importing
 */

// Marketing Main Constants
export {
  MARKETING,
  getMarketingChannelLabel,
  getMarketingCampaignTypeLabel,
  getMarketingObjectiveLabel,
  getMarketingAudienceTypeLabel,
  getMarketingCampaignStatusLabel,
  getMarketingMetricLabel,
  getMarketingTriggerLabel,
  getMarketingActionLabel,
  getMarketingErrorLabel,
  getMarketingAttributionModelLabel,
  isCampaignActive,
  isCampaignEditable,
  isCampaignEnded,
} from './marketing.constants';

export type {
  MarketingChannel,
  MarketingCampaignType,
  MarketingObjective,
  MarketingAudienceType,
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingCampaignStatus,
  MarketingMetric,
  MarketingTrigger,
  MarketingAction,
  MarketingPermission,
  MarketingErrorType,
  MarketingDefault,
} from './marketing.constants';

// Campaign Marketing Constants
export * from './campaign-marketing';

// Promotion Marketing Constants
export * from './promotion-marketing';

// Affiliate Marketing Constants
export * from './affiliate-marketing';

// Referral Marketing Constants
export * from './referral-marketing';

// Loyalty Marketing Constants
export * from './loyalty-marketing';

// Email Marketing Constants
export * from './email-marketing';

// SMS Marketing Constants
export * from './sms-marketing';

// Social Marketing Constants
export * from './social-marketing';

// Lead Generation Marketing Constants
export * from './lead-generation-marketing';

// Marketing Report Constants
export * from './marketing-report';

// Marketing Automation Constants
export * from './marketing-automation';

// Marketing Permission Constants
export {
  MARKETINGPERMISSION,
  marketingpermissionGetModuleLabel,
  marketingpermissionGetActionLabel,
  marketingpermissionGetLevelLabel,
  marketingpermissionGetScopeLabel,
  marketingpermissionGetGroupLabel,
  marketingpermissionHasAccess,
  marketingpermissionIsAdminLevel,
  marketingpermissionIsWriteLevel,
  marketingpermissionIsReadLevel,
  marketingpermissionGetDefaultLevel,
  marketingpermissionGetDefaultScope,
  marketingpermissionGetDefaultGroup,
  marketingpermissionGetModuleActions,
} from './marketing-permission.constants';

export type {
  MarketingPermissionModule,
  MarketingPermissionAction,
  MarketingPermissionLevel,
  MarketingPermissionScope,
  MarketingPermissionGroup,
  MarketingPermissionDefault,
  MarketingPermissionLimit,
} from './marketing-permission.constants';

// Marketing Error Constants
export {
  MARKETINGERROR,
  marketingerrorGetTypeLabel,
  marketingerrorGetSeverityLabel,
  marketingerrorGetCategoryLabel,
  marketingerrorGetRecoveryActionLabel,
  marketingerrorGetStatusCode,
  marketingerrorIsRetryable,
  marketingerrorIsCritical,
  marketingerrorGetDefaultSeverity,
  marketingerrorGetDefaultRetryAttempts,
  marketingerrorGetDefaultRetryDelay,
} from './marketing-error.constants';

// Note: MarketingErrorType is already exported from marketing.constants
// To avoid duplicate export, we don't re-export it here
