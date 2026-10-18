import { describe, it, expect, beforeEach } from '@jest/globals';
import { UnlockAccountHandler } from '@application/commands/auth/unlock-account.handler.js';
import { UnlockAccountCommand } from '@application/commands/auth/unlock-account.command.js';
import { makeAuthAccountLockServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UnlockAccountHandler', () => {
  let handler: UnlockAccountHandler;
  let lockService: ReturnType<typeof makeAuthAccountLockServiceMock>;

  beforeEach(() => {
    lockService = makeAuthAccountLockServiceMock();
    lockService.unlock.mockResolvedValue(undefined);
    handler = new UnlockAccountHandler(lockService as never);
  });

  it('commandType = auth.unlock-account', () => {
    expect(handler.commandType).toBe('auth.unlock-account');
  });

  it('should call lockService.unlock', async () => {
    const cmd = new UnlockAccountCommand({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(lockService.unlock).toHaveBeenCalled();
  });
});
