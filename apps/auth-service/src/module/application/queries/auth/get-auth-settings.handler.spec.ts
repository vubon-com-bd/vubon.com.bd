/**
 * GetAuthSettingsHandler — Unit Tests
 */
import { GetAuthSettingsHandler } from './get-auth-settings.handler';
import { GetAuthSettingsQuery } from './get-auth-settings.query';

const mockService = () => ({ getSettings: jest.fn() });

describe('GetAuthSettingsHandler', () => {
  let handler: GetAuthSettingsHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new GetAuthSettingsHandler(service as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetAuthSettingsQuery');
  });

  it('should delegate to service', async () => {
    const mockSettings = {
      userId: 'user-1',
      sessionTimeoutMinutes: 60,
      maxConcurrentSessions: 5,
    };
    service.getSettings.mockResolvedValue(mockSettings);

    const query = new GetAuthSettingsQuery('user-1' as never);
    const result = await handler.execute(query);

    expect(service.getSettings).toHaveBeenCalledWith('user-1');
    expect(result).toEqual(mockSettings);
  });
});
