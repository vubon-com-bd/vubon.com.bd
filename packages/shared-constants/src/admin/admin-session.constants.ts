/**
 * Admin Session Constants
 * Session management definitions
 */

/**
 * Session status types
 */
export const SESSION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  TERMINATED: 'terminated',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  VALIDATING: 'validating',
} as const;

/**
 * Session types
 */
export const SESSION_TYPE = {
  WEB: 'web',
  MOBILE: 'mobile',
  API: 'api',
  ADMIN: 'admin',
  SERVICE: 'service',
  SYSTEM: 'system',
  TOKEN: 'token',
  REFRESH: 'refresh',
} as const;

/**
 * Session security levels
 */
export const SESSION_SECURITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
} as const;

/**
 * Session durations (in seconds)
 */
export const SESSION_DURATION = {
  /** 5 minutes for OTP sessions */
  OTP: 300,
  /** 15 minutes for short sessions */
  SHORT: 900,
  /** 30 minutes for medium sessions */
  MEDIUM: 1800,
  /** 1 hour for standard sessions */
  STANDARD: 3600,
  /** 4 hours for extended sessions */
  EXTENDED: 14400,
  /** 8 hours for work sessions */
  WORK: 28800,
  /** 12 hours for long sessions */
  LONG: 43200,
  /** 24 hours for day sessions */
  DAY: 86400,
  /** 7 days for week sessions */
  WEEK: 604800,
  /** 30 days for month sessions */
  MONTH: 2592000,
} as const;

/**
 * Session validation rules
 */
export const SESSION_VALIDATION = {
  /** Max concurrent sessions per user */
  MAX_CONCURRENT: 3,
  /** Max session idle time (in seconds) */
  MAX_IDLE_TIME: 3600,
  /** Session renewal threshold (in seconds) */
  RENEWAL_THRESHOLD: 300,
  /** Session timeout warning (in seconds) */
  TIMEOUT_WARNING: 60,
} as const;

/**
 * Session data keys
 */
export const SESSION_DATA_KEYS = {
  USER_ID: 'userId',
  ADMIN_ID: 'adminId',
  ROLE: 'role',
  PERMISSIONS: 'permissions',
  IP: 'ip',
  USER_AGENT: 'userAgent',
  DEVICE_ID: 'deviceId',
  LOCATION: 'location',
  LAST_ACTIVITY: 'lastActivity',
  CREATED_AT: 'createdAt',
  EXPIRES_AT: 'expiresAt',
} as const;

/**
 * Session event types
 */
export const SESSION_EVENT = {
  CREATED: 'session.created',
  VALIDATED: 'session.validated',
  REFRESHED: 'session.refreshed',
  EXPIRED: 'session.expired',
  REVOKED: 'session.revoked',
  TERMINATED: 'session.terminated',
  SUSPENDED: 'session.suspended',
  RESUMED: 'session.resumed',
  EXTENDED: 'session.extended',
} as const;

/**
 * Session error codes
 */
export const SESSION_ERROR = {
  INVALID_SESSION: 'ERR_SESSION_001',
  EXPIRED_SESSION: 'ERR_SESSION_002',
  REVOKED_SESSION: 'ERR_SESSION_003',
  TOO_MANY_SESSIONS: 'ERR_SESSION_004',
  INVALID_DEVICE: 'ERR_SESSION_005',
  IP_MISMATCH: 'ERR_SESSION_006',
  USER_AGENT_MISMATCH: 'ERR_SESSION_007',
  SESSION_LOCKED: 'ERR_SESSION_008',
} as const;

/**
 * Get session duration label
 */
export function getSessionDurationLabel(duration: number): string {
  const labels: Record<number, string> = {
    [SESSION_DURATION.OTP]: 'OTP Session',
    [SESSION_DURATION.SHORT]: 'Short Session',
    [SESSION_DURATION.MEDIUM]: 'Medium Session',
    [SESSION_DURATION.STANDARD]: 'Standard Session',
    [SESSION_DURATION.EXTENDED]: 'Extended Session',
    [SESSION_DURATION.WORK]: 'Work Session',
    [SESSION_DURATION.LONG]: 'Long Session',
    [SESSION_DURATION.DAY]: 'Day Session',
    [SESSION_DURATION.WEEK]: 'Week Session',
    [SESSION_DURATION.MONTH]: 'Month Session',
  };
  return labels[duration] || 'Custom Session';
}

/**
 * Check if session is active
 */
export function isSessionActive(status: string): boolean {
  return status === SESSION_STATUS.ACTIVE || status === SESSION_STATUS.VALIDATING;
}

/**
 * Check if session is expired or revoked
 */
export function isSessionInvalid(status: string): boolean {
  return (
    status === SESSION_STATUS.EXPIRED ||
    status === SESSION_STATUS.REVOKED ||
    status === SESSION_STATUS.TERMINATED ||
    status === SESSION_STATUS.SUSPENDED
  );
}

/**
 * Get session status color
 */
export function getSessionStatusColor(status: string): string {
  const colors: Record<string, string> = {
    [SESSION_STATUS.ACTIVE]: 'success',
    [SESSION_STATUS.EXPIRED]: 'default',
    [SESSION_STATUS.REVOKED]: 'error',
    [SESSION_STATUS.TERMINATED]: 'error',
    [SESSION_STATUS.SUSPENDED]: 'warning',
    [SESSION_STATUS.PENDING]: 'warning',
    [SESSION_STATUS.VALIDATING]: 'info',
  };
  return colors[status] || 'default';
}

/**
 * Get session status label
 */
export function getSessionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    [SESSION_STATUS.ACTIVE]: 'Active',
    [SESSION_STATUS.EXPIRED]: 'Expired',
    [SESSION_STATUS.REVOKED]: 'Revoked',
    [SESSION_STATUS.TERMINATED]: 'Terminated',
    [SESSION_STATUS.SUSPENDED]: 'Suspended',
    [SESSION_STATUS.PENDING]: 'Pending',
    [SESSION_STATUS.VALIDATING]: 'Validating',
  };
  return labels[status] || status;
}

/**
 * Check if session duration is valid
 */
export function isValidSessionDuration(duration: number): boolean {
  return duration > 0 && duration <= SESSION_DURATION.MONTH;
}

/**
 * Get session expiry time from duration
 */
export function getSessionExpiryTime(duration: number): Date {
  return new Date(Date.now() + duration * 1000);
}

/**
 * Check if session needs renewal
 */
export function needsSessionRenewal(createdAt: Date, duration: number): boolean {
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > duration - SESSION_VALIDATION.RENEWAL_THRESHOLD;
}

/**
 * Check if session is idle
 */
export function isSessionIdle(lastActivity: Date): boolean {
  const idleTime = (Date.now() - lastActivity.getTime()) / 1000;
  return idleTime > SESSION_VALIDATION.MAX_IDLE_TIME;
}
