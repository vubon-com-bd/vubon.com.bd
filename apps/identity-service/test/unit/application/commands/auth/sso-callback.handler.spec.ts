import { describe, it, expect, beforeEach } from '@jest/globals';
import { SsoCallbackHandler } from '@application/commands/auth/sso-callback.handler.js';
import { SsoCallbackCommand } from '@application/commands/auth/sso-callback.command.js';
import { makeAuthSsoServiceMock } from '@fixtures/index.js';

describe('SsoCallbackHandler', () => {
  let handler: SsoCallbackHandler;
  let ssoService: ReturnType<typeof makeAuthSsoServiceMock>;

  beforeEach(() => {
    ssoService = makeAuthSsoServiceMock();
    ssoService.login.mockResolvedValue({ success: true } as never);
    handler = new SsoCallbackHandler(ssoService as never);
  });

  it('commandType = auth.sso-callback', () => {
    expect(handler.commandType).toBe('auth.sso-callback');
  });

  it('should delegate', async () => {
    const cmd = new SsoCallbackCommand({ providerId: 'saml' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
  });
});
