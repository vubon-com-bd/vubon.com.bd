/**
 * TokenPairVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenPairVO } from '@domain/value-objects/composites/token-pair.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

const VALID_TOKEN = 'a'.repeat(64);

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  accessToken: TokenValueVO.create(VALID_TOKEN),
  refreshToken: TokenValueVO.create(VALID_TOKEN),
  accessExpiry: TokenExpiryVO.fromNow(900),
  refreshExpiry: TokenExpiryVO.fromNow(7 * 24 * 3600),
  userId: UserIdVO.create(TEST_IDS.USER_ID),
  sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
  tokenType: 'Bearer' as const,
  ...overrides,
});

describe('TokenPairVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = TokenPairVO.create(makeProps());
      expect(vo.tokenType).toBe('Bearer');
      expect(vo.userId.value).toBe(TEST_IDS.USER_ID);
    });

    it('should throw if accessExpiry >= refreshExpiry', () => {
      expect(() =>
        TokenPairVO.create(
          makeProps({
            accessExpiry: TokenExpiryVO.fromNow(10000),
            refreshExpiry: TokenExpiryVO.fromNow(100),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(TokenPairVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isAccessExpired() / isRefreshExpired()', () => {
    it('both false when fresh', () => {
      const vo = TokenPairVO.create(makeProps());
      expect(vo.isAccessExpired()).toBe(false);
      expect(vo.isRefreshExpired()).toBe(false);
    });

    it('detects expired access', () => {
      const vo = TokenPairVO.create(
        makeProps({
          accessExpiry: TokenExpiryVO.fromEpochSeconds(Math.floor(Date.now() / 1000) - 100),
          refreshExpiry: TokenExpiryVO.fromNow(7 * 24 * 3600),
        }),
      );
      expect(vo.isAccessExpired()).toBe(true);
    });
  });

  describe('hasScope()', () => {
    it('should check scope', () => {
      const vo = TokenPairVO.create(makeProps({ scope: ['read', 'write'] }));
      expect(vo.hasScope('read')).toBe(true);
      expect(vo.hasScope('admin')).toBe(false);
    });

    it('should return empty when no scope', () => {
      const vo = TokenPairVO.create(makeProps());
      expect(vo.scope).toEqual([]);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = TokenPairVO.reconstitute(
        makeProps({ tokenType: 'Custom' as unknown as 'Bearer' }),
      );
      expect(vo.tokenType).toBe('Custom');
    });
  });
});
