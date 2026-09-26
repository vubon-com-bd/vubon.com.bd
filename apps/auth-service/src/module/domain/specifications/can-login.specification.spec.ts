/**
 * CanLoginSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanLoginSpecification } from './can-login.specification';
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

describe('CanLoginSpecification', () => {
  const cleanCtx = {
    now: NOW_MS,
    accountLocked: false,
    emailVerifiedRequired: false,
  };

  describe('isSatisfiedBy()', () => {
    it('should return true for active, unlocked, verified user', () => {
      expect(CanLoginSpecification.isSatisfiedBy(buildUser(), cleanCtx)).toBe(true);
    });

    it('should return false for suspended user', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(CanLoginSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false for pending user', () => {
      const user = buildUser({ status: UserStatusVO.of('pending') });
      expect(CanLoginSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false for deleted user', () => {
      const user = buildUser({ status: UserStatusVO.of('deleted') });
      expect(CanLoginSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false when account is locked', () => {
      const user = buildUser();
      expect(
        CanLoginSpecification.isSatisfiedBy(user, { ...cleanCtx, accountLocked: true }),
      ).toBe(false);
    });

    it('should return false when email verification required but not verified', () => {
      const user = buildUser({ emailVerified: false });
      expect(
        CanLoginSpecification.isSatisfiedBy(user, {
          ...cleanCtx,
          emailVerifiedRequired: true,
        }),
      ).toBe(false);
    });

    it('should return true when email verification required and verified', () => {
      const user = buildUser({ emailVerified: true });
      expect(
        CanLoginSpecification.isSatisfiedBy(user, {
          ...cleanCtx,
          emailVerifiedRequired: true,
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('should return empty reasons for valid user', () => {
      const reasons = CanLoginSpecification.explain(buildUser(), cleanCtx);
      expect(reasons).toEqual([]);
    });

    it('should return user_not_active reason for suspended', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      const reasons = CanLoginSpecification.explain(user, cleanCtx);
      expect(reasons).toContain('user_not_active');
    });

    it('should return account_locked reason', () => {
      const reasons = CanLoginSpecification.explain(
        buildUser(),
        { ...cleanCtx, accountLocked: true },
      );
      expect(reasons).toContain('account_locked');
    });

    it('should return email_not_verified reason', () => {
      const user = buildUser({ emailVerified: false });
      const reasons = CanLoginSpecification.explain(user, {
        ...cleanCtx,
        emailVerifiedRequired: true,
      });
      expect(reasons).toContain('email_not_verified');
    });

    it('should return multiple reasons', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended'), emailVerified: false });
      const reasons = CanLoginSpecification.explain(user, {
        ...cleanCtx,
        accountLocked: true,
        emailVerifiedRequired: true,
      });
      expect(reasons.length).toBeGreaterThanOrEqual(3);
    });
  });
});
