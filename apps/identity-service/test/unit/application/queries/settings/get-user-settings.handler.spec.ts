import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetUserSettingsNewHandler } from '@application/queries/settings/get-user-settings.handler.js';
import { GetUserSettingsNewQuery } from '@application/queries/settings/get-user-settings.query.js';
import type { UserSettingsServiceInterface } from '@application/services/interfaces/user-settings.service.interface.js';

describe('GetUserSettingsNewHandler', () => {
  let handler: GetUserSettingsNewHandler;
  let mockService: jest.Mocked<UserSettingsServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserSettingsService',
      findForUser: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<UserSettingsServiceInterface>;
    handler = new GetUserSettingsNewHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.get-settings-v2');
  });

  it('should call service.findForUser', async () => {
    mockService.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetUserSettingsNewQuery('u-1'));
    expect(mockService.findForUser).toHaveBeenCalledWith('u-1');
    expect(result).toBeNull();
  });
});
