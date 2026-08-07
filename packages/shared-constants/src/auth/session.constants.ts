// packages/shared-constants/src/auth/session.constants.ts
/**
 * Session management constants for the monorepo
 * All session-related constants are centralized here for consistent session handling
 */

/**
 * Session status types
 * Represents the current state of a user session
 */
export const SESSION_STATUS = {
  /**
   * Active session - User is currently logged in and session is valid
   */
  ACTIVE: 'active',

  /**
   * Expired session - Session has reached its maximum lifetime
   */
  EXPIRED: 'expired',

  /**
   * Revoked session - Session was manually invalidated by user or admin
   */
  REVOKED: 'revoked',

  /**
   * Suspended session - Session is temporarily disabled due to security concerns
   */
  SUSPENDED: 'suspended',

  /**
   * Pending session - Session is created but not yet active
   */
  PENDING: 'pending',

  /**
   * Terminated session - Session was force-terminated
   */
  TERMINATED: 'terminated',

  /**
   * Compromised session - Session is flagged as potentially compromised
   */
  COMPROMISED: 'compromised',
} as const;

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

/**
 * Session device types
 * Categorizes the device type used for the session
 */
export const SESSION_DEVICE_TYPES = {
  /**
   * Desktop computer - Laptop, PC, workstation
   */
  DESKTOP: 'desktop',

  /**
   * Mobile device - Smartphone, mobile phone
   */
  MOBILE: 'mobile',

  /**
   * Tablet device - iPad, Android tablet
   */
  TABLET: 'tablet',

  /**
   * Other device - Smart TV, gaming console, IoT device
   */
  OTHER: 'other',

  /**
   * Unknown device type - Cannot be determined
   */
  UNKNOWN: 'unknown',
} as const;

export type SessionDeviceType = (typeof SESSION_DEVICE_TYPES)[keyof typeof SESSION_DEVICE_TYPES];

/**
 * Session operating system types
 */
export const SESSION_OS_TYPES = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  IOS: 'ios',
  ANDROID: 'android',
  CHROME_OS: 'chrome_os',
  UNKNOWN: 'unknown',
} as const;

export type SessionOSType = (typeof SESSION_OS_TYPES)[keyof typeof SESSION_OS_TYPES];

/**
 * Session browser types
 */
export const SESSION_BROWSER_TYPES = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',
  SAMSUNG_INTERNET: 'samsung_internet',
  UNKNOWN: 'unknown',
} as const;

export type SessionBrowserType = (typeof SESSION_BROWSER_TYPES)[keyof typeof SESSION_BROWSER_TYPES];

/**
 * Session configuration
 */
export const SESSION_CONFIG = {
  /**
   * Maximum session duration in seconds
   * After this time, session expires regardless of activity
   */
  MAX_DURATION_SECONDS: 86400, // 24 hours

  /**
   * Session idle timeout in seconds
   * Session expires after this period of inactivity
   */
  IDLE_TIMEOUT_SECONDS: 1800, // 30 minutes

  /**
   * Session extension threshold in seconds
   * Extend session when activity occurs within this time of expiry
   */
  EXTENSION_THRESHOLD_SECONDS: 300, // 5 minutes

  /**
   * Whether to extend session on activity
   */
  EXTEND_ON_ACTIVITY: true,

  /**
   * Maximum number of concurrent sessions per user
   */
  MAX_CONCURRENT_SESSIONS: 5,

  /**
   * Whether to enforce single session per user
   * If true, new session will invalidate old sessions
   */
  ENFORCE_SINGLE_SESSION: false,

  /**
   * Whether to kick oldest session when max concurrent is reached
   */
  KICK_OLDEST_ON_OVERFLOW: true,

  /**
   * Session cookie name
   */
  COOKIE_NAME: 'session_id',

  /**
   * Session cookie domain
   */
  COOKIE_DOMAIN: '',

  /**
   * Session cookie path
   */
  COOKIE_PATH: '/',

  /**
   * Whether session cookie is secure (HTTPS only)
   */
  COOKIE_SECURE: true,

  /**
   * Whether session cookie is HTTP-only (not accessible via JS)
   */
  COOKIE_HTTP_ONLY: true,

  /**
   * Session cookie same-site policy
   */
  COOKIE_SAME_SITE: 'lax' as const,

  /**
   * Whether to rotate session ID on login
   */
  ROTATE_ON_LOGIN: true,

  /**
   * Whether to rotate session ID on privilege change
   */
  ROTATE_ON_PRIVILEGE_CHANGE: true,

  /**
   * Whether to rotate session ID on password change
   */
  ROTATE_ON_PASSWORD_CHANGE: true,
} as const;

/**
 * Session validation rules
 */
export const SESSION_VALIDATION = {
  /**
   * Minimum session duration in seconds
   * Prevents sessions that expire too quickly
   */
  MIN_DURATION_SECONDS: 60, // 1 minute

  /**
   * Maximum session extension count
   * Prevents indefinite session extension
   */
  MAX_EXTENSION_COUNT: 10,

  /**
   * Required session metadata fields
   */
  REQUIRED_METADATA: ['ip_address', 'user_agent', 'device_type'],

  /**
   * Session token minimum length
   */
  TOKEN_MIN_LENGTH: 32,

  /**
   * Session token maximum length
   */
  TOKEN_MAX_LENGTH: 128,

  /**
   * Session token character set
   */
  TOKEN_CHARSET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-',
} as const;

/**
 * Session cleanup configurations
 */
export const SESSION_CLEANUP = {
  /**
   * Whether to automatically clean up expired sessions
   */
  AUTO_CLEANUP: true,

  /**
   * Cleanup interval in seconds
   */
  CLEANUP_INTERVAL_SECONDS: 3600, // 1 hour

  /**
   * Maximum age of expired sessions before cleanup
   */
  CLEANUP_THRESHOLD_SECONDS: 86400, // 24 hours

  /**
   * Whether to archive sessions before deletion
   */
  ARCHIVE_BEFORE_DELETION: true,

  /**
   * Archive retention period in days
   */
  ARCHIVE_RETENTION_DAYS: 90,
} as const;

/**
 * Session security policies
 */
export const SESSION_SECURITY = {
  /**
   * Whether to validate IP address changes
   */
  VALIDATE_IP_CHANGES: true,

  /**
   * Whether to validate user agent changes
   */
  VALIDATE_USER_AGENT_CHANGES: true,

  /**
   * Whether to validate device fingerprint changes
   */
  VALIDATE_DEVICE_FINGERPRINT: true,

  /**
   * Whether to notify user on new session creation
   */
  NOTIFY_ON_NEW_SESSION: true,

  /**
   * Whether to notify user on session termination
   */
  NOTIFY_ON_TERMINATION: true,

  /**
   * Whether to log all session activities
   */
  LOG_ALL_ACTIVITIES: true,

  /**
   * Whether to require MFA for new sessions
   */
  REQUIRE_MFA_ON_NEW_SESSION: true,

  /**
   * Whether to require password re-verification for sensitive actions
   */
  REQUIRE_REVERIFICATION_FOR_SENSITIVE: true,
} as const;

/**
 * Session interface
 */
export interface Session {
  /**
   * Session unique identifier
   */
  id: string;

  /**
   * User ID associated with the session
   */
  userId: string;

  /**
   * Session token (for API authentication)
   */
  token: string;

  /**
   * Current session status
   */
  status: SessionStatus;

  /**
   * Session creation timestamp
   */
  createdAt: Date;

  /**
   * Session last activity timestamp
   */
  lastActivityAt: Date;

  /**
   * Session expiry timestamp
   */
  expiresAt: Date;

  /**
   * Session metadata
   */
  metadata: SessionMetadata;

  /**
   * Session context data
   */
  context: SessionContext;

  /**
   * Session extensions count
   */
  extensionCount: number;

  /**
   * Whether session is active
   */
  isActive: boolean;

  /**
   * Whether session is expired
   */
  isExpired: boolean;

  /**
   * Whether session is revoked
   */
  isRevoked: boolean;

  /**
   * Session revocation reason
   */
  revocationReason?: SessionRevocationReason;
}

/**
 * Session metadata interface
 */
export interface SessionMetadata {
  /**
   * Device information
   */
  device: SessionDeviceInfo;

  /**
   * Location information
   */
  location?: SessionLocation;

  /**
   * Connection information
   */
  connection: SessionConnection;

  /**
   * Additional metadata
   */
  additional: Record<string, unknown>;
}

/**
 * Session device information
 */
export interface SessionDeviceInfo {
  /**
   * Device type
   */
  type: SessionDeviceType;

  /**
   * Device name (user-provided)
   */
  name?: string;

  /**
   * Device ID (fingerprint)
   */
  id?: string;

  /**
   * Operating system
   */
  os: SessionOSType;

  /**
   * Operating system version
   */
  osVersion?: string;

  /**
   * Browser type
   */
  browser: SessionBrowserType;

  /**
   * Browser version
   */
  browserVersion?: string;

  /**
   * Device manufacturer
   */
  manufacturer?: string;

  /**
   * Device model
   */
  model?: string;

  /**
   * Screen resolution
   */
  screenResolution?: string;
}

/**
 * Session location information
 */
export interface SessionLocation {
  /**
   * ISO-3166 country code
   */
  countryCode?: string;

  /**
   * Region/state
   */
  region?: string;

  /**
   * City
   */
  city?: string;

  /**
   * Postal code
   */
  postalCode?: string;

  /**
   * Latitude
   */
  latitude?: number;

  /**
   * Longitude
   */
  longitude?: number;

  /**
   * Timezone
   */
  timezone?: string;

  /**
   * ISP/ASN
   */
  isp?: string;
}

/**
 * Session connection information
 */
export interface SessionConnection {
  /**
   * IP address
   */
  ipAddress: string;

  /**
   * User agent string
   */
  userAgent: string;

  /**
   * Accept language header
   */
  acceptLanguage?: string;

  /**
   * Connection protocol
   */
  protocol: 'http' | 'https' | 'ws' | 'wss';

  /**
   * Connection port
   */
  port?: number;
}

/**
 * Session context data
 */
export interface SessionContext {
  /**
   * Session scopes/permissions
   */
  scopes: string[];

  /**
   * Session roles
   */
  roles: string[];

  /**
   * Session permissions
   */
  permissions: string[];

  /**
   * Is session authenticated with MFA
   */
  mfaVerified: boolean;

  /**
   * MFA verification timestamp
   */
  mfaVerifiedAt?: Date;

  /**
   * Session authentication method
   */
  authMethod: 'password' | 'oauth' | 'saml' | 'sso';

  /**
   * Session origin (login source)
   */
  origin: string;
}

/**
 * Session revocation reasons
 */
export const SESSION_REVOCATION_REASONS = {
  USER_LOGOUT: 'user_logout',
  USER_INITIATED: 'user_initiated',
  ADMIN_REVOKED: 'admin_revoked',
  PASSWORD_CHANGED: 'password_changed',
  SECURITY_BREACH: 'security_breach',
  SESSION_EXPIRED: 'session_expired',
  SESSION_HIJACKED: 'session_hijacked',
  DEVICE_CHANGED: 'device_changed',
  ACCOUNT_SUSPENDED: 'account_suspended',
  ACCOUNT_DEACTIVATED: 'account_deactivated',
  MFA_REQUIRED: 'mfa_required',
  ROTATION: 'rotation',
  CONCURRENT_LIMIT_EXCEEDED: 'concurrent_limit_exceeded',
} as const;

export type SessionRevocationReason =
  (typeof SESSION_REVOCATION_REASONS)[keyof typeof SESSION_REVOCATION_REASONS];

/**
 * Session event types
 */
export const SESSION_EVENTS = {
  SESSION_CREATED: 'session.created',
  SESSION_ACTIVATED: 'session.activated',
  SESSION_EXTENDED: 'session.extended',
  SESSION_EXPIRED: 'session.expired',
  SESSION_REVOKED: 'session.revoked',
  SESSION_SUSPENDED: 'session.suspended',
  SESSION_TERMINATED: 'session.terminated',
  SESSION_RESTORED: 'session.restored',
  SESSION_COMPROMISED: 'session.compromised',
  SESSION_MFA_VERIFIED: 'session.mfa.verified',
  SESSION_DEVICE_CHANGED: 'session.device.changed',
  SESSION_IP_CHANGED: 'session.ip.changed',
} as const;

export type SessionEvent = (typeof SESSION_EVENTS)[keyof typeof SESSION_EVENTS];

/**
 * Session error messages
 */
export const SESSION_ERROR_MESSAGES = {
  SESSION_NOT_FOUND: 'Session not found',
  SESSION_EXPIRED: 'Session has expired',
  SESSION_REVOKED: 'Session has been revoked',
  SESSION_SUSPENDED: 'Session has been suspended',
  SESSION_TERMINATED: 'Session has been terminated',
  SESSION_COMPROMISED: 'Session is compromised',
  INVALID_SESSION_TOKEN: 'Invalid session token',
  MAX_CONCURRENT_SESSIONS: 'Maximum concurrent sessions reached',
  SESSION_CREATION_FAILED: 'Session creation failed',
  SESSION_UPDATE_FAILED: 'Session update failed',
  SESSION_DELETION_FAILED: 'Session deletion failed',
  DEVICE_UNTRUSTED: 'Device is not trusted',
  IP_ADDRESS_BLOCKED: 'IP address is blocked',
  SESSION_HIJACKED: 'Session hijack detected',
  INVALID_DEVICE_FINGERPRINT: 'Invalid device fingerprint',
  SESSION_REFRESH_FAILED: 'Session refresh failed',
  UNAUTHORIZED_SESSION_ACCESS: 'Unauthorized session access',
} as const;

export type SessionErrorMessage =
  (typeof SESSION_ERROR_MESSAGES)[keyof typeof SESSION_ERROR_MESSAGES];

/**
 * Session success messages
 */
export const SESSION_SUCCESS_MESSAGES = {
  SESSION_CREATED: 'Session created successfully',
  SESSION_ACTIVATED: 'Session activated successfully',
  SESSION_EXTENDED: 'Session extended successfully',
  SESSION_REVOKED: 'Session revoked successfully',
  SESSION_TERMINATED: 'Session terminated successfully',
  SESSION_REFRESHED: 'Session refreshed successfully',
  SESSION_RESTORED: 'Session restored successfully',
  SESSION_MFA_VERIFIED: 'MFA verification completed for session',
} as const;

export type SessionSuccessMessage =
  (typeof SESSION_SUCCESS_MESSAGES)[keyof typeof SESSION_SUCCESS_MESSAGES];

/**
 * Helper functions for session management
 */
export const SESSION_UTILS = {
  /**
   * Check if session is active
   */
  isActive: (session: Session): boolean => {
    return session.status === SESSION_STATUS.ACTIVE && !session.isExpired && !session.isRevoked;
  },

  /**
   * Check if session is expired
   */
  isExpired: (session: Session): boolean => {
    return session.status === SESSION_STATUS.EXPIRED || session.expiresAt < new Date();
  },

  /**
   * Check if session is valid
   */
  isValid: (session: Session): boolean => {
    return (
      session.status === SESSION_STATUS.ACTIVE &&
      !session.isRevoked &&
      session.expiresAt > new Date()
    );
  },

  /**
   * Calculate session remaining time in seconds
   */
  getRemainingTime: (session: Session): number => {
    const now = Date.now();
    const expiry = session.expiresAt.getTime();
    return Math.max(0, Math.floor((expiry - now) / 1000));
  },

  /**
   * Get session age in seconds
   */
  getAge: (session: Session): number => {
    const now = Date.now();
    const created = session.createdAt.getTime();
    return Math.floor((now - created) / 1000);
  },

  /**
   * Get session idle time in seconds
   */
  getIdleTime: (session: Session): number => {
    const now = Date.now();
    const lastActivity = session.lastActivityAt.getTime();
    return Math.floor((now - lastActivity) / 1000);
  },

  /**
   * Check if session needs extension
   */
  needsExtension: (session: Session): boolean => {
    const remaining = SESSION_UTILS.getRemainingTime(session);
    return (
      remaining <= SESSION_CONFIG.EXTENSION_THRESHOLD_SECONDS &&
      session.extensionCount < SESSION_VALIDATION.MAX_EXTENSION_COUNT
    );
  },

  /**
   * Format device type for display
   */
  formatDeviceType: (type: SessionDeviceType): string => {
    const map: Record<SessionDeviceType, string> = {
      desktop: 'Desktop Computer',
      mobile: 'Mobile Device',
      tablet: 'Tablet',
      other: 'Other Device',
      unknown: 'Unknown Device',
    };
    return map[type] || type;
  },

  /**
   * Format OS type for display
   */
  formatOSType: (os: SessionOSType): string => {
    const map: Record<SessionOSType, string> = {
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      ios: 'iOS',
      android: 'Android',
      chrome_os: 'Chrome OS',
      unknown: 'Unknown OS',
    };
    return map[os] || os;
  },

  /**
   * Format browser type for display
   */
  formatBrowserType: (browser: SessionBrowserType): string => {
    const map: Record<SessionBrowserType, string> = {
      chrome: 'Google Chrome',
      firefox: 'Mozilla Firefox',
      safari: 'Apple Safari',
      edge: 'Microsoft Edge',
      opera: 'Opera',
      brave: 'Brave',
      vivaldi: 'Vivaldi',
      samsung_internet: 'Samsung Internet',
      unknown: 'Unknown Browser',
    };
    return map[browser] || browser;
  },

  /**
   * Generate session display name
   */
  getDisplayName: (session: Session): string => {
    const device = SESSION_UTILS.formatDeviceType(session.metadata.device.type);
    const os = SESSION_UTILS.formatOSType(session.metadata.device.os);
    const browser = SESSION_UTILS.formatBrowserType(session.metadata.device.browser);
    const location = session.metadata.location?.city || 'Unknown Location';
    return `${device} - ${os} (${browser}) - ${location}`;
  },
} as const;

/**
 * All session constants for export
 */
export const SESSION_CONSTANTS = {
  STATUS: SESSION_STATUS,
  DEVICE_TYPES: SESSION_DEVICE_TYPES,
  OS_TYPES: SESSION_OS_TYPES,
  BROWSER_TYPES: SESSION_BROWSER_TYPES,
  CONFIG: SESSION_CONFIG,
  VALIDATION: SESSION_VALIDATION,
  CLEANUP: SESSION_CLEANUP,
  SECURITY: SESSION_SECURITY,
  REVOCATION_REASONS: SESSION_REVOCATION_REASONS,
  EVENTS: SESSION_EVENTS,
  ERROR_MESSAGES: SESSION_ERROR_MESSAGES,
  SUCCESS_MESSAGES: SESSION_SUCCESS_MESSAGES,
  UTILS: SESSION_UTILS,
} as const;

/**
 * All session constants for export
 */
export const ALL_SESSION_CONSTANTS = {
  ...SESSION_STATUS,
  ...SESSION_DEVICE_TYPES,
  ...SESSION_OS_TYPES,
  ...SESSION_BROWSER_TYPES,
  ...SESSION_CONFIG,
  ...SESSION_VALIDATION,
  ...SESSION_CLEANUP,
  ...SESSION_SECURITY,
  ...SESSION_REVOCATION_REASONS,
  ...SESSION_EVENTS,
  ...SESSION_ERROR_MESSAGES,
  ...SESSION_SUCCESS_MESSAGES,
} as const;
