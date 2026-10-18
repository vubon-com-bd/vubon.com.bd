/**
 * TokenEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  TEST_IDS,
  TEST_DATES,
  TEST_ACCESS_TOKEN,
  makeTokenEntity,
  activeAccessToken,
  usedToken,
  revokedToken,
  expiredToken,
  createNewToken,
} from '@fixtures/index';

describe('TokenEntity', () => {
  describe('create()', () => {
    it('should create with version + issued event', () => {
      const t = createNewToken();
      expect(t.version).toBe(1);
      const events = t.pullDomainEvents();
      expect(events.some((e) => e.type === 'token.issued')).toBe(true);
    });
  });

  describe('predicates', () => {
    it('isExpired respects expiry', () => {
      expect(expiredToken().isExpired()).toBe(true);
      expect(activeAccessToken().isExpired()).toBe(false);
    });

    it('isUsed', () => {
      expect(usedToken().isUsed()).toBe(true);
      expect(activeAccessToken().isUsed()).toBe(false);
    });

    it('isRevoked', () => {
      expect(revokedToken().isRevoked()).toBe(true);
    });

    it('isUsable combines all', () => {
      expect(activeAccessToken().isUsable()).toBe(true);
      expect(usedToken().isUsable()).toBe(false);
      expect(revokedToken().isUsable()).toBe(false);
      expect(expiredToken().isUsable()).toBe(false);
    });
  });

  describe('markUsed()', () => {
    it('should set usedAt', () => {
      const t = activeAccessToken();
      t.markUsed();
      expect(t.isUsed()).toBe(true);
      expect(t.usedAt).toBeDefined();
    });

    it('should throw on already used + emit reuse event', () => {
      const t = usedToken();
      t.pullDomainEvents();
      expect(() => t.markUsed()).toThrow(BusinessRuleError);
      const events = t.pullDomainEvents();
      expect(events.some((e) => e.type === 'token.reused')).toBe(true);
    });
  });

  describe('revoke()', () => {
    it('should set revokedAt + emit event', () => {
      const t = activeAccessToken();
      t.pullDomainEvents();
      t.revoke('logout');
      expect(t.isRevoked()).toBe(true);
      expect(t.revokedReason).toBe('logout');
      const events = t.pullDomainEvents();
      expect(events.some((e) => e.type === 'token.revoked')).toBe(true);
    });

    it('should be idempotent', () => {
      const t = revokedToken();
      t.pullDomainEvents();
      t.revoke('again');
      expect(t.pullDomainEvents().length).toBe(0);
    });
  });

  describe('reconstitute()', () => {
    it('should restore with version', () => {
      const t = TokenEntity.reconstitute({
        id: TEST_IDS.TOKEN_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        version: 3,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
          type: TokenTypeVO.access(),
          value: TokenValueVO.create(TEST_ACCESS_TOKEN.repeat(3).slice(0, 64)),
          expiry: TokenExpiryVO.fromEpochSeconds(TEST_DATES.FUTURE_EXPIRY_EPOCH),
          jti: TEST_IDS.JTI,
        },
      });
      expect(t.version).toBe(3);
    });
  });
});
