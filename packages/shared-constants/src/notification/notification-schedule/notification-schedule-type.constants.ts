/**
 * Notification Schedule Type Constants
 * Type definitions and classifications for notification schedules
 */

export const NOTIFICATIONSCHEDULE_TYPE = {
  // Schedule Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SOCIAL: 'social',
    ALERT: 'alert',
    REMINDER: 'reminder',
    UPDATE: 'update',
    CUSTOM: 'custom',
  } as const,

  // Schedule Patterns
  PATTERNS: {
    FIXED: 'fixed',
    FLOATING: 'floating',
    ADAPTIVE: 'adaptive',
    SMART: 'smart',
    CUSTOM: 'custom',
  } as const,

  // Schedule Intervals
  INTERVALS: {
    MINUTES_5: 5,
    MINUTES_10: 10,
    MINUTES_15: 15,
    MINUTES_30: 30,
    HOURS_1: 60,
    HOURS_2: 120,
    HOURS_6: 360,
    HOURS_12: 720,
    DAYS_1: 1440,
    DAYS_2: 2880,
    DAYS_7: 10080,
    DAYS_14: 20160,
    DAYS_30: 43200,
    DAYS_60: 86400,
    DAYS_90: 129600,
    DAYS_180: 259200,
    DAYS_365: 525600,
  } as const,

  // Schedule Recurrence Rules
  RECURRENCE_RULES: {
    EVERY_DAY: 'every_day',
    EVERY_WEEK: 'every_week',
    EVERY_MONTH: 'every_month',
    EVERY_QUARTER: 'every_quarter',
    EVERY_YEAR: 'every_year',
    CUSTOM: 'custom',
  } as const,

  // Schedule Priority Levels
  PRIORITY_LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Schedule Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,
} as const;

// Schedule Categories
export type NotificationScheduleCategoryType =
  (typeof NOTIFICATIONSCHEDULE_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.CATEGORIES];

// Schedule Patterns
export type NotificationSchedulePattern =
  (typeof NOTIFICATIONSCHEDULE_TYPE.PATTERNS)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.PATTERNS];

// Schedule Intervals
export type NotificationScheduleInterval =
  (typeof NOTIFICATIONSCHEDULE_TYPE.INTERVALS)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.INTERVALS];

// Schedule Recurrence Rules
export type NotificationScheduleRecurrenceRule =
  (typeof NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES];

// Schedule Priority Levels
export type NotificationSchedulePriorityLevel =
  (typeof NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS];

// Schedule Complexity
export type NotificationScheduleComplexity =
  (typeof NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY];

// Utility Functions
export function notificationscheduleGetCategoryLabel(
  category: NotificationScheduleCategoryType
): string {
  const labels: Record<NotificationScheduleCategoryType, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationscheduleGetPatternLabel(pattern: NotificationSchedulePattern): string {
  const labels: Record<NotificationSchedulePattern, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.PATTERNS.FIXED]: 'Fixed',
    [NOTIFICATIONSCHEDULE_TYPE.PATTERNS.FLOATING]: 'Floating',
    [NOTIFICATIONSCHEDULE_TYPE.PATTERNS.ADAPTIVE]: 'Adaptive',
    [NOTIFICATIONSCHEDULE_TYPE.PATTERNS.SMART]: 'Smart',
    [NOTIFICATIONSCHEDULE_TYPE.PATTERNS.CUSTOM]: 'Custom',
  };
  return labels[pattern] || 'Unknown Pattern';
}

export function notificationscheduleGetIntervalLabel(
  interval: NotificationScheduleInterval
): string {
  const labels: Record<NotificationScheduleInterval, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.MINUTES_5]: '5 Minutes',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.MINUTES_10]: '10 Minutes',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.MINUTES_15]: '15 Minutes',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.MINUTES_30]: '30 Minutes',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.HOURS_1]: '1 Hour',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.HOURS_2]: '2 Hours',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.HOURS_6]: '6 Hours',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.HOURS_12]: '12 Hours',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_1]: '1 Day',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_2]: '2 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_7]: '7 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_14]: '14 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_30]: '30 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_60]: '60 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_90]: '90 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_180]: '180 Days',
    [NOTIFICATIONSCHEDULE_TYPE.INTERVALS.DAYS_365]: '365 Days',
  };
  return labels[interval] || 'Unknown Interval';
}

export function notificationscheduleGetRecurrenceRuleLabel(
  rule: NotificationScheduleRecurrenceRule
): string {
  const labels: Record<NotificationScheduleRecurrenceRule, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_DAY]: 'Every Day',
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_WEEK]: 'Every Week',
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_MONTH]: 'Every Month',
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_QUARTER]: 'Every Quarter',
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_YEAR]: 'Every Year',
    [NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.CUSTOM]: 'Custom',
  };
  return labels[rule] || 'Unknown Recurrence Rule';
}

export function notificationscheduleGetPriorityLevelLabel(
  level: NotificationSchedulePriorityLevel
): string {
  const labels: Record<NotificationSchedulePriorityLevel, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS.CRITICAL]: 'Critical',
    [NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS.HIGH]: 'High',
    [NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS.MEDIUM]: 'Medium',
    [NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS.LOW]: 'Low',
    [NOTIFICATIONSCHEDULE_TYPE.PRIORITY_LEVELS.BACKGROUND]: 'Background',
  };
  return labels[level] || 'Unknown Priority Level';
}

export function notificationscheduleGetComplexityLabel(
  complexity: NotificationScheduleComplexity
): string {
  const labels: Record<NotificationScheduleComplexity, string> = {
    [NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONSCHEDULE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationscheduleIsMarketingCategory(
  category: NotificationScheduleCategoryType
): boolean {
  return category === NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.MARKETING;
}

export function notificationscheduleIsTransactionalCategory(
  category: NotificationScheduleCategoryType
): boolean {
  return category === NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.TRANSACTIONAL;
}

export function notificationscheduleIsSystemCategory(
  category: NotificationScheduleCategoryType
): boolean {
  return category === NOTIFICATIONSCHEDULE_TYPE.CATEGORIES.SYSTEM;
}

export function notificationscheduleIsRecurringRule(
  rule: NotificationScheduleRecurrenceRule
): boolean {
  const recurringRules: NotificationScheduleRecurrenceRule[] = [
    NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_DAY,
    NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_WEEK,
    NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_MONTH,
    NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_QUARTER,
    NOTIFICATIONSCHEDULE_TYPE.RECURRENCE_RULES.EVERY_YEAR,
  ];
  return recurringRules.includes(rule);
}
