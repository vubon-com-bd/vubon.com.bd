/**
 * @fileoverview Report status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report status enum for different report states
 */
export enum ReportStatusType {
  /** Draft status - report is being created */
  DRAFT = 'DRAFT',
  /** Submitted status - report has been submitted */
  SUBMITTED = 'SUBMITTED',
  /** Pending status - report is waiting for action */
  PENDING = 'PENDING',
  /** Queued status - report is in queue */
  QUEUED = 'QUEUED',
  /** Generating status - report is being generated */
  GENERATING = 'GENERATING',
  /** Processing status - report is being processed */
  PROCESSING = 'PROCESSING',
  /** Compiling status - report is being compiled */
  COMPILING = 'COMPILING',
  /** Rendering status - report is being rendered */
  RENDERING = 'RENDERING',
  /** Completed status - report generation completed */
  COMPLETED = 'COMPLETED',
  /** Failed status - report generation failed */
  FAILED = 'FAILED',
  /** Partial status - report generated partially */
  PARTIAL = 'PARTIAL',
  /** Expired status - report has expired */
  EXPIRED = 'EXPIRED',
  /** Archived status - report has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Deleted status - report has been deleted */
  DELETED = 'DELETED',
  /** Paused status - report generation paused */
  PAUSED = 'PAUSED',
  /** Resumed status - report generation resumed */
  RESUMED = 'RESUMED',
  /** Cancelled status - report generation cancelled */
  CANCELLED = 'CANCELLED',
  /** Approved status - report has been approved */
  APPROVED = 'APPROVED',
  /** Rejected status - report has been rejected */
  REJECTED = 'REJECTED',
  /** Under review status - report is being reviewed */
  UNDER_REVIEW = 'UNDER_REVIEW',
  /** Review requested status - review has been requested */
  REVIEW_REQUESTED = 'REVIEW_REQUESTED',
  /** Finalized status - report has been finalized */
  FINALIZED = 'FINALIZED',
  /** Published status - report has been published */
  PUBLISHED = 'PUBLISHED',
  /** Unpublished status - report has been unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Restored status - report has been restored */
  RESTORED = 'RESTORED',
  /** Duplicated status - report has been duplicated */
  DUPLICATED = 'DUPLICATED',
  /** Merged status - report has been merged */
  MERGED = 'MERGED',
  /** Split status - report has been split */
  SPLIT = 'SPLIT',
  /** Sent status - report has been sent */
  SENT = 'SENT',
  /** Received status - report has been received */
  RECEIVED = 'RECEIVED',
  /** Opened status - report has been opened */
  OPENED = 'OPENED',
  /** Viewed status - report has been viewed */
  VIEWED = 'VIEWED',
  /** Downloaded status - report has been downloaded */
  DOWNLOADED = 'DOWNLOADED',
}

/**
 * Report status category for grouping
 */
export enum ReportStatusCategory {
  /** Draft and creation states */
  DRAFT = 'DRAFT',
  /** Processing states */
  PROCESSING = 'PROCESSING',
  /** Completion states */
  COMPLETED = 'COMPLETED',
  /** Error states */
  ERROR = 'ERROR',
  /** Review states */
  REVIEW = 'REVIEW',
  /** Publication states */
  PUBLICATION = 'PUBLICATION',
  /** Archival states */
  ARCHIVAL = 'ARCHIVAL',
  /** Delivery states */
  DELIVERY = 'DELIVERY',
  /** Action states */
  ACTION = 'ACTION',
}

/**
 * Report status category mapping
 */
export const REPORT_STATUS_CATEGORY_MAP: Record<ReportStatusType, ReportStatusCategory> = {
  [ReportStatusType.DRAFT]: ReportStatusCategory.DRAFT,
  [ReportStatusType.SUBMITTED]: ReportStatusCategory.DRAFT,
  [ReportStatusType.PENDING]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.QUEUED]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.GENERATING]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.PROCESSING]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.COMPILING]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.RENDERING]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.COMPLETED]: ReportStatusCategory.COMPLETED,
  [ReportStatusType.FAILED]: ReportStatusCategory.ERROR,
  [ReportStatusType.PARTIAL]: ReportStatusCategory.ERROR,
  [ReportStatusType.EXPIRED]: ReportStatusCategory.ARCHIVAL,
  [ReportStatusType.ARCHIVED]: ReportStatusCategory.ARCHIVAL,
  [ReportStatusType.DELETED]: ReportStatusCategory.ARCHIVAL,
  [ReportStatusType.PAUSED]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.RESUMED]: ReportStatusCategory.PROCESSING,
  [ReportStatusType.CANCELLED]: ReportStatusCategory.ACTION,
  [ReportStatusType.APPROVED]: ReportStatusCategory.REVIEW,
  [ReportStatusType.REJECTED]: ReportStatusCategory.REVIEW,
  [ReportStatusType.UNDER_REVIEW]: ReportStatusCategory.REVIEW,
  [ReportStatusType.REVIEW_REQUESTED]: ReportStatusCategory.REVIEW,
  [ReportStatusType.FINALIZED]: ReportStatusCategory.COMPLETED,
  [ReportStatusType.PUBLISHED]: ReportStatusCategory.PUBLICATION,
  [ReportStatusType.UNPUBLISHED]: ReportStatusCategory.PUBLICATION,
  [ReportStatusType.RESTORED]: ReportStatusCategory.ACTION,
  [ReportStatusType.DUPLICATED]: ReportStatusCategory.ACTION,
  [ReportStatusType.MERGED]: ReportStatusCategory.ACTION,
  [ReportStatusType.SPLIT]: ReportStatusCategory.ACTION,
  [ReportStatusType.SENT]: ReportStatusCategory.DELIVERY,
  [ReportStatusType.RECEIVED]: ReportStatusCategory.DELIVERY,
  [ReportStatusType.OPENED]: ReportStatusCategory.DELIVERY,
  [ReportStatusType.VIEWED]: ReportStatusCategory.DELIVERY,
  [ReportStatusType.DOWNLOADED]: ReportStatusCategory.DELIVERY,
};

/**
 * Report status configuration
 */
export interface ReportStatusConfig {
  label: string;
  description: string;
  category: ReportStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsModification: boolean;
}

export const REPORT_STATUS_CONFIG: Record<ReportStatusType, ReportStatusConfig> = {
  [ReportStatusType.DRAFT]: {
    label: 'Draft',
    description: 'Report is in draft mode',
    category: ReportStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsModification: true,
  },
  [ReportStatusType.SUBMITTED]: {
    label: 'Submitted',
    description: 'Report has been submitted for processing',
    category: ReportStatusCategory.DRAFT,
    color: '#8B5CF6',
    icon: 'Send',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.PENDING]: {
    label: 'Pending',
    description: 'Report is pending action',
    category: ReportStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.QUEUED]: {
    label: 'Queued',
    description: 'Report is queued for processing',
    category: ReportStatusCategory.PROCESSING,
    color: '#6366F1',
    icon: 'List',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.GENERATING]: {
    label: 'Generating',
    description: 'Report is being generated',
    category: ReportStatusCategory.PROCESSING,
    color: '#3B82F6',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.PROCESSING]: {
    label: 'Processing',
    description: 'Report is being processed',
    category: ReportStatusCategory.PROCESSING,
    color: '#6366F1',
    icon: 'Activity',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.COMPILING]: {
    label: 'Compiling',
    description: 'Report is being compiled',
    category: ReportStatusCategory.PROCESSING,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.RENDERING]: {
    label: 'Rendering',
    description: 'Report is being rendered',
    category: ReportStatusCategory.PROCESSING,
    color: '#10B981',
    icon: 'Layout',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.COMPLETED]: {
    label: 'Completed',
    description: 'Report generation completed successfully',
    category: ReportStatusCategory.COMPLETED,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.FAILED]: {
    label: 'Failed',
    description: 'Report generation failed',
    category: ReportStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 1,
    isTerminal: true,
    isError: true,
    allowsModification: false,
  },
  [ReportStatusType.PARTIAL]: {
    label: 'Partial',
    description: 'Report generated partially',
    category: ReportStatusCategory.ERROR,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsModification: false,
  },
  [ReportStatusType.EXPIRED]: {
    label: 'Expired',
    description: 'Report has expired',
    category: ReportStatusCategory.ARCHIVAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.ARCHIVED]: {
    label: 'Archived',
    description: 'Report has been archived',
    category: ReportStatusCategory.ARCHIVAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.DELETED]: {
    label: 'Deleted',
    description: 'Report has been deleted',
    category: ReportStatusCategory.ARCHIVAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.PAUSED]: {
    label: 'Paused',
    description: 'Report generation has been paused',
    category: ReportStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.RESUMED]: {
    label: 'Resumed',
    description: 'Report generation has been resumed',
    category: ReportStatusCategory.PROCESSING,
    color: '#10B981',
    icon: 'Play',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.CANCELLED]: {
    label: 'Cancelled',
    description: 'Report generation has been cancelled',
    category: ReportStatusCategory.ACTION,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.APPROVED]: {
    label: 'Approved',
    description: 'Report has been approved',
    category: ReportStatusCategory.REVIEW,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.REJECTED]: {
    label: 'Rejected',
    description: 'Report has been rejected',
    category: ReportStatusCategory.REVIEW,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsModification: true,
  },
  [ReportStatusType.UNDER_REVIEW]: {
    label: 'Under Review',
    description: 'Report is under review',
    category: ReportStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'ShieldCheck',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.REVIEW_REQUESTED]: {
    label: 'Review Requested',
    description: 'Review has been requested',
    category: ReportStatusCategory.REVIEW,
    color: '#8B5CF6',
    icon: 'MessageSquare',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.FINALIZED]: {
    label: 'Finalized',
    description: 'Report has been finalized',
    category: ReportStatusCategory.COMPLETED,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: true,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.PUBLISHED]: {
    label: 'Published',
    description: 'Report has been published',
    category: ReportStatusCategory.PUBLICATION,
    color: '#10B981',
    icon: 'Globe',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Report has been unpublished',
    category: ReportStatusCategory.PUBLICATION,
    color: '#6B7280',
    icon: 'EyeOff',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: true,
  },
  [ReportStatusType.RESTORED]: {
    label: 'Restored',
    description: 'Report has been restored',
    category: ReportStatusCategory.ACTION,
    color: '#10B981',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: true,
  },
  [ReportStatusType.DUPLICATED]: {
    label: 'Duplicated',
    description: 'Report has been duplicated',
    category: ReportStatusCategory.ACTION,
    color: '#8B5CF6',
    icon: 'Copy',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: true,
  },
  [ReportStatusType.MERGED]: {
    label: 'Merged',
    description: 'Report has been merged',
    category: ReportStatusCategory.ACTION,
    color: '#6366F1',
    icon: 'GitMerge',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.SPLIT]: {
    label: 'Split',
    description: 'Report has been split',
    category: ReportStatusCategory.ACTION,
    color: '#F59E0B',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.SENT]: {
    label: 'Sent',
    description: 'Report has been sent',
    category: ReportStatusCategory.DELIVERY,
    color: '#3B82F6',
    icon: 'Send',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.RECEIVED]: {
    label: 'Received',
    description: 'Report has been received',
    category: ReportStatusCategory.DELIVERY,
    color: '#10B981',
    icon: 'Inbox',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.OPENED]: {
    label: 'Opened',
    description: 'Report has been opened',
    category: ReportStatusCategory.DELIVERY,
    color: '#F59E0B',
    icon: 'Eye',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.VIEWED]: {
    label: 'Viewed',
    description: 'Report has been viewed',
    category: ReportStatusCategory.DELIVERY,
    color: '#8B5CF6',
    icon: 'Eye',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
  [ReportStatusType.DOWNLOADED]: {
    label: 'Downloaded',
    description: 'Report has been downloaded',
    category: ReportStatusCategory.DELIVERY,
    color: '#6366F1',
    icon: 'Download',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsModification: false,
  },
};

/**
 * Get report status label
 */
export function getReportStatusLabel(status: ReportStatusType): string {
  return REPORT_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get report status description
 */
export function getReportStatusDescription(status: ReportStatusType): string {
  return REPORT_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get report status category
 */
export function getReportStatusCategory(status: ReportStatusType): ReportStatusCategory {
  return REPORT_STATUS_CATEGORY_MAP[status];
}

/**
 * Get report status color
 */
export function getReportStatusColor(status: ReportStatusType): string {
  return REPORT_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get report status icon
 */
export function getReportStatusIcon(status: ReportStatusType): string {
  return REPORT_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get report statuses by category
 */
export function getReportStatusesByCategory(category: ReportStatusCategory): ReportStatusType[] {
  return Object.entries(REPORT_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as ReportStatusType);
}

/**
 * Get draft statuses
 */
export function getDraftStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.DRAFT);
}

/**
 * Get processing statuses
 */
export function getProcessingStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.PROCESSING);
}

/**
 * Get completed statuses
 */
export function getCompletedStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.COMPLETED);
}

/**
 * Get error statuses
 */
export function getErrorStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.ERROR);
}

/**
 * Get review statuses
 */
export function getReviewStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.REVIEW);
}

/**
 * Get publication statuses
 */
export function getPublicationStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.PUBLICATION);
}

/**
 * Get archival statuses
 */
export function getArchivalStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.ARCHIVAL);
}

/**
 * Get delivery statuses
 */
export function getDeliveryStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.DELIVERY);
}

/**
 * Get action statuses
 */
export function getActionStatuses(): ReportStatusType[] {
  return getReportStatusesByCategory(ReportStatusCategory.ACTION);
}

/**
 * Check if status is terminal
 */
export function isReportStatusTerminal(status: ReportStatusType): boolean {
  return REPORT_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isReportStatusError(status: ReportStatusType): boolean {
  return REPORT_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows modification
 */
export function reportStatusAllowsModification(status: ReportStatusType): boolean {
  return REPORT_STATUS_CONFIG[status]?.allowsModification || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isReportStatusActive(status: ReportStatusType): boolean {
  return !isReportStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getReportStatusPriority(status: ReportStatusType): number {
  return REPORT_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Get high priority statuses
 */
export function getHighPriorityStatuses(): ReportStatusType[] {
  return Object.values(ReportStatusType).filter((status) => getReportStatusPriority(status) === 1);
}

/**
 * Check if status can transition to new status
 */
export function canTransitionTo(
  currentStatus: ReportStatusType,
  newStatus: ReportStatusType
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isReportStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to processing
  if (
    isReportStatusError(currentStatus) &&
    getReportStatusCategory(newStatus) === ReportStatusCategory.PROCESSING
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next statuses
 */
export function getAllowedNextStatuses(currentStatus: ReportStatusType): ReportStatusType[] {
  return Object.values(ReportStatusType).filter((status) => canTransitionTo(currentStatus, status));
}

/**
 * Common status groups
 */
export const STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [ReportStatusType.DRAFT, ReportStatusType.SUBMITTED],
  /** In-progress statuses */
  IN_PROGRESS: [
    ReportStatusType.QUEUED,
    ReportStatusType.GENERATING,
    ReportStatusType.PROCESSING,
    ReportStatusType.COMPILING,
    ReportStatusType.RENDERING,
  ],
  /** Success statuses */
  SUCCESS: [ReportStatusType.COMPLETED, ReportStatusType.FINALIZED, ReportStatusType.PUBLISHED],
  /** Failure statuses */
  FAILURE: [ReportStatusType.FAILED, ReportStatusType.PARTIAL],
  /** Review statuses */
  REVIEW: [
    ReportStatusType.UNDER_REVIEW,
    ReportStatusType.REVIEW_REQUESTED,
    ReportStatusType.APPROVED,
    ReportStatusType.REJECTED,
  ],
  /** Delivery statuses */
  DELIVERY: [
    ReportStatusType.SENT,
    ReportStatusType.RECEIVED,
    ReportStatusType.OPENED,
    ReportStatusType.VIEWED,
    ReportStatusType.DOWNLOADED,
  ],
  /** Terminal statuses */
  TERMINAL: [
    ReportStatusType.COMPLETED,
    ReportStatusType.FAILED,
    ReportStatusType.EXPIRED,
    ReportStatusType.ARCHIVED,
    ReportStatusType.DELETED,
    ReportStatusType.CANCELLED,
    ReportStatusType.FINALIZED,
  ],
} as const;
