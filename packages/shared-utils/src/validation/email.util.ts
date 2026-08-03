import { EMAIL_REGEX } from '@vubon/shared-constants';

/**
 * List of common disposable email domains for optional filtering
 */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com',
  'throwaway.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
  'getnada.com',
  'dropmail.me',
  'mailnesia.com',
  'spamgourmet.com',
  'trashmail.com',
  'temp-mail.org',
  'fakeinbox.com',
  'throwawaymail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'maildrop.cc',
  'mailcatch.com',
  'spambox.us',
  'tempinbox.com',
  'trash2009.com',
  'trashmail.net',
  'trashmail.me',
  'spamfree24.com',
  'spamfree24.net',
  'spamfree24.org',
  'spamfree24.de',
  'spamspot.com',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'mytemp.email',
  'temp-mail.net',
  'tempinbox.co',
  'temp-mail.io',
]);

/**
 * Checks if the provided email is valid according to RFC 5322 standard
 *
 * @param email - The email address to validate
 * @returns `true` if the email is valid, `false` otherwise
 *
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Use the standard regex from shared-constants
  return EMAIL_REGEX.STANDARD.test(email);
}

/**
 * Normalizes an email address by trimming whitespace and converting to lowercase
 *
 * @param email - The email address to normalize
 * @returns The normalized email address
 *
 * @example
 * normalizeEmail('  User@Example.COM  ') // 'user@example.com'
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  return email.trim().toLowerCase();
}

/**
 * Checks if the email domain is from a disposable/temporary email service
 *
 * @param email - The email address to check
 * @returns `true` if the email is from a disposable service, `false` otherwise
 *
 * @example
 * isDisposableEmail('user@tempmail.com') // true
 * isDisposableEmail('user@gmail.com') // false
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const normalized = normalizeEmail(email);
  const domain = normalized.split('@')[1];

  if (!domain) {
    return false;
  }

  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
