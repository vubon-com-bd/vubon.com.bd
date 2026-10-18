import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthMfaSettingsHandler } from '@application/queries/auth/get-auth-mfa-settings.handler.js';
import { GetAuthMfaSettingsQuery } from '@application/queries/auth/get-auth-mfa-settings.query.js';
import { makeMfaRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('GetAuthMfaSettingsHandler', () => {
  let handler: GetAuthMfaSettingsHandler;
  let repo: ReturnType<typeof makeMfaRepositoryMock>;

  beforeEach(() => {
    repo = makeMfaRepositoryMock();
    handler = new GetAuthMfaSettingsHandler(repo as never);
  });

  it('queryType = auth.get-mfa-settings', () => {
    expect(handler.queryType).toBe('auth.get-mfa-settings');
  });

  it('should return disabled when no MFA', async () => {
    repo.findPrimaryByAuthId.mockResolvedValue(null);
    const result = await handler.execute(new GetAuthMfaSettingsQuery(TEST_IDS.AUTH_ID));
    expect(result.enabled).toBe(false);
  });

  it('should return enabled when MFA exists', async () => {
    const mfa = { isEnabledAndVerified: () => true, method: { value: 'totp' } };
    repo.findPrimaryByAuthId.mockResolvedValue(mfa as never);
    const result = await handler.execute(new GetAuthMfaSettingsQuery(TEST_IDS.AUTH_ID));
    expect(result.enabled).toBe(true);
    expect(result.primaryMethod).toBe('totp');
  });
});
