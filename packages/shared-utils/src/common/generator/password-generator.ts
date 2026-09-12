/**
 * Password Generator — cryptographically secure.
 * @module shared-utils/common/generator/password
 *
 * ⚠️ Uses crypto.randomBytes via secureRandomString.
 * Follows SECURITY.PASSWORD rules for character requirements.
 */

import { secureRandomString, secureRandomInt } from '../helper/crypto.helper';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const ALL = UPPER + LOWER + DIGITS + SPECIAL;

/**
 * Generates a cryptographically secure password.
 * Guarantees at least one char from each required class.
 */
export const generatePassword = (length: number = 16): string => {
  if (length < 8) throw new Error('Password length must be at least 8');
  if (length > 128) throw new Error('Password length must not exceed 128');

  // Guarantee one of each class
  const required = [
    secureRandomString(1, UPPER),
    secureRandomString(1, LOWER),
    secureRandomString(1, DIGITS),
    secureRandomString(1, SPECIAL),
  ];
  const remaining = length - required.length;
  const rest = secureRandomString(remaining, ALL);

  // Shuffle using crypto-secure Fisher-Yates
  const chars = [...required.join(''), ...rest];
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i);
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }
  return chars.join('');
};

/**
 * Generates a numeric PIN (crypto-secure).
 */
export const generatePin = (length: number = 4): string => {
  if (length < 4) throw new Error('PIN length must be at least 4');
  if (length > 12) throw new Error('PIN length must not exceed 12');
  let pin = '';
  for (let i = 0; i < length; i++) pin += secureRandomInt(0, 9).toString();
  return pin;
};
