/**
 * Support Schedule Type Constants
 * Types of support schedules
 */

export const SUPPORT_SCHEDULE_TYPE = {
  // Schedule Categories
  CATEGORIES: {
    REGULAR: 'regular',
    OVERTIME: 'overtime',
    ON_CALL: 'on_call',
    EMERGENCY: 'emergency',
    TRAINING: 'training',
    MEETING: 'meeting',
  } as const,

  // Schedule Frequencies
  FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

  // Schedule Durations
  DURATIONS: {
    SHIFT: 8, // hours
    HALF_DAY: 4,
    EXTENDED: 12,
    ON_CALL: 24,
  } as const,

  // Schedule Patterns
  PATTERNS: {
    FIXED: 'fixed',
    ROTATING: 'rotating',
    ALTERNATING: 'alternating',
    CUSTOM: 'custom',
  } as const,

  // Schedule Coverage
  COVERAGE: {
    FULL: 'full',
    PARTIAL: 'partial',
    MINIMAL: 'minimal',
  } as const,

  // Schedule Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Schedule Categories
export type SupportScheduleCategory =
  (typeof SUPPORT_SCHEDULE_TYPE.CATEGORIES)[keyof typeof SUPPORT_SCHEDULE_TYPE.CATEGORIES];

// Schedule Frequencies
export type SupportScheduleFrequency =
  (typeof SUPPORT_SCHEDULE_TYPE.FREQUENCIES)[keyof typeof SUPPORT_SCHEDULE_TYPE.FREQUENCIES];

// Schedule Durations
export type SupportScheduleDuration =
  (typeof SUPPORT_SCHEDULE_TYPE.DURATIONS)[keyof typeof SUPPORT_SCHEDULE_TYPE.DURATIONS];

// Schedule Patterns
export type SupportSchedulePattern =
  (typeof SUPPORT_SCHEDULE_TYPE.PATTERNS)[keyof typeof SUPPORT_SCHEDULE_TYPE.PATTERNS];

// Schedule Coverage
export type SupportScheduleCoverage =
  (typeof SUPPORT_SCHEDULE_TYPE.COVERAGE)[keyof typeof SUPPORT_SCHEDULE_TYPE.COVERAGE];

// Schedule Priorities
export type SupportSchedulePriority =
  (typeof SUPPORT_SCHEDULE_TYPE.PRIORITIES)[keyof typeof SUPPORT_SCHEDULE_TYPE.PRIORITIES];

// Utility Functions
export function supportScheduleTypeGetCategoryLabel(category: SupportScheduleCategory): string {
  const labels: Record<SupportScheduleCategory, string> = {
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.REGULAR]: 'Regular',
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.OVERTIME]: 'Overtime',
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.ON_CALL]: 'On Call',
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.EMERGENCY]: 'Emergency',
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.TRAINING]: 'Training',
    [SUPPORT_SCHEDULE_TYPE.CATEGORIES.MEETING]: 'Meeting',
  };
  return labels[category] || 'Unknown';
}

export function supportScheduleTypeGetFrequencyLabel(frequency: SupportScheduleFrequency): string {
  const labels: Record<SupportScheduleFrequency, string> = {
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.DAILY]: 'Daily',
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.WEEKLY]: 'Weekly',
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.MONTHLY]: 'Monthly',
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [SUPPORT_SCHEDULE_TYPE.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown';
}

export function supportScheduleTypeGetDurationLabel(duration: SupportScheduleDuration): string {
  const labels: Record<SupportScheduleDuration, string> = {
    [SUPPORT_SCHEDULE_TYPE.DURATIONS.SHIFT]: '8 hours',
    [SUPPORT_SCHEDULE_TYPE.DURATIONS.HALF_DAY]: '4 hours',
    [SUPPORT_SCHEDULE_TYPE.DURATIONS.EXTENDED]: '12 hours',
    [SUPPORT_SCHEDULE_TYPE.DURATIONS.ON_CALL]: '24 hours',
  };
  return labels[duration] || 'Unknown';
}

export function supportScheduleTypeGetPriorityLabel(priority: SupportSchedulePriority): string {
  const labels: Record<SupportSchedulePriority, string> = {
    [SUPPORT_SCHEDULE_TYPE.PRIORITIES.CRITICAL]: 'Critical',
    [SUPPORT_SCHEDULE_TYPE.PRIORITIES.HIGH]: 'High',
    [SUPPORT_SCHEDULE_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_SCHEDULE_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportScheduleTypeGetPatternLabel(pattern: SupportSchedulePattern): string {
  const labels: Record<SupportSchedulePattern, string> = {
    [SUPPORT_SCHEDULE_TYPE.PATTERNS.FIXED]: 'Fixed',
    [SUPPORT_SCHEDULE_TYPE.PATTERNS.ROTATING]: 'Rotating',
    [SUPPORT_SCHEDULE_TYPE.PATTERNS.ALTERNATING]: 'Alternating',
    [SUPPORT_SCHEDULE_TYPE.PATTERNS.CUSTOM]: 'Custom',
  };
  return labels[pattern] || 'Unknown';
}

export function supportScheduleTypeGetCoverageLabel(coverage: SupportScheduleCoverage): string {
  const labels: Record<SupportScheduleCoverage, string> = {
    [SUPPORT_SCHEDULE_TYPE.COVERAGE.FULL]: 'Full Coverage',
    [SUPPORT_SCHEDULE_TYPE.COVERAGE.PARTIAL]: 'Partial Coverage',
    [SUPPORT_SCHEDULE_TYPE.COVERAGE.MINIMAL]: 'Minimal Coverage',
  };
  return labels[coverage] || 'Unknown';
}
