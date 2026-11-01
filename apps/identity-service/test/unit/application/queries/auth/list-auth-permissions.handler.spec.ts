import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthPermissionsHandler } from '@application/queries/auth/list-auth-permissions.handler.js';
import { ListAuthPermissionsQuery } from '@application/queries/auth/list-auth-permissions.query.js';
import { makeAuthPermissionServiceMock } from '@fixtures/index.js';

describe('ListAuthPermissionsHandler', () => {
  let handler: ListAuthPermissionsHandler;
  let service: ReturnType<typeof makeAuthPermissionServiceMock>;

  beforeEach(() => {
    service = makeAuthPermissionServiceMock();
    handler = new ListAuthPermissionsHandler(service as never);
  });

  it('queryType = auth.list-permissions', () => {
    expect(handler.queryType).toBe('auth.list-permissions');
  });

  it('should call listAll', async () => {
    service.listAll.mockResolvedValue([]);
    const result = await handler.execute(new ListAuthPermissionsQuery());
    expect(result).toEqual([]);
    expect(service.listAll).toHaveBeenCalled();
  });
});
