/**
 * Email Marketing Constants Index
 * Export all email marketing constants and types for easy importing
 */

// Email Marketing Constants
export {
  MARKETINGEMAIL,
  marketingemailGetTypeLabel,
  marketingemailGetCategoryLabel,
  marketingemailGetPriorityLabel,
  marketingemailGetProviderLabel,
  marketingemailGetSendingMethodLabel,
  marketingemailGetTrackingTypeLabel,
  marketingemailGetEngagementLabel,
  marketingemailIsTransactional,
  marketingemailIsPromotional,
  marketingemailIsEngagementEmail,
  marketingemailGetDefaultFromName,
  marketingemailGetDefaultFromEmail,
  marketingemailGetDefaultSendTime,
} from './email-marketing.constants';

export type {
  MarketingEmailType,
  MarketingEmailCategory,
  MarketingEmailPriority,
  MarketingEmailProvider,
  MarketingEmailSendingMethod,
  MarketingEmailTrackingType,
  MarketingEmailEngagement,
  MarketingEmailDefault,
  MarketingEmailLimit,
} from './email-marketing.constants';

// Email Marketing Type Constants
export {
  MARKETINGEMAIL_TYPE,
  marketingemailGetSubTypeLabel,
  marketingemailGetFormatLabel,
  marketingemailGetPurposeLabel,
  marketingemailGetPersonalizationTypeLabel,
  marketingemailIsMarketingCategory,
  marketingemailIsTransactionalCategory,
  marketingemailIsRelationalCategory,
  marketingemailIsOperationalCategory,
} from './email-marketing-type.constants';

export type {
  MarketingEmailCategoryType,
  MarketingEmailSubType,
  MarketingEmailFormat,
  MarketingEmailPurpose,
  MarketingEmailPersonalizationType,
} from './email-marketing-type.constants';

// Email Marketing Status Constants
export {
  MARKETINGEMAIL_STATUS,
  marketingemailGetStatusLabel,
  marketingemailGetStatusColor,
  marketingemailGetStatusCategory,
  marketingemailIsDelivered,
  marketingemailIsEngaged,
  marketingemailIsFailed,
  marketingemailIsPending,
  marketingemailIsTerminal,
  marketingemailCanTransition,
} from './email-marketing-status.constants';

export type {
  MarketingEmailStatusType,
  MarketingEmailStatusColor,
  MarketingEmailStatusCategory,
  MarketingEmailStatusOrder,
  MarketingEmailStatusTransition,
} from './email-marketing-status.constants';
