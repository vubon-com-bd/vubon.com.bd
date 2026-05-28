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
// Date Configuration (for date formatting)
// ============================================================
export const DATE_CONFIG = Object.freeze({
  // Date formats
  DATE_FORMATS: {
    ISO: 'yyyy-MM-dd',
    ISO_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    DATE: 'yyyy-MM-dd',
    TIME: 'HH:mm:ss',
    DATETIME: 'yyyy-MM-dd HH:mm:ss',
    DATETIME_12H: 'yyyy-MM-dd hh:mm:ss a',
    DISPLAY_DATE: 'MMM dd, yyyy',
    DISPLAY_DATE_LONG: 'MMMM dd, yyyy',
    DISPLAY_TIME: 'hh:mm a',
    DISPLAY_DATETIME: 'MMM dd, yyyy hh:mm a',
    DISPLAY_DATETIME_LONG: 'MMMM dd, yyyy hh:mm:ss a',
    BENGALI_DATE: 'dd MMM, yyyy',
    BENGALI_DATETIME: 'dd MMM, yyyy hh:mm a',
    FILE_DATE: 'yyyy-MM-dd',
    FILE_DATETIME: 'yyyy-MM-dd_HH-mm-ss',
    API_DATE: 'yyyy-MM-dd',
    API_DATETIME: 'yyyy-MM-ddTHH:mm:ssZ',
  } as const,

  DEFAULT_DATE_FORMAT: 'yyyy-MM-dd',
  DEFAULT_TIME_FORMAT: 'HH:mm:ss',
  DEFAULT_DATETIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
  DEFAULT_DISPLAY_DATE_FORMAT: 'MMM dd, yyyy',
  DEFAULT_DISPLAY_DATETIME_FORMAT: 'MMM dd, yyyy hh:mm a',
  DEFAULT_TIMEZONE: 'Asia/Dhaka',
} as const);

// ============================================================
// Number Configuration (for number formatting)
// ============================================================
export const NUMBER_CONFIG = Object.freeze({
  DEFAULT_DECIMAL_PLACES: 2,
  DEFAULT_ROUNDING_PRECISION: 2,
  DEFAULT_PERCENTAGE_DECIMALS: 1,

  NUMBER_FORMATS: {
    STANDARD: 'standard',
    COMMA: 'comma',
    COMPACT: 'compact',
    SCIENTIFIC: 'scientific',
  } as const,

  // Unit suffixes for compact formatting
  UNIT_SUFFIXES: [
    { value: 1e3, suffix: 'K' },
    { value: 1e6, suffix: 'M' },
    { value: 1e9, suffix: 'B' },
    { value: 1e12, suffix: 'T' },
  ],

  // Maximum decimal places allowed
  MAX_DECIMAL_PLACES: 10,
} as const);

// ============================================================
// Currency Configuration (for formatting and conversion)
// ============================================================
export const CURRENCY_CONFIG = Object.freeze({
  // Supported currencies
  CURRENCIES: {
    USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar', decimalPlaces: 2 },
    BDT: { code: 'BDT', symbol: '৳', locale: 'bn-BD', name: 'Bangladeshi Taka', decimalPlaces: 2 },
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro', decimalPlaces: 2 },
    GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound', decimalPlaces: 2 },
    INR: { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee', decimalPlaces: 2 },
    AED: { code: 'AED', symbol: 'د.إ', locale: 'ar-AE', name: 'UAE Dirham', decimalPlaces: 2 },
    SGD: { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar', decimalPlaces: 2 },
    CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar', decimalPlaces: 2 },
    AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar', decimalPlaces: 2 },
    JPY: { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen', decimalPlaces: 0 },
    CNY: { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan', decimalPlaces: 2 },
  } as const,

  DEFAULT_CURRENCY: 'BDT',
  DEFAULT_DECIMAL_PLACES: 2,
  MIN_DECIMAL_PLACES: 0,
  MAX_DECIMAL_PLACES: 4,
  MAX_DISCOUNT_PERCENTAGE: 100,
  MIN_DISCOUNT_PERCENTAGE: 0,
} as const);

// ============================================================
// String Configuration (for string manipulation)
// ============================================================
export const STRING_CONFIG = Object.freeze({
  SLUG_SEPARATOR: '-',
  DEFAULT_TRUNCATE_LENGTH: 100,
  DEFAULT_MAX_WORDS: 50,
  DEFAULT_MASK_CHAR: '*',

  // Title case exceptions (words that shouldn't be capitalized unless at start)
  TITLE_CASE_EXCEPTIONS: [
    'a', 'an', 'and', 'the', 'of', 'for', 'in', 'on', 'at', 'to',
    'by', 'with', 'without', 'or', 'nor', 'but', 'so', 'yet',
    'as', 'is', 'was', 'were', 'be', 'been', 'being',
  ],

  // Slug special characters to remove
  SLUG_SPECIAL_CHARS_REGEX: /[^\w\s-]/g,
  SLUG_MULTIPLE_SEPARATOR_REGEX: /[\s_-]+/g,
} as const);

// ============================================================
// OTP Configuration (One-Time Password)
// ============================================================
export const OTP_CONFIG = Object.freeze({
  LENGTH: 6,                       // OTP length in digits
  DIGITS_ONLY: true,               // Only numeric digits
  EXPIRY_SECONDS: 300,             // 5 minutes
  MAX_VERIFY_ATTEMPTS: 3,          // Max attempts before lockout
  RESEND_COOLDOWN_SECONDS: 30,     // Seconds before resend allowed
} as const);

// ============================================================
// Recovery Codes Configuration (MFA Backup)
// ============================================================
export const RECOVERY_CODES = Object.freeze({
  COUNT: 10,                       // Number of recovery codes to generate
  CODE_LENGTH: 8,                  // Length of each recovery code
  CODE_FORMAT: 'alphanumeric',     // Format: alphanumeric
  HASH_ALGORITHM: 'SHA-256',       // For hashing stored codes
  ONE_TIME_USE: true,              // Codes can only be used once
} as const);

// ============================================================
// Token Configuration (General purpose tokens)
// ============================================================
export const TOKEN_CONFIG = Object.freeze({
  DEFAULT_LENGTH: 32,              // Default token length in bytes
  MIN_LENGTH: 16,                  // Minimum token length
  MAX_LENGTH: 256,                 // Maximum token length
  ENCODING: 'hex',                 // Default encoding: hex
} as const);

// ============================================================
// Nonce Configuration (Cryptographic nonce)
// ============================================================
export const NONCE_CONFIG = Object.freeze({
  DEFAULT_LENGTH: 16,              // Default nonce length in bytes
  MIN_LENGTH: 8,                   // Minimum nonce length
  MAX_LENGTH: 64,                  // Maximum nonce length
  ENCODING: 'base64',              // Default encoding: base64
} as const);

// ============================================================
// Character Sets for Random Generation
// ============================================================
export const CHARACTER_SETS = Object.freeze({
  ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  NUMERIC: '0123456789',
  HEX_LOWER: '0123456789abcdef',
  HEX_UPPER: '0123456789ABCDEF',
  BASE64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  BASE64URL: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  SECURE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?',
} as const);

// ============================================================
// Fingerprint Configuration (Device fingerprinting)
// ============================================================
export const FINGERPRINT_CONFIG = Object.freeze({
  HASH_ALGORITHM: 'sha256',
  SEPARATOR: '|',
  DEFAULT_VERSION: 1,
  MIN_LENGTH: 8,
  MAX_LENGTH: 64,
  SHORT_FINGERPRINT_LENGTH: 16,
} as const);

// ============================================================
// Browser Fingerprint Components
// ============================================================
export const BROWSER_FINGERPRINT_COMPONENTS = Object.freeze([
  'userAgent',
  'acceptLanguage',
  'acceptEncoding',
  'secChUa',
  'secChUaPlatform',
  'secChUaMobile',
  'platform',
  'timezone',
  'screenResolution',
  'colorDepth',
  'deviceMemory',
  'hardwareConcurrency',
] as const);

// ============================================================
// IP Configuration (Validation, private ranges, forwarded headers)
// ============================================================
export const IP_CONFIG = Object.freeze({
  // IPv4 Regex (strict)
  IPV4_REGEX: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // IPv6 Regex (RFC 5954 compliant)
  IPV6_REGEX: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,

  // Private IPv4 ranges
  PRIVATE_IPV4_RANGES: [
    { start: '10.0.0.0', end: '10.255.255.255', description: 'Class A private' },
    { start: '172.16.0.0', end: '172.31.255.255', description: 'Class B private' },
    { start: '192.168.0.0', end: '192.168.255.255', description: 'Class C private' },
    { start: '127.0.0.0', end: '127.255.255.255', description: 'Loopback' },
    { start: '169.254.0.0', end: '169.254.255.255', description: 'Link-local' },
  ],

  // Reserved/private IPv6 prefixes
  PRIVATE_IPV6_PREFIXES: [
    { prefix: '::1', description: 'Loopback' },
    { prefix: 'fc00::', description: 'Unique Local (ULA)' },
    { prefix: 'fd00::', description: 'Unique Local (ULA)' },
    { prefix: 'fe80::', description: 'Link-local' },
  ],

  // Forwarded header names (priority order)
  FORWARDED_HEADERS: [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'fastly-client-ip',
    'true-client-ip',
    'x-original-forwarded-for',
    'x-cluster-client-ip',
  ],
} as const);

// ============================================================
// User Agent Configuration (Bot patterns, device indicators, BD browsers)
// ============================================================
export const USER_AGENT_CONFIG = Object.freeze({
  // Bot/Crawler patterns
  BOT_PATTERNS: [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /headless/i,
    /puppeteer/i,
    /playwright/i,
    /selenium/i,
    /cypress/i,
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /facebot/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
    /discordbot/i,
    /slackbot/i,
  ],

  // Mobile device indicators
  MOBILE_INDICATORS: [
    'Mobile',
    'Android',
    'iPhone',
    'iPod',
    'BlackBerry',
    'Windows Phone',
    'Opera Mini',
    'IEMobile',
  ],

  // Tablet indicators
  TABLET_INDICATORS: ['iPad', 'Tablet', 'Kindle', 'Silk'],

  // Bangladesh specific browser patterns
  BD_BROWSER_PATTERNS: [
    { pattern: /ucbrowser/i, name: 'UC Browser' },
    { pattern: /opera mini/i, name: 'Opera Mini' },
    { pattern: /samsungbrowser/i, name: 'Samsung Browser' },
    { pattern: /miui browser/i, name: 'Mi Browser' },
  ],
} as const);

// ============================================================
// Common Passwords Blacklist (Bangladesh specific)
// ============================================================
export const COMMON_PASSWORDS = Object.freeze([
  'password', '123456', 'qwerty', 'admin', 'welcome',
  'bangladesh', 'dhaka', 'vubon', '12345678',
  'iloveyou', 'princess', 'sunshine', 'password123',
  'qwerty123', 'abc123', 'admin123', 'user123',
  'bangla', 'chittagong', 'rajshahi', 'khulna',
] as const);

// ============================================================
// Password Policy (Enhanced)
// ============================================================
export const PASSWORD_POLICY = Object.freeze({
  // Length requirements
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  STRONG_LENGTH: 12,           // Minimum length for "strong" password
  VERY_STRONG_LENGTH: 16,      // Minimum length for "very strong" password

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
// Encryption Configuration (Enhanced with scrypt parameters)
// ============================================================
export const ENCRYPTION_CONFIG = Object.freeze({
  // AES-256-GCM parameters
  ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,                        // 256 bits
  IV_LENGTH: 16,                         // 128 bits
  AUTH_TAG_LENGTH: 16,                   // 128 bits

  // Encoding
  ENCODING: 'hex' as const,

  // Key derivation (scrypt) - OWASP recommended
  SCRYPT_N: 16384,                       // CPU/memory cost (2^14 = 16,384)
  SCRYPT_R: 8,                           // Block size
  SCRYPT_P: 1,                           // Parallelization factor

  // Legacy key derivation (PBKDF2 - for backward compatibility)
  PBKDF2_ITERATIONS: 100000,
  PBKDF2_DIGEST: 'sha256',

  // Hashing (for passwords)
  HASH_ALGORITHM: 'sha256',
  SALT_ROUNDS: 12,                       // bcrypt rounds (2^12 = 4096 iterations)
  MIN_SALT_ROUNDS: 10,                   // Minimum bcrypt rounds
  MAX_SALT_ROUNDS: 14,                   // Maximum bcrypt rounds

  // Minimum secret length for encryption keys
  MIN_SECRET_LENGTH: 8,                  // Separate from password policy
} as const);

// ============================================================
// JWT Configuration (for authentication)
// ============================================================
export const JWT_CONFIG = Object.freeze({
  // RS256 configuration (asymmetric - for production)
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

  // HS256 configuration (symmetric - for internal/legacy use)
  HS256_CONFIG: {
    ALGORITHM: 'HS256',
    MIN_SECRET_LENGTH: 32,
    TOKEN_TYPE: 'JWT',
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
