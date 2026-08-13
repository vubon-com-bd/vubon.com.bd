/**
 * @fileoverview Report template status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report template status enum
 */
export enum ReportTemplateStatus {
  /** Draft - template is being created */
  DRAFT = 'DRAFT',
  /** Review - template is under review */
  REVIEW = 'REVIEW',
  /** Approved - template has been approved */
  APPROVED = 'APPROVED',
  /** Rejected - template has been rejected */
  REJECTED = 'REJECTED',
  /** Published - template is published and available */
  PUBLISHED = 'PUBLISHED',
  /** Unpublished - template is unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Archived - template has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Deleted - template has been deleted */
  DELETED = 'DELETED',
  /** Deprecated - template is deprecated */
  DEPRECATED = 'DEPRECATED',
  /** Under maintenance - template is being maintained */
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  /** New version - template has new version available */
  NEW_VERSION = 'NEW_VERSION',
  /** Old version - template is an old version */
  OLD_VERSION = 'OLD_VERSION',
  /** Customized - template has been customized */
  CUSTOMIZED = 'CUSTOMIZED',
  /** Standard - template is standard */
  STANDARD = 'STANDARD',
  /** Premium - template is premium */
  PREMIUM = 'PREMIUM',
  /** Free - template is free */
  FREE = 'FREE',
  /** Locked - template is locked */
  LOCKED = 'LOCKED',
  /** Unlocked - template is unlocked */
  UNLOCKED = 'UNLOCKED',
  /** Shared - template is shared */
  SHARED = 'SHARED',
  /** Private - template is private */
  PRIVATE = 'PRIVATE',
  /** Public - template is public */
  PUBLIC = 'PUBLIC',
  /** Restricted - template is restricted */
  RESTRICTED = 'RESTRICTED',
  /** Pending approval - template is pending approval */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /** Pending review - template is pending review */
  PENDING_REVIEW = 'PENDING_REVIEW',
  /** In review - template is in review process */
  IN_REVIEW = 'IN_REVIEW',
  /** Reviewed - template has been reviewed */
  REVIEWED = 'REVIEWED',
  /** Testing - template is in testing */
  TESTING = 'TESTING',
  /** Staging - template is in staging */
  STAGING = 'STAGING',
  /** Production - template is in production */
  PRODUCTION = 'PRODUCTION',
  /** Ready - template is ready for use */
  READY = 'READY',
  /** Not ready - template is not ready */
  NOT_READY = 'NOT_READY',
  /** Expired - template has expired */
  EXPIRED = 'EXPIRED',
  /** Renewed - template has been renewed */
  RENEWED = 'RENEWED',
  /** Activated - template has been activated */
  ACTIVATED = 'ACTIVATED',
  /** Deactivated - template has been deactivated */
  DEACTIVATED = 'DEACTIVATED',
}

/**
 * Template status category for grouping
 */
export enum ReportTemplateStatusCategory {
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
  /** Version states */
  VERSION = 'VERSION',
  /** Lifecycle states */
  LIFECYCLE = 'LIFECYCLE',
  /** Environment states */
  ENVIRONMENT = 'ENVIRONMENT',
  /** Readiness states */
  READINESS = 'READINESS',
}

/**
 * Template status category mapping
 */
export const REPORT_TEMPLATE_STATUS_CATEGORY_MAP: Record<
  ReportTemplateStatus,
  ReportTemplateStatusCategory
> = {
  [ReportTemplateStatus.DRAFT]: ReportTemplateStatusCategory.DRAFT,
  [ReportTemplateStatus.REVIEW]: ReportTemplateStatusCategory.REVIEW,
  [ReportTemplateStatus.APPROVED]: ReportTemplateStatusCategory.APPROVAL,
  [ReportTemplateStatus.REJECTED]: ReportTemplateStatusCategory.APPROVAL,
  [ReportTemplateStatus.PUBLISHED]: ReportTemplateStatusCategory.PUBLICATION,
  [ReportTemplateStatus.UNPUBLISHED]: ReportTemplateStatusCategory.PUBLICATION,
  [ReportTemplateStatus.ARCHIVED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.DELETED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.DEPRECATED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.UNDER_MAINTENANCE]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.NEW_VERSION]: ReportTemplateStatusCategory.VERSION,
  [ReportTemplateStatus.OLD_VERSION]: ReportTemplateStatusCategory.VERSION,
  [ReportTemplateStatus.CUSTOMIZED]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.STANDARD]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.PREMIUM]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.FREE]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.LOCKED]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.UNLOCKED]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.SHARED]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.PRIVATE]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.PUBLIC]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.RESTRICTED]: ReportTemplateStatusCategory.ACCESS,
  [ReportTemplateStatus.PENDING_APPROVAL]: ReportTemplateStatusCategory.APPROVAL,
  [ReportTemplateStatus.PENDING_REVIEW]: ReportTemplateStatusCategory.REVIEW,
  [ReportTemplateStatus.IN_REVIEW]: ReportTemplateStatusCategory.REVIEW,
  [ReportTemplateStatus.REVIEWED]: ReportTemplateStatusCategory.REVIEW,
  [ReportTemplateStatus.TESTING]: ReportTemplateStatusCategory.ENVIRONMENT,
  [ReportTemplateStatus.STAGING]: ReportTemplateStatusCategory.ENVIRONMENT,
  [ReportTemplateStatus.PRODUCTION]: ReportTemplateStatusCategory.ENVIRONMENT,
  [ReportTemplateStatus.READY]: ReportTemplateStatusCategory.READINESS,
  [ReportTemplateStatus.NOT_READY]: ReportTemplateStatusCategory.READINESS,
  [ReportTemplateStatus.EXPIRED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.RENEWED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.ACTIVATED]: ReportTemplateStatusCategory.LIFECYCLE,
  [ReportTemplateStatus.DEACTIVATED]: ReportTemplateStatusCategory.LIFECYCLE,
};

/**
 * Template status configuration
 */
export interface ReportTemplateStatusConfig {
  label: string;
  description: string;
  category: ReportTemplateStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsEditing: boolean;
  allowsPublishing: boolean;
}

export const REPORT_TEMPLATE_STATUS_CONFIG: Record<
  ReportTemplateStatus,
  ReportTemplateStatusConfig
> = {
  [ReportTemplateStatus.DRAFT]: {
    label: 'Draft',
    description: 'Template is in draft mode',
    category: ReportTemplateStatusCategory.DRAFT,
    color: '#6B7280',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.REVIEW]: {
    label: 'Review',
    description: 'Template is under review',
    category: ReportTemplateStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.APPROVED]: {
    label: 'Approved',
    description: 'Template has been approved',
    category: ReportTemplateStatusCategory.APPROVAL,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Template has been rejected',
    category: ReportTemplateStatusCategory.APPROVAL,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.PUBLISHED]: {
    label: 'Published',
    description: 'Template is published and available',
    category: ReportTemplateStatusCategory.PUBLICATION,
    color: '#22C55E',
    icon: 'Globe',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Template is unpublished',
    category: ReportTemplateStatusCategory.PUBLICATION,
    color: '#6B7280',
    icon: 'EyeOff',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Template has been archived',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.DELETED]: {
    label: 'Deleted',
    description: 'Template has been deleted',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.DEPRECATED]: {
    label: 'Deprecated',
    description: 'Template is deprecated',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.UNDER_MAINTENANCE]: {
    label: 'Under Maintenance',
    description: 'Template is under maintenance',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#F59E0B',
    icon: 'Settings',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.NEW_VERSION]: {
    label: 'New Version',
    description: 'Template has new version available',
    category: ReportTemplateStatusCategory.VERSION,
    color: '#3B82F6',
    icon: 'GitBranch',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.OLD_VERSION]: {
    label: 'Old Version',
    description: 'Template is an old version',
    category: ReportTemplateStatusCategory.VERSION,
    color: '#6B7280',
    icon: 'GitBranch',
    priority: 3,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.CUSTOMIZED]: {
    label: 'Customized',
    description: 'Template has been customized',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'PenTool',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.STANDARD]: {
    label: 'Standard',
    description: 'Template is standard',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#3B82F6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.PREMIUM]: {
    label: 'Premium',
    description: 'Template is premium',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#F59E0B',
    icon: 'Crown',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.FREE]: {
    label: 'Free',
    description: 'Template is free',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Gift',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.LOCKED]: {
    label: 'Locked',
    description: 'Template is locked',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.UNLOCKED]: {
    label: 'Unlocked',
    description: 'Template is unlocked',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Unlock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.SHARED]: {
    label: 'Shared',
    description: 'Template is shared',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#8B5CF6',
    icon: 'Share2',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.PRIVATE]: {
    label: 'Private',
    description: 'Template is private',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#6B7280',
    icon: 'Lock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.PUBLIC]: {
    label: 'Public',
    description: 'Template is public',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#22C55E',
    icon: 'Globe',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.RESTRICTED]: {
    label: 'Restricted',
    description: 'Template is restricted',
    category: ReportTemplateStatusCategory.ACCESS,
    color: '#EF4444',
    icon: 'Shield',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.PENDING_APPROVAL]: {
    label: 'Pending Approval',
    description: 'Template is pending approval',
    category: ReportTemplateStatusCategory.APPROVAL,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.PENDING_REVIEW]: {
    label: 'Pending Review',
    description: 'Template is pending review',
    category: ReportTemplateStatusCategory.REVIEW,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.IN_REVIEW]: {
    label: 'In Review',
    description: 'Template is in review process',
    category: ReportTemplateStatusCategory.REVIEW,
    color: '#8B5CF6',
    icon: 'FileText',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.REVIEWED]: {
    label: 'Reviewed',
    description: 'Template has been reviewed',
    category: ReportTemplateStatusCategory.REVIEW,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.TESTING]: {
    label: 'Testing',
    description: 'Template is in testing',
    category: ReportTemplateStatusCategory.ENVIRONMENT,
    color: '#F59E0B',
    icon: 'Beaker',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: true,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.STAGING]: {
    label: 'Staging',
    description: 'Template is in staging',
    category: ReportTemplateStatusCategory.ENVIRONMENT,
    color: '#8B5CF6',
    icon: 'Layers',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.PRODUCTION]: {
    label: 'Production',
    description: 'Template is in production',
    category: ReportTemplateStatusCategory.ENVIRONMENT,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.READY]: {
    label: 'Ready',
    description: 'Template is ready for use',
    category: ReportTemplateStatusCategory.READINESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.NOT_READY]: {
    label: 'Not Ready',
    description: 'Template is not ready',
    category: ReportTemplateStatusCategory.READINESS,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsEditing: true,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Template has expired',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Clock',
    priority: 3,
    isTerminal: true,
    isError: true,
    allowsEditing: false,
    allowsPublishing: false,
  },
  [ReportTemplateStatus.RENEWED]: {
    label: 'Renewed',
    description: 'Template has been renewed',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'Repeat',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.ACTIVATED]: {
    label: 'Activated',
    description: 'Template has been activated',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: true,
  },
  [ReportTemplateStatus.DEACTIVATED]: {
    label: 'Deactivated',
    description: 'Template has been deactivated',
    category: ReportTemplateStatusCategory.LIFECYCLE,
    color: '#6B7280',
    icon: 'Power',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsEditing: false,
    allowsPublishing: false,
  },
};

/**
 * Get template status label
 */
export function getTemplateStatusLabel(status: ReportTemplateStatus): string {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get template status description
 */
export function getTemplateStatusDescription(status: ReportTemplateStatus): string {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get template status category
 */
export function getTemplateStatusCategory(
  status: ReportTemplateStatus
): ReportTemplateStatusCategory {
  return REPORT_TEMPLATE_STATUS_CATEGORY_MAP[status];
}

/**
 * Get template status color
 */
export function getTemplateStatusColor(status: ReportTemplateStatus): string {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get template status icon
 */
export function getTemplateStatusIcon(status: ReportTemplateStatus): string {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get template statuses by category
 */
export function getTemplateStatusesByCategory(
  category: ReportTemplateStatusCategory
): ReportTemplateStatus[] {
  return Object.entries(REPORT_TEMPLATE_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as ReportTemplateStatus);
}

/**
 * Get draft statuses
 */
export function getDraftTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.DRAFT);
}

/**
 * Get review statuses
 */
export function getReviewTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.REVIEW);
}

/**
 * Get approval statuses
 */
export function getApprovalTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.APPROVAL);
}

/**
 * Get publication statuses
 */
export function getPublicationTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.PUBLICATION);
}

/**
 * Get access statuses
 */
export function getAccessTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.ACCESS);
}

/**
 * Get lifecycle statuses
 */
export function getLifecycleTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.LIFECYCLE);
}

/**
 * Get environment statuses
 */
export function getEnvironmentTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.ENVIRONMENT);
}

/**
 * Get readiness statuses
 */
export function getReadinessTemplateStatuses(): ReportTemplateStatus[] {
  return getTemplateStatusesByCategory(ReportTemplateStatusCategory.READINESS);
}

/**
 * Check if status is terminal
 */
export function isTemplateStatusTerminal(status: ReportTemplateStatus): boolean {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isTemplateStatusError(status: ReportTemplateStatus): boolean {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows editing
 */
export function templateStatusAllowsEditing(status: ReportTemplateStatus): boolean {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.allowsEditing || false;
}

/**
 * Check if status allows publishing
 */
export function templateStatusAllowsPublishing(status: ReportTemplateStatus): boolean {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.allowsPublishing || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isTemplateStatusActive(status: ReportTemplateStatus): boolean {
  return !isTemplateStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getTemplateStatusPriority(status: ReportTemplateStatus): number {
  return REPORT_TEMPLATE_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if template status can transition to new status
 */
export function canTemplateTransitionTo(
  currentStatus: ReportTemplateStatus,
  newStatus: ReportTemplateStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isTemplateStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to active without fixing
  if (
    isTemplateStatusError(currentStatus) &&
    getTemplateStatusCategory(newStatus) === ReportTemplateStatusCategory.PUBLICATION
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next template statuses
 */
export function getAllowedNextTemplateStatuses(
  currentStatus: ReportTemplateStatus
): ReportTemplateStatus[] {
  return Object.values(ReportTemplateStatus).filter((status) =>
    canTemplateTransitionTo(currentStatus, status)
  );
}

/**
 * Template status groups
 */
export const TEMPLATE_STATUS_GROUPS = {
  /** Initial statuses */
  INITIAL: [
    ReportTemplateStatus.DRAFT,
    ReportTemplateStatus.PENDING_REVIEW,
    ReportTemplateStatus.PENDING_APPROVAL,
  ],
  /** Review statuses */
  REVIEW: [
    ReportTemplateStatus.REVIEW,
    ReportTemplateStatus.IN_REVIEW,
    ReportTemplateStatus.REVIEWED,
  ],
  /** Approval statuses */
  APPROVAL: [
    ReportTemplateStatus.APPROVED,
    ReportTemplateStatus.REJECTED,
    ReportTemplateStatus.PENDING_APPROVAL,
  ],
  /** Published statuses */
  PUBLISHED: [
    ReportTemplateStatus.PUBLISHED,
    ReportTemplateStatus.UNPUBLISHED,
    ReportTemplateStatus.STANDARD,
    ReportTemplateStatus.PREMIUM,
    ReportTemplateStatus.FREE,
  ],
  /** Readiness statuses */
  READINESS: [
    ReportTemplateStatus.READY,
    ReportTemplateStatus.NOT_READY,
    ReportTemplateStatus.TESTING,
    ReportTemplateStatus.STAGING,
    ReportTemplateStatus.PRODUCTION,
  ],
  /** Terminal statuses */
  TERMINAL: [
    ReportTemplateStatus.ARCHIVED,
    ReportTemplateStatus.DELETED,
    ReportTemplateStatus.EXPIRED,
  ],
} as const;
