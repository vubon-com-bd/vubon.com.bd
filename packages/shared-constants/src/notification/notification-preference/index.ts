/**
 * Notification Preference Constants Index
 * Export all notification preference constants and types for easy importing
 */

// Notification Preference Constants
export {
  NOTIFICATIONPREFERENCE,
  notificationpreferenceGetTypeLabel,
  notificationpreferenceGetCategoryLabel,
  notificationpreferenceGetChannelLabel,
  notificationpreferenceGetFrequencyLabel,
  notificationpreferenceGetPriorityLabel,
  notificationpreferenceGetDNDStatusLabel,
  notificationpreferenceGetErrorLabel,
  notificationpreferenceGetDefaultChannel,
  notificationpreferenceGetDefaultFrequency,
  notificationpreferenceIsChannelPreference,
  notificationpreferenceIsFrequencyPreference,
  notificationpreferenceIsCategoryPreference,
  notificationpreferenceIsDNDPreference,
  notificationpreferenceIsDigestPreference,
} from './notification-preference.constants';

export type {
  NotificationPreferenceType,
  NotificationPreferenceCategory,
  NotificationPreferenceChannel,
  NotificationPreferenceFrequency,
  NotificationPreferencePriority,
  NotificationPreferenceDNDStatus,
  NotificationPreferenceDefault,
  NotificationPreferenceLimit,
  NotificationPreferenceError,
} from './notification-preference.constants';

// Notification Preference Type Constants
export {
  NOTIFICATIONPREFERENCE_TYPE,
  notificationpreferenceGetCategoryLabel as notificationPreferenceTypeGetCategoryLabel,
  notificationpreferenceGetSubTypeLabel,
  notificationpreferenceGetScopeLabel,
  notificationpreferenceGetOverrideLabel,
  notificationpreferenceGetComplexityLabel,
  notificationpreferenceIsMarketingCategory,
  notificationpreferenceIsTransactionalCategory,
  notificationpreferenceIsSystemCategory,
  notificationpreferenceIsSecurityCategory,
} from './notification-preference-type.constants';

export type {
  NotificationPreferenceCategoryType,
  NotificationPreferenceSubType,
  NotificationPreferenceScope,
  NotificationPreferenceOverride,
  NotificationPreferenceComplexity,
} from './notification-preference-type.constants';

// Notification Preference Status Constants
export {
  NOTIFICATIONPREFERENCE_STATUS,
  notificationpreferenceGetStatusLabel,
  notificationpreferenceGetStatusColor,
  notificationpreferenceGetStatusCategory,
  notificationpreferenceIsActive,
  notificationpreferenceIsPending,
  notificationpreferenceIsInactive,
  notificationpreferenceIsOverridden,
  notificationpreferenceCanTransition,
} from './notification-preference-status.constants';

export type {
  NotificationPreferenceStatusType,
  NotificationPreferenceStatusColor,
  NotificationPreferenceStatusCategory,
  NotificationPreferenceStatusOrder,
  NotificationPreferenceStatusTransition,
} from './notification-preference-status.constants';
