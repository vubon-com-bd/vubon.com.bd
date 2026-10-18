import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUserPermissionsHandler } from '@application/queries/user/list-user-permissions.handler.js';
import { ListUserPermissionsQuery } from '@application/queries/user/list-user-permissions.query.js';
import { makeUserPermissionServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListUserPermissionsHandler', () => {
  let handler: ListUserPermissionsHandler;
  let service: ReturnType<typeof makeUserPermissionServiceMock>;

  beforeEach(() => {
    service = makeUserPermissionServiceMock();
    handler = new ListUserPermissionsHandler(service as never);
  });

  it('queryType = user.list-permissions', () => {
    expect(handler.queryType).toBe('user.list-permissions');
  });

  it('should return empty', async () => {
    service.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListUserPermissionsQuery(TEST_IDS.USER_ID));
    expect(result).toEqual([]);
  });
});
