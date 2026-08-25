/**
 * Authentication Account Lock Constants
 * Account lock management configuration
 */

import { AUTH_ACCOUNT_LOCK_STATUS } from './auth-account-lock-status.constants';

const ACCOUNT_LOCK_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  MAX_FAILED_ATTEMPTS: 3,
  LOCK_DURATION_MINUTES: 30,
  LOCK_DURATION_HOURS: 1,
  LOCK_DURATION_DAYS: 1,
  PERMANENT_LOCK_AFTER_DAYS: 7,
  RESET_ATTEMPTS_AFTER_MINUTES: 15,
  NOTIFY_ON_LOCK: true,
  NOTIFY_ON_UNLOCK: true,
  NOTIFY_ON_ATTEMPT: true,
  REQUIRE_ADMIN_UNLOCK: false,
  AUTO_UNLOCK_ENABLED: true,
} as const;

const ACCOUNT_LOCK_REASONS = {
  MAX_LOGIN_ATTEMPTS: 'max_login_attempts',
  MAX_FAILED_ATTEMPTS: 'max_failed_attempts',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  SECURITY_VIOLATION: 'security_violation',
  ADMIN_ACTION: 'admin_action',
  SYSTEM_ACTION: 'system_action',
  POLICY_VIOLATION: 'policy_violation',
  IP_BLOCKED: 'ip_blocked',
  DEVICE_BLOCKED: 'device_blocked',
  GEO_BLOCKED: 'geo_blocked',
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
  EXPIRED: 'expired',
  COMPROMISED: 'compromised',
  INACTIVITY: 'inactivity',
} as const;

const ACCOUNT_LOCK_TYPES = {
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
  ADMIN: 'admin',
  SYSTEM: 'system',
  AUTOMATIC: 'automatic',
  MANUAL: 'manual',
  IP: 'ip',
  DEVICE: 'device',
  GEO: 'geo',
  SUSPICIOUS: 'suspicious',
} as const;

const ACCOUNT_LOCK_EVENTS = {
  LOCKED: 'account:locked',
  UNLOCKED: 'account:unlocked',
  ATTEMPT: 'account:attempt',
  FAILED_ATTEMPT: 'account:failed_attempt',
  LOCK_ESCALATED: 'account:lock_escalated',
  LOCK_DEESCALATED: 'account:lock_deescalated',
  LOCK_EXPIRED: 'account:lock_expired',
  LOCK_EXTENDED: 'account:lock_extended',
  LOCK_REMOVED: 'account:lock_removed',
  NOTIFIED: 'account:lock_notified',
} as const;

const ACCOUNT_LOCK_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
  MAXIMUM: 5,
} as const;

const ACCOUNT_LOCK_DEFAULTS = {
  STATUS: AUTH_ACCOUNT_LOCK_STATUS.UNLOCKED,
  TYPE: ACCOUNT_LOCK_TYPES.TEMPORARY,
  LEVEL: ACCOUNT_LOCK_LEVELS.NONE,
  DURATION_MINUTES: 30,
  MAX_ATTEMPTS: 5,
} as const;

export const AUTH_ACCOUNT_LOCK = {
  CONFIG: ACCOUNT_LOCK_CONFIG,
  REASONS: ACCOUNT_LOCK_REASONS,
  TYPES: ACCOUNT_LOCK_TYPES,
  EVENTS: ACCOUNT_LOCK_EVENTS,
  LEVELS: ACCOUNT_LOCK_LEVELS,
  DEFAULTS: ACCOUNT_LOCK_DEFAULTS,
} as const;

export type AuthAccountLockConfig = typeof ACCOUNT_LOCK_CONFIG;
export type AuthAccountLockReason =
  (typeof ACCOUNT_LOCK_REASONS)[keyof typeof ACCOUNT_LOCK_REASONS];
export type AuthAccountLockType = (typeof ACCOUNT_LOCK_TYPES)[keyof typeof ACCOUNT_LOCK_TYPES];
export type AuthAccountLockEvent = (typeof ACCOUNT_LOCK_EVENTS)[keyof typeof ACCOUNT_LOCK_EVENTS];
export type AuthAccountLockLevel = (typeof ACCOUNT_LOCK_LEVELS)[keyof typeof ACCOUNT_LOCK_LEVELS];
export type AuthAccountLockDefaults = typeof ACCOUNT_LOCK_DEFAULTS;

export const AUTHLOCK_REASONS_LIST: AuthAccountLockReason[] = [
  ACCOUNT_LOCK_REASONS.MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_REASONS.MAX_FAILED_ATTEMPTS,
  ACCOUNT_LOCK_REASONS.SUSPICIOUS_ACTIVITY,
  ACCOUNT_LOCK_REASONS.SECURITY_VIOLATION,
  ACCOUNT_LOCK_REASONS.ADMIN_ACTION,
  ACCOUNT_LOCK_REASONS.SYSTEM_ACTION,
  ACCOUNT_LOCK_REASONS.POLICY_VIOLATION,
  ACCOUNT_LOCK_REASONS.IP_BLOCKED,
  ACCOUNT_LOCK_REASONS.DEVICE_BLOCKED,
  ACCOUNT_LOCK_REASONS.GEO_BLOCKED,
  ACCOUNT_LOCK_REASONS.TEMPORARY,
  ACCOUNT_LOCK_REASONS.PERMANENT,
  ACCOUNT_LOCK_REASONS.EXPIRED,
  ACCOUNT_LOCK_REASONS.COMPROMISED,
  ACCOUNT_LOCK_REASONS.INACTIVITY,
];

export const AUTHLOCK_TYPES_LIST: AuthAccountLockType[] = [
  ACCOUNT_LOCK_TYPES.TEMPORARY,
  ACCOUNT_LOCK_TYPES.PERMANENT,
  ACCOUNT_LOCK_TYPES.ADMIN,
  ACCOUNT_LOCK_TYPES.SYSTEM,
  ACCOUNT_LOCK_TYPES.AUTOMATIC,
  ACCOUNT_LOCK_TYPES.MANUAL,
  ACCOUNT_LOCK_TYPES.IP,
  ACCOUNT_LOCK_TYPES.DEVICE,
  ACCOUNT_LOCK_TYPES.GEO,
  ACCOUNT_LOCK_TYPES.SUSPICIOUS,
];

export const AUTHLOCK_TEMPORARY_TYPES: AuthAccountLockType[] = [
  ACCOUNT_LOCK_TYPES.TEMPORARY,
  ACCOUNT_LOCK_TYPES.AUTOMATIC,
  ACCOUNT_LOCK_TYPES.IP,
  ACCOUNT_LOCK_TYPES.DEVICE,
  ACCOUNT_LOCK_TYPES.GEO,
  ACCOUNT_LOCK_TYPES.SUSPICIOUS,
];

export const AUTHLOCK_PERMANENT_TYPES: AuthAccountLockType[] = [
  ACCOUNT_LOCK_TYPES.PERMANENT,
  ACCOUNT_LOCK_TYPES.ADMIN,
  ACCOUNT_LOCK_TYPES.SYSTEM,
  ACCOUNT_LOCK_TYPES.MANUAL,
];

export const AUTHLOCK_ADMIN_TYPES: AuthAccountLockType[] = [
  ACCOUNT_LOCK_TYPES.ADMIN,
  ACCOUNT_LOCK_TYPES.MANUAL,
];

export const AUTHLOCK_SYSTEM_TYPES: AuthAccountLockType[] = [
  ACCOUNT_LOCK_TYPES.SYSTEM,
  ACCOUNT_LOCK_TYPES.AUTOMATIC,
];

export const AUTHLOCK_SECURITY_REASONS: AuthAccountLockReason[] = [
  ACCOUNT_LOCK_REASONS.SECURITY_VIOLATION,
  ACCOUNT_LOCK_REASONS.COMPROMISED,
  ACCOUNT_LOCK_REASONS.SUSPICIOUS_ACTIVITY,
  ACCOUNT_LOCK_REASONS.IP_BLOCKED,
  ACCOUNT_LOCK_REASONS.DEVICE_BLOCKED,
  ACCOUNT_LOCK_REASONS.GEO_BLOCKED,
];

export const AUTHLOCK_POLICY_REASONS: AuthAccountLockReason[] = [
  ACCOUNT_LOCK_REASONS.MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_REASONS.MAX_FAILED_ATTEMPTS,
  ACCOUNT_LOCK_REASONS.POLICY_VIOLATION,
  ACCOUNT_LOCK_REASONS.INACTIVITY,
];

export function isAuthlockReason(reason: string): reason is AuthAccountLockReason {
  return AUTHLOCK_REASONS_LIST.includes(reason as AuthAccountLockReason);
}

export function isAuthlockType(type: string): type is AuthAccountLockType {
  return AUTHLOCK_TYPES_LIST.includes(type as AuthAccountLockType);
}

export function isAuthlockTemporary(type: AuthAccountLockType): boolean {
  return AUTHLOCK_TEMPORARY_TYPES.includes(type);
}

export function isAuthlockPermanent(type: AuthAccountLockType): boolean {
  return AUTHLOCK_PERMANENT_TYPES.includes(type);
}

export function isAuthlockAdmin(type: AuthAccountLockType): boolean {
  return AUTHLOCK_ADMIN_TYPES.includes(type);
}

export function isAuthlockSystem(type: AuthAccountLockType): boolean {
  return AUTHLOCK_SYSTEM_TYPES.includes(type);
}

export function isAuthlockSecurity(reason: AuthAccountLockReason): boolean {
  return AUTHLOCK_SECURITY_REASONS.includes(reason);
}

export function isAuthlockPolicy(reason: AuthAccountLockReason): boolean {
  return AUTHLOCK_POLICY_REASONS.includes(reason);
}

export function getAuthlockReasonLabel(reason: AuthAccountLockReason): string {
  const labels: Record<AuthAccountLockReason, string> = {
    [ACCOUNT_LOCK_REASONS.MAX_LOGIN_ATTEMPTS]: 'Maximum Login Attempts Exceeded',
    [ACCOUNT_LOCK_REASONS.MAX_FAILED_ATTEMPTS]: 'Maximum Failed Attempts Exceeded',
    [ACCOUNT_LOCK_REASONS.SUSPICIOUS_ACTIVITY]: 'Suspicious Activity Detected',
    [ACCOUNT_LOCK_REASONS.SECURITY_VIOLATION]: 'Security Violation',
    [ACCOUNT_LOCK_REASONS.ADMIN_ACTION]: 'Admin Action',
    [ACCOUNT_LOCK_REASONS.SYSTEM_ACTION]: 'System Action',
    [ACCOUNT_LOCK_REASONS.POLICY_VIOLATION]: 'Policy Violation',
    [ACCOUNT_LOCK_REASONS.IP_BLOCKED]: 'IP Address Blocked',
    [ACCOUNT_LOCK_REASONS.DEVICE_BLOCKED]: 'Device Blocked',
    [ACCOUNT_LOCK_REASONS.GEO_BLOCKED]: 'Geographic Location Blocked',
    [ACCOUNT_LOCK_REASONS.TEMPORARY]: 'Temporary Lock',
    [ACCOUNT_LOCK_REASONS.PERMANENT]: 'Permanent Lock',
    [ACCOUNT_LOCK_REASONS.EXPIRED]: 'Lock Expired',
    [ACCOUNT_LOCK_REASONS.COMPROMISED]: 'Account Compromised',
    [ACCOUNT_LOCK_REASONS.INACTIVITY]: 'Inactivity Lock',
  };

  return labels[reason] || 'Unknown Reason';
}

export function getAuthlockTypeLabel(type: AuthAccountLockType): string {
  const labels: Record<AuthAccountLockType, string> = {
    [ACCOUNT_LOCK_TYPES.TEMPORARY]: 'Temporary Lock',
    [ACCOUNT_LOCK_TYPES.PERMANENT]: 'Permanent Lock',
    [ACCOUNT_LOCK_TYPES.ADMIN]: 'Admin Lock',
    [ACCOUNT_LOCK_TYPES.SYSTEM]: 'System Lock',
    [ACCOUNT_LOCK_TYPES.AUTOMATIC]: 'Automatic Lock',
    [ACCOUNT_LOCK_TYPES.MANUAL]: 'Manual Lock',
    [ACCOUNT_LOCK_TYPES.IP]: 'IP Lock',
    [ACCOUNT_LOCK_TYPES.DEVICE]: 'Device Lock',
    [ACCOUNT_LOCK_TYPES.GEO]: 'Geographic Lock',
    [ACCOUNT_LOCK_TYPES.SUSPICIOUS]: 'Suspicious Lock',
  };

  return labels[type] || 'Unknown Type';
}

export function getAuthlockTypeIcon(type: AuthAccountLockType): string {
  const icons: Record<AuthAccountLockType, string> = {
    [ACCOUNT_LOCK_TYPES.TEMPORARY]: '⏳',
    [ACCOUNT_LOCK_TYPES.PERMANENT]: '🔒',
    [ACCOUNT_LOCK_TYPES.ADMIN]: '👤',
    [ACCOUNT_LOCK_TYPES.SYSTEM]: '🤖',
    [ACCOUNT_LOCK_TYPES.AUTOMATIC]: '⚙️',
    [ACCOUNT_LOCK_TYPES.MANUAL]: '🔧',
    [ACCOUNT_LOCK_TYPES.IP]: '🌐',
    [ACCOUNT_LOCK_TYPES.DEVICE]: '📱',
    [ACCOUNT_LOCK_TYPES.GEO]: '📍',
    [ACCOUNT_LOCK_TYPES.SUSPICIOUS]: '⚠️',
  };

  return icons[type] || '🔒';
}

export function getAuthlockLevel(level: AuthAccountLockLevel): number {
  const levels: Record<AuthAccountLockLevel, number> = {
    [ACCOUNT_LOCK_LEVELS.NONE]: 0,
    [ACCOUNT_LOCK_LEVELS.LOW]: 1,
    [ACCOUNT_LOCK_LEVELS.MEDIUM]: 2,
    [ACCOUNT_LOCK_LEVELS.HIGH]: 3,
    [ACCOUNT_LOCK_LEVELS.CRITICAL]: 4,
    [ACCOUNT_LOCK_LEVELS.MAXIMUM]: 5,
  };

  return levels[level] || 0;
}

export function getAuthlockLevelLabel(level: AuthAccountLockLevel): string {
  const labels: Record<AuthAccountLockLevel, string> = {
    [ACCOUNT_LOCK_LEVELS.NONE]: 'None',
    [ACCOUNT_LOCK_LEVELS.LOW]: 'Low',
    [ACCOUNT_LOCK_LEVELS.MEDIUM]: 'Medium',
    [ACCOUNT_LOCK_LEVELS.HIGH]: 'High',
    [ACCOUNT_LOCK_LEVELS.CRITICAL]: 'Critical',
    [ACCOUNT_LOCK_LEVELS.MAXIMUM]: 'Maximum',
  };

  return labels[level] || 'Unknown';
}

export function getAuthlockLevelColor(level: AuthAccountLockLevel): string {
  const colors: Record<AuthAccountLockLevel, string> = {
    [ACCOUNT_LOCK_LEVELS.NONE]: '#10B981',
    [ACCOUNT_LOCK_LEVELS.LOW]: '#F59E0B',
    [ACCOUNT_LOCK_LEVELS.MEDIUM]: '#F97316',
    [ACCOUNT_LOCK_LEVELS.HIGH]: '#EF4444',
    [ACCOUNT_LOCK_LEVELS.CRITICAL]: '#DC2626',
    [ACCOUNT_LOCK_LEVELS.MAXIMUM]: '#991B1B',
  };

  return colors[level] || '#6B7280';
}

export function getAuthlockDurationMinutes(type: AuthAccountLockType): number {
  const durations: Record<AuthAccountLockType, number> = {
    [ACCOUNT_LOCK_TYPES.TEMPORARY]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_MINUTES,
    [ACCOUNT_LOCK_TYPES.PERMANENT]: -1,
    [ACCOUNT_LOCK_TYPES.ADMIN]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_HOURS * 60,
    [ACCOUNT_LOCK_TYPES.SYSTEM]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_MINUTES,
    [ACCOUNT_LOCK_TYPES.AUTOMATIC]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_MINUTES,
    [ACCOUNT_LOCK_TYPES.MANUAL]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_DAYS * 24 * 60,
    [ACCOUNT_LOCK_TYPES.IP]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_HOURS * 60,
    [ACCOUNT_LOCK_TYPES.DEVICE]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_HOURS * 60,
    [ACCOUNT_LOCK_TYPES.GEO]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_HOURS * 60,
    [ACCOUNT_LOCK_TYPES.SUSPICIOUS]: ACCOUNT_LOCK_CONFIG.LOCK_DURATION_HOURS * 60,
  };

  return durations[type] || ACCOUNT_LOCK_CONFIG.LOCK_DURATION_MINUTES;
}

export function getAuthlockMaxAttempts(): number {
  return ACCOUNT_LOCK_CONFIG.MAX_LOGIN_ATTEMPTS;
}

export function getAuthlockFailedAttempts(): number {
  return ACCOUNT_LOCK_CONFIG.MAX_FAILED_ATTEMPTS;
}

export function isAuthlockExpired(lockedAt: Date, durationMinutes: number): boolean {
  if (durationMinutes === -1) return false;
  const lockAge = (Date.now() - lockedAt.getTime()) / (60 * 1000);
  return lockAge >= durationMinutes;
}

export function getAuthlockRemainingMinutes(lockedAt: Date, durationMinutes: number): number {
  if (durationMinutes === -1) return -1;
  const lockAge = (Date.now() - lockedAt.getTime()) / (60 * 1000);
  return Math.max(0, durationMinutes - lockAge);
}

export function shouldAuthlockAutoUnlock(lockedAt: Date, durationMinutes: number): boolean {
  if (!ACCOUNT_LOCK_CONFIG.AUTO_UNLOCK_ENABLED) return false;
  if (durationMinutes === -1) return false;
  return isAuthlockExpired(lockedAt, durationMinutes);
}

export function getAuthlockLevelFromAttempts(attempts: number): AuthAccountLockLevel {
  const maxAttempts = ACCOUNT_LOCK_CONFIG.MAX_LOGIN_ATTEMPTS;
  const ratio = attempts / maxAttempts;

  if (ratio >= 0.9) return ACCOUNT_LOCK_LEVELS.CRITICAL;
  if (ratio >= 0.7) return ACCOUNT_LOCK_LEVELS.HIGH;
  if (ratio >= 0.5) return ACCOUNT_LOCK_LEVELS.MEDIUM;
  if (ratio >= 0.3) return ACCOUNT_LOCK_LEVELS.LOW;
  return ACCOUNT_LOCK_LEVELS.NONE;
}
