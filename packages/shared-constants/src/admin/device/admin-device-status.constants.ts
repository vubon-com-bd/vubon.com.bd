/**
 * Admin Device Status Constants
 * Detailed device status definitions for admin device management
 */

export const ADMIN_DEVICE_STATUS = {
  // Active statuses
  ACTIVE: 'active',
  ONLINE: 'online',
  CONNECTED: 'connected',
  OPERATIONAL: 'operational',
  VERIFIED: 'verified',
  TRUSTED: 'trusted',

  // Inactive statuses
  INACTIVE: 'inactive',
  OFFLINE: 'offline',
  DISCONNECTED: 'disconnected',
  DORMANT: 'dormant',
  IDLE: 'idle',

  // Problem statuses
  DEGRADED: 'degraded',
  MALFUNCTIONING: 'malfunctioning',
  FAILING: 'failing',
  ERROR: 'error',
  CRASHED: 'crashed',
  CORRUPTED: 'corrupted',

  // Security statuses
  COMPROMISED: 'compromised',
  HIJACKED: 'hijacked',
  INFECTED: 'infected',
  SUSPICIOUS: 'suspicious',
  BLOCKED: 'blocked',
  LOCKED: 'locked',

  // Administrative statuses
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  PENDING_APPROVAL: 'pending_approval',
  PENDING_VERIFICATION: 'pending_verification',
  UNDER_MAINTENANCE: 'under_maintenance',
  UNDER_REVIEW: 'under_review',

  // End-of-life statuses
  RETIRED: 'retired',
  DECOMMISSIONED: 'decommissioned',
  REPLACED: 'replaced',
  OBSOLETE: 'obsolete',

  // Physical statuses
  LOST: 'lost',
  STOLEN: 'stolen',
  DAMAGED: 'damaged',
  DESTROYED: 'destroyed',

  // Registration statuses
  REGISTERED: 'registered',
  UNREGISTERED: 'unregistered',
  PROVISIONING: 'provisioning',
  PROVISIONED: 'provisioned',
} as const;

export type AdminDeviceStatusDetail =
  (typeof ADMIN_DEVICE_STATUS)[keyof typeof ADMIN_DEVICE_STATUS];

export const ADMIN_DEVICE_STATUS_LABELS_DETAIL: Record<AdminDeviceStatusDetail, string> = {
  // Active statuses
  [ADMIN_DEVICE_STATUS.ACTIVE]: 'Active',
  [ADMIN_DEVICE_STATUS.ONLINE]: 'Online',
  [ADMIN_DEVICE_STATUS.CONNECTED]: 'Connected',
  [ADMIN_DEVICE_STATUS.OPERATIONAL]: 'Operational',
  [ADMIN_DEVICE_STATUS.VERIFIED]: 'Verified',
  [ADMIN_DEVICE_STATUS.TRUSTED]: 'Trusted',

  // Inactive statuses
  [ADMIN_DEVICE_STATUS.INACTIVE]: 'Inactive',
  [ADMIN_DEVICE_STATUS.OFFLINE]: 'Offline',
  [ADMIN_DEVICE_STATUS.DISCONNECTED]: 'Disconnected',
  [ADMIN_DEVICE_STATUS.DORMANT]: 'Dormant',
  [ADMIN_DEVICE_STATUS.IDLE]: 'Idle',

  // Problem statuses
  [ADMIN_DEVICE_STATUS.DEGRADED]: 'Degraded',
  [ADMIN_DEVICE_STATUS.MALFUNCTIONING]: 'Malfunctioning',
  [ADMIN_DEVICE_STATUS.FAILING]: 'Failing',
  [ADMIN_DEVICE_STATUS.ERROR]: 'Error',
  [ADMIN_DEVICE_STATUS.CRASHED]: 'Crashed',
  [ADMIN_DEVICE_STATUS.CORRUPTED]: 'Corrupted',

  // Security statuses
  [ADMIN_DEVICE_STATUS.COMPROMISED]: 'Compromised',
  [ADMIN_DEVICE_STATUS.HIJACKED]: 'Hijacked',
  [ADMIN_DEVICE_STATUS.INFECTED]: 'Infected',
  [ADMIN_DEVICE_STATUS.SUSPICIOUS]: 'Suspicious',
  [ADMIN_DEVICE_STATUS.BLOCKED]: 'Blocked',
  [ADMIN_DEVICE_STATUS.LOCKED]: 'Locked',

  // Administrative statuses
  [ADMIN_DEVICE_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_DEVICE_STATUS.PENDING]: 'Pending',
  [ADMIN_DEVICE_STATUS.PENDING_APPROVAL]: 'Pending Approval',
  [ADMIN_DEVICE_STATUS.PENDING_VERIFICATION]: 'Pending Verification',
  [ADMIN_DEVICE_STATUS.UNDER_MAINTENANCE]: 'Under Maintenance',
  [ADMIN_DEVICE_STATUS.UNDER_REVIEW]: 'Under Review',

  // End-of-life statuses
  [ADMIN_DEVICE_STATUS.RETIRED]: 'Retired',
  [ADMIN_DEVICE_STATUS.DECOMMISSIONED]: 'Decommissioned',
  [ADMIN_DEVICE_STATUS.REPLACED]: 'Replaced',
  [ADMIN_DEVICE_STATUS.OBSOLETE]: 'Obsolete',

  // Physical statuses
  [ADMIN_DEVICE_STATUS.LOST]: 'Lost',
  [ADMIN_DEVICE_STATUS.STOLEN]: 'Stolen',
  [ADMIN_DEVICE_STATUS.DAMAGED]: 'Damaged',
  [ADMIN_DEVICE_STATUS.DESTROYED]: 'Destroyed',

  // Registration statuses
  [ADMIN_DEVICE_STATUS.REGISTERED]: 'Registered',
  [ADMIN_DEVICE_STATUS.UNREGISTERED]: 'Unregistered',
  [ADMIN_DEVICE_STATUS.PROVISIONING]: 'Provisioning',
  [ADMIN_DEVICE_STATUS.PROVISIONED]: 'Provisioned',
};

export const ADMIN_DEVICE_STATUS_COLORS_DETAIL: Record<AdminDeviceStatusDetail, string> = {
  // Active statuses
  [ADMIN_DEVICE_STATUS.ACTIVE]: '#10B981',
  [ADMIN_DEVICE_STATUS.ONLINE]: '#34D399',
  [ADMIN_DEVICE_STATUS.CONNECTED]: '#3B82F6',
  [ADMIN_DEVICE_STATUS.OPERATIONAL]: '#6EE7B7',
  [ADMIN_DEVICE_STATUS.VERIFIED]: '#34D399',
  [ADMIN_DEVICE_STATUS.TRUSTED]: '#10B981',

  // Inactive statuses
  [ADMIN_DEVICE_STATUS.INACTIVE]: '#6B7280',
  [ADMIN_DEVICE_STATUS.OFFLINE]: '#9CA3AF',
  [ADMIN_DEVICE_STATUS.DISCONNECTED]: '#D1D5DB',
  [ADMIN_DEVICE_STATUS.DORMANT]: '#9CA3AF',
  [ADMIN_DEVICE_STATUS.IDLE]: '#D1D5DB',

  // Problem statuses
  [ADMIN_DEVICE_STATUS.DEGRADED]: '#F59E0B',
  [ADMIN_DEVICE_STATUS.MALFUNCTIONING]: '#F97316',
  [ADMIN_DEVICE_STATUS.FAILING]: '#EF4444',
  [ADMIN_DEVICE_STATUS.ERROR]: '#DC2626',
  [ADMIN_DEVICE_STATUS.CRASHED]: '#EF4444',
  [ADMIN_DEVICE_STATUS.CORRUPTED]: '#DC2626',

  // Security statuses
  [ADMIN_DEVICE_STATUS.COMPROMISED]: '#DC2626',
  [ADMIN_DEVICE_STATUS.HIJACKED]: '#EF4444',
  [ADMIN_DEVICE_STATUS.INFECTED]: '#DC2626',
  [ADMIN_DEVICE_STATUS.SUSPICIOUS]: '#F59E0B',
  [ADMIN_DEVICE_STATUS.BLOCKED]: '#EF4444',
  [ADMIN_DEVICE_STATUS.LOCKED]: '#DC2626',

  // Administrative statuses
  [ADMIN_DEVICE_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_DEVICE_STATUS.PENDING]: '#F59E0B',
  [ADMIN_DEVICE_STATUS.PENDING_APPROVAL]: '#FCD34D',
  [ADMIN_DEVICE_STATUS.PENDING_VERIFICATION]: '#FDE68A',
  [ADMIN_DEVICE_STATUS.UNDER_MAINTENANCE]: '#8B5CF6',
  [ADMIN_DEVICE_STATUS.UNDER_REVIEW]: '#6366F1',

  // End-of-life statuses
  [ADMIN_DEVICE_STATUS.RETIRED]: '#6B7280',
  [ADMIN_DEVICE_STATUS.DECOMMISSIONED]: '#9CA3AF',
  [ADMIN_DEVICE_STATUS.REPLACED]: '#6B7280',
  [ADMIN_DEVICE_STATUS.OBSOLETE]: '#9CA3AF',

  // Physical statuses
  [ADMIN_DEVICE_STATUS.LOST]: '#F97316',
  [ADMIN_DEVICE_STATUS.STOLEN]: '#EF4444',
  [ADMIN_DEVICE_STATUS.DAMAGED]: '#F97316',
  [ADMIN_DEVICE_STATUS.DESTROYED]: '#6B7280',

  // Registration statuses
  [ADMIN_DEVICE_STATUS.REGISTERED]: '#3B82F6',
  [ADMIN_DEVICE_STATUS.UNREGISTERED]: '#9CA3AF',
  [ADMIN_DEVICE_STATUS.PROVISIONING]: '#93C5FD',
  [ADMIN_DEVICE_STATUS.PROVISIONED]: '#34D399',
};

export const ADMIN_DEVICE_STATUS_GROUPS = {
  ACTIVE: [
    ADMIN_DEVICE_STATUS.ACTIVE,
    ADMIN_DEVICE_STATUS.ONLINE,
    ADMIN_DEVICE_STATUS.CONNECTED,
    ADMIN_DEVICE_STATUS.OPERATIONAL,
    ADMIN_DEVICE_STATUS.VERIFIED,
    ADMIN_DEVICE_STATUS.TRUSTED,
    ADMIN_DEVICE_STATUS.REGISTERED,
    ADMIN_DEVICE_STATUS.PROVISIONED,
  ] as AdminDeviceStatusDetail[],
  INACTIVE: [
    ADMIN_DEVICE_STATUS.INACTIVE,
    ADMIN_DEVICE_STATUS.OFFLINE,
    ADMIN_DEVICE_STATUS.DISCONNECTED,
    ADMIN_DEVICE_STATUS.DORMANT,
    ADMIN_DEVICE_STATUS.IDLE,
    ADMIN_DEVICE_STATUS.UNREGISTERED,
  ] as AdminDeviceStatusDetail[],
  PROBLEM: [
    ADMIN_DEVICE_STATUS.DEGRADED,
    ADMIN_DEVICE_STATUS.MALFUNCTIONING,
    ADMIN_DEVICE_STATUS.FAILING,
    ADMIN_DEVICE_STATUS.ERROR,
    ADMIN_DEVICE_STATUS.CRASHED,
    ADMIN_DEVICE_STATUS.CORRUPTED,
  ] as AdminDeviceStatusDetail[],
  SECURITY: [
    ADMIN_DEVICE_STATUS.COMPROMISED,
    ADMIN_DEVICE_STATUS.HIJACKED,
    ADMIN_DEVICE_STATUS.INFECTED,
    ADMIN_DEVICE_STATUS.SUSPICIOUS,
    ADMIN_DEVICE_STATUS.BLOCKED,
    ADMIN_DEVICE_STATUS.LOCKED,
  ] as AdminDeviceStatusDetail[],
  ADMINISTRATIVE: [
    ADMIN_DEVICE_STATUS.SUSPENDED,
    ADMIN_DEVICE_STATUS.PENDING,
    ADMIN_DEVICE_STATUS.PENDING_APPROVAL,
    ADMIN_DEVICE_STATUS.PENDING_VERIFICATION,
    ADMIN_DEVICE_STATUS.UNDER_MAINTENANCE,
    ADMIN_DEVICE_STATUS.UNDER_REVIEW,
    ADMIN_DEVICE_STATUS.PROVISIONING,
  ] as AdminDeviceStatusDetail[],
  END_OF_LIFE: [
    ADMIN_DEVICE_STATUS.RETIRED,
    ADMIN_DEVICE_STATUS.DECOMMISSIONED,
    ADMIN_DEVICE_STATUS.REPLACED,
    ADMIN_DEVICE_STATUS.OBSOLETE,
  ] as AdminDeviceStatusDetail[],
  PHYSICAL: [
    ADMIN_DEVICE_STATUS.LOST,
    ADMIN_DEVICE_STATUS.STOLEN,
    ADMIN_DEVICE_STATUS.DAMAGED,
    ADMIN_DEVICE_STATUS.DESTROYED,
  ] as AdminDeviceStatusDetail[],
};

export function getAdminDeviceStatusLabel(status: AdminDeviceStatusDetail): string {
  return ADMIN_DEVICE_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminDeviceStatusColor(status: AdminDeviceStatusDetail): string {
  return ADMIN_DEVICE_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isActiveStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.ACTIVE.includes(status);
}

export function isInactiveStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.INACTIVE.includes(status);
}

export function isProblemStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.PROBLEM.includes(status);
}

export function isSecurityStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.SECURITY.includes(status);
}

export function isAdministrativeStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.ADMINISTRATIVE.includes(status);
}

export function isEndOfLifeStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.END_OF_LIFE.includes(status);
}

export function isPhysicalStatus(status: AdminDeviceStatusDetail): boolean {
  return ADMIN_DEVICE_STATUS_GROUPS.PHYSICAL.includes(status);
}

export function isUsableStatus(status: AdminDeviceStatusDetail): boolean {
  return isActiveStatus(status) || status === ADMIN_DEVICE_STATUS.PENDING_VERIFICATION;
}

export function isAvailableStatus(status: AdminDeviceStatusDetail): boolean {
  return isActiveStatus(status) || isAdministrativeStatus(status);
}

export function isUnavailableStatus(status: AdminDeviceStatusDetail): boolean {
  return (
    isInactiveStatus(status) ||
    isProblemStatus(status) ||
    isEndOfLifeStatus(status) ||
    isPhysicalStatus(status)
  );
}

export function isBlockedStatus(status: AdminDeviceStatusDetail): boolean {
  return (
    status === ADMIN_DEVICE_STATUS.BLOCKED ||
    status === ADMIN_DEVICE_STATUS.LOCKED ||
    status === ADMIN_DEVICE_STATUS.SUSPENDED
  );
}

export function getStatusPriority(status: AdminDeviceStatusDetail): number {
  const priorityMap: Record<AdminDeviceStatusDetail, number> = {
    [ADMIN_DEVICE_STATUS.ACTIVE]: 1,
    [ADMIN_DEVICE_STATUS.ONLINE]: 1,
    [ADMIN_DEVICE_STATUS.CONNECTED]: 1,
    [ADMIN_DEVICE_STATUS.OPERATIONAL]: 1,
    [ADMIN_DEVICE_STATUS.VERIFIED]: 1,
    [ADMIN_DEVICE_STATUS.TRUSTED]: 1,
    [ADMIN_DEVICE_STATUS.REGISTERED]: 1,
    [ADMIN_DEVICE_STATUS.PROVISIONED]: 1,
    [ADMIN_DEVICE_STATUS.INACTIVE]: 2,
    [ADMIN_DEVICE_STATUS.OFFLINE]: 2,
    [ADMIN_DEVICE_STATUS.DISCONNECTED]: 2,
    [ADMIN_DEVICE_STATUS.DORMANT]: 2,
    [ADMIN_DEVICE_STATUS.IDLE]: 2,
    [ADMIN_DEVICE_STATUS.UNREGISTERED]: 2,
    [ADMIN_DEVICE_STATUS.DEGRADED]: 3,
    [ADMIN_DEVICE_STATUS.MALFUNCTIONING]: 4,
    [ADMIN_DEVICE_STATUS.FAILING]: 5,
    [ADMIN_DEVICE_STATUS.ERROR]: 5,
    [ADMIN_DEVICE_STATUS.CRASHED]: 5,
    [ADMIN_DEVICE_STATUS.CORRUPTED]: 5,
    [ADMIN_DEVICE_STATUS.COMPROMISED]: 5,
    [ADMIN_DEVICE_STATUS.HIJACKED]: 5,
    [ADMIN_DEVICE_STATUS.INFECTED]: 5,
    [ADMIN_DEVICE_STATUS.SUSPICIOUS]: 4,
    [ADMIN_DEVICE_STATUS.BLOCKED]: 5,
    [ADMIN_DEVICE_STATUS.LOCKED]: 5,
    [ADMIN_DEVICE_STATUS.SUSPENDED]: 4,
    [ADMIN_DEVICE_STATUS.PENDING]: 2,
    [ADMIN_DEVICE_STATUS.PENDING_APPROVAL]: 2,
    [ADMIN_DEVICE_STATUS.PENDING_VERIFICATION]: 2,
    [ADMIN_DEVICE_STATUS.UNDER_MAINTENANCE]: 3,
    [ADMIN_DEVICE_STATUS.UNDER_REVIEW]: 3,
    [ADMIN_DEVICE_STATUS.PROVISIONING]: 2,
    [ADMIN_DEVICE_STATUS.RETIRED]: 3,
    [ADMIN_DEVICE_STATUS.DECOMMISSIONED]: 3,
    [ADMIN_DEVICE_STATUS.REPLACED]: 3,
    [ADMIN_DEVICE_STATUS.OBSOLETE]: 3,
    [ADMIN_DEVICE_STATUS.LOST]: 4,
    [ADMIN_DEVICE_STATUS.STOLEN]: 5,
    [ADMIN_DEVICE_STATUS.DAMAGED]: 4,
    [ADMIN_DEVICE_STATUS.DESTROYED]: 5,
  };
  return priorityMap[status] || 3;
}

export function getAdminDeviceStatuses(): AdminDeviceStatusDetail[] {
  return Object.values(ADMIN_DEVICE_STATUS);
}

export function getActiveStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.ACTIVE;
}

export function getInactiveStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.INACTIVE;
}

export function getProblemStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.PROBLEM;
}

export function getSecurityStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.SECURITY;
}

export function getAdministrativeStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.ADMINISTRATIVE;
}

export function getEndOfLifeStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.END_OF_LIFE;
}

export function getPhysicalStatuses(): AdminDeviceStatusDetail[] {
  return ADMIN_DEVICE_STATUS_GROUPS.PHYSICAL;
}
