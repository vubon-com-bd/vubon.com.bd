/**
 * Authentication constants for the monorepo
 * All authentication-related constants are centralized here
 */
/**
 * Cookie names used for authentication
 */
export const AUTH_COOKIE_NAMES = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    SESSION_ID: 'session_id',
    CSRF_TOKEN: 'csrf_token',
};
/**
 * Token expiry configurations
 */
export const TOKEN_EXPIRY = {
    ACCESS_TOKEN: 900, // 15 minutes in seconds
    REFRESH_TOKEN: 604800, // 7 days in seconds
    SESSION: 3600, // 1 hour in seconds
    EMAIL_VERIFICATION: 86400, // 24 hours in seconds
    PASSWORD_RESET: 1800, // 30 minutes in seconds
};
/**
 * Password policy requirements
 */
export const PASSWORD_POLICY = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};
/**
 * User account status types
 */
export const USER_STATUS = {
    PENDING_VERIFICATION: 'pending_verification',
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
    DEACTIVATED: 'deactivated',
    DELETED: 'deleted',
};
/**
 * Login attempt configurations
 */
export const LOGIN_ATTEMPT = {
    LIMIT: 5,
    LOCK_DURATION_MINUTES: 15,
    RESET_ATTEMPTS_AFTER_MINUTES: 30,
};
/**
 * Session configuration
 */
export const SESSION_CONFIG = {
    REMEMBER_ME_DAYS: 30,
    TTL_SECONDS: 3600,
    EXTEND_ON_ACTIVITY: true,
    MAX_CONCURRENT_SESSIONS: 5,
};
/**
 * Token refresh configurations
 */
export const REFRESH_TOKEN_CONFIG = {
    ROTATION_ENABLED: true,
    REUSE_INTERVAL_SECONDS: 60,
    MAX_AGE_DAYS: 30,
    REVOKE_ON_PASSWORD_CHANGE: true,
};
/**
 * Logout session types
 */
export const LOGOUT_SESSION_TYPES = {
    CURRENT: 'current',
    ALL: 'all',
    EXCEPT_CURRENT: 'except_current',
};
/**
 * Logout reasons
 */
export const LOGOUT_REASONS = {
    USER_INITIATED: 'user_initiated',
    SESSION_EXPIRED: 'session_expired',
    ADMIN_REVOKED: 'admin_revoked',
    PASSWORD_CHANGED: 'password_changed',
    DEVICE_CHANGED: 'device_changed',
};
/**
 * Email verification configurations
 */
export const EMAIL_VERIFICATION_CONFIG = {
    TOKEN_EXPIRY_HOURS: 24,
    MAX_RESEND_ATTEMPTS: 3,
    RESEND_COOLDOWN_SECONDS: 120,
    REQUIRED_FOR_REGISTRATION: true,
};
/**
 * Password reset configurations
 */
export const PASSWORD_RESET_CONFIG = {
    TOKEN_EXPIRY_MINUTES: 30,
    MAX_REQUESTS_PER_DAY: 3,
    COOLDOWN_MINUTES: 15,
    REQUIRE_CURRENT_PASSWORD: true,
};
/**
 * Profile management configurations
 */
export const PROFILE_CONFIG = {
    UPDATE_COOLDOWN_MINUTES: 5,
    ACCOUNT_DELETION_GRACE_PERIOD_DAYS: 30,
    MAX_PROFILE_IMAGE_SIZE_MB: 5,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};
/**
 * Registration configurations
 */
export const REGISTRATION_CONFIG = {
    ALLOW_REGISTRATION: true,
    REQUIRES_EMAIL_VERIFICATION: true,
    REQUIRES_TERMS_ACCEPTANCE: true,
    MIN_AGE_REQUIRED: 13,
    DISALLOWED_EMAIL_DOMAINS: ['tempmail.com', 'throwaway.com'],
};
/**
 * CSRF protection configurations
 */
export const CSRF_CONFIG = {
    TOKEN_LENGTH: 32,
    TOKEN_EXPIRY_SECONDS: 3600,
    ROTATE_ON_LOGIN: true,
};
/**
 * Rate limiting configurations for auth endpoints
 */
export const RATE_LIMIT_CONFIG = {
    LOGIN: {
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        MAX_REQUESTS: 20,
    },
    REGISTER: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 10,
    },
    PASSWORD_RESET: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 5,
    },
    EMAIL_VERIFICATION: {
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
        MAX_REQUESTS: 5,
    },
};
/**
 * Error messages for authentication
 */
export const AUTH_ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_LOCKED: 'Account is temporarily locked due to too many failed attempts',
    ACCOUNT_SUSPENDED: 'Account has been suspended',
    ACCOUNT_DEACTIVATED: 'Account has been deactivated',
    EMAIL_NOT_VERIFIED: 'Please verify your email address first',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    SESSION_EXPIRED: 'Session has expired',
    PASSWORD_RESET_REQUIRED: 'Password reset is required',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    EMAIL_DOMAIN_BLOCKED: 'Email domain is not allowed',
    RATE_LIMIT_EXCEEDED: 'Too many requests, please try again later',
    INVALID_CURRENT_PASSWORD: 'Current password is incorrect',
    PASSWORD_TOO_WEAK: 'Password does not meet security requirements',
    ACCOUNT_DELETION_GRACE_PERIOD: 'Account is in grace period and cannot be reactivated',
};
/**
 * Success messages for authentication
 */
export const AUTH_SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    REGISTRATION_SUCCESS: 'Registration successful',
    EMAIL_VERIFIED: 'Email verified successfully',
    PASSWORD_RESET_SUCCESS: 'Password reset successful',
    PASSWORD_CHANGE_SUCCESS: 'Password changed successfully',
    PROFILE_UPDATE_SUCCESS: 'Profile updated successfully',
    ACCOUNT_DELETED: 'Account deleted successfully',
    LOGOUT_SUCCESS: 'Logout successful',
    TOKEN_REFRESHED: 'Token refreshed successfully',
};
/**
 * Authentication routes
 */
export const AUTH_ROUTES = {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_VERIFICATION: '/api/auth/resend-verification',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
    PROFILE: '/api/auth/profile',
    DELETE_ACCOUNT: '/api/auth/delete-account',
    SESSIONS: '/api/auth/sessions',
    REVOKE_SESSION: '/api/auth/sessions/revoke',
    CSRF_TOKEN: '/api/auth/csrf-token',
};
/**
 * Authentication HTTP status codes
 */
export const AUTH_STATUS_CODES = {
    ACCOUNT_LOCKED: 423,
    EMAIL_NOT_VERIFIED: 403,
    TOKEN_EXPIRED: 401,
    INVALID_CREDENTIALS: 401,
    ACCOUNT_SUSPENDED: 403,
    RATE_LIMIT_EXCEEDED: 429,
    PASSWORD_RESET_REQUIRED: 403,
    ACCOUNT_DELETION_GRACE: 403,
};
/**
 * Auth configuration defaults
 */
export const AUTH_CONFIG_DEFAULTS = {
    jwtIssuer: 'my-app',
    jwtAudience: 'my-app-users',
    cookieSecure: process.env.NODE_ENV === 'production',
    cookieHttpOnly: true,
    cookieSameSite: 'lax',
    cookiePath: '/',
    bcryptSaltRounds: 12,
    sessionStore: 'database',
};
/**
 * Permission constants
 */
export const PERMISSIONS = {
    AUTH_READ: 'auth:read',
    AUTH_WRITE: 'auth:write',
    AUTH_DELETE: 'auth:delete',
    AUTH_ADMIN: 'auth:admin',
    USER_READ: 'user:read',
    USER_WRITE: 'user:write',
    USER_DELETE: 'user:delete',
    USER_ADMIN: 'user:admin',
    SESSION_READ: 'session:read',
    SESSION_WRITE: 'session:write',
    SESSION_DELETE: 'session:delete',
};
/**
 * Role constants
 */
export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    MODERATOR: 'moderator',
    GUEST: 'guest',
};
/**
 * Role to permissions mapping
 */
export const ROLE_PERMISSIONS = {
    guest: [PERMISSIONS.AUTH_READ],
    user: [PERMISSIONS.AUTH_READ, PERMISSIONS.USER_READ, PERMISSIONS.USER_WRITE],
    moderator: [
        PERMISSIONS.AUTH_READ,
        PERMISSIONS.AUTH_WRITE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_WRITE,
        PERMISSIONS.SESSION_READ,
        PERMISSIONS.SESSION_WRITE,
    ],
    admin: [
        PERMISSIONS.AUTH_READ,
        PERMISSIONS.AUTH_WRITE,
        PERMISSIONS.AUTH_DELETE,
        PERMISSIONS.USER_READ,
        PERMISSIONS.USER_WRITE,
        PERMISSIONS.USER_DELETE,
        PERMISSIONS.SESSION_READ,
        PERMISSIONS.SESSION_WRITE,
        PERMISSIONS.SESSION_DELETE,
    ],
    super_admin: Object.values(PERMISSIONS),
};
/**
 * Security headers for auth routes
 */
export const AUTH_SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
};
/**
 * Auth event types for logging
 */
export const AUTH_EVENTS = {
    LOGIN_SUCCESS: 'auth.login.success',
    LOGIN_FAILURE: 'auth.login.failure',
    LOGOUT: 'auth.logout',
    REGISTER: 'auth.register',
    EMAIL_VERIFIED: 'auth.email.verified',
    EMAIL_VERIFICATION_RESENT: 'auth.email.resent',
    PASSWORD_RESET_REQUESTED: 'auth.password.reset.requested',
    PASSWORD_RESET_SUCCESS: 'auth.password.reset.success',
    PASSWORD_CHANGED: 'auth.password.changed',
    PROFILE_UPDATED: 'auth.profile.updated',
    ACCOUNT_DELETED: 'auth.account.deleted',
    SESSION_REVOKED: 'auth.session.revoked',
    TOKEN_REFRESHED: 'auth.token.refreshed',
    ACCOUNT_LOCKED: 'auth.account.locked',
    ACCOUNT_UNLOCKED: 'auth.account.unlocked',
    RATE_LIMIT_HIT: 'auth.rate.limit.hit',
};
//# sourceMappingURL=auth.constants.js.map