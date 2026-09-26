/**
 * UnsuspendUserHandler — Unit Tests
 */
import { UnsuspendUserHandler } from './unsuspend-user.handler';
import { UnsuspendUserCommand } from './unsuspend-user.command';

const mockService = () => ({ unsuspend: jest.fn() });

describe('UnsuspendUserHandler', () => {
  let handler: UnsuspendUserHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UnsuspendUserHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UnsuspendUserCommand');
  });

  it('should delegate unsuspend', async () => {
    service.unsuspend.mockResolvedValue(undefined);
    const command = new UnsuspendUserCommand({ userId: 'user-1' } as never);

    await handler.execute(command);

    expect(service.unsuspend).toHaveBeenCalledWith('user-1');
  });
});
