/**
 * CredentialEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CredentialEntity } from '@domain/entities/credential.entity.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

const HASH_A = '$2b$12$' + 'a'.repeat(53);
const HASH_B = '$2b$12$' + 'b'.repeat(53);
const HASH_C = '$2b$12$' + 'c'.repeat(53);

describe('CredentialEntity', () => {
  describe('create()', () => {
    it('should create with no history', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      expect(c.passwordHash.value).toBe(HASH_A);
      expect(c.previousHashes.length).toBe(0);
      expect(c.mustChangePassword).toBe(false);
    });
  });

  describe('isExpired()', () => {
    it('false when no expiry', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      expect(c.isExpired()).toBe(false);
    });

    it('true when past expiry', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        passwordExpiresAt: TEST_DATES.PAST_EXPIRY,
        now: TEST_DATES.NOW,
      });
      expect(c.isExpired()).toBe(true);
    });
  });

  describe('wasUsedBefore()', () => {
    it('true for current hash', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      expect(c.wasUsedBefore(HASH_A)).toBe(true);
    });

    it('false for new hash', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      expect(c.wasUsedBefore(HASH_B)).toBe(false);
    });

    it('true when in history', () => {
      const c = CredentialEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          passwordHash: PasswordHashVO.create(HASH_B),
          passwordChangedAt: TEST_DATES.NOW,
          mustChangePassword: false,
          previousHashes: [PasswordHashVO.create(HASH_A)],
        },
      });
      expect(c.wasUsedBefore(HASH_A)).toBe(true);
    });
  });

  describe('changePassword()', () => {
    it('should update hash + push old to history', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      c.changePassword(PasswordHashVO.create(HASH_B), undefined, 5);
      expect(c.passwordHash.value).toBe(HASH_B);
      expect(c.previousHashes.length).toBe(1);
      expect(c.previousHashes[0].value).toBe(HASH_A);
    });

    it('should throw when reused', () => {
      const c = CredentialEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          passwordHash: PasswordHashVO.create(HASH_C),
          passwordChangedAt: TEST_DATES.NOW,
          mustChangePassword: false,
          previousHashes: [PasswordHashVO.create(HASH_A)],
        },
      });
      expect(() =>
        c.changePassword(PasswordHashVO.create(HASH_A), undefined, 5),
      ).toThrow(BusinessRuleError);
    });

    it('should trim history when exceeding count', () => {
      const c = CredentialEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          passwordHash: PasswordHashVO.create(HASH_A),
          passwordChangedAt: TEST_DATES.NOW,
          mustChangePassword: false,
          previousHashes: [
            PasswordHashVO.create(HASH_B),
            PasswordHashVO.create(HASH_C),
          ],
        },
      });
      // Add 2 more with count=2 to force trimming
      const NEW_HASH = '$2b$12$' + 'd'.repeat(53);
      c.changePassword(PasswordHashVO.create('$2b$12$' + 'z'.repeat(53)), undefined, 2);
      c.changePassword(PasswordHashVO.create(NEW_HASH), undefined, 2);
      expect(c.previousHashes.length).toBeLessThanOrEqual(2);
    });
  });

  describe('flagMustChange()', () => {
    it('should set mustChangePassword=true', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        now: TEST_DATES.NOW,
      });
      c.flagMustChange();
      expect(c.mustChangePassword).toBe(true);
    });

    it('changePassword clears mustChangePassword', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(HASH_A),
        mustChangePassword: true,
        now: TEST_DATES.NOW,
      });
      c.changePassword(PasswordHashVO.create(HASH_B), undefined, 5);
      expect(c.mustChangePassword).toBe(false);
    });
  });
});
