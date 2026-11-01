import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetPreferencesHandler } from '@application/queries/preferences/get-preferences.handler.js';
import { GetPreferencesQuery } from '@application/queries/preferences/get-preferences.query.js';
import type { UserPreferencesServiceInterface } from '@application/services/interfaces/user-preferences.service.interface.js';

describe('GetPreferencesHandler', () => {
  let handler: GetPreferencesHandler;
  let mockService: jest.Mocked<UserPreferencesServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserPreferencesService',
      findForUser: jest.fn(),
      update: jest.fn(),
      unsubscribeAll: jest.fn(),
    } as unknown as jest.Mocked<UserPreferencesServiceInterface>;
    handler = new GetPreferencesHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.get-preferences');
  });

  it('should call service.findForUser', async () => {
    mockService.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetPreferencesQuery('u-1'));
    expect(mockService.findForUser).toHaveBeenCalledWith('u-1');
    expect(result).toBeNull();
  });
});
