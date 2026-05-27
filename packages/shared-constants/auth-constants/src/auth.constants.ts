/**
 * Auth Constants - Pure immutable authentication configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/auth-constants/auth.constants
 * 
 * RULES:
 * ✅ NO jwt.sign, bcrypt, login functions
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Cookie names for authentication
// ============================================================
export const AUTH_COOKIE_NAMES = Object.freeze({
  // Core auth cookies
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
  DEVICE_ID: 'device_id',
  
  // Security & tracking
  IDENTITY_TOKEN: 'identity_token',
  CSRF_TOKEN: 'csrf_token',
  STATE_TOKEN: 'state_token',
  
  // User preference
  REMEMBER_ME: 'remember_me',
  THEME: 'auth_theme',
  
  // MFA related
  MFA_PENDING: 'mfa_pending',
  TRUSTED_DEVICE: 'trusted_device',
} as const);

// ============================================================
// HTTP Header names for authentication
// ============================================================
export const AUTH_HEADERS = Object.freeze({
  // Standard auth headers
  AUTHORIZATION: 'authorization',
  BEARER: 'Bearer',
  API_KEY: 'x-api-key',
  
  // Session tracking
  SESSION: 'x-session-id',
  DEVICE_FINGERPRINT: 'x-device-fingerprint',
  DEVICE_ID: 'x-device-id',
  
  // Request tracking
  REQUEST_ID: 'x-request-id',
  CORRELATION_ID: 'x-correlation-id',
  
  // Client info
  CLIENT_VERSION: 'x-client-version',
  PLATFORM: 'x-platform',
  
  // MFA headers
  MFA_TOKEN: 'x-mfa-token',
  TRUST_TOKEN: 'x-trust-token',
} as const);

// ============================================================
// Authentication providers (Local + Bangladesh specific)
// ============================================================
export const AUTH_PROVIDERS = Object.freeze({
  // Traditional
  LOCAL: 'local',
  EMAIL: 'email',
  
  // Social (International)
  GOOGLE: 'google',
  GITHUB: 'github',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  
  // Phone based (CRITICAL for Bangladesh)
  PHONE: 'phone',
  PHONE_OTP: 'phone_otp',
  
  // Bangladesh specific mobile financial services (MFS)
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  
  // Other
  MAGIC_LINK: 'magic_link',
  QR_CODE: 'qr_code',
  WHATSAPP: 'whatsapp',
} as const);

// ============================================================
// Login methods (User experience focused)
// ============================================================
export const LOGIN_TYPES = Object.freeze({
  // Standard
  EMAIL_PASSWORD: 'email_password',
  PHONE_OTP: 'phone_otp',
  SOCIAL_OAUTH: 'social_oauth',
  MAGIC_LINK: 'magic_link',
  QR_CODE: 'qr_code',
  
  // Bangladesh specific
  BKASH_LOGIN: 'bkash_login',
  NAGAD_LOGIN: 'nagad_login',
  WHATSAPP_OTP: 'whatsapp_otp',
  
  // Enterprise features
  SSO: 'sso',
  API_KEY: 'api_key',
  SERVICE_ACCOUNT: 'service_account',
} as const);

// ============================================================
// Authentication statuses (State machine ready)
// ============================================================
export const AUTH_STATUS = Object.freeze({
  // Primary states
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  
  // Token states
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_INVALID: 'token_invalid',
  TOKEN_REFRESHING: 'token_refreshing',
  
  // Security states
  LOCKED: 'locked',
  SUSPENDED: 'suspended',
  DEACTIVATED: 'deactivated',
  
  // Pending states
  PENDING_MFA: 'pending_mfa',
  PENDING_VERIFICATION: 'pending_verification',
  PENDING_APPROVAL: 'pending_approval',
  PENDING_PHONE_VERIFICATION: 'pending_phone_verification',
  PENDING_EMAIL_VERIFICATION: 'pending_email_verification',
  
  // Session states
  SESSION_EXPIRED: 'session_expired',
  DEVICE_UNTRUSTED: 'device_untrusted',
  LOCATION_CHANGED: 'location_changed',
} as const);

// ============================================================
// Token expiry times (in seconds) - Production ready
// ============================================================
export const TOKEN_EXPIRY = Object.freeze({
  // Access tokens (Short lived for security)
  ACCESS_TOKEN: 900,              // 15 minutes
  ACCESS_TOKEN_REMEMBER_ME: 604800, // 7 days (if remember me checked)
  
  // Refresh tokens
  REFRESH_TOKEN: 604800,          // 7 days
  REFRESH_TOKEN_REMEMBER_ME: 2592000, // 30 days
  
  // Verification tokens
  EMAIL_VERIFICATION_TOKEN: 86400,    // 24 hours
  PHONE_VERIFICATION_TOKEN: 300,      // 5 minutes (Bangladesh standard)
  
  // Password related
  PASSWORD_RESET_TOKEN: 1800,         // 30 minutes
  PASSWORD_CHANGE_TOKEN: 900,         // 15 minutes
  
  // Magic link
  MAGIC_LINK_TOKEN: 300,              // 5 minutes
  
  // API & Service
  API_KEY: 31536000,                  // 365 days
  SERVICE_TOKEN: 3600,                // 1 hour
  
  // MFA related
  MFA_BACKUP_CODE: 31536000,          // 365 days
  MFA_OTP: 300,                       // 5 minutes
  TRUSTED_DEVICE_TOKEN: 2592000,      // 30 days
  
  // Session
  SESSION_IDLE_TIMEOUT: 1800,         // 30 minutes
  SESSION_ABSOLUTE_TIMEOUT: 43200,    // 12 hours
} as const);

// ============================================================
// Auth routes (Consistent across frontend & backend)
// ============================================================
export const AUTH_ROUTES = Object.freeze({
  // Core auth endpoints
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  
  // Email verification
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
  
  // Phone verification (Bangladesh specific)
  VERIFY_PHONE: '/auth/verify-phone',
  SEND_PHONE_OTP: '/auth/send-phone-otp',
  
  // Password management
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // MFA routes
  MFA_SETUP: '/auth/mfa/setup',
  MFA_VERIFY: '/auth/mfa/verify',
  MFA_RECOVERY: '/auth/mfa/recovery',
  MFA_DISABLE: '/auth/mfa/disable',
  MFA_BACKUP_CODES: '/auth/mfa/backup-codes',
  
  // Social auth
  SOCIAL_LOGIN: '/auth/social',
  SOCIAL_CALLBACK: '/auth/social/callback',
  
  // Bangladesh specific MFS auth
  BKASH_AUTH: '/auth/bkash',
  NAGAD_AUTH: '/auth/nagad',
  
  // Session management
  SESSIONS: '/auth/sessions',
  SESSION_REVOKE: '/auth/sessions/revoke',
  DEVICES: '/auth/devices',
  DEVICE_REVOKE: '/auth/devices/revoke',
  
  // Account management
  ACCOUNT_LINK: '/auth/account/link',
  ACCOUNT_UNLINK: '/auth/account/unlink',
  ACCOUNT_MERGE: '/auth/account/merge',
  ACCOUNT_DELETE: '/auth/account/delete',
  
  // Security
  SECURITY_LOG: '/auth/security-log',
  SUSPICIOUS_ACTIVITY: '/auth/suspicious-activity',
} as const);

// ============================================================
// Auth events (Event-driven architecture ready)
// ============================================================
export const AUTH_EVENTS = Object.freeze({
  // Login events
  LOGIN_SUCCESS: 'auth.login.success',
  LOGIN_FAILED: 'auth.login.failed',
  LOGIN_BLOCKED: 'auth.login.blocked',
  
  // Logout events
  LOGOUT: 'auth.logout',
  LOGOUT_ALL_DEVICES: 'auth.logout.all_devices',
  SESSION_EXPIRED: 'auth.session.expired',
  
  // Registration events
  REGISTER_SUCCESS: 'auth.register.success',
  REGISTER_FAILED: 'auth.register.failed',
  
  // Token events
  TOKEN_REFRESHED: 'auth.token.refreshed',
  TOKEN_REFRESH_FAILED: 'auth.token.refresh_failed',
  TOKEN_REVOKED: 'auth.token.revoked',
  
  // Password events
  PASSWORD_CHANGED: 'auth.password.changed',
  PASSWORD_RESET_REQUESTED: 'auth.password.reset.requested',
  PASSWORD_RESET_COMPLETED: 'auth.password.reset.completed',
  PASSWORD_RESET_FAILED: 'auth.password.reset.failed',
  
  // Verification events
  EMAIL_VERIFIED: 'auth.email.verified',
  EMAIL_VERIFICATION_FAILED: 'auth.email.verification_failed',
  PHONE_VERIFIED: 'auth.phone.verified',
  
  // MFA events
  MFA_ENABLED: 'auth.mfa.enabled',
  MFA_DISABLED: 'auth.mfa.disabled',
  MFA_VERIFIED: 'auth.mfa.verified',
  MFA_FAILED: 'auth.mfa.failed',
  MFA_BACKUP_CODE_USED: 'auth.mfa.backup_code_used',
  
  // Account security events
  ACCOUNT_LOCKED: 'auth.account.locked',
  ACCOUNT_UNLOCKED: 'auth.account.unlocked',
  ACCOUNT_SUSPENDED: 'auth.account.suspended',
  ACCOUNT_REACTIVATED: 'auth.account.reactivated',
  
  // Device & session events
  NEW_DEVICE_LOGIN: 'auth.device.new',
  UNKNOWN_DEVICE_LOGIN: 'auth.device.unknown',
  DEVICE_REMOVED: 'auth.device.removed',
  
  // Suspicious activity
  BRUTE_FORCE_DETECTED: 'auth.brute_force.detected',
  SUSPICIOUS_LOGIN: 'auth.suspicious.login',
  UNUSUAL_LOCATION: 'auth.unusual.location',
  
  // Account linking (for Bangladesh multi-platform)
  ACCOUNT_LINKED: 'auth.account.linked',
  ACCOUNT_UNLINKED: 'auth.account.unlinked',
} as const);

// ============================================================
// Account lockout policy (Security first)
// ============================================================
export const ACCOUNT_LOCKOUT = Object.freeze({
  // Brute force protection
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_SECONDS: 900,      // 15 minutes
  LOCKOUT_DURATION_INCREMENT: true,    // Increase lockout on repeated failures
  
  // Progressive lockout (Bangladesh best practice)
  LOCKOUT_LEVELS: {
    LEVEL_1: { attempts: 5, duration: 300 },   // 5 min
    LEVEL_2: { attempts: 10, duration: 900 },  // 15 min
    LEVEL_3: { attempts: 15, duration: 3600 }, // 1 hour
    LEVEL_4: { attempts: 20, duration: 86400 }, // 24 hours
  },
  
  // IP based tracking
  IP_BLOCK_DURATION: 3600,             // 1 hour
  IP_MAX_FAILED_ATTEMPTS: 50,          // Per hour
  
  // Notification settings
  NOTIFY_ON_LOCK: true,
  NOTIFY_ON_UNLOCK: true,
} as const);

// ============================================================
// Session concurrency control (Enterprise grade)
// ============================================================
export const SESSION_CONCURRENCY = Object.freeze({
  // Maximum concurrent sessions per role
  MAX_SESSIONS: {
    CUSTOMER: 5,
    SELLER: 3,
    ADMIN: 2,
    SUPER_ADMIN: 1,
  },
  
  // Strategy
  STRATEGY: 'allow_new_kill_oldest', // or 'block_new', 'prompt_user'
  
  // Session tracking
  TRACK_DEVICE_INFO: true,
  TRACK_IP_ADDRESS: true,
  TRACK_LOCATION: true,
  TRACK_USER_AGENT: true,
  
  // Idle timeout by role (seconds)
  IDLE_TIMEOUT: {
    CUSTOMER: 1800,     // 30 minutes
    SELLER: 900,        // 15 minutes
    ADMIN: 600,         // 10 minutes
    SUPER_ADMIN: 300,   // 5 minutes
  },
} as const);

// ============================================================
// Device fingerprinting (Security)
// ============================================================
export const DEVICE_TRUST = Object.freeze({
  // Trust duration
  TRUSTED_DEVICE_DURATION: 2592000,    // 30 days
  
  // Trust level
  TRUST_LEVELS: {
    FULLY_TRUSTED: 'fully_trusted',
    PARTIALLY_TRUSTED: 'partially_trusted',
    UNTRUSTED: 'untrusted',
    SUSPICIOUS: 'suspicious',
  },
  
  // What to track for fingerprint
  FINGERPRINT_COMPONENTS: {
    USER_AGENT: true,
    LANGUAGE: true,
    COLOR_DEPTH: true,
    SCREEN_RESOLUTION: true,
    TIMEZONE: true,
    PLATFORM: true,
    TOUCH_SUPPORT: true,
    DEVICE_MEMORY: true,
    HARDWARE_CONCURRENCY: true,
  },
} as const);

// ============================================================
// Rate limiting for auth endpoints (DDoS protection)
// ============================================================
export const AUTH_RATE_LIMITS = Object.freeze({
  // Per endpoint limits (requests per minute)
  LOGIN: 5,
  REGISTER: 3,
  FORGOT_PASSWORD: 3,
  RESET_PASSWORD: 5,
  SEND_OTP: 3,
  VERIFY_OTP: 5,
  REFRESH_TOKEN: 10,
  
  // Per IP limits
  PER_IP_LIMIT: 30,
  PER_IP_WINDOW: 60, // seconds
  
  // Per user limits (authenticated)
  PER_USER_LIMIT: 100,
  PER_USER_WINDOW: 60,
} as const);

// ============================================================
// OTP Configuration (Bangladesh standard)
// ============================================================
export const OTP_CONFIG = Object.freeze({
  // OTP format
  LENGTH: 6,                    // 6 digits (Bangladesh standard)
  DIGITS_ONLY: true,
  
  // Expiry
  EXPIRY_SECONDS: 300,          // 5 minutes (MFS standard)
  
  // Rate limits
  MAX_SEND_PER_HOUR: 5,
  MAX_VERIFY_ATTEMPTS: 3,
  
  // Resend cooldown
  RESEND_COOLDOWN_SECONDS: 30,
  
  // Providers
  PROVIDERS: {
    SMS: 'sms',
    WHATSAPP: 'whatsapp',
    EMAIL: 'email',
    VOICE: 'voice',
  },
} as const);
