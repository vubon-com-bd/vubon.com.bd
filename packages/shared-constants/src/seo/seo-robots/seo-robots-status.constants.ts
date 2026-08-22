/**
 * SEO Robots Status Constants
 * Status definitions for robots directives
 */

export const SEO_ROBOTS_STATUS = {
  // Robots Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    GENERATING: 'generating',
    GENERATED: 'generated',
    VALIDATING: 'validating',
    VALIDATED: 'validated',
    PUBLISHING: 'publishing',
    PUBLISHED: 'published',
    MONITORING: 'monitoring',
    UPDATING: 'updating',
    UPDATED: 'updated',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
  } as const,

  // Robots Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Robots Compliance Status
  COMPLIANCE: {
    COMPLIANT: 'compliant',
    PARTIAL: 'partial',
    NON_COMPLIANT: 'non_compliant',
    UNKNOWN: 'unknown',
  } as const,

  // Robots Performance Status
  PERFORMANCE: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Robots Validation Status
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    ERROR: 'error',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEORobotsLifecycleStatus =
  (typeof SEO_ROBOTS_STATUS.LIFECYCLE)[keyof typeof SEO_ROBOTS_STATUS.LIFECYCLE];

// Health Status
export type SEORobotsHealthStatus =
  (typeof SEO_ROBOTS_STATUS.HEALTH)[keyof typeof SEO_ROBOTS_STATUS.HEALTH];

// Compliance Status
export type SEORobotsComplianceStatus =
  (typeof SEO_ROBOTS_STATUS.COMPLIANCE)[keyof typeof SEO_ROBOTS_STATUS.COMPLIANCE];

// Performance Status
export type SEORobotsPerformanceStatus =
  (typeof SEO_ROBOTS_STATUS.PERFORMANCE)[keyof typeof SEO_ROBOTS_STATUS.PERFORMANCE];

// Validation Status
export type SEORobotsValidationStatus =
  (typeof SEO_ROBOTS_STATUS.VALIDATION)[keyof typeof SEO_ROBOTS_STATUS.VALIDATION];

// Status Categories
export type SEORobotsStatusCategory =
  (typeof SEO_ROBOTS_STATUS.CATEGORIES)[keyof typeof SEO_ROBOTS_STATUS.CATEGORIES];

// Utility Functions
export function getSEORobotsLifecycleLabel(status: SEORobotsLifecycleStatus): string {
  const labels: Record<SEORobotsLifecycleStatus, string> = {
    [SEO_ROBOTS_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATED]: 'Validated',
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHING]: 'Publishing',
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_ROBOTS_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATED]: 'Updated',
    [SEO_ROBOTS_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_ROBOTS_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEORobotsHealthLabel(status: SEORobotsHealthStatus): string {
  const labels: Record<SEORobotsHealthStatus, string> = {
    [SEO_ROBOTS_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_ROBOTS_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_ROBOTS_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_ROBOTS_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_ROBOTS_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEORobotsComplianceLabel(status: SEORobotsComplianceStatus): string {
  const labels: Record<SEORobotsComplianceStatus, string> = {
    [SEO_ROBOTS_STATUS.COMPLIANCE.COMPLIANT]: 'Compliant',
    [SEO_ROBOTS_STATUS.COMPLIANCE.PARTIAL]: 'Partially Compliant',
    [SEO_ROBOTS_STATUS.COMPLIANCE.NON_COMPLIANT]: 'Non-Compliant',
    [SEO_ROBOTS_STATUS.COMPLIANCE.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Compliance Status';
}

export function getSEORobotsPerformanceLabel(status: SEORobotsPerformanceStatus): string {
  const labels: Record<SEORobotsPerformanceStatus, string> = {
    [SEO_ROBOTS_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_ROBOTS_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_ROBOTS_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_ROBOTS_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_ROBOTS_STATUS.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown Performance';
}

export function getSEORobotsValidationLabel(status: SEORobotsValidationStatus): string {
  const labels: Record<SEORobotsValidationStatus, string> = {
    [SEO_ROBOTS_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_ROBOTS_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_ROBOTS_STATUS.VALIDATION.VALID]: 'Valid',
    [SEO_ROBOTS_STATUS.VALIDATION.INVALID]: 'Invalid',
    [SEO_ROBOTS_STATUS.VALIDATION.PARTIAL]: 'Partially Valid',
    [SEO_ROBOTS_STATUS.VALIDATION.WARNING]: 'Validation Warning',
    [SEO_ROBOTS_STATUS.VALIDATION.ERROR]: 'Validation Error',
  };
  return labels[status] || 'Unknown Validation Status';
}

export function getSEORobotsStatusCategory(
  status: SEORobotsLifecycleStatus
): SEORobotsStatusCategory {
  const categories: Record<SEORobotsLifecycleStatus, SEORobotsStatusCategory> = {
    [SEO_ROBOTS_STATUS.LIFECYCLE.INITIATED]: SEO_ROBOTS_STATUS.CATEGORIES.ACTIVE,
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATING]: SEO_ROBOTS_STATUS.CATEGORIES.PROCESSING,
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATED]: SEO_ROBOTS_STATUS.CATEGORIES.ACTIVE,
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATING]: SEO_ROBOTS_STATUS.CATEGORIES.PROCESSING,
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATED]: SEO_ROBOTS_STATUS.CATEGORIES.COMPLETED,
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHING]: SEO_ROBOTS_STATUS.CATEGORIES.PROCESSING,
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHED]: SEO_ROBOTS_STATUS.CATEGORIES.COMPLETED,
    [SEO_ROBOTS_STATUS.LIFECYCLE.MONITORING]: SEO_ROBOTS_STATUS.CATEGORIES.ACTIVE,
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATING]: SEO_ROBOTS_STATUS.CATEGORIES.PROCESSING,
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATED]: SEO_ROBOTS_STATUS.CATEGORIES.COMPLETED,
    [SEO_ROBOTS_STATUS.LIFECYCLE.OUTDATED]: SEO_ROBOTS_STATUS.CATEGORIES.ERROR,
    [SEO_ROBOTS_STATUS.LIFECYCLE.ARCHIVED]: SEO_ROBOTS_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_ROBOTS_STATUS.CATEGORIES.ACTIVE;
}

export function getSEORobotsStatusColor(status: SEORobotsLifecycleStatus): string {
  const colors: Record<SEORobotsLifecycleStatus, string> = {
    [SEO_ROBOTS_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_ROBOTS_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATED]: '#4CAF50',
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHING]: '#00BCD4',
    [SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_ROBOTS_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATING]: '#FF9800',
    [SEO_ROBOTS_STATUS.LIFECYCLE.UPDATED]: '#8BC34A',
    [SEO_ROBOTS_STATUS.LIFECYCLE.OUTDATED]: '#F44336',
    [SEO_ROBOTS_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isRobotsValid(status: SEORobotsLifecycleStatus): boolean {
  const validStatuses: SEORobotsLifecycleStatus[] = [
    SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATED,
    SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHED,
    SEO_ROBOTS_STATUS.LIFECYCLE.UPDATED,
  ];
  return validStatuses.includes(status);
}

export function isRobotsProcessing(status: SEORobotsLifecycleStatus): boolean {
  const processingStatuses: SEORobotsLifecycleStatus[] = [
    SEO_ROBOTS_STATUS.LIFECYCLE.GENERATING,
    SEO_ROBOTS_STATUS.LIFECYCLE.VALIDATING,
    SEO_ROBOTS_STATUS.LIFECYCLE.PUBLISHING,
    SEO_ROBOTS_STATUS.LIFECYCLE.UPDATING,
  ];
  return processingStatuses.includes(status);
}
