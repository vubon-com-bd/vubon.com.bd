/**
 * @fileoverview Report priority levels definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report priority levels
 */
export enum ReportPriorityLevel {
  /** Critical priority (P0) - Immediate attention required */
  CRITICAL = 'CRITICAL',
  /** Urgent priority (P1) - Requires quick action */
  URGENT = 'URGENT',
  /** High priority (P2) - Important but not urgent */
  HIGH = 'HIGH',
  /** Medium priority (P3) - Normal priority */
  MEDIUM = 'MEDIUM',
  /** Low priority (P4) - Low importance */
  LOW = 'LOW',
  /** Background priority - Runs in background */
  BACKGROUND = 'BACKGROUND',
  /** Routine priority - Regular scheduled reports */
  ROUTINE = 'ROUTINE',
  /** Ad-hoc priority - On-demand reports */
  ADHOC = 'ADHOC',
  /** Emergency priority - Immediate action required */
  EMERGENCY = 'EMERGENCY',
  /** Standard priority - Default priority */
  STANDARD = 'STANDARD',
  /** Optional priority - Can be skipped if needed */
  OPTIONAL = 'OPTIONAL',
  /** Deferred priority - Delayed processing */
  DEFERRED = 'DEFERRED',
  /** Postponed priority - Postponed to later */
  POSTPONED = 'POSTPONED',
}

/**
 * Priority category for grouping
 */
export enum ReportPriorityCategory {
  /** Critical priorities */
  CRITICAL = 'CRITICAL',
  /** High priorities */
  HIGH = 'HIGH',
  /** Medium priorities */
  MEDIUM = 'MEDIUM',
  /** Low priorities */
  LOW = 'LOW',
  /** Special priorities */
  SPECIAL = 'SPECIAL',
  /** Scheduled priorities */
  SCHEDULED = 'SCHEDULED',
  /** Deferred priorities */
  DEFERRED = 'DEFERRED',
}

/**
 * Priority category mapping
 */
export const REPORT_PRIORITY_CATEGORY_MAP: Record<ReportPriorityLevel, ReportPriorityCategory> = {
  [ReportPriorityLevel.CRITICAL]: ReportPriorityCategory.CRITICAL,
  [ReportPriorityLevel.URGENT]: ReportPriorityCategory.CRITICAL,
  [ReportPriorityLevel.EMERGENCY]: ReportPriorityCategory.CRITICAL,
  [ReportPriorityLevel.HIGH]: ReportPriorityCategory.HIGH,
  [ReportPriorityLevel.MEDIUM]: ReportPriorityCategory.MEDIUM,
  [ReportPriorityLevel.LOW]: ReportPriorityCategory.LOW,
  [ReportPriorityLevel.BACKGROUND]: ReportPriorityCategory.LOW,
  [ReportPriorityLevel.ROUTINE]: ReportPriorityCategory.SCHEDULED,
  [ReportPriorityLevel.ADHOC]: ReportPriorityCategory.SPECIAL,
  [ReportPriorityLevel.STANDARD]: ReportPriorityCategory.MEDIUM,
  [ReportPriorityLevel.OPTIONAL]: ReportPriorityCategory.LOW,
  [ReportPriorityLevel.DEFERRED]: ReportPriorityCategory.DEFERRED,
  [ReportPriorityLevel.POSTPONED]: ReportPriorityCategory.DEFERRED,
};

/**
 * Priority configuration
 */
export interface ReportPriorityConfig {
  label: string;
  description: string;
  category: ReportPriorityCategory;
  color: string;
  icon?: string;
  numericValue: number;
  responseTimeMinutes: number;
  maxWaitTimeMinutes: number;
  retryAttempts: number;
}

export const REPORT_PRIORITY_CONFIG: Record<ReportPriorityLevel, ReportPriorityConfig> = {
  [ReportPriorityLevel.CRITICAL]: {
    label: 'Critical (P0)',
    description: 'Immediate attention required - system impact',
    category: ReportPriorityCategory.CRITICAL,
    color: '#EF4444',
    icon: 'AlertCircle',
    numericValue: 0,
    responseTimeMinutes: 5,
    maxWaitTimeMinutes: 15,
    retryAttempts: 5,
  },
  [ReportPriorityLevel.URGENT]: {
    label: 'Urgent (P1)',
    description: 'Requires quick action - business impact',
    category: ReportPriorityCategory.CRITICAL,
    color: '#F97316',
    icon: 'AlertTriangle',
    numericValue: 1,
    responseTimeMinutes: 15,
    maxWaitTimeMinutes: 30,
    retryAttempts: 4,
  },
  [ReportPriorityLevel.EMERGENCY]: {
    label: 'Emergency',
    description: 'Immediate action required - safety/security impact',
    category: ReportPriorityCategory.CRITICAL,
    color: '#DC2626',
    icon: 'ShieldOff',
    numericValue: 0,
    responseTimeMinutes: 2,
    maxWaitTimeMinutes: 10,
    retryAttempts: 6,
  },
  [ReportPriorityLevel.HIGH]: {
    label: 'High (P2)',
    description: 'Important but not urgent',
    category: ReportPriorityCategory.HIGH,
    color: '#F59E0B',
    icon: 'ArrowUp',
    numericValue: 2,
    responseTimeMinutes: 30,
    maxWaitTimeMinutes: 60,
    retryAttempts: 3,
  },
  [ReportPriorityLevel.MEDIUM]: {
    label: 'Medium (P3)',
    description: 'Normal priority',
    category: ReportPriorityCategory.MEDIUM,
    color: '#3B82F6',
    icon: 'Minus',
    numericValue: 3,
    responseTimeMinutes: 60,
    maxWaitTimeMinutes: 120,
    retryAttempts: 3,
  },
  [ReportPriorityLevel.LOW]: {
    label: 'Low (P4)',
    description: 'Low importance',
    category: ReportPriorityCategory.LOW,
    color: '#6B7280',
    icon: 'ArrowDown',
    numericValue: 4,
    responseTimeMinutes: 120,
    maxWaitTimeMinutes: 240,
    retryAttempts: 2,
  },
  [ReportPriorityLevel.BACKGROUND]: {
    label: 'Background',
    description: 'Runs in background with minimal priority',
    category: ReportPriorityCategory.LOW,
    color: '#9CA3AF',
    icon: 'Circle',
    numericValue: 5,
    responseTimeMinutes: 240,
    maxWaitTimeMinutes: 480,
    retryAttempts: 2,
  },
  [ReportPriorityLevel.ROUTINE]: {
    label: 'Routine',
    description: 'Regular scheduled reports',
    category: ReportPriorityCategory.SCHEDULED,
    color: '#10B981',
    icon: 'Calendar',
    numericValue: 3,
    responseTimeMinutes: 60,
    maxWaitTimeMinutes: 120,
    retryAttempts: 3,
  },
  [ReportPriorityLevel.ADHOC]: {
    label: 'Ad-hoc',
    description: 'On-demand reports',
    category: ReportPriorityCategory.SPECIAL,
    color: '#8B5CF6',
    icon: 'Zap',
    numericValue: 2,
    responseTimeMinutes: 30,
    maxWaitTimeMinutes: 60,
    retryAttempts: 3,
  },
  [ReportPriorityLevel.STANDARD]: {
    label: 'Standard',
    description: 'Default priority level',
    category: ReportPriorityCategory.MEDIUM,
    color: '#6366F1',
    icon: 'FileText',
    numericValue: 3,
    responseTimeMinutes: 60,
    maxWaitTimeMinutes: 120,
    retryAttempts: 3,
  },
  [ReportPriorityLevel.OPTIONAL]: {
    label: 'Optional',
    description: 'Can be skipped if resources are limited',
    category: ReportPriorityCategory.LOW,
    color: '#9CA3AF',
    icon: 'CheckCircle',
    numericValue: 4,
    responseTimeMinutes: 180,
    maxWaitTimeMinutes: 360,
    retryAttempts: 2,
  },
  [ReportPriorityLevel.DEFERRED]: {
    label: 'Deferred',
    description: 'Delayed processing',
    category: ReportPriorityCategory.DEFERRED,
    color: '#6B7280',
    icon: 'Clock',
    numericValue: 5,
    responseTimeMinutes: 300,
    maxWaitTimeMinutes: 600,
    retryAttempts: 2,
  },
  [ReportPriorityLevel.POSTPONED]: {
    label: 'Postponed',
    description: 'Postponed to later time',
    category: ReportPriorityCategory.DEFERRED,
    color: '#6B7280',
    icon: 'CalendarX',
    numericValue: 5,
    responseTimeMinutes: 0,
    maxWaitTimeMinutes: 0,
    retryAttempts: 0,
  },
};

/**
 * Get priority label
 */
export function getReportPriorityLabel(priority: ReportPriorityLevel): string {
  return REPORT_PRIORITY_CONFIG[priority]?.label || priority;
}

/**
 * Get priority description
 */
export function getReportPriorityDescription(priority: ReportPriorityLevel): string {
  return REPORT_PRIORITY_CONFIG[priority]?.description || '';
}

/**
 * Get priority category
 */
export function getReportPriorityCategory(priority: ReportPriorityLevel): ReportPriorityCategory {
  return REPORT_PRIORITY_CATEGORY_MAP[priority];
}

/**
 * Get priority color
 */
export function getReportPriorityColor(priority: ReportPriorityLevel): string {
  return REPORT_PRIORITY_CONFIG[priority]?.color || '#6B7280';
}

/**
 * Get priority icon
 */
export function getReportPriorityIcon(priority: ReportPriorityLevel): string {
  return REPORT_PRIORITY_CONFIG[priority]?.icon || 'Circle';
}

/**
 * Get priority numeric value
 */
export function getReportPriorityNumericValue(priority: ReportPriorityLevel): number {
  return REPORT_PRIORITY_CONFIG[priority]?.numericValue || 5;
}

/**
 * Get priority response time in minutes
 */
export function getReportPriorityResponseTime(priority: ReportPriorityLevel): number {
  return REPORT_PRIORITY_CONFIG[priority]?.responseTimeMinutes || 60;
}

/**
 * Get priority max wait time in minutes
 */
export function getReportPriorityMaxWaitTime(priority: ReportPriorityLevel): number {
  return REPORT_PRIORITY_CONFIG[priority]?.maxWaitTimeMinutes || 120;
}

/**
 * Get priority retry attempts
 */
export function getReportPriorityRetryAttempts(priority: ReportPriorityLevel): number {
  return REPORT_PRIORITY_CONFIG[priority]?.retryAttempts || 3;
}

/**
 * Get priorities by category
 */
export function getReportPrioritiesByCategory(
  category: ReportPriorityCategory
): ReportPriorityLevel[] {
  return Object.entries(REPORT_PRIORITY_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([priority]) => priority as ReportPriorityLevel);
}

/**
 * Get critical priorities
 */
export function getCriticalPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.CRITICAL);
}

/**
 * Get high priorities
 */
export function getHighPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.HIGH);
}

/**
 * Get medium priorities
 */
export function getMediumPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.MEDIUM);
}

/**
 * Get low priorities
 */
export function getLowPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.LOW);
}

/**
 * Get scheduled priorities
 */
export function getScheduledPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.SCHEDULED);
}

/**
 * Get special priorities
 */
export function getSpecialPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.SPECIAL);
}

/**
 * Get deferred priorities
 */
export function getDeferredPriorities(): ReportPriorityLevel[] {
  return getReportPrioritiesByCategory(ReportPriorityCategory.DEFERRED);
}

/**
 * Check if priority is critical
 */
export function isPriorityCritical(priority: ReportPriorityLevel): boolean {
  return getReportPriorityCategory(priority) === ReportPriorityCategory.CRITICAL;
}

/**
 * Check if priority is high
 */
export function isPriorityHigh(priority: ReportPriorityLevel): boolean {
  return getReportPriorityCategory(priority) === ReportPriorityCategory.HIGH;
}

/**
 * Check if priority is deferred
 */
export function isPriorityDeferred(priority: ReportPriorityLevel): boolean {
  return getReportPriorityCategory(priority) === ReportPriorityCategory.DEFERRED;
}

/**
 * Get priority by numeric value
 */
export function getPriorityByNumericValue(value: number): ReportPriorityLevel | null {
  const priorityMap = {
    0: ReportPriorityLevel.CRITICAL,
    1: ReportPriorityLevel.URGENT,
    2: ReportPriorityLevel.HIGH,
    3: ReportPriorityLevel.MEDIUM,
    4: ReportPriorityLevel.LOW,
    5: ReportPriorityLevel.BACKGROUND,
  };
  return (priorityMap as Record<number, ReportPriorityLevel>)[value] || null;
}

/**
 * Compare two priorities
 */
export function comparePriorities(p1: ReportPriorityLevel, p2: ReportPriorityLevel): number {
  const v1 = getReportPriorityNumericValue(p1);
  const v2 = getReportPriorityNumericValue(p2);
  return v1 - v2;
}

/**
 * Priority thresholds
 */
export const PRIORITY_THRESHOLDS = {
  /** Time threshold in minutes for critical priority */
  CRITICAL_TIME_THRESHOLD: 5,
  /** Time threshold in minutes for urgent priority */
  URGENT_TIME_THRESHOLD: 15,
  /** Time threshold in minutes for high priority */
  HIGH_TIME_THRESHOLD: 30,
  /** Time threshold in minutes for medium priority */
  MEDIUM_TIME_THRESHOLD: 60,
  /** Time threshold in minutes for low priority */
  LOW_TIME_THRESHOLD: 120,
} as const;

/**
 * Default priority for report types
 */
export const DEFAULT_PRIORITY_FOR_REPORT_TYPE: Record<string, ReportPriorityLevel> = {
  EXECUTIVE_SUMMARY_REPORT: ReportPriorityLevel.HIGH,
  OPERATIONAL_REPORT: ReportPriorityLevel.MEDIUM,
  ANALYTICAL_REPORT: ReportPriorityLevel.MEDIUM,
  STRATEGIC_REPORT: ReportPriorityLevel.HIGH,
  FORECAST_REPORT: ReportPriorityLevel.MEDIUM,
  COMPARATIVE_REPORT: ReportPriorityLevel.MEDIUM,
  TREND_REPORT: ReportPriorityLevel.MEDIUM,
  KPI_REPORT: ReportPriorityLevel.HIGH,
  DASHBOARD_REPORT: ReportPriorityLevel.MEDIUM,
  DETAILED_REPORT: ReportPriorityLevel.LOW,
  SUMMARY_REPORT: ReportPriorityLevel.MEDIUM,
  AGGREGATED_REPORT: ReportPriorityLevel.LOW,
  FILTERED_REPORT: ReportPriorityLevel.LOW,
  EXCEPTION_REPORT: ReportPriorityLevel.HIGH,
  ALERT_REPORT: ReportPriorityLevel.CRITICAL,
  SCHEDULED_REPORT: ReportPriorityLevel.ROUTINE,
  ON_DEMAND_REPORT: ReportPriorityLevel.ADHOC,
  REAL_TIME_REPORT: ReportPriorityLevel.HIGH,
  HISTORICAL_REPORT: ReportPriorityLevel.LOW,
  PREDICTIVE_REPORT: ReportPriorityLevel.MEDIUM,
  PRESCRIPTIVE_REPORT: ReportPriorityLevel.MEDIUM,
  DIAGNOSTIC_REPORT: ReportPriorityLevel.HIGH,
  DESCRIPTIVE_REPORT: ReportPriorityLevel.LOW,
  CUSTOM_REPORT: ReportPriorityLevel.STANDARD,
};

/**
 * Get default priority for report type
 */
export function getDefaultPriorityForReportType(reportType: string): ReportPriorityLevel {
  return DEFAULT_PRIORITY_FOR_REPORT_TYPE[reportType] || ReportPriorityLevel.STANDARD;
}

/**
 * Priority escalation rules
 */
export const PRIORITY_ESCALATION_RULES = {
  [ReportPriorityLevel.LOW]: {
    escalatesTo: ReportPriorityLevel.MEDIUM,
    timeThresholdMinutes: 240,
  },
  [ReportPriorityLevel.MEDIUM]: {
    escalatesTo: ReportPriorityLevel.HIGH,
    timeThresholdMinutes: 120,
  },
  [ReportPriorityLevel.HIGH]: {
    escalatesTo: ReportPriorityLevel.URGENT,
    timeThresholdMinutes: 60,
  },
  [ReportPriorityLevel.URGENT]: {
    escalatesTo: ReportPriorityLevel.CRITICAL,
    timeThresholdMinutes: 30,
  },
  [ReportPriorityLevel.CRITICAL]: {
    escalatesTo: ReportPriorityLevel.CRITICAL,
    timeThresholdMinutes: 5,
  },
} as const;
