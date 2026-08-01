/**
 * Security constants for the monorepo
 * All security-related constants are centralized here
 */
/**
 * Login security configurations
 */
export const LOGIN_SECURITY = {
    /**
     * Maximum number of failed login attempts before action is taken
     */
    MAX_LOGIN_ATTEMPTS: 5,
    /**
     * Time window in minutes for tracking login attempts
     */
    PASSWORD_ATTEMPT_WINDOW_MINUTES: 5,
    /**
     * Account lock duration in minutes after exceeding max attempts
     */
    ACCOUNT_LOCK_DURATION_MINUTES: 15,
    /**
     * IP block duration in minutes after suspicious activity
     */
    IP_BLOCK_DURATION_MINUTES: 60,
    /**
     * Progressive lockout levels for increasing severity
     */
    LOCKOUT_LEVELS: {
        LEVEL_1: 5, // First lockout level
        LEVEL_2: 10, // Second lockout level
        LEVEL_3: 20, // Third lockout level
    },
    /**
     * Threshold for suspicious activity detection
     */
    SUSPICIOUS_ACTIVITY_THRESHOLD: 10,
    /**
     * Cooldown period in seconds before retrying login
     */
    LOGIN_COOLDOWN_SECONDS: 30,
    /**
     * Maximum login attempts before requiring CAPTCHA
     */
    CAPTCHA_THRESHOLD: 3,
    /**
     * Session timeout in seconds for inactive sessions
     */
    SESSION_TIMEOUT_SECONDS: 1800, // 30 minutes
    /**
     * Maximum concurrent sessions per user
     */
    MAX_CONCURRENT_SESSIONS: 5,
};
/**
 * Password security configurations
 */
export const PASSWORD_SECURITY = {
    /**
     * Minimum password length
     */
    MIN_LENGTH: 8,
    /**
     * Maximum password length
     */
    MAX_LENGTH: 128,
    /**
     * Number of previous passwords to prevent reuse
     */
    PREVENT_REUSE_COUNT: 5,
    /**
     * Maximum password age in days before expiry
     */
    MAX_AGE_DAYS: 90,
    /**
     * Minimum password age in days before allowing change
     */
    MIN_AGE_DAYS: 1,
    /**
     * Password history retention period in days
     */
    HISTORY_RETENTION_DAYS: 365,
    /**
     * Number of failed password attempts before notification
     */
    FAILURE_NOTIFICATION_THRESHOLD: 3,
    /**
     * Password complexity requirements
     */
    REQUIREMENTS: {
        MIN_LENGTH: 8,
        REQUIRES_UPPERCASE: true,
        REQUIRES_LOWERCASE: true,
        REQUIRES_NUMBER: true,
        REQUIRES_SPECIAL_CHAR: true,
        REQUIRES_TWO_FACTOR: true,
    },
};
/**
 * Two-factor authentication configurations
 */
export const TWO_FACTOR_SECURITY = {
    /**
     * Whether 2FA is required for all users
     */
    REQUIRED_FOR_ALL: false,
    /**
     * Whether 2FA is required for admin users
     */
    REQUIRED_FOR_ADMIN: true,
    /**
     * 2FA token expiry in seconds
     */
    TOKEN_EXPIRY_SECONDS: 300, // 5 minutes
    /**
     * Maximum 2FA verification attempts
     */
    MAX_VERIFICATION_ATTEMPTS: 3,
    /**
     * Time window for resending 2FA code in seconds
     */
    RESEND_COOLDOWN_SECONDS: 60,
    /**
     * Backup codes count for 2FA
     */
    BACKUP_CODES_COUNT: 10,
    /**
     * Backup codes used warning threshold
     */
    BACKUP_CODES_USAGE_WARNING: 3,
    /**
     * Supported 2FA methods
     */
    SUPPORTED_METHODS: {
        AUTHENTICATOR: 'authenticator',
        SMS: 'sms',
        EMAIL: 'email',
        BACKUP: 'backup',
    },
    /**
     * 2FA method priorities
     */
    METHOD_PRIORITY: {
        AUTHENTICATOR: 1,
        SMS: 2,
        EMAIL: 3,
        BACKUP: 4,
    },
};
/**
 * CSRF protection configurations
 */
export const CSRF_SECURITY = {
    /**
     * CSRF token length in characters
     */
    TOKEN_LENGTH: 32,
    /**
     * CSRF token expiry in seconds
     */
    TOKEN_EXPIRY_SECONDS: 3600, // 1 hour
    /**
     * Whether to rotate CSRF token on each request
     */
    ROTATE_ON_REQUEST: true,
    /**
     * Whether to rotate CSRF token on login
     */
    ROTATE_ON_LOGIN: true,
    /**
     * Maximum age of CSRF token in seconds before forced rotation
     */
    MAX_TOKEN_AGE_SECONDS: 86400, // 24 hours
    /**
     * Cookie name for CSRF token
     */
    COOKIE_NAME: 'csrf_token',
    /**
     * Header name for CSRF token
     */
    HEADER_NAME: 'X-CSRF-Token',
    /**
     * Form field name for CSRF token
     */
    FORM_FIELD_NAME: '_csrf',
};
/**
 * Rate limiting configurations
 */
export const RATE_LIMIT_SECURITY = {
    /**
     * General API rate limits
     */
    GENERAL: {
        WINDOW_MS: 60 * 1000, // 1 minute
        MAX_REQUESTS: 100,
    },
    /**
     * Authentication endpoints rate limits
     */
    AUTH: {
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        MAX_REQUESTS: 20,
    },
    /**
     * Registration endpoints rate limits
     */
    REGISTRATION: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 10,
    },
    /**
     * Password reset endpoints rate limits
     */
    PASSWORD_RESET: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 5,
    },
    /**
     * Email verification endpoints rate limits
     */
    EMAIL_VERIFICATION: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 5,
    },
    /**
     * API endpoints rate limits
     */
    API: {
        WINDOW_MS: 60 * 1000, // 1 minute
        MAX_REQUESTS: 60,
    },
    /**
     * Admin endpoints rate limits
     */
    ADMIN: {
        WINDOW_MS: 60 * 1000, // 1 minute
        MAX_REQUESTS: 30,
    },
    /**
     * Payment endpoints rate limits
     */
    PAYMENT: {
        WINDOW_MS: 60 * 1000, // 1 minute
        MAX_REQUESTS: 10,
    },
    /**
     * Bulk operations rate limits
     */
    BULK: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 50,
    },
};
/**
 * IP security configurations
 */
export const IP_SECURITY = {
    /**
     * IP block duration in minutes
     */
    BLOCK_DURATION_MINUTES: 60,
    /**
     * Maximum failed attempts from an IP before blocking
     */
    MAX_FAILED_ATTEMPTS: 10,
    /**
     * Time window in minutes for tracking IP attempts
     */
    ATTEMPT_WINDOW_MINUTES: 15,
    /**
     * Whitelisted IPs for bypassing rate limits
     */
    WHITELISTED_IPS: [],
    /**
     * Blacklisted IPs for immediate blocking
     */
    BLACKLISTED_IPS: [],
    /**
     * IP geolocation block list
     */
    GEOLOCATION_BLOCK_LIST: [],
    /**
     * Whether to enable IP geolocation blocking
     */
    ENABLE_GEOLOCATION_BLOCKING: false,
    /**
     * IP trust proxy headers
     */
    TRUST_PROXY_HEADERS: ['x-forwarded-for', 'x-real-ip', 'x-client-ip'],
    /**
     * IP anonymity detection
     */
    ANONYMITY_DETECTION: {
        ENABLED: true,
        VPN_DETECTION: true,
        PROXY_DETECTION: true,
        TOR_DETECTION: true,
    },
};
/**
 * Session security configurations
 */
export const SESSION_SECURITY = {
    /**
     * Session idle timeout in seconds
     */
    IDLE_TIMEOUT_SECONDS: 1800, // 30 minutes
    /**
     * Session absolute timeout in seconds
     */
    ABSOLUTE_TIMEOUT_SECONDS: 86400, // 24 hours
    /**
     * Session cookie security settings
     */
    COOKIE: {
        SECURE: true,
        HTTP_ONLY: true,
        SAME_SITE: 'lax',
        DOMAIN: '',
        PATH: '/',
        MAX_AGE: 86400, // 24 hours
    },
    /**
     * Session data encryption
     */
    ENCRYPTION: {
        ENABLED: true,
        ALGORITHM: 'aes-256-gcm',
        KEY_ROTATION_DAYS: 30,
    },
    /**
     * Session tracking
     */
    TRACKING: {
        IP_ADDRESS: true,
        USER_AGENT: true,
        DEVICE_FINGERPRINT: true,
        GEOLOCATION: false,
    },
    /**
     * Concurrent session limits
     */
    CONCURRENT_LIMITS: {
        MAX_CONCURRENT: 5,
        ENFORCE_SINGLE_SESSION: false,
        KICK_OLDEST_ON_NEW: true,
        NOTIFY_ON_NEW_SESSION: true,
    },
};
/**
 * JWT security configurations
 */
export const JWT_SECURITY = {
    /**
     * JWT signing algorithm
     */
    ALGORITHM: 'RS256',
    /**
     * Access token expiry in seconds
     */
    ACCESS_TOKEN_EXPIRY_SECONDS: 900, // 15 minutes
    /**
     * Refresh token expiry in seconds
     */
    REFRESH_TOKEN_EXPIRY_SECONDS: 604800, // 7 days
    /**
     * JWT issuer
     */
    ISSUER: 'my-app',
    /**
     * JWT audience
     */
    AUDIENCE: 'my-app-users',
    /**
     * Whether to include audience in token
     */
    INCLUDE_AUDIENCE: true,
    /**
     * Whether to include issuer in token
     */
    INCLUDE_ISSUER: true,
    /**
     * Whether to include issued at time in token
     */
    INCLUDE_IAT: true,
    /**
     * Whether to include not before time in token
     */
    INCLUDE_NBF: false,
    /**
     * Clock skew tolerance in seconds
     */
    CLOCK_SKEW_TOLERANCE_SECONDS: 30,
    /**
     * Token revocation
     */
    REVOCATION: {
        ENABLED: true,
        CACHE_TTL_SECONDS: 3600, // 1 hour
        REVOKE_ON_LOGOUT: true,
        REVOKE_ON_PASSWORD_CHANGE: true,
        REVOKE_ON_EMAIL_CHANGE: true,
    },
    /**
     * Token validation
     */
    VALIDATION: {
        REQUIRED_CLAIMS: ['sub', 'exp', 'iat', 'iss', 'aud'],
        ALLOWED_ALGORITHMS: ['RS256', 'ES256', 'HS256'],
        ENFORCE_SIGNATURE: true,
        ENFORCE_EXPIRY: true,
    },
};
/**
 * Security headers for HTTP responses
 */
export const SECURITY_HEADERS = {
    /**
     * Content Security Policy header
     */
    CSP: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';",
    /**
     * X-Content-Type-Options header
     */
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    /**
     * X-Frame-Options header
     */
    X_FRAME_OPTIONS: 'DENY',
    /**
     * X-XSS-Protection header
     */
    X_XSS_PROTECTION: '1; mode=block',
    /**
     * Referrer-Policy header
     */
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
    /**
     * Permissions-Policy header
     */
    PERMISSIONS_POLICY: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), battery=(), autoplay=()',
    /**
     * Strict-Transport-Security header
     */
    HSTS: 'max-age=31536000; includeSubDomains; preload',
    /**
     * X-Download-Options header
     */
    X_DOWNLOAD_OPTIONS: 'noopen',
    /**
     * X-Permitted-Cross-Domain-Policies header
     */
    X_PERMITTED_CROSS_DOMAIN_POLICIES: 'none',
    /**
     * Clear-Site-Data header
     */
    CLEAR_SITE_DATA: '"cache","cookies","storage"',
};
/**
 * Security event types for logging
 */
export const SECURITY_EVENTS = {
    /**
     * Authentication events
     */
    AUTH: {
        LOGIN_SUCCESS: 'auth.login.success',
        LOGIN_FAILURE: 'auth.login.failure',
        LOGOUT: 'auth.logout',
        REGISTER: 'auth.register',
        EMAIL_VERIFIED: 'auth.email.verified',
        EMAIL_VERIFICATION_RESENT: 'auth.email.resent',
        PASSWORD_RESET_REQUESTED: 'auth.password.reset.requested',
        PASSWORD_RESET_SUCCESS: 'auth.password.reset.success',
        PASSWORD_CHANGED: 'auth.password.changed',
    },
    /**
     * Account security events
     */
    ACCOUNT: {
        ACCOUNT_LOCKED: 'account.locked',
        ACCOUNT_UNLOCKED: 'account.unlocked',
        ACCOUNT_SUSPENDED: 'account.suspended',
        ACCOUNT_ACTIVATED: 'account.activated',
        ACCOUNT_DELETED: 'account.deleted',
        ACCOUNT_REACTIVATED: 'account.reactivated',
    },
    /**
     * IP security events
     */
    IP: {
        IP_BLOCKED: 'ip.blocked',
        IP_UNBLOCKED: 'ip.unblocked',
        SUSPICIOUS_IP: 'ip.suspicious',
        BLACKLISTED_IP: 'ip.blacklisted',
        WHITELISTED_IP: 'ip.whitelisted',
    },
    /**
     * Session security events
     */
    SESSION: {
        SESSION_CREATED: 'session.created',
        SESSION_EXPIRED: 'session.expired',
        SESSION_REVOKED: 'session.revoked',
        SESSION_REFRESHED: 'session.refreshed',
        SESSION_HIJACKED: 'session.hijacked',
    },
    /**
     * Rate limiting events
     */
    RATE_LIMIT: {
        RATE_LIMIT_HIT: 'rate.limit.hit',
        RATE_LIMIT_EXCEEDED: 'rate.limit.exceeded',
        RATE_LIMIT_RESET: 'rate.limit.reset',
    },
    /**
     * Security violation events
     */
    VIOLATION: {
        SUSPICIOUS_ACTIVITY: 'violation.suspicious.activity',
        BRUTE_FORCE_ATTEMPT: 'violation.brute.force',
        SQL_INJECTION_ATTEMPT: 'violation.sql.injection',
        XSS_ATTEMPT: 'violation.xss.attempt',
        CSRF_ATTEMPT: 'violation.csrf.attempt',
        DOS_ATTEMPT: 'violation.dos.attempt',
    },
    /**
     * Two-factor authentication events
     */
    TWO_FACTOR: {
        ENABLED: '2fa.enabled',
        DISABLED: '2fa.disabled',
        VERIFIED: '2fa.verified',
        FAILED: '2fa.failed',
        BACKUP_USED: '2fa.backup.used',
    },
    /**
     * Admin security events
     */
    ADMIN: {
        ADMIN_ACTION: 'admin.action.performed',
        ADMIN_LOGIN: 'admin.login',
        ADMIN_LOGOUT: 'admin.logout',
        PERMISSION_CHANGED: 'permission.changed',
        ROLE_CHANGED: 'role.changed',
    },
};
/**
 * Security levels for different operations
 */
export const SECURITY_LEVELS = {
    /**
     * Low security level - Public data
     */
    LOW: 'low',
    /**
     * Medium security level - User data
     */
    MEDIUM: 'medium',
    /**
     * High security level - Sensitive data
     */
    HIGH: 'high',
    /**
     * Critical security level - Financial data
     */
    CRITICAL: 'critical',
    /**
     * Maximum security level - System data
     */
    MAXIMUM: 'maximum',
};
/**
 * Security level requirements
 */
export const SECURITY_LEVEL_REQUIREMENTS = {
    low: {
        requires2FA: false,
        requiresStrongPassword: false,
        sessionTimeoutSeconds: 7200, // 2 hours
        maxAttempts: 10,
        ipWhitelistingRequired: false,
    },
    medium: {
        requires2FA: false,
        requiresStrongPassword: true,
        sessionTimeoutSeconds: 3600, // 1 hour
        maxAttempts: 5,
        ipWhitelistingRequired: false,
    },
    high: {
        requires2FA: true,
        requiresStrongPassword: true,
        sessionTimeoutSeconds: 1800, // 30 minutes
        maxAttempts: 3,
        ipWhitelistingRequired: false,
    },
    critical: {
        requires2FA: true,
        requiresStrongPassword: true,
        sessionTimeoutSeconds: 900, // 15 minutes
        maxAttempts: 3,
        ipWhitelistingRequired: true,
    },
    maximum: {
        requires2FA: true,
        requiresStrongPassword: true,
        sessionTimeoutSeconds: 300, // 5 minutes
        maxAttempts: 2,
        ipWhitelistingRequired: true,
    },
};
/**
 * Security breach response times
 */
export const SECURITY_BREACH_RESPONSE = {
    /**
     * Response time in minutes for critical breaches
     */
    CRITICAL_RESPONSE_TIME_MINUTES: 15,
    /**
     * Response time in minutes for high breaches
     */
    HIGH_RESPONSE_TIME_MINUTES: 30,
    /**
     * Response time in minutes for medium breaches
     */
    MEDIUM_RESPONSE_TIME_MINUTES: 60,
    /**
     * Response time in minutes for low breaches
     */
    LOW_RESPONSE_TIME_MINUTES: 120,
    /**
     * Notification time in minutes for all breaches
     */
    NOTIFICATION_TIME_MINUTES: 5,
    /**
     * Maximum breach handling time in hours
     */
    MAX_HANDLING_TIME_HOURS: 24,
};
/**
 * Encryption configurations
 */
export const ENCRYPTION_SECURITY = {
    /**
     * Data encryption algorithm
     */
    DATA_ALGORITHM: 'aes-256-gcm',
    /**
     * Key encryption algorithm
     */
    KEY_ALGORITHM: 'rsa-2048',
    /**
     * Hash algorithm
     */
    HASH_ALGORITHM: 'sha256',
    /**
     * Salt rounds for bcrypt
     */
    BCRYPT_SALT_ROUNDS: 12,
    /**
     * Minimum salt rounds for bcrypt
     */
    MIN_BCRYPT_SALT_ROUNDS: 10,
    /**
     * Maximum salt rounds for bcrypt
     */
    MAX_BCRYPT_SALT_ROUNDS: 15,
    /**
     * Encryption key rotation period in days
     */
    KEY_ROTATION_DAYS: 30,
    /**
     * Whether to encrypt sensitive data at rest
     */
    ENCRYPT_AT_REST: true,
    /**
     * Whether to encrypt sensitive data in transit
     */
    ENCRYPT_IN_TRANSIT: true,
};
/**
 * Audit logging security
 */
export const AUDIT_SECURITY = {
    /**
     * Audit log retention period in days
     */
    RETENTION_DAYS: 365,
    /**
     * Whether to log all security events
     */
    LOG_ALL_EVENTS: true,
    /**
     * Whether to log successful logins
     */
    LOG_SUCCESSFUL_LOGINS: true,
    /**
     * Whether to log failed logins
     */
    LOG_FAILED_LOGINS: true,
    /**
     * Whether to log admin actions
     */
    LOG_ADMIN_ACTIONS: true,
    /**
     * Whether to log user data changes
     */
    LOG_USER_DATA_CHANGES: true,
    /**
     * Whether to log API access
     */
    LOG_API_ACCESS: true,
    /**
     * Whether to log security violations
     */
    LOG_SECURITY_VIOLATIONS: true,
    /**
     * Audit log export format
     */
    EXPORT_FORMAT: 'json',
    /**
     * Maximum audit log size before rotation
     */
    MAX_LOG_SIZE_BYTES: 104857600, // 100 MB
};
/**
 * Default security configuration
 */
export const DEFAULT_SECURITY_CONFIG = {
    session: SESSION_SECURITY,
    jwt: JWT_SECURITY,
    rateLimit: RATE_LIMIT_SECURITY,
    csrf: CSRF_SECURITY,
    ip: IP_SECURITY,
    password: PASSWORD_SECURITY,
    twoFactor: TWO_FACTOR_SECURITY,
    headers: SECURITY_HEADERS,
    encryption: ENCRYPTION_SECURITY,
    audit: AUDIT_SECURITY,
};
/**
 * Error messages for security violations
 */
export const SECURITY_ERROR_MESSAGES = {
    ACCOUNT_LOCKED: 'Account is temporarily locked due to too many failed attempts',
    ACCOUNT_SUSPENDED: 'Account has been suspended for security reasons',
    IP_BLOCKED: 'Your IP address has been blocked due to suspicious activity',
    TOO_MANY_ATTEMPTS: 'Too many attempts, please try again later',
    SESSION_EXPIRED: 'Session has expired, please login again',
    SESSION_REVOKED: 'Session has been revoked for security reasons',
    INVALID_TOKEN: 'Invalid or expired token',
    TOKEN_MISSING: 'Authentication token is missing',
    PERMISSION_DENIED: 'Insufficient permissions for this action',
    CSRF_TOKEN_INVALID: 'Invalid CSRF token',
    TWO_FACTOR_REQUIRED: 'Two-factor authentication is required',
    TWO_FACTOR_INVALID: 'Invalid two-factor authentication code',
    PASSWORD_WEAK: 'Password does not meet security requirements',
    PASSWORD_EXPIRED: 'Password has expired and needs to be reset',
    SUSPICIOUS_ACTIVITY: 'Suspicious activity detected, action blocked',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded, please try again later',
    IP_BLOCKLISTED: 'Your IP address is blocklisted',
    UNTRUSTED_IP: 'Untrusted IP address detected',
    DEVICE_UNTRUSTED: 'Untrusted device detected',
    GEO_BLOCKED: 'Access from your location is blocked',
};
/**
 * Security warning messages
 */
export const SECURITY_WARNING_MESSAGES = {
    PASSWORD_WEAK: 'Your password is weak, please consider changing it',
    PASSWORD_OLD: 'Your password is old, please consider changing it',
    SESSION_NEAR_EXPIRY: 'Your session is about to expire',
    SUSPICIOUS_LOGIN_ATTEMPT: 'Suspicious login attempt detected from new device',
    MULTIPLE_FAILED_ATTEMPTS: 'Multiple failed login attempts detected',
    UNUSUAL_ACTIVITY: 'Unusual account activity detected',
    UNTRUSTED_DEVICE: 'Login from an untrusted device detected',
    NEW_IP_ADDRESS: 'Login from a new IP address detected',
};
/**
 * Security notification types
 */
export const SECURITY_NOTIFICATIONS = {
    ACCOUNT_LOCKED: 'account.locked',
    ACCOUNT_UNLOCKED: 'account.unlocked',
    PASSWORD_CHANGED: 'password.changed',
    PASSWORD_RESET: 'password.reset',
    NEW_DEVICE_LOGIN: 'new.device.login',
    NEW_IP_LOGIN: 'new.ip.login',
    SUSPICIOUS_ACTIVITY: 'suspicious.activity',
    TWO_FACTOR_ENABLED: 'two.factor.enabled',
    TWO_FACTOR_DISABLED: 'two.factor.disabled',
    SESSION_REVOKED: 'session.revoked',
    ADMIN_ACTION: 'admin.action',
    SECURITY_BREACH: 'security.breach',
};
//# sourceMappingURL=security.constants.js.map