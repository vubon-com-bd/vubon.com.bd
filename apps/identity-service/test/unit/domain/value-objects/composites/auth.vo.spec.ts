/**
 * AuthVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthVO } from '@domain/value-objects/composites/auth.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_EMAIL } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Partial<Parameters<typeof AuthVO.create>[0]> = {}) => ({
  id: AuthIdVO.create(TEST_IDS.AUTH_ID),
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
  createdAt: TEST_DATES.NOW,
  updatedAt: TEST_DATES.NOW,
  ...overrides,
});

describe('AuthVO', () => {
  describe('create()', () => {
    it('should create with valid props', () => {
      const vo = AuthVO.create(makeProps());
      expect(vo.id.value).toBe(TEST_IDS.AUTH_ID);
      expect(vo.userId.value).toBe(TEST_IDS.USER_ID);
      expect(vo.isEmailVerified).toBe(true);
    });

    it('should throw when failedAttempts negative', () => {
      expect(() => AuthVO.create(makeProps({ failedAttempts: -1 }))).toThrow(ValidationError);
    });

    it('should throw when MFA enabled but no verification', () => {
      expect(() =>
        AuthVO.create(
          makeProps({ isMfaEnabled: true, isEmailVerified: false, isPhoneVerified: false }),
        ),
      ).toThrow(ValidationError);
    });

    it('should allow MFA with email verified', () => {
      const vo = AuthVO.create(makeProps({ isMfaEnabled: true, isEmailVerified: true }));
      expect(vo.isMfaEnabled).toBe(true);
    });

    it('should freeze the object', () => {
      const vo = AuthVO.create(makeProps());
      expect(Object.isFrozen(vo)).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = AuthVO.reconstitute(makeProps({ failedAttempts: -5 }));
      expect(vo.failedAttempts).toBe(-5);
    });
  });

  describe('getters', () => {
    it('should expose all props', () => {
      const vo = AuthVO.create(makeProps());
      expect(vo.type.value).toBe('password');
      expect(vo.provider.value).toBe('local');
      expect(vo.method.value).toBe('email_password');
      expect(vo.status.value).toBe('active');
      expect(vo.identifier.isEmail()).toBe(true);
    });
  });

  describe('predicates', () => {
    it('isActive()', () => {
      expect(AuthVO.create(makeProps({ status: AuthStatusVO.active() })).isActive()).toBe(true);
    });
    it('isLocked()', () => {
      expect(
        AuthVO.create(makeProps({ status: AuthStatusVO.locked(), lockedUntil: TEST_DATES.IN_ONE_HOUR }))
          .isLocked(),
      ).toBe(true);
    });
    it('isFederated()', () => {
      expect(
        AuthVO.create(makeProps({ type: AuthTypeVO.social() })).isFederated(),
      ).toBe(true);
    });
    it('isFullyVerified()', () => {
      expect(
        AuthVO.create(makeProps({ isEmailVerified: true, isPhoneVerified: true })).isFullyVerified(),
      ).toBe(true);
    });
    it('hasAnyVerification()', () => {
      expect(
        AuthVO.create(makeProps({ isEmailVerified: true, isPhoneVerified: false })).hasAnyVerification(),
      ).toBe(true);
    });
    it('hasFailedAttempts()', () => {
      expect(AuthVO.create(makeProps({ failedAttempts: 3 })).hasFailedAttempts()).toBe(true);
      expect(AuthVO.create(makeProps({ failedAttempts: 0 })).hasFailedAttempts()).toBe(false);
    });
  });
});
