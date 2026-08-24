/**
 * Support SMS Constants
 * Configuration for support SMS messages
 */

export const SUPPORT_SMS = {
  // SMS Types
  TYPES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    AUTOMATED: 'automated',
    TEMPLATE: 'template',
    REPLY: 'reply',
  } as const,

  // SMS Statuses
  STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
  } as const,

  // SMS Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // SMS Categories
  CATEGORIES: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // SMS Limits
  LIMITS: {
    MAX_LENGTH: 160,
    MAX_UNICODE_LENGTH: 70,
    MAX_CONCATENATED: 10,
    MAX_RECIPIENTS: 100,
    MAX_SMS_PER_DAY: 1000,
  } as const,

  // SMS Providers
  PROVIDERS: {
    TWILIO: 'twilio',
    VONAGE: 'vonage',
    SMS_SERVER: 'sms_server',
    CUSTOM: 'custom',
  } as const,
} as const;

// SMS Types
export type SupportSMSType = (typeof SUPPORT_SMS.TYPES)[keyof typeof SUPPORT_SMS.TYPES];

// SMS Statuses
export type SupportSMSStatus = (typeof SUPPORT_SMS.STATUS)[keyof typeof SUPPORT_SMS.STATUS];

// SMS Priorities
export type SupportSMSPriority =
  (typeof SUPPORT_SMS.PRIORITIES)[keyof typeof SUPPORT_SMS.PRIORITIES];

// SMS Categories
export type SupportSMSCategory =
  (typeof SUPPORT_SMS.CATEGORIES)[keyof typeof SUPPORT_SMS.CATEGORIES];

// SMS Providers
export type SupportSMSProvider = (typeof SUPPORT_SMS.PROVIDERS)[keyof typeof SUPPORT_SMS.PROVIDERS];

// Utility Functions
export function supportSMSGetTypeLabel(type: SupportSMSType): string {
  const labels: Record<SupportSMSType, string> = {
    [SUPPORT_SMS.TYPES.INBOUND]: 'Inbound',
    [SUPPORT_SMS.TYPES.OUTBOUND]: 'Outbound',
    [SUPPORT_SMS.TYPES.AUTOMATED]: 'Automated',
    [SUPPORT_SMS.TYPES.TEMPLATE]: 'Template',
    [SUPPORT_SMS.TYPES.REPLY]: 'Reply',
  };
  return labels[type] || 'Unknown';
}

export function supportSMSGetStatusLabel(status: SupportSMSStatus): string {
  const labels: Record<SupportSMSStatus, string> = {
    [SUPPORT_SMS.STATUS.PENDING]: 'Pending',
    [SUPPORT_SMS.STATUS.SENT]: 'Sent',
    [SUPPORT_SMS.STATUS.DELIVERED]: 'Delivered',
    [SUPPORT_SMS.STATUS.READ]: 'Read',
    [SUPPORT_SMS.STATUS.FAILED]: 'Failed',
    [SUPPORT_SMS.STATUS.SCHEDULED]: 'Scheduled',
    [SUPPORT_SMS.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function supportSMSGetPriorityLabel(priority: SupportSMSPriority): string {
  const labels: Record<SupportSMSPriority, string> = {
    [SUPPORT_SMS.PRIORITIES.HIGH]: 'High',
    [SUPPORT_SMS.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_SMS.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportSMSGetCategoryLabel(category: SupportSMSCategory): string {
  const labels: Record<SupportSMSCategory, string> = {
    [SUPPORT_SMS.CATEGORIES.SUPPORT]: 'Support',
    [SUPPORT_SMS.CATEGORIES.SALES]: 'Sales',
    [SUPPORT_SMS.CATEGORIES.BILLING]: 'Billing',
    [SUPPORT_SMS.CATEGORIES.TECHNICAL]: 'Technical',
    [SUPPORT_SMS.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportSMSIsSent(status: SupportSMSStatus): boolean {
  return (
    status === SUPPORT_SMS.STATUS.SENT ||
    status === SUPPORT_SMS.STATUS.DELIVERED ||
    status === SUPPORT_SMS.STATUS.READ
  );
}

export function supportSMSIsFailed(status: SupportSMSStatus): boolean {
  return status === SUPPORT_SMS.STATUS.FAILED;
}

export function supportSMSGetProviderLabel(provider: SupportSMSProvider): string {
  const labels: Record<SupportSMSProvider, string> = {
    [SUPPORT_SMS.PROVIDERS.TWILIO]: 'Twilio',
    [SUPPORT_SMS.PROVIDERS.VONAGE]: 'Vonage',
    [SUPPORT_SMS.PROVIDERS.SMS_SERVER]: 'SMS Server',
    [SUPPORT_SMS.PROVIDERS.CUSTOM]: 'Custom',
  };
  return labels[provider] || 'Unknown';
}
