/**
 * Hash a password using PBKDF2 (SHA-256)
 * @module shared-utils/security/password
 *
 * ⚠️ Never log the plain password.
 */
import { pbkdf2 } from '../../infrastructure/crypto/pbkdf2';
import { generateSalt } from './generate-salt';

export interface HashedPassword {
  readonly hash: string;
  readonly salt: string;
  readonly algorithm: 'pbkdf2-sha256';
  readonly iterations: number;
}

export async function hashPassword(
  plainPassword: string,
  iterations = 100_000
): Promise<HashedPassword> {
  if (!plainPassword || plainPassword.length < 1) {
    throw new RangeError('Password must not be empty');
  }
  const salt = generateSalt();
  const hash = await pbkdf2(plainPassword, salt, iterations, 32);
  return {
    hash,
    salt,
    algorithm: 'pbkdf2-sha256',
    iterations,
  };
}
