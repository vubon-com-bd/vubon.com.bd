/**
 * Admin Status Constants
 * Admin account status definitions
 */

export const ADMIN_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  DELETED: 'deleted',
  LOCKED: 'locked',
  EXPIRED: 'expired',
  DEACTIVATED: 'deactivated',
  ARCHIVED: 'archived',
} as const;

export type AdminStatusType = (typeof ADMIN_STATUS)[keyof typeof ADMIN_STATUS];

export const ADMIN_STATUS_LABELS = {
  [ADMIN_STATUS.ACTIVE]: 'Active',
  [ADMIN_STATUS.INACTIVE]: 'Inactive',
  [ADMIN_STATUS.PENDING]: 'Pending Approval',
  [ADMIN_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_STATUS.BANNED]: 'Banned',
  [ADMIN_STATUS.DELETED]: 'Deleted',
  [ADMIN_STATUS.LOCKED]: 'Locked',
  [ADMIN_STATUS.EXPIRED]: 'Expired',
  [ADMIN_STATUS.DEACTIVATED]: 'Deactivated',
  [ADMIN_STATUS.ARCHIVED]: 'Archived',
} as const;

export type AdminStatusLabel = (typeof ADMIN_STATUS_LABELS)[keyof typeof ADMIN_STATUS_LABELS];

export const ADMIN_STATUS_COLORS = {
  [ADMIN_STATUS.ACTIVE]: '#10B981',
  [ADMIN_STATUS.INACTIVE]: '#6B7280',
  [ADMIN_STATUS.PENDING]: '#F59E0B',
  [ADMIN_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_STATUS.BANNED]: '#EF4444',
  [ADMIN_STATUS.DELETED]: '#6B7280',
  [ADMIN_STATUS.LOCKED]: '#DC2626',
  [ADMIN_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_STATUS.DEACTIVATED]: '#8B5CF6',
  [ADMIN_STATUS.ARCHIVED]: '#9CA3AF',
} as const;

export type AdminStatusColor = (typeof ADMIN_STATUS_COLORS)[keyof typeof ADMIN_STATUS_COLORS];

export const ADMIN_STATUS_ICONS = {
  [ADMIN_STATUS.ACTIVE]: 'check-circle',
  [ADMIN_STATUS.INACTIVE]: 'minus-circle',
  [ADMIN_STATUS.PENDING]: 'clock',
  [ADMIN_STATUS.SUSPENDED]: 'pause-circle',
  [ADMIN_STATUS.BANNED]: 'ban',
  [ADMIN_STATUS.DELETED]: 'trash',
  [ADMIN_STATUS.LOCKED]: 'lock',
  [ADMIN_STATUS.EXPIRED]: 'clock',
  [ADMIN_STATUS.DEACTIVATED]: 'x-circle',
  [ADMIN_STATUS.ARCHIVED]: 'archive',
} as const;

export type AdminStatusIcon = (typeof ADMIN_STATUS_ICONS)[keyof typeof ADMIN_STATUS_ICONS];

export const ADMIN_STATUS_ORDER = {
  [ADMIN_STATUS.ACTIVE]: 1,
  [ADMIN_STATUS.PENDING]: 2,
  [ADMIN_STATUS.INACTIVE]: 3,
  [ADMIN_STATUS.SUSPENDED]: 4,
  [ADMIN_STATUS.LOCKED]: 5,
  [ADMIN_STATUS.BANNED]: 6,
  [ADMIN_STATUS.DEACTIVATED]: 7,
  [ADMIN_STATUS.EXPIRED]: 8,
  [ADMIN_STATUS.ARCHIVED]: 9,
  [ADMIN_STATUS.DELETED]: 10,
} as const;

export type AdminStatusOrder = (typeof ADMIN_STATUS_ORDER)[keyof typeof ADMIN_STATUS_ORDER];

export const ACTIVE_ADMIN_STATUSES: AdminStatusType[] = [ADMIN_STATUS.ACTIVE, ADMIN_STATUS.PENDING];

export const INACTIVE_ADMIN_STATUSES: AdminStatusType[] = [
  ADMIN_STATUS.INACTIVE,
  ADMIN_STATUS.SUSPENDED,
  ADMIN_STATUS.BANNED,
  ADMIN_STATUS.LOCKED,
  ADMIN_STATUS.DEACTIVATED,
];

export const ARCHIVED_ADMIN_STATUSES: AdminStatusType[] = [
  ADMIN_STATUS.ARCHIVED,
  ADMIN_STATUS.DELETED,
  ADMIN_STATUS.EXPIRED,
];

export function getAdminStatusLabel(status: AdminStatusType): string {
  return ADMIN_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminStatusColor(status: AdminStatusType): string {
  return ADMIN_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminStatusIcon(status: AdminStatusType): string {
  return ADMIN_STATUS_ICONS[status] || 'circle';
}

export function getAdminStatusOrder(status: AdminStatusType): number {
  return ADMIN_STATUS_ORDER[status] || 0;
}

export function isActiveAdminStatus(status: AdminStatusType): boolean {
  return ACTIVE_ADMIN_STATUSES.includes(status);
}

export function isInactiveAdminStatus(status: AdminStatusType): boolean {
  return INACTIVE_ADMIN_STATUSES.includes(status);
}

export function isArchivedAdminStatus(status: AdminStatusType): boolean {
  return ARCHIVED_ADMIN_STATUSES.includes(status);
}

export function canAdminLogin(status: AdminStatusType): boolean {
  return status === ADMIN_STATUS.ACTIVE;
}

export function canAdminAccessDashboard(status: AdminStatusType): boolean {
  return status === ADMIN_STATUS.ACTIVE || status === ADMIN_STATUS.PENDING;
}

export function isAdminBannedOrSuspended(status: AdminStatusType): boolean {
  return status === ADMIN_STATUS.BANNED || status === ADMIN_STATUS.SUSPENDED;
}

export function getAdminStatusByLabel(label: string): AdminStatusType | undefined {
  const entry = Object.entries(ADMIN_STATUS_LABELS).find(([, value]) => value === label);
  return entry ? (entry[0] as AdminStatusType) : undefined;
}

export function getAllAdminStatuses(): AdminStatusType[] {
  return Object.values(ADMIN_STATUS);
}
