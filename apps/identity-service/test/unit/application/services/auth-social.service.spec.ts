import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthSocialService } from '@application/services/impl/auth-social.service.js';
import { makeSocialAccountRepositoryMock, TEST_IDS, TEST_PROVIDER_GOOGLE } from '@fixtures/index.js';

describe('AuthSocialService', () => {
  let service: AuthSocialService;
  let repo: ReturnType<typeof makeSocialAccountRepositoryMock>;

  beforeEach(() => {
    repo = makeSocialAccountRepositoryMock();
    service = new AuthSocialService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthSocialService'));

  it('login() should return DTO', async () => {
    const result = await service.login({ provider: TEST_PROVIDER_GOOGLE, code: 'x', redirectUri: 'y' } as never);
    expect(result.success).toBe(true);
    expect(result.provider).toBe(TEST_PROVIDER_GOOGLE);
  });

  it('login() should throw on unsupported provider', async () => {
    await expect(service.login({ provider: 'unknown' as never, code: 'x', redirectUri: 'y' } as never))
      .rejects.toThrow();
  });

  it('listForUser() should return empty', async () => {
    repo.findByUserId.mockResolvedValue([]);
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
});
