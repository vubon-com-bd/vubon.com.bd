import { describe, it, expect, beforeEach } from '@jest/globals';
import { SocialLoginHandler } from '@application/commands/auth/social-login.handler.js';
import { SocialLoginCommand } from '@application/commands/auth/social-login.command.js';
import { makeAuthSocialServiceMock } from '@fixtures/index.js';

describe('SocialLoginHandler', () => {
  let handler: SocialLoginHandler;
  let socialService: ReturnType<typeof makeAuthSocialServiceMock>;

  beforeEach(() => {
    socialService = makeAuthSocialServiceMock();
    socialService.login.mockResolvedValue({ success: true, isNewUser: false } as never);
    handler = new SocialLoginHandler(socialService as never);
  });

  it('commandType = auth.social-login', () => {
    expect(handler.commandType).toBe('auth.social-login');
  });

  it('should delegate to service', async () => {
    const cmd = new SocialLoginCommand({ provider: 'google', code: 'x', redirectUri: 'y' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(socialService.login).toHaveBeenCalled();
  });
});
