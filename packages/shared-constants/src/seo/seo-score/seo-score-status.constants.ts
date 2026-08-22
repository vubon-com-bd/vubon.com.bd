/**
 * SEO Score Status Constants
 * Status definitions for SEO scoring process
 */

export const SEO_SCORE_STATUS = {
  // Score Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    DATA_COLLECTION: 'data_collection',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    CALCULATING: 'calculating',
    VALIDATING: 'validating',
    COMPLETED: 'completed',
    PUBLISHED: 'published',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
  } as const,

  // Score Quality Status
  QUALITY: {
    POOR: 'poor',
    FAIR: 'fair',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  // Score Accuracy Status
  ACCURACY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNKNOWN: 'unknown',
  } as const,

  // Score Reliability Status
  RELIABILITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    UNTESTED: 'untested',
  } as const,

  // Score Freshness Status
  FRESHNESS: {
    CURRENT: 'current',
    RECENT: 'recent',
    STALE: 'stale',
    OUTDATED: 'outdated',
  } as const,

  // Score Validation Status
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALIDATED: 'validated',
    FAILED: 'failed',
    PARTIAL: 'partial',
    NEEDS_REVIEW: 'needs_review',
  } as const,

  // Score Categories
  CATEGORIES: {
    CALCULATING: 'calculating',
    COMPLETED: 'completed',
    OUTDATED: 'outdated',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOScoreLifecycleStatus =
  (typeof SEO_SCORE_STATUS.LIFECYCLE)[keyof typeof SEO_SCORE_STATUS.LIFECYCLE];

// Quality Status
export type SEOScoreQualityStatus =
  (typeof SEO_SCORE_STATUS.QUALITY)[keyof typeof SEO_SCORE_STATUS.QUALITY];

// Accuracy Status
export type SEOScoreAccuracyStatus =
  (typeof SEO_SCORE_STATUS.ACCURACY)[keyof typeof SEO_SCORE_STATUS.ACCURACY];

// Reliability Status
export type SEOScoreReliabilityStatus =
  (typeof SEO_SCORE_STATUS.RELIABILITY)[keyof typeof SEO_SCORE_STATUS.RELIABILITY];

// Freshness Status
export type SEOScoreFreshnessStatus =
  (typeof SEO_SCORE_STATUS.FRESHNESS)[keyof typeof SEO_SCORE_STATUS.FRESHNESS];

// Validation Status
export type SEOScoreValidationStatus =
  (typeof SEO_SCORE_STATUS.VALIDATION)[keyof typeof SEO_SCORE_STATUS.VALIDATION];

// Status Categories
export type SEOScoreStatusCategory =
  (typeof SEO_SCORE_STATUS.CATEGORIES)[keyof typeof SEO_SCORE_STATUS.CATEGORIES];

// Utility Functions
export function getSEOScoreLifecycleLabel(status: SEOScoreLifecycleStatus): string {
  const labels: Record<SEOScoreLifecycleStatus, string> = {
    [SEO_SCORE_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_SCORE_STATUS.LIFECYCLE.DATA_COLLECTION]: 'Data Collection',
    [SEO_SCORE_STATUS.LIFECYCLE.PROCESSING]: 'Processing',
    [SEO_SCORE_STATUS.LIFECYCLE.ANALYZING]: 'Analyzing',
    [SEO_SCORE_STATUS.LIFECYCLE.CALCULATING]: 'Calculating',
    [SEO_SCORE_STATUS.LIFECYCLE.VALIDATING]: 'Validating',
    [SEO_SCORE_STATUS.LIFECYCLE.COMPLETED]: 'Completed',
    [SEO_SCORE_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_SCORE_STATUS.LIFECYCLE.UPDATING]: 'Updating',
    [SEO_SCORE_STATUS.LIFECYCLE.OUTDATED]: 'Outdated',
    [SEO_SCORE_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOScoreQualityStatusLabel(status: SEOScoreQualityStatus): string {
  const labels: Record<SEOScoreQualityStatus, string> = {
    [SEO_SCORE_STATUS.QUALITY.POOR]: 'Poor Quality',
    [SEO_SCORE_STATUS.QUALITY.FAIR]: 'Fair Quality',
    [SEO_SCORE_STATUS.QUALITY.GOOD]: 'Good Quality',
    [SEO_SCORE_STATUS.QUALITY.EXCELLENT]: 'Excellent Quality',
    [SEO_SCORE_STATUS.QUALITY.OUTSTANDING]: 'Outstanding Quality',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOScoreAccuracyLabel(status: SEOScoreAccuracyStatus): string {
  const labels: Record<SEOScoreAccuracyStatus, string> = {
    [SEO_SCORE_STATUS.ACCURACY.HIGH]: 'High Accuracy',
    [SEO_SCORE_STATUS.ACCURACY.MEDIUM]: 'Medium Accuracy',
    [SEO_SCORE_STATUS.ACCURACY.LOW]: 'Low Accuracy',
    [SEO_SCORE_STATUS.ACCURACY.UNKNOWN]: 'Unknown Accuracy',
  };
  return labels[status] || 'Unknown Accuracy';
}

export function getSEOScoreReliabilityLabel(status: SEOScoreReliabilityStatus): string {
  const labels: Record<SEOScoreReliabilityStatus, string> = {
    [SEO_SCORE_STATUS.RELIABILITY.HIGH]: 'High Reliability',
    [SEO_SCORE_STATUS.RELIABILITY.MEDIUM]: 'Medium Reliability',
    [SEO_SCORE_STATUS.RELIABILITY.LOW]: 'Low Reliability',
    [SEO_SCORE_STATUS.RELIABILITY.UNTESTED]: 'Untested',
  };
  return labels[status] || 'Unknown Reliability';
}

export function getSEOScoreFreshnessLabel(status: SEOScoreFreshnessStatus): string {
  const labels: Record<SEOScoreFreshnessStatus, string> = {
    [SEO_SCORE_STATUS.FRESHNESS.CURRENT]: 'Current',
    [SEO_SCORE_STATUS.FRESHNESS.RECENT]: 'Recent',
    [SEO_SCORE_STATUS.FRESHNESS.STALE]: 'Stale',
    [SEO_SCORE_STATUS.FRESHNESS.OUTDATED]: 'Outdated',
  };
  return labels[status] || 'Unknown Freshness';
}

export function getSEOScoreValidationLabel(status: SEOScoreValidationStatus): string {
  const labels: Record<SEOScoreValidationStatus, string> = {
    [SEO_SCORE_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_SCORE_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_SCORE_STATUS.VALIDATION.VALIDATED]: 'Validated',
    [SEO_SCORE_STATUS.VALIDATION.FAILED]: 'Validation Failed',
    [SEO_SCORE_STATUS.VALIDATION.PARTIAL]: 'Partially Validated',
    [SEO_SCORE_STATUS.VALIDATION.NEEDS_REVIEW]: 'Needs Review',
  };
  return labels[status] || 'Unknown Validation Status';
}

export function getSEOScoreStatusCategory(status: SEOScoreLifecycleStatus): SEOScoreStatusCategory {
  const categories: Record<SEOScoreLifecycleStatus, SEOScoreStatusCategory> = {
    [SEO_SCORE_STATUS.LIFECYCLE.INITIATED]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.DATA_COLLECTION]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.PROCESSING]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.ANALYZING]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.CALCULATING]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.VALIDATING]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.COMPLETED]: SEO_SCORE_STATUS.CATEGORIES.COMPLETED,
    [SEO_SCORE_STATUS.LIFECYCLE.PUBLISHED]: SEO_SCORE_STATUS.CATEGORIES.COMPLETED,
    [SEO_SCORE_STATUS.LIFECYCLE.UPDATING]: SEO_SCORE_STATUS.CATEGORIES.CALCULATING,
    [SEO_SCORE_STATUS.LIFECYCLE.OUTDATED]: SEO_SCORE_STATUS.CATEGORIES.OUTDATED,
    [SEO_SCORE_STATUS.LIFECYCLE.ARCHIVED]: SEO_SCORE_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_SCORE_STATUS.CATEGORIES.CALCULATING;
}

export function getSEOScoreStatusColor(status: SEOScoreLifecycleStatus): string {
  const colors: Record<SEOScoreLifecycleStatus, string> = {
    [SEO_SCORE_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_SCORE_STATUS.LIFECYCLE.DATA_COLLECTION]: '#2196F3',
    [SEO_SCORE_STATUS.LIFECYCLE.PROCESSING]: '#00BCD4',
    [SEO_SCORE_STATUS.LIFECYCLE.ANALYZING]: '#3F51B5',
    [SEO_SCORE_STATUS.LIFECYCLE.CALCULATING]: '#FF9800',
    [SEO_SCORE_STATUS.LIFECYCLE.VALIDATING]: '#9C27B0',
    [SEO_SCORE_STATUS.LIFECYCLE.COMPLETED]: '#4CAF50',
    [SEO_SCORE_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_SCORE_STATUS.LIFECYCLE.UPDATING]: '#FFC107',
    [SEO_SCORE_STATUS.LIFECYCLE.OUTDATED]: '#F44336',
    [SEO_SCORE_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isScoreCompleted(status: SEOScoreLifecycleStatus): boolean {
  const completedStatuses: SEOScoreLifecycleStatus[] = [
    SEO_SCORE_STATUS.LIFECYCLE.COMPLETED,
    SEO_SCORE_STATUS.LIFECYCLE.PUBLISHED,
  ];
  return completedStatuses.includes(status);
}

export function isScoreValid(status: SEOScoreLifecycleStatus): boolean {
  const validStatuses: SEOScoreLifecycleStatus[] = [
    SEO_SCORE_STATUS.LIFECYCLE.COMPLETED,
    SEO_SCORE_STATUS.LIFECYCLE.PUBLISHED,
    SEO_SCORE_STATUS.LIFECYCLE.UPDATING,
  ];
  return validStatuses.includes(status);
}

export function isScoreOutdated(status: SEOScoreLifecycleStatus): boolean {
  return status === SEO_SCORE_STATUS.LIFECYCLE.OUTDATED;
}
