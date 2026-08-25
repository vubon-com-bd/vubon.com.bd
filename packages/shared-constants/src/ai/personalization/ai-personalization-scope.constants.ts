/**
 * AI Personalization Scope Constants
 * Scope definitions for personalization
 */

export const AI_PERSONALIZATION_SCOPE = {
  // Scope Levels
  LEVELS: {
    GLOBAL: 0,
    ORGANIZATION: 1,
    DEPARTMENT: 2,
    TEAM: 3,
    USER_GROUP: 4,
    USER: 5,
    SESSION: 6,
    REQUEST: 7,
  } as const,

  // Scope Contexts
  CONTEXTS: {
    SYSTEM: 'system',
    BUSINESS: 'business',
    USER: 'user',
    SESSION: 'session',
    DEVICE: 'device',
    LOCATION: 'location',
    TIME: 'time',
    CHANNEL: 'channel',
  } as const,

  // Scope Types
  TYPES: {
    INCLUSIVE: 'inclusive',
    EXCLUSIVE: 'exclusive',
    OVERLAPPING: 'overlapping',
    HIERARCHICAL: 'hierarchical',
  } as const,

  // Scope Rules
  RULES: {
    INHERITANCE: 'inheritance',
    OVERRIDE: 'override',
    MERGE: 'merge',
    COMBINE: 'combine',
    PRECEDENCE: 'precedence',
  } as const,

  // Scope Priority
  PRIORITY: {
    SYSTEM: 100,
    ORGANIZATION: 90,
    DEPARTMENT: 80,
    TEAM: 70,
    USER_GROUP: 60,
    USER: 50,
    SESSION: 40,
    REQUEST: 30,
  } as const,

  // Scope Weight
  WEIGHT: {
    GLOBAL: 0.1,
    ORGANIZATION: 0.2,
    DEPARTMENT: 0.3,
    TEAM: 0.4,
    USER_GROUP: 0.5,
    USER: 0.7,
    SESSION: 0.9,
    REQUEST: 1.0,
  } as const,
} as const;

export type AIPersonalizationScopeLevel =
  (typeof AI_PERSONALIZATION_SCOPE.LEVELS)[keyof typeof AI_PERSONALIZATION_SCOPE.LEVELS];

export type AIPersonalizationScopeContext =
  (typeof AI_PERSONALIZATION_SCOPE.CONTEXTS)[keyof typeof AI_PERSONALIZATION_SCOPE.CONTEXTS];

export type AIPersonalizationScopeType =
  (typeof AI_PERSONALIZATION_SCOPE.TYPES)[keyof typeof AI_PERSONALIZATION_SCOPE.TYPES];

export type AIPersonalizationScopeRule =
  (typeof AI_PERSONALIZATION_SCOPE.RULES)[keyof typeof AI_PERSONALIZATION_SCOPE.RULES];

export type AIPersonalizationScopePriority =
  (typeof AI_PERSONALIZATION_SCOPE.PRIORITY)[keyof typeof AI_PERSONALIZATION_SCOPE.PRIORITY];

export type AIPersonalizationScopeWeight =
  (typeof AI_PERSONALIZATION_SCOPE.WEIGHT)[keyof typeof AI_PERSONALIZATION_SCOPE.WEIGHT];

export function getAiPersonalizationScopeLevelLabel(level: AIPersonalizationScopeLevel): string {
  const labels: Record<AIPersonalizationScopeLevel, string> = {
    [AI_PERSONALIZATION_SCOPE.LEVELS.GLOBAL]: 'Global',
    [AI_PERSONALIZATION_SCOPE.LEVELS.ORGANIZATION]: 'Organization',
    [AI_PERSONALIZATION_SCOPE.LEVELS.DEPARTMENT]: 'Department',
    [AI_PERSONALIZATION_SCOPE.LEVELS.TEAM]: 'Team',
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER_GROUP]: 'User Group',
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER]: 'User',
    [AI_PERSONALIZATION_SCOPE.LEVELS.SESSION]: 'Session',
    [AI_PERSONALIZATION_SCOPE.LEVELS.REQUEST]: 'Request',
  };
  return labels[level] || 'Unknown';
}

export function getAiPersonalizationScopeContextLabel(
  context: AIPersonalizationScopeContext
): string {
  const labels: Record<AIPersonalizationScopeContext, string> = {
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.SYSTEM]: 'System',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.BUSINESS]: 'Business',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.USER]: 'User',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.SESSION]: 'Session',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.DEVICE]: 'Device',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.LOCATION]: 'Location',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.TIME]: 'Time',
    [AI_PERSONALIZATION_SCOPE.CONTEXTS.CHANNEL]: 'Channel',
  };
  return labels[context] || 'Unknown';
}

export function getAiPersonalizationScopeTypeLabel(type: AIPersonalizationScopeType): string {
  const labels: Record<AIPersonalizationScopeType, string> = {
    [AI_PERSONALIZATION_SCOPE.TYPES.INCLUSIVE]: 'Inclusive',
    [AI_PERSONALIZATION_SCOPE.TYPES.EXCLUSIVE]: 'Exclusive',
    [AI_PERSONALIZATION_SCOPE.TYPES.OVERLAPPING]: 'Overlapping',
    [AI_PERSONALIZATION_SCOPE.TYPES.HIERARCHICAL]: 'Hierarchical',
  };
  return labels[type] || 'Unknown';
}

export function getAiPersonalizationScopeRuleLabel(rule: AIPersonalizationScopeRule): string {
  const labels: Record<AIPersonalizationScopeRule, string> = {
    [AI_PERSONALIZATION_SCOPE.RULES.INHERITANCE]: 'Inheritance',
    [AI_PERSONALIZATION_SCOPE.RULES.OVERRIDE]: 'Override',
    [AI_PERSONALIZATION_SCOPE.RULES.MERGE]: 'Merge',
    [AI_PERSONALIZATION_SCOPE.RULES.COMBINE]: 'Combine',
    [AI_PERSONALIZATION_SCOPE.RULES.PRECEDENCE]: 'Precedence',
  };
  return labels[rule] || 'Unknown';
}

export function getAiPersonalizationScopePriorityValue(
  priority: AIPersonalizationScopePriority
): number {
  const priorities: Record<AIPersonalizationScopePriority, number> = {
    [AI_PERSONALIZATION_SCOPE.PRIORITY.SYSTEM]: 100,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.ORGANIZATION]: 90,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.DEPARTMENT]: 80,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.TEAM]: 70,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.USER_GROUP]: 60,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.USER]: 50,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.SESSION]: 40,
    [AI_PERSONALIZATION_SCOPE.PRIORITY.REQUEST]: 30,
  };
  return priorities[priority] || 50;
}

export function getAiPersonalizationScopeWeight(level: AIPersonalizationScopeLevel): number {
  const weights: Record<AIPersonalizationScopeLevel, number> = {
    [AI_PERSONALIZATION_SCOPE.LEVELS.GLOBAL]: AI_PERSONALIZATION_SCOPE.WEIGHT.GLOBAL,
    [AI_PERSONALIZATION_SCOPE.LEVELS.ORGANIZATION]: AI_PERSONALIZATION_SCOPE.WEIGHT.ORGANIZATION,
    [AI_PERSONALIZATION_SCOPE.LEVELS.DEPARTMENT]: AI_PERSONALIZATION_SCOPE.WEIGHT.DEPARTMENT,
    [AI_PERSONALIZATION_SCOPE.LEVELS.TEAM]: AI_PERSONALIZATION_SCOPE.WEIGHT.TEAM,
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER_GROUP]: AI_PERSONALIZATION_SCOPE.WEIGHT.USER_GROUP,
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER]: AI_PERSONALIZATION_SCOPE.WEIGHT.USER,
    [AI_PERSONALIZATION_SCOPE.LEVELS.SESSION]: AI_PERSONALIZATION_SCOPE.WEIGHT.SESSION,
    [AI_PERSONALIZATION_SCOPE.LEVELS.REQUEST]: AI_PERSONALIZATION_SCOPE.WEIGHT.REQUEST,
  };
  return weights[level] || 0.5;
}

export function getAiPersonalizationDefaultScopeCount(level: AIPersonalizationScopeLevel): number {
  const counts: Record<AIPersonalizationScopeLevel, number> = {
    [AI_PERSONALIZATION_SCOPE.LEVELS.GLOBAL]: 1,
    [AI_PERSONALIZATION_SCOPE.LEVELS.ORGANIZATION]: 5,
    [AI_PERSONALIZATION_SCOPE.LEVELS.DEPARTMENT]: 10,
    [AI_PERSONALIZATION_SCOPE.LEVELS.TEAM]: 20,
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER_GROUP]: 50,
    [AI_PERSONALIZATION_SCOPE.LEVELS.USER]: 100,
    [AI_PERSONALIZATION_SCOPE.LEVELS.SESSION]: 1000,
    [AI_PERSONALIZATION_SCOPE.LEVELS.REQUEST]: 10000,
  };
  return counts[level] || 100;
}
