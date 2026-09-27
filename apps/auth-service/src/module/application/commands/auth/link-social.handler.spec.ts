/**
 * LinkSocialHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { LinkSocialHandler } from './link-social.handler.js';
import { LinkSocialCommand } from './link-social.command.js';

const mockSocialService = () => ({
  name: 'AuthSocialService',
  link: jest.fn() as jest.Mock,
});

describe('LinkSocialHandler', () => {
  let handler: LinkSocialHandler;
  let socialService: ReturnType<typeof mockSocialService>;

  beforeEach(() => {
    socialService = mockSocialService();
    handler = new LinkSocialHandler(socialService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('LinkSocialCommand');
  });

  it('should delegate link', async () => {
    socialService.link.mockResolvedValue(undefined);
    const command = new LinkSocialCommand('user-1' as never, {
      provider: 'google',
      accessToken: 'tok',
      providerUserId: 'g-123',
    } as never);

    await handler.execute(command);

    expect(socialService.link).toHaveBeenCalledWith('user-1', command.input);
  });
});
