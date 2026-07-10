/**
 * Auth Constants - Pure immutable authentication configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/auth.constants
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
export const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_ID: 'session_id',
  DEVICE_ID: 'device_id',
  IDENTITY_TOKEN: 'identity_token',
  CSRF_TOKEN: 'csrf_token',
  STATE_TOKEN: 'state_token',
  REMEMBER_ME: 'remember_me',
  THEME: 'auth_theme',
  MFA_PENDING: 'mfa_pending',
  TRUSTED_DEVICE: 'trusted_device',
} as const;


// auth.constants.ts
export const LOGOUT_SCOPE = {
  CURRENT: 'current',
  ALL: 'all',
  SESSION: 'session',
  DEVICE: 'device',
  EXCEPT_CURRENT: 'except_current',
} as const;

export const ERROR_CODES = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  // ... অন্যান্য
} as const;
// ============================================================
// HTTP Header names for authentication
// ============================================================
export const AUTH_HEADERS = {
  AUTHORIZATION: 'authorization',
  BEARER: 'Bearer',
  API_KEY: 'x-api-key',
  SESSION: 'x-session-id',
  DEVICE_FINGERPRINT: 'x-device-fingerprint',
  DEVICE_ID: 'x-device-id',
  REQUEST_ID: 'x-request-id',
  CORRELATION_ID: 'x-correlation-id',
  CLIENT_VERSION: 'x-client-version',
  PLATFORM: 'x-platform',
  MFA_TOKEN: 'x-mfa-token',
  TRUST_TOKEN: 'x-trust-token',
} as const;

// ============================================================
// Authentication providers (Local + Bangladesh specific)
// ============================================================
export const AUTH_PROVIDERS = {
  LOCAL: 'local',
  EMAIL: 'email',
  GOOGLE: 'google',
  GITHUB: 'github',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  PHONE: 'phone',
  PHONE_OTP: 'phone_otp',
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  MAGIC_LINK: 'magic_link',
  QR_CODE: 'qr_code',
  WHATSAPP: 'whatsapp',
} as const;

// ============================================================
// Login methods (User experience focused)
// ============================================================
export const LOGIN_TYPES = {
  EMAIL_PASSWORD: 'email_password',
  PHONE_OTP: 'phone_otp',
  SOCIAL_OAUTH: 'social_oauth',
  MAGIC_LINK: 'magic_link',
  QR_CODE: 'qr_code',
  BKASH_LOGIN: 'bkash_login',
  NAGAD_LOGIN: 'nagad_login',
  WHATSAPP_OTP: 'whatsapp_otp',
  SSO: 'sso',
  API_KEY: 'api_key',
  SERVICE_ACCOUNT: 'service_account',
} as const;

// ============================================================
// Authentication statuses (State machine ready)
// ============================================================
export const AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  TOKEN_EXPIRED: 'token_expired',
  TOKEN_INVALID: 'token_invalid',
  TOKEN_REFRESHING: 'token_refreshing',
  LOCKED: 'locked',
  SUSPENDED: 'suspended',
  DEACTIVATED: 'deactivated',
  PENDING_MFA: 'pending_mfa',
  PENDING_VERIFICATION: 'pending_verification',
  PENDING_APPROVAL: 'pending_approval',
  PENDING_PHONE_VERIFICATION: 'pending_phone_verification',
  PENDING_EMAIL_VERIFICATION: 'pending_email_verification',
  SESSION_EXPIRED: 'session_expired',
  DEVICE_UNTRUSTED: 'device_untrusted',
  LOCATION_CHANGED: 'location_changed',
} as const;

// ============================================================
// User Status (For account state management)
// ============================================================
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  PENDING_VERIFICATION: 'pending_verification',
  PENDING_APPROVAL: 'pending_approval',
  DEACTIVATED: 'deactivated',
  LOCKED: 'locked',
} as const;

// ============================================================
// User Tier (Loyalty program - Bangladesh e-commerce)
// ============================================================
export const USER_TIER = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
} as const;

// ============================================================
// Token expiry times (in seconds) - Production ready
// ============================================================
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 900,
  ACCESS_TOKEN_REMEMBER_ME: 604800,
  REFRESH_TOKEN: 604800,
  REFRESH_TOKEN_REMEMBER_ME: 2592000,
  EMAIL_VERIFICATION_TOKEN: 86400,
  PHONE_VERIFICATION_TOKEN: 300,
  PASSWORD_RESET_TOKEN: 1800,
  PASSWORD_CHANGE_TOKEN: 900,
  MAGIC_LINK_TOKEN: 300,
  API_KEY: 31536000,
  SERVICE_TOKEN: 3600,
  MFA_BACKUP_CODE: 31536000,
  MFA_OTP: 300,
  TRUSTED_DEVICE_TOKEN: 2592000,
  SESSION_IDLE_TIMEOUT: 1800,
  SESSION_ABSOLUTE_TIMEOUT: 43200,
} as const;

// ============================================================
// Password Policy Configuration
// ============================================================
export const PASSWORD_POLICY = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SYMBOLS: true,
  SYMBOLS_ALLOWED: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  DISALLOW_COMMON_PASSWORDS: true,
  DISALLOW_USER_INFO_IN_PASSWORD: true,
  MAX_REPEATED_CHARS: 3,
  MAX_SEQUENTIAL_CHARS: 3,
  
  // Common passwords blocklist (partial)
  COMMON_PASSWORDS: [
    'password123', '12345678', 'qwerty123', 
    'admin123', 'bangladesh123', 'dhaka123',
  ],
} as const;

// ============================================================
// Identity Validation (Email & Phone)
// ============================================================
export const IDENTITY_VALIDATION = {
  EMAIL: {
    MAX_LENGTH: 254,
    ALLOW_DISPOSABLE: false,
    ALLOW_SUBADDRESSING: false,
    DOMAIN_BLOCKLIST: [
      'tempmail.com',
      '10minutemail.com',
      'throwawaymail.com',
      'guerrillamail.com',
    ],
    ALLOWED_DOMAINS: [], // Empty = allow all
  },
  PHONE: {
    COUNTRY_CODE: 'BD',
    ALLOWED_CODES: ['+880', '01'],
    MIN_LENGTH: 11,
    MAX_LENGTH: 14,
    FORMAT: '^01[3-9]\\d{8}$', // Bangladesh mobile format
    ALLOW_LANDLINE: false,
  },
} as const;

// ============================================================
// Brute Force Protection Configuration
// ============================================================
export const BRUTE_FORCE_PROTECTION = {
  GLOBAL_MAX_ATTEMPTS_PER_HOUR: 1000,
  
  ENDPOINTS: {
    LOGIN: { maxAttempts: 5, windowSeconds: 300 },
    REGISTER: { maxAttempts: 3, windowSeconds: 3600 },
    SEND_OTP: { maxAttempts: 10, windowSeconds: 3600 },
    VERIFY_OTP: { maxAttempts: 5, windowSeconds: 300 },
    FORGOT_PASSWORD: { maxAttempts: 3, windowSeconds: 3600 },
    RESET_PASSWORD: { maxAttempts: 5, windowSeconds: 900 },
  },
  
  CAPTCHA_AFTER_FAILED_ATTEMPTS: 3,
  
  BLOCKED_USER_AGENTS: [
    'bot', 'crawler', 'scraper', 
    'curl', 'wget', 'python-requests',
    'go-http-client', 'java',
  ],
  
  IP_BLOCK_DURATION_SECONDS: 3600,
  IP_MAX_FAILED_ATTEMPTS: 50,
} as const;

// ============================================================
// Magic Link Configuration
// ============================================================
export const MAGIC_LINK_CONFIG = {
  EXPIRY_SECONDS: 300,
  MAX_REQUESTS_PER_DAY: 10,
  REDIRECT_URLS: {
    LOGIN: '/auth/callback',
    REGISTER: '/auth/register/callback',
  },
  REQUIRE_SAME_DEVICE: true,
  REQUIRE_SAME_IP: false,
  ALLOW_MULTIPLE_CLICKS: false,
} as const;

// ============================================================
// Social Auth Configuration
// ============================================================
export const SOCIAL_AUTH_CONFIG = {
  PROVIDERS: {
    GOOGLE: {
      ENABLED: true,
      SCOPES: ['email', 'profile'],
      FIELDS: ['id', 'email', 'name', 'picture'],
    },
    FACEBOOK: {
      ENABLED: true,
      SCOPES: ['email', 'public_profile'],
      FIELDS: ['id', 'email', 'first_name', 'last_name', 'picture'],
    },
    GITHUB: {
      ENABLED: process.env['NODE_ENV'] === 'development',
      SCOPES: ['user:email'],
      FIELDS: ['id', 'email', 'name', 'avatar_url'],
    },
    APPLE: {
      ENABLED: true,
      SCOPES: ['name', 'email'],
      FIELDS: ['sub', 'email'],
    },
  },
  AUTO_LINK_ACCOUNTS: true,
  ALLOW_MULTIPLE_PROVIDERS: true,
  UNIQUE_EMAIL_REQUIRED: true,
} as const;

// ============================================================
// Account Recovery Configuration
// ============================================================
export const ACCOUNT_RECOVERY = {
  ALLOWED_METHODS: ['email', 'phone', 'backup_code'],
  
  BACKUP_CODES: {
    COUNT: 10,
    LENGTH: 8,
    HASH_ALGO: 'sha256',
    FORMAT: 'alphanumeric',
  },
  
  RECOVERY_EMAIL: {
    ENABLED: true,
    VERIFICATION_REQUIRED: true,
  },
  
  ADMIN_OVERRIDE: {
    ENABLED: true,
    REQUIRES_APPROVAL: true,
    REQUIRES_2FA: true,
  },
  
  RECOVERY_WINDOW_DAYS: 30,
} as const;

// ============================================================
// Account lockout policy (Security first)
// ============================================================
export const ACCOUNT_LOCKOUT = {
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_SECONDS: 900,
  LOCKOUT_DURATION_INCREMENT: true,
  
  LOCKOUT_LEVELS: {
    LEVEL_1: { attempts: 5, duration: 300 },
    LEVEL_2: { attempts: 10, duration: 900 },
    LEVEL_3: { attempts: 15, duration: 3600 },
    LEVEL_4: { attempts: 20, duration: 86400 },
  },
  
  IP_BLOCK_DURATION: 3600,
  IP_MAX_FAILED_ATTEMPTS: 50,
  NOTIFY_ON_LOCK: true,
  NOTIFY_ON_UNLOCK: true,
} as const;

// ============================================================
// Session concurrency control
// ============================================================
export const SESSION_CONCURRENCY = {
  MAX_SESSIONS: {
    CUSTOMER: 5,
    SELLER: 3,
    ADMIN: 2,
    SUPER_ADMIN: 1,
  },
  STRATEGY: 'allow_new_kill_oldest',
  TRACK_DEVICE_INFO: true,
  TRACK_IP_ADDRESS: true,
  TRACK_LOCATION: true,
  TRACK_USER_AGENT: true,
  IDLE_TIMEOUT: {
    CUSTOMER: 1800,
    SELLER: 900,
    ADMIN: 600,
    SUPER_ADMIN: 300,
  },
} as const;



// ============================================================
// Auth events (Event-driven architecture ready)
// ============================================================
export const AUTH_EVENTS = {
  LOGIN_SUCCESS: 'auth.login.success',
  LOGIN_FAILED: 'auth.login.failed',
  LOGIN_BLOCKED: 'auth.login.blocked',
  LOGOUT: 'auth.logout',
  LOGOUT_ALL_DEVICES: 'auth.logout.all_devices',
  SESSION_EXPIRED: 'auth.session.expired',
  REGISTER_SUCCESS: 'auth.register.success',
  REGISTER_FAILED: 'auth.register.failed',
  TOKEN_REFRESHED: 'auth.token.refreshed',
  TOKEN_REFRESH_FAILED: 'auth.token.refresh_failed',
  TOKEN_REVOKED: 'auth.token.revoked',
  PASSWORD_CHANGED: 'auth.password.changed',
  PASSWORD_RESET_REQUESTED: 'auth.password.reset.requested',
  PASSWORD_RESET_COMPLETED: 'auth.password.reset.completed',
  PASSWORD_RESET_FAILED: 'auth.password.reset.failed',
  EMAIL_VERIFIED: 'auth.email.verified',
  EMAIL_VERIFICATION_FAILED: 'auth.email.verification_failed',
  PHONE_VERIFIED: 'auth.phone.verified',
  MFA_ENABLED: 'auth.mfa.enabled',
  MFA_DISABLED: 'auth.mfa.disabled',
  MFA_VERIFIED: 'auth.mfa.verified',
  MFA_FAILED: 'auth.mfa.failed',
  MFA_BACKUP_CODE_USED: 'auth.mfa.backup_code_used',
  ACCOUNT_LOCKED: 'auth.account.locked',
  ACCOUNT_UNLOCKED: 'auth.account.unlocked',
  ACCOUNT_SUSPENDED: 'auth.account.suspended',
  ACCOUNT_REACTIVATED: 'auth.account.reactivated',
  NEW_DEVICE_LOGIN: 'auth.device.new',
  UNKNOWN_DEVICE_LOGIN: 'auth.device.unknown',
  DEVICE_REMOVED: 'auth.device.removed',
  BRUTE_FORCE_DETECTED: 'auth.brute_force.detected',
  SUSPICIOUS_LOGIN: 'auth.suspicious.login',
  UNUSUAL_LOCATION: 'auth.unusual.location',
  ACCOUNT_LINKED: 'auth.account.linked',
  ACCOUNT_UNLINKED: 'auth.account.unlinked',
} as const;

// ============================================================
// DEPRECATED: Auth Routes (Use API_ROUTES from api.constants.ts)
// ============================================================
/**
 * @deprecated Use API_ROUTES from api.constants.ts instead
 */
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
  VERIFY_PHONE: '/auth/verify-phone',
  SEND_PHONE_OTP: '/auth/send-phone-otp',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  MFA_SETUP: '/auth/mfa/setup',
  MFA_VERIFY: '/auth/mfa/verify',
  MFA_RECOVERY: '/auth/mfa/recovery',
  MFA_DISABLE: '/auth/mfa/disable',
  MFA_BACKUP_CODES: '/auth/mfa/backup-codes',
  SOCIAL_LOGIN: '/auth/social',
  SOCIAL_CALLBACK: '/auth/social/callback',
  BKASH_AUTH: '/auth/bkash',
  NAGAD_AUTH: '/auth/nagad',
  SESSIONS: '/auth/sessions',
  SESSION_REVOKE: '/auth/sessions/revoke',
  DEVICES: '/auth/devices',
  DEVICE_REVOKE: '/auth/devices/revoke',
  ACCOUNT_LINK: '/auth/account/link',
  ACCOUNT_UNLINK: '/auth/account/unlink',
  ACCOUNT_MERGE: '/auth/account/merge',
  ACCOUNT_DELETE: '/auth/account/delete',
  SECURITY_LOG: '/auth/security-log',
  SUSPICIOUS_ACTIVITY: '/auth/suspicious-activity',
} as const;

// ============================================================
// DEPRECATED: Auth Rate Limits (Use RATE_LIMIT_CONFIG from api.constants.ts)
// ============================================================
/**
 * @deprecated Use RATE_LIMIT_CONFIG from api.constants.ts instead
 */
export const AUTH_RATE_LIMITS = {
  LOGIN: 5,
  REGISTER: 3,
  FORGOT_PASSWORD: 3,
  RESET_PASSWORD: 5,
  SEND_OTP: 3,
  VERIFY_OTP: 5,
  REFRESH_TOKEN: 10,
  PER_IP_LIMIT: 30,
  PER_IP_WINDOW: 60,
  PER_USER_LIMIT: 100,
  PER_USER_WINDOW: 60,
} as const;


// ============================================================
// Registration Methods (Bangladesh specific)
// ============================================================
export const REGISTRATION_METHODS = {
  EMAIL: 'email',
  PHONE: 'phone',
  SOCIAL: 'social',
  USERNAME: 'username',
  OTP: 'otp',
  VENDOR: 'vendor',
} as const;

// ============================================================
// Registration Rate Limits
// ============================================================
export const REGISTRATION_RATE_LIMITS = {
  MAX_ATTEMPTS_PER_IP: 10,
  MAX_ATTEMPTS_PER_EMAIL: 3,
  MAX_ATTEMPTS_PER_PHONE: 3,
  WINDOW_SECONDS: 3600, // 1 hour
  COOLDOWN_SECONDS: 300, // 5 minutes
} as const;

// ============================================================
// Referral Configuration
// ============================================================
export const REFERRAL_CONFIG = {
  CODE_LENGTH: 8,
  MAX_LENGTH: 50,
  PATTERN: /^[A-Za-z0-9]{4,20}$/,
  EXPIRY_DAYS: 30,
  MAX_USES_PER_REFERRAL: 10,
} as const;

// ============================================================
// Age Requirements (Bangladesh specific)
// ============================================================
export const AGE_REQUIREMENTS = {
  MIN_AGE_CUSTOMER: 13,
  MIN_AGE_VENDOR: 18,
  MAX_AGE: 120,
  VERIFICATION_REQUIRED_FOR_VENDOR: true,
} as const;

// ============================================================
// Registration Sources
// ============================================================
export const REGISTRATION_SOURCES = {
  WEB: 'web',
  MOBILE_APP: 'mobile_app',
  ADMIN: 'admin',
  SOCIAL: 'social',
  API: 'api',
  VENDOR_PLATFORM: 'vendor_platform',
} as const;

// auth.constants.ts এর শেষে
export type RegistrationMethod = typeof REGISTRATION_METHODS[keyof typeof REGISTRATION_METHODS];
export type RegistrationSource = typeof REGISTRATION_SOURCES[keyof typeof REGISTRATION_SOURCES];
// ============================================================
// Type exports
// ============================================================
export type AuthCookieName = typeof AUTH_COOKIE_NAMES[keyof typeof AUTH_COOKIE_NAMES];
export type AuthHeader = typeof AUTH_HEADERS[keyof typeof AUTH_HEADERS];
export type AuthProvider = typeof AUTH_PROVIDERS[keyof typeof AUTH_PROVIDERS];
export type AuthStatus = typeof AUTH_STATUS[keyof typeof AUTH_STATUS];
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
export type UserTier = typeof USER_TIER[keyof typeof USER_TIER];
export type AuthEvent = typeof AUTH_EVENTS[keyof typeof AUTH_EVENTS];
