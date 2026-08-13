/**
 * @fileoverview Filter status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Filter status enum
 */
export enum FilterStatus {
  /** Active - filter is active */
  ACTIVE = 'ACTIVE',
  /** Inactive - filter is inactive */
  INACTIVE = 'INACTIVE',
  /** Draft - filter is in draft mode */
  DRAFT = 'DRAFT',
  /** Review - filter is under review */
  REVIEW = 'REVIEW',
  /** Approved - filter has been approved */
  APPROVED = 'APPROVED',
  /** Rejected - filter has been rejected */
  REJECTED = 'REJECTED',
  /** Published - filter is published */
  PUBLISHED = 'PUBLISHED',
  /** Unpublished - filter is unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Archived - filter has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Deleted - filter has been deleted */
  DELETED = 'DELETED',
  /** Locked - filter is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - filter is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Shared - filter is shared */
  SHARED = 'SHARED',
  /** Private - filter is private */
  PRIVATE = 'PRIVATE',
  /** Public - filter is public */
  PUBLIC = 'PUBLIC',
  /** Restricted - filter is restricted */
  RESTRICTED = 'RESTRICTED',
  /** Pending approval - filter is pending approval */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Pending review - filter is pending review */
  PENDING_REVIEW = 'PENDING_REVIEW',
  /** In review - filter is in review */
  IN_REVIEW = 'IN_REVIEW',
  /** Reviewed - filter has been reviewed */
  REVIEWED = 'REVIEWED',
  /** Testing - filter is in testing */
  TESTING = 'TESTING',
  /** Staging - filter is in staging */
  STAGING = 'STAGING',
  /** Production - filter is in production */
  PRODUCTION = 'PRODUCTION',
  /** Ready - filter is ready */
  READY = 'READY',
  /** Not ready - filter is not ready */
  NOT_READY = 'NOT_READY',
  /** Expired - filter has expired */
  EXPIRED = 'EXPIRED',
  /** Renewed - filter has been renewed */
  RENEWED = 'RENEWED',
  /** Activated - filter has been activated */
  ACTIVATED = 'ACTIVATED',
  /** Deactivated - filter has been deactivated */
  DEACTIVATED = 'DEACTIVATED',
  /** Deprecated - filter is deprecated */
  DEPRECATED = 'DEPRECATED',
  /** Old version - filter is old version */
  OLD_VERSION = 'OLD_VERSION',
  /** New version - filter has new version */
  NEW_VERSION = 'NEW_VERSION',
  /** Customized - filter has been customized */
  CUSTOMIZED = 'CUSTOMIZED',
  /** Standard - filter is standard */
  STANDARD = 'STANDARD',
  /** Premium - filter is premium */
  PREMIUM = 'PREMIUM',
  /** Free - filter is free */
  FREE = 'FREE',
  /** Restored - filter has been restored */
  RESTORED = 'RESTORED',
  /** Duplicated - filter has been duplicated */
  DUPLICATED = 'DUPLICATED',
  /** Merged - filter has been merged */
  MERGED = 'MERGED',
  /** Split - filter has been split */
  SPLIT = 'SPLIT',
}

/**
 * Filter status category for grouping
 */
export enum FilterStatusCategory {
  /** Active states */
  ACTIVE = 'ACTIVE',
  /** Inactive states */
  INACTIVE = 'INACTIVE',
  /** Draft states */
  DRAFT = 'DRAFT',
  /** Review states */
  REVIEW = 'REVIEW',
  /** Approval states */
  APPROVAL = 'APPROVAL',
  /** Publication states */
  PUBLICATION = 'PUBLICATION',
  /** Access states */
  ACCESS = 'ACCESS',
  /** Environment states */
  ENVIRONMENT = 'ENVIRONMENT',
  /** Readiness states */
  READINESS = 'READINESS',
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Version states */
  VERSION = 'VERSION',
  /** Type states */
  TYPE = 'TYPE',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
}

/**
 * Filter status category mapping
 */
export const FILTER_STATUS_CATEGORY_MAP: Record<FilterStatus, FilterStatusCategory> = {
  [FilterStatus.ACTIVE]: FilterStatusCategory.ACTIVE,
  [FilterStatus.INACTIVE]: FilterStatusCategory.INACTIVE,
  [FilterStatus.DRAFT]: FilterStatusCategory.DRAFT,
  [FilterStatus.REVIEW]: FilterStatusCategory.REVIEW,
  [FilterStatus.APPROVED]: FilterStatusCategory.APPROVAL,
  [FilterStatus.REJECTED]: FilterStatusCategory.APPROVAL,
  [FilterStatus.PUBLISHED]: FilterStatusCategory.PUBLICATION,
  [FilterStatus.UNPUBLISHED]: FilterStatusCategory.PUBLICATION,
  [FilterStatus.ARCHIVED]: FilterStatusCategory.TERMINAL,
  [FilterStatus.DELETED]: FilterStatusCategory.TERMINAL,
  [FilterStatus.LOCKED]: FilterStatusCategory.ACCESS,
  [FilterStatus.UNLOCKED]: FilterStatusCategory.ACCESS,
  [FilterStatus.SHARED]: FilterStatusCategory.ACCESS,
  [FilterStatus.PRIVATE]: FilterStatusCategory.ACCESS,
  [FilterStatus.PUBLIC]: FilterStatusCategory.ACCESS,
  [FilterStatus.RESTRICTED]: FilterStatusCategory.ACCESS,
  [FilterStatus.PENDING_APPROVAL]: FilterStatusCategory.APPROVAL,
  [FilterStatus.PENDING_REVIEW]: FilterStatusCategory.REVIEW,
  [FilterStatus.IN_REVIEW]: FilterStatusCategory.REVIEW,
  [FilterStatus.REVIEWED]: FilterStatusCategory.REVIEW,
  [FilterStatus.TESTING]: FilterStatusCategory.ENVIRONMENT,
  [FilterStatus.STAGING]: FilterStatusCategory.ENVIRONMENT,
  [FilterStatus.PRODUCTION]: FilterStatusCategory.ENVIRONMENT,
  [FilterStatus.READY]: FilterStatusCategory.READINESS,
  [FilterStatus.NOT_READY]: FilterStatusCategory.READINESS,
  [FilterStatus.EXPIRED]: FilterStatusCategory.TERMINAL,
  [FilterStatus.RENEWED]: FilterStatusCategory.LIFECYCLE,
  [FilterStatus.ACTIVATED]: FilterStatusCategory.LIFECYCLE,
  [FilterStatus.DEACTIVATED]: FilterStatusCategory.LIFECYCLE,
  [FilterStatus.DEPRECATED]: FilterStatusCategory.LIFECYCLE,
  [FilterStatus.OLD_VERSION]: FilterStatusCategory.VERSION,
  [FilterStatus.NEW_VERSION]: FilterStatusCategory.VERSION,
  [FilterStatus.CUSTOMIZED]: FilterStatusCategory.ACCESS,
  [FilterStatus.STANDARD]: FilterStatusCategory.TYPE,
  [FilterStatus.PREMIUM]: FilterStatusCategory.TYPE,
  [FilterStatus.FREE]: FilterStatusCategory.TYPE,
  [FilterStatus.RESTORED]: FilterStatusCategory.LIFECYCLE,
  [FilterStatus.DUPLICATED]: FilterStatusCategory.VERSION,
  [FilterStatus.MERGED]: FilterStatusCategory.VERSION,
  [FilterStatus.SPLIT]: FilterStatusCategory.VERSION,
};

/**
 * Filter status configuration
 */
export interface FilterStatusConfig {
  label: string;
  description: string;
  category: FilterStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsEditing: boolean;
  allowsApplying: boolean;
}

export const FILTER_STATUS_CONFIG: Record<FilterStatus, FilterStatusConfig> = {
  [FilterStatus.ACTIVE]: {
    label: 'Active',
    description: 'Filter is active and can be applied',
    category: FilterStatusCategory.ACTIVE,
    color: '#22C55E',
    icon: 'Play',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.INACTIVE]: {
    label: 'Inactive',
    description: 'Filter is inactive',
    category: FilterStatusCategory.INACTIVE,
    color: '#6B7280',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: false,
  },
  [FilterStatus.DRAFT]: {
    label: 'Draft',
    description: 'Filter is in draft mode',
    category: FilterStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: false,
  },
  [FilterStatus.REVIEW]: {
    label: 'Under Review',
    description: 'Filter is under review',
    category: FilterStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.APPROVED]: {
    label: 'Approved',
    description: 'Filter has been approved',
    category: FilterStatusCategory.APPROVAL,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Filter has been rejected',
    category: FilterStatusCategory.APPROVAL,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsApplying: false,
  },
  [FilterStatus.PUBLISHED]: {
    label: 'Published',
    description: 'Filter is published',
    category: FilterStatusCategory.PUBLICATION,
    color: '#22C55E',
    icon: 'Globe',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Filter is unpublished',
    category: FilterStatusCategory.PUBLICATION,
    color: '#6B7280',
    icon: 'EyeOff',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: false,
  },
  [FilterStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Filter has been archived',
    category: FilterStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.DELETED]: {
    label: 'Deleted',
    description: 'Filter has been deleted',
    category: FilterStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.LOCKED]: {
    label: 'Locked',
    description: 'Filter is locked',
    category: FilterStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Filter is unlocked',
    category: FilterStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.SHARED]: {
    label: 'Shared',
    description: 'Filter is shared',
    category: FilterStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'Share2',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.PRIVATE]: {
    label: 'Private',
    description: 'Filter is private',
    category: FilterStatusCategory.ACCESS,
    color: '#6B7280',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.PUBLIC]: {
    label: 'Public',
    description: 'Filter is public',
    category: FilterStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Globe',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.RESTRICTED]: {
    label: 'Restricted',
    description: 'Filter is restricted',
    category: FilterStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Shield',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.PENDING_APPROVAL]: {
    label: 'Pending Approval',
    description: 'Filter is pending approval',
    category: FilterStatusCategory.APPROVAL,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.PENDING_REVIEW]: {
    label: 'Pending Review',
    description: 'Filter is pending review',
    category: FilterStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.IN_REVIEW]: {
    label: 'In Review',
    description: 'Filter is in review process',
    category: FilterStatusCategory.REVIEW,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.REVIEWED]: {
    label: 'Reviewed',
    description: 'Filter has been reviewed',
    category: FilterStatusCategory.REVIEW,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.TESTING]: {
    label: 'Testing',
    description: 'Filter is in testing',
    category: FilterStatusCategory.ENVIRONMENT,
    color: '#F59E0B',
    icon: 'Beaker',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.STAGING]: {
    label: 'Staging',
    description: 'Filter is in staging',
    category: FilterStatusCategory.ENVIRONMENT,
    color: '#8B5CF6',
    icon: 'Layers',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.PRODUCTION]: {
    label: 'Production',
    description: 'Filter is in production',
    category: FilterStatusCategory.ENVIRONMENT,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.READY]: {
    label: 'Ready',
    description: 'Filter is ready for use',
    category: FilterStatusCategory.READINESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.NOT_READY]: {
    label: 'Not Ready',
    description: 'Filter is not ready',
    category: FilterStatusCategory.READINESS,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsApplying: false,
  },
  [FilterStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Filter has expired',
    category: FilterStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.RENEWED]: {
    label: 'Renewed',
    description: 'Filter has been renewed',
    category: FilterStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'Repeat',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.ACTIVATED]: {
    label: 'Activated',
    description: 'Filter has been activated',
    category: FilterStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.DEACTIVATED]: {
    label: 'Deactivated',
    description: 'Filter has been deactivated',
    category: FilterStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Power',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.DEPRECATED]: {
    label: 'Deprecated',
    description: 'Filter is deprecated',
    category: FilterStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.OLD_VERSION]: {
    label: 'Old Version',
    description: 'Filter is old version',
    category: FilterStatusCategory.VERSION,
    color: '#6B7280',
    icon: 'GitBranch',
    priority: 3,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: false,
  },
  [FilterStatus.NEW_VERSION]: {
    label: 'New Version',
    description: 'Filter has new version available',
    category: FilterStatusCategory.VERSION,
    color: '#3B82F6',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.CUSTOMIZED]: {
    label: 'Customized',
    description: 'Filter has been customized',
    category: FilterStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'PenTool',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.STANDARD]: {
    label: 'Standard',
    description: 'Filter is standard',
    category: FilterStatusCategory.TYPE,
    color: '#3B82F6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.PREMIUM]: {
    label: 'Premium',
    description: 'Filter is premium',
    category: FilterStatusCategory.TYPE,
    color: '#F59E0B',
    icon: 'Crown',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.FREE]: {
    label: 'Free',
    description: 'Filter is free',
    category: FilterStatusCategory.TYPE,
    color: '#22C55E',
    icon: 'Gift',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.RESTORED]: {
    label: 'Restored',
    description: 'Filter has been restored',
    category: FilterStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.DUPLICATED]: {
    label: 'Duplicated',
    description: 'Filter has been duplicated',
    category: FilterStatusCategory.VERSION,
    color: '#8B5CF6',
    icon: 'Copy',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsApplying: true,
  },
  [FilterStatus.MERGED]: {
    label: 'Merged',
    description: 'Filter has been merged',
    category: FilterStatusCategory.VERSION,
    color: '#6366F1',
    icon: 'GitMerge',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
  [FilterStatus.SPLIT]: {
    label: 'Split',
    description: 'Filter has been split',
    category: FilterStatusCategory.VERSION,
    color: '#F59E0B',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsApplying: true,
  },
};

/**
 * Get filter status label
 */
export function getFilterStatusLabel(status: FilterStatus): string {
  return FILTER_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get filter status description
 */
export function getFilterStatusDescription(status: FilterStatus): string {
  return FILTER_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get filter status category
 */
export function getFilterStatusCategory(status: FilterStatus): FilterStatusCategory {
  return FILTER_STATUS_CATEGORY_MAP[status];
}

/**
 * Get filter status color
 */
export function getFilterStatusColor(status: FilterStatus): string {
  return FILTER_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get filter status icon
 */
export function getFilterStatusIcon(status: FilterStatus): string {
  return FILTER_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get filter statuses by category
 */
export function getFilterStatusesByCategory(category: FilterStatusCategory): FilterStatus[] {
  return Object.entries(FILTER_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as FilterStatus);
}

/**
 * Get active statuses
 */
export function getActiveFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.ACTIVE);
}

/**
 * Get inactive statuses
 */
export function getInactiveFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.INACTIVE);
}

/**
 * Get draft statuses
 */
export function getDraftFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.DRAFT);
}

/**
 * Get review statuses
 */
export function getReviewFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.REVIEW);
}

/**
 * Get approval statuses
 */
export function getApprovalFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.APPROVAL);
}

/**
 * Get publication statuses
 */
export function getPublicationFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.PUBLICATION);
}

/**
 * Get access statuses
 */
export function getAccessFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.ACCESS);
}

/**
 * Get environment statuses
 */
export function getEnvironmentFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.ENVIRONMENT);
}

/**
 * Get readiness statuses
 */
export function getReadinessFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.READINESS);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.LIFECYCLE);
}

/**
 * Get version statuses
 */
export function getVersionFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.VERSION);
}

/**
 * Get type statuses
 */
export function getTypeFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.TYPE);
}

/**
 * Get terminal statuses
 */
export function getTerminalFilterStatuses(): FilterStatus[] {
  return getFilterStatusesByCategory(FilterStatusCategory.TERMINAL);
}

/**
 * Check if status is terminal
 */
export function isFilterStatusTerminal(status: FilterStatus): boolean {
  return FILTER_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isFilterStatusError(status: FilterStatus): boolean {
  return FILTER_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows editing
 */
export function filterStatusAllowsEditing(status: FilterStatus): boolean {
  return FILTER_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status allows applying
 */
export function filterStatusAllowsApplying(status: FilterStatus): boolean {
  return FILTER_STATUS_CONFIG[status]?.allowsApplying || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isFilterStatusActive(status: FilterStatus): boolean {
  return !isFilterStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getFilterStatusPriority(status: FilterStatus): number {
  return FILTER_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if filter status can transition to new status
 */
export function canFilterTransitionTo(
  currentStatus: FilterStatus,
  newStatus: FilterStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isFilterStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to active without fixing
  if (
    isFilterStatusError(currentStatus) &&
    getFilterStatusCategory(newStatus) === FilterStatusCategory.ACTIVE
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next filter statuses
 */
export function getAllowedNextFilterStatuses(currentStatus: FilterStatus): FilterStatus[] {
  return Object.values(FilterStatus).filter((status) =>
    canFilterTransitionTo(currentStatus, status)
  );
}

/**
 * Filter status groups
 */
export const FILTER_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [FilterStatus.DRAFT, FilterStatus.PENDING_REVIEW, FilterStatus.PENDING_APPROVAL],
  /** Review statuses */
  REVIEW: [FilterStatus.REVIEW, FilterStatus.IN_REVIEW, FilterStatus.REVIEWED],
  /** Approval statuses */
  APPROVAL: [FilterStatus.APPROVED, FilterStatus.REJECTED, FilterStatus.PENDING_APPROVAL],
  /** Active statuses */
  ACTIVE: [
    FilterStatus.ACTIVE,
    FilterStatus.PUBLISHED,
    FilterStatus.PRODUCTION,
    FilterStatus.READY,
    FilterStatus.ACTIVATED,
  ],
  /** Terminal statuses */
  TERMINAL: [FilterStatus.ARCHIVED, FilterStatus.DELETED, FilterStatus.EXPIRED],
} as const;
