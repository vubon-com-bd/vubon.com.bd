/**
 * Session Constants - Enterprise Grade with Connection Config
 * Production-ready for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/session.constants
 * 
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
  ACTIVE: 'active',
  ACTIVE_REMEMBERED: 'active_remembered',
  ACTIVE_TRUSTED: 'active_trusted',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  REVOKED_BY_USER: 'revoked_by_user',
  REVOKED_BY_ADMIN: 'revoked_by_admin',
  REVOKED_BY_SECURITY: 'revoked_by_security',
  SUSPENDED: 'suspended',
  SUSPENDED_INACTIVITY: 'suspended_inactivity',
  SUSPENDED_SUSPICIOUS: 'suspended_suspicious',
  PENDING_MFA: 'pending_mfa',
  PENDING_VERIFICATION: 'pending_verification',
  PENDING_NETWORK_RECONNECT: 'pending_network_reconnect',
} as const;

// ============================================================
// Session TTL (Time To Live) in seconds
// ============================================================
export const SESSION_TTL = {
  VERY_SHORT: 300,
  SHORT: 900,
  MEDIUM: 1800,
  STANDARD: 7200,
  LONG: 86400,
  EXTENDED: 604800,
  PERSISTENT: 2592000,
  POOR_NETWORK_GRACE: 300,
  BY_ROLE: {
    CUSTOMER: 7200,
    PREMIUM_CUSTOMER: 86400,
    SELLER: 3600,
    ADMIN: 1800,
    SUPER_ADMIN: 900,
    GUEST: 3600,
  },
  BY_DEVICE_TYPE: {
    DESKTOP: 7200,
    LAPTOP: 7200,
    TABLET: 14400,
    MOBILE: 14400,
    FEATURE_PHONE: 21600,
    KIOSK: 1800,
  },
  BY_NETWORK_TYPE: {
    WIFI_HOME: 86400,
    WIFI_PUBLIC: 7200,
    MOBILE_4G_5G: 14400,
    MOBILE_3G: 21600,
    MOBILE_2G: 28800,
    VPN: 3600,
  },
} as const;

// ============================================================
// Session Idle Timeout (in seconds)
// ============================================================
export const SESSION_IDLE_TIMEOUT = {
  VERY_SHORT: 60,
  SHORT: 300,
  STANDARD: 900,
  LONG: 1800,
  VERY_LONG: 3600,
  BY_ROLE: {
    CUSTOMER: 900,
    PREMIUM_CUSTOMER: 1800,
    SELLER: 600,
    ADMIN: 300,
    SUPER_ADMIN: 120,
    GUEST: 600,
  },
  CRITICAL: {
    PAYMENT_PAGE: 60,
    CHECKOUT: 300,
    ADMIN_PANEL: 300,
  },
  POOR_NETWORK_IDLE_EXTENSION: 300,
} as const;

// ============================================================
// CRITICAL: Session Store Connection Configuration
// ============================================================
export const SESSION_STORE_CONFIG = {
  REDIS: {
    HOST: process.env['REDIS_HOST'] || 'localhost',
    PORT: parseInt(process.env['REDIS_PORT'] || '6379'),
    PASSWORD: process.env['REDIS_PASSWORD'] || '',
    DB_INDEX: parseInt(process.env['SESSION_REDIS_DB'] || '0'),
    PREFIX: 'vubon:session:',
    TTL: SESSION_TTL.STANDARD,
    
    POOL: {
      MIN_SIZE: 5,
      MAX_SIZE: 20,
      ACQUIRE_TIMEOUT_MS: 10000,
      IDLE_TIMEOUT_MS: 30000,
    },
    
    CLUSTER_ENABLED: process.env['REDIS_CLUSTER_ENABLED'] === 'true',
    CLUSTER_NODES: process.env['REDIS_CLUSTER_NODES']?.split(',') || [],
    
    TLS_ENABLED: process.env['REDIS_TLS'] === 'true',
    TLS_CA: process.env['REDIS_CA_CERT'],
    TLS_CERT: process.env['REDIS_CERT'],
    TLS_KEY: process.env['REDIS_KEY'],
    
    RETRY_STRATEGY: {
      MAX_RETRIES: 3,
      RETRY_DELAY_MS: 1000,
      BACKOFF_MULTIPLIER: 2,
      MAX_RETRY_DELAY_MS: 5000,
    },
    
    CIRCUIT_BREAKER: {
      ENABLED: true,
      FAILURE_THRESHOLD: 5,
      RESET_TIMEOUT_MS: 30000,
      HALF_OPEN_MAX_ATTEMPTS: 3,
    },
    
    TIMEOUT: {
      CONNECT_MS: 5000,
      READ_MS: 3000,
      WRITE_MS: 3000,
    },
  },
  
  FALLBACK_STORE: {
    ENABLED: true,
    TYPE: 'memory',
    TTL: 900,
    MAX_SESSIONS: 10000,
    CLEANUP_INTERVAL_MS: 60000,
  },
  
  WRITE_STRATEGY: {
    MODE: 'primary_first',
    CONSISTENCY: 'eventual',
    WRITE_TIMEOUT_MS: 1000,
  },
} as const;

// ============================================================
// Session Sync Configuration (Multi-device)
// ============================================================
export const SESSION_SYNC = {
  ENABLED: true,
  
  REALTIME_SYNC: {
    ENABLED: true,
    CHANNEL_PREFIX: 'vubon:session:sync:',
    USE_WEBSOCKET: true,
    USE_REDIS_PUBSUB: true,
    PUBSUB_CLIENT: 'redis',
  },
  
  EVENTS: {
    SESSION_REVOKED: 'session.revoked',
    SESSION_EXTENDED: 'session.extended',
    SESSION_CREATED: 'session.created',
    ALL_SESSIONS_REVOKED: 'session.all_revoked',
    PASSWORD_CHANGED: 'password.changed',
    MFA_CHANGED: 'mfa.changed',
    DEVICE_REMOVED: 'device.removed',
  },
  
  MAX_LATENCY_MS: 5000,
  SYNC_BATCH_SIZE: 100,
  SYNC_INTERVAL_MS: 1000,
  
  OFFLINE_SYNC: {
    ENABLED: true,
    MAX_QUEUE_SIZE: 100,
    MAX_QUEUE_AGE_MS: 300000,
    SYNC_ON_RECONNECT: true,
    PERSIST_QUEUE: true,
  },
  
  CONFLICT_RESOLUTION: {
    STRATEGY: 'last_write_wins',
    TIMESTAMP_TOLERANCE_MS: 1000,
  },
} as const;

// ============================================================
// Session Validation Configuration
// ============================================================
export const SESSION_VALIDATION = {
  REQUEST: {
    MAX_AGE_SECONDS: 5,
    TIMESTAMP_TOLERANCE_MS: 30000,
    REQUIRED_HEADERS: ['user-agent', 'x-request-id'],
  },
  
  FINGERPRINT: {
    ENABLED: true,
    COMPONENTS: ['userAgent', 'language', 'timezone', 'screenResolution', 'platform'],
    SALT: process.env['FINGERPRINT_SALT'] || 'vubon-session-salt-v1',
    HASH_ALGORITHM: 'sha256',
    MAX_CHANGE_WEIGHT: 0.3,
    
    WEIGHTS: {
      userAgent: 0.4,
      language: 0.1,
      timezone: 0.15,
      screenResolution: 0.2,
      platform: 0.15,
    },
  },
  
  IP_VALIDATION: {
    ENABLED: true,
    ALLOW_CGNAT: true,
    TRUSTED_PROXIES: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
    MAX_IP_CHANGE_COUNT: 3,
    IP_CHANGE_WINDOW_HOURS: 24,
    
    IP_REPUTATION: {
      ENABLED: true,
      CHECK_TIMEOUT_MS: 1000,
      BLOCKED_IPS: process.env['BLOCKED_IPS']?.split(',') || [],
    },
  },
  
  DEVICE_VALIDATION: {
    MAX_DEVICES_PER_USER: 10,
    DEVICE_COOKIE_NAME: '_vubon_device',
    DEVICE_COOKIE_MAX_AGE: 31536000,
    REQUIRE_DEVICE_ID: true,
  },
} as const;

// ============================================================
// Session Monitoring & Metrics
// ============================================================
export const SESSION_MONITORING = {
  ENABLED: true,
  
  METRICS_EXPORT: {
    ENABLED: true,
    FORMAT: 'prometheus',
    ENDPOINT: '/metrics/sessions',
    PORT: 9090,
    PATH: '/metrics',
    
    METRICS: {
      ACTIVE_SESSIONS: {
        NAME: 'vubon_sessions_active',
        TYPE: 'gauge',
        HELP: 'Number of active sessions',
      },
      SESSION_DURATION_SECONDS: {
        NAME: 'vubon_session_duration_seconds',
        TYPE: 'histogram',
        HELP: 'Session duration in seconds',
        BUCKETS: [60, 300, 900, 1800, 3600, 7200, 14400, 28800],
      },
      LOGIN_TOTAL: {
        NAME: 'vubon_logins_total',
        TYPE: 'counter',
        HELP: 'Total number of logins',
        LABELS: ['status', 'role'],
      },
      LOGIN_FAILURES: {
        NAME: 'vubon_login_failures_total',
        TYPE: 'counter',
        HELP: 'Total login failures',
        LABELS: ['reason'],
      },
      SESSION_REVOCATIONS: {
        NAME: 'vubon_session_revocations_total',
        TYPE: 'counter',
        HELP: 'Session revocations by reason',
        LABELS: ['reason'],
      },
    },
  },
  
  HEALTH_CHECKS: {
    ENABLED: true,
    INTERVAL_MS: 30000,
    TIMEOUT_MS: 5000,
    ENDPOINT: '/health/sessions',
    DEPENDENCIES: ['redis', 'pubsub'],
  },
  
  ALERTING: {
    ENABLED: true,
    CHANNELS: ['slack', 'email', 'webhook'],
    SLACK_WEBHOOK: process.env['SLACK_ALERTS_WEBHOOK'],
    EMAIL_RECIPIENTS: process.env['ALERT_EMAILS']?.split(','),
    
    RULES: [
      {
        METRIC: 'active_sessions',
        THRESHOLD: 100000,
        OPERATOR: '>',
        SEVERITY: 'warning',
        DURATION_MS: 300000,
      },
      {
        METRIC: 'login_failure_rate',
        THRESHOLD: 0.2,
        OPERATOR: '>',
        SEVERITY: 'critical',
        DURATION_MS: 60000,
      },
      {
        METRIC: 'redis_connection_errors',
        THRESHOLD: 10,
        OPERATOR: '>',
        SEVERITY: 'critical',
        DURATION_MS: 60000,
      },
    ],
  },
  
  TRACING: {
    ENABLED: true,
    SAMPLING_RATE: 0.1,
    EXPORTER: 'jaeger',
    EXPORTER_ENDPOINT: process.env['JAEGER_ENDPOINT'],
    SERVICE_NAME: 'vubon-session-service',
  },
} as const;

// ============================================================
// Device Trust Duration
// ============================================================
export const DEVICE_TRUST = {
  ONE_TIME: 0,
  BROWSER_SESSION: 7200,
  ONE_DAY: 86400,
  THREE_DAYS: 259200,
  SEVEN_DAYS: 604800,
  FOURTEEN_DAYS: 1209600,
  THIRTY_DAYS: 2592000,
  ONE_YEAR: 31536000,
  PERMANENT: -1,
  BY_DEVICE_TYPE: {
    OWN_DEVICE: 2592000,
    FAMILY_DEVICE: 604800,
    PUBLIC_DEVICE: 0,
    KIOSK: 0,
  },
  BY_LOCATION: {
    HOME: 2592000,
    OFFICE: 604800,
    OTHER_CITY: 86400,
    VILLAGE: 604800,
  },
} as const;

// ============================================================
// Session Metadata Keys
// ============================================================
export const SESSION_METADATA = {
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
  OS_TYPE: 'osType',
  BROWSER_TYPE: 'browserType',
  SCREEN_RESOLUTION: 'screenResolution',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  REFERRER: 'referrer',
  MOBILE_OPERATOR: 'mobileOperator',
  NETWORK_TYPE: 'networkType',
  DISTRICT: 'district',
  UPAZILA: 'upazila',
  DATA_SAVER_ENABLED: 'dataSaverEnabled',
  MFA_VERIFIED: 'mfaVerified',
  MFA_VERIFIED_AT: 'mfaVerifiedAt',
  MFA_METHOD: 'mfaMethod',
  FINGERPRINT: 'fingerprint',
  RISK_SCORE: 'riskScore',
  REQUEST_COUNT: 'requestCount',
  PAGE_VIEWS: 'pageViews',
  TOTAL_DURATION: 'totalDuration',
} as const;

// ============================================================
// Trust Levels
// ============================================================
export const TRUST_LEVELS = {
  UNTRUSTED: { level: 0, name: 'untrusted', requiresMfa: true, requiresVerification: true },
  STANDARD: { level: 1, name: 'standard', requiresMfa: false, requiresVerification: false },
  TRUSTED: { level: 2, name: 'trusted', requiresMfa: false, requiresVerification: false },
  HIGH_TRUST: { level: 3, name: 'high_trust', requiresMfa: false, requiresVerification: false, fullAccess: true },
  MAXIMUM_TRUST: { level: 4, name: 'maximum_trust', requiresMfa: false, requiresVerification: false, fullAccess: true, requiresKyc: true },
} as const;

// ============================================================
// Maximum Concurrent Sessions
// ============================================================
export const MAX_CONCURRENT_SESSIONS = {
  DEFAULT: 5,
  PREMIUM: 10,
  ENTERPRISE: 20,
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
  BY_DEVICE_TYPE: {
    DESKTOP: 3,
    LAPTOP: 3,
    TABLET: 2,
    MOBILE: 2,
    FEATURE_PHONE: 1,
  },
  ON_LIMIT_EXCEEDED: {
    ACTION: 'revoke_oldest',
    OLDEST_THRESHOLD_HOURS: 24,
  },
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
  SIM_SWAP_DETECTED: 'sim_swap_detected',
} as const;

// ============================================================
// Session Cleanup Configuration
// ============================================================
export const SESSION_CLEANUP = {
  SCHEDULE: '0 */6 * * *',
  BATCH_SIZE: 1000,
  RETENTION_DAYS: {
    ACTIVE: 7,
    EXPIRED: 30,
    REVOKED: 90,
  },
  ARCHIVE_ENABLED: true,
  ARCHIVE_AFTER_DAYS: 30,
  ARCHIVE_TABLE: 'session_archive',
} as const;

// ============================================================
// Session Location Tracking (Bangladesh specific)
// ============================================================
export const SESSION_LOCATION = {
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
  SUSPICIOUS_DISTANCE_THRESHOLD_KM: 100,
  LOCATION_CHECK_INTERVAL_MINUTES: 30,
  ALLOWLIST_DISTRICTS: [],
} as const;

// ============================================================
// Session Extension Rules
// ============================================================
export const SESSION_EXTENSION = {
  AUTO_EXTEND_ON_ACTIVITY: true,
  EXTEND_THRESHOLD_PERCENT: 50,
  MAX_EXTENSION_MULTIPLIER: 2,
  MANUAL_EXTENSION_ENABLED: true,
  MANUAL_EXTENSION_MAX: 86400,
  NETWORK_RECONNECT_EXTENSION: 300,
} as const;

// ============================================================
// Session Events (For audit & monitoring)
// ============================================================
export const SESSION_EVENTS = {
  SESSION_CREATED: 'session.created',
  SESSION_EXTENDED: 'session.extended',
  SESSION_EXPIRED: 'session.expired',
  SESSION_REVOKED: 'session.revoked',
  SESSION_ACTIVE: 'session.active',
  SESSION_IDLE: 'session.idle',
  SESSION_SUSPICIOUS: 'session.suspicious',
  SESSION_LOCATION_CHANGE: 'session.location_change',
  SESSION_DEVICE_CHANGE: 'session.device_change',
  SESSION_IP_CHANGE: 'session.ip_change',
  SESSION_LIMIT_EXCEEDED: 'session.limit_exceeded',
  SESSION_FAMILY_ADDED: 'session.family_added',
  SESSION_TRANSFERRED: 'session.transferred',
  SESSION_NETWORK_RECONNECT: 'session.network_reconnect',
  SESSION_POOR_NETWORK_MODE: 'session.poor_network_mode',
} as const;


// ============================================================
// Family Session Sharing (Bangladesh specific)
// ============================================================
export const FAMILY_SESSION_SHARING = {
  ENABLED: true,
  MAX_FAMILY_MEMBERS: 6,
  SHARED_SESSION_TYPES: {
    VIEW_ONLY: 'view_only',
    LIMITED_ACCESS: 'limited',
    FULL_ACCESS: 'full',
  },
  DEFAULT_PERMISSION: 'view_only',
  MIN_AGE_FOR_FULL_ACCESS: 18,
  MIN_AGE_FOR_LIMITED_ACCESS: 13,
  PARENTAL_CONTROLS: {
    ENABLED: true,
    REQUIRE_APPROVAL_FOR_PAYMENT: true,
    DAILY_SPENDING_LIMIT: 2000,
    RESTRICTED_CATEGORIES: ['electronics', 'gaming'],
  },
} as const;

// ============================================================
// Public/Shared Device Session (Cyber cafe, kiosk)
// ============================================================
export const PUBLIC_DEVICE_SESSION = {
  ENABLED: true,
  TTL: 1800,
  IDLE_TIMEOUT: 300,
  RESTRICT_SENSITIVE_ACTIONS: true,
  RESTRICT_PAYMENT_METHODS: ['bank_transfer', 'card'],
  ALLOW_ONLY_MFS_PAYMENT: true,
  AUTO_LOGOUT_ON_CLOSE: true,
  CLEAR_SESSION_DATA_ON_LOGOUT: true,
  SHOW_PRIVACY_WARNING: true,
  SHOW_DONT_SAVE_PASSWORD_WARNING: true,
} as const;

// ============================================================
// Session Metrics (For monitoring)
// ============================================================
export const SESSION_METRICS = {
  ENABLED: true,
  TRACK: {
    ACTIVE_SESSIONS: true,
    SESSION_DURATION: true,
    SESSION_PER_USER: true,
    DEVICE_DISTRIBUTION: true,
    LOCATION_DISTRIBUTION: true,
    LOGIN_SUCCESS_RATE: true,
    SESSION_REVOCATION_RATE: true,
  },
  METRICS_RETENTION_DAYS: 30,
  ALERT_WHEN: {
    AVERAGE_SESSION_DURATION_HOURS: 12,
    SESSIONS_PER_USER_OVER_10: true,
    SUSPICIOUS_LOCATION_CHANGES: 5,
  },
  DASHBOARD_REFRESH_INTERVAL: 30,
} as const;

// ============================================================
// Type Exports
// ============================================================
export type SessionStatus = typeof SESSION_STATUS[keyof typeof SESSION_STATUS];
export type TrustLevel = typeof TRUST_LEVELS[keyof typeof TRUST_LEVELS];
export type SessionRevocationReason = typeof SESSION_REVOCATION_REASONS[keyof typeof SESSION_REVOCATION_REASONS];
