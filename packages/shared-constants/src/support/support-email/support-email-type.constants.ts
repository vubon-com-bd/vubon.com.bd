/**
 * Support Email Type Constants
 * Types of support emails
 */

export const SUPPORT_EMAIL_TYPE = {
  // Email Categories
  CATEGORIES: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // Email Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
  } as const,

  // Email Channels
  CHANNELS: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    GENERAL: 'general',
  } as const,

  // Email Templates
  TEMPLATES: {
    WELCOME: 'welcome',
    ACKNOWLEDGMENT: 'acknowledgment',
    RESOLUTION: 'resolution',
    ESCALATION: 'escalation',
    FOLLOW_UP: 'follow_up',
    FEEDBACK: 'feedback',
    SURVEY: 'survey',
    NEWSLETTER: 'newsletter',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
  } as const,

  // Email Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Email Categories
export type SupportEmailTypeCategory =
  (typeof SUPPORT_EMAIL_TYPE.CATEGORIES)[keyof typeof SUPPORT_EMAIL_TYPE.CATEGORIES];

// Email Scopes
export type SupportEmailTypeScope =
  (typeof SUPPORT_EMAIL_TYPE.SCOPES)[keyof typeof SUPPORT_EMAIL_TYPE.SCOPES];

// Email Channels
export type SupportEmailTypeChannel =
  (typeof SUPPORT_EMAIL_TYPE.CHANNELS)[keyof typeof SUPPORT_EMAIL_TYPE.CHANNELS];

// Email Templates
export type SupportEmailTypeTemplate =
  (typeof SUPPORT_EMAIL_TYPE.TEMPLATES)[keyof typeof SUPPORT_EMAIL_TYPE.TEMPLATES];

// Email Priorities
export type SupportEmailTypePriority =
  (typeof SUPPORT_EMAIL_TYPE.PRIORITIES)[keyof typeof SUPPORT_EMAIL_TYPE.PRIORITIES];

// Utility Functions
export function supportEmailTypeGetCategoryLabel(category: SupportEmailTypeCategory): string {
  const labels: Record<SupportEmailTypeCategory, string> = {
    [SUPPORT_EMAIL_TYPE.CATEGORIES.SUPPORT]: 'Support',
    [SUPPORT_EMAIL_TYPE.CATEGORIES.SALES]: 'Sales',
    [SUPPORT_EMAIL_TYPE.CATEGORIES.BILLING]: 'Billing',
    [SUPPORT_EMAIL_TYPE.CATEGORIES.TECHNICAL]: 'Technical',
    [SUPPORT_EMAIL_TYPE.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportEmailTypeGetScopeLabel(scope: SupportEmailTypeScope): string {
  const labels: Record<SupportEmailTypeScope, string> = {
    [SUPPORT_EMAIL_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_EMAIL_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_EMAIL_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_EMAIL_TYPE.SCOPES.AGENT]: 'Agent',
  };
  return labels[scope] || 'Unknown';
}

export function supportEmailTypeGetChannelLabel(channel: SupportEmailTypeChannel): string {
  const labels: Record<SupportEmailTypeChannel, string> = {
    [SUPPORT_EMAIL_TYPE.CHANNELS.SUPPORT]: 'Support',
    [SUPPORT_EMAIL_TYPE.CHANNELS.SALES]: 'Sales',
    [SUPPORT_EMAIL_TYPE.CHANNELS.BILLING]: 'Billing',
    [SUPPORT_EMAIL_TYPE.CHANNELS.GENERAL]: 'General',
  };
  return labels[channel] || 'Unknown';
}

export function supportEmailTypeGetTemplateLabel(template: SupportEmailTypeTemplate): string {
  const labels: Record<SupportEmailTypeTemplate, string> = {
    [SUPPORT_EMAIL_TYPE.TEMPLATES.WELCOME]: 'Welcome',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.RESOLUTION]: 'Resolution',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.ESCALATION]: 'Escalation',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.FEEDBACK]: 'Feedback',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.SURVEY]: 'Survey',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.NEWSLETTER]: 'Newsletter',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.PROMOTIONAL]: 'Promotional',
    [SUPPORT_EMAIL_TYPE.TEMPLATES.TRANSACTIONAL]: 'Transactional',
  };
  return labels[template] || 'Unknown';
}

export function supportEmailTypeGetPriorityLabel(priority: SupportEmailTypePriority): string {
  const labels: Record<SupportEmailTypePriority, string> = {
    [SUPPORT_EMAIL_TYPE.PRIORITIES.HIGH]: 'High',
    [SUPPORT_EMAIL_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_EMAIL_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}
