/**
 * @fileoverview Widget status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Widget status enum
 */
export enum WidgetStatus {
  /** Active - widget is active */
  ACTIVE = 'ACTIVE',
  /** Inactive - widget is inactive */
  INACTIVE = 'INACTIVE',
  /** Draft - widget is in draft mode */
  DRAFT = 'DRAFT',
  /** Review - widget is under review */
  REVIEW = 'REVIEW',
  /** Approved - widget has been approved */
  APPROVED = 'APPROVED',
  /** Rejected - widget has been rejected */
  REJECTED = 'REJECTED',
  /** Published - widget is published */
  PUBLISHED = 'PUBLISHED',
  /** Unpublished - widget is unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Archived - widget has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Deleted - widget has been deleted */
  DELETED = 'DELETED',
  /** Locked - widget is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - widget is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Loading - widget is loading data */
  LOADING = 'LOADING',
  /** Loaded - widget has loaded data */
  LOADED = 'LOADED',
  /** Error - widget has an error */
  ERROR = 'ERROR',
  /** Retry - widget is retrying */
  RETRY = 'RETRY',
  /** Timeout - widget has timed out */
  TIMEOUT = 'TIMEOUT',
  /** Data available - widget has data */
  DATA_AVAILABLE = 'DATA_AVAILABLE',
  /** Data unavailable - widget has no data */
  DATA_UNAVAILABLE = 'DATA_UNAVAILABLE',
  /** Under maintenance - widget is under maintenance */
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  /** Deprecated - widget is deprecated */
  DEPRECATED = 'DEPRECATED',
  /** Old version - widget is old version */
  OLD_VERSION = 'OLD_VERSION',
  /** New version - widget has new version */
  NEW_VERSION = 'NEW_VERSION',
  /** Customized - widget has been customized */
  CUSTOMIZED = 'CUSTOMIZED',
  /** Standard - widget is standard */
  STANDARD = 'STANDARD',
  /** Premium - widget is premium */
  PREMIUM = 'PREMIUM',
  /** Free - widget is free */
  FREE = 'FREE',
  /** Shared - widget is shared */
  SHARED = 'SHARED',
  /** Private - widget is private */
  PRIVATE = 'PRIVATE',
  /** Public - widget is public */
  PUBLIC = 'PUBLIC',
  /** Restricted - widget is restricted */
  RESTRICTED = 'RESTRICTED',
  /** Pending - widget is pending */
  PENDING = 'PENDING',
  /** Processing - widget is processing */
  PROCESSING = 'PROCESSING',
  /** Completed - widget has completed */
  COMPLETED = 'COMPLETED',
  /** Failed - widget has failed */
  FAILED = 'FAILED',
  /** Expired - widget has expired */
  EXPIRED = 'EXPIRED',
  /** Paused - widget is paused */
  PAUSED = 'PAUSED',
  /** Resumed - widget has been resumed */
  RESUMED = 'RESUMED',
  /** Cancelled - widget has been cancelled */
  CANCELLED = 'CANCELLED',
  /** Restored - widget has been restored */
  RESTORED = 'RESTORED',
  /** Duplicated - widget has been duplicated */
  DUPLICATED = 'DUPLICATED',
  /** Merged - widget has been merged */
  MERGED = 'MERGED',
  /** Split - widget has been split */
  SPLIT = 'SPLIT',
}

/**
 * Widget status category for grouping
 */
export enum WidgetStatusCategory {
  /** Active states */
  ACTIVE = 'ACTIVE',
  /** Inactive states */
  INACTIVE = 'INACTIVE',
  /** Draft states */
  DRAFT = 'DRAFT',
  /** Review states */
  REVIEW = 'REVIEW',
  /** Publication states */
  PUBLICATION = 'PUBLICATION',
  /** Access states */
  ACCESS = 'ACCESS',
  /** Data states */
  DATA = 'DATA',
  /** Error states */
  ERROR = 'ERROR',
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Processing states */
  PROCESSING = 'PROCESSING',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
}

/**
 * Widget status category mapping
 */
export const WIDGET_STATUS_CATEGORY_MAP: Record<WidgetStatus, WidgetStatusCategory> = {
  [WidgetStatus.ACTIVE]: WidgetStatusCategory.ACTIVE,
  [WidgetStatus.INACTIVE]: WidgetStatusCategory.INACTIVE,
  [WidgetStatus.DRAFT]: WidgetStatusCategory.DRAFT,
  [WidgetStatus.REVIEW]: WidgetStatusCategory.REVIEW,
  [WidgetStatus.APPROVED]: WidgetStatusCategory.REVIEW,
  [WidgetStatus.REJECTED]: WidgetStatusCategory.REVIEW,
  [WidgetStatus.PUBLISHED]: WidgetStatusCategory.PUBLICATION,
  [WidgetStatus.UNPUBLISHED]: WidgetStatusCategory.PUBLICATION,
  [WidgetStatus.ARCHIVED]: WidgetStatusCategory.TERMINAL,
  [WidgetStatus.DELETED]: WidgetStatusCategory.TERMINAL,
  [WidgetStatus.LOCKED]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.UNLOCKED]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.LOADING]: WidgetStatusCategory.DATA,
  [WidgetStatus.LOADED]: WidgetStatusCategory.DATA,
  [WidgetStatus.ERROR]: WidgetStatusCategory.ERROR,
  [WidgetStatus.RETRY]: WidgetStatusCategory.DATA,
  [WidgetStatus.TIMEOUT]: WidgetStatusCategory.ERROR,
  [WidgetStatus.DATA_AVAILABLE]: WidgetStatusCategory.DATA,
  [WidgetStatus.DATA_UNAVAILABLE]: WidgetStatusCategory.DATA,
  [WidgetStatus.UNDER_MAINTENANCE]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.DEPRECATED]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.OLD_VERSION]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.NEW_VERSION]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.CUSTOMIZED]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.STANDARD]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.PREMIUM]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.FREE]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.SHARED]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.PRIVATE]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.PUBLIC]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.RESTRICTED]: WidgetStatusCategory.ACCESS,
  [WidgetStatus.PENDING]: WidgetStatusCategory.PROCESSING,
  [WidgetStatus.PROCESSING]: WidgetStatusCategory.PROCESSING,
  [WidgetStatus.COMPLETED]: WidgetStatusCategory.PROCESSING,
  [WidgetStatus.FAILED]: WidgetStatusCategory.ERROR,
  [WidgetStatus.EXPIRED]: WidgetStatusCategory.TERMINAL,
  [WidgetStatus.PAUSED]: WidgetStatusCategory.PROCESSING,
  [WidgetStatus.RESUMED]: WidgetStatusCategory.PROCESSING,
  [WidgetStatus.CANCELLED]: WidgetStatusCategory.TERMINAL,
  [WidgetStatus.RESTORED]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.DUPLICATED]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.MERGED]: WidgetStatusCategory.LIFECYCLE,
  [WidgetStatus.SPLIT]: WidgetStatusCategory.LIFECYCLE,
};

/**
 * Widget status configuration
 */
export interface WidgetStatusConfig {
  label: string;
  description: string;
  category: WidgetStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsInteraction: boolean;
  allowsEditing: boolean;
}

export const WIDGET_STATUS_CONFIG: Record<WidgetStatus, WidgetStatusConfig> = {
  [WidgetStatus.ACTIVE]: {
    label: 'Active',
    description: 'Widget is active and running',
    category: WidgetStatusCategory.ACTIVE,
    color: '#22C55E',
    icon: 'Play',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.INACTIVE]: {
    label: 'Inactive',
    description: 'Widget is inactive',
    category: WidgetStatusCategory.INACTIVE,
    color: '#6B7280',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.DRAFT]: {
    label: 'Draft',
    description: 'Widget is in draft mode',
    category: WidgetStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.REVIEW]: {
    label: 'Under Review',
    description: 'Widget is under review',
    category: WidgetStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.APPROVED]: {
    label: 'Approved',
    description: 'Widget has been approved',
    category: WidgetStatusCategory.REVIEW,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Widget has been rejected',
    category: WidgetStatusCategory.REVIEW,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.PUBLISHED]: {
    label: 'Published',
    description: 'Widget is published',
    category: WidgetStatusCategory.PUBLICATION,
    color: '#22C55E',
    icon: 'Globe',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Widget is unpublished',
    category: WidgetStatusCategory.PUBLICATION,
    color: '#6B7280',
    icon: 'EyeOff',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Widget has been archived',
    category: WidgetStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.DELETED]: {
    label: 'Deleted',
    description: 'Widget has been deleted',
    category: WidgetStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.LOCKED]: {
    label: 'Locked',
    description: 'Widget is locked',
    category: WidgetStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Widget is unlocked',
    category: WidgetStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.LOADING]: {
    label: 'Loading',
    description: 'Widget is loading data',
    category: WidgetStatusCategory.DATA,
    color: '#3B82F6',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.LOADED]: {
    label: 'Loaded',
    description: 'Widget has loaded data',
    category: WidgetStatusCategory.DATA,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.ERROR]: {
    label: 'Error',
    description: 'Widget has an error',
    category: WidgetStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'AlertCircle',
    priority: 1,
    isTerminal: false,
    isError: true,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.RETRY]: {
    label: 'Retry',
    description: 'Widget is retrying',
    category: WidgetStatusCategory.DATA,
    color: '#F59E0B',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.TIMEOUT]: {
    label: 'Timeout',
    description: 'Widget has timed out',
    category: WidgetStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.DATA_AVAILABLE]: {
    label: 'Data Available',
    description: 'Widget has data available',
    category: WidgetStatusCategory.DATA,
    color: '#22C55E',
    icon: 'Database',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.DATA_UNAVAILABLE]: {
    label: 'Data Unavailable',
    description: 'Widget has no data available',
    category: WidgetStatusCategory.DATA,
    color: '#6B7280',
    icon: 'Database',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.UNDER_MAINTENANCE]: {
    label: 'Under Maintenance',
    description: 'Widget is under maintenance',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'Settings',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.DEPRECATED]: {
    label: 'Deprecated',
    description: 'Widget is deprecated',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.OLD_VERSION]: {
    label: 'Old Version',
    description: 'Widget is old version',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'GitBranch',
    priority: 3,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.NEW_VERSION]: {
    label: 'New Version',
    description: 'Widget has new version available',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#3B82F6',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.CUSTOMIZED]: {
    label: 'Customized',
    description: 'Widget has been customized',
    category: WidgetStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'PenTool',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.STANDARD]: {
    label: 'Standard',
    description: 'Widget is standard',
    category: WidgetStatusCategory.ACCESS,
    color: '#3B82F6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.PREMIUM]: {
    label: 'Premium',
    description: 'Widget is premium',
    category: WidgetStatusCategory.ACCESS,
    color: '#F59E0B',
    icon: 'Crown',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.FREE]: {
    label: 'Free',
    description: 'Widget is free',
    category: WidgetStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Gift',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.SHARED]: {
    label: 'Shared',
    description: 'Widget is shared',
    category: WidgetStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'Share2',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.PRIVATE]: {
    label: 'Private',
    description: 'Widget is private',
    category: WidgetStatusCategory.ACCESS,
    color: '#6B7280',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.PUBLIC]: {
    label: 'Public',
    description: 'Widget is public',
    category: WidgetStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Globe',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.RESTRICTED]: {
    label: 'Restricted',
    description: 'Widget is restricted',
    category: WidgetStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Shield',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.PENDING]: {
    label: 'Pending',
    description: 'Widget is pending',
    category: WidgetStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.PROCESSING]: {
    label: 'Processing',
    description: 'Widget is processing',
    category: WidgetStatusCategory.PROCESSING,
    color: '#3B82F6',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.COMPLETED]: {
    label: 'Completed',
    description: 'Widget has completed',
    category: WidgetStatusCategory.PROCESSING,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.FAILED]: {
    label: 'Failed',
    description: 'Widget has failed',
    category: WidgetStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsInteraction: false,
    allowsEditing: true,
  },
  [WidgetStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Widget has expired',
    category: WidgetStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.PAUSED]: {
    label: 'Paused',
    description: 'Widget is paused',
    category: WidgetStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.RESUMED]: {
    label: 'Resumed',
    description: 'Widget has been resumed',
    category: WidgetStatusCategory.PROCESSING,
    color: '#22C55E',
    icon: 'Play',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.CANCELLED]: {
    label: 'Cancelled',
    description: 'Widget has been cancelled',
    category: WidgetStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsInteraction: false,
    allowsEditing: false,
  },
  [WidgetStatus.RESTORED]: {
    label: 'Restored',
    description: 'Widget has been restored',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.DUPLICATED]: {
    label: 'Duplicated',
    description: 'Widget has been duplicated',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#8B5CF6',
    icon: 'Copy',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: true,
  },
  [WidgetStatus.MERGED]: {
    label: 'Merged',
    description: 'Widget has been merged',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#6366F1',
    icon: 'GitMerge',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
  [WidgetStatus.SPLIT]: {
    label: 'Split',
    description: 'Widget has been split',
    category: WidgetStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsInteraction: true,
    allowsEditing: false,
  },
};

/**
 * Get widget status label
 */
export function getWidgetStatusLabel(status: WidgetStatus): string {
  return WIDGET_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get widget status description
 */
export function getWidgetStatusDescription(status: WidgetStatus): string {
  return WIDGET_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get widget status category
 */
export function getWidgetStatusCategory(status: WidgetStatus): WidgetStatusCategory {
  return WIDGET_STATUS_CATEGORY_MAP[status];
}

/**
 * Get widget status color
 */
export function getWidgetStatusColor(status: WidgetStatus): string {
  return WIDGET_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get widget status icon
 */
export function getWidgetStatusIcon(status: WidgetStatus): string {
  return WIDGET_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get widget statuses by category
 */
export function getWidgetStatusesByCategory(category: WidgetStatusCategory): WidgetStatus[] {
  return Object.entries(WIDGET_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as WidgetStatus);
}

/**
 * Get active statuses
 */
export function getActiveWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.ACTIVE);
}

/**
 * Get inactive statuses
 */
export function getInactiveWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.INACTIVE);
}

/**
 * Get draft statuses
 */
export function getDraftWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.DRAFT);
}

/**
 * Get review statuses
 */
export function getReviewWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.REVIEW);
}

/**
 * Get publication statuses
 */
export function getPublicationWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.PUBLICATION);
}

/**
 * Get access statuses
 */
export function getAccessWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.ACCESS);
}

/**
 * Get data statuses
 */
export function getDataWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.DATA);
}

/**
 * Get error statuses
 */
export function getErrorWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.ERROR);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.LIFECYCLE);
}

/**
 * Get processing statuses
 */
export function getProcessingWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.PROCESSING);
}

/**
 * Get terminal statuses
 */
export function getTerminalWidgetStatuses(): WidgetStatus[] {
  return getWidgetStatusesByCategory(WidgetStatusCategory.TERMINAL);
}

/**
 * Check if status is terminal
 */
export function isWidgetStatusTerminal(status: WidgetStatus): boolean {
  return WIDGET_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isWidgetStatusError(status: WidgetStatus): boolean {
  return WIDGET_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows interaction
 */
export function widgetStatusAllowsInteraction(status: WidgetStatus): boolean {
  return WIDGET_STATUS_CONFIG[status]?.allowsInteraction || false;
}

/**
 * Check if status allows editing
 */
export function widgetStatusAllowsEditing(status: WidgetStatus): boolean {
  return WIDGET_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isWidgetStatusActive(status: WidgetStatus): boolean {
  return !isWidgetStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getWidgetStatusPriority(status: WidgetStatus): number {
  return WIDGET_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if widget status can transition to new status
 */
export function canWidgetTransitionTo(
  currentStatus: WidgetStatus,
  newStatus: WidgetStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isWidgetStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to active without fixing
  if (
    isWidgetStatusError(currentStatus) &&
    getWidgetStatusCategory(newStatus) === WidgetStatusCategory.ACTIVE
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next widget statuses
 */
export function getAllowedNextWidgetStatuses(currentStatus: WidgetStatus): WidgetStatus[] {
  return Object.values(WidgetStatus).filter((status) =>
    canWidgetTransitionTo(currentStatus, status)
  );
}

/**
 * Widget status groups
 */
export const WIDGET_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [WidgetStatus.DRAFT, WidgetStatus.PENDING, WidgetStatus.LOADING],
  /** Active statuses */
  ACTIVE: [
    WidgetStatus.ACTIVE,
    WidgetStatus.PUBLISHED,
    WidgetStatus.APPROVED,
    WidgetStatus.LOADED,
    WidgetStatus.DATA_AVAILABLE,
  ],
  /** Error statuses */
  ERROR: [WidgetStatus.ERROR, WidgetStatus.TIMEOUT, WidgetStatus.FAILED, WidgetStatus.REJECTED],
  /** Terminal statuses */
  TERMINAL: [
    WidgetStatus.ARCHIVED,
    WidgetStatus.DELETED,
    WidgetStatus.EXPIRED,
    WidgetStatus.CANCELLED,
  ],
} as const;
