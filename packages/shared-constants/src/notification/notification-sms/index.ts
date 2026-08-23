/**
 * SMS Notification Constants Index
 * Export all SMS notification constants and types for easy importing
 */

// SMS Constants
export {
  NOTIFICATIONSMS,
  notificationsmsGetTypeLabel,
  notificationsmsGetCategoryLabel,
  notificationsmsGetPriorityLabel,
  notificationsmsGetProviderLabel,
  notificationsmsGetSendingMethodLabel,
  notificationsmsGetCharacterSetLabel,
  notificationsmsGetErrorLabel,
  notificationsmsGetDefaultSenderId,
  notificationsmsGetDefaultCountryCode,
  notificationsmsGetMaxSMSSegments,
  notificationsmsGetMaxGSMCharacters,
  notificationsmsGetMaxUnicodeCharacters,
  notificationsmsIsTransactional,
  notificationsmsIsMarketing,
  notificationsmsIsUrgent,
  notificationsmsCalculateSegments,
} from './sms.constants';

export type {
  NotificationSMSType,
  NotificationSMSCategory,
  NotificationSMSPriority,
  NotificationSMSProvider,
  NotificationSMSSendingMethod,
  NotificationSMSCharacterSet,
  NotificationSMSDefault,
  NotificationSMSLimit,
  NotificationSMSError,
} from './sms.constants';

// SMS Status Constants
export {
  NOTIFICATIONSMS_STATUS,
  notificationsmsGetStatusLabel,
  notificationsmsGetStatusColor,
  notificationsmsGetStatusCategory,
  notificationsmsIsDelivered,
  notificationsmsIsSent,
  notificationsmsIsFailed,
  notificationsmsIsPending,
  notificationsmsCanTransition,
} from './sms-status.constants';

export type {
  NotificationSMSStatusType,
  NotificationSMSStatusColor,
  NotificationSMSStatusCategory,
  NotificationSMSStatusOrder,
  NotificationSMSStatusTransition,
} from './sms-status.constants';
