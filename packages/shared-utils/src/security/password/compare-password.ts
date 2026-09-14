/**
 * Compare plain password against stored hash (constant-time)
 * @module shared-utils/security/password
 */
import { pbkdf2 } from '../../infrastructure/crypto/pbkdf2';
import { constantTimeEqual } from '../../infrastructure/crypto/constant-time-equal';
import type { HashedPassword } from './hash-password';

export async function comparePassword(
  plainPassword: string,
  stored: HashedPassword
): Promise<boolean> {
  const computed = await pbkdf2(plainPassword, stored.salt, stored.iterations, 32);
  return constantTimeEqual(computed, stored.hash);
}
