/**
 * Newsletter Constants
 * Configuration for newsletters, campaigns, and email marketing
 */

export const CONTENT_NEWSLETTER = {
  // Newsletter Types
  TYPES: {
    STANDARD: 'standard',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    TRANSACTIONAL: 'transactional',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    EVENT: 'event',
    ANNOUNCEMENT: 'announcement',
    DIGEST: 'digest',
    CUSTOM: 'custom',
  } as const,

  // Newsletter Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    QUEUED: 'queued',
    SENDING: 'sending',
    SENT: 'sent',
    SCHEDULED: 'scheduled',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Newsletter Formats
  FORMATS: {
    TEXT: 'text',
    HTML: 'html',
    RICH: 'rich',
    PLAIN: 'plain',
    AMP: 'amp',
    CUSTOM: 'custom',
  } as const,

  // Newsletter Templates
  TEMPLATES: {
    DEFAULT: 'default',
    MODERN: 'modern',
    MINIMAL: 'minimal',
    PROMOTIONAL: 'promotional',
    NEWSLETTER: 'newsletter',
    DIGEST: 'digest',
    BLOG: 'blog',
    PRODUCT: 'product',
    EVENT: 'event',
    CUSTOM: 'custom',
  } as const,

  // Newsletter Frequencies
  FREQUENCIES: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  } as const,

  // Newsletter Sending Days
  SENDING_DAYS: {
    MONDAY: 'monday',
    TUESDAY: 'tuesday',
    WEDNESDAY: 'wednesday',
    THURSDAY: 'thursday',
    FRIDAY: 'friday',
    SATURDAY: 'saturday',
    SUNDAY: 'sunday',
  } as const,

  // Newsletter Timezones
  TIMEZONES: {
    UTC: 'UTC',
    BD: 'Asia/Dhaka',
    US_EAST: 'America/New_York',
    US_WEST: 'America/Los_Angeles',
    EU_LONDON: 'Europe/London',
    EU_PARIS: 'Europe/Paris',
    ASIA_DUBAI: 'Asia/Dubai',
    ASIA_SINGAPORE: 'Asia/Singapore',
    ASIA_TOKYO: 'Asia/Tokyo',
  } as const,

  // Newsletter Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'html',
    TEMPLATE: 'default',
    FREQUENCY: 'weekly',
    SENDING_DAY: 'monday',
    SENDING_TIME: '09:00',
    TIMEZONE: 'Asia/Dhaka',
    MAX_RECIPIENTS: 10000,
    PREVIEW_LENGTH: 200,
    BATCH_SIZE: 1000,
  } as const,

  // Newsletter Limits
  LIMITS: {
    MAX_SUBJECT_LENGTH: 100,
    MAX_PREVIEW_LENGTH: 200,
    MAX_CONTENT_LENGTH: 50000,
    MAX_RECIPIENTS: 100000,
    MAX_ATTACHMENTS: 10,
    MAX_IMAGES: 50,
    MAX_BATCH_SIZE: 5000,
  } as const,

  // Newsletter Analytics
  ANALYTICS: {
    OPEN: 'open',
    CLICK: 'click',
    BOUNCE: 'bounce',
    UNSUBSCRIBE: 'unsubscribe',
    SPAM: 'spam',
    FORWARD: 'forward',
    COMPLAINT: 'complaint',
  } as const,

  // Newsletter Bounce Types
  BOUNCE_TYPES: {
    SOFT: 'soft',
    HARD: 'hard',
    TRANSIENT: 'transient',
    PERMANENT: 'permanent',
  } as const,
} as const;

// Newsletter Types
export type ContentNewsletterType =
  (typeof CONTENT_NEWSLETTER.TYPES)[keyof typeof CONTENT_NEWSLETTER.TYPES];

// Newsletter Statuses
export type ContentNewsletterStatus =
  (typeof CONTENT_NEWSLETTER.STATUSES)[keyof typeof CONTENT_NEWSLETTER.STATUSES];

// Newsletter Formats
export type ContentNewsletterFormat =
  (typeof CONTENT_NEWSLETTER.FORMATS)[keyof typeof CONTENT_NEWSLETTER.FORMATS];

// Newsletter Templates
export type ContentNewsletterTemplate =
  (typeof CONTENT_NEWSLETTER.TEMPLATES)[keyof typeof CONTENT_NEWSLETTER.TEMPLATES];

// Newsletter Frequencies
export type ContentNewsletterFrequency =
  (typeof CONTENT_NEWSLETTER.FREQUENCIES)[keyof typeof CONTENT_NEWSLETTER.FREQUENCIES];

// Newsletter Sending Days
export type ContentNewsletterSendingDay =
  (typeof CONTENT_NEWSLETTER.SENDING_DAYS)[keyof typeof CONTENT_NEWSLETTER.SENDING_DAYS];

// Newsletter Timezones
export type ContentNewsletterTimezone =
  (typeof CONTENT_NEWSLETTER.TIMEZONES)[keyof typeof CONTENT_NEWSLETTER.TIMEZONES];

// Newsletter Analytics
export type ContentNewsletterAnalytic =
  (typeof CONTENT_NEWSLETTER.ANALYTICS)[keyof typeof CONTENT_NEWSLETTER.ANALYTICS];

// Newsletter Bounce Types
export type ContentNewsletterBounceType =
  (typeof CONTENT_NEWSLETTER.BOUNCE_TYPES)[keyof typeof CONTENT_NEWSLETTER.BOUNCE_TYPES];

// Utility Functions
export function contentNewsletterGetTypeLabel(type: ContentNewsletterType): string {
  const labels: Record<ContentNewsletterType, string> = {
    [CONTENT_NEWSLETTER.TYPES.STANDARD]: 'Standard Newsletter',
    [CONTENT_NEWSLETTER.TYPES.PROMOTIONAL]: 'Promotional Newsletter',
    [CONTENT_NEWSLETTER.TYPES.INFORMATIONAL]: 'Informational Newsletter',
    [CONTENT_NEWSLETTER.TYPES.TRANSACTIONAL]: 'Transactional Newsletter',
    [CONTENT_NEWSLETTER.TYPES.WEEKLY]: 'Weekly Newsletter',
    [CONTENT_NEWSLETTER.TYPES.MONTHLY]: 'Monthly Newsletter',
    [CONTENT_NEWSLETTER.TYPES.QUARTERLY]: 'Quarterly Newsletter',
    [CONTENT_NEWSLETTER.TYPES.EVENT]: 'Event Newsletter',
    [CONTENT_NEWSLETTER.TYPES.ANNOUNCEMENT]: 'Announcement Newsletter',
    [CONTENT_NEWSLETTER.TYPES.DIGEST]: 'Digest Newsletter',
    [CONTENT_NEWSLETTER.TYPES.CUSTOM]: 'Custom Newsletter',
  };
  return labels[type] || 'Unknown Newsletter Type';
}

export function contentNewsletterGetStatusLabel(status: ContentNewsletterStatus): string {
  const labels: Record<ContentNewsletterStatus, string> = {
    [CONTENT_NEWSLETTER.STATUSES.DRAFT]: 'Draft',
    [CONTENT_NEWSLETTER.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_NEWSLETTER.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_NEWSLETTER.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_NEWSLETTER.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_NEWSLETTER.STATUSES.APPROVED]: 'Approved',
    [CONTENT_NEWSLETTER.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_NEWSLETTER.STATUSES.QUEUED]: 'Queued',
    [CONTENT_NEWSLETTER.STATUSES.SENDING]: 'Sending',
    [CONTENT_NEWSLETTER.STATUSES.SENT]: 'Sent',
    [CONTENT_NEWSLETTER.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_NEWSLETTER.STATUSES.PAUSED]: 'Paused',
    [CONTENT_NEWSLETTER.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_NEWSLETTER.STATUSES.FAILED]: 'Failed',
    [CONTENT_NEWSLETTER.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_NEWSLETTER.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentNewsletterGetFormatLabel(format: ContentNewsletterFormat): string {
  const labels: Record<ContentNewsletterFormat, string> = {
    [CONTENT_NEWSLETTER.FORMATS.TEXT]: 'Plain Text',
    [CONTENT_NEWSLETTER.FORMATS.HTML]: 'HTML',
    [CONTENT_NEWSLETTER.FORMATS.RICH]: 'Rich Text',
    [CONTENT_NEWSLETTER.FORMATS.PLAIN]: 'Plain Text',
    [CONTENT_NEWSLETTER.FORMATS.AMP]: 'AMP Email',
    [CONTENT_NEWSLETTER.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentNewsletterGetTemplateLabel(template: ContentNewsletterTemplate): string {
  const labels: Record<ContentNewsletterTemplate, string> = {
    [CONTENT_NEWSLETTER.TEMPLATES.DEFAULT]: 'Default Template',
    [CONTENT_NEWSLETTER.TEMPLATES.MODERN]: 'Modern Template',
    [CONTENT_NEWSLETTER.TEMPLATES.MINIMAL]: 'Minimal Template',
    [CONTENT_NEWSLETTER.TEMPLATES.PROMOTIONAL]: 'Promotional Template',
    [CONTENT_NEWSLETTER.TEMPLATES.NEWSLETTER]: 'Newsletter Template',
    [CONTENT_NEWSLETTER.TEMPLATES.DIGEST]: 'Digest Template',
    [CONTENT_NEWSLETTER.TEMPLATES.BLOG]: 'Blog Template',
    [CONTENT_NEWSLETTER.TEMPLATES.PRODUCT]: 'Product Template',
    [CONTENT_NEWSLETTER.TEMPLATES.EVENT]: 'Event Template',
    [CONTENT_NEWSLETTER.TEMPLATES.CUSTOM]: 'Custom Template',
  };
  return labels[template] || 'Unknown Template';
}

export function contentNewsletterGetFrequencyLabel(frequency: ContentNewsletterFrequency): string {
  const labels: Record<ContentNewsletterFrequency, string> = {
    [CONTENT_NEWSLETTER.FREQUENCIES.ONCE]: 'Once',
    [CONTENT_NEWSLETTER.FREQUENCIES.DAILY]: 'Daily',
    [CONTENT_NEWSLETTER.FREQUENCIES.WEEKLY]: 'Weekly',
    [CONTENT_NEWSLETTER.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [CONTENT_NEWSLETTER.FREQUENCIES.MONTHLY]: 'Monthly',
    [CONTENT_NEWSLETTER.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [CONTENT_NEWSLETTER.FREQUENCIES.BI_ANNUAL]: 'Bi-Annual',
    [CONTENT_NEWSLETTER.FREQUENCIES.ANNUAL]: 'Annual',
    [CONTENT_NEWSLETTER.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function contentNewsletterGetSendingDayLabel(day: ContentNewsletterSendingDay): string {
  const labels: Record<ContentNewsletterSendingDay, string> = {
    [CONTENT_NEWSLETTER.SENDING_DAYS.MONDAY]: 'Monday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.TUESDAY]: 'Tuesday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.WEDNESDAY]: 'Wednesday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.THURSDAY]: 'Thursday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.FRIDAY]: 'Friday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.SATURDAY]: 'Saturday',
    [CONTENT_NEWSLETTER.SENDING_DAYS.SUNDAY]: 'Sunday',
  };
  return labels[day] || 'Unknown Day';
}

export function contentNewsletterGetAnalyticLabel(analytic: ContentNewsletterAnalytic): string {
  const labels: Record<ContentNewsletterAnalytic, string> = {
    [CONTENT_NEWSLETTER.ANALYTICS.OPEN]: 'Open Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.CLICK]: 'Click Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.BOUNCE]: 'Bounce Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.UNSUBSCRIBE]: 'Unsubscribe Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.SPAM]: 'Spam Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.FORWARD]: 'Forward Rate',
    [CONTENT_NEWSLETTER.ANALYTICS.COMPLAINT]: 'Complaint Rate',
  };
  return labels[analytic] || 'Unknown Analytic';
}

export function contentNewsletterGetBounceTypeLabel(
  bounceType: ContentNewsletterBounceType
): string {
  const labels: Record<ContentNewsletterBounceType, string> = {
    [CONTENT_NEWSLETTER.BOUNCE_TYPES.SOFT]: 'Soft Bounce',
    [CONTENT_NEWSLETTER.BOUNCE_TYPES.HARD]: 'Hard Bounce',
    [CONTENT_NEWSLETTER.BOUNCE_TYPES.TRANSIENT]: 'Transient Bounce',
    [CONTENT_NEWSLETTER.BOUNCE_TYPES.PERMANENT]: 'Permanent Bounce',
  };
  return labels[bounceType] || 'Unknown Bounce Type';
}

export function contentNewsletterIsPublished(status: ContentNewsletterStatus): boolean {
  const publishedStatuses: ContentNewsletterStatus[] = [
    CONTENT_NEWSLETTER.STATUSES.SENT,
    CONTENT_NEWSLETTER.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentNewsletterIsEditable(status: ContentNewsletterStatus): boolean {
  const editableStatuses: ContentNewsletterStatus[] = [
    CONTENT_NEWSLETTER.STATUSES.DRAFT,
    CONTENT_NEWSLETTER.STATUSES.PENDING_REVIEW,
    CONTENT_NEWSLETTER.STATUSES.IN_REVIEW,
    CONTENT_NEWSLETTER.STATUSES.REVIEWED,
    CONTENT_NEWSLETTER.STATUSES.PENDING_APPROVAL,
    CONTENT_NEWSLETTER.STATUSES.REJECTED,
    CONTENT_NEWSLETTER.STATUSES.PAUSED,
  ];
  return editableStatuses.includes(status);
}

export function contentNewsletterIsSending(status: ContentNewsletterStatus): boolean {
  const sendingStatuses: ContentNewsletterStatus[] = [
    CONTENT_NEWSLETTER.STATUSES.QUEUED,
    CONTENT_NEWSLETTER.STATUSES.SENDING,
  ];
  return sendingStatuses.includes(status);
}

export function contentNewsletterGetDefaultStatus(): ContentNewsletterStatus {
  return CONTENT_NEWSLETTER.DEFAULTS.STATUS as ContentNewsletterStatus;
}

export function contentNewsletterGetDefaultFormat(): ContentNewsletterFormat {
  return CONTENT_NEWSLETTER.DEFAULTS.FORMAT as ContentNewsletterFormat;
}

export function contentNewsletterGetDefaultTemplate(): ContentNewsletterTemplate {
  return CONTENT_NEWSLETTER.DEFAULTS.TEMPLATE as ContentNewsletterTemplate;
}

export function contentNewsletterGetDefaultFrequency(): ContentNewsletterFrequency {
  return CONTENT_NEWSLETTER.DEFAULTS.FREQUENCY as ContentNewsletterFrequency;
}

export function contentNewsletterGetDefaultSendingDay(): ContentNewsletterSendingDay {
  return CONTENT_NEWSLETTER.DEFAULTS.SENDING_DAY as ContentNewsletterSendingDay;
}

export function contentNewsletterGetDefaultTimezone(): ContentNewsletterTimezone {
  return CONTENT_NEWSLETTER.DEFAULTS.TIMEZONE as ContentNewsletterTimezone;
}

export function contentNewsletterGetMaxSubjectLength(): number {
  return CONTENT_NEWSLETTER.LIMITS.MAX_SUBJECT_LENGTH;
}

export function contentNewsletterGetMaxPreviewLength(): number {
  return CONTENT_NEWSLETTER.LIMITS.MAX_PREVIEW_LENGTH;
}

export function contentNewsletterGetMaxContentLength(): number {
  return CONTENT_NEWSLETTER.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentNewsletterGetMaxRecipients(): number {
  return CONTENT_NEWSLETTER.LIMITS.MAX_RECIPIENTS;
}

export function contentNewsletterIsValidType(type: string): type is ContentNewsletterType {
  return Object.values(CONTENT_NEWSLETTER.TYPES).includes(type as ContentNewsletterType);
}

export function contentNewsletterIsValidStatus(status: string): status is ContentNewsletterStatus {
  return Object.values(CONTENT_NEWSLETTER.STATUSES).includes(status as ContentNewsletterStatus);
}

export function contentNewsletterIsValidFormat(format: string): format is ContentNewsletterFormat {
  return Object.values(CONTENT_NEWSLETTER.FORMATS).includes(format as ContentNewsletterFormat);
}

export function contentNewsletterIsValidFrequency(
  frequency: string
): frequency is ContentNewsletterFrequency {
  return Object.values(CONTENT_NEWSLETTER.FREQUENCIES).includes(
    frequency as ContentNewsletterFrequency
  );
}
