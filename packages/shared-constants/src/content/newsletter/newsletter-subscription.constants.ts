/**
 * Newsletter Subscription Constants
 * Configuration for newsletter subscriptions and management
 */

export const CONTENT_NEWSLETTER_SUBSCRIPTION = {
  // Subscription Types
  TYPES: {
    STANDARD: 'standard',
    PREMIUM: 'premium',
    FREE: 'free',
    PAID: 'paid',
    TRIAL: 'trial',
    CUSTOM: 'custom',
  } as const,

  // Subscription Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    UNSUBSCRIBED: 'unsubscribed',
    BOUNCED: 'bounced',
    SPAM: 'spam',
  } as const,

  // Subscription Sources
  SOURCES: {
    WEBSITE: 'website',
    CHECKOUT: 'checkout',
    REGISTRATION: 'registration',
    LANDING_PAGE: 'landing_page',
    POPUP: 'popup',
    WIDGET: 'widget',
    SOCIAL: 'social',
    EMAIL: 'email',
    IMPORT: 'import',
    API: 'api',
    MANUAL: 'manual',
    CUSTOM: 'custom',
  } as const,

  // Subscription Preferences
  PREFERENCES: {
    FREQUENCY_DAILY: 'daily',
    FREQUENCY_WEEKLY: 'weekly',
    FREQUENCY_MONTHLY: 'monthly',
    FREQUENCY_QUARTERLY: 'quarterly',
    FREQUENCY_ANNUAL: 'annual',
    CONTENT_NEWS: 'news',
    CONTENT_PROMOTIONS: 'promotions',
    CONTENT_UPDATES: 'updates',
    CONTENT_EVENTS: 'events',
    CONTENT_PRODUCTS: 'products',
    CONTENT_BLOG: 'blog',
  } as const,

  // Subscription Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    SLACK: 'slack',
    CUSTOM: 'custom',
  } as const,

  // Subscription Defaults
  DEFAULTS: {
    TYPE: 'standard',
    STATUS: 'active',
    SOURCE: 'website',
    CHANNEL: 'email',
    CONFIRMATION_REQUIRED: true,
    DOUBLE_OPT_IN: true,
    SEND_WELCOME: true,
    SEND_UNSUBSCRIBE: true,
  } as const,

  // Subscription Limits
  LIMITS: {
    MAX_SUBSCRIPTIONS_PER_USER: 10,
    MAX_SUBSCRIPTIONS_PER_IP: 5,
    MAX_SUBSCRIPTIONS_PER_EMAIL: 1,
  } as const,
} as const;

// Subscription Types
export type ContentNewsletterSubscriptionType =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES];

// Subscription Statuses
export type ContentNewsletterSubscriptionStatus =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES];

// Subscription Sources
export type ContentNewsletterSubscriptionSource =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES];

// Subscription Preferences
export type ContentNewsletterSubscriptionPreference =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES];

// Subscription Channels
export type ContentNewsletterSubscriptionChannel =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS];

// Utility Functions
export function contentNewsletterSubscriptionGetTypeLabel(
  type: ContentNewsletterSubscriptionType
): string {
  const labels: Record<ContentNewsletterSubscriptionType, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.STANDARD]: 'Standard Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.PREMIUM]: 'Premium Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.FREE]: 'Free Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.PAID]: 'Paid Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.TRIAL]: 'Trial Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES.CUSTOM]: 'Custom Subscription',
  };
  return labels[type] || 'Unknown Subscription Type';
}

export function contentNewsletterSubscriptionGetStatusLabel(
  status: ContentNewsletterSubscriptionStatus
): string {
  const labels: Record<ContentNewsletterSubscriptionStatus, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.ACTIVE]: 'Active',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.INACTIVE]: 'Inactive',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.PENDING]: 'Pending',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.SUSPENDED]: 'Suspended',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.EXPIRED]: 'Expired',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.UNSUBSCRIBED]: 'Unsubscribed',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.BOUNCED]: 'Bounced',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown Status';
}

export function contentNewsletterSubscriptionGetSourceLabel(
  source: ContentNewsletterSubscriptionSource
): string {
  const labels: Record<ContentNewsletterSubscriptionSource, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.WEBSITE]: 'Website',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.CHECKOUT]: 'Checkout',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.REGISTRATION]: 'Registration',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.LANDING_PAGE]: 'Landing Page',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.POPUP]: 'Popup',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.WIDGET]: 'Widget',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.SOCIAL]: 'Social Media',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.EMAIL]: 'Email',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.IMPORT]: 'Import',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.API]: 'API',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.MANUAL]: 'Manual',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES.CUSTOM]: 'Custom Source',
  };
  return labels[source] || 'Unknown Source';
}

export function contentNewsletterSubscriptionGetPreferenceLabel(
  preference: ContentNewsletterSubscriptionPreference
): string {
  const labels: Record<ContentNewsletterSubscriptionPreference, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.FREQUENCY_DAILY]: 'Daily',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.FREQUENCY_WEEKLY]: 'Weekly',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.FREQUENCY_MONTHLY]: 'Monthly',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.FREQUENCY_QUARTERLY]: 'Quarterly',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.FREQUENCY_ANNUAL]: 'Annual',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_NEWS]: 'News',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_PROMOTIONS]: 'Promotions',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_UPDATES]: 'Updates',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_EVENTS]: 'Events',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_PRODUCTS]: 'Products',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.PREFERENCES.CONTENT_BLOG]: 'Blog',
  };
  return labels[preference] || 'Unknown Preference';
}

export function contentNewsletterSubscriptionGetChannelLabel(
  channel: ContentNewsletterSubscriptionChannel
): string {
  const labels: Record<ContentNewsletterSubscriptionChannel, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.EMAIL]: 'Email',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.SMS]: 'SMS',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.PUSH]: 'Push Notification',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.WHATSAPP]: 'WhatsApp',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.TELEGRAM]: 'Telegram',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.SLACK]: 'Slack',
    [CONTENT_NEWSLETTER_SUBSCRIPTION.CHANNELS.CUSTOM]: 'Custom Channel',
  };
  return labels[channel] || 'Unknown Channel';
}

export function contentNewsletterSubscriptionIsActive(
  status: ContentNewsletterSubscriptionStatus
): boolean {
  const activeStatuses: ContentNewsletterSubscriptionStatus[] = [
    CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.ACTIVE,
    CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.PENDING,
  ];
  return activeStatuses.includes(status);
}

export function contentNewsletterSubscriptionIsUnsubscribed(
  status: ContentNewsletterSubscriptionStatus
): boolean {
  const unsubscribedStatuses: ContentNewsletterSubscriptionStatus[] = [
    CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.UNSUBSCRIBED,
    CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.CANCELLED,
    CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES.EXPIRED,
  ];
  return unsubscribedStatuses.includes(status);
}

export function contentNewsletterSubscriptionGetDefaultType(): ContentNewsletterSubscriptionType {
  return CONTENT_NEWSLETTER_SUBSCRIPTION.DEFAULTS.TYPE as ContentNewsletterSubscriptionType;
}

export function contentNewsletterSubscriptionGetDefaultStatus(): ContentNewsletterSubscriptionStatus {
  return CONTENT_NEWSLETTER_SUBSCRIPTION.DEFAULTS.STATUS as ContentNewsletterSubscriptionStatus;
}

export function contentNewsletterSubscriptionGetDefaultSource(): ContentNewsletterSubscriptionSource {
  return CONTENT_NEWSLETTER_SUBSCRIPTION.DEFAULTS.SOURCE as ContentNewsletterSubscriptionSource;
}

export function contentNewsletterSubscriptionGetDefaultChannel(): ContentNewsletterSubscriptionChannel {
  return CONTENT_NEWSLETTER_SUBSCRIPTION.DEFAULTS.CHANNEL as ContentNewsletterSubscriptionChannel;
}

export function contentNewsletterSubscriptionIsValidType(
  type: string
): type is ContentNewsletterSubscriptionType {
  return Object.values(CONTENT_NEWSLETTER_SUBSCRIPTION.TYPES).includes(
    type as ContentNewsletterSubscriptionType
  );
}

export function contentNewsletterSubscriptionIsValidStatus(
  status: string
): status is ContentNewsletterSubscriptionStatus {
  return Object.values(CONTENT_NEWSLETTER_SUBSCRIPTION.STATUSES).includes(
    status as ContentNewsletterSubscriptionStatus
  );
}

export function contentNewsletterSubscriptionIsValidSource(
  source: string
): source is ContentNewsletterSubscriptionSource {
  return Object.values(CONTENT_NEWSLETTER_SUBSCRIPTION.SOURCES).includes(
    source as ContentNewsletterSubscriptionSource
  );
}
