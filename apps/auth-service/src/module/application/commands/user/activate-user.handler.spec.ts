/**
 * ActivateUserHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { ActivateUserHandler } from './activate-user.handler.js';
import { ActivateUserCommand } from './activate-user.command.js';

const mockService = () => ({ activate: jest.fn<() => Promise<unknown>>() });

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
