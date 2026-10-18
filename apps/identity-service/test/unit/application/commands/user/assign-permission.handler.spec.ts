import { describe, it, expect, beforeEach } from '@jest/globals';
import { AssignPermissionHandler } from '@application/commands/user/assign-permission.handler.js';
import { AssignPermissionCommand } from '@application/commands/user/assign-permission.command.js';
import { makeUserPermissionServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('AssignPermissionHandler', () => {
  let handler: AssignPermissionHandler;
  let service: ReturnType<typeof makeUserPermissionServiceMock>;

  beforeEach(() => {
    service = makeUserPermissionServiceMock();
    service.grant.mockResolvedValue(undefined);
    handler = new AssignPermissionHandler(service as never);
  });

  it('commandType = user.assign-permission', () => { expect(handler.commandType).toBe('user.assign-permission'); });

  it('should call grant', async () => {
    const cmd = new AssignPermissionCommand({ userId: TEST_IDS.USER_ID, permission: 'auth:login' } as never, 'admin');
    const result = await handler.execute(cmd);
    expect(result.granted).toBe(true);
  });
});
