/**
 * SEO Ranking Status Constants
 * Status definitions for SEO rankings and tracking
 */

export const SEO_RANKING_STATUS = {
  // Ranking Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    TRACKING: 'tracking',
    ANALYZING: 'analyzing',
    STABLE: 'stable',
    IMPROVING: 'improving',
    DECLINING: 'declining',
    PEAKING: 'peaking',
    BOTTOMING: 'bottoming',
    RECOVERING: 'recovering',
    LOST: 'lost',
    RECOVERED: 'recovered',
    ARCHIVED: 'archived',
  } as const,

  // Ranking Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Ranking Performance Status
  PERFORMANCE: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Ranking Risk Status
  RISK: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Ranking Visibility Status
  VISIBILITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none',
  } as const,

  // Ranking Tracking Status
  TRACKING: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    PENDING: 'pending',
    FAILED: 'failed',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    IMPROVING: 'improving',
    DECLINING: 'declining',
    STABLE: 'stable',
    LOST: 'lost',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEORankingLifecycleStatus =
  (typeof SEO_RANKING_STATUS.LIFECYCLE)[keyof typeof SEO_RANKING_STATUS.LIFECYCLE];

// Health Status
export type SEORankingHealthStatus =
  (typeof SEO_RANKING_STATUS.HEALTH)[keyof typeof SEO_RANKING_STATUS.HEALTH];

// Performance Status
export type SEORankingPerformanceStatus =
  (typeof SEO_RANKING_STATUS.PERFORMANCE)[keyof typeof SEO_RANKING_STATUS.PERFORMANCE];

// Risk Status
export type SEORankingRiskStatus =
  (typeof SEO_RANKING_STATUS.RISK)[keyof typeof SEO_RANKING_STATUS.RISK];

// Visibility Status
export type SEORankingVisibilityStatus =
  (typeof SEO_RANKING_STATUS.VISIBILITY)[keyof typeof SEO_RANKING_STATUS.VISIBILITY];

// Tracking Status
export type SEORankingTrackingStatus =
  (typeof SEO_RANKING_STATUS.TRACKING)[keyof typeof SEO_RANKING_STATUS.TRACKING];

// Status Categories
export type SEORankingStatusCategory =
  (typeof SEO_RANKING_STATUS.CATEGORIES)[keyof typeof SEO_RANKING_STATUS.CATEGORIES];

// Utility Functions
export function getSEORankingLifecycleLabel(status: SEORankingLifecycleStatus): string {
  const labels: Record<SEORankingLifecycleStatus, string> = {
    [SEO_RANKING_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_RANKING_STATUS.LIFECYCLE.TRACKING]: 'Tracking',
    [SEO_RANKING_STATUS.LIFECYCLE.ANALYZING]: 'Analyzing',
    [SEO_RANKING_STATUS.LIFECYCLE.STABLE]: 'Stable',
    [SEO_RANKING_STATUS.LIFECYCLE.IMPROVING]: 'Improving',
    [SEO_RANKING_STATUS.LIFECYCLE.DECLINING]: 'Declining',
    [SEO_RANKING_STATUS.LIFECYCLE.PEAKING]: 'Peaking',
    [SEO_RANKING_STATUS.LIFECYCLE.BOTTOMING]: 'Bottoming',
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERING]: 'Recovering',
    [SEO_RANKING_STATUS.LIFECYCLE.LOST]: 'Lost',
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERED]: 'Recovered',
    [SEO_RANKING_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEORankingHealthLabel(status: SEORankingHealthStatus): string {
  const labels: Record<SEORankingHealthStatus, string> = {
    [SEO_RANKING_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_RANKING_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_RANKING_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_RANKING_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEORankingPerformanceLabel(status: SEORankingPerformanceStatus): string {
  const labels: Record<SEORankingPerformanceStatus, string> = {
    [SEO_RANKING_STATUS.PERFORMANCE.EXCELLENT]: 'Excellent',
    [SEO_RANKING_STATUS.PERFORMANCE.GOOD]: 'Good',
    [SEO_RANKING_STATUS.PERFORMANCE.AVERAGE]: 'Average',
    [SEO_RANKING_STATUS.PERFORMANCE.BELOW_AVERAGE]: 'Below Average',
    [SEO_RANKING_STATUS.PERFORMANCE.POOR]: 'Poor',
    [SEO_RANKING_STATUS.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown Performance';
}

export function getSEORankingRiskLabel(status: SEORankingRiskStatus): string {
  const labels: Record<SEORankingRiskStatus, string> = {
    [SEO_RANKING_STATUS.RISK.LOW]: 'Low Risk',
    [SEO_RANKING_STATUS.RISK.MEDIUM]: 'Medium Risk',
    [SEO_RANKING_STATUS.RISK.HIGH]: 'High Risk',
    [SEO_RANKING_STATUS.RISK.CRITICAL]: 'Critical Risk',
  };
  return labels[status] || 'Unknown Risk Level';
}

export function getSEORankingVisibilityLabel(status: SEORankingVisibilityStatus): string {
  const labels: Record<SEORankingVisibilityStatus, string> = {
    [SEO_RANKING_STATUS.VISIBILITY.HIGH]: 'High Visibility',
    [SEO_RANKING_STATUS.VISIBILITY.MEDIUM]: 'Medium Visibility',
    [SEO_RANKING_STATUS.VISIBILITY.LOW]: 'Low Visibility',
    [SEO_RANKING_STATUS.VISIBILITY.NONE]: 'No Visibility',
  };
  return labels[status] || 'Unknown Visibility';
}

export function getSEORankingTrackingLabel(status: SEORankingTrackingStatus): string {
  const labels: Record<SEORankingTrackingStatus, string> = {
    [SEO_RANKING_STATUS.TRACKING.ACTIVE]: 'Active',
    [SEO_RANKING_STATUS.TRACKING.PAUSED]: 'Paused',
    [SEO_RANKING_STATUS.TRACKING.STOPPED]: 'Stopped',
    [SEO_RANKING_STATUS.TRACKING.PENDING]: 'Pending',
    [SEO_RANKING_STATUS.TRACKING.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown Tracking Status';
}

export function getSEORankingStatusCategory(
  status: SEORankingLifecycleStatus
): SEORankingStatusCategory {
  const categories: Record<SEORankingLifecycleStatus, SEORankingStatusCategory> = {
    [SEO_RANKING_STATUS.LIFECYCLE.INITIATED]: SEO_RANKING_STATUS.CATEGORIES.ACTIVE,
    [SEO_RANKING_STATUS.LIFECYCLE.TRACKING]: SEO_RANKING_STATUS.CATEGORIES.ACTIVE,
    [SEO_RANKING_STATUS.LIFECYCLE.ANALYZING]: SEO_RANKING_STATUS.CATEGORIES.ACTIVE,
    [SEO_RANKING_STATUS.LIFECYCLE.STABLE]: SEO_RANKING_STATUS.CATEGORIES.STABLE,
    [SEO_RANKING_STATUS.LIFECYCLE.IMPROVING]: SEO_RANKING_STATUS.CATEGORIES.IMPROVING,
    [SEO_RANKING_STATUS.LIFECYCLE.DECLINING]: SEO_RANKING_STATUS.CATEGORIES.DECLINING,
    [SEO_RANKING_STATUS.LIFECYCLE.PEAKING]: SEO_RANKING_STATUS.CATEGORIES.IMPROVING,
    [SEO_RANKING_STATUS.LIFECYCLE.BOTTOMING]: SEO_RANKING_STATUS.CATEGORIES.DECLINING,
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERING]: SEO_RANKING_STATUS.CATEGORIES.IMPROVING,
    [SEO_RANKING_STATUS.LIFECYCLE.LOST]: SEO_RANKING_STATUS.CATEGORIES.LOST,
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERED]: SEO_RANKING_STATUS.CATEGORIES.ACTIVE,
    [SEO_RANKING_STATUS.LIFECYCLE.ARCHIVED]: SEO_RANKING_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_RANKING_STATUS.CATEGORIES.ACTIVE;
}

export function getSEORankingStatusColor(status: SEORankingLifecycleStatus): string {
  const colors: Record<SEORankingLifecycleStatus, string> = {
    [SEO_RANKING_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_RANKING_STATUS.LIFECYCLE.TRACKING]: '#2196F3',
    [SEO_RANKING_STATUS.LIFECYCLE.ANALYZING]: '#00BCD4',
    [SEO_RANKING_STATUS.LIFECYCLE.STABLE]: '#4CAF50',
    [SEO_RANKING_STATUS.LIFECYCLE.IMPROVING]: '#8BC34A',
    [SEO_RANKING_STATUS.LIFECYCLE.DECLINING]: '#F44336',
    [SEO_RANKING_STATUS.LIFECYCLE.PEAKING]: '#4CAF50',
    [SEO_RANKING_STATUS.LIFECYCLE.BOTTOMING]: '#FF9800',
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERING]: '#FFC107',
    [SEO_RANKING_STATUS.LIFECYCLE.LOST]: '#D32F2F',
    [SEO_RANKING_STATUS.LIFECYCLE.RECOVERED]: '#8BC34A',
    [SEO_RANKING_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSEORankingImproving(status: SEORankingLifecycleStatus): boolean {
  const improvingStatuses: SEORankingLifecycleStatus[] = [
    SEO_RANKING_STATUS.LIFECYCLE.IMPROVING,
    SEO_RANKING_STATUS.LIFECYCLE.PEAKING,
    SEO_RANKING_STATUS.LIFECYCLE.RECOVERING,
  ];
  return improvingStatuses.includes(status);
}

export function isSEORankingDeclining(status: SEORankingLifecycleStatus): boolean {
  const decliningStatuses: SEORankingLifecycleStatus[] = [
    SEO_RANKING_STATUS.LIFECYCLE.DECLINING,
    SEO_RANKING_STATUS.LIFECYCLE.BOTTOMING,
    SEO_RANKING_STATUS.LIFECYCLE.LOST,
  ];
  return decliningStatuses.includes(status);
}

export function isSEORankingStable(status: SEORankingLifecycleStatus): boolean {
  return status === SEO_RANKING_STATUS.LIFECYCLE.STABLE;
}

export function isSEORankingActive(status: SEORankingLifecycleStatus): boolean {
  const activeStatuses: SEORankingLifecycleStatus[] = [
    SEO_RANKING_STATUS.LIFECYCLE.TRACKING,
    SEO_RANKING_STATUS.LIFECYCLE.ANALYZING,
    SEO_RANKING_STATUS.LIFECYCLE.STABLE,
    SEO_RANKING_STATUS.LIFECYCLE.IMPROVING,
    SEO_RANKING_STATUS.LIFECYCLE.DECLINING,
    SEO_RANKING_STATUS.LIFECYCLE.PEAKING,
    SEO_RANKING_STATUS.LIFECYCLE.BOTTOMING,
    SEO_RANKING_STATUS.LIFECYCLE.RECOVERING,
    SEO_RANKING_STATUS.LIFECYCLE.RECOVERED,
  ];
  return activeStatuses.includes(status);
}
