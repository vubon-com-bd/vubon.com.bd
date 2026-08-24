/**
 * Support Script Category Constants
 * Categories for support scripts
 */

export const SUPPORT_SCRIPT_CATEGORY = {
  // Category Types
  TYPES: {
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

  // Category Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
  } as const,

  // Category Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Category Colors (for UI)
  COLORS: {
    GREETING: '#green-500',
    FAREWELL: '#blue-500',
    ACKNOWLEDGMENT: '#teal-500',
    RESOLUTION: '#green-600',
    ESCALATION: '#red-500',
    FOLLOW_UP: '#orange-500',
    FEEDBACK: '#purple-500',
    COMPLAINT: '#red-600',
    SALES: '#gold-500',
    GENERAL: '#gray-500',
  } as const,

  // Category Icons (for UI)
  ICONS: {
    GREETING: '👋',
    FAREWELL: '👋',
    ACKNOWLEDGMENT: '✅',
    RESOLUTION: '🎯',
    ESCALATION: '🚨',
    FOLLOW_UP: '🔔',
    FEEDBACK: '💬',
    COMPLAINT: '😤',
    SALES: '💰',
    GENERAL: '📋',
  } as const,
} as const;

// Category Types
export type SupportScriptCategoryType =
  (typeof SUPPORT_SCRIPT_CATEGORY.TYPES)[keyof typeof SUPPORT_SCRIPT_CATEGORY.TYPES];

// Category Scopes
export type SupportScriptCategoryScope =
  (typeof SUPPORT_SCRIPT_CATEGORY.SCOPES)[keyof typeof SUPPORT_SCRIPT_CATEGORY.SCOPES];

// Category Priorities
export type SupportScriptCategoryPriority =
  (typeof SUPPORT_SCRIPT_CATEGORY.PRIORITIES)[keyof typeof SUPPORT_SCRIPT_CATEGORY.PRIORITIES];

// Category Colors
export type SupportScriptCategoryColor =
  (typeof SUPPORT_SCRIPT_CATEGORY.COLORS)[keyof typeof SUPPORT_SCRIPT_CATEGORY.COLORS];

// Category Icons
export type SupportScriptCategoryIcon =
  (typeof SUPPORT_SCRIPT_CATEGORY.ICONS)[keyof typeof SUPPORT_SCRIPT_CATEGORY.ICONS];

// Utility Functions
export function supportScriptCategoryGetLabel(category: SupportScriptCategoryType): string {
  const labels: Record<SupportScriptCategoryType, string> = {
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GREETING]: 'Greeting',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FAREWELL]: 'Farewell',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ACKNOWLEDGMENT]: 'Acknowledgment',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.RESOLUTION]: 'Resolution',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ESCALATION]: 'Escalation',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FOLLOW_UP]: 'Follow Up',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FEEDBACK]: 'Feedback',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.COMPLAINT]: 'Complaint',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.SALES]: 'Sales',
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportScriptCategoryGetScopeLabel(scope: SupportScriptCategoryScope): string {
  const labels: Record<SupportScriptCategoryScope, string> = {
    [SUPPORT_SCRIPT_CATEGORY.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_SCRIPT_CATEGORY.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_SCRIPT_CATEGORY.SCOPES.TEAM]: 'Team',
  };
  return labels[scope] || 'Unknown';
}

export function supportScriptCategoryGetPriorityLabel(
  priority: SupportScriptCategoryPriority
): string {
  const labels: Record<SupportScriptCategoryPriority, string> = {
    [SUPPORT_SCRIPT_CATEGORY.PRIORITIES.HIGH]: 'High',
    [SUPPORT_SCRIPT_CATEGORY.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_SCRIPT_CATEGORY.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportScriptCategoryGetColor(
  category: SupportScriptCategoryType
): SupportScriptCategoryColor {
  const colors: Record<SupportScriptCategoryType, SupportScriptCategoryColor> = {
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GREETING]: SUPPORT_SCRIPT_CATEGORY.COLORS.GREETING,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FAREWELL]: SUPPORT_SCRIPT_CATEGORY.COLORS.FAREWELL,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ACKNOWLEDGMENT]: SUPPORT_SCRIPT_CATEGORY.COLORS.ACKNOWLEDGMENT,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.RESOLUTION]: SUPPORT_SCRIPT_CATEGORY.COLORS.RESOLUTION,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ESCALATION]: SUPPORT_SCRIPT_CATEGORY.COLORS.ESCALATION,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FOLLOW_UP]: SUPPORT_SCRIPT_CATEGORY.COLORS.FOLLOW_UP,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FEEDBACK]: SUPPORT_SCRIPT_CATEGORY.COLORS.FEEDBACK,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.COMPLAINT]: SUPPORT_SCRIPT_CATEGORY.COLORS.COMPLAINT,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.SALES]: SUPPORT_SCRIPT_CATEGORY.COLORS.SALES,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GENERAL]: SUPPORT_SCRIPT_CATEGORY.COLORS.GENERAL,
  };
  return colors[category] || '#gray-500';
}

export function supportScriptCategoryGetIcon(
  category: SupportScriptCategoryType
): SupportScriptCategoryIcon {
  const icons: Record<SupportScriptCategoryType, SupportScriptCategoryIcon> = {
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GREETING]: SUPPORT_SCRIPT_CATEGORY.ICONS.GREETING,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FAREWELL]: SUPPORT_SCRIPT_CATEGORY.ICONS.FAREWELL,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ACKNOWLEDGMENT]: SUPPORT_SCRIPT_CATEGORY.ICONS.ACKNOWLEDGMENT,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.RESOLUTION]: SUPPORT_SCRIPT_CATEGORY.ICONS.RESOLUTION,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.ESCALATION]: SUPPORT_SCRIPT_CATEGORY.ICONS.ESCALATION,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FOLLOW_UP]: SUPPORT_SCRIPT_CATEGORY.ICONS.FOLLOW_UP,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.FEEDBACK]: SUPPORT_SCRIPT_CATEGORY.ICONS.FEEDBACK,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.COMPLAINT]: SUPPORT_SCRIPT_CATEGORY.ICONS.COMPLAINT,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.SALES]: SUPPORT_SCRIPT_CATEGORY.ICONS.SALES,
    [SUPPORT_SCRIPT_CATEGORY.TYPES.GENERAL]: SUPPORT_SCRIPT_CATEGORY.ICONS.GENERAL,
  };
  return icons[category] || '📋';
}
