/**
 * CanResetPasswordSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanResetPasswordSpecification } from './can-reset-password.specification';
import { UserEntity } from '../entities/user.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildUser = (overrides: Partial<Parameters<typeof UserEntity.create>[0]> = {}) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('CanResetPasswordSpecification', () => {
  const cleanCtx = {
    now: NOW_MS,
    tokenValid: true,
    tokenExpired: false,
    recentlyReset: false,
  };

  describe('isSatisfiedBy()', () => {
    it('should return true for valid reset request', () => {
      expect(CanResetPasswordSpecification.isSatisfiedBy(buildUser(), cleanCtx)).toBe(true);
    });

    it('should return false when user not active', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(CanResetPasswordSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false for deleted user', () => {
      const user = buildUser({ status: UserStatusVO.of('deleted') });
      expect(CanResetPasswordSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false for invalid token', () => {
      expect(
        CanResetPasswordSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          tokenValid: false,
        }),
      ).toBe(false);
    });

    it('should return false for expired token', () => {
      expect(
        CanResetPasswordSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          tokenExpired: true,
        }),
      ).toBe(false);
    });

    it('should return false during cooldown', () => {
      expect(
        CanResetPasswordSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          recentlyReset: true,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('should return empty for valid', () => {
      expect(CanResetPasswordSpecification.explain(buildUser(), cleanCtx)).toEqual([]);
    });

    it('should list user_not_active', () => {
      const reasons = CanResetPasswordSpecification.explain(
        buildUser({ status: UserStatusVO.of('suspended') }),
        cleanCtx,
      );
      expect(reasons).toContain('user_not_active');
    });

    it('should list user_deleted', () => {
      const reasons = CanResetPasswordSpecification.explain(
        buildUser({ status: UserStatusVO.of('deleted') }),
        cleanCtx,
      );
      expect(reasons).toContain('user_deleted');
    });

    it('should list invalid_token', () => {
      const reasons = CanResetPasswordSpecification.explain(buildUser(), {
        ...cleanCtx,
        tokenValid: false,
      });
      expect(reasons).toContain('invalid_token');
    });

    it('should list token_expired', () => {
      const reasons = CanResetPasswordSpecification.explain(buildUser(), {
        ...cleanCtx,
        tokenExpired: true,
      });
      expect(reasons).toContain('token_expired');
    });

    it('should list cooldown_active', () => {
      const reasons = CanResetPasswordSpecification.explain(buildUser(), {
        ...cleanCtx,
        recentlyReset: true,
      });
      expect(reasons).toContain('cooldown_active');
    });
  });

  describe('COOLDOWN_MS', () => {
    it('should be 60_000', () => {
      expect(CanResetPasswordSpecification.COOLDOWN_MS).toBe(60_000);
    });
  });
});
