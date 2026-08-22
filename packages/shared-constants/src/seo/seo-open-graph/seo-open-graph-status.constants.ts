/**
 * SEO Open Graph Status Constants
 * Status definitions for Open Graph tags
 */

export const SEO_OPEN_GRAPH_STATUS = {
  // OG Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    RESEARCHING: 'researching',
    DESIGNING: 'designing',
    GENERATING: 'generating',
    GENERATED: 'generated',
    VALIDATING: 'validating',
    VALIDATED: 'validated',
    TESTING: 'testing',
    PUBLISHING: 'publishing',
    PUBLISHED: 'published',
    MONITORING: 'monitoring',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
  } as const,

  // OG Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // OG Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // OG Compliance Status
  COMPLIANCE: {
    COMPLIANT: 'compliant',
    PARTIAL: 'partial',
    NON_COMPLIANT: 'non_compliant',
    UNKNOWN: 'unknown',
  } as const,

  // OG Performance Status
  PERFORMANCE: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Status Categories
  CATEGORIES: {
    PLANNING: 'planning',
    ACTIVE: 'active',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    ERROR: 'error',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOOpenGraphLifecycleStatus =
  (typeof SEO_OPEN_GRAPH_STATUS.LIFECYCLE)[keyof typeof SEO_OPEN_GRAPH_STATUS.LIFECYCLE];

// Health Status
export type SEOOpenGraphHealthStatus =
  (typeof SEO_OPEN_GRAPH_STATUS.HEALTH)[keyof typeof SEO_OPEN_GRAPH_STATUS.HEALTH];

// Quality Status
export type SEOOpenGraphQualityStatus =
  (typeof SEO_OPEN_GRAPH_STATUS.QUALITY)[keyof typeof SEO_OPEN_GRAPH_STATUS.QUALITY];

// Compliance Status
export type SEOOpenGraphComplianceStatus =
  (typeof SEO_OPEN_GRAPH_STATUS.COMPLIANCE)[keyof typeof SEO_OPEN_GRAPH_STATUS.COMPLIANCE];

// Performance Status
export type SEOOpenGraphPerformanceStatus =
  (typeof SEO_OPEN_GRAPH_STATUS.PERFORMANCE)[keyof typeof SEO_OPEN_GRAPH_STATUS.PERFORMANCE];

// Status Categories
export type SEOOpenGraphStatusCategory =
  (typeof SEO_OPEN_GRAPH_STATUS.CATEGORIES)[keyof typeof SEO_OPEN_GRAPH_STATUS.CATEGORIES];

// Utility Functions
export function getSEOOpenGraphLifecycleLabel(status: SEOOpenGraphLifecycleStatus): string {
  const labels: Record<SEOOpenGraphLifecycleStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.RESEARCHING]: 'Researching',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.DESIGNING]: 'Designing',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATED]: 'Validated',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.TESTING]: 'Testing',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHING]: 'Publishing',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOOpenGraphHealthLabel(status: SEOOpenGraphHealthStatus): string {
  const labels: Record<SEOOpenGraphHealthStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_OPEN_GRAPH_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_OPEN_GRAPH_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_OPEN_GRAPH_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_OPEN_GRAPH_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOOpenGraphQualityLabel(status: SEOOpenGraphQualityStatus): string {
  const labels: Record<SEOOpenGraphQualityStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_OPEN_GRAPH_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_OPEN_GRAPH_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_OPEN_GRAPH_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_OPEN_GRAPH_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOOpenGraphComplianceLabel(status: SEOOpenGraphComplianceStatus): string {
  const labels: Record<SEOOpenGraphComplianceStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.COMPLIANCE.COMPLIANT]: 'Compliant',
    [SEO_OPEN_GRAPH_STATUS.COMPLIANCE.PARTIAL]: 'Partially Compliant',
    [SEO_OPEN_GRAPH_STATUS.COMPLIANCE.NON_COMPLIANT]: 'Non-Compliant',
    [SEO_OPEN_GRAPH_STATUS.COMPLIANCE.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Compliance Status';
}

export function getSEOOpenGraphPerformanceLabel(status: SEOOpenGraphPerformanceStatus): string {
  const labels: Record<SEOOpenGraphPerformanceStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_OPEN_GRAPH_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_OPEN_GRAPH_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_OPEN_GRAPH_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_OPEN_GRAPH_STATUS.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown Performance';
}

export function getSEOOpenGraphStatusCategory(
  status: SEOOpenGraphLifecycleStatus
): SEOOpenGraphStatusCategory {
  const categories: Record<SEOOpenGraphLifecycleStatus, SEOOpenGraphStatusCategory> = {
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.INITIATED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PLANNING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.RESEARCHING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PLANNING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.DESIGNING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PLANNING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PROCESSING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.ACTIVE,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PROCESSING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.ACTIVE,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.TESTING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PROCESSING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PROCESSING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.COMPLETED,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.MONITORING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.ACTIVE,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.UPDATING]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.PROCESSING,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.OUTDATED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.ERROR,
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.ARCHIVED]: SEO_OPEN_GRAPH_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_OPEN_GRAPH_STATUS.CATEGORIES.PLANNING;
}

export function getSEOOpenGraphStatusColor(status: SEOOpenGraphLifecycleStatus): string {
  const colors: Record<SEOOpenGraphLifecycleStatus, string> = {
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.RESEARCHING]: '#2196F3',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.DESIGNING]: '#00BCD4',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATED]: '#4CAF50',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.TESTING]: '#FF9800',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHING]: '#00BCD4',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.UPDATING]: '#FFC107',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.OUTDATED]: '#F44336',
    [SEO_OPEN_GRAPH_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isOGValid(status: SEOOpenGraphLifecycleStatus): boolean {
  const validStatuses: SEOOpenGraphLifecycleStatus[] = [
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATED,
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHED,
  ];
  return validStatuses.includes(status);
}

export function isOGProcessing(status: SEOOpenGraphLifecycleStatus): boolean {
  const processingStatuses: SEOOpenGraphLifecycleStatus[] = [
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.GENERATING,
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.VALIDATING,
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.TESTING,
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.PUBLISHING,
    SEO_OPEN_GRAPH_STATUS.LIFECYCLE.UPDATING,
  ];
  return processingStatuses.includes(status);
}
