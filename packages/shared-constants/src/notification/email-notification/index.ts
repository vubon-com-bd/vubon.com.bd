/**
 * Email Notification Constants Index
 * Export all email notification constants and types for easy importing
 */

// Email Constants
export {
  NOTIFICATIONEMAIL,
  notificationemailGetTypeLabel,
  notificationemailGetCategoryLabel,
  notificationemailGetPriorityLabel,
  notificationemailGetFormatLabel,
  notificationemailGetProviderLabel,
  notificationemailGetSendingMethodLabel,
  notificationemailGetTrackingTypeLabel,
  notificationemailGetErrorLabel,
  notificationemailGetDefaultFromName,
  notificationemailGetDefaultFromEmail,
  notificationemailGetMaxEmailsPerDay,
  notificationemailIsTransactional,
  notificationemailIsMarketing,
  notificationemailIsSystem,
} from './email.constants';

export type {
  NotificationEmailType,
  NotificationEmailCategory,
  NotificationEmailPriority,
  NotificationEmailFormat,
  NotificationEmailProvider,
  NotificationEmailSendingMethod,
  NotificationEmailTrackingType,
  NotificationEmailDefault,
  NotificationEmailLimit,
  NotificationEmailError,
} from './email.constants';

// Email Template Constants
export {
  NOTIFICATIONEMAIL_TEMPLATE,
  notificationemailGetTemplateTypeLabel,
  notificationemailGetTemplateCategoryLabel,
  notificationemailGetTemplateFormatLabel,
  notificationemailGetTemplateStatusLabel,
  notificationemailGetTemplateVariableTypeLabel,
  notificationemailIsPublished,
  notificationemailIsDraft,
  notificationemailIsApproved,
  notificationemailGetDefaultTemplateType,
  notificationemailGetDefaultTemplateFormat,
  notificationemailGetDefaultLanguage,
} from './email-template.constants';

export type {
  NotificationEmailTemplateType,
  NotificationEmailTemplateCategory,
  NotificationEmailTemplateFormat,
  NotificationEmailTemplateStatus,
  NotificationEmailTemplateVariableType,
  NotificationEmailTemplateDefault,
  NotificationEmailTemplateLimit,
} from './email-template.constants';

// Email Status Constants
export {
  NOTIFICATIONEMAIL_STATUS,
  notificationemailGetStatusLabel,
  notificationemailGetStatusColor,
  notificationemailGetStatusCategory,
  notificationemailIsDelivered,
  notificationemailIsEngaged,
  notificationemailIsFailed,
  notificationemailIsPending,
  notificationemailCanTransition,
} from './email-status.constants';

export type {
  NotificationEmailStatusType,
  NotificationEmailStatusColor,
  NotificationEmailStatusCategory,
  NotificationEmailStatusOrder,
  NotificationEmailStatusTransition,
} from './email-status.constants';
