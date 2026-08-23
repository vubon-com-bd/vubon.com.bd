/**
 * Notification Template Constants Index
 * Export all notification template constants and types for easy importing
 */

// Notification Template Constants
export {
  NOTIFICATIONTEMPLATE,
  notificationtemplateGetTypeLabel,
  notificationtemplateGetCategoryLabel,
  notificationtemplateGetFormatLabel,
  notificationtemplateGetLanguageLabel,
  notificationtemplateGetVariableTypeLabel,
  notificationtemplateGetErrorLabel,
  notificationtemplateGetDefaultVersion,
  notificationtemplateIsEmailType,
  notificationtemplateIsSMSType,
  notificationtemplateIsPushType,
  notificationtemplateIsInAppType,
} from './notification-template.constants';

export type {
  NotificationTemplateType,
  NotificationTemplateCategory,
  NotificationTemplateFormat,
  NotificationTemplateLanguage,
  NotificationTemplateVariableType,
  NotificationTemplateDefault,
  NotificationTemplateLimit,
  NotificationTemplateError,
} from './notification-template.constants';

// Notification Template Type Constants
export {
  NOTIFICATIONTEMPLATE_TYPE,
  notificationtemplateGetCategoryLabel as notificationTemplateTypeGetCategoryLabel,
  notificationtemplateGetSubTypeLabel,
  notificationtemplateGetComplexityLabel,
  notificationtemplateGetScopeLabel,
  notificationtemplateGetPurposeLabel,
  notificationtemplateIsMarketingCategory,
  notificationtemplateIsTransactionalCategory,
  notificationtemplateIsSystemCategory,
} from './notification-template-type.constants';

export type {
  NotificationTemplateCategoryType,
  NotificationTemplateSubType,
  NotificationTemplateComplexity,
  NotificationTemplateScope,
  NotificationTemplatePurpose,
} from './notification-template-type.constants';

// Notification Template Status Constants
export {
  NOTIFICATIONTEMPLATE_STATUS,
  notificationtemplateGetStatusLabel,
  notificationtemplateGetStatusColor,
  notificationtemplateGetStatusCategory,
  notificationtemplateIsPublished,
  notificationtemplateIsDraft,
  notificationtemplateIsApproved,
  notificationtemplateIsArchived,
  notificationtemplateCanTransition,
} from './notification-template-status.constants';

export type {
  NotificationTemplateStatusType,
  NotificationTemplateStatusColor,
  NotificationTemplateStatusCategory,
  NotificationTemplateStatusOrder,
  NotificationTemplateStatusTransition,
} from './notification-template-status.constants';
