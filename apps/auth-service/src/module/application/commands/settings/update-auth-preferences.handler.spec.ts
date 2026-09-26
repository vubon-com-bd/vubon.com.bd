/**
 * UpdateAuthPreferencesHandler — Unit Tests
 */
import { UpdateAuthPreferencesHandler } from './update-auth-preferences.handler';
import { UpdateAuthPreferencesCommand } from './update-auth-preferences.command';

const mockService = () => ({ updatePreferences: jest.fn() });

describe('UpdateAuthPreferencesHandler', () => {
  let handler: UpdateAuthPreferencesHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdateAuthPreferencesHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateAuthPreferencesCommand');
  });

  it('should delegate updatePreferences', async () => {
    service.updatePreferences.mockResolvedValue(undefined);

    const command = new UpdateAuthPreferencesCommand('user-1' as never, {} as never);
    await handler.execute(command);

    expect(service.updatePreferences).toHaveBeenCalledWith('user-1', command.input);
  });
});
