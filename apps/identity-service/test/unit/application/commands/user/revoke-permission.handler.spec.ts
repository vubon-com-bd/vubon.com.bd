import { describe, it, expect, beforeEach } from '@jest/globals';
import { RevokePermissionHandler } from '@application/commands/user/revoke-permission.handler.js';
import { RevokePermissionCommand } from '@application/commands/user/revoke-permission.command.js';
import { makeUserPermissionServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('RevokePermissionHandler', () => {
  let handler: RevokePermissionHandler;
  let service: ReturnType<typeof makeUserPermissionServiceMock>;

  beforeEach(() => {
    service = makeUserPermissionServiceMock();
    service.revoke.mockResolvedValue(undefined);
    handler = new RevokePermissionHandler(service as never);
  });

  it('commandType = user.revoke-permission', () => { expect(handler.commandType).toBe('user.revoke-permission'); });

  it('should call revoke', async () => {
    const cmd = new RevokePermissionCommand({ userId: TEST_IDS.USER_ID, permission: 'auth:login' } as never, 'admin');
    const result = await handler.execute(cmd);
    expect(result.revoked).toBe(true);
  });
});
