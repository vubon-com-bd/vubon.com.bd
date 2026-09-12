/**
 * Regular Expression Constants
 * @module shared-constants/common/regex.constants
 */

export const REGEX = {
  // Email validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Bangladesh Phone Number (valid formats)
  BD_PHONE: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,
  BD_MOBILE: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,

  // International Phone
  PHONE: /^\+?[1-9]\d{1,14}$/,

  // URL validation
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  URL_STRICT: /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Slug (URL friendly)
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Username (3-20 chars, alphanumeric, underscore, hyphen)
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,

  // Password (min 8, max 72 chars, uppercase + lowercase + number + special)
  // Aligned with SECURITY.PASSWORD.SPECIAL_CHARS
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,72}$/,
  PASSWORD_MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/,
  PASSWORD_WEAK: /^.{6,72}$/,

  // Bangladeshi NID (National ID)
  NID: /^\d{10,17}$/,

  // TIN (Tax Identification Number) - Bangladesh
  TIN: /^\d{9,12}$/,

  // BIN (Business Identification Number) - Bangladesh
  BIN: /^\d{9,11}$/,

  // Postal Code (Bangladesh - 4 digits)
  BD_POSTAL_CODE: /^\d{4}$/,

  // Division code (Bangladesh - 2 digits)
  BD_DIVISION_CODE: /^\d{2}$/,

  // District code (Bangladesh - 4 digits)
  BD_DISTRICT_CODE: /^\d{4}$/,

  // Upazila code (Bangladesh - 6 digits)
  BD_UPAZILA_CODE: /^\d{6}$/,

  // Bengali Unicode
  BENGALI: /[\u0980-\u09FF]/,

  // English alphabets only
  ALPHABET_ONLY: /^[a-zA-Z]+$/,

  // Alphanumeric
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Numeric only
  NUMERIC: /^\d+$/,

  // Decimal number
  DECIMAL: /^\d+(\.\d{1,2})?$/,

  // Percentage (0-100)
  PERCENTAGE: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,

  // Date (YYYY-MM-DD)
  DATE_ISO: /^\d{4}-\d{2}-\d{2}$/,

  // Date (DD-MM-YYYY)
  DATE_BD: /^\d{2}-\d{2}-\d{4}$/,

  // Time (HH:MM:SS)
  TIME_ISO: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,

  // Time (HH:MM)
  TIME_SHORT: /^([01]\d|2[0-3]):[0-5]\d$/,

  // IP Address v4
  IPV4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // IP Address v6 (simplified)
  IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,

  // Hex color
  HEX_COLOR: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,

  // RGB color
  RGB_COLOR: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,

  // HTML tags (for sanitization)
  HTML_TAGS: /<[^>]*>/g,

  // Special characters
  SPECIAL_CHARS: /[^a-zA-Z0-9\s]/g,

  // Whitespace
  WHITESPACE: /\s+/g,

  // Multiple spaces
  MULTIPLE_SPACES: /\s{2,}/g,

  // Leading/trailing spaces
  LEADING_TRAILING_SPACES: /^\s+|\s+$/g,

  // Bengali numerals
  BENGALI_NUMERALS: /[\u09E6-\u09EF]/g,

  // English numerals
  ENGLISH_NUMERALS: /[0-9]/g,

  // Contains Bangla
  HAS_BANGLA: /[\u0980-\u09FF]/,

  // Contains English
  HAS_ENGLISH: /[a-zA-Z]/,

  // JSON string
  JSON: /^[\],:{}\s]*$|^("(?:\\["\\\/bfnrt]|\\u[0-9a-fA-F]{4})*"|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?[\\s]*)$/,

  // Base64
  BASE64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,

  // JWT token
  JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,

  // OTP (6 digits)
  OTP: /^\d{6}$/,

  // PIN (4 digits)
  PIN: /^\d{4}$/,

  // Credit Card (basic)
  CREDIT_CARD:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/,

  // CVV (3-4 digits)
  CVV: /^\d{3,4}$/,

  // Bkash account (Bangladesh)
  BKASH_ACCOUNT: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,

  // Nagad account (Bangladesh)
  NAGAD_ACCOUNT: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,

  // Rocket account (Bangladesh)
  ROCKET_ACCOUNT: /^\d{10,15}$/,

  // Product SKU (alphanumeric, hyphen, underscore)
  SKU: /^[A-Z0-9_-]{3,20}$/,

  // Order number format
  ORDER_NUMBER: /^ORD-[A-Z0-9]{8,12}$/,

  // Invoice number format
  INVOICE_NUMBER: /^INV-[A-Z0-9]{8,12}$/,
} as const;

export type RegexPattern = keyof typeof REGEX;
