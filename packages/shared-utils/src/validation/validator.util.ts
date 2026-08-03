import { PASSWORD_POLICY, PHONE_REGEX, USERNAME_REGEX, URL_REGEX } from '@vubon/shared-constants';

/**
 * Checks if a password meets the complexity requirements defined in PASSWORD_POLICY
 *
 * @param password - The password string to check
 * @returns `true` if the password meets all requirements, `false` otherwise
 *
 * @example
 * isPasswordStrong('StrongP@ssw0rd') // true
 * isPasswordStrong('weak') // false
 */
export function isPasswordStrong(password: string): boolean {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // Check minimum length
  if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
    return false;
  }

  // Check maximum length
  if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
    return false;
  }

  // Check for uppercase letters if required
  if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return false;
  }

  // Check for lowercase letters if required
  if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return false;
  }

  // Check for numbers if required
  if (PASSWORD_POLICY.REQUIRE_NUMBER && !/\d/.test(password)) {
    return false;
  }

  // Check for special characters if required
  if (PASSWORD_POLICY.REQUIRE_SPECIAL_CHAR) {
    const specialChars = PASSWORD_POLICY.SPECIAL_CHARS || '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const specialCharRegex = new RegExp(`[${specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (!specialCharRegex.test(password)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a phone number is valid, with support for Bangladeshi formats
 *
 * @param phone - The phone number string to check
 * @returns `true` if the phone number is valid, `false` otherwise
 *
 * @example
 * isValidPhone('01712345678') // true
 * isValidPhone('+8801712345678') // true
 * isValidPhone('123456') // false
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  const trimmedPhone = phone.trim();

  // Check against international format
  if (PHONE_REGEX.INTERNATIONAL.test(trimmedPhone)) {
    return true;
  }

  // Check against format with country code
  if (PHONE_REGEX.WITH_COUNTRY_CODE.test(trimmedPhone)) {
    return true;
  }

  // Check against Bangladeshi mobile format (01XXXXXXXXX)
  const bangladeshMobileRegex = /^01[3-9]\d{8}$/;
  if (bangladeshMobileRegex.test(trimmedPhone)) {
    return true;
  }

  // Check against simple digit format (7-15 digits)
  if (PHONE_REGEX.SIMPLE.test(trimmedPhone)) {
    return true;
  }

  return false;
}

/**
 * Checks if a username meets the standard format requirements
 *
 * @param username - The username string to check
 * @returns `true` if the username is valid, `false` otherwise
 *
 * @example
 * isValidUsername('john_doe') // true
 * isValidUsername('john.doe') // false (contains dot)
 * isValidUsername('jo') // false (too short)
 */
export function isValidUsername(username: string): boolean {
  if (!username || typeof username !== 'string') {
    return false;
  }

  // Use the standard username regex from shared-constants
  return USERNAME_REGEX.STANDARD.test(username);
}

/**
 * Checks if a string is a valid UUID (version 4)
 *
 * @param uuid - The UUID string to check
 * @returns `true` if the UUID is valid, `false` otherwise
 *
 * @example
 * isValidUUID('123e4567-e89b-12d3-a456-426614174000') // true
 * isValidUUID('invalid-uuid') // false
 */
export function isValidUUID(uuid: string): boolean {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }

  // UUID v4 regex pattern
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Checks if a URL is valid (supports HTTP, HTTPS, and optional protocols)
 *
 * @param url - The URL string to check
 * @returns `true` if the URL is valid, `false` otherwise
 *
 * @example
 * isValidURL('https://example.com') // true
 * isValidURL('example.com') // true (with optional protocol)
 * isValidURL('invalid-url') // false
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmedUrl = url.trim();

  // Check against HTTP/HTTPS URL regex
  if (URL_REGEX.HTTP.test(trimmedUrl)) {
    return true;
  }

  // Check against URL with optional protocol
  if (URL_REGEX.WITH_OPTIONAL_PROTOCOL.test(trimmedUrl)) {
    return true;
  }

  return false;
}
