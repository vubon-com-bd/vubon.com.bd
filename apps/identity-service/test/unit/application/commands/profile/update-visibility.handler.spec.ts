import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateVisibilityHandler } from '@application/commands/profile/update-visibility.handler.js';
import { UpdateVisibilityCommand } from '@application/commands/profile/update-visibility.command.js';
import type { UserProfileServiceInterface } from '@application/services/interfaces/user-profile.service.interface.js';
import type { UserProfileResponseDTO } from '@application/dtos/responses/user-profile-response.dto.js';

describe('UpdateVisibilityHandler', () => {
  let handler: UpdateVisibilityHandler;
  let mockService: jest.Mocked<UserProfileServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserProfileService',
      findForUser: jest.fn(),
      upsert: jest.fn(),
    } as unknown as jest.Mocked<UserProfileServiceInterface>;
    handler = new UpdateVisibilityHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.update-visibility');
  });

  it('should call service.upsert with visibility', async () => {
    const userId = 'user-1';
    const visibility = 'private';
    const expected: UserProfileResponseDTO = {
      userId, visibility, completionPercent: 50,
      updatedAt: new Date().toISOString(),
    };
    mockService.upsert.mockResolvedValue(expected);

    const result = await handler.execute(new UpdateVisibilityCommand(userId, visibility));

    expect(mockService.upsert).toHaveBeenCalledWith(userId, { visibility });
    expect(result).toEqual(expected);
  });
});
