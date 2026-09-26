/**
 * SsoCallbackHandler — Unit Tests
 */
import { SsoCallbackHandler } from './sso-callback.handler';
import { SsoCallbackCommand } from './sso-callback.command';

const mockSsoService = () => ({
  name: 'AuthSsoService',
  handleCallback: jest.fn(),
});

describe('SsoCallbackHandler', () => {
  let handler: SsoCallbackHandler;
  let ssoService: ReturnType<typeof mockSsoService>;

  beforeEach(() => {
    ssoService = mockSsoService();
    handler = new SsoCallbackHandler(ssoService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SsoCallbackCommand');
  });

  it('should delegate handleCallback', async () => {
    ssoService.handleCallback.mockResolvedValue({ success: true, tenantId: 'acme' });

    const command = new SsoCallbackCommand({
      provider: 'saml',
      tenantId: 'acme',
      code: 'code-1',
    } as never);

    const result = await handler.execute(command);

    expect(result.success).toBe(true);
  });
});
