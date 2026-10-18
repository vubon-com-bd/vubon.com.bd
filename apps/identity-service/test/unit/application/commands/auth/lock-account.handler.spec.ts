import { describe, it, expect, beforeEach } from '@jest/globals';
import { LockAccountHandler } from '@application/commands/auth/lock-account.handler.js';
import { LockAccountCommand } from '@application/commands/auth/lock-account.command.js';
import { makeAuthAccountLockServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('LockAccountHandler', () => {
  let handler: LockAccountHandler;
  let lockService: ReturnType<typeof makeAuthAccountLockServiceMock>;

  beforeEach(() => {
    lockService = makeAuthAccountLockServiceMock();
    lockService.lock.mockResolvedValue({ userId: TEST_IDS.USER_ID, isLocked: true } as never);
    handler = new LockAccountHandler(lockService as never);
  });

  it('commandType = auth.lock-account', () => {
    expect(handler.commandType).toBe('auth.lock-account');
  });

  it('should call lockService.lock', async () => {
    const cmd = new LockAccountCommand({
      userId: TEST_IDS.USER_ID, reason: 'manual_admin', durationSeconds: 3600,
    } as never);
    const result = await handler.execute(cmd);
    expect(result.isLocked).toBe(true);
  });
});
