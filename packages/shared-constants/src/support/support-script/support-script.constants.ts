/**
 * Support Script Constants
 * Configuration for support scripts
 */

export const SUPPORT_SCRIPT = {
  // Script Types
  TYPES: {
    RESPONSE: 'response',
    TICKET: 'ticket',
    EMAIL: 'email',
    CHAT: 'chat',
    PHONE: 'phone',
    INTERNAL: 'internal',
  } as const,

  // Script Statuses
  STATUS: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Script Categories
  CATEGORIES: {
    GREETING: 'greeting',
    FAREWELL: 'farewell',
    ACKNOWLEDGMENT: 'acknowledgment',
    RESOLUTION: 'resolution',
    ESCALATION: 'escalation',
    FOLLOW_UP: 'follow_up',
    FEEDBACK: 'feedback',
    COMPLAINT: 'complaint',
    SALES: 'sales',
    GENERAL: 'general',
  } as const,

  // Script Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
    JSON: 'json',
  } as const,

  // Script Types (expanded)
  SCRIPT_TYPES: {
    RESPONSE: 'response',
    TICKET: 'ticket',
    EMAIL: 'email',
    CHAT: 'chat',
    PHONE: 'phone',
    INTERNAL: 'internal',
  } as const,

  // Script Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_CONTENT_LENGTH: 5000,
    MAX_TAGS: 10,
    MAX_VERSIONS: 50,
  } as const,
} as const;

// Script Types
export type SupportScriptType = (typeof SUPPORT_SCRIPT.TYPES)[keyof typeof SUPPORT_SCRIPT.TYPES];

// Script Statuses
export type SupportScriptStatus =
  (typeof SUPPORT_SCRIPT.STATUS)[keyof typeof SUPPORT_SCRIPT.STATUS];

// Script Categories
export type SupportScriptCategory =
  (typeof SUPPORT_SCRIPT.CATEGORIES)[keyof typeof SUPPORT_SCRIPT.CATEGORIES];

// Script Formats
export type SupportScriptFormat =
  (typeof SUPPORT_SCRIPT.FORMATS)[keyof typeof SUPPORT_SCRIPT.FORMATS];

// Utility Functions
export function supportScriptGetTypeLabel(type: SupportScriptType): string {
  const labels: Record<SupportScriptType, string> = {
    [SUPPORT_SCRIPT.TYPES.RESPONSE]: 'Response Script',
    [SUPPORT_SCRIPT.TYPES.TICKET]: 'Ticket Script',
    [SUPPORT_SCRIPT.TYPES.EMAIL]: 'Email Script',
    [SUPPORT_SCRIPT.TYPES.CHAT]: 'Chat Script',
    [SUPPORT_SCRIPT.TYPES.PHONE]: 'Phone Script',
    [SUPPORT_SCRIPT.TYPES.INTERNAL]: 'Internal Script',
  };
  return labels[type] || 'Unknown';
}

export function supportScriptGetStatusLabel(status: SupportScriptStatus): string {
  const labels: Record<SupportScriptStatus, string> = {
    [SUPPORT_SCRIPT.STATUS.DRAFT]: 'Draft',
    [SUPPORT_SCRIPT.STATUS.ACTIVE]: 'Active',
    [SUPPORT_SCRIPT.STATUS.PAUSED]: 'Paused',
    [SUPPORT_SCRIPT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportScriptGetCategoryLabel(category: SupportScriptCategory): string {
  const labels: Record<SupportScriptCategory, string> = {
    [SUPPORT_SCRIPT.CATEGORIES.GREETING]: 'Greeting',
    [SUPPORT_SCRIPT.CATEGORIES.FAREWELL]: 'Farewell',
    [SUPPORT_SCRIPT.CATEGORIES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_SCRIPT.CATEGORIES.RESOLUTION]: 'Resolution',
    [SUPPORT_SCRIPT.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_SCRIPT.CATEGORIES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_SCRIPT.CATEGORIES.FEEDBACK]: 'Feedback',
    [SUPPORT_SCRIPT.CATEGORIES.COMPLAINT]: 'Complaint',
    [SUPPORT_SCRIPT.CATEGORIES.SALES]: 'Sales',
    [SUPPORT_SCRIPT.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportScriptGetFormatLabel(format: SupportScriptFormat): string {
  const labels: Record<SupportScriptFormat, string> = {
    [SUPPORT_SCRIPT.FORMATS.PLAIN]: 'Plain Text',
    [SUPPORT_SCRIPT.FORMATS.MARKDOWN]: 'Markdown',
    [SUPPORT_SCRIPT.FORMATS.HTML]: 'HTML',
    [SUPPORT_SCRIPT.FORMATS.JSON]: 'JSON',
  };
  return labels[format] || 'Unknown';
}

export function supportScriptIsActive(status: SupportScriptStatus): boolean {
  return status === SUPPORT_SCRIPT.STATUS.ACTIVE;
}
