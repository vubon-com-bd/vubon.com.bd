/**
 * Notification Preference Constants
 * Core notification preference configuration and settings
 */

export const NOTIFICATIONPREFERENCE = {
  // Preference Types
  TYPES: {
    CHANNEL: 'channel',
    FREQUENCY: 'frequency',
    CATEGORY: 'category',
    PRIORITY: 'priority',
    TIME: 'time',
    DND: 'dnd',
    DIGEST: 'digest',
    CUSTOM: 'custom',
  } as const,

  // Preference Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SOCIAL: 'social',
    ALERT: 'alert',
    UPDATE: 'update',
    PROMOTIONAL: 'promotional',
    SECURITY: 'security',
    CUSTOM: 'custom',
  } as const,

  // Preference Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    ALL: 'all',
    NONE: 'none',
  } as const,

  // Preference Frequencies
  FREQUENCIES: {
    INSTANT: 'instant',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    NEVER: 'never',
  } as const,

  // Preference Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none',
  } as const,

  // Preference DND Statuses
  DND_STATUSES: {
    OFF: 'off',
    ON: 'on',
    SCHEDULED: 'scheduled',
    UNTIL: 'until',
  } as const,

  // Preference Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'channel',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_CHANNEL: 'email',
    DEFAULT_FREQUENCY: 'instant',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_DND_STATUS: 'off',
    DEFAULT_DND_START_TIME: '22:00:00',
    DEFAULT_DND_END_TIME: '08:00:00',
    DEFAULT_DND_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_DIGEST_ENABLED: false,
    DEFAULT_DIGEST_FREQUENCY: 'daily',
    MAX_PREFERENCES_PER_USER: 50,
    MAX_CATEGORIES_PER_USER: 20,
  } as const,

  // Preference Limits
  LIMITS: {
    MIN_PREFERENCE_NAME_LENGTH: 3,
    MAX_PREFERENCE_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CATEGORIES: 20,
    MAX_CHANNELS_PER_PREFERENCE: 10,
    MAX_SCHEDULES: 5,
    MAX_EXCEPTIONS: 10,
  } as const,

  // Preference Errors
  ERRORS: {
    INVALID_PREFERENCE: 'invalid_preference',
    INVALID_CHANNEL: 'invalid_channel',
    INVALID_FREQUENCY: 'invalid_frequency',
    INVALID_CATEGORY: 'invalid_category',
    INVALID_DND: 'invalid_dnd',
    CONFLICT: 'conflict',
    PERMISSION_DENIED: 'permission_denied',
    MAX_PREFERENCES_EXCEEDED: 'max_preferences_exceeded',
  } as const,
} as const;

// Preference Types
export type NotificationPreferenceType =
  (typeof NOTIFICATIONPREFERENCE.TYPES)[keyof typeof NOTIFICATIONPREFERENCE.TYPES];

// Preference Categories
export type NotificationPreferenceCategory =
  (typeof NOTIFICATIONPREFERENCE.CATEGORIES)[keyof typeof NOTIFICATIONPREFERENCE.CATEGORIES];

// Preference Channels
export type NotificationPreferenceChannel =
  (typeof NOTIFICATIONPREFERENCE.CHANNELS)[keyof typeof NOTIFICATIONPREFERENCE.CHANNELS];

// Preference Frequencies
export type NotificationPreferenceFrequency =
  (typeof NOTIFICATIONPREFERENCE.FREQUENCIES)[keyof typeof NOTIFICATIONPREFERENCE.FREQUENCIES];

// Preference Priorities
export type NotificationPreferencePriority =
  (typeof NOTIFICATIONPREFERENCE.PRIORITIES)[keyof typeof NOTIFICATIONPREFERENCE.PRIORITIES];

// Preference DND Statuses
export type NotificationPreferenceDNDStatus =
  (typeof NOTIFICATIONPREFERENCE.DND_STATUSES)[keyof typeof NOTIFICATIONPREFERENCE.DND_STATUSES];

// Preference Defaults
export type NotificationPreferenceDefault =
  (typeof NOTIFICATIONPREFERENCE.DEFAULTS)[keyof typeof NOTIFICATIONPREFERENCE.DEFAULTS];

// Preference Limits
export type NotificationPreferenceLimit =
  (typeof NOTIFICATIONPREFERENCE.LIMITS)[keyof typeof NOTIFICATIONPREFERENCE.LIMITS];

// Preference Errors
export type NotificationPreferenceError =
  (typeof NOTIFICATIONPREFERENCE.ERRORS)[keyof typeof NOTIFICATIONPREFERENCE.ERRORS];

// Utility Functions
export function notificationpreferenceGetTypeLabel(type: NotificationPreferenceType): string {
  const labels: Record<NotificationPreferenceType, string> = {
    [NOTIFICATIONPREFERENCE.TYPES.CHANNEL]: 'Channel',
    [NOTIFICATIONPREFERENCE.TYPES.FREQUENCY]: 'Frequency',
    [NOTIFICATIONPREFERENCE.TYPES.CATEGORY]: 'Category',
    [NOTIFICATIONPREFERENCE.TYPES.PRIORITY]: 'Priority',
    [NOTIFICATIONPREFERENCE.TYPES.TIME]: 'Time',
    [NOTIFICATIONPREFERENCE.TYPES.DND]: 'Do Not Disturb',
    [NOTIFICATIONPREFERENCE.TYPES.DIGEST]: 'Digest',
    [NOTIFICATIONPREFERENCE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Preference Type';
}

export function notificationpreferenceGetCategoryLabel(
  category: NotificationPreferenceCategory
): string {
  const labels: Record<NotificationPreferenceCategory, string> = {
    [NOTIFICATIONPREFERENCE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONPREFERENCE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONPREFERENCE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONPREFERENCE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONPREFERENCE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONPREFERENCE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONPREFERENCE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONPREFERENCE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONPREFERENCE.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONPREFERENCE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationpreferenceGetChannelLabel(
  channel: NotificationPreferenceChannel
): string {
  const labels: Record<NotificationPreferenceChannel, string> = {
    [NOTIFICATIONPREFERENCE.CHANNELS.EMAIL]: 'Email',
    [NOTIFICATIONPREFERENCE.CHANNELS.SMS]: 'SMS',
    [NOTIFICATIONPREFERENCE.CHANNELS.PUSH]: 'Push',
    [NOTIFICATIONPREFERENCE.CHANNELS.IN_APP]: 'In-App',
    [NOTIFICATIONPREFERENCE.CHANNELS.WEBHOOK]: 'Webhook',
    [NOTIFICATIONPREFERENCE.CHANNELS.SLACK]: 'Slack',
    [NOTIFICATIONPREFERENCE.CHANNELS.TEAMS]: 'Microsoft Teams',
    [NOTIFICATIONPREFERENCE.CHANNELS.DISCORD]: 'Discord',
    [NOTIFICATIONPREFERENCE.CHANNELS.WHATSAPP]: 'WhatsApp',
    [NOTIFICATIONPREFERENCE.CHANNELS.TELEGRAM]: 'Telegram',
    [NOTIFICATIONPREFERENCE.CHANNELS.ALL]: 'All Channels',
    [NOTIFICATIONPREFERENCE.CHANNELS.NONE]: 'None',
  };
  return labels[channel] || 'Unknown Channel';
}

export function notificationpreferenceGetFrequencyLabel(
  frequency: NotificationPreferenceFrequency
): string {
  const labels: Record<NotificationPreferenceFrequency, string> = {
    [NOTIFICATIONPREFERENCE.FREQUENCIES.INSTANT]: 'Instant',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.HOURLY]: 'Hourly',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.DAILY]: 'Daily',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.WEEKLY]: 'Weekly',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.MONTHLY]: 'Monthly',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONPREFERENCE.FREQUENCIES.NEVER]: 'Never',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function notificationpreferenceGetPriorityLabel(
  priority: NotificationPreferencePriority
): string {
  const labels: Record<NotificationPreferencePriority, string> = {
    [NOTIFICATIONPREFERENCE.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONPREFERENCE.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONPREFERENCE.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONPREFERENCE.PRIORITIES.NONE]: 'None',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationpreferenceGetDNDStatusLabel(
  status: NotificationPreferenceDNDStatus
): string {
  const labels: Record<NotificationPreferenceDNDStatus, string> = {
    [NOTIFICATIONPREFERENCE.DND_STATUSES.OFF]: 'Off',
    [NOTIFICATIONPREFERENCE.DND_STATUSES.ON]: 'On',
    [NOTIFICATIONPREFERENCE.DND_STATUSES.SCHEDULED]: 'Scheduled',
    [NOTIFICATIONPREFERENCE.DND_STATUSES.UNTIL]: 'Until',
  };
  return labels[status] || 'Unknown DND Status';
}

export function notificationpreferenceGetErrorLabel(error: NotificationPreferenceError): string {
  const labels: Record<NotificationPreferenceError, string> = {
    [NOTIFICATIONPREFERENCE.ERRORS.INVALID_PREFERENCE]: 'Invalid Preference',
    [NOTIFICATIONPREFERENCE.ERRORS.INVALID_CHANNEL]: 'Invalid Channel',
    [NOTIFICATIONPREFERENCE.ERRORS.INVALID_FREQUENCY]: 'Invalid Frequency',
    [NOTIFICATIONPREFERENCE.ERRORS.INVALID_CATEGORY]: 'Invalid Category',
    [NOTIFICATIONPREFERENCE.ERRORS.INVALID_DND]: 'Invalid DND',
    [NOTIFICATIONPREFERENCE.ERRORS.CONFLICT]: 'Conflict',
    [NOTIFICATIONPREFERENCE.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONPREFERENCE.ERRORS.MAX_PREFERENCES_EXCEEDED]: 'Max Preferences Exceeded',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationpreferenceGetDefaultChannel(): NotificationPreferenceChannel {
  return NOTIFICATIONPREFERENCE.DEFAULTS.DEFAULT_CHANNEL;
}

export function notificationpreferenceGetDefaultFrequency(): NotificationPreferenceFrequency {
  return NOTIFICATIONPREFERENCE.DEFAULTS.DEFAULT_FREQUENCY;
}

export function notificationpreferenceIsChannelPreference(
  type: NotificationPreferenceType
): boolean {
  return type === NOTIFICATIONPREFERENCE.TYPES.CHANNEL;
}

export function notificationpreferenceIsFrequencyPreference(
  type: NotificationPreferenceType
): boolean {
  return type === NOTIFICATIONPREFERENCE.TYPES.FREQUENCY;
}

export function notificationpreferenceIsCategoryPreference(
  type: NotificationPreferenceType
): boolean {
  return type === NOTIFICATIONPREFERENCE.TYPES.CATEGORY;
}

export function notificationpreferenceIsDNDPreference(type: NotificationPreferenceType): boolean {
  return type === NOTIFICATIONPREFERENCE.TYPES.DND;
}

export function notificationpreferenceIsDigestPreference(
  type: NotificationPreferenceType
): boolean {
  return type === NOTIFICATIONPREFERENCE.TYPES.DIGEST;
}
