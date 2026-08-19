/**
 * Vendor Regular Expression Constants
 * Contains all regex patterns for vendor management
 */

export const VendorRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // Zip/Postal code patterns
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  },

  // Tax ID patterns
  TAX_ID: {
    USA_EIN: /^\d{2}-\d{7}$/,
    USA_SSN: /^\d{3}-\d{2}-\d{4}$/,
    BANGLADESH_TIN: /^\d{9}$/,
    UK_VAT: /^GB\d{9}$/,
    GENERIC: /^[A-Z0-9]{6,15}$/,
  },

  // License number patterns
  LICENSE_NUMBER: {
    BUSINESS: /^[A-Z]{2}-\d{6}-\d{2}$/,
    TRADE: /^[A-Z]{3}\d{7}$/,
    GENERIC: /^[A-Z0-9]{8,15}$/,
  },

  // Password validation pattern
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Username validation pattern
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Vendor specific patterns
  VENDOR: {
    ID: /^VND-[A-Z0-9]{8,12}$/,
    NAME: /^[a-zA-Z0-9\s\-_.,!?()&]{2,100}$/,
    STORE_NAME: /^[a-zA-Z0-9\s\-_.,!?()&]{2,100}$/,
    DESCRIPTION: /^[\s\S]{10,5000}$/,
  },

  // Name patterns
  NAME: {
    FIRST: /^[a-zA-Z]{2,50}$/,
    LAST: /^[a-zA-Z]{2,50}$/,
    FULL: /^[a-zA-Z\s\-.]{2,100}$/,
  },

  // Address patterns
  ADDRESS: {
    STREET: /^[a-zA-Z0-9\s\-.,#]{5,150}$/,
    CITY: /^[a-zA-Z\s\-.]{2,50}$/,
    STATE: /^[a-zA-Z\s\-.]{2,50}$/,
    COUNTRY: /^[a-zA-Z\s\-.]{2,50}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
    PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,
  },

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },
} as const;

export const VendorRegexDescriptions: Record<keyof typeof VendorRegex, string> = {
  EMAIL: 'Validates email addresses',
  PHONE: 'Validates phone numbers for various countries',
  URL: 'Validates URLs',
  ZIP_CODE: 'Validates zip/postal codes for various countries',
  TAX_ID: 'Validates tax IDs for various countries',
  LICENSE_NUMBER: 'Validates license numbers for businesses',
  PASSWORD: 'Validates strong passwords with special characters',
  USERNAME: 'Validates usernames with alphanumeric and underscore',
  ALPHANUMERIC: 'Validates alphanumeric strings',
  VENDOR: 'Validates vendor-specific fields',
  NAME: 'Validates names',
  ADDRESS: 'Validates address fields',
  NUMERIC: 'Validates numeric patterns',
  DATE: 'Validates date formats',
} as const;

export const VendorRegexExamples: Record<keyof typeof VendorRegex, string> = {
  EMAIL: 'example@domain.com',
  PHONE: '+8801712345678',
  URL: 'https://example.com',
  ZIP_CODE: '1207',
  TAX_ID: '12-3456789',
  LICENSE_NUMBER: 'AB-123456-01',
  PASSWORD: 'StrongP@ssw0rd123',
  USERNAME: 'john_doe_123',
  ALPHANUMERIC: 'ABC123',
  VENDOR: 'VND-A1B2C3D4',
  NAME: 'John Doe',
  ADDRESS: '123 Main Street',
  NUMERIC: '12345',
  DATE: '2024-01-01',
} as const;

export const VendorRegexValidationMessages: Record<keyof typeof VendorRegex, string> = {
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  ZIP_CODE: 'Please enter a valid zip/postal code',
  TAX_ID: 'Please enter a valid tax ID',
  LICENSE_NUMBER: 'Please enter a valid license number',
  PASSWORD:
    'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  USERNAME: 'Username must be 3-30 characters with alphanumeric and underscore',
  ALPHANUMERIC: 'Only alphanumeric characters are allowed',
  VENDOR: 'Please enter valid vendor information',
  NAME: 'Please enter a valid name',
  ADDRESS: 'Please enter a valid address',
  NUMERIC: 'Please enter a valid numeric value',
  DATE: 'Please enter a valid date',
} as const;

// Helper function to test regex patterns
export const VendorRegexTester = {
  testEmail: (value: string): boolean => VendorRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => VendorRegex.PHONE.BANGLADESH.test(value),
  testURL: (value: string): boolean => VendorRegex.URL.test(value),
  testBangladeshZipCode: (value: string): boolean => VendorRegex.ZIP_CODE.BANGLADESH.test(value),
  testPassword: (value: string): boolean => VendorRegex.PASSWORD.test(value),
  testUsername: (value: string): boolean => VendorRegex.USERNAME.test(value),
  testAlphanumeric: (value: string): boolean => VendorRegex.ALPHANUMERIC.test(value),
  testVendorId: (value: string): boolean => VendorRegex.VENDOR.ID.test(value),
  testTaxID: (value: string): boolean => VendorRegex.TAX_ID.GENERIC.test(value),
  testLicenseNumber: (value: string): boolean => VendorRegex.LICENSE_NUMBER.GENERIC.test(value),
};
