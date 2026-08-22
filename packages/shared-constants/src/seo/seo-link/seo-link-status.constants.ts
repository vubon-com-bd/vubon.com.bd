/**
 * SEO Link Status Constants
 * Status definitions for links and their lifecycle
 */

export const SEO_LINK_STATUS = {
  // Link Lifecycle Status
  LIFECYCLE: {
    DISCOVERED: 'discovered',
    ANALYZING: 'analyzing',
    VERIFIED: 'verified',
    ACTIVE: 'active',
    MONITORING: 'monitoring',
    DECLINING: 'declining',
    LOST: 'lost',
    BROKEN: 'broken',
    REMOVED: 'removed',
    ARCHIVED: 'archived',
  } as const,

  // Link Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Link Risk Status
  RISK: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Link Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Link Trust Status
  TRUST: {
    TRUSTED: 'trusted',
    NEUTRAL: 'neutral',
    SUSPICIOUS: 'suspicious',
    UNTRUSTED: 'untrusted',
  } as const,

  // Link Authority Status
  AUTHORITY: {
    HIGH_AUTHORITY: 'high_authority',
    MEDIUM_AUTHORITY: 'medium_authority',
    LOW_AUTHORITY: 'low_authority',
    NO_AUTHORITY: 'no_authority',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    PROBLEMATIC: 'problematic',
    LOST: 'lost',
    REMOVED: 'removed',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOLinkLifecycleStatus =
  (typeof SEO_LINK_STATUS.LIFECYCLE)[keyof typeof SEO_LINK_STATUS.LIFECYCLE];

// Health Status
export type SEOLinkHealthStatus =
  (typeof SEO_LINK_STATUS.HEALTH)[keyof typeof SEO_LINK_STATUS.HEALTH];

// Risk Status
export type SEOLinkRiskStatus = (typeof SEO_LINK_STATUS.RISK)[keyof typeof SEO_LINK_STATUS.RISK];

// Quality Status
export type SEOLinkQualityStatus =
  (typeof SEO_LINK_STATUS.QUALITY)[keyof typeof SEO_LINK_STATUS.QUALITY];

// Trust Status
export type SEOLinkTrustStatus = (typeof SEO_LINK_STATUS.TRUST)[keyof typeof SEO_LINK_STATUS.TRUST];

// Authority Status
export type SEOLinkAuthorityStatus =
  (typeof SEO_LINK_STATUS.AUTHORITY)[keyof typeof SEO_LINK_STATUS.AUTHORITY];

// Status Categories
export type SEOLinkStatusCategory =
  (typeof SEO_LINK_STATUS.CATEGORIES)[keyof typeof SEO_LINK_STATUS.CATEGORIES];

// Utility Functions
export function getSEOLinkLifecycleLabel(status: SEOLinkLifecycleStatus): string {
  const labels: Record<SEOLinkLifecycleStatus, string> = {
    [SEO_LINK_STATUS.LIFECYCLE.DISCOVERED]: 'Discovered',
    [SEO_LINK_STATUS.LIFECYCLE.ANALYZING]: 'Analyzing',
    [SEO_LINK_STATUS.LIFECYCLE.VERIFIED]: 'Verified',
    [SEO_LINK_STATUS.LIFECYCLE.ACTIVE]: 'Active',
    [SEO_LINK_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_LINK_STATUS.LIFECYCLE.DECLINING]: 'Declining',
    [SEO_LINK_STATUS.LIFECYCLE.LOST]: 'Lost',
    [SEO_LINK_STATUS.LIFECYCLE.BROKEN]: 'Broken',
    [SEO_LINK_STATUS.LIFECYCLE.REMOVED]: 'Removed',
    [SEO_LINK_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOLinkHealthLabel(status: SEOLinkHealthStatus): string {
  const labels: Record<SEOLinkHealthStatus, string> = {
    [SEO_LINK_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_LINK_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_LINK_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_LINK_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOLinkRiskLabel(status: SEOLinkRiskStatus): string {
  const labels: Record<SEOLinkRiskStatus, string> = {
    [SEO_LINK_STATUS.RISK.LOW]: 'Low Risk',
    [SEO_LINK_STATUS.RISK.MEDIUM]: 'Medium Risk',
    [SEO_LINK_STATUS.RISK.HIGH]: 'High Risk',
    [SEO_LINK_STATUS.RISK.CRITICAL]: 'Critical Risk',
  };
  return labels[status] || 'Unknown Risk Level';
}

export function getSEOLinkQualityLabel(status: SEOLinkQualityStatus): string {
  const labels: Record<SEOLinkQualityStatus, string> = {
    [SEO_LINK_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_LINK_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_LINK_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_LINK_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_LINK_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOLinkTrustLabel(status: SEOLinkTrustStatus): string {
  const labels: Record<SEOLinkTrustStatus, string> = {
    [SEO_LINK_STATUS.TRUST.TRUSTED]: 'Trusted',
    [SEO_LINK_STATUS.TRUST.NEUTRAL]: 'Neutral',
    [SEO_LINK_STATUS.TRUST.SUSPICIOUS]: 'Suspicious',
    [SEO_LINK_STATUS.TRUST.UNTRUSTED]: 'Untrusted',
  };
  return labels[status] || 'Unknown Trust Status';
}

export function getSEOLinkAuthorityStatusLabel(status: SEOLinkAuthorityStatus): string {
  const labels: Record<SEOLinkAuthorityStatus, string> = {
    [SEO_LINK_STATUS.AUTHORITY.HIGH_AUTHORITY]: 'High Authority',
    [SEO_LINK_STATUS.AUTHORITY.MEDIUM_AUTHORITY]: 'Medium Authority',
    [SEO_LINK_STATUS.AUTHORITY.LOW_AUTHORITY]: 'Low Authority',
    [SEO_LINK_STATUS.AUTHORITY.NO_AUTHORITY]: 'No Authority',
  };
  return labels[status] || 'Unknown Authority Status';
}

export function getSEOLinkStatusCategory(status: SEOLinkLifecycleStatus): SEOLinkStatusCategory {
  const categories: Record<SEOLinkLifecycleStatus, SEOLinkStatusCategory> = {
    [SEO_LINK_STATUS.LIFECYCLE.DISCOVERED]: SEO_LINK_STATUS.CATEGORIES.PENDING,
    [SEO_LINK_STATUS.LIFECYCLE.ANALYZING]: SEO_LINK_STATUS.CATEGORIES.PENDING,
    [SEO_LINK_STATUS.LIFECYCLE.VERIFIED]: SEO_LINK_STATUS.CATEGORIES.ACTIVE,
    [SEO_LINK_STATUS.LIFECYCLE.ACTIVE]: SEO_LINK_STATUS.CATEGORIES.ACTIVE,
    [SEO_LINK_STATUS.LIFECYCLE.MONITORING]: SEO_LINK_STATUS.CATEGORIES.ACTIVE,
    [SEO_LINK_STATUS.LIFECYCLE.DECLINING]: SEO_LINK_STATUS.CATEGORIES.PROBLEMATIC,
    [SEO_LINK_STATUS.LIFECYCLE.LOST]: SEO_LINK_STATUS.CATEGORIES.LOST,
    [SEO_LINK_STATUS.LIFECYCLE.BROKEN]: SEO_LINK_STATUS.CATEGORIES.PROBLEMATIC,
    [SEO_LINK_STATUS.LIFECYCLE.REMOVED]: SEO_LINK_STATUS.CATEGORIES.REMOVED,
    [SEO_LINK_STATUS.LIFECYCLE.ARCHIVED]: SEO_LINK_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_LINK_STATUS.CATEGORIES.PENDING;
}

export function getSEOLinkStatusColor(status: SEOLinkLifecycleStatus): string {
  const colors: Record<SEOLinkLifecycleStatus, string> = {
    [SEO_LINK_STATUS.LIFECYCLE.DISCOVERED]: '#9E9E9E',
    [SEO_LINK_STATUS.LIFECYCLE.ANALYZING]: '#2196F3',
    [SEO_LINK_STATUS.LIFECYCLE.VERIFIED]: '#4CAF50',
    [SEO_LINK_STATUS.LIFECYCLE.ACTIVE]: '#4CAF50',
    [SEO_LINK_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_LINK_STATUS.LIFECYCLE.DECLINING]: '#FF9800',
    [SEO_LINK_STATUS.LIFECYCLE.LOST]: '#F44336',
    [SEO_LINK_STATUS.LIFECYCLE.BROKEN]: '#D32F2F',
    [SEO_LINK_STATUS.LIFECYCLE.REMOVED]: '#9E9E9E',
    [SEO_LINK_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isLinkHealthy(status: SEOLinkLifecycleStatus): boolean {
  const healthyStatuses: SEOLinkLifecycleStatus[] = [
    SEO_LINK_STATUS.LIFECYCLE.VERIFIED,
    SEO_LINK_STATUS.LIFECYCLE.ACTIVE,
    SEO_LINK_STATUS.LIFECYCLE.MONITORING,
  ];
  return healthyStatuses.includes(status);
}

export function isLinkProblematic(status: SEOLinkLifecycleStatus): boolean {
  const problematicStatuses: SEOLinkLifecycleStatus[] = [
    SEO_LINK_STATUS.LIFECYCLE.DECLINING,
    SEO_LINK_STATUS.LIFECYCLE.LOST,
    SEO_LINK_STATUS.LIFECYCLE.BROKEN,
  ];
  return problematicStatuses.includes(status);
}
