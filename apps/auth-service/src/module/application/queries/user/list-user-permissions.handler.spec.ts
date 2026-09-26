/**
 * ListUserPermissionsHandler — Unit Tests
 */
import { ListUserPermissionsHandler } from './list-user-permissions.handler';
import { ListUserPermissionsQuery } from './list-user-permissions.query';

const mockService = () => ({ effectivePermissions: jest.fn() });

describe('ListUserPermissionsHandler', () => {
  let handler: ListUserPermissionsHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new ListUserPermissionsHandler(service as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUserPermissionsQuery');
  });

  it('should delegate to service', async () => {
    const mockPerms = {
      permissions: ['user:view', 'user:create'],
      roles: ['admin'],
      isSuperAdmin: false,
    };
    service.effectivePermissions.mockResolvedValue(mockPerms);

    const query = new ListUserPermissionsQuery('user-1' as never);
    const result = await handler.execute(query);

    expect(service.effectivePermissions).toHaveBeenCalledWith('user-1');
    expect(result.permissions).toHaveLength(2);
  });
});
