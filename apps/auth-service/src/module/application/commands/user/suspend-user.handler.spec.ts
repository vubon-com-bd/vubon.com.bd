/**
 * SuspendUserHandler — Unit Tests
 */
import { SuspendUserHandler } from './suspend-user.handler';
import { SuspendUserCommand } from './suspend-user.command';

const mockService = () => ({ suspend: jest.fn() });

describe('SuspendUserHandler', () => {
  let handler: SuspendUserHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new SuspendUserHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SuspendUserCommand');
  });

  it('should delegate suspend with until', async () => {
    service.suspend.mockResolvedValue(undefined);
    const command = new SuspendUserCommand({
      userId: 'user-1',
      reason: 'fraud',
      until: '2024-12-31',
    } as never);

    await handler.execute(command);

    expect(service.suspend).toHaveBeenCalledWith('user-1', 'fraud', '2024-12-31');
  });
});
