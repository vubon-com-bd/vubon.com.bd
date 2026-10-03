import { hashPassword as sharedHash } from '@vubon/shared-utils/security/password';
import type { HashedPassword } from '@vubon/shared-utils/security/password';
import { pbkdf2 } from '@vubon/shared-utils/infrastructure/crypto/pbkdf2';
import { WeakPasswordError } from '../../common/password/password.errors';
import { safeCompare } from '../../common/password/password.utils';
import { validatePassword } from '../../common/password/password.validator';
import { isBlacklistedPassword } from './password-blacklist';
import { getPasswordPolicy } from './password-policy';
import type { PasswordServiceContract } from './password.service.interface';

/**
 * Server-side password service.
 * ⚠️ SERVER-ONLY. Uses PBKDF2-SHA256 (matches shared-utils).
 */
export class PasswordService implements PasswordServiceContract {
  async hash(plain: string): Promise<HashedPassword> {
    const policy = getPasswordPolicy();
    const validation = validatePassword(plain, policy);
    if (!validation.valid) throw new WeakPasswordError(validation.issues);
    if (isBlacklistedPassword(plain)) {
      throw new WeakPasswordError(['blacklisted']);
    }
    return sharedHash(plain);
  }

  async verify(plain: string, stored: HashedPassword): Promise<boolean> {
    const computed = await pbkdf2(plain, stored.salt, stored.iterations, 32);
    return safeCompare(computed, stored.hash);
  }
}

export const passwordService = new PasswordService();
