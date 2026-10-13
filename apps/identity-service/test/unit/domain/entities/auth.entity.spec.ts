/**
 * AuthEntity — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { AuthEntity } from '../../../../src/module/domain/entities/auth.entity.js';
import { AuthIdVO } from '../../../../src/module/domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '../../../../src/module/domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '../../../../src/module/domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '../../../../src/module/domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '../../../../src/module/domain/value-objects/primitives/identifier.vo.js';
import { AuthStatusVO } from '../../../../src/module/domain/value-objects/primitives/auth-status.vo.js';

const UUID_1 = '11111111-1111-4111-8111-111111111111';
const UUID_2 = '22222222-2222-4222-8222-222222222222';

function buildAuthEntity(): AuthEntity {
  return AuthEntity.create({
    id: AuthIdVO.create(UUID_1),
    props: {
      userId: UserIdVO.create(UUID_2),
      type: AuthTypeVO.password(),
      provider: AuthProviderVO.local(),
      method: AuthMethodVO.emailPassword(),
      identifier: IdentifierVO.email('test@example.com'),
    },
    now: '2026-01-01T00:00:00Z',
  });
}

describe('AuthEntity', () => {
  describe('create()', () => {
    it('creates with pending status', () => {
      const auth = buildAuthEntity();
      expect(auth.status.isPending()).toBe(true);
      expect(auth.failedAttempts).toBe(0);
      expect(auth.isEmailVerified).toBe(false);
      expect(auth.isMfaEnabled).toBe(false);
    });

    it('emits AuthCreatedEvent', () => {
      const auth = buildAuthEntity();
      const events = auth.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0]?.type).toBe('auth.created');
    });
  });

  describe('activate()', () => {
    it('transitions pending → active', () => {
      const auth = buildAuthEntity();
      auth.activate();
      expect(auth.isActive()).toBe(true);
    });

    it('emits status change event', () => {
      const auth = buildAuthEntity();
      auth.pullDomainEvents();
      auth.activate();
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.status_changed')).toBe(true);
    });
  });

  describe('lock() / unlock()', () => {
    it('locks active account', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.lock('2026-12-31T00:00:00Z', 'too_many_attempts');
      expect(auth.isLocked()).toBe(true);
      expect(auth.lockedUntil).toBe('2026-12-31T00:00:00Z');
    });

    it('isLockedNow() true while locked', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.lock('2099-12-31T00:00:00Z', 'reason');
      expect(auth.isLockedNow()).toBe(true);
    });

    it('unlock() resets to active', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.lock('2099-12-31T00:00:00Z', 'reason');
      auth.unlock();
      expect(auth.isActive()).toBe(true);
      expect(auth.lockedUntil).toBeUndefined();
      expect(auth.failedAttempts).toBe(0);
    });
  });

  describe('revoke()', () => {
    it('transitions to revoked (terminal)', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.revoke('security_breach');
      expect(auth.isRevoked()).toBe(true);
      expect(auth.isFinal()).toBe(true);
    });

    it('throws when revoking terminal status', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.revoke('reason');
      expect(() => auth.revoke('again')).toThrow();
    });
  });

  describe('failed attempts', () => {
    it('recordFailedAttempt increments', () => {
      const auth = buildAuthEntity();
      auth.recordFailedAttempt();
      auth.recordFailedAttempt();
      expect(auth.failedAttempts).toBe(2);
    });

    it('resetFailedAttempts sets to 0', () => {
      const auth = buildAuthEntity();
      auth.recordFailedAttempt();
      auth.resetFailedAttempts();
      expect(auth.failedAttempts).toBe(0);
    });
  });

  describe('MFA', () => {
    it('enableMfa() throws without verification', () => {
      const auth = buildAuthEntity();
      auth.activate();
      expect(() => auth.enableMfa('totp')).toThrow();
    });

    it('enableMfa() works after email verification', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.markEmailVerified();
      auth.enableMfa('totp');
      expect(auth.isMfaEnabled).toBe(true);
    });

    it('disableMfa() works when enabled', () => {
      const auth = buildAuthEntity();
      auth.activate();
      auth.markEmailVerified();
      auth.enableMfa('totp');
      auth.disableMfa('totp');
      expect(auth.isMfaEnabled).toBe(false);
    });
  });

  describe('verification', () => {
    it('markEmailVerified sets flag', () => {
      const auth = buildAuthEntity();
      auth.markEmailVerified();
      expect(auth.isEmailVerified).toBe(true);
    });

    it('markPhoneVerified sets flag', () => {
      const auth = buildAuthEntity();
      auth.markPhoneVerified();
      expect(auth.isPhoneVerified).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds without emitting events', () => {
      const auth = AuthEntity.reconstitute({
        id: UUID_1,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z',
        props: {
          userId: UserIdVO.create(UUID_2),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.active(),
          identifier: IdentifierVO.email('test@example.com'),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(auth.isActive()).toBe(true);
      expect(auth.pullDomainEvents()).toHaveLength(0);
    });
  });
});
