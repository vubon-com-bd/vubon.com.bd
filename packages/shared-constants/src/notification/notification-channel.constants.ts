/**
 * Notification Channel Constants
 * Channel definitions for notifications
 */

export const NOTIFICATION_CHANNEL = {
  // Channels
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
    BROWSER: 'browser',
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    VOICE: 'voice',
    FAX: 'fax',
    PRINT: 'print',
  } as const,

  // Channel Categories
  CATEGORIES: {
    DIGITAL: 'digital',
    TRADITIONAL: 'traditional',
    SOCIAL: 'social',
    PROFESSIONAL: 'professional',
    MOBILE: 'mobile',
    WEB: 'web',
    DESKTOP: 'desktop',
    VOICE: 'voice',
  } as const,

  // Channel Providers
  PROVIDERS: {
    // Email
    SENDGRID: 'sendgrid',
    MAILCHIMP: 'mailchimp',
    AWS_SES: 'aws_ses',
    POSTMARK: 'postmark',
    MAILGUN: 'mailgun',

    // SMS
    TWILIO: 'twilio',
    VONAGE: 'vonage',
    PLIVO: 'plivo',
    TEXT_LOCAL: 'text_local',

    // Push
    FCM: 'fcm',
    APNS: 'apns',
    WEB_PUSH: 'web_push',

    // Social
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',

    // Messaging
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    MESSENGER: 'messenger',
  } as const,

  // Channel Capabilities
  CAPABILITIES: {
    // Email
    HTML: 'html',
    ATTACHMENTS: 'attachments',
    TEMPLATES: 'templates',
    TRACKING: 'tracking',

    // SMS
    UNICODE: 'unicode',
    CONCATENATED: 'concatenated',
    SCHEDULING: 'scheduling',

    // Push
    IMAGE: 'image',
    SOUND: 'sound',
    BADGE: 'badge',
    INTERACTIVE: 'interactive',

    // Social
    MENTIONS: 'mentions',
    ATTACHMENTS_SOCIAL: 'attachments_social',
    THREADS: 'threads',
  } as const,

  // Channel Defaults
  DEFAULTS: {
    DEFAULT_CHANNEL: 'email',
    DEFAULT_CATEGORY: 'digital',
    DEFAULT_PROVIDER: 'sendgrid',
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 5000,
    TIMEOUT_MS: 30000,
    MAX_BATCH_SIZE: 1000,
    DEFAULT_PRIORITY: 'medium',
  } as const,

  // Channel Limits
  LIMITS: {
    MAX_CHARACTERS_SMS: 160,
    MAX_UNICODE_CHARACTERS_SMS: 70,
    MAX_CONCATENATED_SMS: 10,
    MAX_EMAIL_SIZE_MB: 25,
    MAX_ATTACHMENT_SIZE_MB: 10,
    MAX_ATTACHMENTS_PER_EMAIL: 10,
    MAX_PUSH_PAYLOAD_KB: 4,
    MAX_WEBHOOK_TIMEOUT_MS: 10000,
    MAX_RECIPIENTS_PER_CHANNEL: 10000,
  } as const,
} as const;

// Channels
export type NotificationChannelType =
  (typeof NOTIFICATION_CHANNEL.CHANNELS)[keyof typeof NOTIFICATION_CHANNEL.CHANNELS];

// Channel Categories
export type NotificationChannelCategory =
  (typeof NOTIFICATION_CHANNEL.CATEGORIES)[keyof typeof NOTIFICATION_CHANNEL.CATEGORIES];

// Channel Providers
export type NotificationChannelProvider =
  (typeof NOTIFICATION_CHANNEL.PROVIDERS)[keyof typeof NOTIFICATION_CHANNEL.PROVIDERS];

// Channel Capabilities
export type NotificationChannelCapability =
  (typeof NOTIFICATION_CHANNEL.CAPABILITIES)[keyof typeof NOTIFICATION_CHANNEL.CAPABILITIES];

// Channel Defaults
export type NotificationChannelDefault =
  (typeof NOTIFICATION_CHANNEL.DEFAULTS)[keyof typeof NOTIFICATION_CHANNEL.DEFAULTS];

// Channel Limits
export type NotificationChannelLimit =
  (typeof NOTIFICATION_CHANNEL.LIMITS)[keyof typeof NOTIFICATION_CHANNEL.LIMITS];

// Utility Functions
export function notificationGetChannelLabel(channel: NotificationChannelType): string {
  const labels: Record<NotificationChannelType, string> = {
    [NOTIFICATION_CHANNEL.CHANNELS.EMAIL]: 'Email',
    [NOTIFICATION_CHANNEL.CHANNELS.SMS]: 'SMS',
    [NOTIFICATION_CHANNEL.CHANNELS.PUSH]: 'Push Notification',
    [NOTIFICATION_CHANNEL.CHANNELS.IN_APP]: 'In-App',
    [NOTIFICATION_CHANNEL.CHANNELS.WEBHOOK]: 'Webhook',
    [NOTIFICATION_CHANNEL.CHANNELS.SLACK]: 'Slack',
    [NOTIFICATION_CHANNEL.CHANNELS.TEAMS]: 'Microsoft Teams',
    [NOTIFICATION_CHANNEL.CHANNELS.DISCORD]: 'Discord',
    [NOTIFICATION_CHANNEL.CHANNELS.WHATSAPP]: 'WhatsApp',
    [NOTIFICATION_CHANNEL.CHANNELS.TELEGRAM]: 'Telegram',
    [NOTIFICATION_CHANNEL.CHANNELS.BROWSER]: 'Browser',
    [NOTIFICATION_CHANNEL.CHANNELS.DESKTOP]: 'Desktop',
    [NOTIFICATION_CHANNEL.CHANNELS.MOBILE]: 'Mobile',
    [NOTIFICATION_CHANNEL.CHANNELS.VOICE]: 'Voice',
    [NOTIFICATION_CHANNEL.CHANNELS.FAX]: 'Fax',
    [NOTIFICATION_CHANNEL.CHANNELS.PRINT]: 'Print',
  };
  return labels[channel] || 'Unknown Channel';
}

export function notificationGetChannelCategory(
  channel: NotificationChannelType
): NotificationChannelCategory {
  const categories: Record<NotificationChannelType, NotificationChannelCategory> = {
    [NOTIFICATION_CHANNEL.CHANNELS.EMAIL]: NOTIFICATION_CHANNEL.CATEGORIES.DIGITAL,
    [NOTIFICATION_CHANNEL.CHANNELS.SMS]: NOTIFICATION_CHANNEL.CATEGORIES.MOBILE,
    [NOTIFICATION_CHANNEL.CHANNELS.PUSH]: NOTIFICATION_CHANNEL.CATEGORIES.MOBILE,
    [NOTIFICATION_CHANNEL.CHANNELS.IN_APP]: NOTIFICATION_CHANNEL.CATEGORIES.WEB,
    [NOTIFICATION_CHANNEL.CHANNELS.WEBHOOK]: NOTIFICATION_CHANNEL.CATEGORIES.DIGITAL,
    [NOTIFICATION_CHANNEL.CHANNELS.SLACK]: NOTIFICATION_CHANNEL.CATEGORIES.SOCIAL,
    [NOTIFICATION_CHANNEL.CHANNELS.TEAMS]: NOTIFICATION_CHANNEL.CATEGORIES.PROFESSIONAL,
    [NOTIFICATION_CHANNEL.CHANNELS.DISCORD]: NOTIFICATION_CHANNEL.CATEGORIES.SOCIAL,
    [NOTIFICATION_CHANNEL.CHANNELS.WHATSAPP]: NOTIFICATION_CHANNEL.CATEGORIES.SOCIAL,
    [NOTIFICATION_CHANNEL.CHANNELS.TELEGRAM]: NOTIFICATION_CHANNEL.CATEGORIES.SOCIAL,
    [NOTIFICATION_CHANNEL.CHANNELS.BROWSER]: NOTIFICATION_CHANNEL.CATEGORIES.WEB,
    [NOTIFICATION_CHANNEL.CHANNELS.DESKTOP]: NOTIFICATION_CHANNEL.CATEGORIES.DESKTOP,
    [NOTIFICATION_CHANNEL.CHANNELS.MOBILE]: NOTIFICATION_CHANNEL.CATEGORIES.MOBILE,
    [NOTIFICATION_CHANNEL.CHANNELS.VOICE]: NOTIFICATION_CHANNEL.CATEGORIES.VOICE,
    [NOTIFICATION_CHANNEL.CHANNELS.FAX]: NOTIFICATION_CHANNEL.CATEGORIES.TRADITIONAL,
    [NOTIFICATION_CHANNEL.CHANNELS.PRINT]: NOTIFICATION_CHANNEL.CATEGORIES.TRADITIONAL,
  };
  return categories[channel] || NOTIFICATION_CHANNEL.CATEGORIES.DIGITAL;
}

export function notificationGetChannelProvider(
  channel: NotificationChannelType
): NotificationChannelProvider {
  const providers: Record<NotificationChannelType, NotificationChannelProvider> = {
    [NOTIFICATION_CHANNEL.CHANNELS.EMAIL]: NOTIFICATION_CHANNEL.PROVIDERS.SENDGRID,
    [NOTIFICATION_CHANNEL.CHANNELS.SMS]: NOTIFICATION_CHANNEL.PROVIDERS.TWILIO,
    [NOTIFICATION_CHANNEL.CHANNELS.PUSH]: NOTIFICATION_CHANNEL.PROVIDERS.FCM,
    [NOTIFICATION_CHANNEL.CHANNELS.IN_APP]: NOTIFICATION_CHANNEL.PROVIDERS.WEB_PUSH,
    [NOTIFICATION_CHANNEL.CHANNELS.WEBHOOK]: NOTIFICATION_CHANNEL.PROVIDERS.SLACK,
    [NOTIFICATION_CHANNEL.CHANNELS.SLACK]: NOTIFICATION_CHANNEL.PROVIDERS.SLACK,
    [NOTIFICATION_CHANNEL.CHANNELS.TEAMS]: NOTIFICATION_CHANNEL.PROVIDERS.TEAMS,
    [NOTIFICATION_CHANNEL.CHANNELS.DISCORD]: NOTIFICATION_CHANNEL.PROVIDERS.DISCORD,
    [NOTIFICATION_CHANNEL.CHANNELS.WHATSAPP]: NOTIFICATION_CHANNEL.PROVIDERS.WHATSAPP,
    [NOTIFICATION_CHANNEL.CHANNELS.TELEGRAM]: NOTIFICATION_CHANNEL.PROVIDERS.TELEGRAM,
    [NOTIFICATION_CHANNEL.CHANNELS.BROWSER]: NOTIFICATION_CHANNEL.PROVIDERS.WEB_PUSH,
    [NOTIFICATION_CHANNEL.CHANNELS.DESKTOP]: NOTIFICATION_CHANNEL.PROVIDERS.WEB_PUSH,
    [NOTIFICATION_CHANNEL.CHANNELS.MOBILE]: NOTIFICATION_CHANNEL.PROVIDERS.FCM,
    [NOTIFICATION_CHANNEL.CHANNELS.VOICE]: NOTIFICATION_CHANNEL.PROVIDERS.TWILIO,
    [NOTIFICATION_CHANNEL.CHANNELS.FAX]: NOTIFICATION_CHANNEL.PROVIDERS.TWILIO,
    [NOTIFICATION_CHANNEL.CHANNELS.PRINT]: NOTIFICATION_CHANNEL.PROVIDERS.SENDGRID,
  };
  return providers[channel] || NOTIFICATION_CHANNEL.PROVIDERS.SENDGRID;
}

export function notificationIsEmailChannel(channel: NotificationChannelType): boolean {
  return channel === NOTIFICATION_CHANNEL.CHANNELS.EMAIL;
}

export function notificationIsSMSChannel(channel: NotificationChannelType): boolean {
  return channel === NOTIFICATION_CHANNEL.CHANNELS.SMS;
}

export function notificationIsPushChannel(channel: NotificationChannelType): boolean {
  return channel === NOTIFICATION_CHANNEL.CHANNELS.PUSH;
}

export function notificationIsInAppChannel(channel: NotificationChannelType): boolean {
  return channel === NOTIFICATION_CHANNEL.CHANNELS.IN_APP;
}

export function notificationIsSocialChannel(channel: NotificationChannelType): boolean {
  const socialChannels: NotificationChannelType[] = [
    NOTIFICATION_CHANNEL.CHANNELS.SLACK,
    NOTIFICATION_CHANNEL.CHANNELS.TEAMS,
    NOTIFICATION_CHANNEL.CHANNELS.DISCORD,
    NOTIFICATION_CHANNEL.CHANNELS.WHATSAPP,
    NOTIFICATION_CHANNEL.CHANNELS.TELEGRAM,
  ];
  return socialChannels.includes(channel);
}

export function notificationIsWebChannel(channel: NotificationChannelType): boolean {
  const webChannels: NotificationChannelType[] = [
    NOTIFICATION_CHANNEL.CHANNELS.BROWSER,
    NOTIFICATION_CHANNEL.CHANNELS.DESKTOP,
    NOTIFICATION_CHANNEL.CHANNELS.IN_APP,
  ];
  return webChannels.includes(channel);
}

export function notificationIsMobileChannel(channel: NotificationChannelType): boolean {
  const mobileChannels: NotificationChannelType[] = [
    NOTIFICATION_CHANNEL.CHANNELS.MOBILE,
    NOTIFICATION_CHANNEL.CHANNELS.PUSH,
    NOTIFICATION_CHANNEL.CHANNELS.SMS,
  ];
  return mobileChannels.includes(channel);
}

export function notificationGetDefaultChannel(): NotificationChannelType {
  return NOTIFICATION_CHANNEL.DEFAULTS.DEFAULT_CHANNEL;
}
