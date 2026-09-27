/**
 * UnlockAccountHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { UnlockAccountHandler } from './unlock-account.handler.js';
import { UnlockAccountCommand } from './unlock-account.command.js';

const mockService = () => ({
  name: 'AuthAccountLockService',
  unlock: jest.fn() as jest.Mock,
});

describe('UnlockAccountHandler', () => {
  let handler: UnlockAccountHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UnlockAccountHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UnlockAccountCommand');
  });

  it('should delegate unlock', async () => {
    service.unlock.mockResolvedValue({ userId: 'user-1' });
    const command = new UnlockAccountCommand({ userId: 'user-1' } as never);

    await handler.execute(command);

    expect(service.unlock).toHaveBeenCalledWith(command.input);
  });
});
