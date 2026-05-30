/**
 * Session Constants - Pure immutable session configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-constants/auth-constants/session.constants

 * RULES:
 * ✅ NO redis access, session creation logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Session Statuses (State machine ready)
// ============================================================
export const SESSION_STATUS = {
  // Active states
  ACTIVE: 'active',
  ACTIVE_REMEMBERED: 'active_remembered',
  ACTIVE_TRUSTED: 'active_trusted',

  // Terminal states
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  REVOKED_BY_USER: 'revoked_by_user',
  REVOKED_BY_ADMIN: 'revoked_by_admin',
  REVOKED_BY_SECURITY: 'revoked_by_security',

  // Suspended states
  SUSPENDED: 'suspended',
  SUSPENDED_INACTIVITY: 'suspended_inactivity',
  SUSPENDED_SUSPICIOUS: 'suspended_suspicious',

  // Pending states
  PENDING_MFA: 'pending_mfa',
  PENDING_VERIFICATION: 'pending_verification',

  // Bangladesh specific
  PENDING_NETWORK_RECONNECT: 'pending_network_reconnect', // Poor network areas
} as const;

// ============================================================
// Session TTL (Time To Live) in seconds
// Optimized for Bangladesh network conditions
// ============================================================
export const SESSION_TTL = {
  // Very short sessions (High security)
  VERY_SHORT: 300, // 5 minutes - Admin actions
  SHORT: 900, // 15 minutes - Payment sessions

  // Medium sessions
  MEDIUM: 1800, // 30 minutes - Standard browsing
  STANDARD: 7200, // 2 hours - Default session

  // Long sessions (Remember me)
  LONG: 86400, // 1 day
  EXTENDED: 604800, // 7 days
  PERSISTENT: 2592000, // 30 days

  // Bangladesh specific: Poor network tolerance
  POOR_NETWORK_GRACE: 300, // 5 minutes grace for reconnection

  // Role based TTL
  BY_ROLE: {
    CUSTOMER: 7200, // 2 hours
    PREMIUM_CUSTOMER: 86400, // 1 day
    SELLER: 3600, // 1 hour
    ADMIN: 1800, // 30 minutes
    SUPER_ADMIN: 900, // 15 minutes
    GUEST: 3600, // 1 hour
  },

  // Device type based TTL
  BY_DEVICE_TYPE: {
    DESKTOP: 7200, // 2 hours
    LAPTOP: 7200, // 2 hours
    TABLET: 14400, // 4 hours
    MOBILE: 14400, // 4 hours
    FEATURE_PHONE: 21600, // 6 hours (slower users)
    KIOSK: 1800, // 30 minutes (public)
  },

  // Network type based TTL (Bangladesh specific)
  BY_NETWORK_TYPE: {
    WIFI_HOME: 86400, // 1 day
    WIFI_PUBLIC: 7200, // 2 hours
    MOBILE_4G_5G: 14400, // 4 hours
    MOBILE_3G: 21600, // 6 hours (allow longer due to slower speed)
    MOBILE_2G: 28800, // 8 hours (most lenient)
    VPN: 3600, // 1 hour (stricter)
  },
} as const;

// ============================================================
// Session Idle Timeout (in seconds)
// ============================================================
export const SESSION_IDLE_TIMEOUT = {
  // Standard idle timeouts
  VERY_SHORT: 60, // 1 minute
  SHORT: 300, // 5 minutes
  STANDARD: 900, // 15 minutes
  LONG: 1800, // 30 minutes
  VERY_LONG: 3600, // 1 hour

  // Role based idle timeout
  BY_ROLE: {
    CUSTOMER: 900, // 15 minutes
    PREMIUM_CUSTOMER: 1800, // 30 minutes
    SELLER: 600, // 10 minutes
    ADMIN: 300, // 5 minutes
    SUPER_ADMIN: 120, // 2 minutes
    GUEST: 600, // 10 minutes
  },

  // Critical operations (shorter timeout)
  CRITICAL: {
    PAYMENT_PAGE: 60, // 1 minute
    CHECKOUT: 300, // 5 minutes
    ADMIN_PANEL: 300, // 5 minutes
  },

  // Bangladesh specific: Allow longer idle in poor network areas
  POOR_NETWORK_IDLE_EXTENSION: 300, // +5 minutes extension
} as const;

// ============================================================
// Device Trust Duration (in seconds)
// ============================================================
export const DEVICE_TRUST = {
  ONE_TIME: 0, // Don't trust, require MFA each time
  BROWSER_SESSION: 7200, // 2 hours (same browser session)
  ONE_DAY: 86400,
  THREE_DAYS: 259200,
  SEVEN_DAYS: 604800,
  FOURTEEN_DAYS: 1209600,
  THIRTY_DAYS: 2592000,
  ONE_YEAR: 31536000,
  PERMANENT: -1, // Until manually revoked

  // Trust duration by device type
  BY_DEVICE_TYPE: {
    OWN_DEVICE: 2592000, // 30 days (user's personal device)
    FAMILY_DEVICE: 604800, // 7 days (shared family device)
    PUBLIC_DEVICE: 0, // No trust (library, cyber cafe)
    KIOSK: 0, // No trust
  },

  // Trust duration by location (Bangladesh specific)
  BY_LOCATION: {
    HOME: 2592000, // 30 days
    OFFICE: 604800, // 7 days
    OTHER_CITY: 86400, // 1 day (travel)
    VILLAGE: 604800, // 7 days (less device variation)
  },
} as const;

// ============================================================
// Session Metadata Keys
// ============================================================
export const SESSION_METADATA = {
  // Core metadata
  SESSION_ID: 'sessionId',
  USER_ID: 'userId',
  USER_AGENT: 'userAgent',
  IP_ADDRESS: 'ipAddress',
  DEVICE_ID: 'deviceId',
  DEVICE_NAME: 'deviceName',
  DEVICE_TYPE: 'deviceType',
  LOCATION: 'location',
  LOGIN_AT: 'loginAt',
  LAST_ACTIVE_AT: 'lastActiveAt',
  LAST_ACTIVE_URL: 'lastActiveUrl',
  TRUST_LEVEL: 'trustLevel',

  // Extended metadata
  OS_TYPE: 'osType',
  BROWSER_TYPE: 'browserType',
  SCREEN_RESOLUTION: 'screenResolution',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  REFERRER: 'referrer',

  // Bangladesh specific
  MOBILE_OPERATOR: 'mobileOperator', // GP, Robi, Banglalink, Teletalk
  NETWORK_TYPE: 'networkType', // 2G, 3G, 4G, 5G, WiFi
  DISTRICT: 'district', // User's district
  UPAZILA: 'upazila', // User's upazila
  DATA_SAVER_ENABLED: 'dataSaverEnabled',

  // Security metadata
  MFA_VERIFIED: 'mfaVerified',
  MFA_VERIFIED_AT: 'mfaVerifiedAt',
  MFA_METHOD: 'mfaMethod',
  FINGERPRINT: 'fingerprint',
  RISK_SCORE: 'riskScore',

  // Session tracking
  REQUEST_COUNT: 'requestCount',
  PAGE_VIEWS: 'pageViews',
  TOTAL_DURATION: 'totalDuration',
} as const;

// ============================================================
// Trust Levels for Session
// ============================================================
export const TRUST_LEVELS = {
  // Level 0: No trust
  UNTRUSTED: {
    level: 0,
    name: 'untrusted',
    description: 'New device, requires MFA for sensitive actions',
    requiresMfa: true,
    requiresVerification: true,
  },

  // Level 1: Basic trust (cookie login)
  STANDARD: {
    level: 1,
    name: 'standard',
    description: 'Remembered device, basic trust',
    requiresMfa: false,
    requiresVerification: false,
  },

  // Level 2: Trusted device
  TRUSTED: {
    level: 2,
    name: 'trusted',
    description: 'Trusted device, no MFA required for standard actions',
    requiresMfa: false,
    requiresVerification: false,
  },

  // Level 3: High trust (physical token/MFA remembered)
  HIGH_TRUST: {
    level: 3,
    name: 'high_trust',
    description: 'MFA verified recently, full access',
    requiresMfa: false,
    requiresVerification: false,
    fullAccess: true,
  },

  // Level 4: Maximum trust (KYC verified)
  MAXIMUM_TRUST: {
    level: 4,
    name: 'maximum_trust',
    description: 'KYC verified, trusted user',
    requiresMfa: false,
    requiresVerification: false,
    fullAccess: true,
    requiresKyc: true,
  },
} as const;

// ============================================================
// Maximum Concurrent Sessions per User
// ============================================================
export const MAX_CONCURRENT_SESSIONS = {
  // Default limits
  DEFAULT: 5,
  PREMIUM: 10,
  ENTERPRISE: 20,

  // Role based limits
  BY_ROLE: {
    GUEST: 1,
    CUSTOMER: 5,
    PREMIUM_CUSTOMER: 10,
    SELLER: 3,
    VENDOR: 4,
    ADMIN: 3,
    SUPER_ADMIN: 2,
    SUPPORT_AGENT: 2,
    DELIVERY_AGENT: 1,
  },

  // Device type based limits
  BY_DEVICE_TYPE: {
    DESKTOP: 3,
    LAPTOP: 3,
    TABLET: 2,
    MOBILE: 2,
    FEATURE_PHONE: 1,
  },

  // Strategy when limit exceeded
  ON_LIMIT_EXCEEDED: {
    ACTION: 'revoke_oldest', // revoke_oldest, block_new, prompt_user
    OLDEST_THRESHOLD_HOURS: 24, // Revoke sessions older than 24 hours first
  },

  // Bangladesh specific: Allow more sessions for family sharing
  FAMILY_SHARING_ENABLED: true,
  MAX_FAMILY_SESSIONS: 8,
} as const;

// ============================================================
// Session Revocation Reasons
// ============================================================
export const SESSION_REVOCATION_REASONS = {
  USER_LOGOUT: 'user_logout',
  USER_LOGOUT_ALL: 'user_logout_all',
  ADMIN_REVOKED: 'admin_revoked',
  PASSWORD_CHANGED: 'password_changed',
  MFA_CHANGED: 'mfa_changed',
  DEVICE_REMOVED: 'device_removed',
  SESSION_EXPIRED: 'session_expired',
  IDLE_TIMEOUT: 'idle_timeout',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  IP_CHANGE: 'ip_change',
  USER_AGENT_CHANGE: 'user_agent_change',
  MAX_CONCURRENT_EXCEEDED: 'max_concurrent_exceeded',
  ACCOUNT_SUSPENDED: 'account_suspended',
  ACCOUNT_DELETED: 'account_deleted',
  SECURITY_BREACH: 'security_breach',
  SIM_SWAP_DETECTED: 'sim_swap_detected', // Bangladesh specific
} as const;

// ============================================================
// Session Location Tracking (Bangladesh specific)
// ============================================================
export const SESSION_LOCATION = {
  // Bangladesh divisions
  DIVISIONS: {
    DHAKA: 'dhaka',
    CHATTOGRAM: 'chattogram',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    SYLHET: 'sylhet',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  },

  // Suspicious location change
  SUSPICIOUS_DISTANCE_THRESHOLD_KM: 100, // >100km in <1 hour is suspicious
  LOCATION_CHECK_INTERVAL_MINUTES: 30,

  // Allowlist of districts (for faster checkout)
  ALLOWLIST_DISTRICTS: [], // Will be populated from config
} as const;

// ============================================================
// Session Cleanup Configuration
// ============================================================
export const SESSION_CLEANUP = {
  // Cleanup schedule (cron expression)
  SCHEDULE: '0 */6 * * *', // Every 6 hours

  // Batch size
  BATCH_SIZE: 1000,

  // Expired session retention (days)
  RETENTION_DAYS: {
    // Keep active session logs for 7 days (enough for real-time monitoring)
    ACTIVE: 7,
    // Keep expired sessions for 30 days (for user "recent sessions" view)
    EXPIRED: 30,
    // Keep revoked sessions for 90 days (for security audit & compliance)
    REVOKED: 90,
  },

  // Archive old sessions
  ARCHIVE_ENABLED: true,
  ARCHIVE_AFTER_DAYS: 30,
  ARCHIVE_TABLE: 'session_archive',

  // Note: For long-term analytics (beyond 90 days), send aggregated data
  // (e.g., daily active sessions, average session duration) to a separate
  // analytics database. Do not keep raw session logs forever.
} as const;

// ============================================================
// Session Extension Rules
// ============================================================
export const SESSION_EXTENSION = {
  // Automatic extension while active
  AUTO_EXTEND_ON_ACTIVITY: true,
  EXTEND_THRESHOLD_PERCENT: 50, // Extend when 50% of TTL remaining

  // Maximum extension beyond original TTL
  MAX_EXTENSION_MULTIPLIER: 2, // Can extend up to 2x original TTL

  // Manual extension
  MANUAL_EXTENSION_ENABLED: true,
  MANUAL_EXTENSION_MAX: 86400, // 1 day

  // Bangladesh specific: Network reconnection extension
  NETWORK_RECONNECT_EXTENSION: 300, // 5 minutes extension after network reconnection
} as const;

// ============================================================
// Session Events (For audit & monitoring)
// ============================================================
export const SESSION_EVENTS = {
  // Session lifecycle
  SESSION_CREATED: 'session.created',
  SESSION_EXTENDED: 'session.extended',
  SESSION_EXPIRED: 'session.expired',
  SESSION_REVOKED: 'session.revoked',

  // Session activity
  SESSION_ACTIVE: 'session.active',
  SESSION_IDLE: 'session.idle',

  // Session security
  SESSION_SUSPICIOUS: 'session.suspicious',
  SESSION_LOCATION_CHANGE: 'session.location_change',
  SESSION_DEVICE_CHANGE: 'session.device_change',
  SESSION_IP_CHANGE: 'session.ip_change',

  // Session management
  SESSION_LIMIT_EXCEEDED: 'session.limit_exceeded',
  SESSION_FAMILY_ADDED: 'session.family_added',
  SESSION_TRANSFERRED: 'session.transferred',

  // Bangladesh specific
  SESSION_NETWORK_RECONNECT: 'session.network_reconnect',
  SESSION_POOR_NETWORK_MODE: 'session.poor_network_mode',
} as const;

// ============================================================
// Session Transfer (Device to device)
// ============================================================
export const SESSION_TRANSFER = {
  ENABLED: true,

  // Transfer methods
  METHODS: {
    QR_CODE: 'qr_code',
    MAGIC_LINK: 'magic_link',
    OTP: 'otp',
  },

  // Transfer TTL (seconds)
  QR_CODE_TTL: 60, // 1 minute
  MAGIC_LINK_TTL: 300, // 5 minutes
  TRANSFER_TOKEN_TTL: 300, // 5 minutes

  // Max pending transfers per user
  MAX_PENDING_TRANSFERS: 3,

  // Allowed transfer device types
  ALLOWED_TRANSFERS: {
    MOBILE_TO_DESKTOP: true,
    DESKTOP_TO_MOBILE: true,
    TABLET_TO_MOBILE: true,
    FEATURE_PHONE_TO_SMART: false,
  },

  // Security
  REQUIRE_CONFIRMATION: true,
  CONFIRMATION_METHODS: ['email', 'sms'],
} as const;

// ============================================================
// Family Session Sharing (Bangladesh specific)
// ============================================================
export const FAMILY_SESSION_SHARING = {
  ENABLED: true,

  // Maximum family members
  MAX_FAMILY_MEMBERS: 6,

  // Shared session types
  SHARED_SESSION_TYPES: {
    VIEW_ONLY: 'view_only', // Can view orders, not place
    LIMITED_ACCESS: 'limited', // Can add to cart, not pay
    FULL_ACCESS: 'full', // Can place orders (family head)
  },

  // Default permission for shared sessions
  DEFAULT_PERMISSION: 'view_only',

  // Age restrictions (in years)
  MIN_AGE_FOR_FULL_ACCESS: 18,
  MIN_AGE_FOR_LIMITED_ACCESS: 13,

  // Parental controls
  PARENTAL_CONTROLS: {
    ENABLED: true,
    REQUIRE_APPROVAL_FOR_PAYMENT: true,
    DAILY_SPENDING_LIMIT: 2000, // 2000 BDT default
    RESTRICTED_CATEGORIES: ['electronics', 'gaming'],
  },
} as const;

// ============================================================
// Public/Shared Device Session (Cyber cafe, kiosk)
// ============================================================
export const PUBLIC_DEVICE_SESSION = {
  ENABLED: true,

  // Shorter timeouts for public devices
  TTL: 1800, // 30 minutes
  IDLE_TIMEOUT: 300, // 5 minutes

  // Restrictions
  RESTRICT_SENSITIVE_ACTIONS: true,
  RESTRICT_PAYMENT_METHODS: ['bank_transfer', 'card'],
  ALLOW_ONLY_MFS_PAYMENT: true, // bKash, Nagad only

  // Auto logout
  AUTO_LOGOUT_ON_CLOSE: true,
  CLEAR_SESSION_DATA_ON_LOGOUT: true,

  // Warning messages
  SHOW_PRIVACY_WARNING: true,
  SHOW_DONT_SAVE_PASSWORD_WARNING: true,
} as const;

// ============================================================
// Session Metrics (For monitoring)
// ============================================================
export const SESSION_METRICS = {
  ENABLED: true,

  // Metrics to track
  TRACK: {
    ACTIVE_SESSIONS: true,
    SESSION_DURATION: true,
    SESSION_PER_USER: true,
    DEVICE_DISTRIBUTION: true,
    LOCATION_DISTRIBUTION: true,
    LOGIN_SUCCESS_RATE: true,
    SESSION_REVOCATION_RATE: true,
  },

  // How long to keep the metrics data (in days)
  // Note: For long-term analytics, aggregate and send to a data warehouse
  METRICS_RETENTION_DAYS: 30,

  // Alert thresholds
  ALERT_WHEN: {
    AVERAGE_SESSION_DURATION_HOURS: 12, // Alert if >12 hours
    SESSIONS_PER_USER_OVER_10: true, // Alert if user has >10 sessions
    SUSPICIOUS_LOCATION_CHANGES: 5, // Alert if >5 in 1 hour
  },

  // Dashboard refresh interval (seconds)
  DASHBOARD_REFRESH_INTERVAL: 30,
} as const;
