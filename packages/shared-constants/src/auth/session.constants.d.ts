/**
 * Session management constants for the monorepo
 * All session-related constants are centralized here for consistent session handling
 */
/**
 * Session status types
 * Represents the current state of a user session
 */
export declare const SESSION_STATUS: {
    /**
     * Active session - User is currently logged in and session is valid
     */
    readonly ACTIVE: "active";
    /**
     * Expired session - Session has reached its maximum lifetime
     */
    readonly EXPIRED: "expired";
    /**
     * Revoked session - Session was manually invalidated by user or admin
     */
    readonly REVOKED: "revoked";
    /**
     * Suspended session - Session is temporarily disabled due to security concerns
     */
    readonly SUSPENDED: "suspended";
    /**
     * Pending session - Session is created but not yet active
     */
    readonly PENDING: "pending";
    /**
     * Terminated session - Session was force-terminated
     */
    readonly TERMINATED: "terminated";
    /**
     * Compromised session - Session is flagged as potentially compromised
     */
    readonly COMPROMISED: "compromised";
};
export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
/**
 * Session device types
 * Categorizes the device type used for the session
 */
export declare const SESSION_DEVICE_TYPES: {
    /**
     * Desktop computer - Laptop, PC, workstation
     */
    readonly DESKTOP: "desktop";
    /**
     * Mobile device - Smartphone, mobile phone
     */
    readonly MOBILE: "mobile";
    /**
     * Tablet device - iPad, Android tablet
     */
    readonly TABLET: "tablet";
    /**
     * Other device - Smart TV, gaming console, IoT device
     */
    readonly OTHER: "other";
    /**
     * Unknown device type - Cannot be determined
     */
    readonly UNKNOWN: "unknown";
};
export type SessionDeviceType = (typeof SESSION_DEVICE_TYPES)[keyof typeof SESSION_DEVICE_TYPES];
/**
 * Session operating system types
 */
export declare const SESSION_OS_TYPES: {
    readonly WINDOWS: "windows";
    readonly MACOS: "macos";
    readonly LINUX: "linux";
    readonly IOS: "ios";
    readonly ANDROID: "android";
    readonly CHROME_OS: "chrome_os";
    readonly UNKNOWN: "unknown";
};
export type SessionOSType = (typeof SESSION_OS_TYPES)[keyof typeof SESSION_OS_TYPES];
/**
 * Session browser types
 */
export declare const SESSION_BROWSER_TYPES: {
    readonly CHROME: "chrome";
    readonly FIREFOX: "firefox";
    readonly SAFARI: "safari";
    readonly EDGE: "edge";
    readonly OPERA: "opera";
    readonly BRAVE: "brave";
    readonly VIVALDI: "vivaldi";
    readonly SAMSUNG_INTERNET: "samsung_internet";
    readonly UNKNOWN: "unknown";
};
export type SessionBrowserType = (typeof SESSION_BROWSER_TYPES)[keyof typeof SESSION_BROWSER_TYPES];
/**
 * Session configuration
 */
export declare const SESSION_CONFIG: {
    /**
     * Maximum session duration in seconds
     * After this time, session expires regardless of activity
     */
    readonly MAX_DURATION_SECONDS: 86400;
    /**
     * Session idle timeout in seconds
     * Session expires after this period of inactivity
     */
    readonly IDLE_TIMEOUT_SECONDS: 1800;
    /**
     * Session extension threshold in seconds
     * Extend session when activity occurs within this time of expiry
     */
    readonly EXTENSION_THRESHOLD_SECONDS: 300;
    /**
     * Whether to extend session on activity
     */
    readonly EXTEND_ON_ACTIVITY: true;
    /**
     * Maximum number of concurrent sessions per user
     */
    readonly MAX_CONCURRENT_SESSIONS: 5;
    /**
     * Whether to enforce single session per user
     * If true, new session will invalidate old sessions
     */
    readonly ENFORCE_SINGLE_SESSION: false;
    /**
     * Whether to kick oldest session when max concurrent is reached
     */
    readonly KICK_OLDEST_ON_OVERFLOW: true;
    /**
     * Session cookie name
     */
    readonly COOKIE_NAME: "session_id";
    /**
     * Session cookie domain
     */
    readonly COOKIE_DOMAIN: "";
    /**
     * Session cookie path
     */
    readonly COOKIE_PATH: "/";
    /**
     * Whether session cookie is secure (HTTPS only)
     */
    readonly COOKIE_SECURE: true;
    /**
     * Whether session cookie is HTTP-only (not accessible via JS)
     */
    readonly COOKIE_HTTP_ONLY: true;
    /**
     * Session cookie same-site policy
     */
    readonly COOKIE_SAME_SITE: "lax";
    /**
     * Whether to rotate session ID on login
     */
    readonly ROTATE_ON_LOGIN: true;
    /**
     * Whether to rotate session ID on privilege change
     */
    readonly ROTATE_ON_PRIVILEGE_CHANGE: true;
    /**
     * Whether to rotate session ID on password change
     */
    readonly ROTATE_ON_PASSWORD_CHANGE: true;
};
/**
 * Session validation rules
 */
export declare const SESSION_VALIDATION: {
    /**
     * Minimum session duration in seconds
     * Prevents sessions that expire too quickly
     */
    readonly MIN_DURATION_SECONDS: 60;
    /**
     * Maximum session extension count
     * Prevents indefinite session extension
     */
    readonly MAX_EXTENSION_COUNT: 10;
    /**
     * Required session metadata fields
     */
    readonly REQUIRED_METADATA: readonly ["ip_address", "user_agent", "device_type"];
    /**
     * Session token minimum length
     */
    readonly TOKEN_MIN_LENGTH: 32;
    /**
     * Session token maximum length
     */
    readonly TOKEN_MAX_LENGTH: 128;
    /**
     * Session token character set
     */
    readonly TOKEN_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
};
/**
 * Session cleanup configurations
 */
export declare const SESSION_CLEANUP: {
    /**
     * Whether to automatically clean up expired sessions
     */
    readonly AUTO_CLEANUP: true;
    /**
     * Cleanup interval in seconds
     */
    readonly CLEANUP_INTERVAL_SECONDS: 3600;
    /**
     * Maximum age of expired sessions before cleanup
     */
    readonly CLEANUP_THRESHOLD_SECONDS: 86400;
    /**
     * Whether to archive sessions before deletion
     */
    readonly ARCHIVE_BEFORE_DELETION: true;
    /**
     * Archive retention period in days
     */
    readonly ARCHIVE_RETENTION_DAYS: 90;
};
/**
 * Session security policies
 */
export declare const SESSION_SECURITY: {
    /**
     * Whether to validate IP address changes
     */
    readonly VALIDATE_IP_CHANGES: true;
    /**
     * Whether to validate user agent changes
     */
    readonly VALIDATE_USER_AGENT_CHANGES: true;
    /**
     * Whether to validate device fingerprint changes
     */
    readonly VALIDATE_DEVICE_FINGERPRINT: true;
    /**
     * Whether to notify user on new session creation
     */
    readonly NOTIFY_ON_NEW_SESSION: true;
    /**
     * Whether to notify user on session termination
     */
    readonly NOTIFY_ON_TERMINATION: true;
    /**
     * Whether to log all session activities
     */
    readonly LOG_ALL_ACTIVITIES: true;
    /**
     * Whether to require MFA for new sessions
     */
    readonly REQUIRE_MFA_ON_NEW_SESSION: true;
    /**
     * Whether to require password re-verification for sensitive actions
     */
    readonly REQUIRE_REVERIFICATION_FOR_SENSITIVE: true;
};
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
export declare const SESSION_REVOCATION_REASONS: {
    readonly USER_LOGOUT: "user_logout";
    readonly USER_INITIATED: "user_initiated";
    readonly ADMIN_REVOKED: "admin_revoked";
    readonly PASSWORD_CHANGED: "password_changed";
    readonly SECURITY_BREACH: "security_breach";
    readonly SESSION_EXPIRED: "session_expired";
    readonly SESSION_HIJACKED: "session_hijacked";
    readonly DEVICE_CHANGED: "device_changed";
    readonly ACCOUNT_SUSPENDED: "account_suspended";
    readonly ACCOUNT_DEACTIVATED: "account_deactivated";
    readonly MFA_REQUIRED: "mfa_required";
    readonly ROTATION: "rotation";
    readonly CONCURRENT_LIMIT_EXCEEDED: "concurrent_limit_exceeded";
};
export type SessionRevocationReason = (typeof SESSION_REVOCATION_REASONS)[keyof typeof SESSION_REVOCATION_REASONS];
/**
 * Session event types
 */
export declare const SESSION_EVENTS: {
    readonly SESSION_CREATED: "session.created";
    readonly SESSION_ACTIVATED: "session.activated";
    readonly SESSION_EXTENDED: "session.extended";
    readonly SESSION_EXPIRED: "session.expired";
    readonly SESSION_REVOKED: "session.revoked";
    readonly SESSION_SUSPENDED: "session.suspended";
    readonly SESSION_TERMINATED: "session.terminated";
    readonly SESSION_RESTORED: "session.restored";
    readonly SESSION_COMPROMISED: "session.compromised";
    readonly SESSION_MFA_VERIFIED: "session.mfa.verified";
    readonly SESSION_DEVICE_CHANGED: "session.device.changed";
    readonly SESSION_IP_CHANGED: "session.ip.changed";
};
export type SessionEvent = (typeof SESSION_EVENTS)[keyof typeof SESSION_EVENTS];
/**
 * Session error messages
 */
export declare const SESSION_ERROR_MESSAGES: {
    readonly SESSION_NOT_FOUND: "Session not found";
    readonly SESSION_EXPIRED: "Session has expired";
    readonly SESSION_REVOKED: "Session has been revoked";
    readonly SESSION_SUSPENDED: "Session has been suspended";
    readonly SESSION_TERMINATED: "Session has been terminated";
    readonly SESSION_COMPROMISED: "Session is compromised";
    readonly INVALID_SESSION_TOKEN: "Invalid session token";
    readonly MAX_CONCURRENT_SESSIONS: "Maximum concurrent sessions reached";
    readonly SESSION_CREATION_FAILED: "Session creation failed";
    readonly SESSION_UPDATE_FAILED: "Session update failed";
    readonly SESSION_DELETION_FAILED: "Session deletion failed";
    readonly DEVICE_UNTRUSTED: "Device is not trusted";
    readonly IP_ADDRESS_BLOCKED: "IP address is blocked";
    readonly SESSION_HIJACKED: "Session hijack detected";
    readonly INVALID_DEVICE_FINGERPRINT: "Invalid device fingerprint";
    readonly SESSION_REFRESH_FAILED: "Session refresh failed";
    readonly UNAUTHORIZED_SESSION_ACCESS: "Unauthorized session access";
};
export type SessionErrorMessage = (typeof SESSION_ERROR_MESSAGES)[keyof typeof SESSION_ERROR_MESSAGES];
/**
 * Session success messages
 */
export declare const SESSION_SUCCESS_MESSAGES: {
    readonly SESSION_CREATED: "Session created successfully";
    readonly SESSION_ACTIVATED: "Session activated successfully";
    readonly SESSION_EXTENDED: "Session extended successfully";
    readonly SESSION_REVOKED: "Session revoked successfully";
    readonly SESSION_TERMINATED: "Session terminated successfully";
    readonly SESSION_REFRESHED: "Session refreshed successfully";
    readonly SESSION_RESTORED: "Session restored successfully";
    readonly SESSION_MFA_VERIFIED: "MFA verification completed for session";
};
export type SessionSuccessMessage = (typeof SESSION_SUCCESS_MESSAGES)[keyof typeof SESSION_SUCCESS_MESSAGES];
/**
 * Helper functions for session management
 */
export declare const SESSION_UTILS: {
    /**
     * Check if session is active
     */
    readonly isActive: (session: Session) => boolean;
    /**
     * Check if session is expired
     */
    readonly isExpired: (session: Session) => boolean;
    /**
     * Check if session is valid
     */
    readonly isValid: (session: Session) => boolean;
    /**
     * Calculate session remaining time in seconds
     */
    readonly getRemainingTime: (session: Session) => number;
    /**
     * Get session age in seconds
     */
    readonly getAge: (session: Session) => number;
    /**
     * Get session idle time in seconds
     */
    readonly getIdleTime: (session: Session) => number;
    /**
     * Check if session needs extension
     */
    readonly needsExtension: (session: Session) => boolean;
    /**
     * Format device type for display
     */
    readonly formatDeviceType: (type: SessionDeviceType) => string;
    /**
     * Format OS type for display
     */
    readonly formatOSType: (os: SessionOSType) => string;
    /**
     * Format browser type for display
     */
    readonly formatBrowserType: (browser: SessionBrowserType) => string;
    /**
     * Generate session display name
     */
    readonly getDisplayName: (session: Session) => string;
};
/**
 * All session constants for export
 */
export declare const SESSION_CONSTANTS: {
    readonly STATUS: {
        /**
         * Active session - User is currently logged in and session is valid
         */
        readonly ACTIVE: "active";
        /**
         * Expired session - Session has reached its maximum lifetime
         */
        readonly EXPIRED: "expired";
        /**
         * Revoked session - Session was manually invalidated by user or admin
         */
        readonly REVOKED: "revoked";
        /**
         * Suspended session - Session is temporarily disabled due to security concerns
         */
        readonly SUSPENDED: "suspended";
        /**
         * Pending session - Session is created but not yet active
         */
        readonly PENDING: "pending";
        /**
         * Terminated session - Session was force-terminated
         */
        readonly TERMINATED: "terminated";
        /**
         * Compromised session - Session is flagged as potentially compromised
         */
        readonly COMPROMISED: "compromised";
    };
    readonly DEVICE_TYPES: {
        /**
         * Desktop computer - Laptop, PC, workstation
         */
        readonly DESKTOP: "desktop";
        /**
         * Mobile device - Smartphone, mobile phone
         */
        readonly MOBILE: "mobile";
        /**
         * Tablet device - iPad, Android tablet
         */
        readonly TABLET: "tablet";
        /**
         * Other device - Smart TV, gaming console, IoT device
         */
        readonly OTHER: "other";
        /**
         * Unknown device type - Cannot be determined
         */
        readonly UNKNOWN: "unknown";
    };
    readonly OS_TYPES: {
        readonly WINDOWS: "windows";
        readonly MACOS: "macos";
        readonly LINUX: "linux";
        readonly IOS: "ios";
        readonly ANDROID: "android";
        readonly CHROME_OS: "chrome_os";
        readonly UNKNOWN: "unknown";
    };
    readonly BROWSER_TYPES: {
        readonly CHROME: "chrome";
        readonly FIREFOX: "firefox";
        readonly SAFARI: "safari";
        readonly EDGE: "edge";
        readonly OPERA: "opera";
        readonly BRAVE: "brave";
        readonly VIVALDI: "vivaldi";
        readonly SAMSUNG_INTERNET: "samsung_internet";
        readonly UNKNOWN: "unknown";
    };
    readonly CONFIG: {
        /**
         * Maximum session duration in seconds
         * After this time, session expires regardless of activity
         */
        readonly MAX_DURATION_SECONDS: 86400;
        /**
         * Session idle timeout in seconds
         * Session expires after this period of inactivity
         */
        readonly IDLE_TIMEOUT_SECONDS: 1800;
        /**
         * Session extension threshold in seconds
         * Extend session when activity occurs within this time of expiry
         */
        readonly EXTENSION_THRESHOLD_SECONDS: 300;
        /**
         * Whether to extend session on activity
         */
        readonly EXTEND_ON_ACTIVITY: true;
        /**
         * Maximum number of concurrent sessions per user
         */
        readonly MAX_CONCURRENT_SESSIONS: 5;
        /**
         * Whether to enforce single session per user
         * If true, new session will invalidate old sessions
         */
        readonly ENFORCE_SINGLE_SESSION: false;
        /**
         * Whether to kick oldest session when max concurrent is reached
         */
        readonly KICK_OLDEST_ON_OVERFLOW: true;
        /**
         * Session cookie name
         */
        readonly COOKIE_NAME: "session_id";
        /**
         * Session cookie domain
         */
        readonly COOKIE_DOMAIN: "";
        /**
         * Session cookie path
         */
        readonly COOKIE_PATH: "/";
        /**
         * Whether session cookie is secure (HTTPS only)
         */
        readonly COOKIE_SECURE: true;
        /**
         * Whether session cookie is HTTP-only (not accessible via JS)
         */
        readonly COOKIE_HTTP_ONLY: true;
        /**
         * Session cookie same-site policy
         */
        readonly COOKIE_SAME_SITE: "lax";
        /**
         * Whether to rotate session ID on login
         */
        readonly ROTATE_ON_LOGIN: true;
        /**
         * Whether to rotate session ID on privilege change
         */
        readonly ROTATE_ON_PRIVILEGE_CHANGE: true;
        /**
         * Whether to rotate session ID on password change
         */
        readonly ROTATE_ON_PASSWORD_CHANGE: true;
    };
    readonly VALIDATION: {
        /**
         * Minimum session duration in seconds
         * Prevents sessions that expire too quickly
         */
        readonly MIN_DURATION_SECONDS: 60;
        /**
         * Maximum session extension count
         * Prevents indefinite session extension
         */
        readonly MAX_EXTENSION_COUNT: 10;
        /**
         * Required session metadata fields
         */
        readonly REQUIRED_METADATA: readonly ["ip_address", "user_agent", "device_type"];
        /**
         * Session token minimum length
         */
        readonly TOKEN_MIN_LENGTH: 32;
        /**
         * Session token maximum length
         */
        readonly TOKEN_MAX_LENGTH: 128;
        /**
         * Session token character set
         */
        readonly TOKEN_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    };
    readonly CLEANUP: {
        /**
         * Whether to automatically clean up expired sessions
         */
        readonly AUTO_CLEANUP: true;
        /**
         * Cleanup interval in seconds
         */
        readonly CLEANUP_INTERVAL_SECONDS: 3600;
        /**
         * Maximum age of expired sessions before cleanup
         */
        readonly CLEANUP_THRESHOLD_SECONDS: 86400;
        /**
         * Whether to archive sessions before deletion
         */
        readonly ARCHIVE_BEFORE_DELETION: true;
        /**
         * Archive retention period in days
         */
        readonly ARCHIVE_RETENTION_DAYS: 90;
    };
    readonly SECURITY: {
        /**
         * Whether to validate IP address changes
         */
        readonly VALIDATE_IP_CHANGES: true;
        /**
         * Whether to validate user agent changes
         */
        readonly VALIDATE_USER_AGENT_CHANGES: true;
        /**
         * Whether to validate device fingerprint changes
         */
        readonly VALIDATE_DEVICE_FINGERPRINT: true;
        /**
         * Whether to notify user on new session creation
         */
        readonly NOTIFY_ON_NEW_SESSION: true;
        /**
         * Whether to notify user on session termination
         */
        readonly NOTIFY_ON_TERMINATION: true;
        /**
         * Whether to log all session activities
         */
        readonly LOG_ALL_ACTIVITIES: true;
        /**
         * Whether to require MFA for new sessions
         */
        readonly REQUIRE_MFA_ON_NEW_SESSION: true;
        /**
         * Whether to require password re-verification for sensitive actions
         */
        readonly REQUIRE_REVERIFICATION_FOR_SENSITIVE: true;
    };
    readonly REVOCATION_REASONS: {
        readonly USER_LOGOUT: "user_logout";
        readonly USER_INITIATED: "user_initiated";
        readonly ADMIN_REVOKED: "admin_revoked";
        readonly PASSWORD_CHANGED: "password_changed";
        readonly SECURITY_BREACH: "security_breach";
        readonly SESSION_EXPIRED: "session_expired";
        readonly SESSION_HIJACKED: "session_hijacked";
        readonly DEVICE_CHANGED: "device_changed";
        readonly ACCOUNT_SUSPENDED: "account_suspended";
        readonly ACCOUNT_DEACTIVATED: "account_deactivated";
        readonly MFA_REQUIRED: "mfa_required";
        readonly ROTATION: "rotation";
        readonly CONCURRENT_LIMIT_EXCEEDED: "concurrent_limit_exceeded";
    };
    readonly EVENTS: {
        readonly SESSION_CREATED: "session.created";
        readonly SESSION_ACTIVATED: "session.activated";
        readonly SESSION_EXTENDED: "session.extended";
        readonly SESSION_EXPIRED: "session.expired";
        readonly SESSION_REVOKED: "session.revoked";
        readonly SESSION_SUSPENDED: "session.suspended";
        readonly SESSION_TERMINATED: "session.terminated";
        readonly SESSION_RESTORED: "session.restored";
        readonly SESSION_COMPROMISED: "session.compromised";
        readonly SESSION_MFA_VERIFIED: "session.mfa.verified";
        readonly SESSION_DEVICE_CHANGED: "session.device.changed";
        readonly SESSION_IP_CHANGED: "session.ip.changed";
    };
    readonly ERROR_MESSAGES: {
        readonly SESSION_NOT_FOUND: "Session not found";
        readonly SESSION_EXPIRED: "Session has expired";
        readonly SESSION_REVOKED: "Session has been revoked";
        readonly SESSION_SUSPENDED: "Session has been suspended";
        readonly SESSION_TERMINATED: "Session has been terminated";
        readonly SESSION_COMPROMISED: "Session is compromised";
        readonly INVALID_SESSION_TOKEN: "Invalid session token";
        readonly MAX_CONCURRENT_SESSIONS: "Maximum concurrent sessions reached";
        readonly SESSION_CREATION_FAILED: "Session creation failed";
        readonly SESSION_UPDATE_FAILED: "Session update failed";
        readonly SESSION_DELETION_FAILED: "Session deletion failed";
        readonly DEVICE_UNTRUSTED: "Device is not trusted";
        readonly IP_ADDRESS_BLOCKED: "IP address is blocked";
        readonly SESSION_HIJACKED: "Session hijack detected";
        readonly INVALID_DEVICE_FINGERPRINT: "Invalid device fingerprint";
        readonly SESSION_REFRESH_FAILED: "Session refresh failed";
        readonly UNAUTHORIZED_SESSION_ACCESS: "Unauthorized session access";
    };
    readonly SUCCESS_MESSAGES: {
        readonly SESSION_CREATED: "Session created successfully";
        readonly SESSION_ACTIVATED: "Session activated successfully";
        readonly SESSION_EXTENDED: "Session extended successfully";
        readonly SESSION_REVOKED: "Session revoked successfully";
        readonly SESSION_TERMINATED: "Session terminated successfully";
        readonly SESSION_REFRESHED: "Session refreshed successfully";
        readonly SESSION_RESTORED: "Session restored successfully";
        readonly SESSION_MFA_VERIFIED: "MFA verification completed for session";
    };
    readonly UTILS: {
        /**
         * Check if session is active
         */
        readonly isActive: (session: Session) => boolean;
        /**
         * Check if session is expired
         */
        readonly isExpired: (session: Session) => boolean;
        /**
         * Check if session is valid
         */
        readonly isValid: (session: Session) => boolean;
        /**
         * Calculate session remaining time in seconds
         */
        readonly getRemainingTime: (session: Session) => number;
        /**
         * Get session age in seconds
         */
        readonly getAge: (session: Session) => number;
        /**
         * Get session idle time in seconds
         */
        readonly getIdleTime: (session: Session) => number;
        /**
         * Check if session needs extension
         */
        readonly needsExtension: (session: Session) => boolean;
        /**
         * Format device type for display
         */
        readonly formatDeviceType: (type: SessionDeviceType) => string;
        /**
         * Format OS type for display
         */
        readonly formatOSType: (os: SessionOSType) => string;
        /**
         * Format browser type for display
         */
        readonly formatBrowserType: (browser: SessionBrowserType) => string;
        /**
         * Generate session display name
         */
        readonly getDisplayName: (session: Session) => string;
    };
};
/**
 * All session constants for export
 */
export declare const ALL_SESSION_CONSTANTS: {
    readonly SESSION_CREATED: "Session created successfully";
    readonly SESSION_ACTIVATED: "Session activated successfully";
    readonly SESSION_EXTENDED: "Session extended successfully";
    readonly SESSION_REVOKED: "Session revoked successfully";
    readonly SESSION_TERMINATED: "Session terminated successfully";
    readonly SESSION_REFRESHED: "Session refreshed successfully";
    readonly SESSION_RESTORED: "Session restored successfully";
    readonly SESSION_MFA_VERIFIED: "MFA verification completed for session";
    readonly SESSION_NOT_FOUND: "Session not found";
    readonly SESSION_EXPIRED: "Session has expired";
    readonly SESSION_SUSPENDED: "Session has been suspended";
    readonly SESSION_COMPROMISED: "Session is compromised";
    readonly INVALID_SESSION_TOKEN: "Invalid session token";
    readonly MAX_CONCURRENT_SESSIONS: "Maximum concurrent sessions reached";
    readonly SESSION_CREATION_FAILED: "Session creation failed";
    readonly SESSION_UPDATE_FAILED: "Session update failed";
    readonly SESSION_DELETION_FAILED: "Session deletion failed";
    readonly DEVICE_UNTRUSTED: "Device is not trusted";
    readonly IP_ADDRESS_BLOCKED: "IP address is blocked";
    readonly SESSION_HIJACKED: "Session hijack detected";
    readonly INVALID_DEVICE_FINGERPRINT: "Invalid device fingerprint";
    readonly SESSION_REFRESH_FAILED: "Session refresh failed";
    readonly UNAUTHORIZED_SESSION_ACCESS: "Unauthorized session access";
    readonly SESSION_DEVICE_CHANGED: "session.device.changed";
    readonly SESSION_IP_CHANGED: "session.ip.changed";
    readonly USER_LOGOUT: "user_logout";
    readonly USER_INITIATED: "user_initiated";
    readonly ADMIN_REVOKED: "admin_revoked";
    readonly PASSWORD_CHANGED: "password_changed";
    readonly SECURITY_BREACH: "security_breach";
    readonly DEVICE_CHANGED: "device_changed";
    readonly ACCOUNT_SUSPENDED: "account_suspended";
    readonly ACCOUNT_DEACTIVATED: "account_deactivated";
    readonly MFA_REQUIRED: "mfa_required";
    readonly ROTATION: "rotation";
    readonly CONCURRENT_LIMIT_EXCEEDED: "concurrent_limit_exceeded";
    /**
     * Whether to validate IP address changes
     */
    readonly VALIDATE_IP_CHANGES: true;
    /**
     * Whether to validate user agent changes
     */
    readonly VALIDATE_USER_AGENT_CHANGES: true;
    /**
     * Whether to validate device fingerprint changes
     */
    readonly VALIDATE_DEVICE_FINGERPRINT: true;
    /**
     * Whether to notify user on new session creation
     */
    readonly NOTIFY_ON_NEW_SESSION: true;
    /**
     * Whether to notify user on session termination
     */
    readonly NOTIFY_ON_TERMINATION: true;
    /**
     * Whether to log all session activities
     */
    readonly LOG_ALL_ACTIVITIES: true;
    /**
     * Whether to require MFA for new sessions
     */
    readonly REQUIRE_MFA_ON_NEW_SESSION: true;
    /**
     * Whether to require password re-verification for sensitive actions
     */
    readonly REQUIRE_REVERIFICATION_FOR_SENSITIVE: true;
    /**
     * Whether to automatically clean up expired sessions
     */
    readonly AUTO_CLEANUP: true;
    /**
     * Cleanup interval in seconds
     */
    readonly CLEANUP_INTERVAL_SECONDS: 3600;
    /**
     * Maximum age of expired sessions before cleanup
     */
    readonly CLEANUP_THRESHOLD_SECONDS: 86400;
    /**
     * Whether to archive sessions before deletion
     */
    readonly ARCHIVE_BEFORE_DELETION: true;
    /**
     * Archive retention period in days
     */
    readonly ARCHIVE_RETENTION_DAYS: 90;
    /**
     * Minimum session duration in seconds
     * Prevents sessions that expire too quickly
     */
    readonly MIN_DURATION_SECONDS: 60;
    /**
     * Maximum session extension count
     * Prevents indefinite session extension
     */
    readonly MAX_EXTENSION_COUNT: 10;
    /**
     * Required session metadata fields
     */
    readonly REQUIRED_METADATA: readonly ["ip_address", "user_agent", "device_type"];
    /**
     * Session token minimum length
     */
    readonly TOKEN_MIN_LENGTH: 32;
    /**
     * Session token maximum length
     */
    readonly TOKEN_MAX_LENGTH: 128;
    /**
     * Session token character set
     */
    readonly TOKEN_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    /**
     * Maximum session duration in seconds
     * After this time, session expires regardless of activity
     */
    readonly MAX_DURATION_SECONDS: 86400;
    /**
     * Session idle timeout in seconds
     * Session expires after this period of inactivity
     */
    readonly IDLE_TIMEOUT_SECONDS: 1800;
    /**
     * Session extension threshold in seconds
     * Extend session when activity occurs within this time of expiry
     */
    readonly EXTENSION_THRESHOLD_SECONDS: 300;
    /**
     * Whether to extend session on activity
     */
    readonly EXTEND_ON_ACTIVITY: true;
    /**
     * Whether to enforce single session per user
     * If true, new session will invalidate old sessions
     */
    readonly ENFORCE_SINGLE_SESSION: false;
    /**
     * Whether to kick oldest session when max concurrent is reached
     */
    readonly KICK_OLDEST_ON_OVERFLOW: true;
    /**
     * Session cookie name
     */
    readonly COOKIE_NAME: "session_id";
    /**
     * Session cookie domain
     */
    readonly COOKIE_DOMAIN: "";
    /**
     * Session cookie path
     */
    readonly COOKIE_PATH: "/";
    /**
     * Whether session cookie is secure (HTTPS only)
     */
    readonly COOKIE_SECURE: true;
    /**
     * Whether session cookie is HTTP-only (not accessible via JS)
     */
    readonly COOKIE_HTTP_ONLY: true;
    /**
     * Session cookie same-site policy
     */
    readonly COOKIE_SAME_SITE: "lax";
    /**
     * Whether to rotate session ID on login
     */
    readonly ROTATE_ON_LOGIN: true;
    /**
     * Whether to rotate session ID on privilege change
     */
    readonly ROTATE_ON_PRIVILEGE_CHANGE: true;
    /**
     * Whether to rotate session ID on password change
     */
    readonly ROTATE_ON_PASSWORD_CHANGE: true;
    readonly CHROME: "chrome";
    readonly FIREFOX: "firefox";
    readonly SAFARI: "safari";
    readonly EDGE: "edge";
    readonly OPERA: "opera";
    readonly BRAVE: "brave";
    readonly VIVALDI: "vivaldi";
    readonly SAMSUNG_INTERNET: "samsung_internet";
    readonly UNKNOWN: "unknown";
    readonly WINDOWS: "windows";
    readonly MACOS: "macos";
    readonly LINUX: "linux";
    readonly IOS: "ios";
    readonly ANDROID: "android";
    readonly CHROME_OS: "chrome_os";
    /**
     * Desktop computer - Laptop, PC, workstation
     */
    readonly DESKTOP: "desktop";
    /**
     * Mobile device - Smartphone, mobile phone
     */
    readonly MOBILE: "mobile";
    /**
     * Tablet device - iPad, Android tablet
     */
    readonly TABLET: "tablet";
    /**
     * Other device - Smart TV, gaming console, IoT device
     */
    readonly OTHER: "other";
    /**
     * Active session - User is currently logged in and session is valid
     */
    readonly ACTIVE: "active";
    /**
     * Expired session - Session has reached its maximum lifetime
     */
    readonly EXPIRED: "expired";
    /**
     * Revoked session - Session was manually invalidated by user or admin
     */
    readonly REVOKED: "revoked";
    /**
     * Suspended session - Session is temporarily disabled due to security concerns
     */
    readonly SUSPENDED: "suspended";
    /**
     * Pending session - Session is created but not yet active
     */
    readonly PENDING: "pending";
    /**
     * Terminated session - Session was force-terminated
     */
    readonly TERMINATED: "terminated";
    /**
     * Compromised session - Session is flagged as potentially compromised
     */
    readonly COMPROMISED: "compromised";
};
//# sourceMappingURL=session.constants.d.ts.map