/**
 * ভেন্ডার সিস্টেমের এরর কোড ও মেসেজ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * এরর ক্যাটাগরি অবজেক্ট
 */
export const VendorErrorCategories = {
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  VALIDATION: 'VALIDATION',
  BUSINESS_LOGIC: 'BUSINESS_LOGIC',
  SYSTEM: 'SYSTEM',
  DATA_INTEGRITY: 'DATA_INTEGRITY',
} as const;

/**
 * এরর ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type VendorErrorCategoryValue =
  (typeof VendorErrorCategories)[keyof typeof VendorErrorCategories];

/**
 * এরর সিভিয়ারিটি
 */
export const VendorErrorSeverity = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

/**
 * এরর সিভিয়ারিটি - ইউনিয়ন টাইপ
 */
export type VendorErrorSeverityValue =
  (typeof VendorErrorSeverity)[keyof typeof VendorErrorSeverity];

/**
 * ভেন্ডার এরর কোড অবজেক্ট
 */
export const VendorErrorCode = {
  // Authentication Errors (AUTH-001 to AUTH-099)
  AUTH_001: 'AUTH_001',
  AUTH_002: 'AUTH_002',
  AUTH_003: 'AUTH_003',
  AUTH_004: 'AUTH_004',
  AUTH_005: 'AUTH_005',

  // Authorization Errors (AUTH-100 to AUTH-199)
  AUTH_100: 'AUTH_100',
  AUTH_101: 'AUTH_101',
  AUTH_102: 'AUTH_102',
  AUTH_103: 'AUTH_103',

  // Validation Errors (VAL-001 to VAL-099)
  VAL_001: 'VAL_001',
  VAL_002: 'VAL_002',
  VAL_003: 'VAL_003',
  VAL_004: 'VAL_004',
  VAL_005: 'VAL_005',
  VAL_006: 'VAL_006',
  VAL_007: 'VAL_007',

  // Business Logic Errors (BUS-001 to BUS-099)
  BUS_001: 'BUS_001',
  BUS_002: 'BUS_002',
  BUS_003: 'BUS_003',
  BUS_004: 'BUS_004',
  BUS_005: 'BUS_005',
  BUS_006: 'BUS_006',
  BUS_007: 'BUS_007',

  // System Errors (SYS-001 to SYS-099)
  SYS_001: 'SYS_001',
  SYS_002: 'SYS_002',
  SYS_003: 'SYS_003',
  SYS_004: 'SYS_004',

  // Data Integrity Errors (DAT-001 to DAT-099)
  DAT_001: 'DAT_001',
  DAT_002: 'DAT_002',
  DAT_003: 'DAT_003',
  DAT_004: 'DAT_004',
} as const;

/**
 * ভেন্ডার এরর কোড - ইউনিয়ন টাইপ
 */
export type VendorErrorCodeValue = (typeof VendorErrorCode)[keyof typeof VendorErrorCode];

/**
 * এরর ক্যাটাগরি লেবেলসমূহ
 */
export const VendorErrorCategoryLabels: Record<
  VendorErrorCategoryValue,
  { en: string; bn: string }
> = {
  [VendorErrorCategories.AUTHENTICATION]: {
    en: 'Authentication Error',
    bn: 'প্রমাণীকরণ ত্রুটি',
  },
  [VendorErrorCategories.AUTHORIZATION]: {
    en: 'Authorization Error',
    bn: 'অনুমোদন ত্রুটি',
  },
  [VendorErrorCategories.VALIDATION]: {
    en: 'Validation Error',
    bn: 'বৈধতা ত্রুটি',
  },
  [VendorErrorCategories.BUSINESS_LOGIC]: {
    en: 'Business Logic Error',
    bn: 'ব্যবসায়িক যুক্তি ত্রুটি',
  },
  [VendorErrorCategories.SYSTEM]: {
    en: 'System Error',
    bn: 'সিস্টেম ত্রুটি',
  },
  [VendorErrorCategories.DATA_INTEGRITY]: {
    en: 'Data Integrity Error',
    bn: 'ডেটা অখণ্ডতা ত্রুটি',
  },
};

/**
 * এরর সিভিয়ারিটি লেবেলসমূহ
 */
export const VendorErrorSeverityLabels: Record<
  VendorErrorSeverityValue,
  { en: string; bn: string }
> = {
  [VendorErrorSeverity.CRITICAL]: {
    en: 'Critical',
    bn: 'সঙ্কটজনক',
  },
  [VendorErrorSeverity.HIGH]: {
    en: 'High',
    bn: 'উচ্চ',
  },
  [VendorErrorSeverity.MEDIUM]: {
    en: 'Medium',
    bn: 'মধ্যম',
  },
  [VendorErrorSeverity.LOW]: {
    en: 'Low',
    bn: 'নিম্ন',
  },
};

/**
 * এরর সিভিয়ারিটি রঙ কোডসমূহ
 */
export const VendorErrorSeverityColors: Record<VendorErrorSeverityValue, string> = {
  [VendorErrorSeverity.CRITICAL]: 'bg-red-200 text-red-900 border-red-400',
  [VendorErrorSeverity.HIGH]: 'bg-red-100 text-red-800 border-red-300',
  [VendorErrorSeverity.MEDIUM]: 'bg-orange-100 text-orange-800 border-orange-300',
  [VendorErrorSeverity.LOW]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

/**
 * এরর কোড ডিটেইলস
 */
export const VendorErrorDetails: Record<
  VendorErrorCodeValue,
  {
    message: string;
    httpStatus: number;
    category: VendorErrorCategoryValue;
    severity: VendorErrorSeverityValue;
    description: string;
  }
> = {
  // Authentication Errors
  [VendorErrorCode.AUTH_001]: {
    message: 'Invalid credentials',
    httpStatus: 401,
    category: VendorErrorCategories.AUTHENTICATION,
    severity: VendorErrorSeverity.HIGH,
    description: 'The provided credentials are invalid',
  },
  [VendorErrorCode.AUTH_002]: {
    message: 'Session expired',
    httpStatus: 401,
    category: VendorErrorCategories.AUTHENTICATION,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'User session has expired',
  },
  [VendorErrorCode.AUTH_003]: {
    message: 'Invalid token',
    httpStatus: 401,
    category: VendorErrorCategories.AUTHENTICATION,
    severity: VendorErrorSeverity.HIGH,
    description: 'The provided token is invalid or malformed',
  },
  [VendorErrorCode.AUTH_004]: {
    message: 'Account locked',
    httpStatus: 403,
    category: VendorErrorCategories.AUTHENTICATION,
    severity: VendorErrorSeverity.HIGH,
    description: 'Account has been locked due to multiple failed attempts',
  },
  [VendorErrorCode.AUTH_005]: {
    message: 'Email not verified',
    httpStatus: 403,
    category: VendorErrorCategories.AUTHENTICATION,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Email address has not been verified',
  },

  // Authorization Errors
  [VendorErrorCode.AUTH_100]: {
    message: 'Permission denied',
    httpStatus: 403,
    category: VendorErrorCategories.AUTHORIZATION,
    severity: VendorErrorSeverity.HIGH,
    description: 'You do not have permission to perform this action',
  },
  [VendorErrorCode.AUTH_101]: {
    message: 'Insufficient role',
    httpStatus: 403,
    category: VendorErrorCategories.AUTHORIZATION,
    severity: VendorErrorSeverity.HIGH,
    description: 'Your role does not have the required permissions',
  },
  [VendorErrorCode.AUTH_102]: {
    message: 'Resource access denied',
    httpStatus: 403,
    category: VendorErrorCategories.AUTHORIZATION,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Access to this resource has been denied',
  },
  [VendorErrorCode.AUTH_103]: {
    message: 'Vendor not found',
    httpStatus: 404,
    category: VendorErrorCategories.AUTHORIZATION,
    severity: VendorErrorSeverity.LOW,
    description: 'The requested vendor does not exist',
  },

  // Validation Errors
  [VendorErrorCode.VAL_001]: {
    message: 'Invalid vendor name',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'Vendor name does not meet the requirements',
  },
  [VendorErrorCode.VAL_002]: {
    message: 'Invalid email format',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'Email address format is invalid',
  },
  [VendorErrorCode.VAL_003]: {
    message: 'Invalid phone number',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'Phone number format is invalid',
  },
  [VendorErrorCode.VAL_004]: {
    message: 'Required field missing',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'A required field is missing or empty',
  },
  [VendorErrorCode.VAL_005]: {
    message: 'Invalid document type',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'The document type is not supported',
  },
  [VendorErrorCode.VAL_006]: {
    message: 'File size exceeds limit',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'File size exceeds the maximum allowed limit',
  },
  [VendorErrorCode.VAL_007]: {
    message: 'Invalid date format',
    httpStatus: 400,
    category: VendorErrorCategories.VALIDATION,
    severity: VendorErrorSeverity.LOW,
    description: 'Date format is invalid',
  },

  // Business Logic Errors
  [VendorErrorCode.BUS_001]: {
    message: 'Vendor status cannot be changed',
    httpStatus: 400,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Vendor status transition is not allowed',
  },
  [VendorErrorCode.BUS_002]: {
    message: 'Insufficient balance',
    httpStatus: 400,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Insufficient balance for this operation',
  },
  [VendorErrorCode.BUS_003]: {
    message: 'Max vendors limit reached',
    httpStatus: 400,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Maximum number of vendors has been reached',
  },
  [VendorErrorCode.BUS_004]: {
    message: 'Invalid payout amount',
    httpStatus: 400,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.LOW,
    description: 'Payout amount is below the minimum or above the maximum',
  },
  [VendorErrorCode.BUS_005]: {
    message: 'Account not verified',
    httpStatus: 403,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Account must be verified to perform this action',
  },
  [VendorErrorCode.BUS_006]: {
    message: 'Duplicate vendor',
    httpStatus: 409,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'A vendor with this information already exists',
  },
  [VendorErrorCode.BUS_007]: {
    message: 'Invalid subscription plan',
    httpStatus: 400,
    category: VendorErrorCategories.BUSINESS_LOGIC,
    severity: VendorErrorSeverity.LOW,
    description: 'The selected subscription plan is not available',
  },

  // System Errors
  [VendorErrorCode.SYS_001]: {
    message: 'Internal server error',
    httpStatus: 500,
    category: VendorErrorCategories.SYSTEM,
    severity: VendorErrorSeverity.CRITICAL,
    description: 'An internal server error occurred',
  },
  [VendorErrorCode.SYS_002]: {
    message: 'Database connection failed',
    httpStatus: 500,
    category: VendorErrorCategories.SYSTEM,
    severity: VendorErrorSeverity.CRITICAL,
    description: 'Database connection could not be established',
  },
  [VendorErrorCode.SYS_003]: {
    message: 'External service unavailable',
    httpStatus: 503,
    category: VendorErrorCategories.SYSTEM,
    severity: VendorErrorSeverity.HIGH,
    description: 'External service is currently unavailable',
  },
  [VendorErrorCode.SYS_004]: {
    message: 'API rate limit exceeded',
    httpStatus: 429,
    category: VendorErrorCategories.SYSTEM,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'API request limit has been exceeded',
  },

  // Data Integrity Errors
  [VendorErrorCode.DAT_001]: {
    message: 'Data integrity violation',
    httpStatus: 400,
    category: VendorErrorCategories.DATA_INTEGRITY,
    severity: VendorErrorSeverity.HIGH,
    description: 'Data integrity constraint has been violated',
  },
  [VendorErrorCode.DAT_002]: {
    message: 'Duplicate entry',
    httpStatus: 409,
    category: VendorErrorCategories.DATA_INTEGRITY,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Duplicate entry found in the database',
  },
  [VendorErrorCode.DAT_003]: {
    message: 'Invalid foreign key reference',
    httpStatus: 400,
    category: VendorErrorCategories.DATA_INTEGRITY,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Referenced record does not exist',
  },
  [VendorErrorCode.DAT_004]: {
    message: 'Data version mismatch',
    httpStatus: 409,
    category: VendorErrorCategories.DATA_INTEGRITY,
    severity: VendorErrorSeverity.MEDIUM,
    description: 'Data has been modified by another user',
  },
};

/**
 * এরর কোড প্যাটার্ন রেজেক্স
 */
export const VendorErrorCodePattern = /^[A-Z]{3}_[0-9]{3}$/;

/**
 * HTTP স্ট্যাটাস কোড থেকে এরর কোড ম্যাপিং
 */
export const HttpStatusToVendorErrorCode: Record<number, VendorErrorCodeValue> = {
  400: VendorErrorCode.VAL_001,
  401: VendorErrorCode.AUTH_001,
  403: VendorErrorCode.AUTH_100,
  404: VendorErrorCode.AUTH_103,
  409: VendorErrorCode.BUS_006,
  429: VendorErrorCode.SYS_004,
  500: VendorErrorCode.SYS_001,
  503: VendorErrorCode.SYS_003,
};

/**
 * এরর লগ রিটেনশন (দিন)
 */
export const VendorErrorLogRetentionDays = 90;

/**
 * এরর মনিটরিং থ্রেশহোল্ড
 */
export const VendorErrorMonitoringThresholds = {
  CRITICAL_PER_MINUTE: 5,
  HIGH_PER_MINUTE: 20,
  MEDIUM_PER_MINUTE: 50,
  LOW_PER_MINUTE: 100,
} as const;
