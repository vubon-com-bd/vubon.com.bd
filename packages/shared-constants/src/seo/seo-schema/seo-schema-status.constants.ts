/**
 * SEO Schema Status Constants
 * Status definitions for schema markup
 */

export const SEO_SCHEMA_STATUS = {
  // Schema Lifecycle Status
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

  // Schema Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Schema Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Schema Compliance Status
  COMPLIANCE: {
    COMPLIANT: 'compliant',
    PARTIAL: 'partial',
    NON_COMPLIANT: 'non_compliant',
    UNKNOWN: 'unknown',
  } as const,

  // Schema Performance Status
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
export type SEOSchemaLifecycleStatus =
  (typeof SEO_SCHEMA_STATUS.LIFECYCLE)[keyof typeof SEO_SCHEMA_STATUS.LIFECYCLE];

// Health Status
export type SEOSchemaHealthStatus =
  (typeof SEO_SCHEMA_STATUS.HEALTH)[keyof typeof SEO_SCHEMA_STATUS.HEALTH];

// Quality Status
export type SEOSchemaQualityStatus =
  (typeof SEO_SCHEMA_STATUS.QUALITY)[keyof typeof SEO_SCHEMA_STATUS.QUALITY];

// Compliance Status
export type SEOSchemaComplianceStatus =
  (typeof SEO_SCHEMA_STATUS.COMPLIANCE)[keyof typeof SEO_SCHEMA_STATUS.COMPLIANCE];

// Performance Status
export type SEOSchemaPerformanceStatus =
  (typeof SEO_SCHEMA_STATUS.PERFORMANCE)[keyof typeof SEO_SCHEMA_STATUS.PERFORMANCE];

// Status Categories
export type SEOSchemaStatusCategory =
  (typeof SEO_SCHEMA_STATUS.CATEGORIES)[keyof typeof SEO_SCHEMA_STATUS.CATEGORIES];

// Utility Functions
export function getSEOSchemaLifecycleLabel(status: SEOSchemaLifecycleStatus): string {
  const labels: Record<SEOSchemaLifecycleStatus, string> = {
    [SEO_SCHEMA_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_SCHEMA_STATUS.LIFECYCLE.RESEARCHING]: 'Researching',
    [SEO_SCHEMA_STATUS.LIFECYCLE.DESIGNING]: 'Designing',
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATED]: 'Validated',
    [SEO_SCHEMA_STATUS.LIFECYCLE.TESTING]: 'Testing',
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHING]: 'Publishing',
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_SCHEMA_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_SCHEMA_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_SCHEMA_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_SCHEMA_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOSchemaHealthLabel(status: SEOSchemaHealthStatus): string {
  const labels: Record<SEOSchemaHealthStatus, string> = {
    [SEO_SCHEMA_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_SCHEMA_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_SCHEMA_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_SCHEMA_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_SCHEMA_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOSchemaQualityLabel(status: SEOSchemaQualityStatus): string {
  const labels: Record<SEOSchemaQualityStatus, string> = {
    [SEO_SCHEMA_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_SCHEMA_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_SCHEMA_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_SCHEMA_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_SCHEMA_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOSchemaComplianceLabel(status: SEOSchemaComplianceStatus): string {
  const labels: Record<SEOSchemaComplianceStatus, string> = {
    [SEO_SCHEMA_STATUS.COMPLIANCE.COMPLIANT]: 'Compliant',
    [SEO_SCHEMA_STATUS.COMPLIANCE.PARTIAL]: 'Partially Compliant',
    [SEO_SCHEMA_STATUS.COMPLIANCE.NON_COMPLIANT]: 'Non-Compliant',
    [SEO_SCHEMA_STATUS.COMPLIANCE.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Compliance Status';
}

export function getSEOSchemaPerformanceLabel(status: SEOSchemaPerformanceStatus): string {
  const labels: Record<SEOSchemaPerformanceStatus, string> = {
    [SEO_SCHEMA_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_SCHEMA_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_SCHEMA_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_SCHEMA_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_SCHEMA_STATUS.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown Performance';
}

export function getSEOSchemaStatusCategory(
  status: SEOSchemaLifecycleStatus
): SEOSchemaStatusCategory {
  const categories: Record<SEOSchemaLifecycleStatus, SEOSchemaStatusCategory> = {
    [SEO_SCHEMA_STATUS.LIFECYCLE.INITIATED]: SEO_SCHEMA_STATUS.CATEGORIES.PLANNING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.RESEARCHING]: SEO_SCHEMA_STATUS.CATEGORIES.PLANNING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.DESIGNING]: SEO_SCHEMA_STATUS.CATEGORIES.PLANNING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATING]: SEO_SCHEMA_STATUS.CATEGORIES.PROCESSING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATED]: SEO_SCHEMA_STATUS.CATEGORIES.ACTIVE,
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATING]: SEO_SCHEMA_STATUS.CATEGORIES.PROCESSING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATED]: SEO_SCHEMA_STATUS.CATEGORIES.ACTIVE,
    [SEO_SCHEMA_STATUS.LIFECYCLE.TESTING]: SEO_SCHEMA_STATUS.CATEGORIES.PROCESSING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHING]: SEO_SCHEMA_STATUS.CATEGORIES.PROCESSING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHED]: SEO_SCHEMA_STATUS.CATEGORIES.COMPLETED,
    [SEO_SCHEMA_STATUS.LIFECYCLE.MONITORING]: SEO_SCHEMA_STATUS.CATEGORIES.ACTIVE,
    [SEO_SCHEMA_STATUS.LIFECYCLE.UPDATING]: SEO_SCHEMA_STATUS.CATEGORIES.PROCESSING,
    [SEO_SCHEMA_STATUS.LIFECYCLE.OUTDATED]: SEO_SCHEMA_STATUS.CATEGORIES.ERROR,
    [SEO_SCHEMA_STATUS.LIFECYCLE.ARCHIVED]: SEO_SCHEMA_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_SCHEMA_STATUS.CATEGORIES.PLANNING;
}

export function getSEOSchemaStatusColor(status: SEOSchemaLifecycleStatus): string {
  const colors: Record<SEOSchemaLifecycleStatus, string> = {
    [SEO_SCHEMA_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_SCHEMA_STATUS.LIFECYCLE.RESEARCHING]: '#2196F3',
    [SEO_SCHEMA_STATUS.LIFECYCLE.DESIGNING]: '#00BCD4',
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_SCHEMA_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATED]: '#4CAF50',
    [SEO_SCHEMA_STATUS.LIFECYCLE.TESTING]: '#FF9800',
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHING]: '#00BCD4',
    [SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_SCHEMA_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_SCHEMA_STATUS.LIFECYCLE.UPDATING]: '#FFC107',
    [SEO_SCHEMA_STATUS.LIFECYCLE.OUTDATED]: '#F44336',
    [SEO_SCHEMA_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSchemaValid(status: SEOSchemaLifecycleStatus): boolean {
  const validStatuses: SEOSchemaLifecycleStatus[] = [
    SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATED,
    SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHED,
  ];
  return validStatuses.includes(status);
}

export function isSchemaProcessing(status: SEOSchemaLifecycleStatus): boolean {
  const processingStatuses: SEOSchemaLifecycleStatus[] = [
    SEO_SCHEMA_STATUS.LIFECYCLE.GENERATING,
    SEO_SCHEMA_STATUS.LIFECYCLE.VALIDATING,
    SEO_SCHEMA_STATUS.LIFECYCLE.TESTING,
    SEO_SCHEMA_STATUS.LIFECYCLE.PUBLISHING,
    SEO_SCHEMA_STATUS.LIFECYCLE.UPDATING,
  ];
  return processingStatuses.includes(status);
}
