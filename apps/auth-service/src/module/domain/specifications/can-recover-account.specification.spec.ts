/**
 * CanRecoverAccountSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanRecoverAccountSpecification } from './can-recover-account.specification';
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

describe('CanRecoverAccountSpecification', () => {
  const cleanCtx = {
    now: NOW_MS,
    hasRecoveryCodes: true,
    successfulChallenges: 2,
    requiredChallenges: 2,
    recoveryWindowOpen: true,
  };

  describe('isSatisfiedBy()', () => {
    it('should return true for clean recovery request', () => {
      expect(CanRecoverAccountSpecification.isSatisfiedBy(buildUser(), cleanCtx)).toBe(true);
    });

    it('should return false for deleted user', () => {
      const user = buildUser({ status: UserStatusVO.of('deleted') });
      expect(CanRecoverAccountSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false when recovery window closed', () => {
      expect(
        CanRecoverAccountSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          recoveryWindowOpen: false,
        }),
      ).toBe(false);
    });

    it('should return false without recovery codes', () => {
      expect(
        CanRecoverAccountSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          hasRecoveryCodes: false,
        }),
      ).toBe(false);
    });

    it('should return false when challenges incomplete', () => {
      expect(
        CanRecoverAccountSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          successfulChallenges: 1,
        }),
      ).toBe(false);
    });

    it('should allow suspended user (recovery is about restoring access)', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(CanRecoverAccountSpecification.isSatisfiedBy(user, cleanCtx)).toBe(true);
    });
  });

  describe('explain()', () => {
    it('should return empty for valid', () => {
      expect(CanRecoverAccountSpecification.explain(buildUser(), cleanCtx)).toEqual([]);
    });

    it('should list user_deleted', () => {
      const reasons = CanRecoverAccountSpecification.explain(
        buildUser({ status: UserStatusVO.of('deleted') }),
        cleanCtx,
      );
      expect(reasons).toContain('user_deleted');
    });

    it('should list window_closed', () => {
      const reasons = CanRecoverAccountSpecification.explain(buildUser(), {
        ...cleanCtx,
        recoveryWindowOpen: false,
      });
      expect(reasons).toContain('window_closed');
    });

    it('should list no_recovery_codes', () => {
      const reasons = CanRecoverAccountSpecification.explain(buildUser(), {
        ...cleanCtx,
        hasRecoveryCodes: false,
      });
      expect(reasons).toContain('no_recovery_codes');
    });

    it('should list challenges_incomplete with count', () => {
      const reasons = CanRecoverAccountSpecification.explain(buildUser(), {
        ...cleanCtx,
        successfulChallenges: 1,
      });
      expect(reasons.some((r) => r.startsWith('challenges_incomplete'))).toBe(true);
    });
  });
});
