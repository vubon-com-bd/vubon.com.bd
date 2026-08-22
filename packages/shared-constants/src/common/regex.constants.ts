/**
 * Regular Expression Constants
 * Common regex patterns for validation and string manipulation
 */

export const REGEX = {
  // Email validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number (Bangladesh)
  PHONE_BD: /^(?:\+88|88)?(01[3-9]\d{8})$/,

  // International phone
  PHONE_INTERNATIONAL: /^\+(?:[0-9]){1,15}$/,

  // Bangladesh NID
  NID: /^[0-9]{10,17}$/,

  // Bangladesh passport
  PASSPORT: /^[A-Z]{1,2}[0-9]{6,9}$/,

  // Birth registration
  BIRTH_REGISTRATION: /^[0-9]{17}$/,

  // Postal code (Bangladesh)
  POSTAL_CODE_BD: /^[0-9]{4}$/,

  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // UUID v4
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,

  // UUID v7 (timestamp-based)
  UUID_V7: /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,

  // MongoDB ObjectId
  MONGO_ID: /^[0-9a-fA-F]{24}$/,

  // JWT Token
  JWT: /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,

  // Hexadecimal color
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // RGB color
  RGB_COLOR: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,

  // HSL color
  HSL_COLOR: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,

  // Date (YYYY-MM-DD)
  DATE: /^\d{4}-\d{2}-\d{2}$/,

  // Time (HH:MM:SS)
  TIME: /^\d{2}:\d{2}:\d{2}$/,

  // DateTime (ISO 8601)
  DATETIME_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,

  // Bangladeshi currency (BDT)
  BDT: /^[০-৯]+$/,

  // Bengali text
  BENGALI: /^[\u0980-\u09FF]+$/,

  // English text
  ENGLISH: /^[a-zA-Z\s'-]+$/,

  // Alphanumeric
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Alphanumeric with spaces
  ALPHANUMERIC_SPACE: /^[a-zA-Z0-9\s]+$/,

  // Username (3-20 chars, alphanumeric, underscore, hyphen)
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,

  // Password (8+ chars with at least one letter and one number)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,

  // Password (Strong: 8+ chars, upper, lower, number, special)
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Slug (URL-friendly)
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // IP Address (IPv4)
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // IP Address (IPv6)
  IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,

  // HTML tags
  HTML_TAGS: /<[^>]*>/g,

  // Special characters
  SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/g,

  // Whitespace
  WHITESPACE: /\s+/g,

  // Multiple spaces
  MULTIPLE_SPACES: /\s{2,}/g,

  // Newlines
  NEWLINES: /\r?\n|\r/g,

  // Emoji
  EMOJI: /[\u{1F300}-\u{1FAFF}]/u,

  // Unicode characters
  UNICODE: /[\u{0080}-\u{FFFF}]/u,
} as const;

export type RegexPattern = (typeof REGEX)[keyof typeof REGEX];

// Utility functions
export function matchesRegex(value: string, pattern: RegexPattern): boolean {
  return pattern.test(value);
}

export function sanitizeInput(value: string): string {
  return value.replace(REGEX.HTML_TAGS, '').trim();
}

export function removeSpecialChars(value: string): string {
  return value.replace(REGEX.SPECIAL_CHARS, '');
}

export function normalizeWhitespace(value: string): string {
  return value.replace(REGEX.MULTIPLE_SPACES, ' ').trim();
}

export function isEmail(value: string): boolean {
  return REGEX.EMAIL.test(value);
}

export function isPhoneBD(value: string): boolean {
  return REGEX.PHONE_BD.test(value);
}

export function isNID(value: string): boolean {
  return REGEX.NID.test(value);
}

export function isBDT(value: string): boolean {
  return REGEX.BDT.test(value);
}

export function isBengali(value: string): boolean {
  return REGEX.BENGALI.test(value);
}

export function isStrongPassword(value: string): boolean {
  return REGEX.PASSWORD_STRONG.test(value);
}

export function isSlug(value: string): boolean {
  return REGEX.SLUG.test(value);
}

export function isIPv4(value: string): boolean {
  return REGEX.IPV4.test(value);
}

export function isUUID(value: string): boolean {
  return REGEX.UUID.test(value);
}
