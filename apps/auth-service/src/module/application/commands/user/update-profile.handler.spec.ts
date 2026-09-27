/**
 * UpdateProfileHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { UpdateProfileHandler } from './update-profile.handler.js';
import { UpdateProfileCommand } from './update-profile.command.js';

const mockProfileService = () => ({
  update: jest.fn() as jest.Mock,
  toResponse: jest.fn() as jest.Mock,
});

describe('UpdateProfileHandler', () => {
  let handler: UpdateProfileHandler;
  let profileService: ReturnType<typeof mockProfileService>;

  beforeEach(() => {
    profileService = mockProfileService();
    handler = new UpdateProfileHandler(profileService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateProfileCommand');
  });

  it('should update and return DTO', async () => {
    const profile = { userId: 'user-1' };
    const dto = { userId: 'user-1', displayName: 'John' };
    profileService.update.mockResolvedValue(profile);
    profileService.toResponse.mockReturnValue(dto);

    const command = new UpdateProfileCommand('user-1' as never, { displayName: 'John' } as never);
    const result = await handler.execute(command);

    expect(result).toEqual(dto);
  });
});
