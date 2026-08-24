/**
 * Admin Preferences Status Constants
 * Detailed preferences status definitions
 */

export const ADMIN_PREFERENCES_STATUS = {
  // Lifecycle statuses
  CREATED: 'created',
  INITIALIZED: 'initialized',
  CONFIGURED: 'configured',
  ACTIVE: 'active',
  INACTIVE: 'inactive',

  // State statuses
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',

  // Configuration statuses
  DEFAULT: 'default',
  CUSTOM: 'custom',
  INHERITED: 'inherited',
  OVERRIDDEN: 'overridden',
  MERGED: 'merged',

  // Security statuses
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  PROTECTED: 'protected',
  UNPROTECTED: 'unprotected',

  // Sync statuses
  SYNCED: 'synced',
  UNSYNCED: 'unsynced',
  SYNCING: 'syncing',
  SYNC_FAILED: 'sync_failed',

  // Validation statuses
  VALID: 'valid',
  INVALID: 'invalid',
  PARTIALLY_VALID: 'partially_valid',
  VALIDATION_PENDING: 'validation_pending',
  VALIDATION_FAILED: 'validation_failed',

  // Application statuses
  APPLIED: 'applied',
  PENDING_APPLICATION: 'pending_application',
  APPLICATION_FAILED: 'application_failed',
  PARTIALLY_APPLIED: 'partially_applied',

  // Version statuses
  CURRENT: 'current',
  OLD_VERSION: 'old_version',
  NEW_VERSION: 'new_version',
  DEPRECATED: 'deprecated',
  OBSOLETE: 'obsolete',
} as const;

export type AdminPreferenceStatusDetail =
  (typeof ADMIN_PREFERENCES_STATUS)[keyof typeof ADMIN_PREFERENCES_STATUS];

export const ADMIN_PREFERENCES_STATUS_LABELS_DETAIL: Record<AdminPreferenceStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_PREFERENCES_STATUS.CREATED]: 'Created',
  [ADMIN_PREFERENCES_STATUS.INITIALIZED]: 'Initialized',
  [ADMIN_PREFERENCES_STATUS.CONFIGURED]: 'Configured',
  [ADMIN_PREFERENCES_STATUS.ACTIVE]: 'Active',
  [ADMIN_PREFERENCES_STATUS.INACTIVE]: 'Inactive',

  // State statuses
  [ADMIN_PREFERENCES_STATUS.DRAFT]: 'Draft',
  [ADMIN_PREFERENCES_STATUS.PUBLISHED]: 'Published',
  [ADMIN_PREFERENCES_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_PREFERENCES_STATUS.DELETED]: 'Deleted',
  [ADMIN_PREFERENCES_STATUS.PENDING]: 'Pending',
  [ADMIN_PREFERENCES_STATUS.APPROVED]: 'Approved',
  [ADMIN_PREFERENCES_STATUS.REJECTED]: 'Rejected',

  // Configuration statuses
  [ADMIN_PREFERENCES_STATUS.DEFAULT]: 'Default',
  [ADMIN_PREFERENCES_STATUS.CUSTOM]: 'Custom',
  [ADMIN_PREFERENCES_STATUS.INHERITED]: 'Inherited',
  [ADMIN_PREFERENCES_STATUS.OVERRIDDEN]: 'Overridden',
  [ADMIN_PREFERENCES_STATUS.MERGED]: 'Merged',

  // Security statuses
  [ADMIN_PREFERENCES_STATUS.LOCKED]: 'Locked',
  [ADMIN_PREFERENCES_STATUS.UNLOCKED]: 'Unlocked',
  [ADMIN_PREFERENCES_STATUS.PROTECTED]: 'Protected',
  [ADMIN_PREFERENCES_STATUS.UNPROTECTED]: 'Unprotected',

  // Sync statuses
  [ADMIN_PREFERENCES_STATUS.SYNCED]: 'Synced',
  [ADMIN_PREFERENCES_STATUS.UNSYNCED]: 'Unsynced',
  [ADMIN_PREFERENCES_STATUS.SYNCING]: 'Syncing',
  [ADMIN_PREFERENCES_STATUS.SYNC_FAILED]: 'Sync Failed',

  // Validation statuses
  [ADMIN_PREFERENCES_STATUS.VALID]: 'Valid',
  [ADMIN_PREFERENCES_STATUS.INVALID]: 'Invalid',
  [ADMIN_PREFERENCES_STATUS.PARTIALLY_VALID]: 'Partially Valid',
  [ADMIN_PREFERENCES_STATUS.VALIDATION_PENDING]: 'Validation Pending',
  [ADMIN_PREFERENCES_STATUS.VALIDATION_FAILED]: 'Validation Failed',

  // Application statuses
  [ADMIN_PREFERENCES_STATUS.APPLIED]: 'Applied',
  [ADMIN_PREFERENCES_STATUS.PENDING_APPLICATION]: 'Pending Application',
  [ADMIN_PREFERENCES_STATUS.APPLICATION_FAILED]: 'Application Failed',
  [ADMIN_PREFERENCES_STATUS.PARTIALLY_APPLIED]: 'Partially Applied',

  // Version statuses
  [ADMIN_PREFERENCES_STATUS.CURRENT]: 'Current',
  [ADMIN_PREFERENCES_STATUS.OLD_VERSION]: 'Old Version',
  [ADMIN_PREFERENCES_STATUS.NEW_VERSION]: 'New Version',
  [ADMIN_PREFERENCES_STATUS.DEPRECATED]: 'Deprecated',
  [ADMIN_PREFERENCES_STATUS.OBSOLETE]: 'Obsolete',
};

export const ADMIN_PREFERENCES_STATUS_COLORS_DETAIL: Record<AdminPreferenceStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_PREFERENCES_STATUS.CREATED]: '#93C5FD',
  [ADMIN_PREFERENCES_STATUS.INITIALIZED]: '#60A5FA',
  [ADMIN_PREFERENCES_STATUS.CONFIGURED]: '#3B82F6',
  [ADMIN_PREFERENCES_STATUS.ACTIVE]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.INACTIVE]: '#6B7280',

  // State statuses
  [ADMIN_PREFERENCES_STATUS.DRAFT]: '#9CA3AF',
  [ADMIN_PREFERENCES_STATUS.PUBLISHED]: '#34D399',
  [ADMIN_PREFERENCES_STATUS.ARCHIVED]: '#6B7280',
  [ADMIN_PREFERENCES_STATUS.DELETED]: '#DC2626',
  [ADMIN_PREFERENCES_STATUS.PENDING]: '#F59E0B',
  [ADMIN_PREFERENCES_STATUS.APPROVED]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.REJECTED]: '#EF4444',

  // Configuration statuses
  [ADMIN_PREFERENCES_STATUS.DEFAULT]: '#6B7280',
  [ADMIN_PREFERENCES_STATUS.CUSTOM]: '#8B5CF6',
  [ADMIN_PREFERENCES_STATUS.INHERITED]: '#6366F1',
  [ADMIN_PREFERENCES_STATUS.OVERRIDDEN]: '#F97316',
  [ADMIN_PREFERENCES_STATUS.MERGED]: '#8B5CF6',

  // Security statuses
  [ADMIN_PREFERENCES_STATUS.LOCKED]: '#EF4444',
  [ADMIN_PREFERENCES_STATUS.UNLOCKED]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.PROTECTED]: '#3B82F6',
  [ADMIN_PREFERENCES_STATUS.UNPROTECTED]: '#9CA3AF',

  // Sync statuses
  [ADMIN_PREFERENCES_STATUS.SYNCED]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.UNSYNCED]: '#F59E0B',
  [ADMIN_PREFERENCES_STATUS.SYNCING]: '#3B82F6',
  [ADMIN_PREFERENCES_STATUS.SYNC_FAILED]: '#EF4444',

  // Validation statuses
  [ADMIN_PREFERENCES_STATUS.VALID]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.INVALID]: '#EF4444',
  [ADMIN_PREFERENCES_STATUS.PARTIALLY_VALID]: '#F59E0B',
  [ADMIN_PREFERENCES_STATUS.VALIDATION_PENDING]: '#FCD34D',
  [ADMIN_PREFERENCES_STATUS.VALIDATION_FAILED]: '#DC2626',

  // Application statuses
  [ADMIN_PREFERENCES_STATUS.APPLIED]: '#34D399',
  [ADMIN_PREFERENCES_STATUS.PENDING_APPLICATION]: '#FCD34D',
  [ADMIN_PREFERENCES_STATUS.APPLICATION_FAILED]: '#EF4444',
  [ADMIN_PREFERENCES_STATUS.PARTIALLY_APPLIED]: '#F59E0B',

  // Version statuses
  [ADMIN_PREFERENCES_STATUS.CURRENT]: '#10B981',
  [ADMIN_PREFERENCES_STATUS.OLD_VERSION]: '#6B7280',
  [ADMIN_PREFERENCES_STATUS.NEW_VERSION]: '#3B82F6',
  [ADMIN_PREFERENCES_STATUS.DEPRECATED]: '#F59E0B',
  [ADMIN_PREFERENCES_STATUS.OBSOLETE]: '#9CA3AF',
};

export const ADMIN_PREFERENCES_STATUS_GROUPS = {
  LIFECYCLE: [
    ADMIN_PREFERENCES_STATUS.CREATED,
    ADMIN_PREFERENCES_STATUS.INITIALIZED,
    ADMIN_PREFERENCES_STATUS.CONFIGURED,
    ADMIN_PREFERENCES_STATUS.ACTIVE,
    ADMIN_PREFERENCES_STATUS.INACTIVE,
  ] as AdminPreferenceStatusDetail[],
  STATE: [
    ADMIN_PREFERENCES_STATUS.DRAFT,
    ADMIN_PREFERENCES_STATUS.PUBLISHED,
    ADMIN_PREFERENCES_STATUS.ARCHIVED,
    ADMIN_PREFERENCES_STATUS.DELETED,
    ADMIN_PREFERENCES_STATUS.PENDING,
    ADMIN_PREFERENCES_STATUS.APPROVED,
    ADMIN_PREFERENCES_STATUS.REJECTED,
  ] as AdminPreferenceStatusDetail[],
  CONFIGURATION: [
    ADMIN_PREFERENCES_STATUS.DEFAULT,
    ADMIN_PREFERENCES_STATUS.CUSTOM,
    ADMIN_PREFERENCES_STATUS.INHERITED,
    ADMIN_PREFERENCES_STATUS.OVERRIDDEN,
    ADMIN_PREFERENCES_STATUS.MERGED,
  ] as AdminPreferenceStatusDetail[],
  SECURITY: [
    ADMIN_PREFERENCES_STATUS.LOCKED,
    ADMIN_PREFERENCES_STATUS.UNLOCKED,
    ADMIN_PREFERENCES_STATUS.PROTECTED,
    ADMIN_PREFERENCES_STATUS.UNPROTECTED,
  ] as AdminPreferenceStatusDetail[],
  SYNC: [
    ADMIN_PREFERENCES_STATUS.SYNCED,
    ADMIN_PREFERENCES_STATUS.UNSYNCED,
    ADMIN_PREFERENCES_STATUS.SYNCING,
    ADMIN_PREFERENCES_STATUS.SYNC_FAILED,
  ] as AdminPreferenceStatusDetail[],
  VALIDATION: [
    ADMIN_PREFERENCES_STATUS.VALID,
    ADMIN_PREFERENCES_STATUS.INVALID,
    ADMIN_PREFERENCES_STATUS.PARTIALLY_VALID,
    ADMIN_PREFERENCES_STATUS.VALIDATION_PENDING,
    ADMIN_PREFERENCES_STATUS.VALIDATION_FAILED,
  ] as AdminPreferenceStatusDetail[],
  APPLICATION: [
    ADMIN_PREFERENCES_STATUS.APPLIED,
    ADMIN_PREFERENCES_STATUS.PENDING_APPLICATION,
    ADMIN_PREFERENCES_STATUS.APPLICATION_FAILED,
    ADMIN_PREFERENCES_STATUS.PARTIALLY_APPLIED,
  ] as AdminPreferenceStatusDetail[],
  VERSION: [
    ADMIN_PREFERENCES_STATUS.CURRENT,
    ADMIN_PREFERENCES_STATUS.OLD_VERSION,
    ADMIN_PREFERENCES_STATUS.NEW_VERSION,
    ADMIN_PREFERENCES_STATUS.DEPRECATED,
    ADMIN_PREFERENCES_STATUS.OBSOLETE,
  ] as AdminPreferenceStatusDetail[],
};

export function getAdminPreferenceStatusLabel(status: AdminPreferenceStatusDetail): string {
  return ADMIN_PREFERENCES_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminPreferenceStatusColor(status: AdminPreferenceStatusDetail): string {
  return ADMIN_PREFERENCES_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isAdminPreferenceLifecycleStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.LIFECYCLE.includes(status);
}

export function isAdminPreferenceStateStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.STATE.includes(status);
}

export function isAdminPreferenceConfigurationStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.CONFIGURATION.includes(status);
}

export function isAdminPreferenceSecurityStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.SECURITY.includes(status);
}

export function isAdminPreferenceSyncStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.SYNC.includes(status);
}

export function isAdminPreferenceValidationStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.VALIDATION.includes(status);
}

export function isAdminPreferenceApplicationStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.APPLICATION.includes(status);
}

export function isAdminPreferenceVersionStatus(status: AdminPreferenceStatusDetail): boolean {
  return ADMIN_PREFERENCES_STATUS_GROUPS.VERSION.includes(status);
}

export function isAdminPreferenceActiveStatus(status: AdminPreferenceStatusDetail): boolean {
  return (
    status === ADMIN_PREFERENCES_STATUS.ACTIVE ||
    status === ADMIN_PREFERENCES_STATUS.APPLIED ||
    status === ADMIN_PREFERENCES_STATUS.PUBLISHED ||
    status === ADMIN_PREFERENCES_STATUS.CONFIGURED ||
    status === ADMIN_PREFERENCES_STATUS.VALID ||
    status === ADMIN_PREFERENCES_STATUS.SYNCED ||
    status === ADMIN_PREFERENCES_STATUS.CURRENT ||
    status === ADMIN_PREFERENCES_STATUS.APPROVED ||
    status === ADMIN_PREFERENCES_STATUS.UNLOCKED ||
    status === ADMIN_PREFERENCES_STATUS.UNPROTECTED
  );
}

export function isAdminPreferenceInactiveStatus(status: AdminPreferenceStatusDetail): boolean {
  return (
    status === ADMIN_PREFERENCES_STATUS.INACTIVE ||
    status === ADMIN_PREFERENCES_STATUS.ARCHIVED ||
    status === ADMIN_PREFERENCES_STATUS.DELETED ||
    status === ADMIN_PREFERENCES_STATUS.REJECTED ||
    status === ADMIN_PREFERENCES_STATUS.INVALID ||
    status === ADMIN_PREFERENCES_STATUS.UNSYNCED ||
    status === ADMIN_PREFERENCES_STATUS.OBSOLETE ||
    status === ADMIN_PREFERENCES_STATUS.DEPRECATED
  );
}

export function isAdminPreferencePendingStatus(status: AdminPreferenceStatusDetail): boolean {
  return (
    status === ADMIN_PREFERENCES_STATUS.PENDING ||
    status === ADMIN_PREFERENCES_STATUS.PENDING_APPLICATION ||
    status === ADMIN_PREFERENCES_STATUS.VALIDATION_PENDING ||
    status === ADMIN_PREFERENCES_STATUS.SYNCING ||
    status === ADMIN_PREFERENCES_STATUS.DRAFT
  );
}

export function isAdminPreferenceTerminalStatus(status: AdminPreferenceStatusDetail): boolean {
  return (
    isAdminPreferenceActiveStatus(status) ||
    status === ADMIN_PREFERENCES_STATUS.ARCHIVED ||
    status === ADMIN_PREFERENCES_STATUS.DELETED ||
    status === ADMIN_PREFERENCES_STATUS.REJECTED ||
    status === ADMIN_PREFERENCES_STATUS.MERGED
  );
}

export function isAdminPreferenceConfigurationStatusType(
  status: AdminPreferenceStatusDetail
): boolean {
  return (
    status === ADMIN_PREFERENCES_STATUS.DEFAULT ||
    status === ADMIN_PREFERENCES_STATUS.CUSTOM ||
    status === ADMIN_PREFERENCES_STATUS.INHERITED ||
    status === ADMIN_PREFERENCES_STATUS.OVERRIDDEN
  );
}

export function getAdminPreferenceStatusPriority(status: AdminPreferenceStatusDetail): number {
  const priorityMap: Record<AdminPreferenceStatusDetail, number> = {
    [ADMIN_PREFERENCES_STATUS.ACTIVE]: 1,
    [ADMIN_PREFERENCES_STATUS.APPLIED]: 1,
    [ADMIN_PREFERENCES_STATUS.PUBLISHED]: 1,
    [ADMIN_PREFERENCES_STATUS.CONFIGURED]: 1,
    [ADMIN_PREFERENCES_STATUS.VALID]: 1,
    [ADMIN_PREFERENCES_STATUS.SYNCED]: 1,
    [ADMIN_PREFERENCES_STATUS.CURRENT]: 1,
    [ADMIN_PREFERENCES_STATUS.APPROVED]: 1,
    [ADMIN_PREFERENCES_STATUS.UNLOCKED]: 1,
    [ADMIN_PREFERENCES_STATUS.UNPROTECTED]: 1,
    [ADMIN_PREFERENCES_STATUS.DEFAULT]: 1,
    [ADMIN_PREFERENCES_STATUS.INHERITED]: 1,
    [ADMIN_PREFERENCES_STATUS.MERGED]: 1,
    [ADMIN_PREFERENCES_STATUS.CREATED]: 1,
    [ADMIN_PREFERENCES_STATUS.INITIALIZED]: 1,
    [ADMIN_PREFERENCES_STATUS.INACTIVE]: 2,
    [ADMIN_PREFERENCES_STATUS.ARCHIVED]: 2,
    [ADMIN_PREFERENCES_STATUS.DRAFT]: 2,
    [ADMIN_PREFERENCES_STATUS.UNSYNCED]: 2,
    [ADMIN_PREFERENCES_STATUS.PARTIALLY_VALID]: 2,
    [ADMIN_PREFERENCES_STATUS.CUSTOM]: 2,
    [ADMIN_PREFERENCES_STATUS.OLD_VERSION]: 2,
    [ADMIN_PREFERENCES_STATUS.NEW_VERSION]: 2,
    [ADMIN_PREFERENCES_STATUS.PENDING]: 3,
    [ADMIN_PREFERENCES_STATUS.PENDING_APPLICATION]: 3,
    [ADMIN_PREFERENCES_STATUS.VALIDATION_PENDING]: 3,
    [ADMIN_PREFERENCES_STATUS.SYNCING]: 3,
    [ADMIN_PREFERENCES_STATUS.PARTIALLY_APPLIED]: 3,
    [ADMIN_PREFERENCES_STATUS.OVERRIDDEN]: 3,
    [ADMIN_PREFERENCES_STATUS.DEPRECATED]: 3,
    [ADMIN_PREFERENCES_STATUS.INVALID]: 4,
    [ADMIN_PREFERENCES_STATUS.VALIDATION_FAILED]: 4,
    [ADMIN_PREFERENCES_STATUS.SYNC_FAILED]: 4,
    [ADMIN_PREFERENCES_STATUS.APPLICATION_FAILED]: 4,
    [ADMIN_PREFERENCES_STATUS.REJECTED]: 4,
    [ADMIN_PREFERENCES_STATUS.LOCKED]: 5,
    [ADMIN_PREFERENCES_STATUS.PROTECTED]: 5,
    [ADMIN_PREFERENCES_STATUS.DELETED]: 6,
    [ADMIN_PREFERENCES_STATUS.OBSOLETE]: 6,
  };
  return priorityMap[status] || 3;
}

export function getAdminPreferenceStatuses(): AdminPreferenceStatusDetail[] {
  return Object.values(ADMIN_PREFERENCES_STATUS);
}

export function getAdminPreferenceLifecycleStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.LIFECYCLE;
}

export function getAdminPreferenceStateStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.STATE;
}

export function getAdminPreferenceConfigurationStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.CONFIGURATION;
}

export function getAdminPreferenceSecurityStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.SECURITY;
}

export function getAdminPreferenceSyncStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.SYNC;
}

export function getAdminPreferenceValidationStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.VALIDATION;
}

export function getAdminPreferenceApplicationStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.APPLICATION;
}

export function getAdminPreferenceVersionStatuses(): AdminPreferenceStatusDetail[] {
  return ADMIN_PREFERENCES_STATUS_GROUPS.VERSION;
}
