import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUserRolesHandler } from '@application/queries/user/list-user-roles.handler.js';
import { makeListUserRolesQuery, makeUserRoleServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListUserRolesHandler', () => {
  let handler: ListUserRolesHandler;
  let service: ReturnType<typeof makeUserRoleServiceMock>;

  beforeEach(() => {
    service = makeUserRoleServiceMock();
    handler = new ListUserRolesHandler(service as never);
  });

  it('queryType = user.list-roles', () => {
    expect(handler.queryType).toBe('user.list-roles');
  });

  it('should return empty', async () => {
    service.listForUser.mockResolvedValue([]);
    const result = await handler.execute(makeListUserRolesQuery());
    expect(result).toEqual([]);
  });
});
