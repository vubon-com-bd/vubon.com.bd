/**
 * Validation Constants
 * @module shared-constants/common/validation.constants
 */

export const VALIDATION = {
  // String validation
  STRING: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 255,
    TEXT_MIN_LENGTH: 1,
    TEXT_MAX_LENGTH: 65535,
    LONG_TEXT_MAX_LENGTH: 16777215,
  },

  // Number validation
  NUMBER: {
    MIN: 0,
    MAX: 999999999,
    INTEGER_MIN: 0,
    INTEGER_MAX: 999999999,
    DECIMAL_PRECISION: 2,
    DECIMAL_SCALE: 2,
  },

  // Email validation
  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 254,
    PATTERN: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },

  // Phone validation
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
    BD_PATTERN: '^(?:\\+880|0|88)?(1[3-9]\\d{8})$',
  },

  // Password validation
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72,
    PATTERN: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  },

  // Username validation
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: '^[a-zA-Z0-9_-]{3,20}$',
  },

  // Name validation
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    PATTERN: '^[a-zA-Z\\s\\u0980-\\u09FF\\.\\-]+$',
  },

  // Address validation
  ADDRESS: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 500,
  },

  // URL validation
  URL: {
    MAX_LENGTH: 2048,
    PATTERN: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*\\/?$',
  },

  // UUID validation
  UUID: {
    PATTERN: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  },

  // Slug validation
  SLUG: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    PATTERN: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
  },

  // Date validation
  DATE: {
    MIN: '1900-01-01',
    MAX: '2099-12-31',
    PATTERN: '^\\d{4}-\\d{2}-\\d{2}$',
  },

  // Time validation
  TIME: {
    PATTERN: '^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$',
  },

  // ZIP/Postal code
  POSTAL_CODE: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 10,
    BD_PATTERN: '^\\d{4}$',
  },

  // NID (Bangladesh)
  NID: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 17,
    PATTERN: '^\\d{10,17}$',
  },

  // TIN (Bangladesh)
  TIN: {
    MIN_LENGTH: 9,
    MAX_LENGTH: 12,
    PATTERN: '^\\d{9,12}$',
  },

  // BIN (Bangladesh)
  BIN: {
    MIN_LENGTH: 9,
    MAX_LENGTH: 11,
    PATTERN: '^\\d{9,11}$',
  },

  // Array validation
  ARRAY: {
    MIN_ITEMS: 0,
    MAX_ITEMS: 1000,
  },

  // Object validation
  OBJECT: {
    MAX_KEYS: 100,
  },

  // File validation
  FILE: {
    MAX_SIZE_MB: 10,
    ALLOWED_EXTENSIONS: [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
      'svg',
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'txt',
      'csv',
    ],
    ALLOWED_MIME_TYPES: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv',
    ],
  },

  // Image validation
  IMAGE: {
    MAX_SIZE_MB: 5,
    MIN_WIDTH: 100,
    MIN_HEIGHT: 100,
    MAX_WIDTH: 4000,
    MAX_HEIGHT: 4000,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  },

  // Video validation
  VIDEO: {
    MAX_SIZE_MB: 100,
    MIN_DURATION_SECONDS: 1,
    MAX_DURATION_SECONDS: 600,
    ALLOWED_EXTENSIONS: ['mp4', 'webm', 'ogg', 'mov', 'avi'],
    ALLOWED_MIME_TYPES: [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/x-msvideo',
    ],
  },

  // Audio validation
  AUDIO: {
    MAX_SIZE_MB: 50,
    MIN_DURATION_SECONDS: 1,
    MAX_DURATION_SECONDS: 3600,
    ALLOWED_EXTENSIONS: ['mp3', 'wav', 'ogg', 'aac', 'flac'],
    ALLOWED_MIME_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac'],
  },

  // Document validation
  DOCUMENT: {
    MAX_SIZE_MB: 20,
    ALLOWED_EXTENSIONS: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'],
    ALLOWED_MIME_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
    ],
  },

  // Rate validation
  RATING: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 0,
    PRECISION: 1,
  },

  // Percentage validation
  PERCENTAGE: {
    MIN: 0,
    MAX: 100,
    PRECISION: 2,
  },

  // Money validation
  MONEY: {
    MIN: 0,
    MAX: 999999999.99,
    PRECISION: 2,
  },

  // Quantity validation
  QUANTITY: {
    MIN: 0,
    MAX: 999999,
  },

  // Validation modes
  MODE: {
    STRICT: 'strict',
    LENIENT: 'lenient',
  } as const,

  // Validation contexts
  CONTEXT: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    LOGIN: 'login',
    REGISTER: 'register',
  } as const,

  // Validation groups
  GROUPS: {
    DEFAULT: 'default',
    CREATE: 'create',
    UPDATE: 'update',
    LOGIN: 'login',
    REGISTER: 'register',
    ADMIN: 'admin',
    USER: 'user',
  } as const,
} as const;

// ----- নতুন অ্যালিয়াস (Aliases) যোগ করা হলো -----
// এগুলি schema ফাইলের জন্য প্রয়োজন
export const EMAIL_MIN_LENGTH = VALIDATION.EMAIL.MIN_LENGTH;
export const EMAIL_MAX_LENGTH = VALIDATION.EMAIL.MAX_LENGTH;
export const PHONE_MIN_LENGTH = VALIDATION.PHONE.MIN_LENGTH;
export const PHONE_MAX_LENGTH = VALIDATION.PHONE.MAX_LENGTH;
export const NAME_MIN_LENGTH = VALIDATION.NAME.MIN_LENGTH;
export const NAME_MAX_LENGTH = VALIDATION.NAME.MAX_LENGTH;
export const PASSWORD_MIN_LENGTH = VALIDATION.PASSWORD.MIN_LENGTH;
export const PASSWORD_MAX_LENGTH = VALIDATION.PASSWORD.MAX_LENGTH;

// টাইপ এক্সপোর্ট
export type ValidationMode = (typeof VALIDATION.MODE)[keyof typeof VALIDATION.MODE];
export type ValidationContext = (typeof VALIDATION.CONTEXT)[keyof typeof VALIDATION.CONTEXT];
export type ValidationGroup = (typeof VALIDATION.GROUPS)[keyof typeof VALIDATION.GROUPS];
