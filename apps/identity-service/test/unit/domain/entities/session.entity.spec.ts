/**
 * SessionEntity — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { SessionEntity } from '../../../../src/module/domain/entities/session.entity.js';
import { SessionIdVO } from '../../../../src/module/domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '../../../../src/module/domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { SessionExpiryVO } from '../../../../src/module/domain/value-objects/primitives/session-expiry.vo.js';
import { SessionStatusVO } from '../../../../src/module/domain/value-objects/primitives/session-status.vo.js';

const UUID_1 = '11111111-1111-4111-8111-111111111111';
const UUID_2 = '22222222-2222-4222-8222-222222222222';
const UUID_3 = '33333333-3333-4333-8333-333333333333';

function buildSession(): SessionEntity {
  return SessionEntity.create({
    id: SessionIdVO.create(UUID_1),
    props: {
      authId: AuthIdVO.create(UUID_2),
      userId: UserIdVO.create(UUID_3),
      expiry: SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 86400,
        idleTimeoutSeconds: 1800,
      }),
      rememberMe: false,
    },
    now: '2026-01-01T00:00:00Z',
  });
}

describe('SessionEntity', () => {
  describe('create()', () => {
    it('creates with active status', () => {
      const s = buildSession();
      expect(s.isActive()).toBe(true);
    });

    it('emits SessionCreatedEvent', () => {
      const s = buildSession();
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'session.created')).toBe(true);
    });
  });

  describe('touchAccess()', () => {
    it('updates lastAccessedAt', () => {
      const s = buildSession();
      s.touchAccess('2026-01-02T00:00:00Z');
      expect(s.lastAccessedAt).toBe('2026-01-02T00:00:00Z');
    });

    it('throws on final session', () => {
      const s = buildSession();
      s.revoke('test');
      expect(() => s.touchAccess()).toThrow();
    });
  });

  describe('revoke()', () => {
    it('marks revoked with reason', () => {
      const s = buildSession();
      s.revoke('user_logout');
      expect(s.isFinal()).toBe(true);
      expect(s.revokedReason).toBe('user_logout');
    });

    it('throws on already revoked', () => {
      const s = buildSession();
      s.revoke('test');
      expect(() => s.revoke('again')).toThrow();
    });

    it('emits SessionRevokedEvent', () => {
      const s = buildSession();
      s.pullDomainEvents();
      s.revoke('test');
      const events = s.pullDomainEvents();
      expect(events.some((e) => e.type === 'session.revoked')).toBe(true);
    });
  });

  describe('logout()', () => {
    it('marks session revoked with logout', () => {
      const s = buildSession();
      s.logout();
      expect(s.isFinal()).toBe(true);
      expect(s.revokedReason).toBe('logout');
    });
  });

  describe('expire()', () => {
    it('transitions to expired', () => {
      const s = buildSession();
      s.expire();
      expect(s.status.isExpired()).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('does not emit events', () => {
      const s = SessionEntity.reconstitute({
        id: UUID_1,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z',
        props: {
          authId: AuthIdVO.create(UUID_2),
          userId: UserIdVO.create(UUID_3),
          status: SessionStatusVO.active(),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: 9999999999,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
          lastAccessedAt: '2026-01-01T00:00:00Z',
        },
      });
      expect(s.pullDomainEvents()).toHaveLength(0);
    });
  });
});
