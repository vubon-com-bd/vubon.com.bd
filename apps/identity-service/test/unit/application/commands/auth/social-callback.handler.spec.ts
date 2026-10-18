import { describe, it, expect, beforeEach } from '@jest/globals';
import { SocialCallbackHandler } from '@application/commands/auth/social-callback.handler.js';
import { SocialCallbackCommand } from '@application/commands/auth/social-callback.command.js';
import { makeAuthSocialServiceMock } from '@fixtures/index.js';

describe('SocialCallbackHandler', () => {
  let handler: SocialCallbackHandler;
  let socialService: ReturnType<typeof makeAuthSocialServiceMock>;

  beforeEach(() => {
    socialService = makeAuthSocialServiceMock();
    socialService.login.mockResolvedValue({ success: true } as never);
    handler = new SocialCallbackHandler(socialService as never);
  });

  it('commandType = auth.social-callback', () => {
    expect(handler.commandType).toBe('auth.social-callback');
  });

  it('should delegate', async () => {
    const cmd = new SocialCallbackCommand({ provider: 'google', code: 'x', redirectUri: 'y' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
  });
});
