/**
 * SEO Keyword Status Constants
 * Status definitions for keywords throughout their lifecycle
 */

export const SEO_KEYWORD_STATUS = {
  // Keyword Lifecycle Status
  LIFECYCLE: {
    DISCOVERED: 'discovered',
    RESEARCHING: 'researching',
    ANALYZING: 'analyzing',
    PRIORITIZING: 'prioritizing',
    ASSIGNED: 'assigned',
    IN_PROGRESS: 'in_progress',
    UNDER_REVIEW: 'under_review',
    OPTIMIZED: 'optimized',
    MONITORING: 'monitoring',
    SUCCESSFUL: 'successful',
    UNSUCCESSFUL: 'unsuccessful',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,

  // Priority Status
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKLOG: 'backlog',
  } as const,

  // Progress Status
  PROGRESS: {
    NOT_STARTED: 'not_started',
    INITIATED: 'initiated',
    HALF_WAY: 'half_way',
    NEAR_COMPLETION: 'near_completion',
    COMPLETED: 'completed',
    BLOCKED: 'blocked',
    DELAYED: 'delayed',
  } as const,

  // Quality Status
  QUALITY: {
    POOR: 'poor',
    FAIR: 'fair',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  // Ranking Status
  RANKING: {
    NOT_RANKING: 'not_ranking',
    RANKING_LOW: 'ranking_low', // Position 11-100
    RANKING_MEDIUM: 'ranking_medium', // Position 4-10
    RANKING_HIGH: 'ranking_high', // Position 1-3
    FEATURED_SNIPPET: 'featured_snippet',
    PEOPLE_ALSO_ASK: 'people_also_ask',
    LOCAL_PACK: 'local_pack',
    IMAGE_PACK: 'image_pack',
    VIDEO_PACK: 'video_pack',
    NEWS_PACK: 'news_pack',
  } as const,

  // Category Status
  CATEGORIES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOKeywordLifecycleStatus =
  (typeof SEO_KEYWORD_STATUS.LIFECYCLE)[keyof typeof SEO_KEYWORD_STATUS.LIFECYCLE];

// Priority Status
export type SEOKeywordPriorityStatus =
  (typeof SEO_KEYWORD_STATUS.PRIORITY)[keyof typeof SEO_KEYWORD_STATUS.PRIORITY];

// Progress Status
export type SEOKeywordProgressStatus =
  (typeof SEO_KEYWORD_STATUS.PROGRESS)[keyof typeof SEO_KEYWORD_STATUS.PROGRESS];

// Quality Status
export type SEOKeywordQualityStatus =
  (typeof SEO_KEYWORD_STATUS.QUALITY)[keyof typeof SEO_KEYWORD_STATUS.QUALITY];

// Ranking Status
export type SEOKeywordRankingStatus =
  (typeof SEO_KEYWORD_STATUS.RANKING)[keyof typeof SEO_KEYWORD_STATUS.RANKING];

// Category Status
export type SEOKeywordCategoryStatus =
  (typeof SEO_KEYWORD_STATUS.CATEGORIES)[keyof typeof SEO_KEYWORD_STATUS.CATEGORIES];

// Utility Functions
export function getSEOKeywordLifecycleLabel(status: SEOKeywordLifecycleStatus): string {
  const labels: Record<SEOKeywordLifecycleStatus, string> = {
    [SEO_KEYWORD_STATUS.LIFECYCLE.DISCOVERED]: 'Discovered',
    [SEO_KEYWORD_STATUS.LIFECYCLE.RESEARCHING]: 'Researching',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ANALYZING]: 'Analyzing',
    [SEO_KEYWORD_STATUS.LIFECYCLE.PRIORITIZING]: 'Prioritizing',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ASSIGNED]: 'Assigned',
    [SEO_KEYWORD_STATUS.LIFECYCLE.IN_PROGRESS]: 'In Progress',
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNDER_REVIEW]: 'Under Review',
    [SEO_KEYWORD_STATUS.LIFECYCLE.OPTIMIZED]: 'Optimized',
    [SEO_KEYWORD_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_KEYWORD_STATUS.LIFECYCLE.SUCCESSFUL]: 'Successful',
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNSUCCESSFUL]: 'Unsuccessful',
    [SEO_KEYWORD_STATUS.LIFECYCLE.DEPRECATED]: 'Deprecated',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOKeywordPriorityLabel(priority: SEOKeywordPriorityStatus): string {
  const labels: Record<SEOKeywordPriorityStatus, string> = {
    [SEO_KEYWORD_STATUS.PRIORITY.CRITICAL]: 'Critical',
    [SEO_KEYWORD_STATUS.PRIORITY.HIGH]: 'High',
    [SEO_KEYWORD_STATUS.PRIORITY.MEDIUM]: 'Medium',
    [SEO_KEYWORD_STATUS.PRIORITY.LOW]: 'Low',
    [SEO_KEYWORD_STATUS.PRIORITY.BACKLOG]: 'Backlog',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOKeywordProgressLabel(status: SEOKeywordProgressStatus): string {
  const labels: Record<SEOKeywordProgressStatus, string> = {
    [SEO_KEYWORD_STATUS.PROGRESS.NOT_STARTED]: 'Not Started',
    [SEO_KEYWORD_STATUS.PROGRESS.INITIATED]: 'Initiated',
    [SEO_KEYWORD_STATUS.PROGRESS.HALF_WAY]: 'Half Way',
    [SEO_KEYWORD_STATUS.PROGRESS.NEAR_COMPLETION]: 'Near Completion',
    [SEO_KEYWORD_STATUS.PROGRESS.COMPLETED]: 'Completed',
    [SEO_KEYWORD_STATUS.PROGRESS.BLOCKED]: 'Blocked',
    [SEO_KEYWORD_STATUS.PROGRESS.DELAYED]: 'Delayed',
  };
  return labels[status] || 'Unknown Progress';
}

export function getSEOKeywordQualityLabel(status: SEOKeywordQualityStatus): string {
  const labels: Record<SEOKeywordQualityStatus, string> = {
    [SEO_KEYWORD_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_KEYWORD_STATUS.QUALITY.FAIR]: 'Fair',
    [SEO_KEYWORD_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_KEYWORD_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_KEYWORD_STATUS.QUALITY.OUTSTANDING]: 'Outstanding',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOKeywordRankingLabel(status: SEOKeywordRankingStatus): string {
  const labels: Record<SEOKeywordRankingStatus, string> = {
    [SEO_KEYWORD_STATUS.RANKING.NOT_RANKING]: 'Not Ranking',
    [SEO_KEYWORD_STATUS.RANKING.RANKING_LOW]: 'Ranking Low (11-100)',
    [SEO_KEYWORD_STATUS.RANKING.RANKING_MEDIUM]: 'Ranking Medium (4-10)',
    [SEO_KEYWORD_STATUS.RANKING.RANKING_HIGH]: 'Ranking High (1-3)',
    [SEO_KEYWORD_STATUS.RANKING.FEATURED_SNIPPET]: 'Featured Snippet',
    [SEO_KEYWORD_STATUS.RANKING.PEOPLE_ALSO_ASK]: 'People Also Ask',
    [SEO_KEYWORD_STATUS.RANKING.LOCAL_PACK]: 'Local Pack',
    [SEO_KEYWORD_STATUS.RANKING.IMAGE_PACK]: 'Image Pack',
    [SEO_KEYWORD_STATUS.RANKING.VIDEO_PACK]: 'Video Pack',
    [SEO_KEYWORD_STATUS.RANKING.NEWS_PACK]: 'News Pack',
  };
  return labels[status] || 'Unknown Ranking Status';
}

export function getSEOKeywordStatusCategory(
  status: SEOKeywordLifecycleStatus
): SEOKeywordCategoryStatus {
  const categories: Record<SEOKeywordLifecycleStatus, SEOKeywordCategoryStatus> = {
    [SEO_KEYWORD_STATUS.LIFECYCLE.DISCOVERED]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.RESEARCHING]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.ANALYZING]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.PRIORITIZING]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.ASSIGNED]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.IN_PROGRESS]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNDER_REVIEW]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.OPTIMIZED]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.MONITORING]: SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE,
    [SEO_KEYWORD_STATUS.LIFECYCLE.SUCCESSFUL]: SEO_KEYWORD_STATUS.CATEGORIES.COMPLETED,
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNSUCCESSFUL]: SEO_KEYWORD_STATUS.CATEGORIES.CANCELLED,
    [SEO_KEYWORD_STATUS.LIFECYCLE.DEPRECATED]: SEO_KEYWORD_STATUS.CATEGORIES.ARCHIVED,
    [SEO_KEYWORD_STATUS.LIFECYCLE.ARCHIVED]: SEO_KEYWORD_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_KEYWORD_STATUS.CATEGORIES.ACTIVE;
}

export function getSEOKeywordStatusColor(status: SEOKeywordLifecycleStatus): string {
  const colors: Record<SEOKeywordLifecycleStatus, string> = {
    [SEO_KEYWORD_STATUS.LIFECYCLE.DISCOVERED]: '#9E9E9E',
    [SEO_KEYWORD_STATUS.LIFECYCLE.RESEARCHING]: '#2196F3',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ANALYZING]: '#FF9800',
    [SEO_KEYWORD_STATUS.LIFECYCLE.PRIORITIZING]: '#FFC107',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ASSIGNED]: '#00BCD4',
    [SEO_KEYWORD_STATUS.LIFECYCLE.IN_PROGRESS]: '#3F51B5',
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNDER_REVIEW]: '#9C27B0',
    [SEO_KEYWORD_STATUS.LIFECYCLE.OPTIMIZED]: '#8BC34A',
    [SEO_KEYWORD_STATUS.LIFECYCLE.MONITORING]: '#4CAF50',
    [SEO_KEYWORD_STATUS.LIFECYCLE.SUCCESSFUL]: '#4CAF50',
    [SEO_KEYWORD_STATUS.LIFECYCLE.UNSUCCESSFUL]: '#F44336',
    [SEO_KEYWORD_STATUS.LIFECYCLE.DEPRECATED]: '#FF9800',
    [SEO_KEYWORD_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isKeywordActive(status: SEOKeywordLifecycleStatus): boolean {
  const activeStatuses: SEOKeywordLifecycleStatus[] = [
    SEO_KEYWORD_STATUS.LIFECYCLE.DISCOVERED,
    SEO_KEYWORD_STATUS.LIFECYCLE.RESEARCHING,
    SEO_KEYWORD_STATUS.LIFECYCLE.ANALYZING,
    SEO_KEYWORD_STATUS.LIFECYCLE.PRIORITIZING,
    SEO_KEYWORD_STATUS.LIFECYCLE.ASSIGNED,
    SEO_KEYWORD_STATUS.LIFECYCLE.IN_PROGRESS,
    SEO_KEYWORD_STATUS.LIFECYCLE.UNDER_REVIEW,
    SEO_KEYWORD_STATUS.LIFECYCLE.OPTIMIZED,
    SEO_KEYWORD_STATUS.LIFECYCLE.MONITORING,
  ];
  return activeStatuses.includes(status);
}

export function isKeywordCompleted(status: SEOKeywordLifecycleStatus): boolean {
  const completedStatuses: SEOKeywordLifecycleStatus[] = [
    SEO_KEYWORD_STATUS.LIFECYCLE.SUCCESSFUL,
    SEO_KEYWORD_STATUS.LIFECYCLE.UNSUCCESSFUL,
    SEO_KEYWORD_STATUS.LIFECYCLE.DEPRECATED,
    SEO_KEYWORD_STATUS.LIFECYCLE.ARCHIVED,
  ];
  return completedStatuses.includes(status);
}

export function getProgressPercentage(status: SEOKeywordProgressStatus): number {
  const percentages: Record<SEOKeywordProgressStatus, number> = {
    [SEO_KEYWORD_STATUS.PROGRESS.NOT_STARTED]: 0,
    [SEO_KEYWORD_STATUS.PROGRESS.INITIATED]: 20,
    [SEO_KEYWORD_STATUS.PROGRESS.HALF_WAY]: 50,
    [SEO_KEYWORD_STATUS.PROGRESS.NEAR_COMPLETION]: 80,
    [SEO_KEYWORD_STATUS.PROGRESS.COMPLETED]: 100,
    [SEO_KEYWORD_STATUS.PROGRESS.BLOCKED]: 0,
    [SEO_KEYWORD_STATUS.PROGRESS.DELAYED]: 0,
  };
  return percentages[status] || 0;
}
