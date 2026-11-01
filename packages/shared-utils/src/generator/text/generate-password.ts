/**
 * Generate a cryptographically secure random password
 * @module shared-utils/generator/text
 */
export interface PasswordOptions {
  readonly length?: number;
  readonly includeUppercase?: boolean;
  readonly includeLowercase?: boolean;
  readonly includeNumbers?: boolean;
  readonly includeSymbols?: boolean;
}

const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWER = 'abcdefghijkmnpqrstuvwxyz';
const NUMBERS = '23456789';
const SYMBOLS = '!@#$%^&*-_=+';

export function generatePassword(options: PasswordOptions = {}): string {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
  } = options;

  if (!Number.isInteger(length) || length < 8 || length > 128) {
    throw new RangeError('length must be an integer between 8 and 128');
  }

  let alphabet = '';
  if (includeUppercase) alphabet += UPPER;
  if (includeLowercase) alphabet += LOWER;
  if (includeNumbers) alphabet += NUMBERS;
  if (includeSymbols) alphabet += SYMBOLS;

  if (alphabet.length === 0) {
    throw new Error('At least one character set must be included');
  }

  const bytes = new Uint8Array(length * 2);
  globalThis.crypto.getRandomValues(bytes);
  let password = '';
  for (let i = 0; password.length < length && i < bytes.length; i++) {
    const idx = bytes[i] % alphabet.length;
    password += alphabet[idx];
  }
  return password.slice(0, length);
}
