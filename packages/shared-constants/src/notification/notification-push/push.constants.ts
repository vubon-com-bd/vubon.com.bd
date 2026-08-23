/**
 * Push Constants
 * Core push notification configuration and settings
 */

export const NOTIFICATIONPUSH = {
  // Push Types
  TYPES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    ALERT: 'alert',
    REMINDER: 'reminder',
    PROMOTIONAL: 'promotional',
    ORDER: 'order',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    PAYMENT: 'payment',
    WELCOME: 'welcome',
    ENGAGEMENT: 'engagement',
    SOCIAL: 'social',
    CUSTOM: 'custom',
  } as const,

  // Push Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SOCIAL: 'social',
    URGENT: 'urgent',
    ENGAGEMENT: 'engagement',
  } as const,

  // Push Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // Push Platforms
  PLATFORMS: {
    ANDROID: 'android',
    IOS: 'ios',
    WEB: 'web',
    ALL: 'all',
  } as const,

  // Push Providers
  PROVIDERS: {
    FCM: 'fcm',
    APNS: 'apns',
    WEB_PUSH: 'web_push',
    ONESIGNAL: 'onesignal',
    PUSHER: 'pusher',
    CUSTOM: 'custom',
  } as const,

  // Push Formats
  FORMATS: {
    ALERT: 'alert',
    BADGE: 'badge',
    SOUND: 'sound',
    IMAGE: 'image',
    VIDEO: 'video',
    INTERACTIVE: 'interactive',
    CAROUSEL: 'carousel',
    CUSTOM: 'custom',
  } as const,

  // Push Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'transactional',
    DEFAULT_CATEGORY: 'transactional',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_PLATFORM: 'all',
    DEFAULT_PROVIDER: 'fcm',
    DEFAULT_ICON: 'default',
    DEFAULT_SOUND: 'default',
    DEFAULT_BADGE: 0,
    DEFAULT_TTL: 86400,
    DEFAULT_VISIBILITY: 'public',
    MAX_PAYLOAD_SIZE_KB: 4,
    MAX_TITLE_LENGTH: 100,
    MAX_BODY_LENGTH: 200,
    MAX_IMAGE_SIZE_KB: 100,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 5000,
    DEFAULT_TIMEOUT: 10000,
    MAX_PUSH_PER_DAY: 10000,
    MAX_PUSH_PER_HOUR: 1000,
  } as const,

  // Push Limits
  LIMITS: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MIN_BODY_LENGTH: 1,
    MAX_BODY_LENGTH: 200,
    MAX_PAYLOAD_SIZE_KB: 4,
    MAX_IMAGE_SIZE_KB: 100,
    MAX_VIDEO_SIZE_MB: 10,
    MAX_RECIPIENTS: 10000,
    MAX_PUSH_PER_DAY: 10000,
    MAX_PUSH_PER_HOUR: 1000,
    MAX_PUSH_PER_SECOND: 100,
    MAX_SEND_RETRIES: 3,
    MAX_TTL_SECONDS: 86400,
    MIN_TTL_SECONDS: 60,
    MAX_CONCURRENT_DELIVERIES: 10,
  } as const,

  // Push Errors
  ERRORS: {
    SEND_FAILED: 'send_failed',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_DEVICE: 'invalid_device',
    INVALID_PAYLOAD: 'invalid_payload',
    TIMEOUT: 'timeout',
    AUTHENTICATION_ERROR: 'authentication_error',
    NETWORK_ERROR: 'network_error',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    CONFIGURATION_ERROR: 'configuration_error',
    VALIDATION_ERROR: 'validation_error',
    DEVICE_OFFLINE: 'device_offline',
    OPT_OUT: 'opt_out',
  } as const,
} as const;

// Push Types
export type NotificationPushType =
  (typeof NOTIFICATIONPUSH.TYPES)[keyof typeof NOTIFICATIONPUSH.TYPES];

// Push Categories
export type NotificationPushCategory =
  (typeof NOTIFICATIONPUSH.CATEGORIES)[keyof typeof NOTIFICATIONPUSH.CATEGORIES];

// Push Priorities
export type NotificationPushPriority =
  (typeof NOTIFICATIONPUSH.PRIORITIES)[keyof typeof NOTIFICATIONPUSH.PRIORITIES];

// Push Platforms
export type NotificationPushPlatform =
  (typeof NOTIFICATIONPUSH.PLATFORMS)[keyof typeof NOTIFICATIONPUSH.PLATFORMS];

// Push Providers
export type NotificationPushProvider =
  (typeof NOTIFICATIONPUSH.PROVIDERS)[keyof typeof NOTIFICATIONPUSH.PROVIDERS];

// Push Formats
export type NotificationPushFormat =
  (typeof NOTIFICATIONPUSH.FORMATS)[keyof typeof NOTIFICATIONPUSH.FORMATS];

// Push Defaults
export type NotificationPushDefault =
  (typeof NOTIFICATIONPUSH.DEFAULTS)[keyof typeof NOTIFICATIONPUSH.DEFAULTS];

// Push Limits
export type NotificationPushLimit =
  (typeof NOTIFICATIONPUSH.LIMITS)[keyof typeof NOTIFICATIONPUSH.LIMITS];

// Push Errors
export type NotificationPushError =
  (typeof NOTIFICATIONPUSH.ERRORS)[keyof typeof NOTIFICATIONPUSH.ERRORS];

// Utility Functions
export function notificationpushGetTypeLabel(type: NotificationPushType): string {
  const labels: Record<NotificationPushType, string> = {
    [NOTIFICATIONPUSH.TYPES.MARKETING]: 'Marketing',
    [NOTIFICATIONPUSH.TYPES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONPUSH.TYPES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONPUSH.TYPES.SYSTEM]: 'System',
    [NOTIFICATIONPUSH.TYPES.ALERT]: 'Alert',
    [NOTIFICATIONPUSH.TYPES.REMINDER]: 'Reminder',
    [NOTIFICATIONPUSH.TYPES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONPUSH.TYPES.ORDER]: 'Order',
    [NOTIFICATIONPUSH.TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONPUSH.TYPES.DELIVERY]: 'Delivery',
    [NOTIFICATIONPUSH.TYPES.PAYMENT]: 'Payment',
    [NOTIFICATIONPUSH.TYPES.WELCOME]: 'Welcome',
    [NOTIFICATIONPUSH.TYPES.ENGAGEMENT]: 'Engagement',
    [NOTIFICATIONPUSH.TYPES.SOCIAL]: 'Social',
    [NOTIFICATIONPUSH.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Push Type';
}

export function notificationpushGetCategoryLabel(category: NotificationPushCategory): string {
  const labels: Record<NotificationPushCategory, string> = {
    [NOTIFICATIONPUSH.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONPUSH.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONPUSH.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONPUSH.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONPUSH.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONPUSH.CATEGORIES.URGENT]: 'Urgent',
    [NOTIFICATIONPUSH.CATEGORIES.ENGAGEMENT]: 'Engagement',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationpushGetPriorityLabel(priority: NotificationPushPriority): string {
  const labels: Record<NotificationPushPriority, string> = {
    [NOTIFICATIONPUSH.PRIORITIES.CRITICAL]: 'Critical',
    [NOTIFICATIONPUSH.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONPUSH.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONPUSH.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONPUSH.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationpushGetPlatformLabel(platform: NotificationPushPlatform): string {
  const labels: Record<NotificationPushPlatform, string> = {
    [NOTIFICATIONPUSH.PLATFORMS.ANDROID]: 'Android',
    [NOTIFICATIONPUSH.PLATFORMS.IOS]: 'iOS',
    [NOTIFICATIONPUSH.PLATFORMS.WEB]: 'Web',
    [NOTIFICATIONPUSH.PLATFORMS.ALL]: 'All Platforms',
  };
  return labels[platform] || 'Unknown Platform';
}

export function notificationpushGetProviderLabel(provider: NotificationPushProvider): string {
  const labels: Record<NotificationPushProvider, string> = {
    [NOTIFICATIONPUSH.PROVIDERS.FCM]: 'FCM (Firebase)',
    [NOTIFICATIONPUSH.PROVIDERS.APNS]: 'APNS (Apple)',
    [NOTIFICATIONPUSH.PROVIDERS.WEB_PUSH]: 'Web Push',
    [NOTIFICATIONPUSH.PROVIDERS.ONESIGNAL]: 'OneSignal',
    [NOTIFICATIONPUSH.PROVIDERS.PUSHER]: 'Pusher',
    [NOTIFICATIONPUSH.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown Provider';
}

export function notificationpushGetFormatLabel(format: NotificationPushFormat): string {
  const labels: Record<NotificationPushFormat, string> = {
    [NOTIFICATIONPUSH.FORMATS.ALERT]: 'Alert',
    [NOTIFICATIONPUSH.FORMATS.BADGE]: 'Badge',
    [NOTIFICATIONPUSH.FORMATS.SOUND]: 'Sound',
    [NOTIFICATIONPUSH.FORMATS.IMAGE]: 'Image',
    [NOTIFICATIONPUSH.FORMATS.VIDEO]: 'Video',
    [NOTIFICATIONPUSH.FORMATS.INTERACTIVE]: 'Interactive',
    [NOTIFICATIONPUSH.FORMATS.CAROUSEL]: 'Carousel',
    [NOTIFICATIONPUSH.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationpushGetErrorLabel(error: NotificationPushError): string {
  const labels: Record<NotificationPushError, string> = {
    [NOTIFICATIONPUSH.ERRORS.SEND_FAILED]: 'Send Failed',
    [NOTIFICATIONPUSH.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [NOTIFICATIONPUSH.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONPUSH.ERRORS.INVALID_DEVICE]: 'Invalid Device',
    [NOTIFICATIONPUSH.ERRORS.INVALID_PAYLOAD]: 'Invalid Payload',
    [NOTIFICATIONPUSH.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONPUSH.ERRORS.AUTHENTICATION_ERROR]: 'Authentication Error',
    [NOTIFICATIONPUSH.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATIONPUSH.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [NOTIFICATIONPUSH.ERRORS.CONFIGURATION_ERROR]: 'Configuration Error',
    [NOTIFICATIONPUSH.ERRORS.VALIDATION_ERROR]: 'Validation Error',
    [NOTIFICATIONPUSH.ERRORS.DEVICE_OFFLINE]: 'Device Offline',
    [NOTIFICATIONPUSH.ERRORS.OPT_OUT]: 'Opt Out',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationpushGetDefaultTTL(): number {
  return NOTIFICATIONPUSH.DEFAULTS.DEFAULT_TTL;
}

export function notificationpushGetMaxPayloadSizeKB(): number {
  return NOTIFICATIONPUSH.DEFAULTS.MAX_PAYLOAD_SIZE_KB;
}

export function notificationpushGetMaxTitleLength(): number {
  return NOTIFICATIONPUSH.DEFAULTS.MAX_TITLE_LENGTH;
}

export function notificationpushGetMaxBodyLength(): number {
  return NOTIFICATIONPUSH.DEFAULTS.MAX_BODY_LENGTH;
}

export function notificationpushIsTransactional(type: NotificationPushType): boolean {
  const transactionalTypes: NotificationPushType[] = [
    NOTIFICATIONPUSH.TYPES.TRANSACTIONAL,
    NOTIFICATIONPUSH.TYPES.ORDER,
    NOTIFICATIONPUSH.TYPES.SHIPPING,
    NOTIFICATIONPUSH.TYPES.DELIVERY,
    NOTIFICATIONPUSH.TYPES.PAYMENT,
  ];
  return transactionalTypes.includes(type);
}

export function notificationpushIsMarketing(type: NotificationPushType): boolean {
  const marketingTypes: NotificationPushType[] = [
    NOTIFICATIONPUSH.TYPES.MARKETING,
    NOTIFICATIONPUSH.TYPES.PROMOTIONAL,
    NOTIFICATIONPUSH.TYPES.WELCOME,
    NOTIFICATIONPUSH.TYPES.ENGAGEMENT,
  ];
  return marketingTypes.includes(type);
}

export function notificationpushIsUrgent(type: NotificationPushType): boolean {
  const urgentTypes: NotificationPushType[] = [
    NOTIFICATIONPUSH.TYPES.ALERT,
    NOTIFICATIONPUSH.TYPES.REMINDER,
    NOTIFICATIONPUSH.TYPES.SYSTEM,
  ];
  return urgentTypes.includes(type);
}

export function notificationpushIsAndroidPlatform(platform: NotificationPushPlatform): boolean {
  return (
    platform === NOTIFICATIONPUSH.PLATFORMS.ANDROID || platform === NOTIFICATIONPUSH.PLATFORMS.ALL
  );
}

export function notificationpushIsIOSPlatform(platform: NotificationPushPlatform): boolean {
  return platform === NOTIFICATIONPUSH.PLATFORMS.IOS || platform === NOTIFICATIONPUSH.PLATFORMS.ALL;
}

export function notificationpushIsWebPlatform(platform: NotificationPushPlatform): boolean {
  return platform === NOTIFICATIONPUSH.PLATFORMS.WEB || platform === NOTIFICATIONPUSH.PLATFORMS.ALL;
}
