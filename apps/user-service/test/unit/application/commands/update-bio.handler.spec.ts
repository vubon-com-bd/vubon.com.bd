import { UpdateBioHandler } from '@application/commands/profile/update-bio.handler';
import { UpdateBioCommand } from '@application/commands/profile/update-bio.command';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateBioHandler', () => {
  let handler: UpdateBioHandler;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    profileRepo = createUserProfileRepositoryMock();
    handler = new UpdateBioHandler(profileRepo as never);
  });

  it('should update bio', async () => {
    const profile = UserProfileEntity.create({
      id: 'p-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(new UpdateBioCommand('user-1', 'New bio'));
    expect(result.userId).toBe('user-1');
  });

  it('should throw when not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new UpdateBioCommand('missing', 'x'))).rejects.toThrow();
  });
});
