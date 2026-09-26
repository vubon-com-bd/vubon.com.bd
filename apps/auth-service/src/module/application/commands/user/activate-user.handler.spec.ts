/**
 * ActivateUserHandler — Unit Tests
 */
import { ActivateUserHandler } from './activate-user.handler';
import { ActivateUserCommand } from './activate-user.command';

const mockService = () => ({ activate: jest.fn() });

describe('ActivateUserHandler', () => {
  let handler: ActivateUserHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new ActivateUserHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('ActivateUserCommand');
  });

  it('should delegate activate', async () => {
    service.activate.mockResolvedValue(undefined);
    const command = new ActivateUserCommand({ userId: 'user-1' } as never);

    await handler.execute(command);

    expect(service.activate).toHaveBeenCalledWith('user-1');
  });
});
