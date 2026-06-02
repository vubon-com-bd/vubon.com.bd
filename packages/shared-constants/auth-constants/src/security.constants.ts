/**
 * Security Constants - Pure immutable security configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/security.constants
 * 
 * RULES:
 * ✅ NO helmet setup, crypto functions, encryption logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Environment detection (for conditional configs)
// ============================================================
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION;

// ============================================================
// Imports from other constants (single source of truth)
// ============================================================
import { OTP_CONFIG } from './auth.constants';
import { 
  REGEX_EMAIL, 
  REGEX_PHONE, 
  REGEX_HTML_TAGS, 
  REGEX_SCRIPT_TAGS, 
  REGEX_SQL_INJECTION, 
  REGEX_XSS 
} from './regex.constants';

// ============================================================
// CSP (Content Security Policy) Directives
// Enhanced for Bangladesh e-commerce - PRODUCTION READY
// ============================================================
export const CSP_DIRECTIVES = {
  DEFAULT_SRC: ["'self'"],
  // PRODUCTION: No 'unsafe-inline', uses nonce-based approach
  // DEVELOPMENT: Allows 'unsafe-inline' for HMR and dev tools
  SCRIPT_SRC: IS_PRODUCTION 
    ? ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/']
    : ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
  STYLE_SRC: IS_PRODUCTION
    ? ["'self'", 'https://fonts.googleapis.com']
    : ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  IMG_SRC: ["'self'", 'data:', 'https:', 'blob:'],
  FONT_SRC: ["'self'", 'https:', 'data:', 'https://fonts.gstatic.com'],
  CONNECT_SRC: [
    "'self'", 
    'https://vubon.com.bd',
    'https://www.vubon.com.bd',
    'https://api.vubon.com.bd', 
    'wss://ws.vubon.com.bd', 
    'https://*.sslcommerz.com', 
    'https://*.bkash.com', 
    'https://*.nagad.com.bd'
  ],
  FRAME_SRC: [
    "'self'", 
    'https://*.sslcommerz.com', 
    'https://*.bkash.com', 
    'https://*.nagad.com.bd', 
    'https://www.google.com/recaptcha/'
  ],
  OBJECT_SRC: ["'none'"],
  BASE_URI: ["'self'"],
  FORM_ACTION: ["'self'", 'https://*.sslcommerz.com', 'https://*.bkash.com'],
  FRAME_ANCESTORS: ["'none'"],
  UPGRADE_INSECURE_REQUESTS: IS_PRODUCTION ? [] : [],
  BLOCK_ALL_MIXED_CONTENT: [],
  MANIFEST_SRC: ["'self'"],
  WORKER_SRC: ["'self'", 'blob:'],
  CHILD_SRC: ["'self'", 'blob:'],
  NAVIGATE_TO: ["'self'"],
  REPORT_URI: ['/api/security/csp-report'],
} as const;

// ============================================================
// Security Header Names
// ============================================================
export const SECURITY_HEADERS = {
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
  CORS_ORIGIN: 'Access-Control-Allow-Origin',
  CORS_METHODS: 'Access-Control-Allow-Methods',
  CORS_HEADERS: 'Access-Control-Allow-Headers',
  CORS_CREDENTIALS: 'Access-Control-Allow-Credentials',
  CORS_EXPOSE_HEADERS: 'Access-Control-Expose-Headers',
  CORS_MAX_AGE: 'Access-Control-Max-Age',
  FEATURE_POLICY: 'Feature-Policy',
  EXPECT_CT: 'Expect-CT',
  ORIGIN_TRIAL: 'Origin-Trial',
  CLEAR_SITE_DATA: 'Clear-Site-Data',
} as const;

// ============================================================
// Security Header Values
// ============================================================
export const SECURITY_HEADER_VALUES = {
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
} as const;

// ============================================================
// Email Configuration (for email validation and categorization)
// ============================================================
export const EMAIL_CONFIG = {
  EMAIL_REGEX: REGEX_EMAIL.STRICT,
  COMMON_EMAIL_DOMAINS: [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'aol.com',
    'protonmail.com',
    'mail.com',
    'gmx.com',
    'yandex.com',
  ],
  BANGLADESH_EMAIL_DOMAINS: [
    'yahoo.com.bd',
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'agni.com',
    'bdcom.com',
    'btcl.net.bd',
    'dhaka.net',
    'link3.net',
    'grameenphone.com',
    'robi.com.bd',
    'banglalink.com',
    'teletalk.com.bd',
  ],
  EDUCATIONAL_DOMAINS: [
    'du.ac.bd',
    'buet.ac.bd',
    'ru.ac.bd',
    'cu.ac.bd',
    'ju.ac.bd',
    'northsouth.edu',
    'bracu.ac.bd',
    'aiub.edu',
    'iub.edu.bd',
    'ewubd.edu',
    'uiu.ac.bd',
    'daffodilvarsity.edu.bd',
  ],
} as const;

// ============================================================
// Date Configuration (for date formatting)
// ============================================================
export const DATE_CONFIG = {
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
  },
  DEFAULT_DATE_FORMAT: 'yyyy-MM-dd',
  DEFAULT_TIME_FORMAT: 'HH:mm:ss',
  DEFAULT_DATETIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
  DEFAULT_DISPLAY_DATE_FORMAT: 'MMM dd, yyyy',
  DEFAULT_DISPLAY_DATETIME_FORMAT: 'MMM dd, yyyy hh:mm a',
  DEFAULT_TIMEZONE: 'Asia/Dhaka',
} as const;

// ============================================================
// Number Configuration (for number formatting)
// ============================================================
export const NUMBER_CONFIG = {
  DEFAULT_DECIMAL_PLACES: 2,
  DEFAULT_ROUNDING_PRECISION: 2,
  DEFAULT_PERCENTAGE_DECIMALS: 1,
  NUMBER_FORMATS: {
    STANDARD: 'standard',
    COMMA: 'comma',
    COMPACT: 'compact',
    SCIENTIFIC: 'scientific',
  },
  UNIT_SUFFIXES: [
    { value: 1e3, suffix: 'K' },
    { value: 1e6, suffix: 'M' },
    { value: 1e9, suffix: 'B' },
    { value: 1e12, suffix: 'T' },
  ],
  MAX_DECIMAL_PLACES: 10,
} as const;

// ============================================================
// Currency Configuration (for formatting and conversion)
// ============================================================
export const CURRENCY_CONFIG = {
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
  },
  DEFAULT_CURRENCY: 'BDT',
  DEFAULT_DECIMAL_PLACES: 2,
  MIN_DECIMAL_PLACES: 0,
  MAX_DECIMAL_PLACES: 4,
  MAX_DISCOUNT_PERCENTAGE: 100,
  MIN_DISCOUNT_PERCENTAGE: 0,
} as const;

// ============================================================
// String Configuration (for string manipulation)
// ============================================================
export const STRING_CONFIG = {
  SLUG_SEPARATOR: '-',
  DEFAULT_TRUNCATE_LENGTH: 100,
  DEFAULT_MAX_WORDS: 50,
  DEFAULT_MASK_CHAR: '*',
  TITLE_CASE_EXCEPTIONS: [
    'a', 'an', 'and', 'the', 'of', 'for', 'in', 'on', 'at', 'to',
    'by', 'with', 'without', 'or', 'nor', 'but', 'so', 'yet',
    'as', 'is', 'was', 'were', 'be', 'been', 'being',
  ],
  SLUG_SPECIAL_CHARS_REGEX: /[^\w\s-]/g,
  SLUG_MULTIPLE_SEPARATOR_REGEX: /[\s_-]+/g,
} as const;

// ============================================================
// Phone Configuration (for phone number validation)
// ============================================================
export const PHONE_CONFIG = {
  DEFAULT_COUNTRY: 'BD',
  DEFAULT_COUNTRY_CODE: '+880',
  BD_MOBILE_OPERATORS: {
    GP: { prefix: '017', name: 'Grameenphone', regex: /^017\d{8}$/ },
    ROB: { prefix: '018', name: 'Robi', regex: /^018\d{8}$/ },
    BL: { prefix: '019', name: 'Banglalink', regex: /^019\d{8}$/ },
    TT: { prefix: '015', name: 'Teletalk', regex: /^015\d{8}$/ },
    AIR: { prefix: '016', name: 'Airtel', regex: /^016\d{8}$/ },
  },
  BD_MOBILE_REGEX: REGEX_PHONE.BANGLADESH,
  BD_MOBILE_STRICT_REGEX: REGEX_PHONE.BANGLADESH_ALL,
  SUPPORTED_COUNTRIES: ['BD', 'US', 'GB', 'IN', 'AE', 'SG', 'CA', 'AU'],
} as const;

// ============================================================
// Sanitize Configuration (for XSS and input sanitization)
// ============================================================
export const SANITIZE_CONFIG = {
  HTML_TAG_REGEX: REGEX_HTML_TAGS,
  HTML_COMMENT_REGEX: /<!--[\s\S]*?-->/g,
  SCRIPT_TAG_REGEX: REGEX_SCRIPT_TAGS,
  STYLE_TAG_REGEX: /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
  IFRAME_TAG_REGEX: /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  OBJECT_TAG_REGEX: /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  EMBED_TAG_REGEX: /<embed\b[^>]*>/gi,
  FORM_TAG_REGEX: /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
  JAVASCRIPT_PROTOCOL_REGEX: /javascript:/gi,
  VBSCRIPT_PROTOCOL_REGEX: /vbscript:/gi,
  DATA_PROTOCOL_REGEX: /data:/gi,
  ON_EVENT_REGEX: /\bon\w+\s*=/gi,
  SQL_INJECTION_REGEX: REGEX_SQL_INJECTION,
  SQL_SPECIAL_CHARS: /['"\\%_]/g,
  XSS_REGEX: REGEX_XSS,
  NORMALIZATION_FORM: 'NFKC',
} as const;

// ============================================================
// CORS Configuration (With payment gateways)
// PRODUCTION: Only production domains
// DEVELOPMENT: Localhost allowed
// ============================================================
export const CORS_CONFIG = {
  ALLOWED_ORIGINS: IS_PRODUCTION
    ? [
        // Production domains only
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
      ]
    : [
        // Development & staging
        'https://vubon.com.bd',
        'https://www.vubon.com.bd',
        'https://admin.vubon.com.bd',
        'https://seller.vubon.com.bd',
        'https://api.vubon.com.bd',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:3003',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        // Payment gateways (sandbox for dev)
        'https://sandbox.sslcommerz.com',
        'https://secure.sslcommerz.com',
        'https://www.bkash.com',
        'https://www.nagad.com.bd',
        'https://www.rocket.com.bd',
      ],
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
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
  EXPOSED_HEADERS: [
    'x-request-id',
    'x-correlation-id',
    'x-rate-limit-remaining',
    'x-rate-limit-reset',
    'x-rate-limit-limit',
  ],
  CREDENTIALS: true,
  MAX_AGE: 86400,
  PREFLIGHT_MAX_AGE: 3600,
} as const;

// ============================================================
// Rate Limiting Configuration (Bangladesh optimized)
// Fixed window times for clarity
// ============================================================
export const RATE_LIMITS = {
  GLOBAL: {
    WINDOW_MS: 60 * 1000,      // 1 minute
    MAX_REQUESTS: 100,
  },
  AUTH: {
    LOGIN: { WINDOW_MS: 15 * 60 * 1000, MAX_REQUESTS: 5 },      // 5 per 15 minutes
    REGISTER: { WINDOW_MS: 60 * 60 * 1000, MAX_REQUESTS: 3 },    // 3 per hour
    PASSWORD_RESET: { WINDOW_MS: 60 * 60 * 1000, MAX_REQUESTS: 3 }, // 3 per hour
    MFA_VERIFY: { WINDOW_MS: 15 * 60 * 1000, MAX_REQUESTS: 5 },   // 5 per 15 minutes
    OTP_SEND: { WINDOW_MS: 10 * 60 * 1000, MAX_REQUESTS: 3 },     // 3 per 10 minutes
    OTP_VERIFY: { WINDOW_MS: 10 * 60 * 1000, MAX_REQUESTS: 5 },    // 5 per 10 minutes
  },
  API: {
    READ: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 60 },       // 60 per minute
    WRITE: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 30 },      // 30 per minute
    SEARCH: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 20 },     // 20 per minute
    EXPORT: { WINDOW_MS: 60 * 60 * 1000, MAX_REQUESTS: 5 }, // 5 per hour
    IMPORT: { WINDOW_MS: 60 * 60 * 1000, MAX_REQUESTS: 3 }, // 3 per hour
  },
  PAYMENT: {
    GENERAL: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 10 },     // 10 per minute
    INITIATE: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 5 },     // 5 per minute
    VERIFY: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 20 },      // 20 per minute
    WEBHOOK: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 100 },    // 100 per minute
  },
  MOBILE_NETWORK: {
    SLOW_2G_3G: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 30 },   // Stricter for slow networks
    WIFI_4G_5G: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 100 },  // Normal
  },
  ECOMMERCE: {
    CHECKOUT: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 10 },     // 10 per minute
    ADD_TO_CART: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 60 },  // 60 per minute
    APPLY_COUPON: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 20 }, // 20 per minute
    REVIEW_SUBMIT: { WINDOW_MS: 60 * 60 * 1000, MAX_REQUESTS: 10 }, // 10 per hour
  },
} as const;

// ============================================================
// Session Security (Enhanced)
// ============================================================
export const SESSION_SECURITY = {
  SECURE_COOKIE: IS_PRODUCTION,
  HTTP_ONLY_COOKIE: true,
  SAME_SITE: 'lax' as const,
  COOKIE_ENCRYPTION: true,
  REGENERATE_ON_LOGIN: true,
  REGENERATE_ON_PRIVILEGE_ESCALATION: true,
  ABSOLUTE_TIMEOUT_SECONDS: 86400,      // 24 hours
  IDLE_TIMEOUT_SECONDS: 1800,           // 30 minutes
  BIND_TO_IP: false,                     // Mobile networks in Bangladesh
  BIND_TO_USER_AGENT: true,
  BIND_TO_DEVICE_ID: true,
  MAX_CONCURRENT_SESSIONS: 5,
  CONCURRENT_SESSION_STRATEGY: 'allow_new_kill_oldest' as const,
  INVALIDATE_ON_PASSWORD_CHANGE: true,
  INVALIDATE_ON_ROLE_CHANGE: true,
  INVALIDATE_ON_MFA_CHANGE: true,
} as const;

// ============================================================
// Encryption Configuration (OWASP compliant)
// ============================================================
export const ENCRYPTION_CONFIG = {
  ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,                        // 256 bits
  IV_LENGTH: 16,                         // 128 bits
  AUTH_TAG_LENGTH: 16,                   // 128 bits
  ENCODING: 'hex' as const,
  SCRYPT_N: 16384,                       // 2^14 = 16,384 (OWASP recommended)
  SCRYPT_R: 8,                           // Block size
  SCRYPT_P: 1,                           // Parallelization factor
  PBKDF2_ITERATIONS: 100000,
  PBKDF2_DIGEST: 'sha256',
  HASH_ALGORITHM: 'sha256',
  SALT_ROUNDS: 12,                       // bcrypt rounds
  MIN_SALT_ROUNDS: 10,
  MAX_SALT_ROUNDS: 14,
  MIN_SECRET_LENGTH: 8,
} as const;

// ============================================================
// JWT Configuration (for authentication)
// ============================================================
export const JWT_CONFIG = {
  ALGORITHM: 'RS256',
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  RESET_TOKEN_EXPIRY: '1h',
  VERIFICATION_TOKEN_EXPIRY: '24h',
  ISSUER: 'vubon.com.bd',
  AUDIENCE: 'vubon-api',
  CLAIMS: {
    USER_ID: 'sub',
    EMAIL: 'email',
    ROLES: 'roles',
    PERMISSIONS: 'perms',
    SESSION_ID: 'sid',
    DEVICE_ID: 'did',
  },
  HS256_CONFIG: {
    ALGORITHM: 'HS256',
    MIN_SECRET_LENGTH: 32,
    TOKEN_TYPE: 'JWT',
  },
} as const;

// ============================================================
// API Key Configuration
// ============================================================
export const API_KEY_CONFIG = {
  PREFIX: 'vub_',
  KEY_LENGTH: 32,
  SECRET_LENGTH: 64,
  ALLOWED_IPS: [],
  SCOPE_SEPARATOR: ':',
  RATE_LIMITS: {
    DEFAULT: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 100 },
    PREMIUM: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 1000 },
    ENTERPRISE: { WINDOW_MS: 60 * 1000, MAX_REQUESTS: 10000 },
  },
} as const;

// ============================================================
// IP Blacklist (Bangladesh specific spam/fraud IPs)
// ============================================================
export const IP_BLACKLIST = {
  MALICIOUS_RANGES: [
    '5.188.210.0/24',
    '185.130.5.0/24',
    '194.180.174.0/24',
  ],
  BD_SPAM_IPS: [],
  VPN_PROXY_RANGES: [
    '104.16.0.0/12',
    '172.64.0.0/13',
  ],
} as const;

// ============================================================
// Security Events (Enhanced for e-commerce)
// ============================================================
export const SECURITY_EVENTS = {
  SUSPICIOUS_ACTIVITY: 'security.suspicious_activity',
  RATE_LIMIT_EXCEEDED: 'security.rate_limit_exceeded',
  BLOCKED_IP: 'security.blocked_ip',
  BRUTE_FORCE_ATTEMPT: 'security.brute_force_attempt',
  SQL_INJECTION_ATTEMPT: 'security.sql_injection_attempt',
  XSS_ATTEMPT: 'security.xss_attempt',
  NO_SQL_INJECTION_ATTEMPT: 'security.nosql_injection_attempt',
  API_KEY_COMPROMISED: 'security.api_key_compromised',
  UNAUTHORIZED_ACCESS: 'security.unauthorized_access',
  SUSPICIOUS_API_PATTERN: 'security.suspicious_api_pattern',
  PAYMENT_FRAUD_ATTEMPT: 'security.payment_fraud_attempt',
  CARDING_ATTEMPT: 'security.carding_attempt',
  PROMO_ABUSE_ATTEMPT: 'security.promo_abuse_attempt',
  COUPON_BRUTE_FORCE: 'security.coupon_brute_force',
  ACCOUNT_TAKEOVER_ATTEMPT: 'security.account_takeover_attempt',
  CREDENTIAL_STUFFING: 'security.credential_stuffing',
  SIM_SWAP_DETECTED: 'security.sim_swap_detected',
  INVENTORY_SCRAPING: 'security.inventory_scraping',
  PRICE_SCRAPING: 'security.price_scraping',
  REVIEW_SPAM: 'security.review_spam',
  FAKE_ORDER_ATTEMPT: 'security.fake_order_attempt',
  DDOS_ATTEMPT: 'security.ddos_attempt',
  BOT_DETECTED: 'security.bot_detected',
  HIGH_TRAFFIC_ALERT: 'security.high_traffic_alert',
} as const;

// ============================================================
// Security Alert Thresholds
// ============================================================
export const SECURITY_ALERT_THRESHOLDS = {
  CRITICAL: {
    SQL_INJECTION_ATTEMPTS: 3,
    XSS_ATTEMPTS: 5,
    ACCOUNT_TAKEOVER_ATTEMPTS: 3,
    PAYMENT_FRAUD_ATTEMPTS: 2,
    SIM_SWAP_DETECTED: 1,
  },
  HIGH: {
    FAILED_LOGINS_PER_IP: 20,
    FAILED_LOGINS_PER_USER: 5,
    RATE_LIMIT_EXCEEDED: 10,
    SUSPICIOUS_API_PATTERNS: 5,
  },
  MEDIUM: {
    PROMO_ABUSE_ATTEMPTS: 10,
    COUPON_BRUTE_FORCE_ATTEMPTS: 50,
    REVIEW_SPAM_ATTEMPTS: 20,
  },
} as const;

// ============================================================
// Bangladesh Specific Security Settings
// ============================================================
export const BD_SECURITY_SETTINGS = {
  MOBILE_OPERATORS: {
    GP: 'grameenphone',
    ROBI: 'robi',
    BANGLALINK: 'banglalink',
    TELETALK: 'teletalk',
  },
  HOLIDAY_ENHANCEMENTS: {
    ENABLED: true,
    STRICTER_RATE_LIMITS: true,
    ENHANCED_MFA_REQUIRED: true,
    EXTRA_VERIFICATION_FOR_PAYMENTS: true,
  },
  WEEKEND_ENHANCEMENTS: {
    ENABLED: true,
    STRICTER_FRAUD_CHECKS: true,
    REVIEW_HIGH_VALUE_TRANSACTIONS: true,
  },
  NIGHT_TIME_ENHANCEMENTS: {
    ENABLED: true,
    ADDITIONAL_MFA_REQUIRED: true,
    FLAG_SUSPICIOUS_ACTIVITY: true,
  },
} as const;

// ============================================================
// Payment Gateway Security
// ============================================================
export const PAYMENT_GATEWAY_SECURITY = {
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
} as const;

// ============================================================
// Security Logging Configuration
// ============================================================
export const SECURITY_LOGGING = {
  LOG_ALL_AUTH_ATTEMPTS: true,
  LOG_ALL_API_ACCESS: false,
  LOG_ALL_PAYMENT_ACTIONS: true,
  LOG_SENSITIVE_DATA_ACCESS: true,
  LOG_ADMIN_ACTIONS: true,
  API_ACCESS_SAMPLE_RATE: 0.01,
  RETENTION_DAYS: {
    AUTH_LOGS: 90,
    API_LOGS: 30,
    PAYMENT_LOGS: 365,
    ADMIN_LOGS: 365,
    SECURITY_EVENTS: 365,
  },
  ALERT_CHANNELS: {
    CRITICAL: ['email', 'sms', 'slack'],
    HIGH: ['email', 'slack'],
    MEDIUM: ['slack'],
    LOW: ['log_only'],
  },
} as const;

// ============================================================
// Security Testing Headers (For development/staging only)
// ============================================================
export const SECURITY_TESTING = {
  ENABLED_IN_DEVELOPMENT: true,
  ENABLED_IN_STAGING: true,
  ENABLED_IN_PRODUCTION: false,
  TEST_HEADERS: {
    X_FORWARDED_FOR: 'x-forwarded-for',
    X_FORWARDED_PROTO: 'x-forwarded-proto',
    X_REAL_IP: 'x-real-ip',
  },
  TEST_BYPASS_ENABLED: false,
  TEST_BYPASS_HEADER: 'x-bypass-security',
  TEST_BYPASS_TOKEN: 'test-bypass-token-123',
} as const;

// ============================================================
// Type Exports
// ============================================================
export type CSPDirectives = typeof CSP_DIRECTIVES;
export type CORSConfig = typeof CORS_CONFIG;
export type RateLimits = typeof RATE_LIMITS;
export type SessionSecurity = typeof SESSION_SECURITY;
export type EncryptionConfig = typeof ENCRYPTION_CONFIG;
export type JWTConfig = typeof JWT_CONFIG;
