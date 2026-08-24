/**
 * Support Automation Constants
 * Configuration for support automation
 */

export const SUPPORT_AUTOMATION = {
  // Automation Types
  TYPES: {
    RULE_BASED: 'rule_based',
    ML_BASED: 'ml_based',
    WORKFLOW: 'workflow',
    BOT: 'bot',
    SCRIPT: 'script',
  } as const,

  // Automation Statuses
  STATUS: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ERROR: 'error',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,

  // Automation Priorities
  PRIORITY: {
    CRITICAL: 100,
    HIGH: 80,
    MEDIUM: 50,
    LOW: 30,
    BACKGROUND: 10,
  } as const,

  // Automation Categories
  CATEGORIES: {
    TICKET: 'ticket',
    RESPONSE: 'response',
    ASSIGNMENT: 'assignment',
    ESCALATION: 'escalation',
    NOTIFICATION: 'notification',
    REPORTING: 'reporting',
    ANALYTICS: 'analytics',
    MAINTENANCE: 'maintenance',
  } as const,

  // Automation Execution
  EXECUTION: {
    SYNC: 'sync',
    ASYNC: 'async',
    SCHEDULED: 'scheduled',
    EVENT_DRIVEN: 'event_driven',
  } as const,

  // Automation Limits
  LIMITS: {
    MAX_RULES: 100,
    MAX_ACTIONS: 50,
    MAX_TRIGGERS: 20,
    MAX_CONDITIONS: 30,
    MAX_EXECUTION_TIME: 300, // 5 minutes
    MAX_RETRIES: 3,
  } as const,

  // Automation Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,
} as const;

// Automation Types
export type SupportAutomationType =
  (typeof SUPPORT_AUTOMATION.TYPES)[keyof typeof SUPPORT_AUTOMATION.TYPES];

// Automation Statuses
export type SupportAutomationStatus =
  (typeof SUPPORT_AUTOMATION.STATUS)[keyof typeof SUPPORT_AUTOMATION.STATUS];

// Automation Priorities
export type SupportAutomationPriority =
  (typeof SUPPORT_AUTOMATION.PRIORITY)[keyof typeof SUPPORT_AUTOMATION.PRIORITY];

// Automation Categories
export type SupportAutomationCategory =
  (typeof SUPPORT_AUTOMATION.CATEGORIES)[keyof typeof SUPPORT_AUTOMATION.CATEGORIES];

// Automation Execution
export type SupportAutomationExecution =
  (typeof SUPPORT_AUTOMATION.EXECUTION)[keyof typeof SUPPORT_AUTOMATION.EXECUTION];

// Automation Complexity
export type SupportAutomationComplexity =
  (typeof SUPPORT_AUTOMATION.COMPLEXITY)[keyof typeof SUPPORT_AUTOMATION.COMPLEXITY];

// Utility Functions
export function supportAutomationGetTypeLabel(type: SupportAutomationType): string {
  const labels: Record<SupportAutomationType, string> = {
    [SUPPORT_AUTOMATION.TYPES.RULE_BASED]: 'Rule Based',
    [SUPPORT_AUTOMATION.TYPES.ML_BASED]: 'ML Based',
    [SUPPORT_AUTOMATION.TYPES.WORKFLOW]: 'Workflow',
    [SUPPORT_AUTOMATION.TYPES.BOT]: 'Bot',
    [SUPPORT_AUTOMATION.TYPES.SCRIPT]: 'Script',
  };
  return labels[type] || 'Unknown';
}

export function supportAutomationGetStatusLabel(status: SupportAutomationStatus): string {
  const labels: Record<SupportAutomationStatus, string> = {
    [SUPPORT_AUTOMATION.STATUS.DRAFT]: 'Draft',
    [SUPPORT_AUTOMATION.STATUS.ACTIVE]: 'Active',
    [SUPPORT_AUTOMATION.STATUS.PAUSED]: 'Paused',
    [SUPPORT_AUTOMATION.STATUS.ERROR]: 'Error',
    [SUPPORT_AUTOMATION.STATUS.DEPRECATED]: 'Deprecated',
    [SUPPORT_AUTOMATION.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportAutomationGetPriorityLabel(priority: SupportAutomationPriority): string {
  const labels: Record<SupportAutomationPriority, string> = {
    [SUPPORT_AUTOMATION.PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_AUTOMATION.PRIORITY.HIGH]: 'High',
    [SUPPORT_AUTOMATION.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_AUTOMATION.PRIORITY.LOW]: 'Low',
    [SUPPORT_AUTOMATION.PRIORITY.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function supportAutomationIsActive(status: SupportAutomationStatus): boolean {
  return status === SUPPORT_AUTOMATION.STATUS.ACTIVE;
}

export function supportAutomationIsDraft(status: SupportAutomationStatus): boolean {
  return status === SUPPORT_AUTOMATION.STATUS.DRAFT;
}

export function supportAutomationIsError(status: SupportAutomationStatus): boolean {
  return status === SUPPORT_AUTOMATION.STATUS.ERROR;
}

export function supportAutomationGetCategoryLabel(category: SupportAutomationCategory): string {
  const labels: Record<SupportAutomationCategory, string> = {
    [SUPPORT_AUTOMATION.CATEGORIES.TICKET]: 'Ticket',
    [SUPPORT_AUTOMATION.CATEGORIES.RESPONSE]: 'Response',
    [SUPPORT_AUTOMATION.CATEGORIES.ASSIGNMENT]: 'Assignment',
    [SUPPORT_AUTOMATION.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_AUTOMATION.CATEGORIES.NOTIFICATION]: 'Notification',
    [SUPPORT_AUTOMATION.CATEGORIES.REPORTING]: 'Reporting',
    [SUPPORT_AUTOMATION.CATEGORIES.ANALYTICS]: 'Analytics',
    [SUPPORT_AUTOMATION.CATEGORIES.MAINTENANCE]: 'Maintenance',
  };
  return labels[category] || 'Unknown';
}
