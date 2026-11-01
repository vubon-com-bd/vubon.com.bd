import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthSsoService } from '@application/services/impl/auth-sso.service.js';
import { makeSsoConfigRepositoryMock } from '@fixtures/index.js';

describe('AuthSsoService', () => {
  let service: AuthSsoService;
  let repo: ReturnType<typeof makeSsoConfigRepositoryMock>;

  beforeEach(() => {
    repo = makeSsoConfigRepositoryMock();
    service = new AuthSsoService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthSsoService'));

  it('login() should return DTO', async () => {
    const result = await service.login({ providerId: 'saml-provider' } as never);
    expect(result.success).toBe(true);
  });

  it('logout() should not throw', async () => {
    await expect(service.logout('session-1')).resolves.not.toThrow();
  });
});
