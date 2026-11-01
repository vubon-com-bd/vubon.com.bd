/**
 * SessionEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  TEST_IDS,
  TEST_DATES,
  TEST_DURATIONS,
  makeSessionEntity,
  activeSession,
  revokedSession,
  expiredSession,
  createNewSession,
} from '@fixtures/index';

describe('SessionEntity', () => {
  describe('create()', () => {
    it('should create active session', () => {
      const s = createNewSession();
      expect(s.status.isActive()).toBe(true);
      expect(s.version).toBe(1);
    });

    it('should emit SessionCreatedEvent', () => {
      const s = createNewSession();
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.session.created')).toBe(true);
    });
  });

  describe('predicates', () => {
    it('isActive', () => {
      expect(activeSession().isActive()).toBe(true);
      expect(revokedSession().isActive()).toBe(false);
    });

    it('isExpired respects expiry', () => {
      const s = makeSessionEntity({
        expiresAtEpoch: Math.floor(Date.now() / 1000) - 3600,
      });
      expect(s.isExpired()).toBe(true);
    });

    it('canAccess combines status + expiry', () => {
      expect(activeSession().canAccess()).toBe(true);
      expect(revokedSession().canAccess()).toBe(false);
    });
  });

  describe('touchAccess()', () => {
    it('should update lastAccessedAt', () => {
      const s = activeSession();
      const before = s.lastAccessedAt;
      s.touchAccess(TEST_DATES.IN_FIVE_MINUTES);
      expect(s.lastAccessedAt).toBe(TEST_DATES.IN_FIVE_MINUTES);
      expect(s.lastAccessedAt).not.toBe(before);
    });

    it('should throw on revoked', () => {
      const s = revokedSession();
      expect(() => s.touchAccess()).toThrow(BusinessRuleError);
    });
  });

  describe('refresh()', () => {
    it('should update expiry + refreshedAt', () => {
      const s = activeSession();
      const newExpiry = SessionExpiryVO.create({
        absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EXPIRY_EPOCH,
        idleTimeoutSeconds: TEST_DURATIONS.THIRTY_MINUTES,
      });
      s.pullDomainEvents();
      s.refresh(newExpiry);
      expect(s.refreshedAt).toBeDefined();
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.session.refreshed')).toBe(true);
    });

    it('should throw on revoked', () => {
      const s = revokedSession();
      const exp = SessionExpiryVO.create({
        absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EXPIRY_EPOCH,
        idleTimeoutSeconds: TEST_DURATIONS.THIRTY_MINUTES,
      });
      expect(() => s.refresh(exp)).toThrow(BusinessRuleError);
    });
  });

  describe('expire()', () => {
    it('should transition active → expired', () => {
      const s = activeSession();
      s.pullDomainEvents();
      s.expire();
      expect(s.status.isExpired()).toBe(true);
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.session.expired')).toBe(true);
    });

    it('should be idempotent on final', () => {
      const s = revokedSession();
      s.pullDomainEvents();
      s.expire();
      expect(s.pullDomainEvents().length).toBe(0);
    });
  });

  describe('revoke()', () => {
    it('should revoke active', () => {
      const s = activeSession();
      s.pullDomainEvents();
      s.revoke('security_breach');
      expect(s.status.isRevoked()).toBe(true);
      expect(s.revokedReason).toBe('security_breach');
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.session.revoked')).toBe(true);
    });

    it('should throw when already revoked', () => {
      const s = revokedSession();
      expect(() => s.revoke('again')).toThrow(BusinessRuleError);
    });
  });

  describe('logout()', () => {
    it('should revoke + emit logout event', () => {
      const s = activeSession();
      s.pullDomainEvents();
      s.logout();
      expect(s.status.isRevoked()).toBe(true);
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.session.logout')).toBe(true);
    });
  });
});
