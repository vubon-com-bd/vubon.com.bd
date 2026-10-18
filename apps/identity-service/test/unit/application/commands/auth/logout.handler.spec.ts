import { describe, it, expect, beforeEach } from '@jest/globals';
import { LogoutHandler } from '@application/commands/auth/logout.handler.js';
import { LogoutCommand } from '@application/commands/auth/logout.command.js';
import { makeAuthSessionServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('LogoutHandler', () => {
  let handler: LogoutHandler;
  let sessionService: ReturnType<typeof makeAuthSessionServiceMock>;

  beforeEach(() => {
    sessionService = makeAuthSessionServiceMock();
    handler = new LogoutHandler(sessionService as never);
  });

  it('commandType = auth.logout', () => {
    expect(handler.commandType).toBe('auth.logout');
  });

  it('should revoke specific session', async () => {
    const cmd = new LogoutCommand({ sessionId: TEST_IDS.SESSION_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(sessionService.revoke).toHaveBeenCalledWith(TEST_IDS.SESSION_ID, 'logout');
  });

  it('should revoke all sessions if userId given and no sessionId', async () => {
    const cmd = new LogoutCommand({} as never, TEST_IDS.USER_ID);
    await handler.execute(cmd);
    expect(sessionService.revokeAllForUser).toHaveBeenCalledWith(TEST_IDS.USER_ID, 'logout');
  });
});
