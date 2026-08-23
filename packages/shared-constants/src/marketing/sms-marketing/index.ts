/**
 * SMS Marketing Constants Index
 * Export all SMS marketing constants and types for easy importing
 */

// SMS Marketing Constants
export {
  MARKETINGSMS,
  marketingsmsGetTypeLabel,
  marketingsmsGetCategoryLabel,
  marketingsmsGetPriorityLabel,
  marketingsmsGetProviderLabel,
  marketingsmsGetSendingMethodLabel,
  marketingsmsGetTrackingTypeLabel,
  marketingsmsGetEngagementLabel,
  marketingsmsIsTransactional,
  marketingsmsIsPromotional,
  marketingsmsIsRelational,
  marketingsmsGetMaxSMSSegments,
  marketingsmsGetDefaultSenderId,
  marketingsmsGetDefaultCountryCode,
  marketingsmsGetDefaultValidityPeriod,
  marketingsmsGetDefaultOptOutMessage,
} from './sms-marketing.constants';

export type {
  MarketingSMSType,
  MarketingSMSCategory,
  MarketingSMSPriority,
  MarketingSMSProvider,
  MarketingSMSSendingMethod,
  MarketingSMSTrackingType,
  MarketingSMSEngagement,
  MarketingSMSDefault,
  MarketingSMSLimit,
} from './sms-marketing.constants';

// SMS Marketing Type Constants
export {
  MARKETINGSMS_TYPE,
  marketingsmsGetSubTypeLabel,
  marketingsmsGetFormatLabel,
  marketingsmsGetPurposeLabel,
  marketingsmsGetPersonalizationTypeLabel,
  marketingsmsGetCharacterSetLabel,
  marketingsmsIsMarketingCategory,
  marketingsmsIsTransactionalCategory,
  marketingsmsIsOperationalCategory,
  marketingsmsGetMaxGSMCharacters,
  marketingsmsGetMaxUnicodeCharacters,
  marketingsmsCalculateSMSSegments,
} from './sms-marketing-type.constants';

export type {
  MarketingSMSCategoryType,
  MarketingSMSSubType,
  MarketingSMSFormat,
  MarketingSMSPurpose,
  MarketingSMSPersonalizationType,
  MarketingSMSCharacterSet,
} from './sms-marketing-type.constants';

// SMS Marketing Status Constants
export {
  MARKETINGSMS_STATUS,
  marketingsmsGetStatusLabel,
  marketingsmsGetStatusColor,
  marketingsmsGetStatusCategory,
  marketingsmsIsDelivered,
  marketingsmsIsEngaged,
  marketingsmsIsFailed,
  marketingsmsIsPending,
  marketingsmsIsTerminal,
  marketingsmsCanTransition,
} from './sms-marketing-status.constants';

export type {
  MarketingSMSStatusType,
  MarketingSMSStatusColor,
  MarketingSMSStatusCategory,
  MarketingSMSStatusOrder,
  MarketingSMSStatusTransition,
} from './sms-marketing-status.constants';
