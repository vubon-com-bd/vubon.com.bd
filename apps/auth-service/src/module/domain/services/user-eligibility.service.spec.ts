/**
 * UserEligibilityService — Unit Tests
 * @module auth-service/domain/services
 */
import { UserEligibilityService } from './user-eligibility.service';
import { UserEntity } from '../entities/user.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { UserNotActiveError } from '../errors/user.errors';

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
    phoneVerified: true,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserEligibilityService', () => {
  describe('check()', () => {
    it('should return eligible for fully-qualified active user', () => {
      const result = UserEligibilityService.check(buildUser(), { now: NOW_MS });
      expect(result.eligible).toBe(true);
      expect(result.reasons).toHaveLength(0);
    });

    it('should return ineligible for suspended user', () => {
      const result = UserEligibilityService.check(
        buildUser({ status: UserStatusVO.of('suspended') }),
        { now: NOW_MS },
      );
      expect(result.eligible).toBe(false);
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it('should return ineligible when email not verified (if required)', () => {
      const result = UserEligibilityService.check(
        buildUser({ emailVerified: false }),
        { now: NOW_MS, requireEmailVerified: true },
      );
      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain('email_not_verified');
    });

    it('should return ineligible when phone not verified (if required)', () => {
      const result = UserEligibilityService.check(
        buildUser({ phoneVerified: false }),
        { now: NOW_MS, requirePhoneVerified: true },
      );
      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain('phone_not_verified');
    });

    it('should collect multiple reasons', () => {
      const result = UserEligibilityService.check(
        buildUser({ emailVerified: false, phoneVerified: false }),
        { now: NOW_MS, requireEmailVerified: true, requirePhoneVerified: true },
      );
      expect(result.reasons).toHaveLength(2);
    });

    it('should NOT require verifications by default', () => {
      const result = UserEligibilityService.check(
        buildUser({ emailVerified: false, phoneVerified: false }),
        { now: NOW_MS },
      );
      expect(result.eligible).toBe(true);
    });
  });

  describe('assertEligible()', () => {
    it('should not throw for eligible user', () => {
      expect(() =>
        UserEligibilityService.assertEligible(buildUser(), { now: NOW_MS }),
      ).not.toThrow();
    });

    it('should throw UserNotActiveError for suspended user', () => {
      expect(() =>
        UserEligibilityService.assertEligible(
          buildUser({ status: UserStatusVO.of('suspended') }),
          { now: NOW_MS },
        ),
      ).toThrow(UserNotActiveError);
    });

    it('should throw for unverified email when required', () => {
      expect(() =>
        UserEligibilityService.assertEligible(
          buildUser({ emailVerified: false }),
          { now: NOW_MS, requireEmailVerified: true },
        ),
      ).toThrow(UserNotActiveError);
    });
  });

  describe('canLogin()', () => {
    it('should return true for active verified user', () => {
      expect(UserEligibilityService.canLogin(buildUser())).toBe(true);
    });

    it('should return false for suspended user', () => {
      expect(
        UserEligibilityService.canLogin(buildUser({ status: UserStatusVO.of('suspended') })),
      ).toBe(false);
    });

    it('should return false for pending user', () => {
      expect(
        UserEligibilityService.canLogin(buildUser({ status: UserStatusVO.of('pending') })),
      ).toBe(false);
    });

    it('should return false for deleted user', () => {
      expect(
        UserEligibilityService.canLogin(buildUser({ status: UserStatusVO.of('deleted') })),
      ).toBe(false);
    });
  });
});
