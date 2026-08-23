/**
 * Flash Sale Schedule Type Constants
 * Types and classifications of flash sale schedules
 */

export const FLASH_SALE_SCHEDULE_TYPE = {
  // Schedule Categories
  CATEGORIES: {
    STANDARD: 'standard',
    FLASH: 'flash',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    SPECIAL: 'special',
    CUSTOM: 'custom',
  },

  // Schedule Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Schedule Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    SEGMENT: 'segment',
    INDIVIDUAL: 'individual',
  },

  // Schedule Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Schedule Pattern
  PATTERN: {
    FIXED: 'fixed',
    FLEXIBLE: 'flexible',
    DYNAMIC: 'dynamic',
    ADAPTIVE: 'adaptive',
  },

  // Schedule Interval
  INTERVAL: {
    MINUTES_15: '15_minutes',
    MINUTES_30: '30_minutes',
    MINUTES_45: '45_minutes',
    HOUR: '1_hour',
    HOURS_2: '2_hours',
    HOURS_3: '3_hours',
    HOURS_6: '6_hours',
    HOURS_12: '12_hours',
    HOURS_24: '24_hours',
    DAYS_2: '2_days',
    DAYS_3: '3_days',
    DAYS_7: '7_days',
    DAYS_14: '14_days',
    DAYS_30: '30_days',
  },

  // Schedule Execution
  EXECUTION: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    SEMI_AUTOMATIC: 'semi_automatic',
    CONDITIONAL: 'conditional',
  },
} as const;

// Schedule Categories
export type FlashSaleScheduleTypeCategory =
  (typeof FLASH_SALE_SCHEDULE_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.CATEGORIES];

// Schedule Complexity
export type FlashSaleScheduleTypeComplexity =
  (typeof FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY];

// Schedule Scope
export type FlashSaleScheduleTypeScope =
  (typeof FLASH_SALE_SCHEDULE_TYPE.SCOPE)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.SCOPE];

// Schedule Priority
export type FlashSaleScheduleTypePriority =
  (typeof FLASH_SALE_SCHEDULE_TYPE.PRIORITY)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.PRIORITY];

// Schedule Pattern
export type FlashSaleScheduleTypePattern =
  (typeof FLASH_SALE_SCHEDULE_TYPE.PATTERN)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.PATTERN];

// Schedule Interval
export type FlashSaleScheduleTypeInterval =
  (typeof FLASH_SALE_SCHEDULE_TYPE.INTERVAL)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.INTERVAL];

// Schedule Execution
export type FlashSaleScheduleTypeExecution =
  (typeof FLASH_SALE_SCHEDULE_TYPE.EXECUTION)[keyof typeof FLASH_SALE_SCHEDULE_TYPE.EXECUTION];

// Utility Functions
export function flashsalesScheduleTypeGetCategoryLabel(
  category: FlashSaleScheduleTypeCategory
): string {
  const labels: Record<FlashSaleScheduleTypeCategory, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.STANDARD]: 'Standard Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.FLASH]: 'Flash Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.DAILY]: 'Daily Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.WEEKLY]: 'Weekly Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.MONTHLY]: 'Monthly Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.SEASONAL]: 'Seasonal Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.HOLIDAY]: 'Holiday Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.SPECIAL]: 'Special Schedule',
    [FLASH_SALE_SCHEDULE_TYPE.CATEGORIES.CUSTOM]: 'Custom Schedule',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesScheduleTypeGetComplexityLabel(
  complexity: FlashSaleScheduleTypeComplexity
): string {
  const labels: Record<FlashSaleScheduleTypeComplexity, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_SCHEDULE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesScheduleTypeGetScopeLabel(scope: FlashSaleScheduleTypeScope): string {
  const labels: Record<FlashSaleScheduleTypeScope, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_SCHEDULE_TYPE.SCOPE.REGIONAL]: 'Regional',
    [FLASH_SALE_SCHEDULE_TYPE.SCOPE.LOCAL]: 'Local',
    [FLASH_SALE_SCHEDULE_TYPE.SCOPE.SEGMENT]: 'Segment',
    [FLASH_SALE_SCHEDULE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesScheduleTypeGetPriorityLabel(
  priority: FlashSaleScheduleTypePriority
): string {
  const labels: Record<FlashSaleScheduleTypePriority, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_SCHEDULE_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_SCHEDULE_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_SCHEDULE_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesScheduleTypeGetPatternLabel(
  pattern: FlashSaleScheduleTypePattern
): string {
  const labels: Record<FlashSaleScheduleTypePattern, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.PATTERN.FIXED]: 'Fixed Pattern',
    [FLASH_SALE_SCHEDULE_TYPE.PATTERN.FLEXIBLE]: 'Flexible Pattern',
    [FLASH_SALE_SCHEDULE_TYPE.PATTERN.DYNAMIC]: 'Dynamic Pattern',
    [FLASH_SALE_SCHEDULE_TYPE.PATTERN.ADAPTIVE]: 'Adaptive Pattern',
  };
  return labels[pattern] || 'Unknown Pattern';
}

export function flashsalesScheduleTypeGetIntervalLabel(
  interval: FlashSaleScheduleTypeInterval
): string {
  const labels: Record<FlashSaleScheduleTypeInterval, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_15]: '15 Minutes',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_30]: '30 Minutes',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_45]: '45 Minutes',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOUR]: '1 Hour',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_2]: '2 Hours',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_3]: '3 Hours',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_6]: '6 Hours',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_12]: '12 Hours',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_24]: '24 Hours',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_2]: '2 Days',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_3]: '3 Days',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_7]: '7 Days',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_14]: '14 Days',
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_30]: '30 Days',
  };
  return labels[interval] || 'Unknown Interval';
}

export function flashsalesScheduleTypeGetExecutionLabel(
  execution: FlashSaleScheduleTypeExecution
): string {
  const labels: Record<FlashSaleScheduleTypeExecution, string> = {
    [FLASH_SALE_SCHEDULE_TYPE.EXECUTION.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_SCHEDULE_TYPE.EXECUTION.MANUAL]: 'Manual',
    [FLASH_SALE_SCHEDULE_TYPE.EXECUTION.SEMI_AUTOMATIC]: 'Semi-Automatic',
    [FLASH_SALE_SCHEDULE_TYPE.EXECUTION.CONDITIONAL]: 'Conditional',
  };
  return labels[execution] || 'Unknown Execution';
}

export function flashsalesScheduleTypeIsValidCategory(
  category: string
): category is FlashSaleScheduleTypeCategory {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE.CATEGORIES).includes(
    category as FlashSaleScheduleTypeCategory
  );
}

export function flashsalesScheduleTypeIsValidPriority(
  priority: string
): priority is FlashSaleScheduleTypePriority {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE.PRIORITY).includes(
    priority as FlashSaleScheduleTypePriority
  );
}

export function flashsalesScheduleTypeIsValidInterval(
  interval: string
): interval is FlashSaleScheduleTypeInterval {
  return Object.values(FLASH_SALE_SCHEDULE_TYPE.INTERVAL).includes(
    interval as FlashSaleScheduleTypeInterval
  );
}

export function flashsalesScheduleTypeGetIntervalMinutes(
  interval: FlashSaleScheduleTypeInterval
): number {
  const minutes: Record<FlashSaleScheduleTypeInterval, number> = {
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_15]: 15,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_30]: 30,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.MINUTES_45]: 45,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOUR]: 60,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_2]: 120,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_3]: 180,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_6]: 360,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_12]: 720,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.HOURS_24]: 1440,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_2]: 2880,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_3]: 4320,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_7]: 10080,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_14]: 20160,
    [FLASH_SALE_SCHEDULE_TYPE.INTERVAL.DAYS_30]: 43200,
  };
  return minutes[interval] || 0;
}
