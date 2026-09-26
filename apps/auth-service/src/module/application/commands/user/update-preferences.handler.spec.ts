/**
 * UpdatePreferencesHandler — Unit Tests
 */
import { UpdatePreferencesHandler } from './update-preferences.handler';
import { UpdatePreferencesCommand } from './update-preferences.command';

const mockService = () => ({ update: jest.fn(), toResponse: jest.fn() });

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

  it('should delegate', async () => {
    service.update.mockResolvedValue({ userId: 'user-1' });
    service.toResponse.mockReturnValue({ userId: 'user-1', theme: 'dark' });

    const command = new UpdatePreferencesCommand('user-1' as never, { theme: 'dark' } as never);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith('user-1', command.input);
    expect(result.theme).toBe('dark');
  });
});
