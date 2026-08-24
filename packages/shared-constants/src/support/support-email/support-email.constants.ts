/**
 * Support Email Constants
 * Configuration for support emails
 */

export const SUPPORT_EMAIL = {
  // Email Types
  TYPES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    AUTOMATED: 'automated',
    TEMPLATE: 'template',
    REPLY: 'reply',
    FORWARD: 'forward',
  } as const,

  // Email Statuses
  STATUS: {
    DRAFT: 'draft',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    BOUNCED: 'bounced',
    SPAM: 'spam',
  } as const,

  // Email Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Email Categories
  CATEGORIES: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // Email Formats
  FORMATS: {
    PLAIN: 'plain',
    HTML: 'html',
    MARKDOWN: 'markdown',
  } as const,

  // Email Limits
  LIMITS: {
    MAX_TO_RECIPIENTS: 50,
    MAX_CC_RECIPIENTS: 20,
    MAX_BCC_RECIPIENTS: 20,
    MAX_SUBJECT_LENGTH: 200,
    MAX_BODY_LENGTH: 50000,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE: 10485760, // 10MB
  } as const,
} as const;

// Email Types
export type SupportEmailType = (typeof SUPPORT_EMAIL.TYPES)[keyof typeof SUPPORT_EMAIL.TYPES];

// Email Statuses
export type SupportEmailStatus = (typeof SUPPORT_EMAIL.STATUS)[keyof typeof SUPPORT_EMAIL.STATUS];

// Email Priorities
export type SupportEmailPriority =
  (typeof SUPPORT_EMAIL.PRIORITIES)[keyof typeof SUPPORT_EMAIL.PRIORITIES];

// Email Categories
export type SupportEmailCategory =
  (typeof SUPPORT_EMAIL.CATEGORIES)[keyof typeof SUPPORT_EMAIL.CATEGORIES];

// Email Formats
export type SupportEmailFormat = (typeof SUPPORT_EMAIL.FORMATS)[keyof typeof SUPPORT_EMAIL.FORMATS];

// Utility Functions
export function supportEmailGetTypeLabel(type: SupportEmailType): string {
  const labels: Record<SupportEmailType, string> = {
    [SUPPORT_EMAIL.TYPES.INBOUND]: 'Inbound',
    [SUPPORT_EMAIL.TYPES.OUTBOUND]: 'Outbound',
    [SUPPORT_EMAIL.TYPES.AUTOMATED]: 'Automated',
    [SUPPORT_EMAIL.TYPES.TEMPLATE]: 'Template',
    [SUPPORT_EMAIL.TYPES.REPLY]: 'Reply',
    [SUPPORT_EMAIL.TYPES.FORWARD]: 'Forward',
  };
  return labels[type] || 'Unknown';
}

export function supportEmailGetStatusLabel(status: SupportEmailStatus): string {
  const labels: Record<SupportEmailStatus, string> = {
    [SUPPORT_EMAIL.STATUS.DRAFT]: 'Draft',
    [SUPPORT_EMAIL.STATUS.SENT]: 'Sent',
    [SUPPORT_EMAIL.STATUS.DELIVERED]: 'Delivered',
    [SUPPORT_EMAIL.STATUS.READ]: 'Read',
    [SUPPORT_EMAIL.STATUS.FAILED]: 'Failed',
    [SUPPORT_EMAIL.STATUS.PENDING]: 'Pending',
    [SUPPORT_EMAIL.STATUS.SCHEDULED]: 'Scheduled',
    [SUPPORT_EMAIL.STATUS.BOUNCED]: 'Bounced',
    [SUPPORT_EMAIL.STATUS.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown';
}

export function supportEmailGetPriorityLabel(priority: SupportEmailPriority): string {
  const labels: Record<SupportEmailPriority, string> = {
    [SUPPORT_EMAIL.PRIORITIES.HIGH]: 'High',
    [SUPPORT_EMAIL.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_EMAIL.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportEmailGetCategoryLabel(category: SupportEmailCategory): string {
  const labels: Record<SupportEmailCategory, string> = {
    [SUPPORT_EMAIL.CATEGORIES.SUPPORT]: 'Support',
    [SUPPORT_EMAIL.CATEGORIES.SALES]: 'Sales',
    [SUPPORT_EMAIL.CATEGORIES.BILLING]: 'Billing',
    [SUPPORT_EMAIL.CATEGORIES.TECHNICAL]: 'Technical',
    [SUPPORT_EMAIL.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportEmailGetFormatLabel(format: SupportEmailFormat): string {
  const labels: Record<SupportEmailFormat, string> = {
    [SUPPORT_EMAIL.FORMATS.PLAIN]: 'Plain Text',
    [SUPPORT_EMAIL.FORMATS.HTML]: 'HTML',
    [SUPPORT_EMAIL.FORMATS.MARKDOWN]: 'Markdown',
  };
  return labels[format] || 'Unknown';
}

export function supportEmailIsSent(status: SupportEmailStatus): boolean {
  return (
    status === SUPPORT_EMAIL.STATUS.SENT ||
    status === SUPPORT_EMAIL.STATUS.DELIVERED ||
    status === SUPPORT_EMAIL.STATUS.READ
  );
}

export function supportEmailIsFailed(status: SupportEmailStatus): boolean {
  return status === SUPPORT_EMAIL.STATUS.FAILED || status === SUPPORT_EMAIL.STATUS.BOUNCED;
}
