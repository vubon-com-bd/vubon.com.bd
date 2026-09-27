/**
 * UpdateSettingsHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { UpdateSettingsHandler } from './update-settings.handler.js';
import { UpdateSettingsCommand } from './update-settings.command.js';

const mockService = () => ({
  update: jest.fn<() => Promise<unknown>>(),
  toResponse: jest.fn<() => unknown>(),
});

describe('UpdateSettingsHandler', () => {
  let handler: UpdateSettingsHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdateSettingsHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateSettingsCommand');
  });

  it('should delegate', async () => {
    service.update.mockResolvedValue({ userId: 'user-1' });
    service.toResponse.mockReturnValue({ userId: 'user-1' });

    const command = new UpdateSettingsCommand('user-1' as never, { emailNotifications: false } as never);
    const result = await handler.execute(command);

    expect(result).toBeDefined();
    expect(service.update).toHaveBeenCalledWith('user-1', command.input);
  });
});
