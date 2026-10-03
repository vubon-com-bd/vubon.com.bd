import { UpdateVisibilityHandler } from '@application/commands/profile/update-visibility.handler';
import { UpdateVisibilityCommand } from '@application/commands/profile/update-visibility.command';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateVisibilityHandler', () => {
  let handler: UpdateVisibilityHandler;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    profileRepo = createUserProfileRepositoryMock();
    handler = new UpdateVisibilityHandler(profileRepo as never);
  });

  it('should update visibility to private', async () => {
    const profile = UserProfileEntity.create({
      id: 'p-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(
      new UpdateVisibilityCommand('user-1', 'private' as never)
    );
    expect(result.visibility).toBe('private');
  });

  it('should throw when not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await expect(
      handler.execute(new UpdateVisibilityCommand('missing', 'public' as never))
    ).rejects.toThrow();
  });
});
