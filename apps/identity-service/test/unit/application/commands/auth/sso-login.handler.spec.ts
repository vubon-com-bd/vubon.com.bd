import { describe, it, expect, beforeEach } from '@jest/globals';
import { SsoLoginHandler } from '@application/commands/auth/sso-login.handler.js';
import { SsoLoginCommand } from '@application/commands/auth/sso-login.command.js';
import { makeAuthSsoServiceMock } from '@fixtures/index.js';

describe('SsoLoginHandler', () => {
  let handler: SsoLoginHandler;
  let ssoService: ReturnType<typeof makeAuthSsoServiceMock>;

  beforeEach(() => {
    ssoService = makeAuthSsoServiceMock();
    ssoService.login.mockResolvedValue({ success: true } as never);
    handler = new SsoLoginHandler(ssoService as never);
  });

  it('commandType = auth.sso-login', () => {
    expect(handler.commandType).toBe('auth.sso-login');
  });

  it('should delegate', async () => {
    const cmd = new SsoLoginCommand({ providerId: 'saml-provider' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
  });
});
