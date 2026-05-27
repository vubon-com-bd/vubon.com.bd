/**
 * Regex Constants - Pure immutable validation patterns
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/auth-constants/regex.constants
 *
 * RULES:
 * ✅ NO validator functions, ONLY regex patterns
 * ✅ NO business logic
 * ✅ ONLY pure readonly RegExp objects
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// Email Validation Regex
// ============================================================
export const REGEX_EMAIL = {
  // Basic email pattern (RFC 5322 compliant)
  BASIC: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,

  // Strict email pattern (Standard format)
  STRICT: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // International email (Supports Unicode characters)
  INTERNATIONAL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/u,

  // Common business email domains (Bangladesh specific)
  BUSINESS_EMAIL: /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|[a-zA-Z0-9.-]+\.com\.bd|\.net\.bd)$/,
} as const;

export type RegexEmail = ValueOf<typeof REGEX_EMAIL>;

// ============================================================
// Password Validation Regex
// ============================================================
export const REGEX_PASSWORD = {
  // Weak: Minimum 6 characters
  WEAK: /^.{6,}$/,

  // Basic: Minimum 8 characters, at least one letter and one number
  BASIC: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

  // Medium: 8+ chars, uppercase, lowercase, number
  MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,

  // Strong: 8+ chars, uppercase, lowercase, number, special char
  STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Very strong: 12+ chars, 4 character types
  VERY_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,

  // No spaces allowed
  NO_SPACES: /^\S+$/,
} as const;

export type RegexPassword = ValueOf<typeof REGEX_PASSWORD>;

// ============================================================
// Phone Number Regex (Bangladesh specific - Complete)
// ============================================================
export const REGEX_PHONE = {
  // International format (with country code)
  INTERNATIONAL: /^\+[1-9]\d{1,14}$/,

  // Bangladesh specific (Complete coverage)
  // Format: +8801XXXXXXXXX or 01XXXXXXXXX
  BANGLADESH: /^(?:\+880|0)1[3-9]\d{8}$/,

  // Bangladesh with operator detection
  BANGLADESH_DETAILED: {
    // Grameenphone (GP): 017, 013, 014
    GP: /^(?:\+880|0)1(?:3|4|7)\d{8}$/,

    // Robi (Robi/Airtel): 018, 016, 019
    ROBI: /^(?:\+880|0)1(?:6|8|9)\d{8}$/,

    // Banglalink: 019
    BANGLALINK: /^(?:\+880|0)19\d{8}$/,

    // Teletalk: 015
    TELETALK: /^(?:\+880|0)15\d{8}$/,
  },

  // Bangladesh all operators combined
  BANGLADESH_ALL: /^(?:\+880|0)1(?:3|4|5|6|7|8|9)\d{8}$/,

  // Generic phone (loose validation)
  LOOSE: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/,

  // Landline numbers (Bangladesh)
  LANDLINE: /^(?:\+880|0)[2-9]\d{1,2}\d{6,7}$/,
} as const;

export type RegexPhone = ValueOf<typeof REGEX_PHONE>;
export type BangladeshOperator = keyof typeof REGEX_PHONE.BANGLADESH_DETAILED;

// ============================================================
// Bangladesh National ID (NID) Validation
// ============================================================
export const REGEX_NID = {
  // Old NID: 10 digits (with or without spaces)
  OLD: /^\d{10}$/,
  OLD_WITH_SPACES: /^\d{4}\s?\d{3}\s?\d{3}$/,

  // New NID: 17 digits (Smart NID)
  NEW: /^\d{17}$/,

  // Both old and new
  ANY: /^\d{10}$|^\d{17}$/,

  // Birth Registration Number (Bangladesh)
  BIRTH_REGISTRATION: /^\d{17}$/,
} as const;

export type RegexNid = ValueOf<typeof REGEX_NID>;

// ============================================================
// Bangladeshi Tax Identification Number (TIN)
// ============================================================
export const REGEX_TIN = {
  // Standard TIN format: 9 digits
  STANDARD: /^\d{9}$/,

  // TIN with spaces: 123-456-789
  WITH_HYPHENS: /^\d{3}-\d{3}-\d{3}$/,

  // Business TIN
  BUSINESS: /^\d{9}$|^\d{3}-\d{3}-\d{3}$/,
} as const;

export type RegexTin = ValueOf<typeof REGEX_TIN>;

// ============================================================
// Bangladesh Postal Code (4 digits)
// ============================================================
export const REGEX_POSTAL_CODE = {
  // Bangladesh postal code: exactly 4 digits
  BANGLADESH: /^\d{4}$/,

  // With optional prefix "BD-"
  WITH_PREFIX: /^(?:BD-)?\d{4}$/,
} as const;

export type RegexPostalCode = ValueOf<typeof REGEX_POSTAL_CODE>;

// ============================================================
// Bangladesh Bank Account Number
// ============================================================
export const REGEX_BANK_ACCOUNT = {
  // Standard bank account (10-20 digits)
  STANDARD: /^\d{10,20}$/,

  // BEFTN format
  BEFTN: /^\d{11}$|^\d{13}$|^\d{17}$/,

  // Routing number (Bangladesh - 9 digits)
  ROUTING_NUMBER: /^\d{9}$/,

  // Bank account with branch code
  WITH_BRANCH: /^\d{3}-\d{7,17}$/,
} as const;

export type RegexBankAccount = ValueOf<typeof REGEX_BANK_ACCOUNT>;

// ============================================================
// Bangladesh Mobile Financial Services (MFS)
// ============================================================
export const REGEX_MFS = {
  // bKash number (same as mobile number)
  BKASH: /^(?:\+880|0)1(?:3|4|5|6|7|8|9)\d{8}$/,

  // Nagad number (same as mobile number)
  NAGAD: /^(?:\+880|0)1(?:3|4|5|6|7|8|9)\d{8}$/,

  // Rocket number (same as mobile number)
  ROCKET: /^(?:\+880|0)1(?:3|4|5|6|7|8|9)\d{8}$/,

  // MFS transaction ID
  TRANSACTION_ID: /^[A-Z0-9]{10,20}$/i,
} as const;

export type RegexMfs = ValueOf<typeof REGEX_MFS>;

// ============================================================
// URL Validation Regex
// ============================================================
export const REGEX_URL = {
  // Basic URL validation
  BASIC: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

  // Full URL validation
  FULL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,

  // Strict URL with protocol
  STRICT: /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,

  // Bangladesh e-commerce URL (.com.bd, .net.bd)
  BD_ECOMMERCE: /^https?:\/\/([\da-z\.-]+)\.(com\.bd|net\.bd|org\.bd)([\/\w \.-]*)*\/?$/i,
} as const;

export type RegexUrl = ValueOf<typeof REGEX_URL>;

// ============================================================
// Slug Validation (URL-friendly strings)
// ============================================================
export const REGEX_SLUG = {
  // Standard slug: lowercase letters, numbers, hyphens
  STANDARD: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Slug with underscores allowed
  WITH_UNDERSCORE: /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/,

  // International slug (Unicode letters allowed - Bengali support)
  INTERNATIONAL: /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u,

  // Bengali slug (Bangla characters)
  BENGALI: /^[\u0980-\u09FF\p{N}]+(?:-[\u0980-\u09FF\p{N}]+)*$/u,
} as const;

export type RegexSlug = ValueOf<typeof REGEX_SLUG>;

// ============================================================
// Username Validation
// ============================================================
export const REGEX_USERNAME = {
  // Standard: 3-20 chars, letters, numbers, underscore, dot
  STANDARD: /^[a-zA-Z0-9._]{3,20}$/,

  // Strict: 3-20 chars, alphanumeric only
  STRICT: /^[a-zA-Z0-9]{3,20}$/,

  // With Unicode support (Bengali names)
  INTERNATIONAL: /^[\p{L}\p{N}_.]{3,30}$/u,

  // Bengali username
  BENGALI: /^[\u0980-\u09FF\p{N}_.]{3,30}$/u,
} as const;

export type RegexUsername = ValueOf<typeof REGEX_USERNAME>;

// ============================================================
// Product SKU Validation
// ============================================================
export const REGEX_SKU = {
  STANDARD: /^[A-Z0-9]{4,20}$/,
  WITH_HYPHEN: /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/,
  BANGLADESH_BRAND: /^(?:BD|BAN)-[A-Z0-9]{4,16}$/i,
} as const;

export type RegexSku = ValueOf<typeof REGEX_SKU>;

// ============================================================
// ISBN Validation (basic format)
// ============================================================
export const REGEX_ISBN = /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

export type RegexIsbn = typeof REGEX_ISBN;

// ============================================================
// Date Formats
// ============================================================
export const REGEX_DATE = {
  ISO_DATE: /^\d{4}-\d{2}-\d{2}$/,
  ISO_DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?$/,
  DD_MM_YYYY: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
  MM_DD_YYYY: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
  DD_MM_YYYY_BD: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, // With hyphens
} as const;

export type RegexDate = ValueOf<typeof REGEX_DATE>;

// ============================================================
// Color Codes
// ============================================================
export const REGEX_COLOR = {
  HEX: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  HEX_ALPHA: /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,
  RGB: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  RGBA: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|0?\.\d+|1)\)$/,
  HSL: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
} as const;

export type RegexColor = ValueOf<typeof REGEX_COLOR>;

// ============================================================
// IP Addresses
// ============================================================
export const REGEX_IP = {
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  CIDR: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/,
} as const;

export type RegexIp = ValueOf<typeof REGEX_IP>;

// ============================================================
// Security Patterns
// ============================================================
// HTML tags (for sanitization)
export const REGEX_HTML_TAGS = /<[^>]*>/g;

// Special characters (for sanitization)
export const REGEX_SPECIAL_CHARS = /[<>{}[\]|\\\/^~`]/g;

// Script tags (XSS prevention)
export const REGEX_SCRIPT_TAGS = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

// SQL Injection pattern detection
export const REGEX_SQL_INJECTION = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|UNION|JOIN|WHERE|OR|AND)\b|\b(;|--|\/\*|\*\/|@@|@|CHAR|NCHAR|VARCHAR|NVARCHAR|ALTER|BEGIN|CAST|CREATE|CURSOR|DECLARE|DELETE|DROP|END|EXEC|EXECUTE|FETCH|FROM|GROUP|HAVING|INSERT|INTO|JOIN|MERGE|ORDER|REMOVE|REPLICATE|SELECT|SET|TABLE|TRUNCATE|UNION|UPDATE|WAITFOR)\b)/i;

// XSS pattern detection
export const REGEX_XSS = /(\b(on\w+)=|javascript:|<script|<\/script>|alert\(|confirm\(|prompt\(|document\.|window\.|eval\()/i;

export type RegexSecurity = typeof REGEX_HTML_TAGS | typeof REGEX_SPECIAL_CHARS | typeof REGEX_SCRIPT_TAGS | typeof REGEX_SQL_INJECTION | typeof REGEX_XSS;

// ============================================================
// Basic Format Validations
// ============================================================
// Alphanumeric only
export const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;

// Numbers only
export const REGEX_NUMERIC = /^\d+$/;

// Decimal numbers (up to 2 decimal places)
export const REGEX_DECIMAL = /^\d+(?:\.\d{1,2})?$/;

// Decimal numbers (up to 3 decimal places - for pricing)
export const REGEX_DECIMAL_3 = /^\d+(?:\.\d{1,3})?$/;

// Positive integers only
export const REGEX_POSITIVE_INTEGER = /^[1-9]\d*$/;

// Percentage (0-100)
export const REGEX_PERCENTAGE = /^(?:100(?:\.0{1,2})?|[1-9]?\d(?:\.\d{1,2})?)$/;

export type RegexBasic = typeof REGEX_ALPHANUMERIC | typeof REGEX_NUMERIC | typeof REGEX_DECIMAL | typeof REGEX_DECIMAL_3 | typeof REGEX_POSITIVE_INTEGER | typeof REGEX_PERCENTAGE;

// ============================================================
// Financial & Banking (Bangladesh specific)
// ============================================================
// BAN (Basic Account Number)
export const REGEX_BAN = /^[A-Z]{2}\d{20}$/;

// Credit card number (Luhn validation not included - just pattern)
export const REGEX_CREDIT_CARD = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

// CVV/CVC (3-4 digits)
export const REGEX_CVV = /^\d{3,4}$/;

// Card expiry date (MM/YY or MM/YYYY)
export const REGEX_CARD_EXPIRY = /^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{4})$/;

export type RegexFinancial = typeof REGEX_BAN | typeof REGEX_CREDIT_CARD | typeof REGEX_CVV | typeof REGEX_CARD_EXPIRY;

// ============================================================
// Bangladeshi Address Components
// ============================================================
export const REGEX_ADDRESS = {
  // Division names (Bangladesh)
  DIVISION: /^(Dhaka|Chattogram|Rajshahi|Khulna|Barishal|Sylhet|Rangpur|Mymensingh)$/i,

  // District names (64 districts pattern)
  DISTRICT: /^[A-Za-z\s]{3,30}$/,

  // Upazila/Thana
  UPAZILA: /^[A-Za-z\s]{3,30}$/,

  // Village/Moholla
  VILLAGE: /^[A-Za-z0-9\s\-\.]{3,50}$/,

  // House/Flat number
  HOUSE_NUMBER: /^[A-Za-z0-9\/\-\.\s]{1,20}$/,
} as const;

export type RegexAddress = ValueOf<typeof REGEX_ADDRESS>;

// ============================================================
// Bengali Unicode Ranges
// ============================================================
export const REGEX_BENGALI = {
  // Bengali consonants and vowels
  CHARACTERS: /[\u0980-\u09FF]/u,

  // Bengali digits (০-৯)
  DIGITS: /[\u09E6-\u09EF]/u,

  // Bengali full name
  FULL_NAME: /^[\u0980-\u09FF\s]{2,50}$/u,

  // Bengali alphanumeric (with English)
  ALPHANUMERIC: /^[\u0980-\u09FFa-zA-Z0-9\s]{1,100}$/u,
} as const;

export type RegexBengali = ValueOf<typeof REGEX_BENGALI>;

// ============================================================
// BIN (Business Identification Number) - Bangladesh
// ============================================================
export const REGEX_BIN = /^\d{9}$|^\d{11}$/;

// ============================================================
// Trade License Number (Bangladesh)
// ============================================================
export const REGEX_TRADE_LICENSE = /^[A-Z0-9]{6,20}$/i;

// ============================================================
// e-TIN Certificate Number
// ============================================================
export const REGEX_ETIN = /^\d{12}$/;

// ============================================================
// Passport Number (Bangladesh)
// ============================================================
export const REGEX_PASSPORT = /^[A-Z]{1}[0-9]{7}$/i;

// ============================================================
// Deep freeze everything for immutability
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;

  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_NID,
  REGEX_TIN,
  REGEX_POSTAL_CODE,
  REGEX_BANK_ACCOUNT,
  REGEX_MFS,
  REGEX_URL,
  REGEX_SLUG,
  REGEX_USERNAME,
  REGEX_SKU,
  REGEX_ISBN,
  REGEX_DATE,
  REGEX_COLOR,
  REGEX_IP,
  REGEX_HTML_TAGS,
  REGEX_SPECIAL_CHARS,
  REGEX_SCRIPT_TAGS,
  REGEX_SQL_INJECTION,
  REGEX_XSS,
  REGEX_ALPHANUMERIC,
  REGEX_NUMERIC,
  REGEX_DECIMAL,
  REGEX_DECIMAL_3,
  REGEX_POSITIVE_INTEGER,
  REGEX_PERCENTAGE,
  REGEX_BAN,
  REGEX_CREDIT_CARD,
  REGEX_CVV,
  REGEX_CARD_EXPIRY,
  REGEX_ADDRESS,
  REGEX_BENGALI,
  REGEX_BIN,
  REGEX_TRADE_LICENSE,
  REGEX_ETIN,
  REGEX_PASSPORT,
});
