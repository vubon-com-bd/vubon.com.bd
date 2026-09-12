/**
 * Username Generator — crypto-secure.
 * @module shared-utils/common/generator/username
 */

import { secureRandomInt } from '../helper/crypto.helper';

const sanitize = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export const generateUsername = (
  firstName: string,
  lastName: string,
  existing?: string[]
): string => {
  const first = sanitize(firstName).slice(0, 3) || 'usr';
  const last = sanitize(lastName).slice(0, 3) || '';
  const base = `${first}${last}`;

  let candidate = `${base}${secureRandomInt(100, 999)}`;
  let attempts = 0;
  while (existing?.includes(candidate) && attempts < 10) {
    candidate = `${base}${secureRandomInt(1000, 9999)}`;
    attempts++;
  }
  return candidate;
};
