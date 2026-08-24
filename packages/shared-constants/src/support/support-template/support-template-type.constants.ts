/**
 * Support Template Type Constants
 * Types of support templates
 */

export const SUPPORT_TEMPLATE_TYPE = {
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

  // Template Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
  } as const,

  // Template Languages
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
  } as const,

  // Template Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Template Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
  } as const,
} as const;

// Template Categories
export type SupportTemplateTypeCategory =
  (typeof SUPPORT_TEMPLATE_TYPE.CATEGORIES)[keyof typeof SUPPORT_TEMPLATE_TYPE.CATEGORIES];

// Template Scopes
export type SupportTemplateTypeScope =
  (typeof SUPPORT_TEMPLATE_TYPE.SCOPES)[keyof typeof SUPPORT_TEMPLATE_TYPE.SCOPES];

// Template Languages
export type SupportTemplateTypeLanguage =
  (typeof SUPPORT_TEMPLATE_TYPE.LANGUAGES)[keyof typeof SUPPORT_TEMPLATE_TYPE.LANGUAGES];

// Template Priorities
export type SupportTemplateTypePriority =
  (typeof SUPPORT_TEMPLATE_TYPE.PRIORITIES)[keyof typeof SUPPORT_TEMPLATE_TYPE.PRIORITIES];

// Template Complexity
export type SupportTemplateTypeComplexity =
  (typeof SUPPORT_TEMPLATE_TYPE.COMPLEXITY)[keyof typeof SUPPORT_TEMPLATE_TYPE.COMPLEXITY];

// Utility Functions
export function supportTemplateTypeGetCategoryLabel(category: SupportTemplateTypeCategory): string {
  const labels: Record<SupportTemplateTypeCategory, string> = {
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.GREETING]: 'Greeting',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.FAREWELL]: 'Farewell',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.RESOLUTION]: 'Resolution',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.FEEDBACK]: 'Feedback',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.COMPLAINT]: 'Complaint',
    [SUPPORT_TEMPLATE_TYPE.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportTemplateTypeGetScopeLabel(scope: SupportTemplateTypeScope): string {
  const labels: Record<SupportTemplateTypeScope, string> = {
    [SUPPORT_TEMPLATE_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_TEMPLATE_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_TEMPLATE_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_TEMPLATE_TYPE.SCOPES.AGENT]: 'Agent',
  };
  return labels[scope] || 'Unknown';
}

export function supportTemplateTypeGetLanguageLabel(language: SupportTemplateTypeLanguage): string {
  const labels: Record<SupportTemplateTypeLanguage, string> = {
    [SUPPORT_TEMPLATE_TYPE.LANGUAGES.BENGALI]: 'Bengali',
    [SUPPORT_TEMPLATE_TYPE.LANGUAGES.ENGLISH]: 'English',
  };
  return labels[language] || 'Unknown';
}

export function supportTemplateTypeGetPriorityLabel(priority: SupportTemplateTypePriority): string {
  const labels: Record<SupportTemplateTypePriority, string> = {
    [SUPPORT_TEMPLATE_TYPE.PRIORITIES.HIGH]: 'High',
    [SUPPORT_TEMPLATE_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_TEMPLATE_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportTemplateTypeGetComplexityLabel(
  complexity: SupportTemplateTypeComplexity
): string {
  const labels: Record<SupportTemplateTypeComplexity, string> = {
    [SUPPORT_TEMPLATE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SUPPORT_TEMPLATE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [SUPPORT_TEMPLATE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
  };
  return labels[complexity] || 'Unknown';
}
