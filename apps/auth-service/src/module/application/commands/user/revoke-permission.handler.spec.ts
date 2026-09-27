/**
 * RevokePermissionHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { RevokePermissionHandler } from './revoke-permission.handler.js';
import { RevokePermissionCommand } from './revoke-permission.command.js';

const mockService = () => ({ removePermission: jest.fn() as jest.Mock });

describe('RevokePermissionHandler', () => {
  let handler: RevokePermissionHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new RevokePermissionHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RevokePermissionCommand');
  });

  it('should delegate removePermission', async () => {
    service.removePermission.mockResolvedValue(undefined);
    const command = new RevokePermissionCommand({ roleId: 'role-1', permission: 'user:view' } as never);

    await handler.execute(command);

    expect(service.removePermission).toHaveBeenCalledWith('role-1', 'user:view');
  });
});
