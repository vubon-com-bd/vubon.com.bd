/**
 * Security Constants - Pure immutable security configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/auth-constants/security.constants
 * 
 * RULES:
 * ✅ NO helmet setup, crypto functions, encryption logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// CSP (Content Security Policy) Directives
// Enhanced for Bangladesh e-commerce
// ============================================================
export const CSP_DIRECTIVES = Object.freeze({
  DEFAULT_SRC: ["'self'"],
  SCRIPT_SRC: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
  STYLE_SRC: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  IMG_SRC: ["'self'", 'data:', 'https:', 'blob:'],
  FONT_SRC: ["'self'", 'https:', 'data:', 'https://fonts.gstatic.com'],
  CONNECT_SRC: ["'self'", 'https://api.vubon.com.bd', 'wss://ws.vubon.com.bd', 'https://*.sslcommerz.com', 'https://*.bkash.com', 'https://*.nagad.com.bd'],
  FRAME_SRC: ["'self'", 'https://*.sslcommerz.com', 'https://*.bkash.com', 'https://*.nagad.com.bd', 'https://www.google.com/recaptcha/'],
  OBJECT_SRC: ["'none'"],
  BASE_URI: ["'self'"],
  FORM_ACTION: ["'self'", 'https://*.sslcommerz.com', 'https://*.bkash.com'],
  FRAME_ANCESTORS: ["'none'"],
  UPGRADE_INSECURE_REQUESTS: [],
  BLOCK_ALL_MIXED_CONTENT: [],
  MANIFEST_SRC: ["'self'"],
  WORKER_SRC: ["'self'", 'blob:'],
  CHILD_SRC: ["'self'", 'blob:'],
  NAVIGATE_TO: ["'self'"],
  REPORT_URI: ['/api/security/csp-report'],
} as const);

// ============================================================
// Security Header Names
// ============================================================
export const SECURITY_HEADERS = Object.freeze({
  // Standard security headers
  CSP: 'Content-Security-Policy',
  HSTS: 'Strict-Transport-Security',
  X_FRAME_OPTIONS: 'X-Frame-Options',
  X_CONTENT_TYPE: 'X-Content-Type-Options',
  X_XSS_PROTECTION: 'X-XSS-Protection',
  REFERRER_POLICY: 'Referrer-Policy',
  PERMISSIONS_POLICY: 'Permissions-Policy',
  CROSS_ORIGIN_OPENER_POLICY: 'Cross-Origin-Opener-Policy',
  CROSS_ORIGIN_EMBEDDER_POLICY: 'Cross-Origin-Embedder-Policy',
  CROSS_ORIGIN_RESOURCE_POLICY: 'Cross-Origin-Resource-Policy',
  
  // CORS headers
  CORS_ORIGIN: 'Access-Control-Allow-Origin',
  CORS_METHODS: 'Access-Control-Allow-Methods',
  CORS_HEADERS: 'Access-Control-Allow-Headers',
  CORS_CREDENTIALS: 'Access-Control-Allow-Credentials',
  CORS_EXPOSE_HEADERS: 'Access-Control-Expose-Headers',
  CORS_MAX_AGE: 'Access-Control-Max-Age',
  
  // Additional security headers
  FEATURE_POLICY: 'Feature-Policy',
  EXPECT_CT: 'Expect-CT',
  ORIGIN_TRIAL: 'Origin-Trial',
  CLEAR_SITE_DATA: 'Clear-Site-Data',
} as const);

// ============================================================
// Security Header Values
// ============================================================
export const SECURITY_HEADER_VALUES = Object.freeze({
  X_FRAME_OPTIONS: {
    DENY: 'DENY',
    SAMEORIGIN: 'SAMEORIGIN',
    ALLOW_FROM: 'ALLOW-FROM',
  },
  X_CONTENT_TYPE: {
    NOSNIFF: 'nosniff',
  },
  X_XSS_PROTECTION: {
    ENABLED: '1; mode=block',
    DISABLED: '0',
  },
  REFERRER_POLICY: {
    STRICT: 'strict-origin-when-cross-origin',
    NO_REFERRER: 'no-referrer',
    SAME_ORIGIN: 'same-origin',
    STRICT_ORIGIN: 'strict-origin',
    NO_REFERRER_WHEN_DOWNGRADE: 'no-referrer-when-downgrade',
  },
  HSTS: {
    MAX_AGE_1_YEAR: 'max-age=31536000; includeSubDomains; preload',
    MAX_AGE_6_MONTHS: 'max-age=15768000; includeSubDomains',
    MAX_AGE_1_DAY: 'max-age=86400',
  },
  CROSS_ORIGIN_OPENER_POLICY: {
    SAME_ORIGIN: 'same-origin',
    SAME_ORIGIN_ALLOW_POPUPS: 'same-origin-allow-popups',
    UNSAFE_NONE: 'unsafe-none',
  },
  CROSS_ORIGIN_EMBEDDER_POLICY: {
    REQUIRE_CORP: 'require-corp',
    UNSAFE_NONE: 'unsafe-none',
  },
  CROSS_ORIGIN_RESOURCE_POLICY: {
    SAME_ORIGIN: 'same-origin',
    SAME_SITE: 'same-site',
    CROSS_ORIGIN: 'cross-origin',
  },
  CLEAR_SITE_DATA: {
    CACHE: '"cache"',
    COOKIES: '"cookies"',
    STORAGE: '"storage"',
    EXECUTION_CONTEXTS: '"executionContexts"',
    ALL: '"cache","cookies","storage","executionContexts"',
  },
} as const);

// ============================================================
// Password Policy (Enhanced)
// ============================================================
export const PASSWORD_POLICY = Object.freeze({
  // Length requirements
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  
  // Character requirements
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL_CHARS: true,
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  
  // Security features
  PREVENT_COMMON_PASSWORDS: true,
  PREVENT_PERSONAL_INFO: true,
  PREVENT_SEQUENTIAL_CHARS: true,     // Prevent "123456", "abcdef"
  PREVENT_REPEATED_CHARS: true,       // Prevent "aaaaaa"
  
  // History & expiry
  MAX_HISTORY_COUNT: 5,
  EXPIRE_DAYS: 90,
  EXPIRE_WARNING_DAYS: 7,
  
  // Lockout after failed attempts
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 15,
} as const);

// ============================================================
// Rate Limiting Configuration (Bangladesh optimized)
// ============================================================
export const RATE_LIMITS = Object.freeze({
  // Global rate limits
  GLOBAL: {
    WINDOW_MS: 60000,      // 1 minute
    MAX_REQUESTS: 100,
  },
  
  // Auth endpoints (Stricter for security)
  AUTH: {
    LOGIN: { WINDOW_MS: 900000, MAX_REQUESTS: 5 },      // 5 per 15 min
    REGISTER: { WINDOW_MS: 3600000, MAX_REQUESTS: 3 },  // 3 per hour
    PASSWORD_RESET: { WINDOW_MS: 3600000, MAX_REQUESTS: 3 }, // 3 per hour
    MFA_VERIFY: { WINDOW_MS: 900000, MAX_REQUESTS: 5 }, // 5 per 15 min
    OTP_SEND: { WINDOW_MS: 600000, MAX_REQUESTS: 3 },   // 3 per 10 min
    OTP_VERIFY: { WINDOW_MS: 600000, MAX_REQUESTS: 5 }, // 5 per 10 min
  },
  
  // API endpoints
  API: {
    READ: { WINDOW_MS: 60000, MAX_REQUESTS: 60 },       // 60 per minute
    WRITE: { WINDOW_MS: 60000, MAX_REQUESTS: 30 },      // 30 per minute
    SEARCH: { WINDOW_MS: 60000, MAX_REQUESTS: 20 },     // 20 per minute
    EXPORT: { WINDOW_MS: 3600000, MAX_REQUESTS: 5 },    // 5 per hour
    IMPORT: { WINDOW_MS: 3600000, MAX_REQUESTS: 3 },    // 3 per hour
  },
  
  // Payment endpoints (Very strict)
  PAYMENT: {
    GENERAL: { WINDOW_MS: 60000, MAX_REQUESTS: 10 },    // 10 per minute
    INITIATE: { WINDOW_MS: 60000, MAX_REQUESTS: 5 },    // 5 per minute
    VERIFY: { WINDOW_MS: 60000, MAX_REQUESTS: 20 },     // 20 per minute
    WEBHOOK: { WINDOW_MS: 60000, MAX_REQUESTS: 100 },   // 100 per minute
  },
  
  // Bangladesh specific: Mobile network based
  MOBILE_NETWORK: {
    SLOW_2G_3G: { WINDOW_MS: 60000, MAX_REQUESTS: 30 }, // Stricter for slow networks
    WIFI_4G_5G: { WINDOW_MS: 60000, MAX_REQUESTS: 100 }, // Normal
  },
  
  // E-commerce specific
  ECOMMERCE: {
    CHECKOUT: { WINDOW_MS: 60000, MAX_REQUESTS: 10 },   // 10 per minute
    ADD_TO_CART: { WINDOW_MS: 60000, MAX_REQUESTS: 60 }, // 60 per minute
    APPLY_COUPON: { WINDOW_MS: 60000, MAX_REQUESTS: 20 }, // 20 per minute
    REVIEW_SUBMIT: { WINDOW_MS: 3600000, MAX_REQUESTS: 10 }, // 10 per hour
  },
} as const);

// ============================================================
// CORS Configuration (With payment gateways)
// ============================================================
export const CORS_CONFIG = Object.freeze({
  // Allowed origins
  ALLOWED_ORIGINS: [
    // Production domains
    'https://vubon.com.bd',
    'https://www.vubon.com.bd',
    'https://admin.vubon.com.bd',
    'https://seller.vubon.com.bd',
    'https://api.vubon.com.bd',
    
    // Bangladesh payment gateways
    'https://sandbox.sslcommerz.com',
    'https://secure.sslcommerz.com',
    'https://www.bkash.com',
    'https://www.nagad.com.bd',
    'https://www.rocket.com.bd',
    
    // Development
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:8080',
  ],
  
  // Allowed methods
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  
  // Allowed headers
  ALLOWED_HEADERS: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'x-api-key',
    'x-session-id',
    'x-request-id',
    'x-correlation-id',
    'x-device-id',
    'x-client-version',
    'x-platform',
  ],
  
  // Exposed headers
  EXPOSED_HEADERS: [
    'x-request-id',
    'x-correlation-id',
    'x-rate-limit-remaining',
    'x-rate-limit-reset',
    'x-rate-limit-limit',
  ],
  
  // CORS settings
  CREDENTIALS: true,
  MAX_AGE: 86400, // 24 hours
  
  // Preflight cache
  PREFLIGHT_MAX_AGE: 3600, // 1 hour
} as const);

// ============================================================
// Session Security (Enhanced)
// ============================================================
export const SESSION_SECURITY = Object.freeze({
  // Cookie settings
  SECURE_COOKIE: true,
  HTTP_ONLY_COOKIE: true,
  SAME_SITE: 'lax' as const,
  COOKIE_ENCRYPTION: true,
  
  // Session management
  REGENERATE_ON_LOGIN: true,
  REGENERATE_ON_PRIVILEGE_ESCALATION: true,
  ABSOLUTE_TIMEOUT_SECONDS: 86400,      // 24 hours
  IDLE_TIMEOUT_SECONDS: 1800,           // 30 minutes
  
  // Session binding (Enhanced security)
  BIND_TO_IP: false,                     // Can cause issues with mobile networks
  BIND_TO_USER_AGENT: true,
  BIND_TO_DEVICE_ID: true,
  
  // Concurrent sessions
  MAX_CONCURRENT_SESSIONS: 5,
  CONCURRENT_SESSION_STRATEGY: 'allow_new_kill_oldest' as const,
  
  // Session invalidation
  INVALIDATE_ON_PASSWORD_CHANGE: true,
  INVALIDATE_ON_ROLE_CHANGE: true,
  INVALIDATE_ON_MFA_CHANGE: true,
} as const);

// ============================================================
// Encryption Configuration (For reference only)
// ============================================================
export const ENCRYPTION_CONFIG = Object.freeze({
  ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,                        // 256 bits
  IV_LENGTH: 16,                         // 128 bits
  AUTH_TAG_LENGTH: 16,                   // 128 bits
  SALT_ROUNDS: 12,                       // bcrypt rounds
  HASH_ALGORITHM: 'sha256',
  ENCODING: 'hex' as const,
  
  // Key derivation
  PBKDF2_ITERATIONS: 100000,
  PBKDF2_DIGEST: 'sha256',
} as const);

// ============================================================
// JWT Configuration
// ============================================================
export const JWT_CONFIG = Object.freeze({
  ALGORITHM: 'RS256',
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  RESET_TOKEN_EXPIRY: '1h',
  VERIFICATION_TOKEN_EXPIRY: '24h',
  ISSUER: 'vubon.com.bd',
  AUDIENCE: 'vubon-api',
  
  // JWT claim names
  CLAIMS: {
    USER_ID: 'sub',
    EMAIL: 'email',
    ROLES: 'roles',
    PERMISSIONS: 'perms',
    SESSION_ID: 'sid',
    DEVICE_ID: 'did',
  },
} as const);

// ============================================================
// API Key Configuration
// ============================================================
export const API_KEY_CONFIG = Object.freeze({
  PREFIX: 'vub_',
  KEY_LENGTH: 32,
  SECRET_LENGTH: 64,
  ALLOWED_IPS: [],                       // Empty means all IPs allowed
  SCOPE_SEPARATOR: ':',
  
  // Rate limits per API key
  RATE_LIMITS: {
    DEFAULT: { WINDOW_MS: 60000, MAX_REQUESTS: 100 },
    PREMIUM: { WINDOW_MS: 60000, MAX_REQUESTS: 1000 },
    ENTERPRISE: { WINDOW_MS: 60000, MAX_REQUESTS: 10000 },
  },
} as const);

// ============================================================
// IP Blacklist (Bangladesh specific spam/fraud IPs)
// ============================================================
export const IP_BLACKLIST = Object.freeze({
  // Known malicious IP ranges
  MALICIOUS_RANGES: [
    '5.188.210.0/24',
    '185.130.5.0/24',
    '194.180.174.0/24',
  ],
  
  // Bangladesh spam IPs (placeholder - actual from monitoring)
  BD_SPAM_IPS: [
    // Will be populated from monitoring system
  ],
  
  // Known VPN/Proxy IPs (partial)
  VPN_PROXY_RANGES: [
    '104.16.0.0/12',
    '172.64.0.0/13',
  ],
} as const);

// ============================================================
// Security Events (Enhanced for e-commerce)
// ============================================================
export const SECURITY_EVENTS = Object.freeze({
  // Authentication events
  SUSPICIOUS_ACTIVITY: 'security.suspicious_activity',
  RATE_LIMIT_EXCEEDED: 'security.rate_limit_exceeded',
  BLOCKED_IP: 'security.blocked_ip',
  BRUTE_FORCE_ATTEMPT: 'security.brute_force_attempt',
  
  // Injection attacks
  SQL_INJECTION_ATTEMPT: 'security.sql_injection_attempt',
  XSS_ATTEMPT: 'security.xss_attempt',
  NO_SQL_INJECTION_ATTEMPT: 'security.nosql_injection_attempt',
  
  // API security
  API_KEY_COMPROMISED: 'security.api_key_compromised',
  UNAUTHORIZED_ACCESS: 'security.unauthorized_access',
  SUSPICIOUS_API_PATTERN: 'security.suspicious_api_pattern',
  
  // Payment security (Bangladesh specific)
  PAYMENT_FRAUD_ATTEMPT: 'security.payment_fraud_attempt',
  CARDING_ATTEMPT: 'security.carding_attempt',      // Testing stolen cards
  PROMO_ABUSE_ATTEMPT: 'security.promo_abuse_attempt',
  COUPON_BRUTE_FORCE: 'security.coupon_brute_force',
  
  // Account security
  ACCOUNT_TAKEOVER_ATTEMPT: 'security.account_takeover_attempt',
  CREDENTIAL_STUFFING: 'security.credential_stuffing',
  SIM_SWAP_DETECTED: 'security.sim_swap_detected',
  
  // E-commerce specific
  INVENTORY_SCRAPING: 'security.inventory_scraping',
  PRICE_SCRAPING: 'security.price_scraping',
  REVIEW_SPAM: 'security.review_spam',
  FAKE_ORDER_ATTEMPT: 'security.fake_order_attempt',
  
  // DDoS & Bot
  DDOS_ATTEMPT: 'security.ddos_attempt',
  BOT_DETECTED: 'security.bot_detected',
  HIGH_TRAFFIC_ALERT: 'security.high_traffic_alert',
} as const);

// ============================================================
// Security Alert Thresholds
// ============================================================
export const SECURITY_ALERT_THRESHOLDS = Object.freeze({
  // Critical alerts (Immediate action)
  CRITICAL: {
    SQL_INJECTION_ATTEMPTS: 3,
    XSS_ATTEMPTS: 5,
    ACCOUNT_TAKEOVER_ATTEMPTS: 3,
    PAYMENT_FRAUD_ATTEMPTS: 2,
    SIM_SWAP_DETECTED: 1,
  },
  
  // High alerts (Monitor closely)
  HIGH: {
    FAILED_LOGINS_PER_IP: 20,
    FAILED_LOGINS_PER_USER: 5,
    RATE_LIMIT_EXCEEDED: 10,
    SUSPICIOUS_API_PATTERNS: 5,
  },
  
  // Medium alerts (Log for analysis)
  MEDIUM: {
    PROMO_ABUSE_ATTEMPTS: 10,
    COUPON_BRUTE_FORCE_ATTEMPTS: 50,
    REVIEW_SPAM_ATTEMPTS: 20,
  },
} as const);

// ============================================================
// Bangladesh Specific Security Settings
// ============================================================
export const BD_SECURITY_SETTINGS = Object.freeze({
  // Mobile network operators
  MOBILE_OPERATORS: {
    GP: 'grameenphone',
    ROBI: 'robi',
    BANGLALINK: 'banglalink',
    TELETALK: 'teletalk',
  },
  
  // Enhanced security during holidays
  HOLIDAY_ENHANCEMENTS: {
    ENABLED: true,
    STRICTER_RATE_LIMITS: true,
    ENHANCED_MFA_REQUIRED: true,
    EXTRA_VERIFICATION_FOR_PAYMENTS: true,
  },
  
  // Weekend security (Friday, Saturday in BD)
  WEEKEND_ENHANCEMENTS: {
    ENABLED: true,
    STRICTER_FRAUD_CHECKS: true,
    REVIEW_HIGH_VALUE_TRANSACTIONS: true,
  },
  
  // Night time security (10 PM - 6 AM)
  NIGHT_TIME_ENHANCEMENTS: {
    ENABLED: true,
    ADDITIONAL_MFA_REQUIRED: true,
    FLAG_SUSPICIOUS_ACTIVITY: true,
  },
} as const);

// ============================================================
// Security Headers for Payment Gateways
// ============================================================
export const PAYMENT_GATEWAY_SECURITY = Object.freeze({
  SSLCOMMERZ: {
    ALLOWED_IPS: ['45.64.44.0/24', '45.64.45.0/24'],
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
  BKASH: {
    ALLOWED_IPS: ['103.115.80.0/20'],
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
  NAGAD: {
    ALLOWED_IPS: ['103.112.0.0/16'],
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
} as const);

// ============================================================
// Security Logging Configuration
// ============================================================
export const SECURITY_LOGGING = Object.freeze({
  // What to log
  LOG_ALL_AUTH_ATTEMPTS: true,
  LOG_ALL_API_ACCESS: false,               // Too verbose, only sample
  LOG_ALL_PAYMENT_ACTIONS: true,
  LOG_SENSITIVE_DATA_ACCESS: true,
  LOG_ADMIN_ACTIONS: true,
  
  // Sampling rate (for high-volume logs)
  API_ACCESS_SAMPLE_RATE: 0.01,            // Log 1% of API access
  
  // Retention period (days)
  RETENTION_DAYS: {
    AUTH_LOGS: 90,
    API_LOGS: 30,
    PAYMENT_LOGS: 365,                      // Financial regulations
    ADMIN_LOGS: 365,
    SECURITY_EVENTS: 365,
  },
  
  // Alert channels
  ALERT_CHANNELS: {
    CRITICAL: ['email', 'sms', 'slack'],
    HIGH: ['email', 'slack'],
    MEDIUM: ['slack'],
    LOW: ['log_only'],
  },
} as const);

// ============================================================
// Security Testing Headers (For development/staging)
// ============================================================
export const SECURITY_TESTING = Object.freeze({
  ENABLED_IN_DEVELOPMENT: true,
  ENABLED_IN_STAGING: true,
  ENABLED_IN_PRODUCTION: false,
  
  // Test headers (X-Forwarded-*, etc.)
  TEST_HEADERS: {
    X_FORWARDED_FOR: 'x-forwarded-for',
    X_FORWARDED_PROTO: 'x-forwarded-proto',
    X_REAL_IP: 'x-real-ip',
  },
  
  // Bypass mechanisms (for testing only)
  TEST_BYPASS_ENABLED: false,
  TEST_BYPASS_HEADER: 'x-bypass-security',
  TEST_BYPASS_TOKEN: 'test-bypass-token-123',
} as const);
