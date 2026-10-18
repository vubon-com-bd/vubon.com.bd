/**
 * AuthEntity unit tests — Aggregate root
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  TEST_IDS,
  TEST_EMAIL,
  TEST_IP,
  TEST_DATES,
  makeAuthEntity,
  activeLocalAuth,
  pendingAuth,
  lockedAuth,
  mfaEnabledAuth,
  revokedAuth,
  createNewAuth,
} from '@fixtures/index';

describe('AuthEntity', () => {
  // ═══════════════ create() ═══════════════
  describe('create()', () => {
    it('should create with pending status', () => {
      const auth = createNewAuth();
      expect(auth.status.isPending()).toBe(true);
      expect(auth.failedAttempts).toBe(0);
      expect(auth.isEmailVerified).toBe(false);
      expect(auth.isMfaEnabled).toBe(false);
    });

    it('should emit AuthCreatedEvent', () => {
      const auth = createNewAuth();
      const events = auth.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('auth.created');
      expect(events[0].aggregateId).toBe(TEST_IDS.AUTH_ID);
    });

    it('should increment version after create', () => {
      const auth = createNewAuth();
      expect(auth.version).toBe(1);
    });

    it('should expose toIdVO', () => {
      const auth = createNewAuth();
      expect(auth.toIdVO.value).toBe(TEST_IDS.AUTH_ID);
    });
  });

  // ═══════════════ reconstitute() ═══════════════
  describe('reconstitute()', () => {
    it('should rebuild without events', () => {
      const auth = makeAuthEntity({ status: 'active' });
      expect(auth.status.value).toBe('active');
      expect(auth.domainEvents.length).toBe(0);
    });

    it('should respect version', () => {
      const auth = AuthEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        version: 5,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.active(),
          identifier: IdentifierVO.email(TEST_EMAIL),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(auth.version).toBe(5);
    });
  });

  // ═══════════════ Invariants ═══════════════
  describe('invariants', () => {
    it('should reject negative failedAttempts', () => {
      expect(() =>
        AuthEntity.reconstitute({
          id: TEST_IDS.AUTH_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            type: AuthTypeVO.password(),
            provider: AuthProviderVO.local(),
            method: AuthMethodVO.emailPassword(),
            status: AuthStatusVO.active(),
            identifier: IdentifierVO.email(TEST_EMAIL),
            isEmailVerified: true,
            isPhoneVerified: false,
            isMfaEnabled: false,
            failedAttempts: -1,
          },
        }),
      ).toThrow(ValidationError);
    });

    it('should reject locked status without lockedUntil', () => {
      expect(() =>
        AuthEntity.reconstitute({
          id: TEST_IDS.AUTH_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            type: AuthTypeVO.password(),
            provider: AuthProviderVO.local(),
            method: AuthMethodVO.emailPassword(),
            status: AuthStatusVO.locked(),
            identifier: IdentifierVO.email(TEST_EMAIL),
            isEmailVerified: true,
            isPhoneVerified: false,
            isMfaEnabled: false,
            failedAttempts: 5,
          },
        }),
      ).toThrow(ValidationError);
    });

    it('should reject MFA enabled without verification', () => {
      expect(() =>
        AuthEntity.reconstitute({
          id: TEST_IDS.AUTH_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            userId: UserIdVO.create(TEST_IDS.USER_ID),
            type: AuthTypeVO.password(),
            provider: AuthProviderVO.local(),
            method: AuthMethodVO.emailPassword(),
            status: AuthStatusVO.active(),
            identifier: IdentifierVO.email(TEST_EMAIL),
            isEmailVerified: false,
            isPhoneVerified: false,
            isMfaEnabled: true,
            failedAttempts: 0,
          },
        }),
      ).toThrow(ValidationError);
    });
  });

  // ═══════════════ Predicates ═══════════════
  describe('predicates', () => {
    it('isActive/isPending/isLocked/etc', () => {
      expect(activeLocalAuth().isActive()).toBe(true);
      expect(pendingAuth().isPending()).toBe(true);
      expect(lockedAuth().isLocked()).toBe(true);
      expect(revokedAuth().isRevoked()).toBe(true);
    });

    it('isFinal for revoked/expired', () => {
      expect(revokedAuth().isFinal()).toBe(true);
      expect(activeLocalAuth().isFinal()).toBe(false);
    });

    it('isFederated for social/oauth/sso', () => {
      const auth = makeAuthEntity({ type: 'social' });
      expect(auth.isFederated()).toBe(true);
    });

    it('canLogin for active + not locked', () => {
      expect(activeLocalAuth().canLogin()).toBe(true);
      expect(pendingAuth().canLogin()).toBe(false);
    });

    it('isLockedNow respects lockedUntil', () => {
      const locked = lockedAuth();
      expect(locked.isLockedNow()).toBe(true);
    });
  });

  // ═══════════════ Transitions ═══════════════
  describe('activate()', () => {
    it('should transition pending → active', () => {
      const auth = pendingAuth();
      auth.activate();
      expect(auth.status.isActive()).toBe(true);
    });

    it('should emit status change event', () => {
      const auth = pendingAuth();
      auth.pullDomainEvents();
      auth.activate();
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.status_changed')).toBe(true);
    });

    it('should throw on revoked → active', () => {
      const auth = revokedAuth();
      expect(() => auth.activate()).toThrow(BusinessRuleError);
    });

    it('should throw on expired → active', () => {
      const auth = makeAuthEntity({ status: 'expired' });
      expect(() => auth.activate()).toThrow(BusinessRuleError);
    });
  });

  describe('deactivate()', () => {
    it('should transition active → inactive', () => {
      const auth = activeLocalAuth();
      auth.deactivate();
      expect(auth.status.isInactive()).toBe(true);
    });

    it('should throw on revoked → inactive', () => {
      const auth = revokedAuth();
      expect(() => auth.deactivate()).toThrow(BusinessRuleError);
    });
  });

  describe('lock() / unlock()', () => {
    it('should lock active auth', () => {
      const auth = activeLocalAuth();
      auth.lock(TEST_DATES.IN_ONE_HOUR, 'too_many_attempts');
      expect(auth.status.isLocked()).toBe(true);
      expect(auth.lockedUntil).toBe(TEST_DATES.IN_ONE_HOUR);
    });

    it('should unlock locked auth and reset failedAttempts', () => {
      const auth = lockedAuth();
      expect(auth.failedAttempts).toBe(5);
      auth.unlock();
      expect(auth.status.isActive()).toBe(true);
      expect(auth.failedAttempts).toBe(0);
      expect(auth.lockedUntil).toBeUndefined();
    });

    it('should throw unlock on non-locked auth', () => {
      const auth = activeLocalAuth();
      expect(() => auth.unlock()).toThrow(BusinessRuleError);
    });
  });

  describe('revoke()', () => {
    it('should revoke active', () => {
      const auth = activeLocalAuth();
      auth.revoke('admin_action');
      expect(auth.status.isRevoked()).toBe(true);
      expect(auth.revokedReason).toBe('admin_action');
      expect(auth.revokedAt).toBeDefined();
    });

    it('should throw on revoked (final)', () => {
      const auth = revokedAuth();
      expect(() => auth.revoke('again')).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ Verification ═══════════════
  describe('markEmailVerified()', () => {
    it('should set isEmailVerified', () => {
      const auth = makeAuthEntity({ isEmailVerified: false });
      auth.markEmailVerified();
      expect(auth.isEmailVerified).toBe(true);
    });

    it('should emit event', () => {
      const auth = makeAuthEntity({ isEmailVerified: false });
      auth.pullDomainEvents();
      auth.markEmailVerified();
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.email_verified')).toBe(true);
    });

    it('should be idempotent', () => {
      const auth = makeAuthEntity({ isEmailVerified: true });
      auth.pullDomainEvents();
      auth.markEmailVerified();
      expect(auth.pullDomainEvents().length).toBe(0);
    });
  });

  describe('markPhoneVerified()', () => {
    it('should set isPhoneVerified + emit event', () => {
      const auth = makeAuthEntity({ isPhoneVerified: false });
      auth.pullDomainEvents();
      auth.markPhoneVerified();
      expect(auth.isPhoneVerified).toBe(true);
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.phone_verified')).toBe(true);
    });
  });

  // ═══════════════ MFA ═══════════════
  describe('enableMfa() / disableMfa()', () => {
    it('should enable when verified', () => {
      const auth = makeAuthEntity({ isEmailVerified: true, isMfaEnabled: false });
      auth.pullDomainEvents();
      auth.enableMfa('totp');
      expect(auth.isMfaEnabled).toBe(true);
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.mfa_enabled')).toBe(true);
    });

    it('should throw when no verification', () => {
      const auth = makeAuthEntity({ isEmailVerified: false, isPhoneVerified: false });
      expect(() => auth.enableMfa('totp')).toThrow(BusinessRuleError);
    });

    it('should throw when already enabled', () => {
      const auth = mfaEnabledAuth();
      expect(() => auth.enableMfa('totp')).toThrow(BusinessRuleError);
    });

    it('should disable when enabled', () => {
      const auth = mfaEnabledAuth();
      auth.pullDomainEvents();
      auth.disableMfa('totp');
      expect(auth.isMfaEnabled).toBe(false);
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.mfa_disabled')).toBe(true);
    });

    it('should throw disable when not enabled', () => {
      const auth = activeLocalAuth();
      expect(() => auth.disableMfa('totp')).toThrow(BusinessRuleError);
    });
  });

  // ═══════════════ Login attempts ═══════════════
  describe('recordFailedAttempt() / resetFailedAttempts()', () => {
    it('should increment failedAttempts', () => {
      const auth = activeLocalAuth();
      auth.recordFailedAttempt();
      auth.recordFailedAttempt();
      expect(auth.failedAttempts).toBe(2);
    });

    it('should reset to zero', () => {
      const auth = makeAuthEntity({ failedAttempts: 5 });
      auth.resetFailedAttempts();
      expect(auth.failedAttempts).toBe(0);
    });
  });

  describe('recordLogin()', () => {
    it('should update lastLogin + reset failures', () => {
      const auth = makeAuthEntity({ failedAttempts: 3 });
      auth.recordLogin(IpAddressVO.create(TEST_IP));
      expect(auth.lastLoginAt).toBeDefined();
      expect(auth.lastLoginIp).toBe(TEST_IP);
      expect(auth.failedAttempts).toBe(0);
    });
  });

  // ═══════════════ changePassword ═══════════════
  describe('changePassword()', () => {
    it('should emit event', () => {
      const auth = activeLocalAuth();
      auth.pullDomainEvents();
      auth.changePassword(TEST_IDS.USER_ID);
      const events = auth.pullDomainEvents();
      expect(events.some((e) => e.type === 'auth.password_changed')).toBe(true);
    });
  });

  // ═══════════════ Events clearing ═══════════════
  describe('pullDomainEvents()', () => {
    it('should clear after pull', () => {
      const auth = createNewAuth();
      const first = auth.pullDomainEvents();
      expect(first.length).toBe(1);
      const second = auth.pullDomainEvents();
      expect(second.length).toBe(0);
    });
  });
});
