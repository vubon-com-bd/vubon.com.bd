/**
 * Security Constants - Pure immutable security configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * UPDATED: CSP, Payment Gateway IPs, Password Policy, Encryption

 * @module shared-constants/auth-constants/security.constants
 */

// ... (আগের সব import ও type utilities একই থাকবে)

// ============================================================
// CSP (Content Security Policy) Directives - PRODUCTION SAFE
// ============================================================
export const CSP_DIRECTIVES = Object.freeze({
  DEFAULT_SRC: ["'self'"],
  // ⚠️ ডেভেলপমেন্টের জন্য আলাদা কনফিগ রাখুন, প্রোডাকশনে NEVER use 'unsafe-inline' or 'unsafe-eval'
  SCRIPT_SRC: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
  STYLE_SRC: ["'self'", 'https://fonts.googleapis.com'],
  STYLE_SRC_ELEM: ["'self'", 'https://fonts.googleapis.com'],
  IMG_SRC: ["'self'", 'data:', 'https:', 'blob:'],
  FONT_SRC: ["'self'", 'https://fonts.gstatic.com', 'data:'],
  CONNECT_SRC: ["'self'", 'https://api.vubon.com.bd', 'wss://ws.vubon.com.bd'],
  FRAME_SRC: ["'self'"],
  OBJECT_SRC: ["'none'"],
  BASE_URI: ["'self'"],
  FORM_ACTION: ["'self'"],
  FRAME_ANCESTORS: ["'none'"],
  UPGRADE_INSECURE_REQUESTS: [],
  BLOCK_ALL_MIXED_CONTENT: [],
  MANIFEST_SRC: ["'self'"],
  WORKER_SRC: ["'self'", 'blob:'],
  CHILD_SRC: ["'self'", 'blob:'],
  NAVIGATE_TO: ["'self'"],
  REPORT_URI: ['/api/security/csp-report'],
  
  // ডেভেলপমেন্ট হেল্পার (প্রোডাকশনে ব্যবহার করবেন না)
  DEVELOPMENT_OVERRIDES: process.env.NODE_ENV === 'development' ? {
    SCRIPT_SRC: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
    STYLE_SRC: ["'self'", "'unsafe-inline'"],
  } : {},
} as const);

// ... (SECURITY_HEADERS, SECURITY_HEADER_VALUES, EMAIL_CONFIG, DATE_CONFIG, NUMBER_CONFIG, CURRENCY_CONFIG, STRING_CONFIG, PHONE_CONFIG ইত্যাদি আগের মতোই থাকবে)

// ============================================================
// Password Policy (উন্নত)
// ============================================================
export const PASSWORD_POLICY = Object.freeze({
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  STRONG_LENGTH: 12,
  VERY_STRONG_LENGTH: 16,

  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_SPECIAL_CHARS: true,
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',

  PREVENT_COMMON_PASSWORDS: true,
  PREVENT_PERSONAL_INFO: true,
  PREVENT_SEQUENTIAL_CHARS: true,
  PREVENT_REPEATED_CHARS: true,

  MAX_HISTORY_COUNT: 12,  // আপডেটেড: 5 → 12
  EXPIRE_DAYS: 90,
  EXPIRE_WARNING_DAYS: 7,

  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 15,
} as const);

// ============================================================
// Encryption Configuration (উন্নত scrypt parameters)
// ============================================================
export const ENCRYPTION_CONFIG = Object.freeze({
  ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,
  IV_LENGTH: 16,
  AUTH_TAG_LENGTH: 16,
  ENCODING: 'hex' as const,

  // ⬆️ আপডেটেড: OWASP 2025 রেকমেন্ডেশন অনুযায়ী
  SCRYPT_N: 32768,      // 16384 → 32768 (2^15)
  SCRYPT_R: 8,
  SCRYPT_P: 1,

  PBKDF2_ITERATIONS: 210000,  // 100000 → 210000 (OWASP 2025)
  PBKDF2_DIGEST: 'sha256',

  HASH_ALGORITHM: 'sha256',
  SALT_ROUNDS: 12,
  MIN_SALT_ROUNDS: 10,
  MAX_SALT_ROUNDS: 14,

  MIN_SECRET_LENGTH: 8,
} as const);

// ============================================================
// Refresh Token Configuration (উন্নত)
// ============================================================
export const REFRESH_TOKEN_CONFIG = Object.freeze({
  VERSION_LENGTH: 4,
  DEFAULT_VERSION: 1,
  MAX_VERSION: 9999,
  VERSION_SEPARATOR: ':',
  FAMILY_ID_LENGTH: 32,
  ROTATE_ON_REFRESH: true,        // নতুন: টোকেন রোটেট করুন
  REUSE_DETECTION_ENABLED: true,  // নতুন: রিইউজ ডিটেক্ট করুন
} as const);

// ============================================================
// API Key Configuration (উন্নত)
// ============================================================
export const API_KEY_CONFIG = Object.freeze({
  PREFIX: 'vub_live_',     // পরিবর্তনশীল: প্রোডাকশনে আলাদা, ডেভে আলাদা
  KEY_LENGTH: 32,
  SECRET_LENGTH: 64,
  ALLOWED_IPS: [],
  SCOPE_SEPARATOR: ':',

  RATE_LIMITS: {
    DEFAULT: { WINDOW_MS: 60000, MAX_REQUESTS: 100 },
    PREMIUM: { WINDOW_MS: 60000, MAX_REQUESTS: 1000 },
    ENTERPRISE: { WINDOW_MS: 60000, MAX_REQUESTS: 10000 },
  },
  
  // নতুন: API key lifecycle
  ROTATION_DAYS: 90,
  INACTIVE_EXPIRY_DAYS: 180,
} as const);

// ============================================================
// Payment Gateway Security (IPs এনভায়রনমেন্ট ভেরিয়েবল থেকে নিন)
// ============================================================
// ⚠️ হার্ডকোডেড IP এর পরিবর্তে env variable ব্যবহার করুন
export const PAYMENT_GATEWAY_SECURITY = Object.freeze({
  SSLCOMMERZ: {
    ALLOWED_IPS_ENV_VAR: 'SSLCOMMERZ_ALLOWED_IPS',  // env থেকে পড়ুন
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
  BKASH: {
    ALLOWED_IPS_ENV_VAR: 'BKASH_ALLOWED_IPS',
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
  NAGAD: {
    ALLOWED_IPS_ENV_VAR: 'NAGAD_ALLOWED_IPS',
    WEBHOOK_SECRET_REQUIRED: true,
    SIGNATURE_VERIFICATION: true,
  },
} as const);

// ============================================================
// IP Blacklist (Redis/মেমোরি থেকে ডাইনামিক লোড করুন)
// ============================================================
// ⚠️ হার্ডকোডেড না করে বরং কনফিগারেশন ডাটাবেস বা Redis থেকে লোড করুন
export const IP_BLACKLIST_CONFIG = Object.freeze({
  STATIC_MALICIOUS_RANGES: [
    // শুধুমাত্র স্থির (rarely changed) malicious ranges এখানে রাখুন
  ] as string[],
  USE_REDIS_FOR_DYNAMIC: true,  // নতুন: Redis থেকে dynamic IP ব্ল্যাকলিস্ট লোড করুন
  REDIS_KEY_PREFIX: 'security:blacklist:ip:',
  REFRESH_INTERVAL_SECONDS: 300,  // প্রতি 5 মিনিটে রিফ্রেশ করুন
} as const);

// (বাকি সব কনস্ট্যান্ট যেমন SANITIZE_CONFIG, RATE_LIMITS, 
//  BD_SECURITY_SETTINGS, SECURITY_LOGGING ইত্যাদি আগের মতোই থাকবে)

// ============================================================
// Security Testing (প্রোডাকশনে নিষ্ক্রিয় থাকবে)
// ============================================================
export const SECURITY_TESTING = Object.freeze({
  ENABLED_IN_DEVELOPMENT: true,
  ENABLED_IN_STAGING: true,
  ENABLED_IN_PRODUCTION: false,  // নিশ্চিত করুন false ই আছে

  TEST_HEADERS: {
    X_FORWARDED_FOR: 'x-forwarded-for',
    X_FORWARDED_PROTO: 'x-forwarded-proto',
    X_REAL_IP: 'x-real-ip',
  },

  TEST_BYPASS_ENABLED: false,  // false ই রাখুন
  TEST_BYPASS_HEADER: 'x-bypass-security',
  TEST_BYPASS_TOKEN: '',  // টোকেন খালি রাখুন, env থেকে নিন
} as const);
