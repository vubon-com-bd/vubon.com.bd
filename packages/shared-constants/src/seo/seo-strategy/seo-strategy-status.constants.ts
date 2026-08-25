/**
 * SEO Strategy Status Constants
 * Status definitions for SEO strategies and their execution
 */

export const SEO_STRATEGY_STATUS = {
  LIFECYCLE: {
    CONCEPT: 'concept',
    RESEARCH: 'research',
    PLANNING: 'planning',
    APPROVAL: 'approval',
    DEVELOPMENT: 'development',
    TESTING: 'testing',
    IMPLEMENTATION: 'implementation',
    MONITORING: 'monitoring',
    OPTIMIZATION: 'optimization',
    COMPLETED: 'completed',
    SUNSET: 'sunset',
    ARCHIVED: 'archived',
  } as const,

  EXECUTION: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    ON_TRACK: 'on_track',
    AT_RISK: 'at_risk',
    BEHIND: 'behind',
    BLOCKED: 'blocked',
    COMPLETED: 'completed',
    OVERDUE: 'overdue',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
  } as const,

  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  PROGRESS: {
    NOT_STARTED: 'not_started',
    INITIATED: 'initiated',
    QUARTER_WAY: 'quarter_way',
    HALF_WAY: 'half_way',
    THREE_QUARTER: 'three_quarter',
    NEAR_COMPLETION: 'near_completion',
    COMPLETED: 'completed',
  } as const,

  QUALITY: {
    POOR: 'poor',
    FAIR: 'fair',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  RISK: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  CATEGORIES: {
    PLANNING: 'planning',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,
} as const;

export type SEOStrategyLifecycleStatus =
  (typeof SEO_STRATEGY_STATUS.LIFECYCLE)[keyof typeof SEO_STRATEGY_STATUS.LIFECYCLE];
export type SEOStrategyExecutionStatus =
  (typeof SEO_STRATEGY_STATUS.EXECUTION)[keyof typeof SEO_STRATEGY_STATUS.EXECUTION];
export type SEOStrategyHealthStatus =
  (typeof SEO_STRATEGY_STATUS.HEALTH)[keyof typeof SEO_STRATEGY_STATUS.HEALTH];
export type SEOStrategyProgressStatus =
  (typeof SEO_STRATEGY_STATUS.PROGRESS)[keyof typeof SEO_STRATEGY_STATUS.PROGRESS];
export type SEOStrategyQualityStatus =
  (typeof SEO_STRATEGY_STATUS.QUALITY)[keyof typeof SEO_STRATEGY_STATUS.QUALITY];
export type SEOStrategyRiskStatus =
  (typeof SEO_STRATEGY_STATUS.RISK)[keyof typeof SEO_STRATEGY_STATUS.RISK];
export type SEOStrategyStatusCategory =
  (typeof SEO_STRATEGY_STATUS.CATEGORIES)[keyof typeof SEO_STRATEGY_STATUS.CATEGORIES];

export function getSeostrategyLifecycleLabel(status: SEOStrategyLifecycleStatus): string {
  const labels: Record<SEOStrategyLifecycleStatus, string> = {
    [SEO_STRATEGY_STATUS.LIFECYCLE.CONCEPT]: 'Concept Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.RESEARCH]: 'Research Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.PLANNING]: 'Planning Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.APPROVAL]: 'Approval Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.DEVELOPMENT]: 'Development Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.TESTING]: 'Testing Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.IMPLEMENTATION]: 'Implementation Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.MONITORING]: 'Monitoring Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.OPTIMIZATION]: 'Optimization Phase',
    [SEO_STRATEGY_STATUS.LIFECYCLE.COMPLETED]: 'Completed',
    [SEO_STRATEGY_STATUS.LIFECYCLE.SUNSET]: 'Sunsetting',
    [SEO_STRATEGY_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Phase';
}

export function getSeostrategyExecutionLabel(status: SEOStrategyExecutionStatus): string {
  const labels: Record<SEOStrategyExecutionStatus, string> = {
    [SEO_STRATEGY_STATUS.EXECUTION.NOT_STARTED]: 'Not Started',
    [SEO_STRATEGY_STATUS.EXECUTION.IN_PROGRESS]: 'In Progress',
    [SEO_STRATEGY_STATUS.EXECUTION.ON_TRACK]: 'On Track',
    [SEO_STRATEGY_STATUS.EXECUTION.AT_RISK]: 'At Risk',
    [SEO_STRATEGY_STATUS.EXECUTION.BEHIND]: 'Behind Schedule',
    [SEO_STRATEGY_STATUS.EXECUTION.BLOCKED]: 'Blocked',
    [SEO_STRATEGY_STATUS.EXECUTION.COMPLETED]: 'Completed',
    [SEO_STRATEGY_STATUS.EXECUTION.OVERDUE]: 'Overdue',
    [SEO_STRATEGY_STATUS.EXECUTION.PAUSED]: 'Paused',
    [SEO_STRATEGY_STATUS.EXECUTION.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Execution Status';
}

export function getSeostrategyHealthLabel(status: SEOStrategyHealthStatus): string {
  const labels: Record<SEOStrategyHealthStatus, string> = {
    [SEO_STRATEGY_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_STRATEGY_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_STRATEGY_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_STRATEGY_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSeostrategyProgressLabel(status: SEOStrategyProgressStatus): string {
  const labels: Record<SEOStrategyProgressStatus, string> = {
    [SEO_STRATEGY_STATUS.PROGRESS.NOT_STARTED]: 'Not Started',
    [SEO_STRATEGY_STATUS.PROGRESS.INITIATED]: 'Initiated (10-25%)',
    [SEO_STRATEGY_STATUS.PROGRESS.QUARTER_WAY]: 'Quarter Way (25-50%)',
    [SEO_STRATEGY_STATUS.PROGRESS.HALF_WAY]: 'Half Way (50-75%)',
    [SEO_STRATEGY_STATUS.PROGRESS.THREE_QUARTER]: 'Three Quarter (75-90%)',
    [SEO_STRATEGY_STATUS.PROGRESS.NEAR_COMPLETION]: 'Near Completion (90-99%)',
    [SEO_STRATEGY_STATUS.PROGRESS.COMPLETED]: 'Completed (100%)',
  };
  return labels[status] || 'Unknown Progress';
}

export function getSeostrategyQualityLabel(status: SEOStrategyQualityStatus): string {
  const labels: Record<SEOStrategyQualityStatus, string> = {
    [SEO_STRATEGY_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_STRATEGY_STATUS.QUALITY.FAIR]: 'Fair',
    [SEO_STRATEGY_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_STRATEGY_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_STRATEGY_STATUS.QUALITY.OUTSTANDING]: 'Outstanding',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSeostrategyRiskLabel(status: SEOStrategyRiskStatus): string {
  const labels: Record<SEOStrategyRiskStatus, string> = {
    [SEO_STRATEGY_STATUS.RISK.LOW]: 'Low Risk',
    [SEO_STRATEGY_STATUS.RISK.MEDIUM]: 'Medium Risk',
    [SEO_STRATEGY_STATUS.RISK.HIGH]: 'High Risk',
    [SEO_STRATEGY_STATUS.RISK.CRITICAL]: 'Critical Risk',
  };
  return labels[status] || 'Unknown Risk Level';
}

export function getSeostrategyStatusCategory(
  status: SEOStrategyLifecycleStatus
): SEOStrategyStatusCategory {
  const categories: Record<SEOStrategyLifecycleStatus, SEOStrategyStatusCategory> = {
    [SEO_STRATEGY_STATUS.LIFECYCLE.CONCEPT]: SEO_STRATEGY_STATUS.CATEGORIES.PLANNING,
    [SEO_STRATEGY_STATUS.LIFECYCLE.RESEARCH]: SEO_STRATEGY_STATUS.CATEGORIES.PLANNING,
    [SEO_STRATEGY_STATUS.LIFECYCLE.PLANNING]: SEO_STRATEGY_STATUS.CATEGORIES.PLANNING,
    [SEO_STRATEGY_STATUS.LIFECYCLE.APPROVAL]: SEO_STRATEGY_STATUS.CATEGORIES.PLANNING,
    [SEO_STRATEGY_STATUS.LIFECYCLE.DEVELOPMENT]: SEO_STRATEGY_STATUS.CATEGORIES.ACTIVE,
    [SEO_STRATEGY_STATUS.LIFECYCLE.TESTING]: SEO_STRATEGY_STATUS.CATEGORIES.ACTIVE,
    [SEO_STRATEGY_STATUS.LIFECYCLE.IMPLEMENTATION]: SEO_STRATEGY_STATUS.CATEGORIES.ACTIVE,
    [SEO_STRATEGY_STATUS.LIFECYCLE.MONITORING]: SEO_STRATEGY_STATUS.CATEGORIES.ACTIVE,
    [SEO_STRATEGY_STATUS.LIFECYCLE.OPTIMIZATION]: SEO_STRATEGY_STATUS.CATEGORIES.ACTIVE,
    [SEO_STRATEGY_STATUS.LIFECYCLE.COMPLETED]: SEO_STRATEGY_STATUS.CATEGORIES.COMPLETED,
    [SEO_STRATEGY_STATUS.LIFECYCLE.SUNSET]: SEO_STRATEGY_STATUS.CATEGORIES.COMPLETED,
    [SEO_STRATEGY_STATUS.LIFECYCLE.ARCHIVED]: SEO_STRATEGY_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_STRATEGY_STATUS.CATEGORIES.PLANNING;
}

export function getSeostrategyStatusColorCode(status: SEOStrategyLifecycleStatus): string {
  const colors: Record<SEOStrategyLifecycleStatus, string> = {
    [SEO_STRATEGY_STATUS.LIFECYCLE.CONCEPT]: '#9E9E9E',
    [SEO_STRATEGY_STATUS.LIFECYCLE.RESEARCH]: '#2196F3',
    [SEO_STRATEGY_STATUS.LIFECYCLE.PLANNING]: '#FF9800',
    [SEO_STRATEGY_STATUS.LIFECYCLE.APPROVAL]: '#4CAF50',
    [SEO_STRATEGY_STATUS.LIFECYCLE.DEVELOPMENT]: '#00BCD4',
    [SEO_STRATEGY_STATUS.LIFECYCLE.TESTING]: '#3F51B5',
    [SEO_STRATEGY_STATUS.LIFECYCLE.IMPLEMENTATION]: '#8BC34A',
    [SEO_STRATEGY_STATUS.LIFECYCLE.MONITORING]: '#FFC107',
    [SEO_STRATEGY_STATUS.LIFECYCLE.OPTIMIZATION]: '#FF9800',
    [SEO_STRATEGY_STATUS.LIFECYCLE.COMPLETED]: '#4CAF50',
    [SEO_STRATEGY_STATUS.LIFECYCLE.SUNSET]: '#F44336',
    [SEO_STRATEGY_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSeostrategyActive(status: SEOStrategyLifecycleStatus): boolean {
  const activeStatuses: SEOStrategyLifecycleStatus[] = [
    SEO_STRATEGY_STATUS.LIFECYCLE.DEVELOPMENT,
    SEO_STRATEGY_STATUS.LIFECYCLE.TESTING,
    SEO_STRATEGY_STATUS.LIFECYCLE.IMPLEMENTATION,
    SEO_STRATEGY_STATUS.LIFECYCLE.MONITORING,
    SEO_STRATEGY_STATUS.LIFECYCLE.OPTIMIZATION,
  ];
  return activeStatuses.includes(status);
}

export function isSeostrategyComplete(status: SEOStrategyLifecycleStatus): boolean {
  const completeStatuses: SEOStrategyLifecycleStatus[] = [
    SEO_STRATEGY_STATUS.LIFECYCLE.COMPLETED,
    SEO_STRATEGY_STATUS.LIFECYCLE.SUNSET,
    SEO_STRATEGY_STATUS.LIFECYCLE.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function getSeostrategyProgressPercentage(status: SEOStrategyProgressStatus): number {
  const percentages: Record<SEOStrategyProgressStatus, number> = {
    [SEO_STRATEGY_STATUS.PROGRESS.NOT_STARTED]: 0,
    [SEO_STRATEGY_STATUS.PROGRESS.INITIATED]: 15,
    [SEO_STRATEGY_STATUS.PROGRESS.QUARTER_WAY]: 35,
    [SEO_STRATEGY_STATUS.PROGRESS.HALF_WAY]: 60,
    [SEO_STRATEGY_STATUS.PROGRESS.THREE_QUARTER]: 85,
    [SEO_STRATEGY_STATUS.PROGRESS.NEAR_COMPLETION]: 95,
    [SEO_STRATEGY_STATUS.PROGRESS.COMPLETED]: 100,
  };
  return percentages[status] || 0;
}
