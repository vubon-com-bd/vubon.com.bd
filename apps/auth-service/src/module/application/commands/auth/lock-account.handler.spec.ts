/**
 * LockAccountHandler — Unit Tests
 */
import { LockAccountHandler } from './lock-account.handler';
import { LockAccountCommand } from './lock-account.command';

const mockService = () => ({
  name: 'AuthAccountLockService',
  lock: jest.fn(),
});

describe('LockAccountHandler', () => {
  let handler: LockAccountHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new LockAccountHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('LockAccountCommand');
  });

  it('should delegate lock', async () => {
    service.lock.mockResolvedValue({ userId: 'user-1' });
    const command = new LockAccountCommand({
      userId: 'user-1',
      reason: 'too_many_attempts',
    } as never);

    const result = await handler.execute(command);

    expect(service.lock).toHaveBeenCalledWith(command.input);
    expect(result).toBeDefined();
  });
});
