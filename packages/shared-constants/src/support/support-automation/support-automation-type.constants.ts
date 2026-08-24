/**
 * Support Automation Type Constants
 * Types of support automation
 */

export const SUPPORT_AUTOMATION_TYPE = {
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

  // Automation Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
  } as const,

  // Automation Frequencies
  FREQUENCIES: {
    ALWAYS: 'always',
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    CUSTOM: 'custom',
  } as const,

  // Automation Modes
  MODES: {
    AUTOMATIC: 'automatic',
    SEMI_AUTOMATIC: 'semi_automatic',
    MANUAL: 'manual',
    HYBRID: 'hybrid',
  } as const,

  // Automation Complexity Levels
  COMPLEXITY_LEVELS: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Automation Dependencies
  DEPENDENCIES: {
    NONE: 'none',
    SEQUENTIAL: 'sequential',
    PARALLEL: 'parallel',
    CONDITIONAL: 'conditional',
  } as const,
} as const;

// Automation Categories
export type SupportAutomationTypeCategory =
  (typeof SUPPORT_AUTOMATION_TYPE.CATEGORIES)[keyof typeof SUPPORT_AUTOMATION_TYPE.CATEGORIES];

// Automation Scopes
export type SupportAutomationTypeScope =
  (typeof SUPPORT_AUTOMATION_TYPE.SCOPES)[keyof typeof SUPPORT_AUTOMATION_TYPE.SCOPES];

// Automation Frequencies
export type SupportAutomationTypeFrequency =
  (typeof SUPPORT_AUTOMATION_TYPE.FREQUENCIES)[keyof typeof SUPPORT_AUTOMATION_TYPE.FREQUENCIES];

// Automation Modes
export type SupportAutomationTypeMode =
  (typeof SUPPORT_AUTOMATION_TYPE.MODES)[keyof typeof SUPPORT_AUTOMATION_TYPE.MODES];

// Automation Complexity Levels
export type SupportAutomationTypeComplexityLevel =
  (typeof SUPPORT_AUTOMATION_TYPE.COMPLEXITY_LEVELS)[keyof typeof SUPPORT_AUTOMATION_TYPE.COMPLEXITY_LEVELS];

// Automation Dependencies
export type SupportAutomationTypeDependency =
  (typeof SUPPORT_AUTOMATION_TYPE.DEPENDENCIES)[keyof typeof SUPPORT_AUTOMATION_TYPE.DEPENDENCIES];

// Utility Functions
export function supportAutomationTypeGetCategoryLabel(
  category: SupportAutomationTypeCategory
): string {
  const labels: Record<SupportAutomationTypeCategory, string> = {
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.TICKET]: 'Ticket',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.RESPONSE]: 'Response',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.ASSIGNMENT]: 'Assignment',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.NOTIFICATION]: 'Notification',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.REPORTING]: 'Reporting',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.ANALYTICS]: 'Analytics',
    [SUPPORT_AUTOMATION_TYPE.CATEGORIES.MAINTENANCE]: 'Maintenance',
  };
  return labels[category] || 'Unknown';
}

export function supportAutomationTypeGetScopeLabel(scope: SupportAutomationTypeScope): string {
  const labels: Record<SupportAutomationTypeScope, string> = {
    [SUPPORT_AUTOMATION_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_AUTOMATION_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_AUTOMATION_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_AUTOMATION_TYPE.SCOPES.AGENT]: 'Agent',
  };
  return labels[scope] || 'Unknown';
}

export function supportAutomationTypeGetFrequencyLabel(
  frequency: SupportAutomationTypeFrequency
): string {
  const labels: Record<SupportAutomationTypeFrequency, string> = {
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.ALWAYS]: 'Always',
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.ONCE]: 'Once',
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.DAILY]: 'Daily',
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.WEEKLY]: 'Weekly',
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.MONTHLY]: 'Monthly',
    [SUPPORT_AUTOMATION_TYPE.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown';
}

export function supportAutomationTypeGetModeLabel(mode: SupportAutomationTypeMode): string {
  const labels: Record<SupportAutomationTypeMode, string> = {
    [SUPPORT_AUTOMATION_TYPE.MODES.AUTOMATIC]: 'Automatic',
    [SUPPORT_AUTOMATION_TYPE.MODES.SEMI_AUTOMATIC]: 'Semi-Automatic',
    [SUPPORT_AUTOMATION_TYPE.MODES.MANUAL]: 'Manual',
    [SUPPORT_AUTOMATION_TYPE.MODES.HYBRID]: 'Hybrid',
  };
  return labels[mode] || 'Unknown';
}
