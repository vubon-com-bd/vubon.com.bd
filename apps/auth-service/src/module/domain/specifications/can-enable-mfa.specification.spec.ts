/**
 * CanEnableMfaSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanEnableMfaSpecification } from './can-enable-mfa.specification';
import { UserEntity } from '../entities/user.entity';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../value-objects/primitives/mfa-status.vo';

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

const buildMfa = (enabled: boolean) =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: enabled ? MfaStatusVO.enabled() : MfaStatusVO.disabled(),
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('CanEnableMfaSpecification', () => {
  const cleanCtx = {
    now: NOW_MS,
    emailVerified: true,
    existingMfa: null,
  };

  describe('isSatisfiedBy()', () => {
    it('should return true for active verified user with no MFA', () => {
      expect(CanEnableMfaSpecification.isSatisfiedBy(buildUser(), cleanCtx)).toBe(true);
    });

    it('should return false for suspended user', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(CanEnableMfaSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false when email not verified', () => {
      expect(
        CanEnableMfaSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          emailVerified: false,
        }),
      ).toBe(false);
    });

    it('should return false when MFA already enabled', () => {
      expect(
        CanEnableMfaSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          existingMfa: buildMfa(true),
        }),
      ).toBe(false);
    });

    it('should return true when existing MFA is disabled', () => {
      expect(
        CanEnableMfaSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          existingMfa: buildMfa(false),
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('should return empty for valid', () => {
      expect(CanEnableMfaSpecification.explain(buildUser(), cleanCtx)).toEqual([]);
    });

    it('should list user_not_active', () => {
      const reasons = CanEnableMfaSpecification.explain(
        buildUser({ status: UserStatusVO.of('suspended') }),
        cleanCtx,
      );
      expect(reasons).toContain('user_not_active');
    });

    it('should list email_not_verified', () => {
      const reasons = CanEnableMfaSpecification.explain(buildUser(), {
        ...cleanCtx,
        emailVerified: false,
      });
      expect(reasons).toContain('email_not_verified');
    });

    it('should list mfa_already_enabled', () => {
      const reasons = CanEnableMfaSpecification.explain(buildUser(), {
        ...cleanCtx,
        existingMfa: buildMfa(true),
      });
      expect(reasons).toContain('mfa_already_enabled');
    });
  });
});
