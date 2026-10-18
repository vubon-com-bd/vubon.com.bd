import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthAccountLockStatusHandler } from '@application/queries/auth/get-auth-account-lock-status.handler.js';
import { GetAuthAccountLockStatusQuery } from '@application/queries/auth/get-auth-account-lock-status.query.js';
import { makeAuthAccountLockServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetAuthAccountLockStatusHandler', () => {
  let handler: GetAuthAccountLockStatusHandler;
  let service: ReturnType<typeof makeAuthAccountLockServiceMock>;

  beforeEach(() => {
    service = makeAuthAccountLockServiceMock();
    handler = new GetAuthAccountLockStatusHandler(service as never);
  });

  it('queryType = auth.get-lock-status', () => {
    expect(handler.queryType).toBe('auth.get-lock-status');
  });

  it('should return lock status', async () => {
    service.getStatus.mockResolvedValue({ userId: TEST_IDS.USER_ID, isLocked: false } as never);
    const result = await handler.execute(new GetAuthAccountLockStatusQuery(TEST_IDS.USER_ID));
    expect(result.isLocked).toBe(false);
  });
});
