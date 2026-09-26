/**
 * AssignRoleHandler — Unit Tests
 */
import { AssignRoleHandler } from './assign-role.handler';
import { AssignRoleCommand } from './assign-role.command';

const mockService = () => ({ assign: jest.fn() });

describe('AssignRoleHandler', () => {
  let handler: AssignRoleHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new AssignRoleHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('AssignRoleCommand');
  });

  it('should delegate assign', async () => {
    service.assign.mockResolvedValue(undefined);
    const command = new AssignRoleCommand({ userId: 'user-1', role: 'admin' } as never);

    await handler.execute(command);

    expect(service.assign).toHaveBeenCalledWith('user-1', 'admin');
  });
});
