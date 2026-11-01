import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthOAuthService } from '@application/services/impl/auth-oauth.service.js';
import { makeOAuthClientRepositoryMock } from '@fixtures/index.js';

describe('AuthOAuthService', () => {
  let service: AuthOAuthService;
  let repo: ReturnType<typeof makeOAuthClientRepositoryMock>;

  beforeEach(() => {
    repo = makeOAuthClientRepositoryMock();
    service = new AuthOAuthService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthOAuthService'));

  it('authorize() should return code + state', async () => {
    const result = await service.authorize({
      responseType: 'code', clientId: 'c1', redirectUri: 'https://x.com/cb',
      scope: ['read'], state: 'state-1234567',
    } as never);
    expect(result.code).toBeDefined();
  });

  it('issueToken() should return access token', async () => {
    const result = await service.issueToken({ grantType: 'authorization_code', clientId: 'c1', code: 'x' } as never);
    expect(result.accessToken).toBeDefined();
    expect(result.tokenType).toBe('Bearer');
  });
});
