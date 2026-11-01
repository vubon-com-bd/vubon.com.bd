import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthRolesHandler } from '@application/queries/auth/list-auth-roles.handler.js';
import { ListAuthRolesQuery } from '@application/queries/auth/list-auth-roles.query.js';
import { makeAuthRoleServiceMock } from '@fixtures/index.js';

describe('ListAuthRolesHandler', () => {
  let handler: ListAuthRolesHandler;
  let service: ReturnType<typeof makeAuthRoleServiceMock>;

  beforeEach(() => {
    service = makeAuthRoleServiceMock();
    handler = new ListAuthRolesHandler(service as never);
  });

  it('queryType = auth.list-roles', () => {
    expect(handler.queryType).toBe('auth.list-roles');
  });

  it('should call listAll', async () => {
    service.listAll.mockResolvedValue([]);
    const result = await handler.execute(new ListAuthRolesQuery());
    expect(result).toEqual([]);
  });
});
