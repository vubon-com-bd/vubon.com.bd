import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UpdateBioHandler } from '@application/commands/profile/update-bio.handler.js';
import { UpdateBioCommand } from '@application/commands/profile/update-bio.command.js';
import type { UserProfileServiceInterface } from '@application/services/interfaces/user-profile.service.interface.js';
import type { UserProfileResponseDTO } from '@application/dtos/responses/user-profile-response.dto.js';

describe('UpdateBioHandler', () => {
  let handler: UpdateBioHandler;
  let mockService: jest.Mocked<UserProfileServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserProfileService',
      findForUser: jest.fn(),
      upsert: jest.fn(),
    } as unknown as jest.Mocked<UserProfileServiceInterface>;
    handler = new UpdateBioHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.update-bio');
  });

  it('should call service.upsert with bio', async () => {
    const userId = 'user-123';
    const bio = 'Software developer from Dhaka';
    const expected: UserProfileResponseDTO = {
      userId, bio, visibility: 'public', completionPercent: 25,
      updatedAt: new Date().toISOString(),
    };
    mockService.upsert.mockResolvedValue(expected);

    const result = await handler.execute(new UpdateBioCommand(userId, bio));

    expect(mockService.upsert).toHaveBeenCalledWith(userId, { bio });
    expect(result).toEqual(expected);
  });

  it('should handle empty bio', async () => {
    mockService.upsert.mockResolvedValue({} as UserProfileResponseDTO);
    await handler.execute(new UpdateBioCommand('u-1', ''));
    expect(mockService.upsert).toHaveBeenCalledWith('u-1', { bio: '' });
  });
});
