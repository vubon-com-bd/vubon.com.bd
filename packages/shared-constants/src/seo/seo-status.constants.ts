/**
 * SEO Status Constants
 * Status definitions for SEO elements and tasks
 */

export const SEO_STATUS = {
  // Task Status
  TASK_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    BLOCKED: 'blocked',
    REVIEW: 'review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Page Status
  PAGE_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
    ARCHIVED: 'archived',
    UNDER_REVIEW: 'under_review',
    IN_QUEUE: 'in_queue',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
  } as const,

  // Link Status
  LINK_STATUS: {
    ACTIVE: 'active',
    BROKEN: 'broken',
    REDIRECTED: 'redirected',
    NOFOLLOW: 'nofollow',
    FOLLOW: 'follow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
    REMOVED: 'removed',
  } as const,

  // Index Status
  INDEX_STATUS: {
    INDEXED: 'indexed',
    NOT_INDEXED: 'not_indexed',
    PENDING: 'pending',
    BLOCKED: 'blocked',
    NOINDEX: 'noindex',
    DISCOVERED: 'discovered',
    CRAWL_ERROR: 'crawl_error',
    TEMPORARY: 'temporary',
  } as const,

  // Crawl Status
  CRAWL_STATUS: {
    SUCCESS: 'success',
    FAILED: 'failed',
    BLOCKED: 'blocked',
    TIMEOUT: 'timeout',
    REDIRECT: 'redirect',
    ERROR: 'error',
    PARTIAL: 'partial',
  } as const,

  // SEO Task Priority
  TASK_PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none',
  } as const,

  // Status Categories
  STATUS_CATEGORIES: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,
} as const;

// Task Status
export type SEOTaskStatus = (typeof SEO_STATUS.TASK_STATUS)[keyof typeof SEO_STATUS.TASK_STATUS];

// Page Status
export type SEOPageStatus = (typeof SEO_STATUS.PAGE_STATUS)[keyof typeof SEO_STATUS.PAGE_STATUS];

// Link Status
export type SEOLinkStatus = (typeof SEO_STATUS.LINK_STATUS)[keyof typeof SEO_STATUS.LINK_STATUS];

// Index Status
export type SEOIndexStatus = (typeof SEO_STATUS.INDEX_STATUS)[keyof typeof SEO_STATUS.INDEX_STATUS];

// Crawl Status
export type SEOCrawlStatus = (typeof SEO_STATUS.CRAWL_STATUS)[keyof typeof SEO_STATUS.CRAWL_STATUS];

// Task Priority
export type SEOTaskPriority =
  (typeof SEO_STATUS.TASK_PRIORITY)[keyof typeof SEO_STATUS.TASK_PRIORITY];

// Status Categories
export type SEOStatusCategory =
  (typeof SEO_STATUS.STATUS_CATEGORIES)[keyof typeof SEO_STATUS.STATUS_CATEGORIES];

// Union type for all status values
export type SEOStatusValue =
  SEOTaskStatus | SEOPageStatus | SEOLinkStatus | SEOIndexStatus | SEOCrawlStatus;

// SEO Specific Utility Functions (renamed to avoid conflicts)
export function getSEOTaskStatusLabel(status: SEOTaskStatus): string {
  const labels: Record<SEOTaskStatus, string> = {
    [SEO_STATUS.TASK_STATUS.PENDING]: 'Pending',
    [SEO_STATUS.TASK_STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_STATUS.TASK_STATUS.COMPLETED]: 'Completed',
    [SEO_STATUS.TASK_STATUS.FAILED]: 'Failed',
    [SEO_STATUS.TASK_STATUS.CANCELLED]: 'Cancelled',
    [SEO_STATUS.TASK_STATUS.ON_HOLD]: 'On Hold',
    [SEO_STATUS.TASK_STATUS.BLOCKED]: 'Blocked',
    [SEO_STATUS.TASK_STATUS.REVIEW]: 'Under Review',
    [SEO_STATUS.TASK_STATUS.APPROVED]: 'Approved',
    [SEO_STATUS.TASK_STATUS.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOPageStatusLabel(status: SEOPageStatus): string {
  const labels: Record<SEOPageStatus, string> = {
    [SEO_STATUS.PAGE_STATUS.DRAFT]: 'Draft',
    [SEO_STATUS.PAGE_STATUS.PUBLISHED]: 'Published',
    [SEO_STATUS.PAGE_STATUS.UNPUBLISHED]: 'Unpublished',
    [SEO_STATUS.PAGE_STATUS.ARCHIVED]: 'Archived',
    [SEO_STATUS.PAGE_STATUS.UNDER_REVIEW]: 'Under Review',
    [SEO_STATUS.PAGE_STATUS.IN_QUEUE]: 'In Queue',
    [SEO_STATUS.PAGE_STATUS.SCHEDULED]: 'Scheduled',
    [SEO_STATUS.PAGE_STATUS.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOLinkStatusLabel(status: SEOLinkStatus): string {
  const labels: Record<SEOLinkStatus, string> = {
    [SEO_STATUS.LINK_STATUS.ACTIVE]: 'Active',
    [SEO_STATUS.LINK_STATUS.BROKEN]: 'Broken',
    [SEO_STATUS.LINK_STATUS.REDIRECTED]: 'Redirected',
    [SEO_STATUS.LINK_STATUS.NOFOLLOW]: 'Nofollow',
    [SEO_STATUS.LINK_STATUS.FOLLOW]: 'Follow',
    [SEO_STATUS.LINK_STATUS.SPONSORED]: 'Sponsored',
    [SEO_STATUS.LINK_STATUS.UGC]: 'UGC',
    [SEO_STATUS.LINK_STATUS.REMOVED]: 'Removed',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOIndexStatusLabel(status: SEOIndexStatus): string {
  const labels: Record<SEOIndexStatus, string> = {
    [SEO_STATUS.INDEX_STATUS.INDEXED]: 'Indexed',
    [SEO_STATUS.INDEX_STATUS.NOT_INDEXED]: 'Not Indexed',
    [SEO_STATUS.INDEX_STATUS.PENDING]: 'Pending',
    [SEO_STATUS.INDEX_STATUS.BLOCKED]: 'Blocked',
    [SEO_STATUS.INDEX_STATUS.NOINDEX]: 'Noindex',
    [SEO_STATUS.INDEX_STATUS.DISCOVERED]: 'Discovered',
    [SEO_STATUS.INDEX_STATUS.CRAWL_ERROR]: 'Crawl Error',
    [SEO_STATUS.INDEX_STATUS.TEMPORARY]: 'Temporary',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOTaskPriorityLabel(priority: SEOTaskPriority): string {
  const labels: Record<SEOTaskPriority, string> = {
    [SEO_STATUS.TASK_PRIORITY.CRITICAL]: 'Critical',
    [SEO_STATUS.TASK_PRIORITY.HIGH]: 'High',
    [SEO_STATUS.TASK_PRIORITY.MEDIUM]: 'Medium',
    [SEO_STATUS.TASK_PRIORITY.LOW]: 'Low',
    [SEO_STATUS.TASK_PRIORITY.NONE]: 'None',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOStatusCategory(status: SEOStatusValue): SEOStatusCategory {
  // Critical statuses
  const criticalStatuses: SEOStatusValue[] = [
    SEO_STATUS.TASK_STATUS.FAILED,
    SEO_STATUS.TASK_STATUS.BLOCKED,
    SEO_STATUS.INDEX_STATUS.NOT_INDEXED,
    SEO_STATUS.INDEX_STATUS.BLOCKED,
    SEO_STATUS.CRAWL_STATUS.FAILED,
    SEO_STATUS.CRAWL_STATUS.BLOCKED,
  ];

  // Error statuses
  const errorStatuses: SEOStatusValue[] = [
    SEO_STATUS.TASK_STATUS.FAILED,
    SEO_STATUS.TASK_STATUS.BLOCKED,
    SEO_STATUS.TASK_STATUS.REJECTED,
    SEO_STATUS.PAGE_STATUS.UNPUBLISHED,
    SEO_STATUS.LINK_STATUS.BROKEN,
    SEO_STATUS.INDEX_STATUS.NOT_INDEXED,
    SEO_STATUS.INDEX_STATUS.BLOCKED,
    SEO_STATUS.INDEX_STATUS.CRAWL_ERROR,
    SEO_STATUS.CRAWL_STATUS.FAILED,
    SEO_STATUS.CRAWL_STATUS.BLOCKED,
    SEO_STATUS.CRAWL_STATUS.ERROR,
  ];

  // Warning statuses
  const warningStatuses: SEOStatusValue[] = [
    SEO_STATUS.TASK_STATUS.PENDING,
    SEO_STATUS.TASK_STATUS.IN_PROGRESS,
    SEO_STATUS.TASK_STATUS.ON_HOLD,
    SEO_STATUS.TASK_STATUS.REVIEW,
    SEO_STATUS.PAGE_STATUS.DRAFT,
    SEO_STATUS.PAGE_STATUS.UNDER_REVIEW,
    SEO_STATUS.PAGE_STATUS.IN_QUEUE,
    SEO_STATUS.INDEX_STATUS.PENDING,
    SEO_STATUS.INDEX_STATUS.DISCOVERED,
    SEO_STATUS.INDEX_STATUS.TEMPORARY,
    SEO_STATUS.CRAWL_STATUS.TIMEOUT,
    SEO_STATUS.CRAWL_STATUS.REDIRECT,
    SEO_STATUS.CRAWL_STATUS.PARTIAL,
  ];

  if (criticalStatuses.includes(status)) {
    return SEO_STATUS.STATUS_CATEGORIES.CRITICAL;
  }

  if (errorStatuses.includes(status)) {
    return SEO_STATUS.STATUS_CATEGORIES.ERROR;
  }

  if (warningStatuses.includes(status)) {
    return SEO_STATUS.STATUS_CATEGORIES.WARNING;
  }

  return SEO_STATUS.STATUS_CATEGORIES.HEALTHY;
}

export function getSEOStatusColor(status: SEOStatusValue): string {
  const category = getSEOStatusCategory(status);
  const colors: Record<SEOStatusCategory, string> = {
    [SEO_STATUS.STATUS_CATEGORIES.HEALTHY]: '#4CAF50',
    [SEO_STATUS.STATUS_CATEGORIES.WARNING]: '#FFC107',
    [SEO_STATUS.STATUS_CATEGORIES.ERROR]: '#F44336',
    [SEO_STATUS.STATUS_CATEGORIES.CRITICAL]: '#D32F2F',
    [SEO_STATUS.STATUS_CATEGORIES.UNKNOWN]: '#9E9E9E',
  };
  return colors[category] || '#9E9E9E';
}

export function isSEOTaskComplete(status: SEOTaskStatus): boolean {
  const completedStatuses: SEOTaskStatus[] = [
    SEO_STATUS.TASK_STATUS.COMPLETED,
    SEO_STATUS.TASK_STATUS.APPROVED,
  ];
  return completedStatuses.includes(status);
}

export function isSEOTaskBlocked(status: SEOTaskStatus): boolean {
  const blockedStatuses: SEOTaskStatus[] = [
    SEO_STATUS.TASK_STATUS.BLOCKED,
    SEO_STATUS.TASK_STATUS.CANCELLED,
    SEO_STATUS.TASK_STATUS.FAILED,
    SEO_STATUS.TASK_STATUS.REJECTED,
  ];
  return blockedStatuses.includes(status);
}

export function isSEOPagePublished(status: SEOPageStatus): boolean {
  return status === SEO_STATUS.PAGE_STATUS.PUBLISHED;
}

export function isSEOIndexed(status: SEOIndexStatus): boolean {
  return status === SEO_STATUS.INDEX_STATUS.INDEXED;
}
