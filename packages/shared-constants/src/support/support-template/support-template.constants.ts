/**
 * Support Template Constants
 * Configuration for support templates
 */

export const SUPPORT_TEMPLATE = {
  // Template Types
  TYPES: {
    EMAIL: 'email',
    TICKET: 'ticket',
    RESPONSE: 'response',
    NOTE: 'note',
    INTERNAL: 'internal',
    PUBLIC: 'public',
  } as const,

  // Template Statuses
  STATUS: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Template Categories
  CATEGORIES: {
    GREETING: 'greeting',
    FAREWELL: 'farewell',
    ACKNOWLEDGMENT: 'acknowledgment',
    RESOLUTION: 'resolution',
    ESCALATION: 'escalation',
    FOLLOW_UP: 'follow_up',
    FEEDBACK: 'feedback',
    COMPLAINT: 'complaint',
    GENERAL: 'general',
  } as const,

  // Template Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
    TEXT: 'text',
  } as const,

  // Template Variables
  VARIABLES: {
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_EMAIL: 'customer_email',
    TICKET_ID: 'ticket_id',
    TICKET_TITLE: 'ticket_title',
    TICKET_STATUS: 'ticket_status',
    TICKET_PRIORITY: 'ticket_priority',
    AGENT_NAME: 'agent_name',
    AGENT_EMAIL: 'agent_email',
    TEAM_NAME: 'team_name',
    DEPARTMENT_NAME: 'department_name',
    RESOLUTION_TIME: 'resolution_time',
    RESPONSE_TIME: 'response_time',
    DATE: 'date',
    TIME: 'time',
    LINK: 'link',
  } as const,

  // Template Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_CONTENT_LENGTH: 10000,
    MAX_VARIABLES: 20,
    MAX_TAGS: 10,
  } as const,
} as const;

// Template Types
export type SupportTemplateType =
  (typeof SUPPORT_TEMPLATE.TYPES)[keyof typeof SUPPORT_TEMPLATE.TYPES];

// Template Statuses
export type SupportTemplateStatus =
  (typeof SUPPORT_TEMPLATE.STATUS)[keyof typeof SUPPORT_TEMPLATE.STATUS];

// Template Categories
export type SupportTemplateCategory =
  (typeof SUPPORT_TEMPLATE.CATEGORIES)[keyof typeof SUPPORT_TEMPLATE.CATEGORIES];

// Template Formats
export type SupportTemplateFormat =
  (typeof SUPPORT_TEMPLATE.FORMATS)[keyof typeof SUPPORT_TEMPLATE.FORMATS];

// Template Variables
export type SupportTemplateVariable =
  (typeof SUPPORT_TEMPLATE.VARIABLES)[keyof typeof SUPPORT_TEMPLATE.VARIABLES];

// Utility Functions
export function supportTemplateGetTypeLabel(type: SupportTemplateType): string {
  const labels: Record<SupportTemplateType, string> = {
    [SUPPORT_TEMPLATE.TYPES.EMAIL]: 'Email Template',
    [SUPPORT_TEMPLATE.TYPES.TICKET]: 'Ticket Template',
    [SUPPORT_TEMPLATE.TYPES.RESPONSE]: 'Response Template',
    [SUPPORT_TEMPLATE.TYPES.NOTE]: 'Note Template',
    [SUPPORT_TEMPLATE.TYPES.INTERNAL]: 'Internal Template',
    [SUPPORT_TEMPLATE.TYPES.PUBLIC]: 'Public Template',
  };
  return labels[type] || 'Unknown';
}

export function supportTemplateGetStatusLabel(status: SupportTemplateStatus): string {
  const labels: Record<SupportTemplateStatus, string> = {
    [SUPPORT_TEMPLATE.STATUS.DRAFT]: 'Draft',
    [SUPPORT_TEMPLATE.STATUS.ACTIVE]: 'Active',
    [SUPPORT_TEMPLATE.STATUS.PAUSED]: 'Paused',
    [SUPPORT_TEMPLATE.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportTemplateGetCategoryLabel(category: SupportTemplateCategory): string {
  const labels: Record<SupportTemplateCategory, string> = {
    [SUPPORT_TEMPLATE.CATEGORIES.GREETING]: 'Greeting',
    [SUPPORT_TEMPLATE.CATEGORIES.FAREWELL]: 'Farewell',
    [SUPPORT_TEMPLATE.CATEGORIES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_TEMPLATE.CATEGORIES.RESOLUTION]: 'Resolution',
    [SUPPORT_TEMPLATE.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_TEMPLATE.CATEGORIES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_TEMPLATE.CATEGORIES.FEEDBACK]: 'Feedback',
    [SUPPORT_TEMPLATE.CATEGORIES.COMPLAINT]: 'Complaint',
    [SUPPORT_TEMPLATE.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportTemplateGetFormatLabel(format: SupportTemplateFormat): string {
  const labels: Record<SupportTemplateFormat, string> = {
    [SUPPORT_TEMPLATE.FORMATS.PLAIN]: 'Plain Text',
    [SUPPORT_TEMPLATE.FORMATS.MARKDOWN]: 'Markdown',
    [SUPPORT_TEMPLATE.FORMATS.HTML]: 'HTML',
    [SUPPORT_TEMPLATE.FORMATS.TEXT]: 'Text',
  };
  return labels[format] || 'Unknown';
}

export function supportTemplateIsActive(status: SupportTemplateStatus): boolean {
  return status === SUPPORT_TEMPLATE.STATUS.ACTIVE;
}

export function supportTemplateGetVariableLabel(variable: SupportTemplateVariable): string {
  const labels: Record<SupportTemplateVariable, string> = {
    [SUPPORT_TEMPLATE.VARIABLES.CUSTOMER_NAME]: 'Customer Name',
    [SUPPORT_TEMPLATE.VARIABLES.CUSTOMER_EMAIL]: 'Customer Email',
    [SUPPORT_TEMPLATE.VARIABLES.TICKET_ID]: 'Ticket ID',
    [SUPPORT_TEMPLATE.VARIABLES.TICKET_TITLE]: 'Ticket Title',
    [SUPPORT_TEMPLATE.VARIABLES.TICKET_STATUS]: 'Ticket Status',
    [SUPPORT_TEMPLATE.VARIABLES.TICKET_PRIORITY]: 'Ticket Priority',
    [SUPPORT_TEMPLATE.VARIABLES.AGENT_NAME]: 'Agent Name',
    [SUPPORT_TEMPLATE.VARIABLES.AGENT_EMAIL]: 'Agent Email',
    [SUPPORT_TEMPLATE.VARIABLES.TEAM_NAME]: 'Team Name',
    [SUPPORT_TEMPLATE.VARIABLES.DEPARTMENT_NAME]: 'Department Name',
    [SUPPORT_TEMPLATE.VARIABLES.RESOLUTION_TIME]: 'Resolution Time',
    [SUPPORT_TEMPLATE.VARIABLES.RESPONSE_TIME]: 'Response Time',
    [SUPPORT_TEMPLATE.VARIABLES.DATE]: 'Date',
    [SUPPORT_TEMPLATE.VARIABLES.TIME]: 'Time',
    [SUPPORT_TEMPLATE.VARIABLES.LINK]: 'Link',
  };
  return labels[variable] || 'Unknown';
}
