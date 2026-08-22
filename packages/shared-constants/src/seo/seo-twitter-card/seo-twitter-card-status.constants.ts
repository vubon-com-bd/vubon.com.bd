/**
 * SEO Twitter Card Status Constants
 * Status definitions for Twitter Cards
 */

export const SEO_TWITTER_CARD_STATUS = {
  // Card Lifecycle Status
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

  // Card Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Card Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Card Compliance Status
  COMPLIANCE: {
    COMPLIANT: 'compliant',
    PARTIAL: 'partial',
    NON_COMPLIANT: 'non_compliant',
    UNKNOWN: 'unknown',
  } as const,

  // Card Performance Status
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
export type SEOTwitterCardLifecycleStatus =
  (typeof SEO_TWITTER_CARD_STATUS.LIFECYCLE)[keyof typeof SEO_TWITTER_CARD_STATUS.LIFECYCLE];

// Health Status
export type SEOTwitterCardHealthStatus =
  (typeof SEO_TWITTER_CARD_STATUS.HEALTH)[keyof typeof SEO_TWITTER_CARD_STATUS.HEALTH];

// Quality Status
export type SEOTwitterCardQualityStatus =
  (typeof SEO_TWITTER_CARD_STATUS.QUALITY)[keyof typeof SEO_TWITTER_CARD_STATUS.QUALITY];

// Compliance Status
export type SEOTwitterCardComplianceStatus =
  (typeof SEO_TWITTER_CARD_STATUS.COMPLIANCE)[keyof typeof SEO_TWITTER_CARD_STATUS.COMPLIANCE];

// Performance Status
export type SEOTwitterCardPerformanceStatus =
  (typeof SEO_TWITTER_CARD_STATUS.PERFORMANCE)[keyof typeof SEO_TWITTER_CARD_STATUS.PERFORMANCE];

// Status Categories
export type SEOTwitterCardStatusCategory =
  (typeof SEO_TWITTER_CARD_STATUS.CATEGORIES)[keyof typeof SEO_TWITTER_CARD_STATUS.CATEGORIES];

// Utility Functions
export function getSEOTwitterCardLifecycleLabel(status: SEOTwitterCardLifecycleStatus): string {
  const labels: Record<SEOTwitterCardLifecycleStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.RESEARCHING]: 'Researching',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.DESIGNING]: 'Designing',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATED]: 'Validated',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.TESTING]: 'Testing',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHING]: 'Publishing',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOTwitterCardHealthLabel(status: SEOTwitterCardHealthStatus): string {
  const labels: Record<SEOTwitterCardHealthStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_TWITTER_CARD_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_TWITTER_CARD_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_TWITTER_CARD_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_TWITTER_CARD_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOTwitterCardQualityLabel(status: SEOTwitterCardQualityStatus): string {
  const labels: Record<SEOTwitterCardQualityStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_TWITTER_CARD_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_TWITTER_CARD_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_TWITTER_CARD_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_TWITTER_CARD_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOTwitterCardComplianceLabel(status: SEOTwitterCardComplianceStatus): string {
  const labels: Record<SEOTwitterCardComplianceStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.COMPLIANCE.COMPLIANT]: 'Compliant',
    [SEO_TWITTER_CARD_STATUS.COMPLIANCE.PARTIAL]: 'Partially Compliant',
    [SEO_TWITTER_CARD_STATUS.COMPLIANCE.NON_COMPLIANT]: 'Non-Compliant',
    [SEO_TWITTER_CARD_STATUS.COMPLIANCE.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Compliance Status';
}

export function getSEOTwitterCardPerformanceLabel(status: SEOTwitterCardPerformanceStatus): string {
  const labels: Record<SEOTwitterCardPerformanceStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_TWITTER_CARD_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_TWITTER_CARD_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_TWITTER_CARD_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_TWITTER_CARD_STATUS.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown Performance';
}

export function getSEOTwitterCardStatusCategory(
  status: SEOTwitterCardLifecycleStatus
): SEOTwitterCardStatusCategory {
  const categories: Record<SEOTwitterCardLifecycleStatus, SEOTwitterCardStatusCategory> = {
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.INITIATED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PLANNING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.RESEARCHING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PLANNING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.DESIGNING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PLANNING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PROCESSING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.ACTIVE,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PROCESSING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.ACTIVE,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.TESTING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PROCESSING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PROCESSING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.COMPLETED,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.MONITORING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.ACTIVE,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.UPDATING]: SEO_TWITTER_CARD_STATUS.CATEGORIES.PROCESSING,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.OUTDATED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.ERROR,
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.ARCHIVED]: SEO_TWITTER_CARD_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_TWITTER_CARD_STATUS.CATEGORIES.PLANNING;
}

export function getSEOTwitterCardStatusColor(status: SEOTwitterCardLifecycleStatus): string {
  const colors: Record<SEOTwitterCardLifecycleStatus, string> = {
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.RESEARCHING]: '#2196F3',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.DESIGNING]: '#00BCD4',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATED]: '#4CAF50',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.TESTING]: '#FF9800',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHING]: '#00BCD4',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.UPDATING]: '#FFC107',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.OUTDATED]: '#F44336',
    [SEO_TWITTER_CARD_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isTwitterCardValid(status: SEOTwitterCardLifecycleStatus): boolean {
  const validStatuses: SEOTwitterCardLifecycleStatus[] = [
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATED,
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHED,
  ];
  return validStatuses.includes(status);
}

export function isTwitterCardProcessing(status: SEOTwitterCardLifecycleStatus): boolean {
  const processingStatuses: SEOTwitterCardLifecycleStatus[] = [
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.GENERATING,
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.VALIDATING,
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.TESTING,
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.PUBLISHING,
    SEO_TWITTER_CARD_STATUS.LIFECYCLE.UPDATING,
  ];
  return processingStatuses.includes(status);
}
