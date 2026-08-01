/**
 * Authentication constants for the monorepo
 * All authentication-related constants are centralized here
 */
/**
 * Cookie names used for authentication
 */
export declare const AUTH_COOKIE_NAMES: {
    readonly ACCESS_TOKEN: "access_token";
    readonly REFRESH_TOKEN: "refresh_token";
    readonly SESSION_ID: "session_id";
    readonly CSRF_TOKEN: "csrf_token";
};
/**
 * Token expiry configurations
 */
export declare const TOKEN_EXPIRY: {
    readonly ACCESS_TOKEN: 900;
    readonly REFRESH_TOKEN: 604800;
    readonly SESSION: 3600;
    readonly EMAIL_VERIFICATION: 86400;
    readonly PASSWORD_RESET: 1800;
};
/**
 * Password policy requirements
 */
export declare const PASSWORD_POLICY: {
    readonly MIN_LENGTH: 8;
    readonly MAX_LENGTH: 128;
    readonly REQUIRE_UPPERCASE: true;
    readonly REQUIRE_LOWERCASE: true;
    readonly REQUIRE_NUMBER: true;
    readonly REQUIRE_SPECIAL_CHAR: true;
    readonly SPECIAL_CHARS: "!@#$%^&*()_+-=[]{}|;:,.<>?";
};
/**
 * User account status types
 */
export declare const USER_STATUS: {
    readonly PENDING_VERIFICATION: "pending_verification";
    readonly ACTIVE: "active";
    readonly SUSPENDED: "suspended";
    readonly DEACTIVATED: "deactivated";
    readonly DELETED: "deleted";
};
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
/**
 * Login attempt configurations
 */
export declare const LOGIN_ATTEMPT: {
    readonly LIMIT: 5;
    readonly LOCK_DURATION_MINUTES: 15;
    readonly RESET_ATTEMPTS_AFTER_MINUTES: 30;
};
/**
 * Session configuration
 */
export declare const SESSION_CONFIG: {
    readonly REMEMBER_ME_DAYS: 30;
    readonly TTL_SECONDS: 3600;
    readonly EXTEND_ON_ACTIVITY: true;
    readonly MAX_CONCURRENT_SESSIONS: 5;
};
/**
 * Token refresh configurations
 */
export declare const REFRESH_TOKEN_CONFIG: {
    readonly ROTATION_ENABLED: true;
    readonly REUSE_INTERVAL_SECONDS: 60;
    readonly MAX_AGE_DAYS: 30;
    readonly REVOKE_ON_PASSWORD_CHANGE: true;
};
/**
 * Logout session types
 */
export declare const LOGOUT_SESSION_TYPES: {
    readonly CURRENT: "current";
    readonly ALL: "all";
    readonly EXCEPT_CURRENT: "except_current";
};
export type LogoutSessionType = (typeof LOGOUT_SESSION_TYPES)[keyof typeof LOGOUT_SESSION_TYPES];
/**
 * Logout reasons
 */
export declare const LOGOUT_REASONS: {
    readonly USER_INITIATED: "user_initiated";
    readonly SESSION_EXPIRED: "session_expired";
    readonly ADMIN_REVOKED: "admin_revoked";
    readonly PASSWORD_CHANGED: "password_changed";
    readonly DEVICE_CHANGED: "device_changed";
};
export type LogoutReason = (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS];
/**
 * Email verification configurations
 */
export declare const EMAIL_VERIFICATION_CONFIG: {
    readonly TOKEN_EXPIRY_HOURS: 24;
    readonly MAX_RESEND_ATTEMPTS: 3;
    readonly RESEND_COOLDOWN_SECONDS: 120;
    readonly REQUIRED_FOR_REGISTRATION: true;
};
/**
 * Password reset configurations
 */
export declare const PASSWORD_RESET_CONFIG: {
    readonly TOKEN_EXPIRY_MINUTES: 30;
    readonly MAX_REQUESTS_PER_DAY: 3;
    readonly COOLDOWN_MINUTES: 15;
    readonly REQUIRE_CURRENT_PASSWORD: true;
};
/**
 * Profile management configurations
 */
export declare const PROFILE_CONFIG: {
    readonly UPDATE_COOLDOWN_MINUTES: 5;
    readonly ACCOUNT_DELETION_GRACE_PERIOD_DAYS: 30;
    readonly MAX_PROFILE_IMAGE_SIZE_MB: 5;
    readonly ALLOWED_IMAGE_TYPES: readonly ["image/jpeg", "image/png", "image/webp"];
};
/**
 * Registration configurations
 */
export declare const REGISTRATION_CONFIG: {
    readonly ALLOW_REGISTRATION: true;
    readonly REQUIRES_EMAIL_VERIFICATION: true;
    readonly REQUIRES_TERMS_ACCEPTANCE: true;
    readonly MIN_AGE_REQUIRED: 13;
    readonly DISALLOWED_EMAIL_DOMAINS: readonly ["tempmail.com", "throwaway.com"];
};
/**
 * CSRF protection configurations
 */
export declare const CSRF_CONFIG: {
    readonly TOKEN_LENGTH: 32;
    readonly TOKEN_EXPIRY_SECONDS: 3600;
    readonly ROTATE_ON_LOGIN: true;
};
/**
 * Rate limiting configurations for auth endpoints
 */
export declare const RATE_LIMIT_CONFIG: {
    readonly LOGIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 20;
    };
    readonly REGISTER: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
    readonly PASSWORD_RESET: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    readonly EMAIL_VERIFICATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
};
/**
 * Error messages for authentication
 */
export declare const AUTH_ERROR_MESSAGES: {
    readonly INVALID_CREDENTIALS: "Invalid email or password";
    readonly ACCOUNT_LOCKED: "Account is temporarily locked due to too many failed attempts";
    readonly ACCOUNT_SUSPENDED: "Account has been suspended";
    readonly ACCOUNT_DEACTIVATED: "Account has been deactivated";
    readonly EMAIL_NOT_VERIFIED: "Please verify your email address first";
    readonly TOKEN_EXPIRED: "Token has expired";
    readonly TOKEN_INVALID: "Invalid token";
    readonly SESSION_EXPIRED: "Session has expired";
    readonly PASSWORD_RESET_REQUIRED: "Password reset is required";
    readonly EMAIL_ALREADY_EXISTS: "Email already exists";
    readonly EMAIL_DOMAIN_BLOCKED: "Email domain is not allowed";
    readonly RATE_LIMIT_EXCEEDED: "Too many requests, please try again later";
    readonly INVALID_CURRENT_PASSWORD: "Current password is incorrect";
    readonly PASSWORD_TOO_WEAK: "Password does not meet security requirements";
    readonly ACCOUNT_DELETION_GRACE_PERIOD: "Account is in grace period and cannot be reactivated";
};
export type AuthErrorMessage = (typeof AUTH_ERROR_MESSAGES)[keyof typeof AUTH_ERROR_MESSAGES];
/**
 * Success messages for authentication
 */
export declare const AUTH_SUCCESS_MESSAGES: {
    readonly LOGIN_SUCCESS: "Login successful";
    readonly REGISTRATION_SUCCESS: "Registration successful";
    readonly EMAIL_VERIFIED: "Email verified successfully";
    readonly PASSWORD_RESET_SUCCESS: "Password reset successful";
    readonly PASSWORD_CHANGE_SUCCESS: "Password changed successfully";
    readonly PROFILE_UPDATE_SUCCESS: "Profile updated successfully";
    readonly ACCOUNT_DELETED: "Account deleted successfully";
    readonly LOGOUT_SUCCESS: "Logout successful";
    readonly TOKEN_REFRESHED: "Token refreshed successfully";
};
export type AuthSuccessMessage = (typeof AUTH_SUCCESS_MESSAGES)[keyof typeof AUTH_SUCCESS_MESSAGES];
/**
 * Authentication routes
 */
export declare const AUTH_ROUTES: {
    readonly LOGIN: "/api/auth/login";
    readonly REGISTER: "/api/auth/register";
    readonly LOGOUT: "/api/auth/logout";
    readonly REFRESH_TOKEN: "/api/auth/refresh";
    readonly VERIFY_EMAIL: "/api/auth/verify-email";
    readonly RESEND_VERIFICATION: "/api/auth/resend-verification";
    readonly FORGOT_PASSWORD: "/api/auth/forgot-password";
    readonly RESET_PASSWORD: "/api/auth/reset-password";
    readonly CHANGE_PASSWORD: "/api/auth/change-password";
    readonly PROFILE: "/api/auth/profile";
    readonly DELETE_ACCOUNT: "/api/auth/delete-account";
    readonly SESSIONS: "/api/auth/sessions";
    readonly REVOKE_SESSION: "/api/auth/sessions/revoke";
    readonly CSRF_TOKEN: "/api/auth/csrf-token";
};
export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
/**
 * Authentication HTTP status codes
 */
export declare const AUTH_STATUS_CODES: {
    readonly ACCOUNT_LOCKED: 423;
    readonly EMAIL_NOT_VERIFIED: 403;
    readonly TOKEN_EXPIRED: 401;
    readonly INVALID_CREDENTIALS: 401;
    readonly ACCOUNT_SUSPENDED: 403;
    readonly RATE_LIMIT_EXCEEDED: 429;
    readonly PASSWORD_RESET_REQUIRED: 403;
    readonly ACCOUNT_DELETION_GRACE: 403;
};
export type AuthStatusCode = (typeof AUTH_STATUS_CODES)[keyof typeof AUTH_STATUS_CODES];
/**
 * JWT claims
 */
export interface JWTClaims {
    userId: string;
    email: string;
    roles: string[];
    permissions: string[];
    sessionId: string;
    deviceId?: string;
    iat: number;
    exp: number;
    iss: string;
    aud: string;
}
/**
 * Session data interface
 */
export interface SessionData {
    id: string;
    userId: string;
    deviceInfo: DeviceInfo;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
    expiresAt: Date;
    lastActivityAt: Date;
    isRevoked: boolean;
}
/**
 * Device information interface
 */
export interface DeviceInfo {
    deviceId: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'other';
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
}
/**
 * Login attempt interface
 */
export interface LoginAttempt {
    email: string;
    timestamp: Date;
    success: boolean;
    ipAddress: string;
    userAgent: string;
    failureReason?: string;
}
/**
 * Token payload interface
 */
export interface TokenPayload {
    userId: string;
    email: string;
    sessionId: string;
    type: 'access' | 'refresh' | 'email_verification' | 'password_reset';
    expiresAt: Date;
    issuedAt: Date;
}
/**
 * Email verification data interface
 */
export interface EmailVerificationData {
    userId: string;
    email: string;
    token: string;
    expiresAt: Date;
    attempts: number;
    lastResendAt?: Date;
}
/**
 * Password reset data interface
 */
export interface PasswordResetData {
    userId: string;
    email: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    usedAt?: Date;
    revokedAt?: Date;
}
/**
 * Auth configuration interface
 */
export interface AuthConfig {
    jwtSecret: string;
    jwtIssuer: string;
    jwtAudience: string;
    cookieSecure: boolean;
    cookieHttpOnly: boolean;
    cookieSameSite: 'strict' | 'lax' | 'none';
    cookieDomain?: string;
    cookiePath: string;
    bcryptSaltRounds: number;
    sessionStore: 'memory' | 'redis' | 'database';
}
/**
 * Auth configuration defaults
 */
export declare const AUTH_CONFIG_DEFAULTS: Omit<AuthConfig, 'jwtSecret'>;
/**
 * Permission constants
 */
export declare const PERMISSIONS: {
    readonly AUTH_READ: "auth:read";
    readonly AUTH_WRITE: "auth:write";
    readonly AUTH_DELETE: "auth:delete";
    readonly AUTH_ADMIN: "auth:admin";
    readonly USER_READ: "user:read";
    readonly USER_WRITE: "user:write";
    readonly USER_DELETE: "user:delete";
    readonly USER_ADMIN: "user:admin";
    readonly SESSION_READ: "session:read";
    readonly SESSION_WRITE: "session:write";
    readonly SESSION_DELETE: "session:delete";
};
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
/**
 * Role constants
 */
export declare const ROLES: {
    readonly USER: "user";
    readonly ADMIN: "admin";
    readonly SUPER_ADMIN: "super_admin";
    readonly MODERATOR: "moderator";
    readonly GUEST: "guest";
};
export type Role = (typeof ROLES)[keyof typeof ROLES];
/**
 * Role to permissions mapping
 */
export declare const ROLE_PERMISSIONS: Record<Role, Permission[]>;
/**
 * Security headers for auth routes
 */
export declare const AUTH_SECURITY_HEADERS: {
    readonly 'X-Content-Type-Options': "nosniff";
    readonly 'X-Frame-Options': "DENY";
    readonly 'X-XSS-Protection': "1; mode=block";
    readonly 'Referrer-Policy': "strict-origin-when-cross-origin";
    readonly 'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
};
/**
 * Auth event types for logging
 */
export declare const AUTH_EVENTS: {
    readonly LOGIN_SUCCESS: "auth.login.success";
    readonly LOGIN_FAILURE: "auth.login.failure";
    readonly LOGOUT: "auth.logout";
    readonly REGISTER: "auth.register";
    readonly EMAIL_VERIFIED: "auth.email.verified";
    readonly EMAIL_VERIFICATION_RESENT: "auth.email.resent";
    readonly PASSWORD_RESET_REQUESTED: "auth.password.reset.requested";
    readonly PASSWORD_RESET_SUCCESS: "auth.password.reset.success";
    readonly PASSWORD_CHANGED: "auth.password.changed";
    readonly PROFILE_UPDATED: "auth.profile.updated";
    readonly ACCOUNT_DELETED: "auth.account.deleted";
    readonly SESSION_REVOKED: "auth.session.revoked";
    readonly TOKEN_REFRESHED: "auth.token.refreshed";
    readonly ACCOUNT_LOCKED: "auth.account.locked";
    readonly ACCOUNT_UNLOCKED: "auth.account.unlocked";
    readonly RATE_LIMIT_HIT: "auth.rate.limit.hit";
};
export type AuthEvent = (typeof AUTH_EVENTS)[keyof typeof AUTH_EVENTS];
//# sourceMappingURL=auth.constants.d.ts.map