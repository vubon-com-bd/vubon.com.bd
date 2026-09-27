import { UpdateAvatarHandler } from '@application/commands/profile/update-avatar.handler';
import { UpdateAvatarCommand } from '@application/commands/profile/update-avatar.command';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateAvatarHandler', () => {
  let handler: UpdateAvatarHandler;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    profileRepo = createUserProfileRepositoryMock();
    handler = new UpdateAvatarHandler(profileRepo as never);
  });

  it('should update avatar URL', async () => {
    const profile = UserProfileEntity.create({
      id: 'p-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(
      new UpdateAvatarCommand('user-1', 'https://cdn.example.com/a.png')
    );
    expect(result.userId).toBe('user-1');
  });

  it('should throw when profile not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await expect(
      handler.execute(new UpdateAvatarCommand('missing', 'https://x.com/a.png'))
    ).rejects.toThrow();
  });
});
