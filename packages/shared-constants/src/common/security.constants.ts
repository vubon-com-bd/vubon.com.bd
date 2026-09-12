/**
 * Security Constants
 * @module shared-constants/common/security.constants
 */

export const SECURITY = {
  // Password security
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72, // bcrypt limit
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    HASH_ALGORITHM: 'bcrypt',
    HASH_ROUNDS: 12,
    PEPPER: true,
  },

  // JWT security
  JWT: {
    ALGORITHM: 'HS256',
    ACCESS_TOKEN_EXPIRY: 900, // 15 minutes
    REFRESH_TOKEN_EXPIRY: 604800, // 7 days
    RESET_TOKEN_EXPIRY: 3600, // 1 hour
    VERIFICATION_TOKEN_EXPIRY: 86400, // 24 hours
    ISSUER: process.env.JWT_ISSUER ?? 'vubon-api',
    AUDIENCE: process.env.JWT_AUDIENCE ?? 'vubon-client',
  },

  // CORS
  CORS: {
    ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(','),
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    EXPOSED_HEADERS: ['Content-Length', 'X-Request-ID'],
    MAX_AGE: 86400, // 24 hours
    CREDENTIALS: true,
  },

  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 60000, // 1 minute
    MAX_REQUESTS: 100,
    AUTH_MAX_REQUESTS: 20,
    API_MAX_REQUESTS: 1000,
    LOGIN_MAX_ATTEMPTS: 5,
    OTP_MAX_REQUESTS: 3,
  },

  // Session security
  SESSION: {
    MAX_AGE: 86400, // 24 hours
    SECURE: process.env.NODE_ENV === 'production',
    HTTP_ONLY: true,
    SAME_SITE: 'lax',
    REGENERATE_INTERVAL: 1800, // 30 minutes
    DOMAIN: process.env.SESSION_COOKIE_DOMAIN ?? undefined,
  },

  // Encryption
  ENCRYPTION: {
    ALGORITHM: 'aes-256-gcm',
    KEY_LENGTH: 32,
    IV_LENGTH: 16,
    AUTH_TAG_LENGTH: 16,
    SALT_LENGTH: 16,
  },

  // Security headers
  HEADERS: {
    X_FRAME_OPTIONS: 'DENY',
    X_XSS_PROTECTION: '1; mode=block',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
    PERMISSIONS_POLICY: 'geolocation=(), camera=(), microphone=()',
    CONTENT_SECURITY_POLICY: "default-src 'self'",
    STRICT_TRANSPORT_SECURITY: 'max-age=31536000; includeSubDomains; preload',
  },

  // CSRF
  CSRF: {
    ENABLED: true,
    TOKEN_LENGTH: 32,
    HEADER_NAME: 'X-CSRF-Token',
    COOKIE_NAME: 'csrf_token',
    EXPIRY: 3600, // 1 hour
    METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
  },

  // XSS protection
  XSS: {
    ENABLED: true,
    SANITIZE_HTML: true,
    SANITIZE_JS: true,
    ESCAPE_HTML: true,
    ESCAPE_JS: true,
  },

  // SQL injection protection
  SQL_INJECTION: {
    ENABLED: true,
    PARAMETERIZED_QUERIES: true,
    QUERY_SANITIZATION: true,
  },

  // File upload security
  UPLOAD: {
    MAX_SIZE_MB: 10,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
    ALLOWED_MIME_TYPES: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    SCAN_FOR_VIRUS: true,
    SANITIZE_FILENAME: true,
    RANDOMIZE_FILENAME: true,
  },

  // API security
  API: {
    API_KEY_HEADER: 'X-API-Key',
    REQUEST_ID_HEADER: 'X-Request-ID',
    TIMESTAMP_HEADER: 'X-Timestamp',
    SIGNATURE_HEADER: 'X-Signature',
    VERSION_HEADER: 'X-API-Version',
  },

  // Brute force protection
  BRUTE_FORCE: {
    ENABLED: true,
    MAX_ATTEMPTS: 10,
    WINDOW_MINUTES: 15,
    BLOCK_DURATION_MINUTES: 60,
    ACCOUNT_LOCKOUT_ATTEMPTS: 5,
    ACCOUNT_LOCKOUT_DURATION_MINUTES: 30,
  },

  // Audit logging
  AUDIT: {
    ENABLED: true,
    LOG_SENSITIVE_OPERATIONS: true,
    LOG_LOGIN_ATTEMPTS: true,
    LOG_PERMISSION_CHANGES: true,
    LOG_CONFIGURATION_CHANGES: true,
    RETENTION_DAYS: 90,
  },

  // Privacy
  PRIVACY: {
    MASK_EMAIL: true,
    MASK_PHONE: true,
    MASK_ADDRESS: true,
    MASK_PAYMENT_INFO: true,
    DATA_RETENTION_DAYS: 365,
    USER_DATA_DELETION_GRACE_DAYS: 30,
  },
} as const;

export type SecurityHeader = keyof typeof SECURITY.HEADERS;
export type EncryptionAlgorithm = typeof SECURITY.ENCRYPTION.ALGORITHM;
export type JWTAlgorithm = typeof SECURITY.JWT.ALGORITHM;
