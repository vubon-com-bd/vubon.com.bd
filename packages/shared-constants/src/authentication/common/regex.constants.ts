// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Regular expressions for validation
 */
export const REGEX = {
  /**
   * Email validation regex
   * Supports standard email formats
   */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /**
   * Phone number validation regex
   * Supports international phone numbers
   */
  PHONE: /^\+?[1-9]\d{1,14}$/,

  /**
   * Password validation regex
   * At least 8 characters, at least one uppercase, one lowercase, one number, one special character
   */
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  /**
   * Username validation regex
   * Alphanumeric, underscore, dot, hyphen (3-30 characters)
   */
  USERNAME: /^[a-zA-Z0-9_.-]{3,30}$/,

  /**
   * URL validation regex
   * Supports http, https, and ftp protocols
   */
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  /**
   * UUID validation regex
   * Supports UUID v4 format
   */
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,

  /**
   * Alphanumeric validation regex
   * Only letters and numbers
   */
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  /**
   * Only letters validation regex
   * Only alphabetic characters (including spaces)
   */
  ONLY_LETTERS: /^[a-zA-Z\s]+$/,

  /**
   * IP address validation regex
   * Supports IPv4 format
   */
  IP_ADDRESS:
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  /**
   * ZIP code validation regex
   * Supports 5-digit and 9-digit ZIP codes
   */
  ZIP_CODE: /^[0-9]{5}(?:-[0-9]{4})?$/,

  /**
   * Date validation regex
   * Supports YYYY-MM-DD format
   */
  DATE: /^\d{4}-\d{2}-\d{2}$/,

  /**
   * Time validation regex
   * Supports HH:MM:SS format
   */
  TIME: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,

  /**
   * Hex color validation regex
   * Supports #RGB and #RRGGBB formats
   */
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  /**
   * Slug validation regex
   * Supports URL-friendly slugs
   */
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  /**
   * Domain validation regex
   * Supports domain names
   */
  DOMAIN: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,

  /**
   * HTML tag validation regex
   * Detects HTML tags
   */
  HTML_TAG: /<[^>]*>/,

  /**
   * SQL injection validation regex
   * Detects potential SQL injection patterns
   */
  SQL_INJECTION:
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE)\b)/i,

  /**
   * XSS validation regex
   * Detects potential XSS patterns
   */
  XSS: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
} as const;

/**
 * Type for regex patterns
 */
export type RegexPattern = typeof REGEX;

/**
 * Type for regex keys
 */
export type RegexKey = keyof typeof REGEX;
