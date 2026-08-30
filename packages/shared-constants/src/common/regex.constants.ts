/**
 * Regular Expression Constants
 * Common regex patterns for validation and parsing
 */

/**
 * Email validation regex
 * Supports standard email formats
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Bangladesh Mobile Number regex
 * Format: 01XXXXXXXXX (11 digits starting with 01)
 * Supports: 013, 014, 015, 016, 017, 018, 019
 */
export const BD_MOBILE_REGEX = /^(01[3-9])\d{8}$/;

/**
 * International Mobile Number regex
 * Supports country codes and various formats
 */
export const INTERNATIONAL_MOBILE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Password validation regex
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
 */
export const PASSWORD_STRONG_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Password validation regex (Medium strength)
 * At least 6 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const PASSWORD_MEDIUM_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

/**
 * Username validation regex
 * 3-20 characters, alphanumeric, underscore, dot, hyphen
 */
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,20}$/;

/**
 * URL validation regex
 * Supports http, https, ftp protocols
 */
export const URL_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;

/**
 * UUID v4 validation regex
 */
export const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

/**
 * UUID v1-v5 validation regex
 */
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/**
 * Bangladeshi NID (National ID) regex
 * Format: 10-17 digits
 */
export const BD_NID_REGEX = /^\d{10,17}$/;

/**
 * Bangladeshi Birth Registration Number regex
 * Format: 17 digits
 */
export const BD_BIRTH_REGEX = /^\d{17}$/;

/**
 * Bangladeshi Passport Number regex
 * Format: 1-2 letters followed by 6-8 digits
 */
export const BD_PASSPORT_REGEX = /^[A-Z]{1,2}\d{6,8}$/;

/**
 * Postal Code regex (Bangladesh)
 * Format: 4 digits
 */
export const BD_POSTAL_CODE_REGEX = /^\d{4}$/;

/**
 * IP Address v4 regex
 */
export const IP_V4_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

/**
 * IP Address v6 regex
 */
export const IP_V6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

/**
 * HTML Tag regex
 */
export const HTML_TAG_REGEX = /<[^>]*>/g;

/**
 * SQL Injection prevention regex
 */
export const SQL_INJECTION_REGEX =
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE)\b)|(['"])(?:(?!(?:\\|\1)).)*\1|(--\s*)/i;

/**
 * XSS prevention regex
 */
export const XSS_REGEX =
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>|<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>|<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>|<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi;

/**
 * Color Hex code regex
 */
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

/**
 * RGB Color regex
 */
export const RGB_COLOR_REGEX = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

/**
 * HSL Color regex
 */
export const HSL_COLOR_REGEX = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

/**
 * Date regex (YYYY-MM-DD)
 */
export const DATE_ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Date regex (DD/MM/YYYY)
 */
export const DATE_DMY_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

/**
 * Date regex (MM/DD/YYYY)
 */
export const DATE_MDY_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

/**
 * Time regex (HH:MM:SS)
 */
export const TIME_24H_REGEX = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

/**
 * Time regex (HH:MM)
 */
export const TIME_24H_SHORT_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

/**
 * Time regex (HH:MM:SS AM/PM)
 */
export const TIME_12H_REGEX = /^(0?[1-9]|1[0-2]):([0-5]\d):([0-5]\d)\s*(AM|PM)$/;

/**
 * Datetime regex (YYYY-MM-DDTHH:MM:SS)
 */
export const DATETIME_ISO_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/;

/**
 * Credit Card regex (generic)
 */
export const CREDIT_CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;

/**
 * Credit Card regex (Visa)
 */
export const VISA_REGEX = /^4[0-9]{12}(?:[0-9]{3})?$/;

/**
 * Credit Card regex (Mastercard)
 */
export const MASTERCARD_REGEX =
  /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

/**
 * Credit Card regex (American Express)
 */
export const AMEX_REGEX = /^3[47][0-9]{13}$/;

/**
 * Credit Card regex (Discover)
 */
export const DISCOVER_REGEX = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

/**
 * Bitcoin address regex
 */
export const BITCOIN_REGEX = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;

/**
 * Ethereum address regex
 */
export const ETHEREUM_REGEX = /^0x[a-fA-F0-9]{40}$/;

/**
 * Bangladeshi Taka (BDT) amount regex
 * Format: 0.00 to 99999999.99
 */
export const BDT_AMOUNT_REGEX = /^\d{1,8}(\.\d{1,2})?$/;

/**
 * Percentage regex (0-100 with 2 decimal places)
 */
export const PERCENTAGE_REGEX = /^(100(\.00?)?|\d{1,2}(\.\d{1,2})?)$/;

/**
 * Latitude regex
 */
export const LATITUDE_REGEX = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

/**
 * Longitude regex
 */
export const LONGITUDE_REGEX = /^-?(1[0-7]?\d(\.\d+)?|180(\.0+)?)$/;

/**
 * File extension regex (common image formats)
 */
export const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i;

/**
 * File extension regex (common document formats)
 */
export const DOCUMENT_EXT_REGEX = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|odt|ods|odp)$/i;

/**
 * File extension regex (video formats)
 */
export const VIDEO_EXT_REGEX = /\.(mp4|avi|mov|wmv|flv|mkv|webm|m4v|3gp)$/i;

/**
 * File extension regex (audio formats)
 */
export const AUDIO_EXT_REGEX = /\.(mp3|wav|aac|flac|ogg|wma|m4a)$/i;

/**
 * MIME type regex (image)
 */
export const IMAGE_MIME_REGEX = /^image\/(jpeg|png|gif|bmp|webp|svg\+xml|tiff|ico|x-icon)$/;

/**
 * MIME type regex (video)
 */
export const VIDEO_MIME_REGEX = /^video\/(mp4|avi|mov|wmv|flv|mkv|webm|m4v|3gpp)$/;

/**
 * MIME type regex (audio)
 */
export const AUDIO_MIME_REGEX = /^audio\/(mpeg|wav|aac|flac|ogg|wma|m4a)$/;

/**
 * MIME type regex (application)
 */
export const APPLICATION_MIME_REGEX =
  /^application\/(pdf|msword|vnd\.ms-excel|vnd\.ms-powerpoint|zip|gzip|json|xml)$/;

/**
 * Strip HTML tags from string
 */
export function stripHtmlTags(input: string): string {
  return input.replace(HTML_TAG_REGEX, '');
}

/**
 * Check if string contains SQL injection patterns
 */
export function hasSqlInjection(input: string): boolean {
  return SQL_INJECTION_REGEX.test(input);
}

/**
 * Check if string contains XSS patterns
 */
export function hasXssAttack(input: string): boolean {
  return XSS_REGEX.test(input);
}

/**
 * Sanitize input for HTML
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Check if string is valid Bangladesh mobile number
 */
export function isValidBdMobile(mobile: string): boolean {
  return BD_MOBILE_REGEX.test(mobile);
}

/**
 * Check if string is valid strong password
 */
export function isStrongPassword(password: string): boolean {
  return PASSWORD_STRONG_REGEX.test(password);
}

/**
 * Check if string is valid URL
 */
export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}
