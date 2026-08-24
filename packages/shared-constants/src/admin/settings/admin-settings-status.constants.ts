/**
 * Admin Settings Status Constants
 * Detailed settings status definitions
 */

export const ADMIN_SETTINGS_STATUS = {
  // Lifecycle statuses
  CREATED: 'created',
  INITIALIZED: 'initialized',
  CONFIGURED: 'configured',
  ACTIVE: 'active',
  INACTIVE: 'inactive',

  // Validation statuses
  VALID: 'valid',
  INVALID: 'invalid',
  PARTIALLY_VALID: 'partially_valid',
  VALIDATION_PENDING: 'validation_pending',
  VALIDATION_FAILED: 'validation_failed',

  // Sync statuses
  SYNCED: 'synced',
  UNSYNCED: 'unsynced',
  SYNCING: 'syncing',
  SYNC_FAILED: 'sync_failed',
  PARTIALLY_SYNCED: 'partially_synced',

  // State statuses
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',

  // Security statuses
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  PROTECTED: 'protected',
  UNPROTECTED: 'unprotected',
  ENCRYPTED: 'encrypted',
  DECRYPTED: 'decrypted',

  // Application statuses
  APPLIED: 'applied',
  PENDING_APPLICATION: 'pending_application',
  APPLICATION_FAILED: 'application_failed',
  PARTIALLY_APPLIED: 'partially_applied',
  ROLLBACK: 'rollback',
  ROLLBACK_FAILED: 'rollback_failed',

  // Version statuses
  CURRENT: 'current',
  OLD_VERSION: 'old_version',
  NEW_VERSION: 'new_version',
  DEPRECATED: 'deprecated',
  OBSOLETE: 'obsolete',

  // Conflict statuses
  CONFLICT: 'conflict',
  RESOLVED: 'resolved',
  MERGED: 'merged',
  OVERRIDDEN: 'overridden',

  // Priority statuses
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  URGENT: 'urgent',

  // Modification statuses
  MODIFIED: 'modified',
  UNMODIFIED: 'unmodified',
  OVERRIDDEN_LOCAL: 'overridden_local',
  OVERRIDDEN_REMOTE: 'overridden_remote',
} as const;

export type AdminSettingsStatusDetail =
  (typeof ADMIN_SETTINGS_STATUS)[keyof typeof ADMIN_SETTINGS_STATUS];

export const ADMIN_SETTINGS_STATUS_LABELS_DETAIL: Record<AdminSettingsStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_SETTINGS_STATUS.CREATED]: 'Created',
  [ADMIN_SETTINGS_STATUS.INITIALIZED]: 'Initialized',
  [ADMIN_SETTINGS_STATUS.CONFIGURED]: 'Configured',
  [ADMIN_SETTINGS_STATUS.ACTIVE]: 'Active',
  [ADMIN_SETTINGS_STATUS.INACTIVE]: 'Inactive',

  // Validation statuses
  [ADMIN_SETTINGS_STATUS.VALID]: 'Valid',
  [ADMIN_SETTINGS_STATUS.INVALID]: 'Invalid',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_VALID]: 'Partially Valid',
  [ADMIN_SETTINGS_STATUS.VALIDATION_PENDING]: 'Validation Pending',
  [ADMIN_SETTINGS_STATUS.VALIDATION_FAILED]: 'Validation Failed',

  // Sync statuses
  [ADMIN_SETTINGS_STATUS.SYNCED]: 'Synced',
  [ADMIN_SETTINGS_STATUS.UNSYNCED]: 'Unsynced',
  [ADMIN_SETTINGS_STATUS.SYNCING]: 'Syncing',
  [ADMIN_SETTINGS_STATUS.SYNC_FAILED]: 'Sync Failed',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_SYNCED]: 'Partially Synced',

  // State statuses
  [ADMIN_SETTINGS_STATUS.DRAFT]: 'Draft',
  [ADMIN_SETTINGS_STATUS.PUBLISHED]: 'Published',
  [ADMIN_SETTINGS_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_SETTINGS_STATUS.DELETED]: 'Deleted',
  [ADMIN_SETTINGS_STATUS.PENDING]: 'Pending',
  [ADMIN_SETTINGS_STATUS.APPROVED]: 'Approved',
  [ADMIN_SETTINGS_STATUS.REJECTED]: 'Rejected',

  // Security statuses
  [ADMIN_SETTINGS_STATUS.LOCKED]: 'Locked',
  [ADMIN_SETTINGS_STATUS.UNLOCKED]: 'Unlocked',
  [ADMIN_SETTINGS_STATUS.PROTECTED]: 'Protected',
  [ADMIN_SETTINGS_STATUS.UNPROTECTED]: 'Unprotected',
  [ADMIN_SETTINGS_STATUS.ENCRYPTED]: 'Encrypted',
  [ADMIN_SETTINGS_STATUS.DECRYPTED]: 'Decrypted',

  // Application statuses
  [ADMIN_SETTINGS_STATUS.APPLIED]: 'Applied',
  [ADMIN_SETTINGS_STATUS.PENDING_APPLICATION]: 'Pending Application',
  [ADMIN_SETTINGS_STATUS.APPLICATION_FAILED]: 'Application Failed',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_APPLIED]: 'Partially Applied',
  [ADMIN_SETTINGS_STATUS.ROLLBACK]: 'Rollback',
  [ADMIN_SETTINGS_STATUS.ROLLBACK_FAILED]: 'Rollback Failed',

  // Version statuses
  [ADMIN_SETTINGS_STATUS.CURRENT]: 'Current',
  [ADMIN_SETTINGS_STATUS.OLD_VERSION]: 'Old Version',
  [ADMIN_SETTINGS_STATUS.NEW_VERSION]: 'New Version',
  [ADMIN_SETTINGS_STATUS.DEPRECATED]: 'Deprecated',
  [ADMIN_SETTINGS_STATUS.OBSOLETE]: 'Obsolete',

  // Conflict statuses
  [ADMIN_SETTINGS_STATUS.CONFLICT]: 'Conflict',
  [ADMIN_SETTINGS_STATUS.RESOLVED]: 'Resolved',
  [ADMIN_SETTINGS_STATUS.MERGED]: 'Merged',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN]: 'Overridden',

  // Priority statuses
  [ADMIN_SETTINGS_STATUS.LOW]: 'Low Priority',
  [ADMIN_SETTINGS_STATUS.MEDIUM]: 'Medium Priority',
  [ADMIN_SETTINGS_STATUS.HIGH]: 'High Priority',
  [ADMIN_SETTINGS_STATUS.CRITICAL]: 'Critical',
  [ADMIN_SETTINGS_STATUS.URGENT]: 'Urgent',

  // Modification statuses
  [ADMIN_SETTINGS_STATUS.MODIFIED]: 'Modified',
  [ADMIN_SETTINGS_STATUS.UNMODIFIED]: 'Unmodified',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN_LOCAL]: 'Overridden (Local)',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN_REMOTE]: 'Overridden (Remote)',
};

export const ADMIN_SETTINGS_STATUS_COLORS_DETAIL: Record<AdminSettingsStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_SETTINGS_STATUS.CREATED]: '#93C5FD',
  [ADMIN_SETTINGS_STATUS.INITIALIZED]: '#60A5FA',
  [ADMIN_SETTINGS_STATUS.CONFIGURED]: '#3B82F6',
  [ADMIN_SETTINGS_STATUS.ACTIVE]: '#10B981',
  [ADMIN_SETTINGS_STATUS.INACTIVE]: '#6B7280',

  // Validation statuses
  [ADMIN_SETTINGS_STATUS.VALID]: '#10B981',
  [ADMIN_SETTINGS_STATUS.INVALID]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_VALID]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.VALIDATION_PENDING]: '#FCD34D',
  [ADMIN_SETTINGS_STATUS.VALIDATION_FAILED]: '#DC2626',

  // Sync statuses
  [ADMIN_SETTINGS_STATUS.SYNCED]: '#10B981',
  [ADMIN_SETTINGS_STATUS.UNSYNCED]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.SYNCING]: '#3B82F6',
  [ADMIN_SETTINGS_STATUS.SYNC_FAILED]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_SYNCED]: '#F59E0B',

  // State statuses
  [ADMIN_SETTINGS_STATUS.DRAFT]: '#9CA3AF',
  [ADMIN_SETTINGS_STATUS.PUBLISHED]: '#34D399',
  [ADMIN_SETTINGS_STATUS.ARCHIVED]: '#6B7280',
  [ADMIN_SETTINGS_STATUS.DELETED]: '#DC2626',
  [ADMIN_SETTINGS_STATUS.PENDING]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.APPROVED]: '#10B981',
  [ADMIN_SETTINGS_STATUS.REJECTED]: '#EF4444',

  // Security statuses
  [ADMIN_SETTINGS_STATUS.LOCKED]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.UNLOCKED]: '#10B981',
  [ADMIN_SETTINGS_STATUS.PROTECTED]: '#3B82F6',
  [ADMIN_SETTINGS_STATUS.UNPROTECTED]: '#9CA3AF',
  [ADMIN_SETTINGS_STATUS.ENCRYPTED]: '#8B5CF6',
  [ADMIN_SETTINGS_STATUS.DECRYPTED]: '#F59E0B',

  // Application statuses
  [ADMIN_SETTINGS_STATUS.APPLIED]: '#34D399',
  [ADMIN_SETTINGS_STATUS.PENDING_APPLICATION]: '#FCD34D',
  [ADMIN_SETTINGS_STATUS.APPLICATION_FAILED]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.PARTIALLY_APPLIED]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.ROLLBACK]: '#F97316',
  [ADMIN_SETTINGS_STATUS.ROLLBACK_FAILED]: '#DC2626',

  // Version statuses
  [ADMIN_SETTINGS_STATUS.CURRENT]: '#10B981',
  [ADMIN_SETTINGS_STATUS.OLD_VERSION]: '#6B7280',
  [ADMIN_SETTINGS_STATUS.NEW_VERSION]: '#3B82F6',
  [ADMIN_SETTINGS_STATUS.DEPRECATED]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.OBSOLETE]: '#9CA3AF',

  // Conflict statuses
  [ADMIN_SETTINGS_STATUS.CONFLICT]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.RESOLVED]: '#10B981',
  [ADMIN_SETTINGS_STATUS.MERGED]: '#8B5CF6',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN]: '#F97316',

  // Priority statuses
  [ADMIN_SETTINGS_STATUS.LOW]: '#6B7280',
  [ADMIN_SETTINGS_STATUS.MEDIUM]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.HIGH]: '#F97316',
  [ADMIN_SETTINGS_STATUS.CRITICAL]: '#EF4444',
  [ADMIN_SETTINGS_STATUS.URGENT]: '#DC2626',

  // Modification statuses
  [ADMIN_SETTINGS_STATUS.MODIFIED]: '#F59E0B',
  [ADMIN_SETTINGS_STATUS.UNMODIFIED]: '#10B981',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN_LOCAL]: '#F97316',
  [ADMIN_SETTINGS_STATUS.OVERRIDDEN_REMOTE]: '#8B5CF6',
};

export const ADMIN_SETTINGS_STATUS_GROUPS = {
  LIFECYCLE: [
    ADMIN_SETTINGS_STATUS.CREATED,
    ADMIN_SETTINGS_STATUS.INITIALIZED,
    ADMIN_SETTINGS_STATUS.CONFIGURED,
    ADMIN_SETTINGS_STATUS.ACTIVE,
    ADMIN_SETTINGS_STATUS.INACTIVE,
  ] as AdminSettingsStatusDetail[],
  VALIDATION: [
    ADMIN_SETTINGS_STATUS.VALID,
    ADMIN_SETTINGS_STATUS.INVALID,
    ADMIN_SETTINGS_STATUS.PARTIALLY_VALID,
    ADMIN_SETTINGS_STATUS.VALIDATION_PENDING,
    ADMIN_SETTINGS_STATUS.VALIDATION_FAILED,
  ] as AdminSettingsStatusDetail[],
  SYNC: [
    ADMIN_SETTINGS_STATUS.SYNCED,
    ADMIN_SETTINGS_STATUS.UNSYNCED,
    ADMIN_SETTINGS_STATUS.SYNCING,
    ADMIN_SETTINGS_STATUS.SYNC_FAILED,
    ADMIN_SETTINGS_STATUS.PARTIALLY_SYNCED,
  ] as AdminSettingsStatusDetail[],
  STATE: [
    ADMIN_SETTINGS_STATUS.DRAFT,
    ADMIN_SETTINGS_STATUS.PUBLISHED,
    ADMIN_SETTINGS_STATUS.ARCHIVED,
    ADMIN_SETTINGS_STATUS.DELETED,
    ADMIN_SETTINGS_STATUS.PENDING,
    ADMIN_SETTINGS_STATUS.APPROVED,
    ADMIN_SETTINGS_STATUS.REJECTED,
  ] as AdminSettingsStatusDetail[],
  SECURITY: [
    ADMIN_SETTINGS_STATUS.LOCKED,
    ADMIN_SETTINGS_STATUS.UNLOCKED,
    ADMIN_SETTINGS_STATUS.PROTECTED,
    ADMIN_SETTINGS_STATUS.UNPROTECTED,
    ADMIN_SETTINGS_STATUS.ENCRYPTED,
    ADMIN_SETTINGS_STATUS.DECRYPTED,
  ] as AdminSettingsStatusDetail[],
  APPLICATION: [
    ADMIN_SETTINGS_STATUS.APPLIED,
    ADMIN_SETTINGS_STATUS.PENDING_APPLICATION,
    ADMIN_SETTINGS_STATUS.APPLICATION_FAILED,
    ADMIN_SETTINGS_STATUS.PARTIALLY_APPLIED,
    ADMIN_SETTINGS_STATUS.ROLLBACK,
    ADMIN_SETTINGS_STATUS.ROLLBACK_FAILED,
  ] as AdminSettingsStatusDetail[],
  VERSION: [
    ADMIN_SETTINGS_STATUS.CURRENT,
    ADMIN_SETTINGS_STATUS.OLD_VERSION,
    ADMIN_SETTINGS_STATUS.NEW_VERSION,
    ADMIN_SETTINGS_STATUS.DEPRECATED,
    ADMIN_SETTINGS_STATUS.OBSOLETE,
  ] as AdminSettingsStatusDetail[],
  CONFLICT: [
    ADMIN_SETTINGS_STATUS.CONFLICT,
    ADMIN_SETTINGS_STATUS.RESOLVED,
    ADMIN_SETTINGS_STATUS.MERGED,
    ADMIN_SETTINGS_STATUS.OVERRIDDEN,
  ] as AdminSettingsStatusDetail[],
  PRIORITY: [
    ADMIN_SETTINGS_STATUS.LOW,
    ADMIN_SETTINGS_STATUS.MEDIUM,
    ADMIN_SETTINGS_STATUS.HIGH,
    ADMIN_SETTINGS_STATUS.CRITICAL,
    ADMIN_SETTINGS_STATUS.URGENT,
  ] as AdminSettingsStatusDetail[],
  MODIFICATION: [
    ADMIN_SETTINGS_STATUS.MODIFIED,
    ADMIN_SETTINGS_STATUS.UNMODIFIED,
    ADMIN_SETTINGS_STATUS.OVERRIDDEN_LOCAL,
    ADMIN_SETTINGS_STATUS.OVERRIDDEN_REMOTE,
  ] as AdminSettingsStatusDetail[],
};

export function getAdminSettingsStatusLabel(status: AdminSettingsStatusDetail): string {
  return ADMIN_SETTINGS_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminSettingsStatusColor(status: AdminSettingsStatusDetail): string {
  return ADMIN_SETTINGS_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isAdminSettingsLifecycleStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.LIFECYCLE.includes(status);
}

export function isAdminSettingsValidationStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.VALIDATION.includes(status);
}

export function isAdminSettingsSyncStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.SYNC.includes(status);
}

export function isAdminSettingsStateStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.STATE.includes(status);
}

export function isAdminSettingsSecurityStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.SECURITY.includes(status);
}

export function isAdminSettingsApplicationStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.APPLICATION.includes(status);
}

export function isAdminSettingsVersionStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.VERSION.includes(status);
}

export function isAdminSettingsConflictStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.CONFLICT.includes(status);
}

export function isAdminSettingsPriorityStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.PRIORITY.includes(status);
}

export function isAdminSettingsModificationStatus(status: AdminSettingsStatusDetail): boolean {
  return ADMIN_SETTINGS_STATUS_GROUPS.MODIFICATION.includes(status);
}

export function isAdminSettingsActiveStatus(status: AdminSettingsStatusDetail): boolean {
  return (
    status === ADMIN_SETTINGS_STATUS.ACTIVE ||
    status === ADMIN_SETTINGS_STATUS.APPLIED ||
    status === ADMIN_SETTINGS_STATUS.PUBLISHED ||
    status === ADMIN_SETTINGS_STATUS.CONFIGURED ||
    status === ADMIN_SETTINGS_STATUS.VALID ||
    status === ADMIN_SETTINGS_STATUS.SYNCED
  );
}

export function isAdminSettingsInactiveStatus(status: AdminSettingsStatusDetail): boolean {
  return (
    status === ADMIN_SETTINGS_STATUS.INACTIVE ||
    status === ADMIN_SETTINGS_STATUS.ARCHIVED ||
    status === ADMIN_SETTINGS_STATUS.DELETED ||
    status === ADMIN_SETTINGS_STATUS.REJECTED ||
    status === ADMIN_SETTINGS_STATUS.INVALID ||
    status === ADMIN_SETTINGS_STATUS.UNSYNCED ||
    status === ADMIN_SETTINGS_STATUS.OBSOLETE
  );
}

export function isAdminSettingsPendingStatus(status: AdminSettingsStatusDetail): boolean {
  return (
    status === ADMIN_SETTINGS_STATUS.PENDING ||
    status === ADMIN_SETTINGS_STATUS.PENDING_APPLICATION ||
    status === ADMIN_SETTINGS_STATUS.VALIDATION_PENDING ||
    status === ADMIN_SETTINGS_STATUS.SYNCING
  );
}

export function isAdminSettingsTerminalStatus(status: AdminSettingsStatusDetail): boolean {
  return (
    isAdminSettingsActiveStatus(status) ||
    status === ADMIN_SETTINGS_STATUS.ARCHIVED ||
    status === ADMIN_SETTINGS_STATUS.DELETED ||
    status === ADMIN_SETTINGS_STATUS.REJECTED ||
    status === ADMIN_SETTINGS_STATUS.RESOLVED ||
    status === ADMIN_SETTINGS_STATUS.MERGED
  );
}

export function isAdminSettingsConflictStatusType(status: AdminSettingsStatusDetail): boolean {
  return (
    status === ADMIN_SETTINGS_STATUS.CONFLICT ||
    status === ADMIN_SETTINGS_STATUS.OVERRIDDEN ||
    status === ADMIN_SETTINGS_STATUS.OVERRIDDEN_LOCAL ||
    status === ADMIN_SETTINGS_STATUS.OVERRIDDEN_REMOTE
  );
}

export function getAdminSettingsStatusPriority(status: AdminSettingsStatusDetail): number {
  const priorityMap: Record<AdminSettingsStatusDetail, number> = {
    [ADMIN_SETTINGS_STATUS.ACTIVE]: 1,
    [ADMIN_SETTINGS_STATUS.APPLIED]: 1,
    [ADMIN_SETTINGS_STATUS.PUBLISHED]: 1,
    [ADMIN_SETTINGS_STATUS.CONFIGURED]: 1,
    [ADMIN_SETTINGS_STATUS.VALID]: 1,
    [ADMIN_SETTINGS_STATUS.SYNCED]: 1,
    [ADMIN_SETTINGS_STATUS.CURRENT]: 1,
    [ADMIN_SETTINGS_STATUS.APPROVED]: 1,
    [ADMIN_SETTINGS_STATUS.UNLOCKED]: 1,
    [ADMIN_SETTINGS_STATUS.UNPROTECTED]: 1,
    [ADMIN_SETTINGS_STATUS.DECRYPTED]: 1,
    [ADMIN_SETTINGS_STATUS.UNMODIFIED]: 1,
    [ADMIN_SETTINGS_STATUS.RESOLVED]: 1,
    [ADMIN_SETTINGS_STATUS.MERGED]: 1,
    [ADMIN_SETTINGS_STATUS.CREATED]: 1,
    [ADMIN_SETTINGS_STATUS.INITIALIZED]: 1,
    [ADMIN_SETTINGS_STATUS.INACTIVE]: 2,
    [ADMIN_SETTINGS_STATUS.ARCHIVED]: 2,
    [ADMIN_SETTINGS_STATUS.DRAFT]: 2,
    [ADMIN_SETTINGS_STATUS.UNSYNCED]: 2,
    [ADMIN_SETTINGS_STATUS.PARTIALLY_VALID]: 2,
    [ADMIN_SETTINGS_STATUS.PENDING]: 3,
    [ADMIN_SETTINGS_STATUS.PENDING_APPLICATION]: 3,
    [ADMIN_SETTINGS_STATUS.VALIDATION_PENDING]: 3,
    [ADMIN_SETTINGS_STATUS.SYNCING]: 3,
    [ADMIN_SETTINGS_STATUS.PARTIALLY_SYNCED]: 3,
    [ADMIN_SETTINGS_STATUS.PARTIALLY_APPLIED]: 3,
    [ADMIN_SETTINGS_STATUS.DEPRECATED]: 3,
    [ADMIN_SETTINGS_STATUS.OLD_VERSION]: 3,
    [ADMIN_SETTINGS_STATUS.NEW_VERSION]: 3,
    [ADMIN_SETTINGS_STATUS.LOW]: 1,
    [ADMIN_SETTINGS_STATUS.MEDIUM]: 2,
    [ADMIN_SETTINGS_STATUS.HIGH]: 3,
    [ADMIN_SETTINGS_STATUS.INVALID]: 4,
    [ADMIN_SETTINGS_STATUS.VALIDATION_FAILED]: 4,
    [ADMIN_SETTINGS_STATUS.SYNC_FAILED]: 4,
    [ADMIN_SETTINGS_STATUS.APPLICATION_FAILED]: 4,
    [ADMIN_SETTINGS_STATUS.REJECTED]: 4,
    [ADMIN_SETTINGS_STATUS.ROLLBACK]: 4,
    [ADMIN_SETTINGS_STATUS.LOCKED]: 5,
    [ADMIN_SETTINGS_STATUS.PROTECTED]: 5,
    [ADMIN_SETTINGS_STATUS.ENCRYPTED]: 5,
    [ADMIN_SETTINGS_STATUS.ROLLBACK_FAILED]: 5,
    [ADMIN_SETTINGS_STATUS.CRITICAL]: 4,
    [ADMIN_SETTINGS_STATUS.URGENT]: 5,
    [ADMIN_SETTINGS_STATUS.CONFLICT]: 6,
    [ADMIN_SETTINGS_STATUS.OVERRIDDEN]: 6,
    [ADMIN_SETTINGS_STATUS.OVERRIDDEN_LOCAL]: 6,
    [ADMIN_SETTINGS_STATUS.OVERRIDDEN_REMOTE]: 6,
    [ADMIN_SETTINGS_STATUS.MODIFIED]: 6,
    [ADMIN_SETTINGS_STATUS.DELETED]: 7,
    [ADMIN_SETTINGS_STATUS.OBSOLETE]: 7,
  };
  return priorityMap[status] || 3;
}

export function getAdminSettingsStatuses(): AdminSettingsStatusDetail[] {
  return Object.values(ADMIN_SETTINGS_STATUS);
}

export function getAdminSettingsLifecycleStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.LIFECYCLE;
}

export function getAdminSettingsValidationStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.VALIDATION;
}

export function getAdminSettingsSyncStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.SYNC;
}

export function getAdminSettingsStateStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.STATE;
}

export function getAdminSettingsSecurityStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.SECURITY;
}

export function getAdminSettingsApplicationStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.APPLICATION;
}

export function getAdminSettingsVersionStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.VERSION;
}

export function getAdminSettingsConflictStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.CONFLICT;
}

export function getAdminSettingsPriorityStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.PRIORITY;
}

export function getAdminSettingsModificationStatuses(): AdminSettingsStatusDetail[] {
  return ADMIN_SETTINGS_STATUS_GROUPS.MODIFICATION;
}
