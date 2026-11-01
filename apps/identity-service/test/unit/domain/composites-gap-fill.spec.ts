/**
 * Coverage gap-fill — Composite VOs (device, session)
 * @module identity-service/test/unit/domain
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceVO } from '@domain/value-objects/composites/device.vo.js';
import { SessionVO } from '@domain/value-objects/composites/session.vo.js';
import { activeSession, makeDeviceEntity } from '@fixtures/index.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('Composite VO Gap-Fill', () => {
  describe('DeviceVO', () => {
    it('isTrustActive() false when not trusted', () => {
      const device = makeDeviceEntity({ trusted: false });
      expect(device.isTrustActive()).toBe(false);
    });
    it('isTrustActive() true when trusted with future date', () => {
      const device = makeDeviceEntity({
        trusted: true,
        trustedUntil: new Date(Date.now() + 86400000).toISOString(),
      });
      expect(device.isTrustActive()).toBe(true);
    });
    it('isTrustActive() false when trustedUntil expired', () => {
      const device = makeDeviceEntity({
        trusted: true,
        trustedUntil: new Date(Date.now() - 86400000).toISOString(),
      });
      expect(device.isTrustActive()).toBe(false);
    });
    it('isTrustActive() false when trusted but no trustedUntil', () => {
      const device = makeDeviceEntity({ trusted: true });
      expect(device.isTrustActive()).toBe(false);
    });
  });

  describe('SessionVO', () => {
    it('isActive() reflects status', () => {
      const now = new Date().toISOString();
      const vo = SessionVO.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        status: SessionStatusVO.active(),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) + 86400,
          idleTimeoutSeconds: 1800,
        }),
        rememberMe: false,
        createdAt: now,
        lastAccessedAt: now,
      });
      expect(vo.isActive()).toBe(true);
    });

    it('isExpired() false for future expiry', () => {
      const now = new Date().toISOString();
      const vo = SessionVO.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        status: SessionStatusVO.active(),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) + 86400,
          idleTimeoutSeconds: 1800,
        }),
        rememberMe: false,
        createdAt: now,
        lastAccessedAt: now,
      });
      expect(vo.isExpired()).toBe(false);
    });

    it('isIdleExpired() false for fresh access', () => {
      const now = new Date().toISOString();
      const vo = SessionVO.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        status: SessionStatusVO.active(),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) + 86400,
          idleTimeoutSeconds: 1800,
        }),
        rememberMe: false,
        createdAt: now,
        lastAccessedAt: now,
      });
      expect(vo.isIdleExpired()).toBe(false);
    });

    it('isExpired() true for past expiry', () => {
      const now = new Date().toISOString();
      const vo = SessionVO.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        status: SessionStatusVO.active(),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) - 100,
          idleTimeoutSeconds: 1800,
        }),
        rememberMe: false,
        createdAt: now,
        lastAccessedAt: now,
      });
      expect(vo.isExpired()).toBe(true);
    });
  });
});
