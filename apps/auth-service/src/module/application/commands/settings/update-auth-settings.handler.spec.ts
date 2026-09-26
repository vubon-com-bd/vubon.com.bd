/**
 * UpdateAuthSettingsHandler — Unit Tests
 */
import { UpdateAuthSettingsHandler } from './update-auth-settings.handler';
import { UpdateAuthSettingsCommand } from './update-auth-settings.command';

const mockService = () => ({ updateSettings: jest.fn() });

describe('UpdateAuthSettingsHandler', () => {
  let handler: UpdateAuthSettingsHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdateAuthSettingsHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateAuthSettingsCommand');
  });

  it('should delegate updateSettings', async () => {
    service.updateSettings.mockResolvedValue({ userId: 'user-1' });

    const command = new UpdateAuthSettingsCommand('user-1' as never, {} as never);
    const result = await handler.execute(command);

    expect(service.updateSettings).toHaveBeenCalledWith('user-1', command.input);
    expect(result).toBeDefined();
  });
});
