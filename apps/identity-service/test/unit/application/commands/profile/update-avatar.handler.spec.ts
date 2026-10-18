import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateAvatarHandler } from '@application/commands/profile/update-avatar.handler.js';
import { UpdateAvatarCommand } from '@application/commands/profile/update-avatar.command.js';
import type { UserProfileServiceInterface } from '@application/services/interfaces/user-profile.service.interface.js';
import type { UserProfileResponseDTO } from '@application/dtos/responses/user-profile-response.dto.js';

describe('UpdateAvatarHandler', () => {
  let handler: UpdateAvatarHandler;
  let mockService: jest.Mocked<UserProfileServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserProfileService',
      findForUser: jest.fn(),
      upsert: jest.fn(),
    } as unknown as jest.Mocked<UserProfileServiceInterface>;
    handler = new UpdateAvatarHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.update-avatar');
  });

  it('should call service.upsert with avatarUrl', async () => {
    const userId = 'user-123';
    const avatarUrl = 'https://cdn.vubon.com.bd/avatar.jpg';
    const expected: UserProfileResponseDTO = {
      userId,
      avatarUrl,
      visibility: 'public',
      completionPercent: 30,
      updatedAt: new Date().toISOString(),
    };
    mockService.upsert.mockResolvedValue(expected);

    const command = new UpdateAvatarCommand(userId, avatarUrl);
    const result = await handler.execute(command);

    expect(mockService.upsert).toHaveBeenCalledWith(userId, { avatarUrl });
    expect(result).toEqual(expected);
  });

  it('should propagate service errors', async () => {
    mockService.upsert.mockRejectedValue(new Error('DB error'));

    const command = new UpdateAvatarCommand('user-1', 'https://x.com/a.jpg');
    await expect(handler.execute(command)).rejects.toThrow('DB error');
  });
});
