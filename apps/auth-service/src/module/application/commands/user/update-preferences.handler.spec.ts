/**
 * UpdatePreferencesHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { UpdatePreferencesHandler } from './update-preferences.handler.js';
import { UpdatePreferencesCommand } from './update-preferences.command.js';

const mockService = () => ({
  update: jest.fn<() => Promise<unknown>>(),
  toResponse: jest.fn<() => unknown>(),
});

describe('UpdatePreferencesHandler', () => {
  let handler: UpdatePreferencesHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdatePreferencesHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdatePreferencesCommand');
  });

  it('should delegate update', async () => {
    service.update.mockResolvedValue({ userId: 'user-1' });
    service.toResponse.mockReturnValue({ userId: 'user-1' });

    const command = new UpdatePreferencesCommand('user-1' as never, {} as never);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalled();
    expect(result.userId).toBe('user-1');
  });
});
