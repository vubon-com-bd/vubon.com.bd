/**
 * Regular expression constants for validation
 * All regex patterns are immutable and exported as const for strict type safety
 */
/**
 * Email validation regex compliant with RFC 5322 specification
 * Supports standard email formats with domain validation
 *
 * Pattern breakdown:
 * - Local part: Allows alphanumeric, dots, underscores, percent, plus, and hyphen
 * - Domain part: Allows alphanumeric, dots, and hyphens (must have TLD)
 * - Case insensitive matching
 */
export const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
/**
 * Password complexity validation regex
 * Enforces strong password requirements for security
 *
 * Pattern breakdown:
 * - At least 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one digit (0-9)
 * - At least one special character (@$!%*?&)
 * - Maximum 72 characters (bcrypt limitation)
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,72}$/;
/**
 * Phone number validation regex for Bangladeshi numbers
 *
 * Pattern breakdown:
 * - Starts with 01
 * - Followed by 3-9 (operator code)
 * - Followed by exactly 8 digits
 * - Total length: 11 digits
 */
export const PHONE_REGEX = /^01[3-9]\d{8}$/;
/**
 * UUID v7 validation regex
 * For validating UUID v7 format (timestamp-based)
 */
export const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
/**
 * URL validation regex
 * For validating URL format in metadata or other fields
 */
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
//# sourceMappingURL=regex.constants.js.map