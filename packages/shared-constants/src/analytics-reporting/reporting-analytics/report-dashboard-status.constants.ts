/**
 * @fileoverview Dashboard status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Dashboard status enum
 */
export enum DashboardStatus {
  /** Draft - dashboard is being created */
  DRAFT = 'DRAFT',
  /** Review - dashboard is under review */
  REVIEW = 'REVIEW',
  /** Approved - dashboard has been approved */
  APPROVED = 'APPROVED',
  /** Rejected - dashboard has been rejected */
  REJECTED = 'REJECTED',
  /** Published - dashboard is published */
  PUBLISHED = 'PUBLISHED',
  /** Unpublished - dashboard is unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Archived - dashboard has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Deleted - dashboard has been deleted */
  DELETED = 'DELETED',
  /** Active - dashboard is active */
  ACTIVE = 'ACTIVE',
  /** Inactive - dashboard is inactive */
  INACTIVE = 'INACTIVE',
  /** Under maintenance - dashboard is under maintenance */
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  /** Deprecated - dashboard is deprecated */
  DEPRECATED = 'DEPRECATED',
  /** Locked - dashboard is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - dashboard is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Shared - dashboard is shared */
  SHARED = 'SHARED',
  /** Private - dashboard is private */
  PRIVATE = 'PRIVATE',
  /** Public - dashboard is public */
  PUBLIC = 'PUBLIC',
  /** Restricted - dashboard is restricted */
  RESTRICTED = 'RESTRICTED',
  /** Pending approval - dashboard is pending approval */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Pending review - dashboard is pending review */
  PENDING_REVIEW = 'PENDING_REVIEW',
  /** In review - dashboard is in review */
  IN_REVIEW = 'IN_REVIEW',
  /** Reviewed - dashboard has been reviewed */
  REVIEWED = 'REVIEWED',
  /** Testing - dashboard is in testing */
  TESTING = 'TESTING',
  /** Staging - dashboard is in staging */
  STAGING = 'STAGING',
  /** Production - dashboard is in production */
  PRODUCTION = 'PRODUCTION',
  /** Ready - dashboard is ready */
  READY = 'READY',
  /** Not ready - dashboard is not ready */
  NOT_READY = 'NOT_READY',
  /** Expired - dashboard has expired */
  EXPIRED = 'EXPIRED',
  /** Renewed - dashboard has been renewed */
  RENEWED = 'RENEWED',
  /** Activated - dashboard has been activated */
  ACTIVATED = 'ACTIVATED',
  /** Deactivated - dashboard has been deactivated */
  DEACTIVATED = 'DEACTIVATED',
  /** Degraded - dashboard is degraded */
  DEGRADED = 'DEGRADED',
  /** Recovering - dashboard is recovering */
  RECOVERING = 'RECOVERING',
  /** Restored - dashboard has been restored */
  RESTORED = 'RESTORED',
  /** Duplicated - dashboard has been duplicated */
  DUPLICATED = 'DUPLICATED',
  /** Merged - dashboard has been merged */
  MERGED = 'MERGED',
  /** Split - dashboard has been split */
  SPLIT = 'SPLIT',
  /** Customized - dashboard has been customized */
  CUSTOMIZED = 'CUSTOMIZED',
  /** Standard - dashboard is standard */
  STANDARD = 'STANDARD',
  /** Premium - dashboard is premium */
  PREMIUM = 'PREMIUM',
  /** Free - dashboard is free */
  FREE = 'FREE',
  /** Embedded - dashboard is embedded */
  EMBEDDED = 'EMBEDDED',
  /** Standalone - dashboard is standalone */
  STANDALONE = 'STANDALONE',
}

/**
 * Dashboard status category for grouping
 */
export enum DashboardStatusCategory {
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
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Environment states */
  ENVIRONMENT = 'ENVIRONMENT',
  /** Readiness states */
  READINESS = 'READINESS',
  /** Version states */
  VERSION = 'VERSION',
  /** Type states */
  TYPE = 'TYPE',
}

/**
 * Dashboard status category mapping
 */
export const DASHBOARD_STATUS_CATEGORY_MAP: Record<DashboardStatus, DashboardStatusCategory> = {
  [DashboardStatus.DRAFT]: DashboardStatusCategory.DRAFT,
  [DashboardStatus.REVIEW]: DashboardStatusCategory.REVIEW,
  [DashboardStatus.APPROVED]: DashboardStatusCategory.APPROVAL,
  [DashboardStatus.REJECTED]: DashboardStatusCategory.APPROVAL,
  [DashboardStatus.PUBLISHED]: DashboardStatusCategory.PUBLICATION,
  [DashboardStatus.UNPUBLISHED]: DashboardStatusCategory.PUBLICATION,
  [DashboardStatus.ARCHIVED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.DELETED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.ACTIVE]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.INACTIVE]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.UNDER_MAINTENANCE]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.DEPRECATED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.LOCKED]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.UNLOCKED]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.SHARED]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.PRIVATE]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.PUBLIC]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.RESTRICTED]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.PENDING_APPROVAL]: DashboardStatusCategory.APPROVAL,
  [DashboardStatus.PENDING_REVIEW]: DashboardStatusCategory.REVIEW,
  [DashboardStatus.IN_REVIEW]: DashboardStatusCategory.REVIEW,
  [DashboardStatus.REVIEWED]: DashboardStatusCategory.REVIEW,
  [DashboardStatus.TESTING]: DashboardStatusCategory.ENVIRONMENT,
  [DashboardStatus.STAGING]: DashboardStatusCategory.ENVIRONMENT,
  [DashboardStatus.PRODUCTION]: DashboardStatusCategory.ENVIRONMENT,
  [DashboardStatus.READY]: DashboardStatusCategory.READINESS,
  [DashboardStatus.NOT_READY]: DashboardStatusCategory.READINESS,
  [DashboardStatus.EXPIRED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.RENEWED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.ACTIVATED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.DEACTIVATED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.DEGRADED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.RECOVERING]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.RESTORED]: DashboardStatusCategory.LIFECYCLE,
  [DashboardStatus.DUPLICATED]: DashboardStatusCategory.VERSION,
  [DashboardStatus.MERGED]: DashboardStatusCategory.VERSION,
  [DashboardStatus.SPLIT]: DashboardStatusCategory.VERSION,
  [DashboardStatus.CUSTOMIZED]: DashboardStatusCategory.ACCESS,
  [DashboardStatus.STANDARD]: DashboardStatusCategory.TYPE,
  [DashboardStatus.PREMIUM]: DashboardStatusCategory.TYPE,
  [DashboardStatus.FREE]: DashboardStatusCategory.TYPE,
  [DashboardStatus.EMBEDDED]: DashboardStatusCategory.TYPE,
  [DashboardStatus.STANDALONE]: DashboardStatusCategory.TYPE,
};

/**
 * Dashboard status configuration
 */
export interface DashboardStatusConfig {
  label: string;
  description: string;
  category: DashboardStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsEditing: boolean;
  allowsViewing: boolean;
}

export const DASHBOARD_STATUS_CONFIG: Record<DashboardStatus, DashboardStatusConfig> = {
  [DashboardStatus.DRAFT]: {
    label: 'Draft',
    description: 'Dashboard is in draft mode',
    category: DashboardStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: false,
  },
  [DashboardStatus.REVIEW]: {
    label: 'Under Review',
    description: 'Dashboard is under review',
    category: DashboardStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.APPROVED]: {
    label: 'Approved',
    description: 'Dashboard has been approved',
    category: DashboardStatusCategory.APPROVAL,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Dashboard has been rejected',
    category: DashboardStatusCategory.APPROVAL,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsViewing: false,
  },
  [DashboardStatus.PUBLISHED]: {
    label: 'Published',
    description: 'Dashboard is published',
    category: DashboardStatusCategory.PUBLICATION,
    color: '#22C55E',
    icon: 'Globe',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Dashboard is unpublished',
    category: DashboardStatusCategory.PUBLICATION,
    color: '#6B7280',
    icon: 'EyeOff',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: false,
  },
  [DashboardStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Dashboard has been archived',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.DELETED]: {
    label: 'Deleted',
    description: 'Dashboard has been deleted',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.ACTIVE]: {
    label: 'Active',
    description: 'Dashboard is active',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'Play',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
  [DashboardStatus.INACTIVE]: {
    label: 'Inactive',
    description: 'Dashboard is inactive',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.UNDER_MAINTENANCE]: {
    label: 'Under Maintenance',
    description: 'Dashboard is under maintenance',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'Settings',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.DEPRECATED]: {
    label: 'Deprecated',
    description: 'Dashboard is deprecated',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.LOCKED]: {
    label: 'Locked',
    description: 'Dashboard is locked',
    category: DashboardStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Dashboard is unlocked',
    category: DashboardStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
  [DashboardStatus.SHARED]: {
    label: 'Shared',
    description: 'Dashboard is shared',
    category: DashboardStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'Share2',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.PRIVATE]: {
    label: 'Private',
    description: 'Dashboard is private',
    category: DashboardStatusCategory.ACCESS,
    color: '#6B7280',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: false,
  },
  [DashboardStatus.PUBLIC]: {
    label: 'Public',
    description: 'Dashboard is public',
    category: DashboardStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Globe',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.RESTRICTED]: {
    label: 'Restricted',
    description: 'Dashboard is restricted',
    category: DashboardStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Shield',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.PENDING_APPROVAL]: {
    label: 'Pending Approval',
    description: 'Dashboard is pending approval',
    category: DashboardStatusCategory.APPROVAL,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.PENDING_REVIEW]: {
    label: 'Pending Review',
    description: 'Dashboard is pending review',
    category: DashboardStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.IN_REVIEW]: {
    label: 'In Review',
    description: 'Dashboard is in review process',
    category: DashboardStatusCategory.REVIEW,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.REVIEWED]: {
    label: 'Reviewed',
    description: 'Dashboard has been reviewed',
    category: DashboardStatusCategory.REVIEW,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.TESTING]: {
    label: 'Testing',
    description: 'Dashboard is in testing',
    category: DashboardStatusCategory.ENVIRONMENT,
    color: '#F59E0B',
    icon: 'Beaker',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
  [DashboardStatus.STAGING]: {
    label: 'Staging',
    description: 'Dashboard is in staging',
    category: DashboardStatusCategory.ENVIRONMENT,
    color: '#8B5CF6',
    icon: 'Layers',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.PRODUCTION]: {
    label: 'Production',
    description: 'Dashboard is in production',
    category: DashboardStatusCategory.ENVIRONMENT,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.READY]: {
    label: 'Ready',
    description: 'Dashboard is ready for use',
    category: DashboardStatusCategory.READINESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.NOT_READY]: {
    label: 'Not Ready',
    description: 'Dashboard is not ready',
    category: DashboardStatusCategory.READINESS,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsViewing: false,
  },
  [DashboardStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Dashboard has expired',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.RENEWED]: {
    label: 'Renewed',
    description: 'Dashboard has been renewed',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'Repeat',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.ACTIVATED]: {
    label: 'Activated',
    description: 'Dashboard has been activated',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.DEACTIVATED]: {
    label: 'Deactivated',
    description: 'Dashboard has been deactivated',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Power',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: false,
  },
  [DashboardStatus.DEGRADED]: {
    label: 'Degraded',
    description: 'Dashboard is degraded',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.RECOVERING]: {
    label: 'Recovering',
    description: 'Dashboard is recovering',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.RESTORED]: {
    label: 'Restored',
    description: 'Dashboard has been restored',
    category: DashboardStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.DUPLICATED]: {
    label: 'Duplicated',
    description: 'Dashboard has been duplicated',
    category: DashboardStatusCategory.VERSION,
    color: '#8B5CF6',
    icon: 'Copy',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
  [DashboardStatus.MERGED]: {
    label: 'Merged',
    description: 'Dashboard has been merged',
    category: DashboardStatusCategory.VERSION,
    color: '#6366F1',
    icon: 'GitMerge',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.SPLIT]: {
    label: 'Split',
    description: 'Dashboard has been split',
    category: DashboardStatusCategory.VERSION,
    color: '#F59E0B',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.CUSTOMIZED]: {
    label: 'Customized',
    description: 'Dashboard has been customized',
    category: DashboardStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'PenTool',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
  [DashboardStatus.STANDARD]: {
    label: 'Standard',
    description: 'Dashboard is standard',
    category: DashboardStatusCategory.TYPE,
    color: '#3B82F6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.PREMIUM]: {
    label: 'Premium',
    description: 'Dashboard is premium',
    category: DashboardStatusCategory.TYPE,
    color: '#F59E0B',
    icon: 'Crown',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.FREE]: {
    label: 'Free',
    description: 'Dashboard is free',
    category: DashboardStatusCategory.TYPE,
    color: '#22C55E',
    icon: 'Gift',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.EMBEDDED]: {
    label: 'Embedded',
    description: 'Dashboard is embedded',
    category: DashboardStatusCategory.TYPE,
    color: '#8B5CF6',
    icon: 'Code',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsViewing: true,
  },
  [DashboardStatus.STANDALONE]: {
    label: 'Standalone',
    description: 'Dashboard is standalone',
    category: DashboardStatusCategory.TYPE,
    color: '#10B981',
    icon: 'Monitor',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsViewing: true,
  },
};

/**
 * Get dashboard status label
 */
export function getDashboardStatusLabel(status: DashboardStatus): string {
  return DASHBOARD_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get dashboard status description
 */
export function getDashboardStatusDescription(status: DashboardStatus): string {
  return DASHBOARD_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get dashboard status category
 */
export function getDashboardStatusCategory(status: DashboardStatus): DashboardStatusCategory {
  return DASHBOARD_STATUS_CATEGORY_MAP[status];
}

/**
 * Get dashboard status color
 */
export function getDashboardStatusColor(status: DashboardStatus): string {
  return DASHBOARD_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get dashboard status icon
 */
export function getDashboardStatusIcon(status: DashboardStatus): string {
  return DASHBOARD_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get dashboard statuses by category
 */
export function getDashboardStatusesByCategory(
  category: DashboardStatusCategory
): DashboardStatus[] {
  return Object.entries(DASHBOARD_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as DashboardStatus);
}

/**
 * Get draft statuses
 */
export function getDraftDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.DRAFT);
}

/**
 * Get review statuses
 */
export function getReviewDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.REVIEW);
}

/**
 * Get approval statuses
 */
export function getApprovalDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.APPROVAL);
}

/**
 * Get publication statuses
 */
export function getPublicationDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.PUBLICATION);
}

/**
 * Get access statuses
 */
export function getAccessDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.ACCESS);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.LIFECYCLE);
}

/**
 * Get environment statuses
 */
export function getEnvironmentDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.ENVIRONMENT);
}

/**
 * Get readiness statuses
 */
export function getReadinessDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.READINESS);
}

/**
 * Get version statuses
 */
export function getVersionDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.VERSION);
}

/**
 * Get type statuses
 */
export function getTypeDashboardStatuses(): DashboardStatus[] {
  return getDashboardStatusesByCategory(DashboardStatusCategory.TYPE);
}

/**
 * Check if status is terminal
 */
export function isDashboardStatusTerminal(status: DashboardStatus): boolean {
  return DASHBOARD_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isDashboardStatusError(status: DashboardStatus): boolean {
  return DASHBOARD_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows editing
 */
export function dashboardStatusAllowsEditing(status: DashboardStatus): boolean {
  return DASHBOARD_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status allows viewing
 */
export function dashboardStatusAllowsViewing(status: DashboardStatus): boolean {
  return DASHBOARD_STATUS_CONFIG[status]?.allowsViewing || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isDashboardStatusActive(status: DashboardStatus): boolean {
  return !isDashboardStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getDashboardStatusPriority(status: DashboardStatus): number {
  return DASHBOARD_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if dashboard status can transition to new status
 */
export function canDashboardTransitionTo(
  currentStatus: DashboardStatus,
  newStatus: DashboardStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isDashboardStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to publication
  if (
    isDashboardStatusError(currentStatus) &&
    getDashboardStatusCategory(newStatus) === DashboardStatusCategory.PUBLICATION
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next dashboard statuses
 */
export function getAllowedNextDashboardStatuses(currentStatus: DashboardStatus): DashboardStatus[] {
  return Object.values(DashboardStatus).filter((status) =>
    canDashboardTransitionTo(currentStatus, status)
  );
}

/**
 * Dashboard status groups
 */
export const DASHBOARD_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [
    DashboardStatus.DRAFT,
    DashboardStatus.PENDING_REVIEW,
    DashboardStatus.PENDING_APPROVAL,
  ],
  /** Review statuses */
  REVIEW: [DashboardStatus.REVIEW, DashboardStatus.IN_REVIEW, DashboardStatus.REVIEWED],
  /** Approval statuses */
  APPROVAL: [DashboardStatus.APPROVED, DashboardStatus.REJECTED, DashboardStatus.PENDING_APPROVAL],
  /** Published statuses */
  PUBLISHED: [
    DashboardStatus.PUBLISHED,
    DashboardStatus.UNPUBLISHED,
    DashboardStatus.STANDARD,
    DashboardStatus.PREMIUM,
    DashboardStatus.FREE,
  ],
  /** Active statuses */
  ACTIVE: [
    DashboardStatus.ACTIVE,
    DashboardStatus.READY,
    DashboardStatus.PRODUCTION,
    DashboardStatus.ACTIVATED,
    DashboardStatus.RENEWED,
    DashboardStatus.RESTORED,
  ],
  /** Terminal statuses */
  TERMINAL: [DashboardStatus.ARCHIVED, DashboardStatus.DELETED, DashboardStatus.EXPIRED],
} as const;
