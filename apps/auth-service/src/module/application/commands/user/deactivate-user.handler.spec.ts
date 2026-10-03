/**
 * DeactivateUserHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { DeactivateUserHandler } from './deactivate-user.handler.js';
import { DeactivateUserCommand } from './deactivate-user.command.js';

const mockService = () => ({ deactivate: jest.fn<() => Promise<unknown>>() });

describe('DeactivateUserHandler', () => {
  let handler: DeactivateUserHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new DeactivateUserHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DeactivateUserCommand');
  });

  it('should delegate deactivate', async () => {
    service.deactivate.mockResolvedValue(undefined);
    const command = new DeactivateUserCommand({ userId: 'user-1', reason: 'policy' } as never);

    await handler.execute(command);

    expect(service.deactivate).toHaveBeenCalledWith('user-1', 'policy');
  });
});
