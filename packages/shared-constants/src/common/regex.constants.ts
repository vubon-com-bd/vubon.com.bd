/**
 * @fileoverview Regular expressions for data validation
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Email regex - validates standard email format
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Phone number regexes by country
 */
export const PHONE_REGEX = {
  /** Bangladesh phone number (11 digits, starts with 01) */
  BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
  /** USA phone number (format: +1 XXX XXX XXXX) */
  USA: /^(?:\+1|1)?\s?\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  /** International phone number (E.164 format) */
  INTERNATIONAL: /^\+[1-9]\d{1,14}$/,
  /** Generic phone number */
  GENERIC: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
};

/**
 * URL regex - validates URL format
 */
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

/**
 * Date regexes
 */
export const DATE_REGEX = {
  /** YYYY-MM-DD format */
  YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
  /** DD-MM-YYYY format */
  DD_MM_YYYY: /^\d{2}-\d{2}-\d{4}$/,
  /** MM-DD-YYYY format */
  MM_DD_YYYY: /^\d{2}-\d{2}-\d{4}$/,
  /** DD/MM/YYYY format */
  DD_MM_YYYY_SLASH: /^\d{2}\/\d{2}\/\d{4}$/,
  /** MM/DD/YYYY format */
  MM_DD_YYYY_SLASH: /^\d{2}\/\d{2}\/\d{4}$/,
  /** YYYY/MM/DD format */
  YYYY_MM_DD_SLASH: /^\d{4}\/\d{2}\/\d{2}$/,
};

/**
 * Time regexes
 */
export const TIME_REGEX = {
  /** HH:MM format (24-hour) */
  HH_MM: /^([01]\d|2[0-3]):[0-5]\d$/,
  /** HH:MM:SS format (24-hour) */
  HH_MM_SS: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  /** HH:MM format (12-hour with AM/PM) */
  HH_MM_AM_PM: /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i,
};

/**
 * Datetime regex (YYYY-MM-DDTHH:MM:SS)
 */
export const DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

/**
 * ZIP/Postal code regexes by country
 */
export const ZIP_CODE_REGEX = {
  /** Bangladesh postal code (4 digits) */
  BANGLADESH: /^\d{4}$/,
  /** USA ZIP code (5 digits or 5+4) */
  USA: /^\d{5}(?:-\d{4})?$/,
  /** UK postcode */
  UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
  /** Canada postal code */
  CANADA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
  /** Australia postcode (4 digits) */
  AUSTRALIA: /^\d{4}$/,
  /** India PIN code (6 digits) */
  INDIA: /^\d{6}$/,
  /** Pakistan postal code (5 digits) */
  PAKISTAN: /^\d{5}$/,
  /** Saudi Arabia postal code (5 digits) */
  SAUDI_ARABIA: /^\d{5}$/,
  /** UAE postal code (5 digits) */
  UAE: /^\d{5}$/,
  /** Singapore postal code (6 digits) */
  SINGAPORE: /^\d{6}$/,
  /** Malaysia postcode (5 digits) */
  MALAYSIA: /^\d{5}$/,
  /** Thailand postcode (5 digits) */
  THAILAND: /^\d{5}$/,
  /** Vietnam postcode (6 digits) */
  VIETNAM: /^\d{6}$/,
  /** Philippines postcode (4 digits) */
  PHILIPPINES: /^\d{4}$/,
  /** Indonesia postcode (5 digits) */
  INDONESIA: /^\d{5}$/,
  /** South Korea postcode (5 digits) */
  SOUTH_KOREA: /^\d{5}$/,
  /** Japan postal code (7 digits) */
  JAPAN: /^\d{3}-\d{4}$/,
  /** China postal code (6 digits) */
  CHINA: /^\d{6}$/,
  /** Germany postcode (5 digits) */
  GERMANY: /^\d{5}$/,
  /** France postal code (5 digits) */
  FRANCE: /^\d{5}$/,
  /** Italy postcode (5 digits) */
  ITALY: /^\d{5}$/,
  /** Spain postal code (5 digits) */
  SPAIN: /^\d{5}$/,
  /** Netherlands postcode (4 digits + 2 letters) */
  NETHERLANDS: /^\d{4}\s?[A-Z]{2}$/i,
  /** Belgium postcode (4 digits) */
  BELGIUM: /^\d{4}$/,
  /** Switzerland postcode (4 digits) */
  SWITZERLAND: /^\d{4}$/,
  /** Sweden postcode (5 digits) */
  SWEDEN: /^\d{5}$/,
  /** Norway postcode (4 digits) */
  NORWAY: /^\d{4}$/,
  /** Denmark postcode (4 digits) */
  DENMARK: /^\d{4}$/,
  /** Finland postcode (5 digits) */
  FINLAND: /^\d{5}$/,
  /** Poland postcode (5 digits) */
  POLAND: /^\d{2}-\d{3}$/,
  /** Greece postcode (5 digits) */
  GREECE: /^\d{5}$/,
  /** Turkey postcode (5 digits) */
  TURKEY: /^\d{5}$/,
  /** Egypt postcode (5 digits) */
  EGYPT: /^\d{5}$/,
  /** Nigeria postcode (6 digits) */
  NIGERIA: /^\d{6}$/,
  /** South Africa postcode (4 digits) */
  SOUTH_AFRICA: /^\d{4}$/,
  /** Brazil postcode (8 digits) */
  BRAZIL: /^\d{5}-\d{3}$/,
  /** Mexico postcode (5 digits) */
  MEXICO: /^\d{5}$/,
  /** Argentina postcode (4 digits) */
  ARGENTINA: /^\d{4}$/,
  /** Chile postcode (7 digits) */
  CHILE: /^\d{7}$/,
  /** Colombia postcode (6 digits) */
  COLOMBIA: /^\d{6}$/,
  /** Peru postcode (5 digits) */
  PERU: /^\d{5}$/,
};

/**
 * Username regex (3-20 characters, letters, numbers, underscore, dot)
 */
export const USERNAME_REGEX = /^[a-zA-Z0-9_.]{3,20}$/;

/**
 * Password regexes
 */
export const PASSWORD_REGEX = {
  /** Strong: 8+ chars, upper, lower, number, special */
  STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  /** Medium: 8+ chars, upper, lower, number */
  MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  /** Weak: 6+ chars, any */
  WEAK: /^.{6,}$/,
};

/**
 * Slug regex (URL-friendly string)
 */
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * UUID regex (versions 1-5)
 */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Hex color regex (#RGB, #RRGGBB)
 */
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

/**
 * IP address regexes
 */
export const IP_ADDRESS_REGEX = {
  /** IPv4 address */
  IPv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  /** IPv6 address */
  IPv6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
};

/**
 * MAC address regex
 */
export const MAC_ADDRESS_REGEX = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

/**
 * Credit card regexes
 */
export const CREDIT_CARD_REGEX = {
  /** Visa card */
  VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
  /** Mastercard */
  MASTERCARD: /^5[1-5][0-9]{14}$/,
  /** American Express */
  AMEX: /^3[47][0-9]{13}$/,
  /** Discover card */
  DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  /** Generic credit card */
  GENERIC:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
};

/**
 * Currency regex (USD format: $1,234.56)
 */
export const CURRENCY_REGEX = /^\$?(\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{2})?$/;

/**
 * Percentage regex (0-100 with optional decimal)
 */
export const PERCENTAGE_REGEX = /^100(?:\.0{1,2})?$|^\d{1,2}(?:\.\d{1,2})?%?$/;

/**
 * Alphanumeric regex (letters and numbers only)
 */
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

/**
 * Alphabetic regex (letters only)
 */
export const ALPHABETIC_REGEX = /^[a-zA-Z]+$/;

/**
 * Numeric regex (numbers only)
 */
export const NUMERIC_REGEX = /^[0-9]+$/;

/**
 * Email domain regex
 */
export const EMAIL_DOMAIN_REGEX = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * HTML tag regex
 */
export const HTML_TAG_REGEX = /<[^>]*>/g;

/**
 * URL-safe string regex (alphanumeric, underscore, hyphen)
 */
export const URL_SAFE_REGEX = /^[a-zA-Z0-9_-]+$/;

/**
 * Base64 regex
 */
export const BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * JWT regex
 */
export const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

/**
 * JSON regex (basic validation)
 */
export const JSON_REGEX = /^[\s\S]*$/;

/**
 * XML regex (basic validation)
 */
export const XML_REGEX = /^<([a-zA-Z][a-zA-Z0-9]*)(?:[^>]*)>(.*?)<\/\1>$/;

/**
 * HTML entity regex
 */
export const HTML_ENTITY_REGEX = /&[a-zA-Z]+;/g;

/**
 * Unicode regex (matches any unicode character)
 */
export const UNICODE_REGEX = /[^\x00-\x7F]/g;

/**
 * Whitespace regex
 */
export const WHITESPACE_REGEX = /\s+/g;

/**
 * Special character regex
 */
export const SPECIAL_CHARACTER_REGEX = /[^a-zA-Z0-9\s]/g;

/**
 * Object containing all regex patterns for easy access
 */
export const REGEX_PATTERNS = {
  EMAIL_REGEX,
  PHONE_REGEX,
  URL_REGEX,
  DATE_REGEX,
  TIME_REGEX,
  DATETIME_REGEX,
  ZIP_CODE_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  SLUG_REGEX,
  UUID_REGEX,
  HEX_COLOR_REGEX,
  IP_ADDRESS_REGEX,
  MAC_ADDRESS_REGEX,
  CREDIT_CARD_REGEX,
  CURRENCY_REGEX,
  PERCENTAGE_REGEX,
  ALPHANUMERIC_REGEX,
  ALPHABETIC_REGEX,
  NUMERIC_REGEX,
  EMAIL_DOMAIN_REGEX,
  HTML_TAG_REGEX,
  URL_SAFE_REGEX,
  BASE64_REGEX,
  JWT_REGEX,
  JSON_REGEX,
  XML_REGEX,
  HTML_ENTITY_REGEX,
  UNICODE_REGEX,
  WHITESPACE_REGEX,
  SPECIAL_CHARACTER_REGEX,
} as const;

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate phone number by country
 */
export function isValidPhone(
  phone: string,
  country: keyof typeof PHONE_REGEX = 'GENERIC'
): boolean {
  const regex = PHONE_REGEX[country] || PHONE_REGEX.GENERIC;
  return regex.test(phone);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}

/**
 * Validate date
 */
export function isValidDate(date: string, format: keyof typeof DATE_REGEX = 'YYYY_MM_DD'): boolean {
  const regex = DATE_REGEX[format];
  if (!regex) return false;
  if (!regex.test(date)) return false;

  // Additional validation for actual date
  const parts = date.split(/[-/]/);
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  const dateObj = new Date(year, month, day);
  return (
    dateObj.getFullYear() === year && dateObj.getMonth() === month && dateObj.getDate() === day
  );
}

/**
 * Validate time
 */
export function isValidTime(time: string, format: keyof typeof TIME_REGEX = 'HH_MM'): boolean {
  const regex = TIME_REGEX[format];
  return regex ? regex.test(time) : false;
}

/**
 * Validate datetime
 */
export function isValidDatetime(datetime: string): boolean {
  return DATETIME_REGEX.test(datetime);
}

/**
 * Validate ZIP code by country
 */
export function isValidZipCode(zip: string, country: keyof typeof ZIP_CODE_REGEX): boolean {
  const regex = ZIP_CODE_REGEX[country];
  return regex ? regex.test(zip) : false;
}

/**
 * Validate username
 */
export function isValidUsername(username: string): boolean {
  return USERNAME_REGEX.test(username);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
} {
  if (PASSWORD_REGEX.STRONG.test(password)) {
    return { isValid: true, strength: 'strong' };
  }
  if (PASSWORD_REGEX.MEDIUM.test(password)) {
    return { isValid: true, strength: 'medium' };
  }
  if (PASSWORD_REGEX.WEAK.test(password)) {
    return { isValid: true, strength: 'weak' };
  }
  return { isValid: false, strength: 'weak' };
}

/**
 * Validate slug
 */
export function isValidSlug(slug: string): boolean {
  return SLUG_REGEX.test(slug);
}

/**
 * Validate UUID
 */
export function isValidUuid(uuid: string): boolean {
  return UUID_REGEX.test(uuid);
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  return HEX_COLOR_REGEX.test(color);
}

/**
 * Validate IP address
 */
export function isValidIpAddress(ip: string, version: 'IPv4' | 'IPv6' = 'IPv4'): boolean {
  const regex = IP_ADDRESS_REGEX[version];
  return regex ? regex.test(ip) : false;
}

/**
 * Validate MAC address
 */
export function isValidMacAddress(mac: string): boolean {
  return MAC_ADDRESS_REGEX.test(mac);
}

/**
 * Validate credit card
 */
export function isValidCreditCard(
  card: string,
  type: keyof typeof CREDIT_CARD_REGEX = 'GENERIC'
): boolean {
  const regex = CREDIT_CARD_REGEX[type];
  return regex ? regex.test(card.replace(/\s/g, '')) : false;
}
