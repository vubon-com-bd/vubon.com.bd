/**
 * @fileoverview Export status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Export status enum
 */
export enum ExportStatus {
  /** Pending - export is pending */
  PENDING = 'PENDING',
  /** Queued - export is queued */
  QUEUED = 'QUEUED',
  /** Processing - export is being processed */
  PROCESSING = 'PROCESSING',
  /** Generating - export is being generated */
  GENERATING = 'GENERATING',
  /** Compiling - export is being compiled */
  COMPILING = 'COMPILING',
  /** Rendering - export is being rendered */
  RENDERING = 'RENDERING',
  /** Encrypting - export is being encrypted */
  ENCRYPTING = 'ENCRYPTING',
  /** Compressing - export is being compressed */
  COMPRESSING = 'COMPRESSING',
  /** Storing - export is being stored */
  STORING = 'STORING',
  /** Completed - export completed successfully */
  COMPLETED = 'COMPLETED',
  /** Failed - export failed */
  FAILED = 'FAILED',
  /** Partial - export completed partially */
  PARTIAL = 'PARTIAL',
  /** Expired - export has expired */
  EXPIRED = 'EXPIRED',
  /** Cancelled - export has been cancelled */
  CANCELLED = 'CANCELLED',
  /** Paused - export is paused */
  PAUSED = 'PAUSED',
  /** Resumed - export has been resumed */
  RESUMED = 'RESUMED',
  /** Ready for download - export is ready */
  READY_FOR_DOWNLOAD = 'READY_FOR_DOWNLOAD',
  /** Downloading - export is being downloaded */
  DOWNLOADING = 'DOWNLOADING',
  /** Downloaded - export has been downloaded */
  DOWNLOADED = 'DOWNLOADED',
  /** Opened - export has been opened */
  OPENED = 'OPENED',
  /** Viewed - export has been viewed */
  VIEWED = 'VIEWED',
  /** Deleted - export has been deleted */
  DELETED = 'DELETED',
  /** Archived - export has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Restored - export has been restored */
  RESTORED = 'RESTORED',
  /** Corrupted - export file is corrupted */
  CORRUPTED = 'CORRUPTED',
  /** Repaired - export file has been repaired */
  REPAIRED = 'REPAIRED',
  /** Retry scheduled - retry is scheduled */
  RETRY_SCHEDULED = 'RETRY_SCHEDULED',
  /** Retry limit exceeded - retry attempts exhausted */
  RETRY_LIMIT_EXCEEDED = 'RETRY_LIMIT_EXCEEDED',
  /** Permanently failed - export permanently failed */
  PERMANENTLY_FAILED = 'PERMANENTLY_FAILED',
  /** Verified - export has been verified */
  VERIFIED = 'VERIFIED',
  /** Unverified - export is unverified */
  UNVERIFIED = 'UNVERIFIED',
  /** Authenticated - export is authenticated */
  AUTHENTICATED = 'AUTHENTICATED',
  /** Unauthenticated - export is unauthenticated */
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  /** Authorized - export is authorized */
  AUTHORIZED = 'AUTHORIZED',
  /** Unauthorized - export is unauthorized */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /** Valid - export is valid */
  VALID = 'VALID',
  /** Invalid - export is invalid */
  INVALID = 'INVALID',
  /** Locked - export is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - export is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Expiring - export is about to expire */
  EXPIRING = 'EXPIRING',
  /** Renewed - export has been renewed */
  RENEWED = 'RENEWED',
  /** Activated - export has been activated */
  ACTIVATED = 'ACTIVATED',
  /** Deactivated - export has been deactivated */
  DEACTIVATED = 'DEACTIVATED',
}

/**
 * Export status category for grouping
 */
export enum ExportStatusCategory {
  /** Initial states */
  INITIAL = 'INITIAL',
  /** Processing states */
  PROCESSING = 'PROCESSING',
  /** Success states */
  SUCCESS = 'SUCCESS',
  /** Error states */
  ERROR = 'ERROR',
  /** Download states */
  DOWNLOAD = 'DOWNLOAD',
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Security states */
  SECURITY = 'SECURITY',
  /** Validation states */
  VALIDATION = 'VALIDATION',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
}

/**
 * Export status category mapping
 */
export const EXPORT_STATUS_CATEGORY_MAP: Record<ExportStatus, ExportStatusCategory> = {
  [ExportStatus.PENDING]: ExportStatusCategory.INITIAL,
  [ExportStatus.QUEUED]: ExportStatusCategory.INITIAL,
  [ExportStatus.PROCESSING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.GENERATING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.COMPILING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.RENDERING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.ENCRYPTING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.COMPRESSING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.STORING]: ExportStatusCategory.PROCESSING,
  [ExportStatus.COMPLETED]: ExportStatusCategory.SUCCESS,
  [ExportStatus.FAILED]: ExportStatusCategory.ERROR,
  [ExportStatus.PARTIAL]: ExportStatusCategory.ERROR,
  [ExportStatus.EXPIRED]: ExportStatusCategory.TERMINAL,
  [ExportStatus.CANCELLED]: ExportStatusCategory.TERMINAL,
  [ExportStatus.PAUSED]: ExportStatusCategory.PROCESSING,
  [ExportStatus.RESUMED]: ExportStatusCategory.PROCESSING,
  [ExportStatus.READY_FOR_DOWNLOAD]: ExportStatusCategory.SUCCESS,
  [ExportStatus.DOWNLOADING]: ExportStatusCategory.DOWNLOAD,
  [ExportStatus.DOWNLOADED]: ExportStatusCategory.DOWNLOAD,
  [ExportStatus.OPENED]: ExportStatusCategory.DOWNLOAD,
  [ExportStatus.VIEWED]: ExportStatusCategory.DOWNLOAD,
  [ExportStatus.DELETED]: ExportStatusCategory.TERMINAL,
  [ExportStatus.ARCHIVED]: ExportStatusCategory.TERMINAL,
  [ExportStatus.RESTORED]: ExportStatusCategory.LIFECYCLE,
  [ExportStatus.CORRUPTED]: ExportStatusCategory.ERROR,
  [ExportStatus.REPAIRED]: ExportStatusCategory.SUCCESS,
  [ExportStatus.RETRY_SCHEDULED]: ExportStatusCategory.PROCESSING,
  [ExportStatus.RETRY_LIMIT_EXCEEDED]: ExportStatusCategory.ERROR,
  [ExportStatus.PERMANENTLY_FAILED]: ExportStatusCategory.TERMINAL,
  [ExportStatus.VERIFIED]: ExportStatusCategory.VALIDATION,
  [ExportStatus.UNVERIFIED]: ExportStatusCategory.VALIDATION,
  [ExportStatus.AUTHENTICATED]: ExportStatusCategory.SECURITY,
  [ExportStatus.UNAUTHENTICATED]: ExportStatusCategory.SECURITY,
  [ExportStatus.AUTHORIZED]: ExportStatusCategory.SECURITY,
  [ExportStatus.UNAUTHORIZED]: ExportStatusCategory.SECURITY,
  [ExportStatus.VALID]: ExportStatusCategory.VALIDATION,
  [ExportStatus.INVALID]: ExportStatusCategory.VALIDATION,
  [ExportStatus.LOCKED]: ExportStatusCategory.SECURITY,
  [ExportStatus.UNLOCKED]: ExportStatusCategory.SECURITY,
  [ExportStatus.EXPIRING]: ExportStatusCategory.LIFECYCLE,
  [ExportStatus.RENEWED]: ExportStatusCategory.LIFECYCLE,
  [ExportStatus.ACTIVATED]: ExportStatusCategory.LIFECYCLE,
  [ExportStatus.DEACTIVATED]: ExportStatusCategory.LIFECYCLE,
};

/**
 * Export status configuration
 */
export interface ExportStatusConfig {
  label: string;
  description: string;
  category: ExportStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsDownload: boolean;
  allowsEditing: boolean;
}

export const EXPORT_STATUS_CONFIG: Record<ExportStatus, ExportStatusConfig> = {
  [ExportStatus.PENDING]: {
    label: 'Pending',
    description: 'Export is pending processing',
    category: ExportStatusCategory.INITIAL,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.QUEUED]: {
    label: 'Queued',
    description: 'Export is queued for processing',
    category: ExportStatusCategory.INITIAL,
    color: '#8B5CF6',
    icon: 'List',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.PROCESSING]: {
    label: 'Processing',
    description: 'Export is being processed',
    category: ExportStatusCategory.PROCESSING,
    color: '#3B82F6',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.GENERATING]: {
    label: 'Generating',
    description: 'Export is being generated',
    category: ExportStatusCategory.PROCESSING,
    color: '#6366F1',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.COMPILING]: {
    label: 'Compiling',
    description: 'Export is being compiled',
    category: ExportStatusCategory.PROCESSING,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.RENDERING]: {
    label: 'Rendering',
    description: 'Export is being rendered',
    category: ExportStatusCategory.PROCESSING,
    color: '#10B981',
    icon: 'Layout',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.ENCRYPTING]: {
    label: 'Encrypting',
    description: 'Export is being encrypted',
    category: ExportStatusCategory.PROCESSING,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.COMPRESSING]: {
    label: 'Compressing',
    description: 'Export is being compressed',
    category: ExportStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'FileArchive',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.STORING]: {
    label: 'Storing',
    description: 'Export is being stored',
    category: ExportStatusCategory.PROCESSING,
    color: '#6B7280',
    icon: 'Database',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.COMPLETED]: {
    label: 'Completed',
    description: 'Export completed successfully',
    category: ExportStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.FAILED]: {
    label: 'Failed',
    description: 'Export has failed',
    category: ExportStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 1,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.PARTIAL]: {
    label: 'Partial',
    description: 'Export completed partially',
    category: ExportStatusCategory.ERROR,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: true,
    allowsEditing: true,
  },
  [ExportStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Export has expired',
    category: ExportStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.CANCELLED]: {
    label: 'Cancelled',
    description: 'Export has been cancelled',
    category: ExportStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.PAUSED]: {
    label: 'Paused',
    description: 'Export is paused',
    category: ExportStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.RESUMED]: {
    label: 'Resumed',
    description: 'Export has been resumed',
    category: ExportStatusCategory.PROCESSING,
    color: '#22C55E',
    icon: 'Play',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.READY_FOR_DOWNLOAD]: {
    label: 'Ready for Download',
    description: 'Export is ready for download',
    category: ExportStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'Download',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.DOWNLOADING]: {
    label: 'Downloading',
    description: 'Export is being downloaded',
    category: ExportStatusCategory.DOWNLOAD,
    color: '#3B82F6',
    icon: 'Download',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.DOWNLOADED]: {
    label: 'Downloaded',
    description: 'Export has been downloaded',
    category: ExportStatusCategory.DOWNLOAD,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.OPENED]: {
    label: 'Opened',
    description: 'Export has been opened',
    category: ExportStatusCategory.DOWNLOAD,
    color: '#8B5CF6',
    icon: 'Eye',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.VIEWED]: {
    label: 'Viewed',
    description: 'Export has been viewed',
    category: ExportStatusCategory.DOWNLOAD,
    color: '#6366F1',
    icon: 'Eye',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.DELETED]: {
    label: 'Deleted',
    description: 'Export has been deleted',
    category: ExportStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Export has been archived',
    category: ExportStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.RESTORED]: {
    label: 'Restored',
    description: 'Export has been restored',
    category: ExportStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: true,
  },
  [ExportStatus.CORRUPTED]: {
    label: 'Corrupted',
    description: 'Export file is corrupted',
    category: ExportStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.REPAIRED]: {
    label: 'Repaired',
    description: 'Export file has been repaired',
    category: ExportStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.RETRY_SCHEDULED]: {
    label: 'Retry Scheduled',
    description: 'Retry is scheduled',
    category: ExportStatusCategory.PROCESSING,
    color: '#F59E0B',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.RETRY_LIMIT_EXCEEDED]: {
    label: 'Retry Limit Exceeded',
    description: 'Retry attempts exhausted',
    category: ExportStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.PERMANENTLY_FAILED]: {
    label: 'Permanently Failed',
    description: 'Export permanently failed',
    category: ExportStatusCategory.TERMINAL,
    color: '#DC2626',
    icon: 'XCircle',
    priority: 1,
    isTerminal: true,
    isError: true,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.VERIFIED]: {
    label: 'Verified',
    description: 'Export has been verified',
    category: ExportStatusCategory.VALIDATION,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.UNVERIFIED]: {
    label: 'Unverified',
    description: 'Export is unverified',
    category: ExportStatusCategory.VALIDATION,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.AUTHENTICATED]: {
    label: 'Authenticated',
    description: 'Export is authenticated',
    category: ExportStatusCategory.SECURITY,
    color: '#22C55E',
    icon: 'ShieldCheck',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.UNAUTHENTICATED]: {
    label: 'Unauthenticated',
    description: 'Export is unauthenticated',
    category: ExportStatusCategory.SECURITY,
    color: '#EF4444',
    icon: 'ShieldOff',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.AUTHORIZED]: {
    label: 'Authorized',
    description: 'Export is authorized',
    category: ExportStatusCategory.SECURITY,
    color: '#22C55E',
    icon: 'ShieldCheck',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.UNAUTHORIZED]: {
    label: 'Unauthorized',
    description: 'Export is unauthorized',
    category: ExportStatusCategory.SECURITY,
    color: '#EF4444',
    icon: 'ShieldOff',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.VALID]: {
    label: 'Valid',
    description: 'Export is valid',
    category: ExportStatusCategory.VALIDATION,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.INVALID]: {
    label: 'Invalid',
    description: 'Export is invalid',
    category: ExportStatusCategory.VALIDATION,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsDownload: false,
    allowsEditing: true,
  },
  [ExportStatus.LOCKED]: {
    label: 'Locked',
    description: 'Export is locked',
    category: ExportStatusCategory.SECURITY,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
  [ExportStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Export is unlocked',
    category: ExportStatusCategory.SECURITY,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: true,
  },
  [ExportStatus.EXPIRING]: {
    label: 'Expiring',
    description: 'Export is about to expire',
    category: ExportStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.RENEWED]: {
    label: 'Renewed',
    description: 'Export has been renewed',
    category: ExportStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'Repeat',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.ACTIVATED]: {
    label: 'Activated',
    description: 'Export has been activated',
    category: ExportStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsDownload: true,
    allowsEditing: false,
  },
  [ExportStatus.DEACTIVATED]: {
    label: 'Deactivated',
    description: 'Export has been deactivated',
    category: ExportStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Power',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsDownload: false,
    allowsEditing: false,
  },
};

/**
 * Get export status label
 */
export function getExportStatusLabel(status: ExportStatus): string {
  return EXPORT_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get export status description
 */
export function getExportStatusDescription(status: ExportStatus): string {
  return EXPORT_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get export status category
 */
export function getExportStatusCategory(status: ExportStatus): ExportStatusCategory {
  return EXPORT_STATUS_CATEGORY_MAP[status];
}

/**
 * Get export status color
 */
export function getExportStatusColor(status: ExportStatus): string {
  return EXPORT_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get export status icon
 */
export function getExportStatusIcon(status: ExportStatus): string {
  return EXPORT_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get export statuses by category
 */
export function getExportStatusesByCategory(category: ExportStatusCategory): ExportStatus[] {
  return Object.entries(EXPORT_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as ExportStatus);
}

/**
 * Get initial statuses
 */
export function getInitialExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.INITIAL);
}

/**
 * Get processing statuses
 */
export function getProcessingExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.PROCESSING);
}

/**
 * Get success statuses
 */
export function getSuccessExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.SUCCESS);
}

/**
 * Get error statuses
 */
export function getErrorExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.ERROR);
}

/**
 * Get download statuses
 */
export function getDownloadExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.DOWNLOAD);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.LIFECYCLE);
}

/**
 * Get security statuses
 */
export function getSecurityExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.SECURITY);
}

/**
 * Get validation statuses
 */
export function getValidationExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.VALIDATION);
}

/**
 * Get terminal statuses
 */
export function getTerminalExportStatuses(): ExportStatus[] {
  return getExportStatusesByCategory(ExportStatusCategory.TERMINAL);
}

/**
 * Check if status is terminal
 */
export function isExportStatusTerminal(status: ExportStatus): boolean {
  return EXPORT_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isExportStatusError(status: ExportStatus): boolean {
  return EXPORT_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows download
 */
export function exportStatusAllowsDownload(status: ExportStatus): boolean {
  return EXPORT_STATUS_CONFIG[status]?.allowsDownload || false;
}

/**
 * Check if status allows editing
 */
export function exportStatusAllowsEditing(status: ExportStatus): boolean {
  return EXPORT_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isExportStatusActive(status: ExportStatus): boolean {
  return !isExportStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getExportStatusPriority(status: ExportStatus): number {
  return EXPORT_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if export status can transition to new status
 */
export function canExportTransitionTo(
  currentStatus: ExportStatus,
  newStatus: ExportStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isExportStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to success without fixing
  if (
    isExportStatusError(currentStatus) &&
    getExportStatusCategory(newStatus) === ExportStatusCategory.SUCCESS
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next export statuses
 */
export function getAllowedNextExportStatuses(currentStatus: ExportStatus): ExportStatus[] {
  return Object.values(ExportStatus).filter((status) =>
    canExportTransitionTo(currentStatus, status)
  );
}

/**
 * Export status groups
 */
export const EXPORT_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [ExportStatus.PENDING, ExportStatus.QUEUED],
  /** Processing statuses */
  PROCESSING: [
    ExportStatus.PROCESSING,
    ExportStatus.GENERATING,
    ExportStatus.COMPILING,
    ExportStatus.RENDERING,
    ExportStatus.ENCRYPTING,
    ExportStatus.COMPRESSING,
    ExportStatus.STORING,
    ExportStatus.PAUSED,
    ExportStatus.RESUMED,
    ExportStatus.RETRY_SCHEDULED,
  ],
  /** Success statuses */
  SUCCESS: [
    ExportStatus.COMPLETED,
    ExportStatus.READY_FOR_DOWNLOAD,
    ExportStatus.DOWNLOADED,
    ExportStatus.OPENED,
    ExportStatus.VIEWED,
    ExportStatus.REPAIRED,
    ExportStatus.VERIFIED,
    ExportStatus.AUTHENTICATED,
    ExportStatus.AUTHORIZED,
    ExportStatus.VALID,
  ],
  /** Error statuses */
  ERROR: [
    ExportStatus.FAILED,
    ExportStatus.PARTIAL,
    ExportStatus.CORRUPTED,
    ExportStatus.RETRY_LIMIT_EXCEEDED,
    ExportStatus.UNAUTHENTICATED,
    ExportStatus.UNAUTHORIZED,
    ExportStatus.INVALID,
  ],
  /** Terminal statuses */
  TERMINAL: [
    ExportStatus.EXPIRED,
    ExportStatus.CANCELLED,
    ExportStatus.DELETED,
    ExportStatus.ARCHIVED,
    ExportStatus.PERMANENTLY_FAILED,
  ],
} as const;
