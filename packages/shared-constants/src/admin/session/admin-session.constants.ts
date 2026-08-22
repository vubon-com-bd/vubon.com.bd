/**
 * Admin Session Constants
 * Admin session management and configuration definitions
 */

export const ADMIN_SESSION = {
  // Session statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    TERMINATED: 'terminated',
    SUSPENDED: 'suspended',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    BLOCKED: 'blocked',
    LOCKED: 'locked',
    TIMEOUT: 'timeout',
  },

  // Session types
  TYPES: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    CLI: 'cli',
    SYSTEM: 'system',
    CRON: 'cron',
    WEBHOOK: 'webhook',
    BATCH: 'batch',
    SERVICE: 'service',
  },

  // Session security levels
  SECURITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Session timeout (in seconds)
  TIMEOUTS: {
    WEB: 3600, // 1 hour
    MOBILE: 86400, // 24 hours
    API: 7200, // 2 hours
    CLI: 28800, // 8 hours
    SYSTEM: 604800, // 7 days
    CRON: 86400, // 24 hours
    WEBHOOK: 3600, // 1 hour
    BATCH: 86400, // 24 hours
    SERVICE: 2592000, // 30 days
  },

  // Session limits
  LIMITS: {
    MAX_CONCURRENT: 5,
    MAX_PER_IP: 10,
    MAX_PER_USER: 3,
    MAX_INACTIVE: 1800, // 30 minutes
    MAX_LIFETIME: 604800, // 7 days
  },

  // Session validation
  VALIDATION: {
    USER_AGENT: true,
    IP_ADDRESS: true,
    DEVICE_ID: true,
    LOCATION: true,
    TWO_FA: false,
  },

  // Session flags
  FLAGS: {
    IS_SECURE: 'secure',
    IS_HTTP_ONLY: 'http_only',
    IS_SAME_SITE: 'same_site',
    IS_PERSISTENT: 'persistent',
    IS_REMEMBER: 'remember',
    IS_TRUSTED: 'trusted',
    IS_VERIFIED: 'verified',
    IS_MFA: 'mfa',
  },

  // Session cookie settings
  COOKIE: {
    NAME: 'admin_session',
    PATH: '/',
    DOMAIN: '.example.com',
    SECURE: true,
    HTTP_ONLY: true,
    SAME_SITE: 'strict' as const,
    MAX_AGE: 3600, // 1 hour
  },

  // Session storage
  STORAGE: {
    REDIS: 'redis',
    MEMCACHE: 'memcache',
    DATABASE: 'database',
    FILE: 'file',
    IN_MEMORY: 'in_memory',
  },
} as const;

export type AdminSessionStatus =
  (typeof ADMIN_SESSION.STATUSES)[keyof typeof ADMIN_SESSION.STATUSES];
export type AdminSessionType = (typeof ADMIN_SESSION.TYPES)[keyof typeof ADMIN_SESSION.TYPES];
export type AdminSessionSecurityLevel =
  (typeof ADMIN_SESSION.SECURITY_LEVELS)[keyof typeof ADMIN_SESSION.SECURITY_LEVELS];
export type AdminSessionTimeout =
  (typeof ADMIN_SESSION.TIMEOUTS)[keyof typeof ADMIN_SESSION.TIMEOUTS];
export type AdminSessionStorage =
  (typeof ADMIN_SESSION.STORAGE)[keyof typeof ADMIN_SESSION.STORAGE];
export type AdminSessionFlag = (typeof ADMIN_SESSION.FLAGS)[keyof typeof ADMIN_SESSION.FLAGS];

export const ADMIN_SESSION_STATUS_LABELS: Record<AdminSessionStatus, string> = {
  [ADMIN_SESSION.STATUSES.ACTIVE]: 'Active',
  [ADMIN_SESSION.STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_SESSION.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_SESSION.STATUSES.REVOKED]: 'Revoked',
  [ADMIN_SESSION.STATUSES.TERMINATED]: 'Terminated',
  [ADMIN_SESSION.STATUSES.SUSPENDED]: 'Suspended',
  [ADMIN_SESSION.STATUSES.PENDING]: 'Pending',
  [ADMIN_SESSION.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_SESSION.STATUSES.UNVERIFIED]: 'Unverified',
  [ADMIN_SESSION.STATUSES.BLOCKED]: 'Blocked',
  [ADMIN_SESSION.STATUSES.LOCKED]: 'Locked',
  [ADMIN_SESSION.STATUSES.TIMEOUT]: 'Timeout',
};

export const ADMIN_SESSION_STATUS_COLORS: Record<AdminSessionStatus, string> = {
  [ADMIN_SESSION.STATUSES.ACTIVE]: '#10B981',
  [ADMIN_SESSION.STATUSES.INACTIVE]: '#6B7280',
  [ADMIN_SESSION.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_SESSION.STATUSES.REVOKED]: '#EF4444',
  [ADMIN_SESSION.STATUSES.TERMINATED]: '#DC2626',
  [ADMIN_SESSION.STATUSES.SUSPENDED]: '#F97316',
  [ADMIN_SESSION.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_SESSION.STATUSES.VERIFIED]: '#34D399',
  [ADMIN_SESSION.STATUSES.UNVERIFIED]: '#F59E0B',
  [ADMIN_SESSION.STATUSES.BLOCKED]: '#EF4444',
  [ADMIN_SESSION.STATUSES.LOCKED]: '#DC2626',
  [ADMIN_SESSION.STATUSES.TIMEOUT]: '#F97316',
};

export const ADMIN_SESSION_TYPE_LABELS: Record<AdminSessionType, string> = {
  [ADMIN_SESSION.TYPES.WEB]: 'Web Browser',
  [ADMIN_SESSION.TYPES.MOBILE]: 'Mobile App',
  [ADMIN_SESSION.TYPES.API]: 'API Request',
  [ADMIN_SESSION.TYPES.CLI]: 'Command Line',
  [ADMIN_SESSION.TYPES.SYSTEM]: 'System Process',
  [ADMIN_SESSION.TYPES.CRON]: 'Cron Job',
  [ADMIN_SESSION.TYPES.WEBHOOK]: 'Webhook',
  [ADMIN_SESSION.TYPES.BATCH]: 'Batch Process',
  [ADMIN_SESSION.TYPES.SERVICE]: 'Service Account',
};

export const ADMIN_SESSION_TYPE_ICONS: Record<AdminSessionType, string> = {
  [ADMIN_SESSION.TYPES.WEB]: '🌐',
  [ADMIN_SESSION.TYPES.MOBILE]: '📱',
  [ADMIN_SESSION.TYPES.API]: '🔌',
  [ADMIN_SESSION.TYPES.CLI]: '💻',
  [ADMIN_SESSION.TYPES.SYSTEM]: '⚙️',
  [ADMIN_SESSION.TYPES.CRON]: '⏰',
  [ADMIN_SESSION.TYPES.WEBHOOK]: '🔗',
  [ADMIN_SESSION.TYPES.BATCH]: '📦',
  [ADMIN_SESSION.TYPES.SERVICE]: '🔧',
};

export const ADMIN_SESSION_SECURITY_LABELS: Record<AdminSessionSecurityLevel, string> = {
  [ADMIN_SESSION.SECURITY_LEVELS.LOW]: 'Low Security',
  [ADMIN_SESSION.SECURITY_LEVELS.MEDIUM]: 'Medium Security',
  [ADMIN_SESSION.SECURITY_LEVELS.HIGH]: 'High Security',
  [ADMIN_SESSION.SECURITY_LEVELS.CRITICAL]: 'Critical Security',
};

export const ADMIN_SESSION_SECURITY_PRIORITY: Record<AdminSessionSecurityLevel, number> = {
  [ADMIN_SESSION.SECURITY_LEVELS.LOW]: 1,
  [ADMIN_SESSION.SECURITY_LEVELS.MEDIUM]: 2,
  [ADMIN_SESSION.SECURITY_LEVELS.HIGH]: 3,
  [ADMIN_SESSION.SECURITY_LEVELS.CRITICAL]: 4,
};

export function getAdminSessionStatusLabel(status: AdminSessionStatus): string {
  return ADMIN_SESSION_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdminSessionStatusColor(status: AdminSessionStatus): string {
  return ADMIN_SESSION_STATUS_COLORS[status] || '#6B7280';
}

export function getAdminSessionTypeLabel(type: AdminSessionType): string {
  return ADMIN_SESSION_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdminSessionTypeIcon(type: AdminSessionType): string {
  return ADMIN_SESSION_TYPE_ICONS[type] || '❓';
}

export function getAdminSessionSecurityLabel(level: AdminSessionSecurityLevel): string {
  return ADMIN_SESSION_SECURITY_LABELS[level] || 'Unknown Security Level';
}

export function getAdminSessionSecurityPriority(level: AdminSessionSecurityLevel): number {
  return ADMIN_SESSION_SECURITY_PRIORITY[level] || 0;
}

export function getAdminSessionTimeout(type: AdminSessionType): number {
  const timeoutMap: Record<AdminSessionType, number> = {
    [ADMIN_SESSION.TYPES.WEB]: ADMIN_SESSION.TIMEOUTS.WEB,
    [ADMIN_SESSION.TYPES.MOBILE]: ADMIN_SESSION.TIMEOUTS.MOBILE,
    [ADMIN_SESSION.TYPES.API]: ADMIN_SESSION.TIMEOUTS.API,
    [ADMIN_SESSION.TYPES.CLI]: ADMIN_SESSION.TIMEOUTS.CLI,
    [ADMIN_SESSION.TYPES.SYSTEM]: ADMIN_SESSION.TIMEOUTS.SYSTEM,
    [ADMIN_SESSION.TYPES.CRON]: ADMIN_SESSION.TIMEOUTS.CRON,
    [ADMIN_SESSION.TYPES.WEBHOOK]: ADMIN_SESSION.TIMEOUTS.WEBHOOK,
    [ADMIN_SESSION.TYPES.BATCH]: ADMIN_SESSION.TIMEOUTS.BATCH,
    [ADMIN_SESSION.TYPES.SERVICE]: ADMIN_SESSION.TIMEOUTS.SERVICE,
  };
  return timeoutMap[type] || ADMIN_SESSION.TIMEOUTS.WEB;
}

export function isActiveSession(status: AdminSessionStatus): boolean {
  return status === ADMIN_SESSION.STATUSES.ACTIVE || status === ADMIN_SESSION.STATUSES.VERIFIED;
}

export function isInactiveSession(status: AdminSessionStatus): boolean {
  return (
    status === ADMIN_SESSION.STATUSES.INACTIVE ||
    status === ADMIN_SESSION.STATUSES.EXPIRED ||
    status === ADMIN_SESSION.STATUSES.TIMEOUT
  );
}

export function isTerminatedSession(status: AdminSessionStatus): boolean {
  return (
    status === ADMIN_SESSION.STATUSES.TERMINATED ||
    status === ADMIN_SESSION.STATUSES.REVOKED ||
    status === ADMIN_SESSION.STATUSES.BLOCKED
  );
}

export function isValidSessionType(type: AdminSessionType): boolean {
  return Object.values(ADMIN_SESSION.TYPES).includes(type);
}

export function isHighSecurityLevel(level: AdminSessionSecurityLevel): boolean {
  return (
    level === ADMIN_SESSION.SECURITY_LEVELS.HIGH || level === ADMIN_SESSION.SECURITY_LEVELS.CRITICAL
  );
}

export function shouldValidateIP(type: AdminSessionType): boolean {
  return (
    type !== ADMIN_SESSION.TYPES.SYSTEM &&
    type !== ADMIN_SESSION.TYPES.CRON &&
    type !== ADMIN_SESSION.TYPES.WEBHOOK
  );
}

export function getSessionLifetime(status: AdminSessionStatus): number {
  if (status === ADMIN_SESSION.STATUSES.ACTIVE) {
    return ADMIN_SESSION.LIMITS.MAX_LIFETIME;
  }
  return 0;
}

export function getSessionTimeoutSeconds(type: AdminSessionType): number {
  const timeoutMap: Record<AdminSessionType, number> = {
    [ADMIN_SESSION.TYPES.WEB]: ADMIN_SESSION.TIMEOUTS.WEB,
    [ADMIN_SESSION.TYPES.MOBILE]: ADMIN_SESSION.TIMEOUTS.MOBILE,
    [ADMIN_SESSION.TYPES.API]: ADMIN_SESSION.TIMEOUTS.API,
    [ADMIN_SESSION.TYPES.CLI]: ADMIN_SESSION.TIMEOUTS.CLI,
    [ADMIN_SESSION.TYPES.SYSTEM]: ADMIN_SESSION.TIMEOUTS.SYSTEM,
    [ADMIN_SESSION.TYPES.CRON]: ADMIN_SESSION.TIMEOUTS.CRON,
    [ADMIN_SESSION.TYPES.WEBHOOK]: ADMIN_SESSION.TIMEOUTS.WEBHOOK,
    [ADMIN_SESSION.TYPES.BATCH]: ADMIN_SESSION.TIMEOUTS.BATCH,
    [ADMIN_SESSION.TYPES.SERVICE]: ADMIN_SESSION.TIMEOUTS.SERVICE,
  };
  return timeoutMap[type] || 3600;
}
