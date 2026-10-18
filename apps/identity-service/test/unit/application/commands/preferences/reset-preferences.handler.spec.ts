import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ResetPreferencesHandler } from '@application/commands/preferences/reset-preferences.handler.js';
import { ResetPreferencesCommand } from '@application/commands/preferences/reset-preferences.command.js';
import type { UserPreferencesServiceInterface } from '@application/services/interfaces/user-preferences.service.interface.js';
import type { UserPreferencesResponseDTO } from '@application/dtos/responses/user-preferences-response.dto.js';

describe('ResetPreferencesHandler', () => {
  let handler: ResetPreferencesHandler;
  let mockService: jest.Mocked<UserPreferencesServiceInterface>;

  const prefs: UserPreferencesResponseDTO = {
    userId: 'u-1', newsletter: false, promotions: false, orderUpdates: true,
    productRecommendations: false, securityAlerts: true,
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockService = {
      name: 'UserPreferencesService',
      findForUser: jest.fn(),
      update: jest.fn(),
      unsubscribeAll: jest.fn(),
    } as unknown as jest.Mocked<UserPreferencesServiceInterface>;
    handler = new ResetPreferencesHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.reset-preferences');
  });

  it('should unsubscribe all and return preferences for "all" scope', async () => {
    mockService.unsubscribeAll.mockResolvedValue(undefined);
    mockService.findForUser.mockResolvedValue(prefs);

    const result = await handler.execute(
      new ResetPreferencesCommand('u-1', 'all'),
    );

    expect(mockService.unsubscribeAll).toHaveBeenCalledWith('u-1');
    expect(mockService.findForUser).toHaveBeenCalledWith('u-1');
    expect(result).toEqual(prefs);
  });

  it('should unsubscribe all for "marketing" scope', async () => {
    mockService.unsubscribeAll.mockResolvedValue(undefined);
    mockService.findForUser.mockResolvedValue(prefs);

    await handler.execute(new ResetPreferencesCommand('u-1', 'marketing'));
    expect(mockService.unsubscribeAll).toHaveBeenCalledWith('u-1');
  });

  it('should NOT unsubscribe all for "promotions" scope', async () => {
    mockService.findForUser.mockResolvedValue(prefs);

    await handler.execute(new ResetPreferencesCommand('u-1', 'promotions'));
    expect(mockService.unsubscribeAll).not.toHaveBeenCalled();
    expect(mockService.findForUser).toHaveBeenCalledWith('u-1');
  });
});
