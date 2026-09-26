/**
 * SsoLoginHandler — Unit Tests
 */
import { SsoLoginHandler } from './sso-login.handler';
import { SsoLoginCommand } from './sso-login.command';

const mockSsoService = () => ({
  name: 'AuthSsoService',
  initiateLogin: jest.fn(),
});

describe('SsoLoginHandler', () => {
  let handler: SsoLoginHandler;
  let ssoService: ReturnType<typeof mockSsoService>;

  beforeEach(() => {
    ssoService = mockSsoService();
    handler = new SsoLoginHandler(ssoService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SsoLoginCommand');
  });

  it('should return redirectUrl and state', async () => {
    ssoService.initiateLogin.mockResolvedValue({
      redirectUrl: 'https://saml.com/login',
      state: 'state-xyz',
    });

    const command = new SsoLoginCommand({
      provider: 'saml',
      tenantId: 'acme',
    } as never);

    const result = await handler.execute(command);

    expect(result.redirectUrl).toContain('saml');
    expect(result.state).toBe('state-xyz');
  });
});
