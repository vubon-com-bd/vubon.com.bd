/**
 * UnlinkSocialHandler — Unit Tests
 */
import { UnlinkSocialHandler } from './unlink-social.handler';
import { UnlinkSocialCommand } from './unlink-social.command';

const mockSocialService = () => ({
  name: 'AuthSocialService',
  unlink: jest.fn(),
});

describe('UnlinkSocialHandler', () => {
  let handler: UnlinkSocialHandler;
  let socialService: ReturnType<typeof mockSocialService>;

  beforeEach(() => {
    socialService = mockSocialService();
    handler = new UnlinkSocialHandler(socialService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UnlinkSocialCommand');
  });

  it('should delegate unlink', async () => {
    socialService.unlink.mockResolvedValue(undefined);
    const command = new UnlinkSocialCommand('user-1' as never, {
      provider: 'google',
      password: 'x',
    } as never);

    await handler.execute(command);

    expect(socialService.unlink).toHaveBeenCalledWith('user-1', command.input);
  });
});
