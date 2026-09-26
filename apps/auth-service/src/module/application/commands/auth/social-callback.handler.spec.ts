/**
 * SocialCallbackHandler — Unit Tests
 */
import { SocialCallbackHandler } from './social-callback.handler';
import { SocialCallbackCommand } from './social-callback.command';

const mockSocialService = () => ({
  name: 'AuthSocialService',
  handleCallback: jest.fn(),
});

describe('SocialCallbackHandler', () => {
  let handler: SocialCallbackHandler;
  let socialService: ReturnType<typeof mockSocialService>;

  beforeEach(() => {
    socialService = mockSocialService();
    handler = new SocialCallbackHandler(socialService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SocialCallbackCommand');
  });

  it('should delegate handleCallback', async () => {
    socialService.handleCallback.mockResolvedValue({ success: true });

    const command = new SocialCallbackCommand({
      provider: 'google',
      code: 'code-123',
      state: 'state-1',
    } as never);

    const result = await handler.execute(command);

    expect(result.success).toBe(true);
    expect(socialService.handleCallback).toHaveBeenCalledWith(command.input);
  });
});
