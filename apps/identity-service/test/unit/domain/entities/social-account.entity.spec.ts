/**
 * SocialAccountEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SocialAccountEntity } from '@domain/entities/social-account.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import {
  TEST_IDS,
  TEST_DATES,
  TEST_PROVIDER_ID,
  TEST_PROVIDER_GOOGLE,
} from '@fixtures/index';

const makeSocial = () =>
  SocialAccountEntity.create({
    id: TEST_IDS.SOCIAL_ACCOUNT_ID,
    props: {
      authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(TEST_IDS.USER_ID),
      provider: SocialProviderVO.google(),
      providerUserId: TEST_PROVIDER_ID,
      email: 'test@gmail.com',
      name: 'Test User',
    },
    now: TEST_DATES.NOW,
  });

describe('SocialAccountEntity', () => {
  describe('create()', () => {
    it('should be active by default', () => {
      const s = makeSocial();
      expect(s.isActive).toBe(true);
      expect(s.provider.value).toBe(TEST_PROVIDER_GOOGLE);
      expect(s.providerUserId).toBe(TEST_PROVIDER_ID);
    });
  });

  describe('markUsed()', () => {
    it('should update lastUsedAt', () => {
      const s = makeSocial();
      s.markUsed(TEST_DATES.IN_ONE_HOUR);
      expect(s.lastUsedAt).toBe(TEST_DATES.IN_ONE_HOUR);
    });
  });

  describe('deactivate()', () => {
    it('should set isActive false', () => {
      const s = makeSocial();
      s.deactivate();
      expect(s.isActive).toBe(false);
    });
  });
});
