/**
 * Authentication Device Status Constants
 * Status values for devices
 */

export const AUTH_DEVICE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
  REMOVED: 'removed',

  REGISTERED: 'registered',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  REGISTRATION_PENDING: 'registration_pending',
  REGISTRATION_FAILED: 'registration_failed',

  TRUSTED: 'trusted',
  UNTRUSTED: 'untrusted',
  SUSPICIOUS: 'suspicious',
  COMPROMISED: 'compromised',

  SESSION_ACTIVE: 'session_active',
  SESSION_EXPIRED: 'session_expired',
  SESSION_TERMINATED: 'session_terminated',

  SECURE: 'secure',
  UNSECURE: 'unsecure',
  INVESTIGATING: 'investigating',
  QUARANTINED: 'quarantined',
} as const;

export type AuthDeviceStatus = (typeof AUTH_DEVICE_STATUS)[keyof typeof AUTH_DEVICE_STATUS];

export const AUTHDEVICE_ACTIVE_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.ACTIVE,
  AUTH_DEVICE_STATUS.VERIFIED,
  AUTH_DEVICE_STATUS.TRUSTED,
  AUTH_DEVICE_STATUS.SECURE,
  AUTH_DEVICE_STATUS.SESSION_ACTIVE,
  AUTH_DEVICE_STATUS.REGISTERED,
];

export const AUTHDEVICE_INACTIVE_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.INACTIVE,
  AUTH_DEVICE_STATUS.EXPIRED,
  AUTH_DEVICE_STATUS.REVOKED,
  AUTH_DEVICE_STATUS.REMOVED,
  AUTH_DEVICE_STATUS.SESSION_EXPIRED,
  AUTH_DEVICE_STATUS.SESSION_TERMINATED,
];

export const AUTHDEVICE_PENDING_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.PENDING,
  AUTH_DEVICE_STATUS.REGISTRATION_PENDING,
  AUTH_DEVICE_STATUS.UNVERIFIED,
  AUTH_DEVICE_STATUS.INVESTIGATING,
];

export const AUTHDEVICE_BLOCKED_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.BLOCKED,
  AUTH_DEVICE_STATUS.QUARANTINED,
];

export const AUTHDEVICE_SECURITY_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.SUSPICIOUS,
  AUTH_DEVICE_STATUS.COMPROMISED,
  AUTH_DEVICE_STATUS.UNSECURE,
  AUTH_DEVICE_STATUS.INVESTIGATING,
  AUTH_DEVICE_STATUS.QUARANTINED,
];

export const AUTHDEVICE_TRUSTED_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.TRUSTED,
  AUTH_DEVICE_STATUS.SECURE,
  AUTH_DEVICE_STATUS.VERIFIED,
];

export const AUTHDEVICE_UNTRUSTED_STATUSES: AuthDeviceStatus[] = [
  AUTH_DEVICE_STATUS.UNTRUSTED,
  AUTH_DEVICE_STATUS.SUSPICIOUS,
  AUTH_DEVICE_STATUS.COMPROMISED,
  AUTH_DEVICE_STATUS.UNSECURE,
];

export function isAuthdeviceActive(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_ACTIVE_STATUSES.includes(status);
}

export function isAuthdeviceInactive(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_INACTIVE_STATUSES.includes(status);
}

export function isAuthdevicePending(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_PENDING_STATUSES.includes(status);
}

export function isAuthdeviceBlocked(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_BLOCKED_STATUSES.includes(status);
}

export function isAuthdeviceSecurityIssue(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_SECURITY_STATUSES.includes(status);
}

export function isAuthdeviceTrusted(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_TRUSTED_STATUSES.includes(status);
}

export function isAuthdeviceUntrusted(status: AuthDeviceStatus): boolean {
  return AUTHDEVICE_UNTRUSTED_STATUSES.includes(status);
}

export function getAuthdeviceStatusLabel(status: AuthDeviceStatus): string {
  const labels: Record<AuthDeviceStatus, string> = {
    [AUTH_DEVICE_STATUS.ACTIVE]: 'Active',
    [AUTH_DEVICE_STATUS.INACTIVE]: 'Inactive',
    [AUTH_DEVICE_STATUS.PENDING]: 'Pending',
    [AUTH_DEVICE_STATUS.BLOCKED]: 'Blocked',
    [AUTH_DEVICE_STATUS.REVOKED]: 'Revoked',
    [AUTH_DEVICE_STATUS.EXPIRED]: 'Expired',
    [AUTH_DEVICE_STATUS.REMOVED]: 'Removed',
    [AUTH_DEVICE_STATUS.REGISTERED]: 'Registered',
    [AUTH_DEVICE_STATUS.VERIFIED]: 'Verified',
    [AUTH_DEVICE_STATUS.UNVERIFIED]: 'Unverified',
    [AUTH_DEVICE_STATUS.REGISTRATION_PENDING]: 'Registration Pending',
    [AUTH_DEVICE_STATUS.REGISTRATION_FAILED]: 'Registration Failed',
    [AUTH_DEVICE_STATUS.TRUSTED]: 'Trusted',
    [AUTH_DEVICE_STATUS.UNTRUSTED]: 'Untrusted',
    [AUTH_DEVICE_STATUS.SUSPICIOUS]: 'Suspicious',
    [AUTH_DEVICE_STATUS.COMPROMISED]: 'Compromised',
    [AUTH_DEVICE_STATUS.SESSION_ACTIVE]: 'Session Active',
    [AUTH_DEVICE_STATUS.SESSION_EXPIRED]: 'Session Expired',
    [AUTH_DEVICE_STATUS.SESSION_TERMINATED]: 'Session Terminated',
    [AUTH_DEVICE_STATUS.SECURE]: 'Secure',
    [AUTH_DEVICE_STATUS.UNSECURE]: 'Unsecure',
    [AUTH_DEVICE_STATUS.INVESTIGATING]: 'Investigating',
    [AUTH_DEVICE_STATUS.QUARANTINED]: 'Quarantined',
  };

  return labels[status] || 'Unknown Status';
}

export function getAuthdeviceStatusColor(status: AuthDeviceStatus): string {
  const colors: Record<AuthDeviceStatus, string> = {
    [AUTH_DEVICE_STATUS.ACTIVE]: '#10B981',
    [AUTH_DEVICE_STATUS.INACTIVE]: '#6B7280',
    [AUTH_DEVICE_STATUS.PENDING]: '#F59E0B',
    [AUTH_DEVICE_STATUS.BLOCKED]: '#DC2626',
    [AUTH_DEVICE_STATUS.REVOKED]: '#6B7280',
    [AUTH_DEVICE_STATUS.EXPIRED]: '#6B7280',
    [AUTH_DEVICE_STATUS.REMOVED]: '#6B7280',
    [AUTH_DEVICE_STATUS.REGISTERED]: '#3B82F6',
    [AUTH_DEVICE_STATUS.VERIFIED]: '#10B981',
    [AUTH_DEVICE_STATUS.UNVERIFIED]: '#F59E0B',
    [AUTH_DEVICE_STATUS.REGISTRATION_PENDING]: '#F59E0B',
    [AUTH_DEVICE_STATUS.REGISTRATION_FAILED]: '#EF4444',
    [AUTH_DEVICE_STATUS.TRUSTED]: '#10B981',
    [AUTH_DEVICE_STATUS.UNTRUSTED]: '#EF4444',
    [AUTH_DEVICE_STATUS.SUSPICIOUS]: '#F59E0B',
    [AUTH_DEVICE_STATUS.COMPROMISED]: '#DC2626',
    [AUTH_DEVICE_STATUS.SESSION_ACTIVE]: '#10B981',
    [AUTH_DEVICE_STATUS.SESSION_EXPIRED]: '#6B7280',
    [AUTH_DEVICE_STATUS.SESSION_TERMINATED]: '#6B7280',
    [AUTH_DEVICE_STATUS.SECURE]: '#10B981',
    [AUTH_DEVICE_STATUS.UNSECURE]: '#EF4444',
    [AUTH_DEVICE_STATUS.INVESTIGATING]: '#F59E0B',
    [AUTH_DEVICE_STATUS.QUARANTINED]: '#DC2626',
  };

  return colors[status] || '#6B7280';
}

export function getAuthdeviceStatusPriority(status: AuthDeviceStatus): number {
  const priorities: Record<AuthDeviceStatus, number> = {
    [AUTH_DEVICE_STATUS.ACTIVE]: 10,
    [AUTH_DEVICE_STATUS.INACTIVE]: 3,
    [AUTH_DEVICE_STATUS.PENDING]: 5,
    [AUTH_DEVICE_STATUS.BLOCKED]: 1,
    [AUTH_DEVICE_STATUS.REVOKED]: 2,
    [AUTH_DEVICE_STATUS.EXPIRED]: 3,
    [AUTH_DEVICE_STATUS.REMOVED]: 2,
    [AUTH_DEVICE_STATUS.REGISTERED]: 7,
    [AUTH_DEVICE_STATUS.VERIFIED]: 9,
    [AUTH_DEVICE_STATUS.UNVERIFIED]: 4,
    [AUTH_DEVICE_STATUS.REGISTRATION_PENDING]: 5,
    [AUTH_DEVICE_STATUS.REGISTRATION_FAILED]: 3,
    [AUTH_DEVICE_STATUS.TRUSTED]: 10,
    [AUTH_DEVICE_STATUS.UNTRUSTED]: 1,
    [AUTH_DEVICE_STATUS.SUSPICIOUS]: 4,
    [AUTH_DEVICE_STATUS.COMPROMISED]: 1,
    [AUTH_DEVICE_STATUS.SESSION_ACTIVE]: 8,
    [AUTH_DEVICE_STATUS.SESSION_EXPIRED]: 3,
    [AUTH_DEVICE_STATUS.SESSION_TERMINATED]: 3,
    [AUTH_DEVICE_STATUS.SECURE]: 10,
    [AUTH_DEVICE_STATUS.UNSECURE]: 1,
    [AUTH_DEVICE_STATUS.INVESTIGATING]: 4,
    [AUTH_DEVICE_STATUS.QUARANTINED]: 1,
  };

  return priorities[status] || 5;
}

export function getAuthdeviceStatusBadgeType(
  status: AuthDeviceStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const types: Record<AuthDeviceStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    [AUTH_DEVICE_STATUS.ACTIVE]: 'success',
    [AUTH_DEVICE_STATUS.INACTIVE]: 'default',
    [AUTH_DEVICE_STATUS.PENDING]: 'warning',
    [AUTH_DEVICE_STATUS.BLOCKED]: 'error',
    [AUTH_DEVICE_STATUS.REVOKED]: 'default',
    [AUTH_DEVICE_STATUS.EXPIRED]: 'default',
    [AUTH_DEVICE_STATUS.REMOVED]: 'default',
    [AUTH_DEVICE_STATUS.REGISTERED]: 'info',
    [AUTH_DEVICE_STATUS.VERIFIED]: 'success',
    [AUTH_DEVICE_STATUS.UNVERIFIED]: 'warning',
    [AUTH_DEVICE_STATUS.REGISTRATION_PENDING]: 'warning',
    [AUTH_DEVICE_STATUS.REGISTRATION_FAILED]: 'error',
    [AUTH_DEVICE_STATUS.TRUSTED]: 'success',
    [AUTH_DEVICE_STATUS.UNTRUSTED]: 'error',
    [AUTH_DEVICE_STATUS.SUSPICIOUS]: 'warning',
    [AUTH_DEVICE_STATUS.COMPROMISED]: 'error',
    [AUTH_DEVICE_STATUS.SESSION_ACTIVE]: 'success',
    [AUTH_DEVICE_STATUS.SESSION_EXPIRED]: 'default',
    [AUTH_DEVICE_STATUS.SESSION_TERMINATED]: 'default',
    [AUTH_DEVICE_STATUS.SECURE]: 'success',
    [AUTH_DEVICE_STATUS.UNSECURE]: 'error',
    [AUTH_DEVICE_STATUS.INVESTIGATING]: 'info',
    [AUTH_DEVICE_STATUS.QUARANTINED]: 'error',
  };

  return types[status] || 'default';
}
