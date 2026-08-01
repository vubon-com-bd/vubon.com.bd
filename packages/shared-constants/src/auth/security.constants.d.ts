/**
 * Security constants for the monorepo
 * All security-related constants are centralized here
 */
/**
 * Login security configurations
 */
export declare const LOGIN_SECURITY: {
    /**
     * Maximum number of failed login attempts before action is taken
     */
    readonly MAX_LOGIN_ATTEMPTS: 5;
    /**
     * Time window in minutes for tracking login attempts
     */
    readonly PASSWORD_ATTEMPT_WINDOW_MINUTES: 5;
    /**
     * Account lock duration in minutes after exceeding max attempts
     */
    readonly ACCOUNT_LOCK_DURATION_MINUTES: 15;
    /**
     * IP block duration in minutes after suspicious activity
     */
    readonly IP_BLOCK_DURATION_MINUTES: 60;
    /**
     * Progressive lockout levels for increasing severity
     */
    readonly LOCKOUT_LEVELS: {
        readonly LEVEL_1: 5;
        readonly LEVEL_2: 10;
        readonly LEVEL_3: 20;
    };
    /**
     * Threshold for suspicious activity detection
     */
    readonly SUSPICIOUS_ACTIVITY_THRESHOLD: 10;
    /**
     * Cooldown period in seconds before retrying login
     */
    readonly LOGIN_COOLDOWN_SECONDS: 30;
    /**
     * Maximum login attempts before requiring CAPTCHA
     */
    readonly CAPTCHA_THRESHOLD: 3;
    /**
     * Session timeout in seconds for inactive sessions
     */
    readonly SESSION_TIMEOUT_SECONDS: 1800;
    /**
     * Maximum concurrent sessions per user
     */
    readonly MAX_CONCURRENT_SESSIONS: 5;
};
/**
 * Password security configurations
 */
export declare const PASSWORD_SECURITY: {
    /**
     * Minimum password length
     */
    readonly MIN_LENGTH: 8;
    /**
     * Maximum password length
     */
    readonly MAX_LENGTH: 128;
    /**
     * Number of previous passwords to prevent reuse
     */
    readonly PREVENT_REUSE_COUNT: 5;
    /**
     * Maximum password age in days before expiry
     */
    readonly MAX_AGE_DAYS: 90;
    /**
     * Minimum password age in days before allowing change
     */
    readonly MIN_AGE_DAYS: 1;
    /**
     * Password history retention period in days
     */
    readonly HISTORY_RETENTION_DAYS: 365;
    /**
     * Number of failed password attempts before notification
     */
    readonly FAILURE_NOTIFICATION_THRESHOLD: 3;
    /**
     * Password complexity requirements
     */
    readonly REQUIREMENTS: {
        readonly MIN_LENGTH: 8;
        readonly REQUIRES_UPPERCASE: true;
        readonly REQUIRES_LOWERCASE: true;
        readonly REQUIRES_NUMBER: true;
        readonly REQUIRES_SPECIAL_CHAR: true;
        readonly REQUIRES_TWO_FACTOR: true;
    };
};
/**
 * Two-factor authentication configurations
 */
export declare const TWO_FACTOR_SECURITY: {
    /**
     * Whether 2FA is required for all users
     */
    readonly REQUIRED_FOR_ALL: false;
    /**
     * Whether 2FA is required for admin users
     */
    readonly REQUIRED_FOR_ADMIN: true;
    /**
     * 2FA token expiry in seconds
     */
    readonly TOKEN_EXPIRY_SECONDS: 300;
    /**
     * Maximum 2FA verification attempts
     */
    readonly MAX_VERIFICATION_ATTEMPTS: 3;
    /**
     * Time window for resending 2FA code in seconds
     */
    readonly RESEND_COOLDOWN_SECONDS: 60;
    /**
     * Backup codes count for 2FA
     */
    readonly BACKUP_CODES_COUNT: 10;
    /**
     * Backup codes used warning threshold
     */
    readonly BACKUP_CODES_USAGE_WARNING: 3;
    /**
     * Supported 2FA methods
     */
    readonly SUPPORTED_METHODS: {
        readonly AUTHENTICATOR: "authenticator";
        readonly SMS: "sms";
        readonly EMAIL: "email";
        readonly BACKUP: "backup";
    };
    /**
     * 2FA method priorities
     */
    readonly METHOD_PRIORITY: {
        readonly AUTHENTICATOR: 1;
        readonly SMS: 2;
        readonly EMAIL: 3;
        readonly BACKUP: 4;
    };
};
/**
 * CSRF protection configurations
 */
export declare const CSRF_SECURITY: {
    /**
     * CSRF token length in characters
     */
    readonly TOKEN_LENGTH: 32;
    /**
     * CSRF token expiry in seconds
     */
    readonly TOKEN_EXPIRY_SECONDS: 3600;
    /**
     * Whether to rotate CSRF token on each request
     */
    readonly ROTATE_ON_REQUEST: true;
    /**
     * Whether to rotate CSRF token on login
     */
    readonly ROTATE_ON_LOGIN: true;
    /**
     * Maximum age of CSRF token in seconds before forced rotation
     */
    readonly MAX_TOKEN_AGE_SECONDS: 86400;
    /**
     * Cookie name for CSRF token
     */
    readonly COOKIE_NAME: "csrf_token";
    /**
     * Header name for CSRF token
     */
    readonly HEADER_NAME: "X-CSRF-Token";
    /**
     * Form field name for CSRF token
     */
    readonly FORM_FIELD_NAME: "_csrf";
};
/**
 * Rate limiting configurations
 */
export declare const RATE_LIMIT_SECURITY: {
    /**
     * General API rate limits
     */
    readonly GENERAL: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 100;
    };
    /**
     * Authentication endpoints rate limits
     */
    readonly AUTH: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 20;
    };
    /**
     * Registration endpoints rate limits
     */
    readonly REGISTRATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
    /**
     * Password reset endpoints rate limits
     */
    readonly PASSWORD_RESET: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    /**
     * Email verification endpoints rate limits
     */
    readonly EMAIL_VERIFICATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    /**
     * API endpoints rate limits
     */
    readonly API: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 60;
    };
    /**
     * Admin endpoints rate limits
     */
    readonly ADMIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 30;
    };
    /**
     * Payment endpoints rate limits
     */
    readonly PAYMENT: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
    /**
     * Bulk operations rate limits
     */
    readonly BULK: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 50;
    };
};
/**
 * IP security configurations
 */
export declare const IP_SECURITY: {
    /**
     * IP block duration in minutes
     */
    readonly BLOCK_DURATION_MINUTES: 60;
    /**
     * Maximum failed attempts from an IP before blocking
     */
    readonly MAX_FAILED_ATTEMPTS: 10;
    /**
     * Time window in minutes for tracking IP attempts
     */
    readonly ATTEMPT_WINDOW_MINUTES: 15;
    /**
     * Whitelisted IPs for bypassing rate limits
     */
    readonly WHITELISTED_IPS: string[];
    /**
     * Blacklisted IPs for immediate blocking
     */
    readonly BLACKLISTED_IPS: string[];
    /**
     * IP geolocation block list
     */
    readonly GEOLOCATION_BLOCK_LIST: string[];
    /**
     * Whether to enable IP geolocation blocking
     */
    readonly ENABLE_GEOLOCATION_BLOCKING: false;
    /**
     * IP trust proxy headers
     */
    readonly TRUST_PROXY_HEADERS: readonly ["x-forwarded-for", "x-real-ip", "x-client-ip"];
    /**
     * IP anonymity detection
     */
    readonly ANONYMITY_DETECTION: {
        readonly ENABLED: true;
        readonly VPN_DETECTION: true;
        readonly PROXY_DETECTION: true;
        readonly TOR_DETECTION: true;
    };
};
/**
 * Session security configurations
 */
export declare const SESSION_SECURITY: {
    /**
     * Session idle timeout in seconds
     */
    readonly IDLE_TIMEOUT_SECONDS: 1800;
    /**
     * Session absolute timeout in seconds
     */
    readonly ABSOLUTE_TIMEOUT_SECONDS: 86400;
    /**
     * Session cookie security settings
     */
    readonly COOKIE: {
        readonly SECURE: true;
        readonly HTTP_ONLY: true;
        readonly SAME_SITE: "lax";
        readonly DOMAIN: "";
        readonly PATH: "/";
        readonly MAX_AGE: 86400;
    };
    /**
     * Session data encryption
     */
    readonly ENCRYPTION: {
        readonly ENABLED: true;
        readonly ALGORITHM: "aes-256-gcm";
        readonly KEY_ROTATION_DAYS: 30;
    };
    /**
     * Session tracking
     */
    readonly TRACKING: {
        readonly IP_ADDRESS: true;
        readonly USER_AGENT: true;
        readonly DEVICE_FINGERPRINT: true;
        readonly GEOLOCATION: false;
    };
    /**
     * Concurrent session limits
     */
    readonly CONCURRENT_LIMITS: {
        readonly MAX_CONCURRENT: 5;
        readonly ENFORCE_SINGLE_SESSION: false;
        readonly KICK_OLDEST_ON_NEW: true;
        readonly NOTIFY_ON_NEW_SESSION: true;
    };
};
/**
 * JWT security configurations
 */
export declare const JWT_SECURITY: {
    /**
     * JWT signing algorithm
     */
    readonly ALGORITHM: "RS256";
    /**
     * Access token expiry in seconds
     */
    readonly ACCESS_TOKEN_EXPIRY_SECONDS: 900;
    /**
     * Refresh token expiry in seconds
     */
    readonly REFRESH_TOKEN_EXPIRY_SECONDS: 604800;
    /**
     * JWT issuer
     */
    readonly ISSUER: "my-app";
    /**
     * JWT audience
     */
    readonly AUDIENCE: "my-app-users";
    /**
     * Whether to include audience in token
     */
    readonly INCLUDE_AUDIENCE: true;
    /**
     * Whether to include issuer in token
     */
    readonly INCLUDE_ISSUER: true;
    /**
     * Whether to include issued at time in token
     */
    readonly INCLUDE_IAT: true;
    /**
     * Whether to include not before time in token
     */
    readonly INCLUDE_NBF: false;
    /**
     * Clock skew tolerance in seconds
     */
    readonly CLOCK_SKEW_TOLERANCE_SECONDS: 30;
    /**
     * Token revocation
     */
    readonly REVOCATION: {
        readonly ENABLED: true;
        readonly CACHE_TTL_SECONDS: 3600;
        readonly REVOKE_ON_LOGOUT: true;
        readonly REVOKE_ON_PASSWORD_CHANGE: true;
        readonly REVOKE_ON_EMAIL_CHANGE: true;
    };
    /**
     * Token validation
     */
    readonly VALIDATION: {
        readonly REQUIRED_CLAIMS: readonly ["sub", "exp", "iat", "iss", "aud"];
        readonly ALLOWED_ALGORITHMS: readonly ["RS256", "ES256", "HS256"];
        readonly ENFORCE_SIGNATURE: true;
        readonly ENFORCE_EXPIRY: true;
    };
};
/**
 * Security headers for HTTP responses
 */
export declare const SECURITY_HEADERS: {
    /**
     * Content Security Policy header
     */
    readonly CSP: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';";
    /**
     * X-Content-Type-Options header
     */
    readonly X_CONTENT_TYPE_OPTIONS: "nosniff";
    /**
     * X-Frame-Options header
     */
    readonly X_FRAME_OPTIONS: "DENY";
    /**
     * X-XSS-Protection header
     */
    readonly X_XSS_PROTECTION: "1; mode=block";
    /**
     * Referrer-Policy header
     */
    readonly REFERRER_POLICY: "strict-origin-when-cross-origin";
    /**
     * Permissions-Policy header
     */
    readonly PERMISSIONS_POLICY: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), battery=(), autoplay=()";
    /**
     * Strict-Transport-Security header
     */
    readonly HSTS: "max-age=31536000; includeSubDomains; preload";
    /**
     * X-Download-Options header
     */
    readonly X_DOWNLOAD_OPTIONS: "noopen";
    /**
     * X-Permitted-Cross-Domain-Policies header
     */
    readonly X_PERMITTED_CROSS_DOMAIN_POLICIES: "none";
    /**
     * Clear-Site-Data header
     */
    readonly CLEAR_SITE_DATA: "\"cache\",\"cookies\",\"storage\"";
};
/**
 * Security event types for logging
 */
export declare const SECURITY_EVENTS: {
    /**
     * Authentication events
     */
    readonly AUTH: {
        readonly LOGIN_SUCCESS: "auth.login.success";
        readonly LOGIN_FAILURE: "auth.login.failure";
        readonly LOGOUT: "auth.logout";
        readonly REGISTER: "auth.register";
        readonly EMAIL_VERIFIED: "auth.email.verified";
        readonly EMAIL_VERIFICATION_RESENT: "auth.email.resent";
        readonly PASSWORD_RESET_REQUESTED: "auth.password.reset.requested";
        readonly PASSWORD_RESET_SUCCESS: "auth.password.reset.success";
        readonly PASSWORD_CHANGED: "auth.password.changed";
    };
    /**
     * Account security events
     */
    readonly ACCOUNT: {
        readonly ACCOUNT_LOCKED: "account.locked";
        readonly ACCOUNT_UNLOCKED: "account.unlocked";
        readonly ACCOUNT_SUSPENDED: "account.suspended";
        readonly ACCOUNT_ACTIVATED: "account.activated";
        readonly ACCOUNT_DELETED: "account.deleted";
        readonly ACCOUNT_REACTIVATED: "account.reactivated";
    };
    /**
     * IP security events
     */
    readonly IP: {
        readonly IP_BLOCKED: "ip.blocked";
        readonly IP_UNBLOCKED: "ip.unblocked";
        readonly SUSPICIOUS_IP: "ip.suspicious";
        readonly BLACKLISTED_IP: "ip.blacklisted";
        readonly WHITELISTED_IP: "ip.whitelisted";
    };
    /**
     * Session security events
     */
    readonly SESSION: {
        readonly SESSION_CREATED: "session.created";
        readonly SESSION_EXPIRED: "session.expired";
        readonly SESSION_REVOKED: "session.revoked";
        readonly SESSION_REFRESHED: "session.refreshed";
        readonly SESSION_HIJACKED: "session.hijacked";
    };
    /**
     * Rate limiting events
     */
    readonly RATE_LIMIT: {
        readonly RATE_LIMIT_HIT: "rate.limit.hit";
        readonly RATE_LIMIT_EXCEEDED: "rate.limit.exceeded";
        readonly RATE_LIMIT_RESET: "rate.limit.reset";
    };
    /**
     * Security violation events
     */
    readonly VIOLATION: {
        readonly SUSPICIOUS_ACTIVITY: "violation.suspicious.activity";
        readonly BRUTE_FORCE_ATTEMPT: "violation.brute.force";
        readonly SQL_INJECTION_ATTEMPT: "violation.sql.injection";
        readonly XSS_ATTEMPT: "violation.xss.attempt";
        readonly CSRF_ATTEMPT: "violation.csrf.attempt";
        readonly DOS_ATTEMPT: "violation.dos.attempt";
    };
    /**
     * Two-factor authentication events
     */
    readonly TWO_FACTOR: {
        readonly ENABLED: "2fa.enabled";
        readonly DISABLED: "2fa.disabled";
        readonly VERIFIED: "2fa.verified";
        readonly FAILED: "2fa.failed";
        readonly BACKUP_USED: "2fa.backup.used";
    };
    /**
     * Admin security events
     */
    readonly ADMIN: {
        readonly ADMIN_ACTION: "admin.action.performed";
        readonly ADMIN_LOGIN: "admin.login";
        readonly ADMIN_LOGOUT: "admin.logout";
        readonly PERMISSION_CHANGED: "permission.changed";
        readonly ROLE_CHANGED: "role.changed";
    };
};
/**
 * Security levels for different operations
 */
export declare const SECURITY_LEVELS: {
    /**
     * Low security level - Public data
     */
    readonly LOW: "low";
    /**
     * Medium security level - User data
     */
    readonly MEDIUM: "medium";
    /**
     * High security level - Sensitive data
     */
    readonly HIGH: "high";
    /**
     * Critical security level - Financial data
     */
    readonly CRITICAL: "critical";
    /**
     * Maximum security level - System data
     */
    readonly MAXIMUM: "maximum";
};
export type SecurityLevel = (typeof SECURITY_LEVELS)[keyof typeof SECURITY_LEVELS];
/**
 * Security level requirements
 */
export declare const SECURITY_LEVEL_REQUIREMENTS: Record<SecurityLevel, {
    requires2FA: boolean;
    requiresStrongPassword: boolean;
    sessionTimeoutSeconds: number;
    maxAttempts: number;
    ipWhitelistingRequired: boolean;
}>;
/**
 * Security breach response times
 */
export declare const SECURITY_BREACH_RESPONSE: {
    /**
     * Response time in minutes for critical breaches
     */
    readonly CRITICAL_RESPONSE_TIME_MINUTES: 15;
    /**
     * Response time in minutes for high breaches
     */
    readonly HIGH_RESPONSE_TIME_MINUTES: 30;
    /**
     * Response time in minutes for medium breaches
     */
    readonly MEDIUM_RESPONSE_TIME_MINUTES: 60;
    /**
     * Response time in minutes for low breaches
     */
    readonly LOW_RESPONSE_TIME_MINUTES: 120;
    /**
     * Notification time in minutes for all breaches
     */
    readonly NOTIFICATION_TIME_MINUTES: 5;
    /**
     * Maximum breach handling time in hours
     */
    readonly MAX_HANDLING_TIME_HOURS: 24;
};
/**
 * Encryption configurations
 */
export declare const ENCRYPTION_SECURITY: {
    /**
     * Data encryption algorithm
     */
    readonly DATA_ALGORITHM: "aes-256-gcm";
    /**
     * Key encryption algorithm
     */
    readonly KEY_ALGORITHM: "rsa-2048";
    /**
     * Hash algorithm
     */
    readonly HASH_ALGORITHM: "sha256";
    /**
     * Salt rounds for bcrypt
     */
    readonly BCRYPT_SALT_ROUNDS: 12;
    /**
     * Minimum salt rounds for bcrypt
     */
    readonly MIN_BCRYPT_SALT_ROUNDS: 10;
    /**
     * Maximum salt rounds for bcrypt
     */
    readonly MAX_BCRYPT_SALT_ROUNDS: 15;
    /**
     * Encryption key rotation period in days
     */
    readonly KEY_ROTATION_DAYS: 30;
    /**
     * Whether to encrypt sensitive data at rest
     */
    readonly ENCRYPT_AT_REST: true;
    /**
     * Whether to encrypt sensitive data in transit
     */
    readonly ENCRYPT_IN_TRANSIT: true;
};
/**
 * Audit logging security
 */
export declare const AUDIT_SECURITY: {
    /**
     * Audit log retention period in days
     */
    readonly RETENTION_DAYS: 365;
    /**
     * Whether to log all security events
     */
    readonly LOG_ALL_EVENTS: true;
    /**
     * Whether to log successful logins
     */
    readonly LOG_SUCCESSFUL_LOGINS: true;
    /**
     * Whether to log failed logins
     */
    readonly LOG_FAILED_LOGINS: true;
    /**
     * Whether to log admin actions
     */
    readonly LOG_ADMIN_ACTIONS: true;
    /**
     * Whether to log user data changes
     */
    readonly LOG_USER_DATA_CHANGES: true;
    /**
     * Whether to log API access
     */
    readonly LOG_API_ACCESS: true;
    /**
     * Whether to log security violations
     */
    readonly LOG_SECURITY_VIOLATIONS: true;
    /**
     * Audit log export format
     */
    readonly EXPORT_FORMAT: "json";
    /**
     * Maximum audit log size before rotation
     */
    readonly MAX_LOG_SIZE_BYTES: 104857600;
};
/**
 * Security configuration interface
 */
export interface SecurityConfig {
    /**
     * Enable/disable security features
     */
    enabled: boolean;
    /**
     * Security level
     */
    level: SecurityLevel;
    /**
     * Session configuration
     */
    session: typeof SESSION_SECURITY;
    /**
     * JWT configuration
     */
    jwt: typeof JWT_SECURITY;
    /**
     * Rate limit configuration
     */
    rateLimit: typeof RATE_LIMIT_SECURITY;
    /**
     * CSRF configuration
     */
    csrf: typeof CSRF_SECURITY;
    /**
     * IP security configuration
     */
    ip: typeof IP_SECURITY;
    /**
     * Password security configuration
     */
    password: typeof PASSWORD_SECURITY;
    /**
     * Two-factor authentication configuration
     */
    twoFactor: typeof TWO_FACTOR_SECURITY;
    /**
     * Headers configuration
     */
    headers: typeof SECURITY_HEADERS;
    /**
     * Encryption configuration
     */
    encryption: typeof ENCRYPTION_SECURITY;
    /**
     * Audit configuration
     */
    audit: typeof AUDIT_SECURITY;
}
/**
 * Default security configuration
 */
export declare const DEFAULT_SECURITY_CONFIG: Omit<SecurityConfig, 'enabled' | 'level'>;
/**
 * Error messages for security violations
 */
export declare const SECURITY_ERROR_MESSAGES: {
    readonly ACCOUNT_LOCKED: "Account is temporarily locked due to too many failed attempts";
    readonly ACCOUNT_SUSPENDED: "Account has been suspended for security reasons";
    readonly IP_BLOCKED: "Your IP address has been blocked due to suspicious activity";
    readonly TOO_MANY_ATTEMPTS: "Too many attempts, please try again later";
    readonly SESSION_EXPIRED: "Session has expired, please login again";
    readonly SESSION_REVOKED: "Session has been revoked for security reasons";
    readonly INVALID_TOKEN: "Invalid or expired token";
    readonly TOKEN_MISSING: "Authentication token is missing";
    readonly PERMISSION_DENIED: "Insufficient permissions for this action";
    readonly CSRF_TOKEN_INVALID: "Invalid CSRF token";
    readonly TWO_FACTOR_REQUIRED: "Two-factor authentication is required";
    readonly TWO_FACTOR_INVALID: "Invalid two-factor authentication code";
    readonly PASSWORD_WEAK: "Password does not meet security requirements";
    readonly PASSWORD_EXPIRED: "Password has expired and needs to be reset";
    readonly SUSPICIOUS_ACTIVITY: "Suspicious activity detected, action blocked";
    readonly RATE_LIMIT_EXCEEDED: "Rate limit exceeded, please try again later";
    readonly IP_BLOCKLISTED: "Your IP address is blocklisted";
    readonly UNTRUSTED_IP: "Untrusted IP address detected";
    readonly DEVICE_UNTRUSTED: "Untrusted device detected";
    readonly GEO_BLOCKED: "Access from your location is blocked";
};
export type SecurityErrorMessage = (typeof SECURITY_ERROR_MESSAGES)[keyof typeof SECURITY_ERROR_MESSAGES];
/**
 * Security warning messages
 */
export declare const SECURITY_WARNING_MESSAGES: {
    readonly PASSWORD_WEAK: "Your password is weak, please consider changing it";
    readonly PASSWORD_OLD: "Your password is old, please consider changing it";
    readonly SESSION_NEAR_EXPIRY: "Your session is about to expire";
    readonly SUSPICIOUS_LOGIN_ATTEMPT: "Suspicious login attempt detected from new device";
    readonly MULTIPLE_FAILED_ATTEMPTS: "Multiple failed login attempts detected";
    readonly UNUSUAL_ACTIVITY: "Unusual account activity detected";
    readonly UNTRUSTED_DEVICE: "Login from an untrusted device detected";
    readonly NEW_IP_ADDRESS: "Login from a new IP address detected";
};
export type SecurityWarningMessage = (typeof SECURITY_WARNING_MESSAGES)[keyof typeof SECURITY_WARNING_MESSAGES];
/**
 * Security notification types
 */
export declare const SECURITY_NOTIFICATIONS: {
    readonly ACCOUNT_LOCKED: "account.locked";
    readonly ACCOUNT_UNLOCKED: "account.unlocked";
    readonly PASSWORD_CHANGED: "password.changed";
    readonly PASSWORD_RESET: "password.reset";
    readonly NEW_DEVICE_LOGIN: "new.device.login";
    readonly NEW_IP_LOGIN: "new.ip.login";
    readonly SUSPICIOUS_ACTIVITY: "suspicious.activity";
    readonly TWO_FACTOR_ENABLED: "two.factor.enabled";
    readonly TWO_FACTOR_DISABLED: "two.factor.disabled";
    readonly SESSION_REVOKED: "session.revoked";
    readonly ADMIN_ACTION: "admin.action";
    readonly SECURITY_BREACH: "security.breach";
};
export type SecurityNotification = (typeof SECURITY_NOTIFICATIONS)[keyof typeof SECURITY_NOTIFICATIONS];
//# sourceMappingURL=security.constants.d.ts.map