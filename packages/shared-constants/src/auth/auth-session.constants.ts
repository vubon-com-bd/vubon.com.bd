/**
 * Authentication Session Constants
 * Session management configuration
 */

export const AUTH_SESSION = {
  // Session status
  STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    TERMINATED: 'terminated',
    REVOKED: 'revoked',
    INVALID: 'invalid',
    PENDING: 'pending',
  },

  // Session types
  TYPE: {
    WEB: 'web',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    API: 'api',
    CLI: 'cli',
  },

  // Session configuration
  CONFIG: {
    MAX_AGE: 3600, // 1 hour
    EXTEND_ON_ACTIVITY: true,
    EXTEND_THRESHOLD: 300, // 5 minutes
    INACTIVITY_TIMEOUT: 1800, // 30 minutes
    MAX_SESSIONS_PER_USER: 5,
    MAX_DEVICES_PER_USER: 3,
    REMEMBER_ME_MAX_AGE: 604800, // 7 days
  },

  // Session events
  EVENTS: {
    CREATED: 'session:created',
    UPDATED: 'session:updated',
    EXPIRED: 'session:expired',
    TERMINATED: 'session:terminated',
    REVOKED: 'session:revoked',
    REFRESHED: 'session:refreshed',
    ACTIVITY: 'session:activity',
    INACTIVITY: 'session:inactivity',
  },

  // Session data keys
  KEYS: {
    USER_ID: 'userId',
    SESSION_ID: 'sessionId',
    DEVICE_ID: 'deviceId',
    IP_ADDRESS: 'ipAddress',
    USER_AGENT: 'userAgent',
    LAST_ACTIVITY: 'lastActivity',
    CREATED_AT: 'createdAt',
    EXPIRES_AT: 'expiresAt',
  },
} as const;

export type AuthSessionStatus = (typeof AUTH_SESSION.STATUS)[keyof typeof AUTH_SESSION.STATUS];
export type AuthSessionType = (typeof AUTH_SESSION.TYPE)[keyof typeof AUTH_SESSION.TYPE];
export type AuthSessionEvent = (typeof AUTH_SESSION.EVENTS)[keyof typeof AUTH_SESSION.EVENTS];
export type AuthSessionKey = (typeof AUTH_SESSION.KEYS)[keyof typeof AUTH_SESSION.KEYS];

export const ACTIVE_SESSION_STATUSES: AuthSessionStatus[] = [
  AUTH_SESSION.STATUS.ACTIVE,
  AUTH_SESSION.STATUS.PENDING,
];

export const INACTIVE_SESSION_STATUSES: AuthSessionStatus[] = [
  AUTH_SESSION.STATUS.EXPIRED,
  AUTH_SESSION.STATUS.TERMINATED,
  AUTH_SESSION.STATUS.REVOKED,
  AUTH_SESSION.STATUS.INVALID,
];

export function isSessionActive(status: AuthSessionStatus): boolean {
  return ACTIVE_SESSION_STATUSES.includes(status);
}

export function isSessionInactive(status: AuthSessionStatus): boolean {
  return INACTIVE_SESSION_STATUSES.includes(status);
}

export function getSessionStatusLabel(status: AuthSessionStatus): string {
  const labels: Record<AuthSessionStatus, string> = {
    [AUTH_SESSION.STATUS.ACTIVE]: 'Active',
    [AUTH_SESSION.STATUS.EXPIRED]: 'Expired',
    [AUTH_SESSION.STATUS.TERMINATED]: 'Terminated',
    [AUTH_SESSION.STATUS.REVOKED]: 'Revoked',
    [AUTH_SESSION.STATUS.INVALID]: 'Invalid',
    [AUTH_SESSION.STATUS.PENDING]: 'Pending',
  };

  return labels[status] || 'Unknown Status';
}

export function getSessionTypeLabel(type: AuthSessionType): string {
  const labels: Record<AuthSessionType, string> = {
    [AUTH_SESSION.TYPE.WEB]: 'Web Browser',
    [AUTH_SESSION.TYPE.MOBILE]: 'Mobile App',
    [AUTH_SESSION.TYPE.TABLET]: 'Tablet App',
    [AUTH_SESSION.TYPE.DESKTOP]: 'Desktop App',
    [AUTH_SESSION.TYPE.API]: 'API Client',
    [AUTH_SESSION.TYPE.CLI]: 'CLI Client',
  };

  return labels[type] || 'Unknown Type';
}

export function getSessionMaxAge(rememberMe: boolean): number {
  return rememberMe ? AUTH_SESSION.CONFIG.REMEMBER_ME_MAX_AGE : AUTH_SESSION.CONFIG.MAX_AGE;
}

export function isSessionExpired(createdAt: Date, maxAge: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > maxAge;
}

export function getRemainingSessionTime(createdAt: Date, maxAge: number): number {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return Math.max(0, maxAge - age);
}

export function shouldExtendSession(lastActivity: Date, threshold: number): boolean {
  const inactivity = (Date.now() - lastActivity.getTime()) / 1000;
  return inactivity > threshold;
}
