/**
 * Password Value Object (hashed only, never raw)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/security থেকে।
 */
import { SECURITY } from '@vubon/shared-constants/security';
import { REGEX } from '@vubon/shared-constants/common';
import type { PasswordHash } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export class PasswordVO extends BaseVO<PasswordHash> {
  private constructor(value: PasswordHash) {
    super(value);
  }

  /**
   * Validates raw password against policy BEFORE hashing.
   * Never store the result — always hash first.
   */
  static validate(raw: string): void {
    if (typeof raw !== 'string') {
      throw new Error('Password must be a string');
    }
    if (raw.length < SECURITY.PASSWORD_MIN_LENGTH) {
      throw new Error(`Password too short (min ${SECURITY.PASSWORD_MIN_LENGTH})`);
    }
    if (raw.length > SECURITY.PASSWORD_MAX_LENGTH) {
      throw new Error(`Password too long (max ${SECURITY.PASSWORD_MAX_LENGTH})`);
    }
    if (!REGEX.PASSWORD_STRONG.test(raw)) {
      throw new Error('Password must contain uppercase, lowercase, number, and symbol');
    }
  }

  static fromHash(hash: string): PasswordVO {
    if (typeof hash !== 'string' || hash.length < 20) {
      throw new Error('Invalid password hash');
    }
    return new PasswordVO(hash as PasswordHash);
  }
}
