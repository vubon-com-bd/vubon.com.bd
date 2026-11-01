import { describe, it, expect, beforeEach } from '@jest/globals';
import { AssignRoleHandler } from '@application/commands/user/assign-role.handler.js';
import { AssignRoleCommand } from '@application/commands/user/assign-role.command.js';
import { makeUserRoleServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('AssignRoleHandler', () => {
  let handler: AssignRoleHandler;
  let service: ReturnType<typeof makeUserRoleServiceMock>;

  beforeEach(() => {
    service = makeUserRoleServiceMock();
    service.assign.mockResolvedValue(undefined);
    handler = new AssignRoleHandler(service as never);
  });

  it('commandType = user.assign-role', () => { expect(handler.commandType).toBe('user.assign-role'); });

  it('should call assign', async () => {
    const cmd = new AssignRoleCommand({ userId: TEST_IDS.USER_ID, role: 'admin' } as never, 'super');
    const result = await handler.execute(cmd);
    expect(result.assigned).toBe(true);
  });
});
