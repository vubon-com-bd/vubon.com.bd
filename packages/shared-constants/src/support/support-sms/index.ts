/**
 * Support SMS Constants Index
 * Export all support SMS constants and types for easy importing
 */

// Support SMS Constants
export {
  SUPPORT_SMS,
  supportSMSGetTypeLabel,
  supportSMSGetStatusLabel,
  supportSMSGetPriorityLabel,
  supportSMSGetCategoryLabel,
  supportSMSIsSent,
  supportSMSIsFailed,
  supportSMSGetProviderLabel,
} from './support-sms.constants';

export type {
  SupportSMSType,
  SupportSMSStatus,
  SupportSMSPriority,
  SupportSMSCategory,
  SupportSMSProvider,
} from './support-sms.constants';

// Support SMS Type Constants
export {
  SUPPORT_SMS_TYPE,
  supportSMSTypeGetCategoryLabel,
  supportSMSTypeGetScopeLabel,
  supportSMSTypeGetChannelLabel,
  supportSMSTypeGetTemplateLabel,
  supportSMSTypeGetPriorityLabel,
} from './support-sms-type.constants';

export type {
  SupportSMSTypeCategory,
  SupportSMSTypeScope,
  SupportSMSTypeChannel,
  SupportSMSTypeTemplate,
  SupportSMSTypePriority,
} from './support-sms-type.constants';
