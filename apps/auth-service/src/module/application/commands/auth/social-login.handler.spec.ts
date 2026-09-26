/**
 * SocialLoginHandler — Unit Tests
 */
import { SocialLoginHandler } from './social-login.handler';
import { SocialLoginCommand } from './social-login.command';

const mockSocialService = () => ({
  name: 'AuthSocialService',
  initiateLogin: jest.fn(),
});

describe('SocialLoginHandler', () => {
  let handler: SocialLoginHandler;
  let socialService: ReturnType<typeof mockSocialService>;

  beforeEach(() => {
    socialService = mockSocialService();
    handler = new SocialLoginHandler(socialService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SocialLoginCommand');
  });

  it('should return authUrl and state', async () => {
    socialService.initiateLogin.mockResolvedValue({
      authUrl: 'https://google.com/oauth',
      state: 'state-123',
    });

    const command = new SocialLoginCommand({ provider: 'google' } as never);
    const result = await handler.execute(command);

    expect(result.authUrl).toContain('google');
    expect(result.state).toBe('state-123');
  });
});
