/**
 * SEO Sitemap Status Constants
 * Status definitions for sitemaps and their lifecycle
 */

export const SEO_SITEMAP_STATUS = {
  // Sitemap Lifecycle Status
  LIFECYCLE: {
    CREATED: 'created',
    GENERATING: 'generating',
    GENERATED: 'generated',
    VALIDATING: 'validating',
    VALIDATED: 'validated',
    PUBLISHING: 'publishing',
    PUBLISHED: 'published',
    SUBMITTING: 'submitting',
    SUBMITTED: 'submitted',
    INDEXING: 'indexing',
    INDEXED: 'indexed',
    UPDATING: 'updating',
    UPDATED: 'updated',
    OUTDATED: 'outdated',
    DELETING: 'deleting',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
  } as const,

  // Sitemap Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Sitemap Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Sitemap Validation Status
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
    WARNING: 'warning',
    ERROR: 'error',
  } as const,

  // Sitemap Indexing Status
  INDEXING_STATUS: {
    NOT_INDEXED: 'not_indexed',
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    PARTIAL: 'partial',
    COMPLETE: 'complete',
    FAILED: 'failed',
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
export type SEOSitemapLifecycleStatus =
  (typeof SEO_SITEMAP_STATUS.LIFECYCLE)[keyof typeof SEO_SITEMAP_STATUS.LIFECYCLE];

// Health Status
export type SEOSitemapHealthStatus =
  (typeof SEO_SITEMAP_STATUS.HEALTH)[keyof typeof SEO_SITEMAP_STATUS.HEALTH];

// Quality Status
export type SEOSitemapQualityStatus =
  (typeof SEO_SITEMAP_STATUS.QUALITY)[keyof typeof SEO_SITEMAP_STATUS.QUALITY];

// Validation Status
export type SEOSitemapValidationStatus =
  (typeof SEO_SITEMAP_STATUS.VALIDATION)[keyof typeof SEO_SITEMAP_STATUS.VALIDATION];

// Indexing Status
export type SEOSitemapIndexingStatus =
  (typeof SEO_SITEMAP_STATUS.INDEXING_STATUS)[keyof typeof SEO_SITEMAP_STATUS.INDEXING_STATUS];

// Status Categories
export type SEOSitemapStatusCategory =
  (typeof SEO_SITEMAP_STATUS.CATEGORIES)[keyof typeof SEO_SITEMAP_STATUS.CATEGORIES];

// Utility Functions
export function getSEOSitemapLifecycleLabel(status: SEOSitemapLifecycleStatus): string {
  const labels: Record<SEOSitemapLifecycleStatus, string> = {
    [SEO_SITEMAP_STATUS.LIFECYCLE.CREATED]: 'Created',
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATED]: 'Validated',
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHING]: 'Publishing',
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTING]: 'Submitting',
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTED]: 'Submitted',
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXING]: 'Indexing',
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXED]: 'Indexed',
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATED]: 'Updated',
    [SEO_SITEMAP_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETING]: 'Deleting',
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETED]: 'Deleted',
    [SEO_SITEMAP_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOSitemapHealthLabel(status: SEOSitemapHealthStatus): string {
  const labels: Record<SEOSitemapHealthStatus, string> = {
    [SEO_SITEMAP_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_SITEMAP_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_SITEMAP_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_SITEMAP_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_SITEMAP_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOSitemapQualityLabel(status: SEOSitemapQualityStatus): string {
  const labels: Record<SEOSitemapQualityStatus, string> = {
    [SEO_SITEMAP_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_SITEMAP_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_SITEMAP_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_SITEMAP_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_SITEMAP_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOSitemapValidationLabel(status: SEOSitemapValidationStatus): string {
  const labels: Record<SEOSitemapValidationStatus, string> = {
    [SEO_SITEMAP_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_SITEMAP_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_SITEMAP_STATUS.VALIDATION.VALID]: 'Valid',
    [SEO_SITEMAP_STATUS.VALIDATION.INVALID]: 'Invalid',
    [SEO_SITEMAP_STATUS.VALIDATION.PARTIAL]: 'Partially Valid',
    [SEO_SITEMAP_STATUS.VALIDATION.WARNING]: 'Validation Warning',
    [SEO_SITEMAP_STATUS.VALIDATION.ERROR]: 'Validation Error',
  };
  return labels[status] || 'Unknown Validation Status';
}

export function getSEOSitemapIndexingLabel(status: SEOSitemapIndexingStatus): string {
  const labels: Record<SEOSitemapIndexingStatus, string> = {
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.NOT_INDEXED]: 'Not Indexed',
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.PENDING]: 'Pending Indexing',
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.IN_PROGRESS]: 'Indexing In Progress',
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.PARTIAL]: 'Partially Indexed',
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.COMPLETE]: 'Fully Indexed',
    [SEO_SITEMAP_STATUS.INDEXING_STATUS.FAILED]: 'Indexing Failed',
  };
  return labels[status] || 'Unknown Indexing Status';
}

export function getSEOSitemapStatusCategory(
  status: SEOSitemapLifecycleStatus
): SEOSitemapStatusCategory {
  const categories: Record<SEOSitemapLifecycleStatus, SEOSitemapStatusCategory> = {
    [SEO_SITEMAP_STATUS.LIFECYCLE.CREATED]: SEO_SITEMAP_STATUS.CATEGORIES.ACTIVE,
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATED]: SEO_SITEMAP_STATUS.CATEGORIES.ACTIVE,
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATED]: SEO_SITEMAP_STATUS.CATEGORIES.ACTIVE,
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHED]: SEO_SITEMAP_STATUS.CATEGORIES.COMPLETED,
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTED]: SEO_SITEMAP_STATUS.CATEGORIES.COMPLETED,
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXED]: SEO_SITEMAP_STATUS.CATEGORIES.COMPLETED,
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATING]: SEO_SITEMAP_STATUS.CATEGORIES.PROCESSING,
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATED]: SEO_SITEMAP_STATUS.CATEGORIES.COMPLETED,
    [SEO_SITEMAP_STATUS.LIFECYCLE.OUTDATED]: SEO_SITEMAP_STATUS.CATEGORIES.ERROR,
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETING]: SEO_SITEMAP_STATUS.CATEGORIES.ERROR,
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETED]: SEO_SITEMAP_STATUS.CATEGORIES.ERROR,
    [SEO_SITEMAP_STATUS.LIFECYCLE.ARCHIVED]: SEO_SITEMAP_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_SITEMAP_STATUS.CATEGORIES.ACTIVE;
}

export function getSEOSitemapStatusColor(status: SEOSitemapLifecycleStatus): string {
  const colors: Record<SEOSitemapLifecycleStatus, string> = {
    [SEO_SITEMAP_STATUS.LIFECYCLE.CREATED]: '#9E9E9E',
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_SITEMAP_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATED]: '#4CAF50',
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHING]: '#00BCD4',
    [SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTING]: '#3F51B5',
    [SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTED]: '#8BC34A',
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXING]: '#FF9800',
    [SEO_SITEMAP_STATUS.LIFECYCLE.INDEXED]: '#4CAF50',
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATING]: '#00BCD4',
    [SEO_SITEMAP_STATUS.LIFECYCLE.UPDATED]: '#4CAF50',
    [SEO_SITEMAP_STATUS.LIFECYCLE.OUTDATED]: '#FF9800',
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETING]: '#F44336',
    [SEO_SITEMAP_STATUS.LIFECYCLE.DELETED]: '#D32F2F',
    [SEO_SITEMAP_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSitemapValid(status: SEOSitemapLifecycleStatus): boolean {
  const validStatuses: SEOSitemapLifecycleStatus[] = [
    SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATED,
    SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHED,
    SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTED,
    SEO_SITEMAP_STATUS.LIFECYCLE.INDEXED,
    SEO_SITEMAP_STATUS.LIFECYCLE.UPDATED,
  ];
  return validStatuses.includes(status);
}

export function isSitemapProcessing(status: SEOSitemapLifecycleStatus): boolean {
  const processingStatuses: SEOSitemapLifecycleStatus[] = [
    SEO_SITEMAP_STATUS.LIFECYCLE.GENERATING,
    SEO_SITEMAP_STATUS.LIFECYCLE.VALIDATING,
    SEO_SITEMAP_STATUS.LIFECYCLE.PUBLISHING,
    SEO_SITEMAP_STATUS.LIFECYCLE.SUBMITTING,
    SEO_SITEMAP_STATUS.LIFECYCLE.INDEXING,
    SEO_SITEMAP_STATUS.LIFECYCLE.UPDATING,
    SEO_SITEMAP_STATUS.LIFECYCLE.DELETING,
  ];
  return processingStatuses.includes(status);
}
