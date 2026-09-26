/**
 * AssignPermissionHandler — Unit Tests
 */
import { AssignPermissionHandler } from './assign-permission.handler';
import { AssignPermissionCommand } from './assign-permission.command';

const mockService = () => ({ addPermission: jest.fn() });

describe('AssignPermissionHandler', () => {
  let handler: AssignPermissionHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new AssignPermissionHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('AssignPermissionCommand');
  });

  it('should delegate addPermission', async () => {
    service.addPermission.mockResolvedValue(undefined);
    const command = new AssignPermissionCommand({ roleId: 'role-1', permission: 'user:view' } as never);

    await handler.execute(command);

    expect(service.addPermission).toHaveBeenCalledWith('role-1', 'user:view');
  });
});
