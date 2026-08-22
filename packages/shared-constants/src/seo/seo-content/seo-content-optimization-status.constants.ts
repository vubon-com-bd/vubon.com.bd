/**
 * SEO Content Optimization Status Constants
 * Status definitions for content optimization processes
 */

export const SEO_CONTENT_OPTIMIZATION_STATUS = {
  // Optimization Process Status
  PROCESS: {
    NOT_STARTED: 'not_started',
    INITIATED: 'initiated',
    IN_PROGRESS: 'in_progress',
    UNDER_REVIEW: 'under_review',
    APPROVED: 'approved',
    IMPLEMENTING: 'implementing',
    IMPLEMENTED: 'implemented',
    VERIFYING: 'verifying',
    VERIFIED: 'verified',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
  } as const,

  // Optimization Results
  RESULTS: {
    SUCCESS: 'success',
    PARTIAL_SUCCESS: 'partial_success',
    NO_IMPACT: 'no_impact',
    NEGATIVE_IMPACT: 'negative_impact',
    PENDING: 'pending',
    INCONCLUSIVE: 'inconclusive',
  } as const,

  // Optimization Performance
  PERFORMANCE: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    NEGATIVE: 'negative',
  } as const,

  // Optimization Health
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Optimization Validation
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALIDATED: 'validated',
    FAILED: 'failed',
    PARTIAL: 'partial',
    NEEDS_REVISION: 'needs_revision',
  } as const,

  // Status Categories
  CATEGORIES: {
    PLANNING: 'planning',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    IMPLEMENTED: 'implemented',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,
} as const;

// Process Status
export type SEOContentOptimizationProcessStatus =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS];

// Results Status
export type SEOContentOptimizationResultStatus =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS];

// Performance Status
export type SEOContentOptimizationPerformanceStatus =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE];

// Health Status
export type SEOContentOptimizationHealthStatus =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH];

// Validation Status
export type SEOContentOptimizationValidationStatus =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION];

// Status Categories
export type SEOContentOptimizationStatusCategory =
  (typeof SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES)[keyof typeof SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES];

// Utility Functions
export function getSEOContentOptimizationProcessLabel(
  status: SEOContentOptimizationProcessStatus
): string {
  const labels: Record<SEOContentOptimizationProcessStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.NOT_STARTED]: 'Not Started',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.INITIATED]: 'Initiated',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IN_PROGRESS]: 'In Progress',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.UNDER_REVIEW]: 'Under Review',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.APPROVED]: 'Approved',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTING]: 'Implementing',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTED]: 'Implemented',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFYING]: 'Verifying',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFIED]: 'Verified',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.COMPLETED]: 'Completed',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.FAILED]: 'Failed',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.CANCELLED]: 'Cancelled',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown Process Status';
}

export function getSEOContentOptimizationResultLabel(
  result: SEOContentOptimizationResultStatus
): string {
  const labels: Record<SEOContentOptimizationResultStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.SUCCESS]: 'Success',
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.PARTIAL_SUCCESS]: 'Partial Success',
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.NO_IMPACT]: 'No Impact',
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.NEGATIVE_IMPACT]: 'Negative Impact',
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.PENDING]: 'Pending',
    [SEO_CONTENT_OPTIMIZATION_STATUS.RESULTS.INCONCLUSIVE]: 'Inconclusive',
  };
  return labels[result] || 'Unknown Result';
}

export function getSEOContentOptimizationPerformanceLabel(
  performance: SEOContentOptimizationPerformanceStatus
): string {
  const labels: Record<SEOContentOptimizationPerformanceStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.BELOW_AVERAGE]: 'Below Average',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PERFORMANCE.NEGATIVE]: 'Negative',
  };
  return labels[performance] || 'Unknown Performance';
}

export function getSEOContentOptimizationHealthLabel(
  health: SEOContentOptimizationHealthStatus
): string {
  const labels: Record<SEOContentOptimizationHealthStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_CONTENT_OPTIMIZATION_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[health] || 'Unknown Health Status';
}

export function getSEOContentOptimizationValidationLabel(
  validation: SEOContentOptimizationValidationStatus
): string {
  const labels: Record<SEOContentOptimizationValidationStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.VALIDATED]: 'Validated',
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.FAILED]: 'Validation Failed',
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.PARTIAL]: 'Partially Validated',
    [SEO_CONTENT_OPTIMIZATION_STATUS.VALIDATION.NEEDS_REVISION]: 'Needs Revision',
  };
  return labels[validation] || 'Unknown Validation Status';
}

export function getSEOContentOptimizationStatusCategory(
  status: SEOContentOptimizationProcessStatus
): SEOContentOptimizationStatusCategory {
  const categories: Record<
    SEOContentOptimizationProcessStatus,
    SEOContentOptimizationStatusCategory
  > = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.NOT_STARTED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.PLANNING,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.INITIATED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.PLANNING,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IN_PROGRESS]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.UNDER_REVIEW]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.REVIEW,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.APPROVED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.REVIEW,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTING]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.IMPLEMENTED,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFYING]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFIED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.IMPLEMENTED,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.COMPLETED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.COMPLETED,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.FAILED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.FAILED,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.CANCELLED]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.CANCELLED,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.ON_HOLD]:
      SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.CANCELLED,
  };
  return categories[status] || SEO_CONTENT_OPTIMIZATION_STATUS.CATEGORIES.PLANNING;
}

export function getSEOContentOptimizationStatusColor(
  status: SEOContentOptimizationProcessStatus
): string {
  const colors: Record<SEOContentOptimizationProcessStatus, string> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.NOT_STARTED]: '#9E9E9E',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.INITIATED]: '#2196F3',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IN_PROGRESS]: '#00BCD4',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.UNDER_REVIEW]: '#FF9800',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.APPROVED]: '#4CAF50',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTING]: '#3F51B5',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTED]: '#8BC34A',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFYING]: '#9C27B0',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFIED]: '#4CAF50',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.COMPLETED]: '#4CAF50',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.FAILED]: '#F44336',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.CANCELLED]: '#F44336',
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.ON_HOLD]: '#FF9800',
  };
  return colors[status] || '#9E9E9E';
}

export function isOptimizationSuccessful(status: SEOContentOptimizationProcessStatus): boolean {
  const successStatuses: SEOContentOptimizationProcessStatus[] = [
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTED,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFIED,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.COMPLETED,
  ];
  return successStatuses.includes(status);
}

export function isOptimizationInProgress(status: SEOContentOptimizationProcessStatus): boolean {
  const progressStatuses: SEOContentOptimizationProcessStatus[] = [
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.INITIATED,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IN_PROGRESS,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.UNDER_REVIEW,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTING,
    SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFYING,
  ];
  return progressStatuses.includes(status);
}

export function getProgressPercentage(status: SEOContentOptimizationProcessStatus): number {
  const percentages: Record<SEOContentOptimizationProcessStatus, number> = {
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.NOT_STARTED]: 0,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.INITIATED]: 10,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IN_PROGRESS]: 40,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.UNDER_REVIEW]: 60,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.APPROVED]: 70,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTING]: 80,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.IMPLEMENTED]: 90,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFYING]: 95,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.VERIFIED]: 99,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.COMPLETED]: 100,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.FAILED]: 0,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.CANCELLED]: 0,
    [SEO_CONTENT_OPTIMIZATION_STATUS.PROCESS.ON_HOLD]: 0,
  };
  return percentages[status] || 0;
}
