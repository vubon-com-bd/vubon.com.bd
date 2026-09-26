/**
 * UpdateProfileHandler — Unit Tests
 */
import { UpdateProfileHandler } from './update-profile.handler';
import { UpdateProfileCommand } from './update-profile.command';

const mockProfileService = () => ({
  update: jest.fn(),
  toResponse: jest.fn(),
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
