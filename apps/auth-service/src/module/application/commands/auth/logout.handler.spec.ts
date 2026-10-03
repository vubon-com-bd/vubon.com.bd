/**
 * LogoutHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { LogoutHandler } from './logout.handler.js';
import { LogoutCommand } from './logout.command.js';

const mockAuthService = () => ({
  name: 'AuthService',
  logout: jest.fn<() => Promise<unknown>>(),
});

describe('LogoutHandler', () => {
  let handler: LogoutHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new LogoutHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('LogoutCommand');
  });

  it('should call authService.logout', async () => {
    authService.logout.mockResolvedValue(undefined);
    const command = new LogoutCommand({ sessionId: 'sess-1' } as never);

    await handler.execute(command);

    expect(authService.logout).toHaveBeenCalledWith(command.input);
  });

  it('should propagate errors', async () => {
    authService.logout.mockRejectedValue(new Error('Logout failed'));
    await expect(
      handler.execute(new LogoutCommand({} as never)),
    ).rejects.toThrow('Logout failed');
  });
});
