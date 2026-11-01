/**
 * CredentialVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CredentialVO } from '@domain/value-objects/composites/credential.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const VALID_HASH = '$2b$12$' + 'a'.repeat(53);

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
  passwordHash: PasswordHashVO.create(VALID_HASH),
  passwordChangedAt: TEST_DATES.NOW,
  mustChangePassword: false,
  previousHashes: [] as readonly PasswordHashVO[],
  ...overrides,
});

describe('CredentialVO', () => {
  describe('create()', () => {
    it('should create with valid props', () => {
      const vo = CredentialVO.create(makeProps());
      expect(vo.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(vo.passwordHash.value).toBe(VALID_HASH);
      expect(vo.mustChangePassword).toBe(false);
    });

    it('should throw when previousHashes > 5', () => {
      const hashes = Array.from({ length: 6 }, () => PasswordHashVO.create(VALID_HASH));
      expect(() => CredentialVO.create(makeProps({ previousHashes: hashes }))).toThrow(
        ValidationError,
      );
    });

    it('should freeze object', () => {
      const vo = CredentialVO.create(makeProps());
      expect(Object.isFrozen(vo)).toBe(true);
    });
  });

  describe('isExpired()', () => {
    it('should return false when no expiry', () => {
      const vo = CredentialVO.create(makeProps());
      expect(vo.isExpired()).toBe(false);
    });

    it('should return true when past expiry', () => {
      const vo = CredentialVO.create(
        makeProps({ passwordExpiresAt: TEST_DATES.PAST_EXPIRY }),
      );
      expect(vo.isExpired()).toBe(true);
    });

    it('should return false for future expiry', () => {
      const vo = CredentialVO.create(
        makeProps({ passwordExpiresAt: TEST_DATES.FUTURE_EXPIRY }),
      );
      expect(vo.isExpired()).toBe(false);
    });
  });

  describe('matchesHistory()', () => {
    it('should match if in history', () => {
      const vo = CredentialVO.create(
        makeProps({ previousHashes: [PasswordHashVO.create(VALID_HASH)] }),
      );
      expect(vo.matchesHistory(VALID_HASH)).toBe(true);
    });

    it('should return false if not in history', () => {
      const vo = CredentialVO.create(makeProps());
      expect(vo.matchesHistory('other-hash')).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = CredentialVO.reconstitute(makeProps({ mustChangePassword: true }));
      expect(vo.mustChangePassword).toBe(true);
    });
  });
});
