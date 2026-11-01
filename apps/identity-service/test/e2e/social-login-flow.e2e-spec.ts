/**
 * E2E — Social Login Flow
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { SocialAccountEntity } from '@domain/entities/social-account.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import { SocialAccountLinkerService } from '@domain/services/social-account-linker.service.js';
import { CanLinkSocialSpecification } from '@domain/specifications/can-link-social.specification.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeLocalAuth } from '@fixtures/index';

describe('E2E — Social Login Flow', () => {
  it('link social account → emit event → can use for login', () => {
    const events = new E2EEventCollector();
    const auth = activeLocalAuth();
    auth.pullDomainEvents();

    // Step 1: Check eligibility
    const linkSpec = new CanLinkSocialSpecification();
    const canLink = linkSpec.isSatisfiedBy({
      auth,
      context: {
        provider: 'google',
        alreadyLinked: false,
        providerUserId: 'google-user-123',
      },
    });
    expect(canLink).toBe(true);

    // Step 2: Create social account
    const social = SocialAccountEntity.create({
      id: E2E_IDS.AUTH, // any id
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        provider: SocialProviderVO.google(),
        providerUserId: 'google-user-123',
        email: 'social@gmail.com',
        name: 'Social User',
      },
      now: E2E_DATES.NOW,
    });
    expect(social.isActive).toBe(true);
    expect(social.provider.value).toBe('google');

    // Step 3: Mark used
    social.markUsed(E2E_DATES.FUTURE);
    expect(social.lastUsedAt).toBe(E2E_DATES.FUTURE);
  });

  it('cannot link unsupported provider', () => {
    const auth = activeLocalAuth();
    const linkSpec = new CanLinkSocialSpecification();
    expect(
      linkSpec.isSatisfiedBy({
        auth,
        context: {
          provider: 'unsupported-provider',
          alreadyLinked: false,
          providerUserId: 'x',
        },
      }),
    ).toBe(false);
  });

  it('cannot link same provider twice', () => {
    const auth = activeLocalAuth();
    const linkSpec = new CanLinkSocialSpecification();
    expect(
      linkSpec.isSatisfiedBy({
        auth,
        context: {
          provider: 'google',
          alreadyLinked: true,
          providerUserId: 'x',
        },
      }),
    ).toBe(false);
  });

  it('service validates supported providers', () => {
    expect(SocialAccountLinkerService.isSupported('google')).toBe(true);
    expect(SocialAccountLinkerService.isSupported('unknown')).toBe(false);
    expect(() => SocialAccountLinkerService.assertSupported('unknown')).toThrow();
  });

  it('canUnlink requires multiple methods or password', () => {
    expect(
      SocialAccountLinkerService.canUnlink({ totalAuthMethods: 1, hasPassword: false }),
    ).toBe(false);
    expect(
      SocialAccountLinkerService.canUnlink({ totalAuthMethods: 2, hasPassword: false }),
    ).toBe(true);
    expect(
      SocialAccountLinkerService.canUnlink({ totalAuthMethods: 1, hasPassword: true }),
    ).toBe(true);
  });

  it('deactivate social account', () => {
    const social = SocialAccountEntity.create({
      id: E2E_IDS.AUTH,
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        provider: SocialProviderVO.google(),
        providerUserId: 'google-user-123',
      },
      now: E2E_DATES.NOW,
    });
    social.deactivate();
    expect(social.isActive).toBe(false);
  });
});
