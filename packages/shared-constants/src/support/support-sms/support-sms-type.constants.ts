/**
 * Support SMS Type Constants
 * Types of support SMS messages
 */

export const SUPPORT_SMS_TYPE = {
  // SMS Categories
  CATEGORIES: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // SMS Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
  } as const,

  // SMS Channels
  CHANNELS: {
    SUPPORT: 'support',
    SALES: 'sales',
    BILLING: 'billing',
    GENERAL: 'general',
  } as const,

  // SMS Templates
  TEMPLATES: {
    WELCOME: 'welcome',
    ACKNOWLEDGMENT: 'acknowledgment',
    RESOLUTION: 'resolution',
    FOLLOW_UP: 'follow_up',
    SURVEY: 'survey',
    PROMOTIONAL: 'promotional',
    TRANSACTIONAL: 'transactional',
  } as const,

  // SMS Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// SMS Categories
export type SupportSMSTypeCategory =
  (typeof SUPPORT_SMS_TYPE.CATEGORIES)[keyof typeof SUPPORT_SMS_TYPE.CATEGORIES];

// SMS Scopes
export type SupportSMSTypeScope =
  (typeof SUPPORT_SMS_TYPE.SCOPES)[keyof typeof SUPPORT_SMS_TYPE.SCOPES];

// SMS Channels
export type SupportSMSTypeChannel =
  (typeof SUPPORT_SMS_TYPE.CHANNELS)[keyof typeof SUPPORT_SMS_TYPE.CHANNELS];

// SMS Templates
export type SupportSMSTypeTemplate =
  (typeof SUPPORT_SMS_TYPE.TEMPLATES)[keyof typeof SUPPORT_SMS_TYPE.TEMPLATES];

// SMS Priorities
export type SupportSMSTypePriority =
  (typeof SUPPORT_SMS_TYPE.PRIORITIES)[keyof typeof SUPPORT_SMS_TYPE.PRIORITIES];

// Utility Functions
export function supportSMSTypeGetCategoryLabel(category: SupportSMSTypeCategory): string {
  const labels: Record<SupportSMSTypeCategory, string> = {
    [SUPPORT_SMS_TYPE.CATEGORIES.SUPPORT]: 'Support',
    [SUPPORT_SMS_TYPE.CATEGORIES.SALES]: 'Sales',
    [SUPPORT_SMS_TYPE.CATEGORIES.BILLING]: 'Billing',
    [SUPPORT_SMS_TYPE.CATEGORIES.TECHNICAL]: 'Technical',
    [SUPPORT_SMS_TYPE.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportSMSTypeGetScopeLabel(scope: SupportSMSTypeScope): string {
  const labels: Record<SupportSMSTypeScope, string> = {
    [SUPPORT_SMS_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_SMS_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_SMS_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_SMS_TYPE.SCOPES.AGENT]: 'Agent',
  };
  return labels[scope] || 'Unknown';
}

export function supportSMSTypeGetChannelLabel(channel: SupportSMSTypeChannel): string {
  const labels: Record<SupportSMSTypeChannel, string> = {
    [SUPPORT_SMS_TYPE.CHANNELS.SUPPORT]: 'Support',
    [SUPPORT_SMS_TYPE.CHANNELS.SALES]: 'Sales',
    [SUPPORT_SMS_TYPE.CHANNELS.BILLING]: 'Billing',
    [SUPPORT_SMS_TYPE.CHANNELS.GENERAL]: 'General',
  };
  return labels[channel] || 'Unknown';
}

export function supportSMSTypeGetTemplateLabel(template: SupportSMSTypeTemplate): string {
  const labels: Record<SupportSMSTypeTemplate, string> = {
    [SUPPORT_SMS_TYPE.TEMPLATES.WELCOME]: 'Welcome',
    [SUPPORT_SMS_TYPE.TEMPLATES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_SMS_TYPE.TEMPLATES.RESOLUTION]: 'Resolution',
    [SUPPORT_SMS_TYPE.TEMPLATES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_SMS_TYPE.TEMPLATES.SURVEY]: 'Survey',
    [SUPPORT_SMS_TYPE.TEMPLATES.PROMOTIONAL]: 'Promotional',
    [SUPPORT_SMS_TYPE.TEMPLATES.TRANSACTIONAL]: 'Transactional',
  };
  return labels[template] || 'Unknown';
}

export function supportSMSTypeGetPriorityLabel(priority: SupportSMSTypePriority): string {
  const labels: Record<SupportSMSTypePriority, string> = {
    [SUPPORT_SMS_TYPE.PRIORITIES.HIGH]: 'High',
    [SUPPORT_SMS_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_SMS_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}
