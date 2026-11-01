/**
 * SessionVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionVO } from '@domain/value-objects/composites/session.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_IP } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  id: SessionIdVO.create(TEST_IDS.SESSION_ID),
  authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
  userId: UserIdVO.create(TEST_IDS.USER_ID),
  status: SessionStatusVO.active(),
  expiry: SessionExpiryVO.create({
    absoluteExpiresAt: TEST_DATES.FUTURE_EXPIRY_EPOCH,
    idleTimeoutSeconds: 1800,
  }),
  ipAddress: IpAddressVO.create(TEST_IP),
  rememberMe: false,
  createdAt: TEST_DATES.NOW,
  lastAccessedAt: TEST_DATES.NOW,
  ...overrides,
});

describe('SessionVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = SessionVO.create(makeProps());
      expect(vo.id.value).toBe(TEST_IDS.SESSION_ID);
      expect(vo.isActive()).toBe(true);
    });

    it('should throw when revoked but no revokedAt', () => {
      expect(() =>
        SessionVO.create(
          makeProps({ status: SessionStatusVO.revoked() }),
        ),
      ).toThrow(ValidationError);
    });

    it('should allow revoked with revokedAt', () => {
      const vo = SessionVO.create(
        makeProps({
          status: SessionStatusVO.revoked(),
          revokedAt: TEST_DATES.NOW,
          revokedReason: 'logout',
        }),
      );
      expect(vo.revokedAt).toBeDefined();
    });

    it('should freeze', () => {
      expect(Object.isFrozen(SessionVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isExpired()', () => {
    it('should return false for future expiry', () => {
      const vo = SessionVO.create(makeProps());
      expect(vo.isExpired()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose all props', () => {
      const vo = SessionVO.create(makeProps());
      expect(vo.ipAddress?.value).toBe(TEST_IP);
      expect(vo.rememberMe).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = SessionVO.reconstitute(
        makeProps({ status: SessionStatusVO.revoked() }),
      );
      expect(vo.status.isRevoked()).toBe(true);
    });
  });
});
