/**
 * CanLinkSocialSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanLinkSocialSpecification } from './can-link-social.specification';
import { UserEntity } from '../entities/user.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';

const NOW = '2024-01-01T00:00:00.000Z';

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

describe('CanLinkSocialSpecification', () => {
  const cleanCtx = {
    provider: SocialProviderVO.of('google'),
    alreadyLinkedForUser: false,
    alreadyLinkedToAnotherUser: false,
    providerAllowed: true,
  };

  describe('isSatisfiedBy()', () => {
    it('should return true for clean link request', () => {
      expect(CanLinkSocialSpecification.isSatisfiedBy(buildUser(), cleanCtx)).toBe(true);
    });

    it('should return false for suspended user', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(CanLinkSocialSpecification.isSatisfiedBy(user, cleanCtx)).toBe(false);
    });

    it('should return false when provider not allowed', () => {
      expect(
        CanLinkSocialSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          providerAllowed: false,
        }),
      ).toBe(false);
    });

    it('should return false when already linked for user', () => {
      expect(
        CanLinkSocialSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          alreadyLinkedForUser: true,
        }),
      ).toBe(false);
    });

    it('should return false when linked to another user', () => {
      expect(
        CanLinkSocialSpecification.isSatisfiedBy(buildUser(), {
          ...cleanCtx,
          alreadyLinkedToAnotherUser: true,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('should return empty for valid', () => {
      expect(CanLinkSocialSpecification.explain(buildUser(), cleanCtx)).toEqual([]);
    });

    it('should list user_not_active', () => {
      const reasons = CanLinkSocialSpecification.explain(
        buildUser({ status: UserStatusVO.of('suspended') }),
        cleanCtx,
      );
      expect(reasons).toContain('user_not_active');
    });

    it('should list provider_not_allowed', () => {
      const reasons = CanLinkSocialSpecification.explain(buildUser(), {
        ...cleanCtx,
        providerAllowed: false,
      });
      expect(reasons).toContain('provider_not_allowed');
    });

    it('should list already_linked_to_user', () => {
      const reasons = CanLinkSocialSpecification.explain(buildUser(), {
        ...cleanCtx,
        alreadyLinkedForUser: true,
      });
      expect(reasons).toContain('already_linked_to_user');
    });

    it('should list linked_to_another_user', () => {
      const reasons = CanLinkSocialSpecification.explain(buildUser(), {
        ...cleanCtx,
        alreadyLinkedToAnotherUser: true,
      });
      expect(reasons).toContain('linked_to_another_user');
    });
  });
});
