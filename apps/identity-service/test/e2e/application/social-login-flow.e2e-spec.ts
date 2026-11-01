/**
 * E2E — Social Login Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SocialLoginHandler } from '@application/commands/auth/social-login.handler.js';
import { SocialLoginCommand } from '@application/commands/auth/social-login.command.js';
import { LinkSocialHandler } from '@application/commands/auth/link-social.handler.js';
import { LinkSocialCommand } from '@application/commands/auth/link-social.command.js';
import { makeAuthSocialServiceMock, TEST_IDS, TEST_PROVIDER_GOOGLE } from '@fixtures/index.js';

describe('E2E — Social Login Flow', () => {
  let socialService: ReturnType<typeof makeAuthSocialServiceMock>;
  let loginHandler: SocialLoginHandler;
  let linkHandler: LinkSocialHandler;

  beforeEach(() => {
    socialService = makeAuthSocialServiceMock();
    socialService.login.mockResolvedValue({
      success: true, isNewUser: false, provider: TEST_PROVIDER_GOOGLE,
    } as never);
    loginHandler = new SocialLoginHandler(socialService as never);
    linkHandler = new LinkSocialHandler(socialService as never);
  });

  it('happy path: social login returns session', async () => {
    const cmd = new SocialLoginCommand({
      provider: TEST_PROVIDER_GOOGLE, code: 'x', redirectUri: 'https://x.com/cb',
    } as never);
    const result = await loginHandler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.provider).toBe(TEST_PROVIDER_GOOGLE);
  });

  it('link social account to existing user', async () => {
    const cmd = new LinkSocialCommand(TEST_IDS.AUTH_ID, {
      provider: TEST_PROVIDER_GOOGLE, code: 'x', redirectUri: 'https://x.com/cb',
    } as never);
    const result = await linkHandler.execute(cmd);
    expect(result.linked).toBe(true);
  });
});
