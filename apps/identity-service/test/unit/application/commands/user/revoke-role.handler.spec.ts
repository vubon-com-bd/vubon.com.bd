import { describe, it, expect, beforeEach } from '@jest/globals';
import { RevokeRoleHandler } from '@application/commands/user/revoke-role.handler.js';
import { RevokeRoleCommand } from '@application/commands/user/revoke-role.command.js';
import { makeUserRoleServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('RevokeRoleHandler', () => {
  let handler: RevokeRoleHandler;
  let service: ReturnType<typeof makeUserRoleServiceMock>;

  beforeEach(() => {
    service = makeUserRoleServiceMock();
    service.revoke.mockResolvedValue(undefined);
    handler = new RevokeRoleHandler(service as never);
  });

  it('commandType = user.revoke-role', () => { expect(handler.commandType).toBe('user.revoke-role'); });

  it('should call revoke', async () => {
    const cmd = new RevokeRoleCommand({ userId: TEST_IDS.USER_ID, role: 'admin' } as never, 'super');
    const result = await handler.execute(cmd);
    expect(result.revoked).toBe(true);
  });
});
