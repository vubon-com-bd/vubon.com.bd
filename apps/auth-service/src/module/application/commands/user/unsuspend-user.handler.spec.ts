/**
 * UnsuspendUserHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { UnsuspendUserHandler } from './unsuspend-user.handler.js';
import { UnsuspendUserCommand } from './unsuspend-user.command.js';

const mockService = () => ({ unsuspend: jest.fn() as jest.Mock });

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
