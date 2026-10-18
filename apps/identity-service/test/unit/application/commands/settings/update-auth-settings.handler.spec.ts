import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateAuthSettingsHandler } from '@application/commands/settings/update-auth-settings.handler.js';
import { UpdateAuthSettingsCommand } from '@application/commands/settings/update-auth-settings.command.js';
import type { AuthSettingsServiceInterface } from '@application/services/interfaces/auth-settings.service.interface.js';
import type { AuthSettingsResponseDTO } from '@application/dtos/responses/auth-settings-response.dto.js';

describe('UpdateAuthSettingsHandler', () => {
  let handler: UpdateAuthSettingsHandler;
  let mockService: jest.Mocked<AuthSettingsServiceInterface>;

  const expected: AuthSettingsResponseDTO = {
    twoFactorRequired: true,
    sessionTimeoutSeconds: 86400,
    passwordExpiryDays: 90,
    passwordHistoryCount: 5,
    loginAlertsEnabled: true,
    maxLoginAttempts: 5,
    lockoutDurationSeconds: 900,
    allowedIpRanges: [],
    mfaRequired: true,
  };

  beforeEach(() => {
    mockService = {
      name: 'AuthSettingsService',
      get: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<AuthSettingsServiceInterface>;
    handler = new UpdateAuthSettingsHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('settings.update-auth');
  });

  it('should call service.update with input', async () => {
    mockService.update.mockResolvedValue(expected);
    const input = { twoFactorRequired: true, mfaRequired: true };

    const result = await handler.execute(new UpdateAuthSettingsCommand(input));

    expect(mockService.update).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it('should pass updatedBy to the command', async () => {
    mockService.update.mockResolvedValue(expected);
    const command = new UpdateAuthSettingsCommand({}, 'admin-1');
    expect(command.updatedBy).toBe('admin-1');
  });
});
