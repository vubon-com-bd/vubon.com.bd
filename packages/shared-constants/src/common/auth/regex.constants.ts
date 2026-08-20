/**
 * @fileoverview Authentication Regular Expression Constants
 * @description Contains all regex patterns for authentication and authorization
 * @module AuthRegex
 */

/**
 * Authentication Regular Expression Patterns
 */
export const AuthRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // Password validation patterns
  PASSWORD: {
    // At least 8 characters, at least one uppercase, one lowercase, one number, one special character
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

    // At least 6 characters, at least one uppercase, one lowercase, one number
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,

    // At least 4 characters, letters and numbers only
    BASIC: /^[A-Za-z\d]{4,}$/,
  },

  // Username validation pattern
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // URL validation pattern
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // UUID validation pattern
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Only letters pattern
  ONLY_LETTERS: /^[a-zA-Z]+$/,

  // Name patterns
  NAME: {
    FIRST_NAME: /^[A-Za-z]{1,50}$/,
    LAST_NAME: /^[A-Za-z]{1,50}$/,
    FULL_NAME: /^[A-Za-z\s]{1,100}$/,
  },

  // Address patterns
  ADDRESS: {
    STREET: /^[A-Za-z0-9\s,.-]{5,100}$/,
    CITY: /^[A-Za-z\s]{2,50}$/,
    STATE: /^[A-Za-z\s]{2,50}$/,
    COUNTRY: /^[A-Za-z\s]{2,50}$/,
  },

  // IP Address patterns
  IP_ADDRESS: {
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  },

  // Zip/Postal code patterns
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    INTERNATIONAL: /^[A-Z0-9\s\-]{3,10}$/,
  },

  // Bangladesh specific patterns
  BANGLADESH: {
    NID: /^\d{10,17}$/,
    BIRTH_REGISTRATION: /^\d{17}$/,
    TIN: /^\d{9,12}$/,
    MOBILE: /^(?:\+880|880|0)1[3-9]\d{8}$/,
  },

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    MM_DD_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Time patterns
  TIME: {
    HH_MM: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    HH_MM_SS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    HH_MM_SS_SSS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.[0-9]{3}$/,
  },

  // Hex color pattern
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // OTP patterns
  OTP: {
    LENGTH_4: /^\d{4}$/,
    LENGTH_6: /^\d{6}$/,
    LENGTH_8: /^\d{8}$/,
    DEFAULT: /^\d{6}$/,
  },

  // Auth specific patterns
  AUTH: {
    JWT_TOKEN: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    REFRESH_TOKEN: /^[A-Za-z0-9-_]{32,64}$/,
    API_KEY: /^[A-Za-z0-9]{32,64}$/,
    RESET_TOKEN: /^[A-Za-z0-9-_]{32,64}$/,
    VERIFICATION_TOKEN: /^[A-Za-z0-9-_]{32,64}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
  },
} as const;

/**
 * Regex pattern descriptions
 */
export const AuthRegexDescriptions = {
  EMAIL: 'Valid email address (e.g., user@example.com)',
  PHONE: {
    BANGLADESH: 'Valid Bangladesh phone number (e.g., +8801712345678)',
    INTERNATIONAL: 'Valid international phone number',
  },
  PASSWORD: {
    STRONG: 'At least 8 characters, with uppercase, lowercase, number, and special character',
    MEDIUM: 'At least 6 characters, with uppercase, lowercase, and number',
    BASIC: 'At least 4 characters, letters and numbers only',
  },
  USERNAME: '3-30 characters, letters, numbers, and underscores only',
  URL: 'Valid URL starting with http:// or https://',
  UUID: 'Valid UUID v4 format',
  ALPHANUMERIC: 'Letters and numbers only',
  ONLY_LETTERS: 'Letters only',
  NAME: {
    FIRST_NAME: '1-50 letters',
    LAST_NAME: '1-50 letters',
    FULL_NAME: '1-100 letters and spaces',
  },
  ADDRESS: {
    STREET: '5-100 characters, letters, numbers, spaces, and common punctuation',
    CITY: '2-50 letters and spaces',
    STATE: '2-50 letters and spaces',
    COUNTRY: '2-50 letters and spaces',
  },
  IP_ADDRESS: {
    IPV4: 'Valid IPv4 address',
    IPV6: 'Valid IPv6 address',
  },
  ZIP_CODE: {
    BANGLADESH: '4 digit Bangladesh postal code',
    USA: '5 digit or 5+4 digit US zip code',
    UK: 'UK postcode format',
    CANADA: 'Canadian postal code format',
    INTERNATIONAL: '3-10 characters, letters, numbers, spaces, and hyphens',
  },
  BANGLADESH: {
    NID: '10-17 digit National ID',
    BIRTH_REGISTRATION: '17 digit Birth Registration Number',
    TIN: '9-12 digit Tax Identification Number',
    MOBILE: 'Valid Bangladesh mobile number',
  },
  DATE: {
    YYYY_MM_DD: 'YYYY-MM-DD format',
    DD_MM_YYYY: 'DD/MM/YYYY format',
    MM_DD_YYYY: 'MM/DD/YYYY format',
    ISO8601: 'ISO 8601 format',
  },
  TIME: {
    HH_MM: 'HH:MM format (24-hour)',
    HH_MM_SS: 'HH:MM:SS format (24-hour)',
    HH_MM_SS_SSS: 'HH:MM:SS.SSS format (24-hour)',
  },
  HEX_COLOR: 'Hex color code (e.g., #FFFFFF or #FFF)',
  OTP: {
    LENGTH_4: '4 digit OTP',
    LENGTH_6: '6 digit OTP',
    LENGTH_8: '8 digit OTP',
    DEFAULT: '6 digit OTP',
  },
  AUTH: {
    JWT_TOKEN: 'JWT token format',
    REFRESH_TOKEN: '32-64 character refresh token',
    API_KEY: '32-64 character API key',
    RESET_TOKEN: '32-64 character reset token',
    VERIFICATION_TOKEN: '32-64 character verification token',
  },
  NUMERIC: {
    POSITIVE_INTEGER: 'Positive integer (1, 2, 3, ...)',
    NON_NEGATIVE_INTEGER: 'Non-negative integer (0, 1, 2, 3, ...)',
    DECIMAL: 'Decimal number with up to 2 decimal places',
  },
} as const;

/**
 * Regex validation messages
 */
export const AuthRegexValidationMessages = {
  EMAIL: 'Please enter a valid email address',
  PHONE: {
    BANGLADESH: 'Please enter a valid Bangladesh phone number',
    INTERNATIONAL: 'Please enter a valid international phone number',
  },
  PASSWORD: {
    STRONG:
      'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character',
    MEDIUM: 'Password must be at least 6 characters and contain uppercase, lowercase, and number',
    BASIC: 'Password must be at least 4 characters',
  },
  USERNAME: 'Username must be 3-30 characters and contain only letters, numbers, and underscores',
  URL: 'Please enter a valid URL',
  UUID: 'Please enter a valid UUID',
  ALPHANUMERIC: 'Only letters and numbers are allowed',
  ONLY_LETTERS: 'Only letters are allowed',
  NAME: {
    FIRST_NAME: 'First name must be 1-50 letters',
    LAST_NAME: 'Last name must be 1-50 letters',
    FULL_NAME: 'Full name must be 1-100 letters and spaces',
  },
  ADDRESS: {
    STREET: 'Street address must be 5-100 characters',
    CITY: 'City must be 2-50 letters and spaces',
    STATE: 'State must be 2-50 letters and spaces',
    COUNTRY: 'Country must be 2-50 letters and spaces',
  },
  IP_ADDRESS: {
    IPV4: 'Please enter a valid IPv4 address',
    IPV6: 'Please enter a valid IPv6 address',
  },
  ZIP_CODE: {
    BANGLADESH: 'Please enter a valid 4 digit Bangladesh postal code',
    USA: 'Please enter a valid US zip code',
    UK: 'Please enter a valid UK postcode',
    CANADA: 'Please enter a valid Canadian postal code',
    INTERNATIONAL: 'Please enter a valid postal code',
  },
  BANGLADESH: {
    NID: 'Please enter a valid 10-17 digit National ID',
    BIRTH_REGISTRATION: 'Please enter a valid 17 digit Birth Registration Number',
    TIN: 'Please enter a valid 9-12 digit Tax Identification Number',
    MOBILE: 'Please enter a valid Bangladesh mobile number',
  },
  DATE: {
    YYYY_MM_DD: 'Please enter a date in YYYY-MM-DD format',
    DD_MM_YYYY: 'Please enter a date in DD/MM/YYYY format',
    MM_DD_YYYY: 'Please enter a date in MM/DD/YYYY format',
    ISO8601: 'Please enter a date in ISO 8601 format',
  },
  TIME: {
    HH_MM: 'Please enter a time in HH:MM format',
    HH_MM_SS: 'Please enter a time in HH:MM:SS format',
    HH_MM_SS_SSS: 'Please enter a time in HH:MM:SS.SSS format',
  },
  HEX_COLOR: 'Please enter a valid hex color code',
  OTP: {
    LENGTH_4: 'Please enter a 4 digit OTP',
    LENGTH_6: 'Please enter a 6 digit OTP',
    LENGTH_8: 'Please enter a 8 digit OTP',
    DEFAULT: 'Please enter a 6 digit OTP',
  },
  AUTH: {
    JWT_TOKEN: 'Please enter a valid JWT token',
    REFRESH_TOKEN: 'Please enter a valid refresh token',
    API_KEY: 'Please enter a valid API key',
    RESET_TOKEN: 'Please enter a valid reset token',
    VERIFICATION_TOKEN: 'Please enter a valid verification token',
  },
  NUMERIC: {
    POSITIVE_INTEGER: 'Please enter a positive integer',
    NON_NEGATIVE_INTEGER: 'Please enter a non-negative integer',
    DECIMAL: 'Please enter a valid decimal number',
  },
} as const;

/**
 * Regex tester helper functions
 */
export const AuthRegexTester = {
  testEmail: (value: string): boolean => AuthRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => AuthRegex.PHONE.BANGLADESH.test(value),
  testInternationalPhone: (value: string): boolean => AuthRegex.PHONE.INTERNATIONAL.test(value),
  testPasswordStrong: (value: string): boolean => AuthRegex.PASSWORD.STRONG.test(value),
  testPasswordMedium: (value: string): boolean => AuthRegex.PASSWORD.MEDIUM.test(value),
  testPasswordBasic: (value: string): boolean => AuthRegex.PASSWORD.BASIC.test(value),
  testUsername: (value: string): boolean => AuthRegex.USERNAME.test(value),
  testURL: (value: string): boolean => AuthRegex.URL.test(value),
  testUUID: (value: string): boolean => AuthRegex.UUID.test(value),
  testAlphanumeric: (value: string): boolean => AuthRegex.ALPHANUMERIC.test(value),
  testOnlyLetters: (value: string): boolean => AuthRegex.ONLY_LETTERS.test(value),
  testFirstName: (value: string): boolean => AuthRegex.NAME.FIRST_NAME.test(value),
  testLastName: (value: string): boolean => AuthRegex.NAME.LAST_NAME.test(value),
  testFullName: (value: string): boolean => AuthRegex.NAME.FULL_NAME.test(value),
  testIPV4: (value: string): boolean => AuthRegex.IP_ADDRESS.IPV4.test(value),
  testIPV6: (value: string): boolean => AuthRegex.IP_ADDRESS.IPV6.test(value),
  testBangladeshZipCode: (value: string): boolean => AuthRegex.ZIP_CODE.BANGLADESH.test(value),
  testUSZipCode: (value: string): boolean => AuthRegex.ZIP_CODE.USA.test(value),
  testBangladeshNID: (value: string): boolean => AuthRegex.BANGLADESH.NID.test(value),
  testBangladeshBirthRegistration: (value: string): boolean =>
    AuthRegex.BANGLADESH.BIRTH_REGISTRATION.test(value),
  testBangladeshTIN: (value: string): boolean => AuthRegex.BANGLADESH.TIN.test(value),
  testDateISO: (value: string): boolean => AuthRegex.DATE.ISO8601.test(value),
  testDateYYYYMMDD: (value: string): boolean => AuthRegex.DATE.YYYY_MM_DD.test(value),
  testTimeHHMM: (value: string): boolean => AuthRegex.TIME.HH_MM.test(value),
  testTimeHHMMSS: (value: string): boolean => AuthRegex.TIME.HH_MM_SS.test(value),
  testHexColor: (value: string): boolean => AuthRegex.HEX_COLOR.test(value),
  testOTP4: (value: string): boolean => AuthRegex.OTP.LENGTH_4.test(value),
  testOTP6: (value: string): boolean => AuthRegex.OTP.LENGTH_6.test(value),
  testOTP8: (value: string): boolean => AuthRegex.OTP.LENGTH_8.test(value),
  testOTPDefault: (value: string): boolean => AuthRegex.OTP.DEFAULT.test(value),
  testJWT: (value: string): boolean => AuthRegex.AUTH.JWT_TOKEN.test(value),
  testRefreshToken: (value: string): boolean => AuthRegex.AUTH.REFRESH_TOKEN.test(value),
  testAPIKey: (value: string): boolean => AuthRegex.AUTH.API_KEY.test(value),
  testResetToken: (value: string): boolean => AuthRegex.AUTH.RESET_TOKEN.test(value),
  testVerificationToken: (value: string): boolean => AuthRegex.AUTH.VERIFICATION_TOKEN.test(value),
  testPositiveInteger: (value: string): boolean => AuthRegex.NUMERIC.POSITIVE_INTEGER.test(value),
  testNonNegativeInteger: (value: string): boolean =>
    AuthRegex.NUMERIC.NON_NEGATIVE_INTEGER.test(value),
  testDecimal: (value: string): boolean => AuthRegex.NUMERIC.DECIMAL.test(value),
};
