/**
 * SEO Audit Status Constants
 * Status definitions for SEO audits and their lifecycle
 */

export const SEO_AUDIT_STATUS = {
  // Audit Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    PLANNING: 'planning',
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    DATA_COLLECTION: 'data_collection',
    ANALYSIS: 'analysis',
    REPORTING: 'reporting',
    REVIEW: 'review',
    COMPLETED: 'completed',
    ARCHIVED: 'archived',
  } as const,

  // Audit Execution Status
  EXECUTION: {
    NOT_STARTED: 'not_started',
    RUNNING: 'running',
    PAUSED: 'paused',
    BLOCKED: 'blocked',
    RETRYING: 'retrying',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Audit Quality Status
  QUALITY: {
    POOR: 'poor',
    FAIR: 'fair',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  // Audit Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Audit Validation Status
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALIDATED: 'validated',
    FAILED: 'failed',
    PARTIAL: 'partial',
  } as const,

  // Status Categories
  CATEGORIES: {
    PLANNING: 'planning',
    ACTIVE: 'active',
    REVIEW: 'review',
    COMPLETED: 'completed',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOAuditLifecycleStatus =
  (typeof SEO_AUDIT_STATUS.LIFECYCLE)[keyof typeof SEO_AUDIT_STATUS.LIFECYCLE];

// Execution Status
export type SEOAuditExecutionStatus =
  (typeof SEO_AUDIT_STATUS.EXECUTION)[keyof typeof SEO_AUDIT_STATUS.EXECUTION];

// Quality Status
export type SEOAuditQualityStatus =
  (typeof SEO_AUDIT_STATUS.QUALITY)[keyof typeof SEO_AUDIT_STATUS.QUALITY];

// Health Status
export type SEOAuditHealthStatus =
  (typeof SEO_AUDIT_STATUS.HEALTH)[keyof typeof SEO_AUDIT_STATUS.HEALTH];

// Validation Status
export type SEOAuditValidationStatus =
  (typeof SEO_AUDIT_STATUS.VALIDATION)[keyof typeof SEO_AUDIT_STATUS.VALIDATION];

// Status Categories
export type SEOAuditStatusCategory =
  (typeof SEO_AUDIT_STATUS.CATEGORIES)[keyof typeof SEO_AUDIT_STATUS.CATEGORIES];

// Utility Functions
export function getSEOAuditLifecycleLabel(status: SEOAuditLifecycleStatus): string {
  const labels: Record<SEOAuditLifecycleStatus, string> = {
    [SEO_AUDIT_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_AUDIT_STATUS.LIFECYCLE.PLANNING]: 'Planning',
    [SEO_AUDIT_STATUS.LIFECYCLE.SCHEDULED]: 'Scheduled',
    [SEO_AUDIT_STATUS.LIFECYCLE.IN_PROGRESS]: 'In Progress',
    [SEO_AUDIT_STATUS.LIFECYCLE.DATA_COLLECTION]: 'Data Collection',
    [SEO_AUDIT_STATUS.LIFECYCLE.ANALYSIS]: 'Analysis',
    [SEO_AUDIT_STATUS.LIFECYCLE.REPORTING]: 'Reporting',
    [SEO_AUDIT_STATUS.LIFECYCLE.REVIEW]: 'Review',
    [SEO_AUDIT_STATUS.LIFECYCLE.COMPLETED]: 'Completed',
    [SEO_AUDIT_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOAuditExecutionLabel(status: SEOAuditExecutionStatus): string {
  const labels: Record<SEOAuditExecutionStatus, string> = {
    [SEO_AUDIT_STATUS.EXECUTION.NOT_STARTED]: 'Not Started',
    [SEO_AUDIT_STATUS.EXECUTION.RUNNING]: 'Running',
    [SEO_AUDIT_STATUS.EXECUTION.PAUSED]: 'Paused',
    [SEO_AUDIT_STATUS.EXECUTION.BLOCKED]: 'Blocked',
    [SEO_AUDIT_STATUS.EXECUTION.RETRYING]: 'Retrying',
    [SEO_AUDIT_STATUS.EXECUTION.COMPLETED]: 'Completed',
    [SEO_AUDIT_STATUS.EXECUTION.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown Execution Status';
}

export function getSEOAuditQualityLabel(status: SEOAuditQualityStatus): string {
  const labels: Record<SEOAuditQualityStatus, string> = {
    [SEO_AUDIT_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_AUDIT_STATUS.QUALITY.FAIR]: 'Fair',
    [SEO_AUDIT_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_AUDIT_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_AUDIT_STATUS.QUALITY.OUTSTANDING]: 'Outstanding',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOAuditHealthLabel(status: SEOAuditHealthStatus): string {
  const labels: Record<SEOAuditHealthStatus, string> = {
    [SEO_AUDIT_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_AUDIT_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_AUDIT_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_AUDIT_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOAuditValidationLabel(status: SEOAuditValidationStatus): string {
  const labels: Record<SEOAuditValidationStatus, string> = {
    [SEO_AUDIT_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_AUDIT_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_AUDIT_STATUS.VALIDATION.VALIDATED]: 'Validated',
    [SEO_AUDIT_STATUS.VALIDATION.FAILED]: 'Validation Failed',
    [SEO_AUDIT_STATUS.VALIDATION.PARTIAL]: 'Partially Validated',
  };
  return labels[status] || 'Unknown Validation Status';
}

export function getSEOAuditStatusCategory(status: SEOAuditLifecycleStatus): SEOAuditStatusCategory {
  const categories: Record<SEOAuditLifecycleStatus, SEOAuditStatusCategory> = {
    [SEO_AUDIT_STATUS.LIFECYCLE.INITIATED]: SEO_AUDIT_STATUS.CATEGORIES.PLANNING,
    [SEO_AUDIT_STATUS.LIFECYCLE.PLANNING]: SEO_AUDIT_STATUS.CATEGORIES.PLANNING,
    [SEO_AUDIT_STATUS.LIFECYCLE.SCHEDULED]: SEO_AUDIT_STATUS.CATEGORIES.PLANNING,
    [SEO_AUDIT_STATUS.LIFECYCLE.IN_PROGRESS]: SEO_AUDIT_STATUS.CATEGORIES.ACTIVE,
    [SEO_AUDIT_STATUS.LIFECYCLE.DATA_COLLECTION]: SEO_AUDIT_STATUS.CATEGORIES.ACTIVE,
    [SEO_AUDIT_STATUS.LIFECYCLE.ANALYSIS]: SEO_AUDIT_STATUS.CATEGORIES.ACTIVE,
    [SEO_AUDIT_STATUS.LIFECYCLE.REPORTING]: SEO_AUDIT_STATUS.CATEGORIES.ACTIVE,
    [SEO_AUDIT_STATUS.LIFECYCLE.REVIEW]: SEO_AUDIT_STATUS.CATEGORIES.REVIEW,
    [SEO_AUDIT_STATUS.LIFECYCLE.COMPLETED]: SEO_AUDIT_STATUS.CATEGORIES.COMPLETED,
    [SEO_AUDIT_STATUS.LIFECYCLE.ARCHIVED]: SEO_AUDIT_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_AUDIT_STATUS.CATEGORIES.PLANNING;
}

export function getSEOAuditStatusColor(status: SEOAuditLifecycleStatus): string {
  const colors: Record<SEOAuditLifecycleStatus, string> = {
    [SEO_AUDIT_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_AUDIT_STATUS.LIFECYCLE.PLANNING]: '#2196F3',
    [SEO_AUDIT_STATUS.LIFECYCLE.SCHEDULED]: '#FFC107',
    [SEO_AUDIT_STATUS.LIFECYCLE.IN_PROGRESS]: '#00BCD4',
    [SEO_AUDIT_STATUS.LIFECYCLE.DATA_COLLECTION]: '#3F51B5',
    [SEO_AUDIT_STATUS.LIFECYCLE.ANALYSIS]: '#9C27B0',
    [SEO_AUDIT_STATUS.LIFECYCLE.REPORTING]: '#FF9800',
    [SEO_AUDIT_STATUS.LIFECYCLE.REVIEW]: '#4CAF50',
    [SEO_AUDIT_STATUS.LIFECYCLE.COMPLETED]: '#4CAF50',
    [SEO_AUDIT_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isAuditRunning(status: SEOAuditLifecycleStatus): boolean {
  const runningStatuses: SEOAuditLifecycleStatus[] = [
    SEO_AUDIT_STATUS.LIFECYCLE.IN_PROGRESS,
    SEO_AUDIT_STATUS.LIFECYCLE.DATA_COLLECTION,
    SEO_AUDIT_STATUS.LIFECYCLE.ANALYSIS,
    SEO_AUDIT_STATUS.LIFECYCLE.REPORTING,
  ];
  return runningStatuses.includes(status);
}

export function isAuditComplete(status: SEOAuditLifecycleStatus): boolean {
  const completeStatuses: SEOAuditLifecycleStatus[] = [
    SEO_AUDIT_STATUS.LIFECYCLE.COMPLETED,
    SEO_AUDIT_STATUS.LIFECYCLE.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function getExecutionProgressPercentage(status: SEOAuditExecutionStatus): number {
  const percentages: Record<SEOAuditExecutionStatus, number> = {
    [SEO_AUDIT_STATUS.EXECUTION.NOT_STARTED]: 0,
    [SEO_AUDIT_STATUS.EXECUTION.RUNNING]: 50,
    [SEO_AUDIT_STATUS.EXECUTION.PAUSED]: 30,
    [SEO_AUDIT_STATUS.EXECUTION.BLOCKED]: 20,
    [SEO_AUDIT_STATUS.EXECUTION.RETRYING]: 40,
    [SEO_AUDIT_STATUS.EXECUTION.COMPLETED]: 100,
    [SEO_AUDIT_STATUS.EXECUTION.FAILED]: 0,
  };
  return percentages[status] || 0;
}
