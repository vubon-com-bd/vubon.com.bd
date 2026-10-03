import { GetPublicProfileHandler } from '@application/queries/profile/get-public-profile.handler';
import { GetPublicProfileQuery } from '@application/queries/profile/get-public-profile.query';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetPublicProfileHandler', () => {
  let handler: GetPublicProfileHandler;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    profileRepo = createUserProfileRepositoryMock();
    handler = new GetPublicProfileHandler(profileRepo);
  });

  it('should return public profile', async () => {
    const profile = UserProfileEntity.create({
      id: 'p-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(new GetPublicProfileQuery('user-1'));
    expect(result.userId).toBe('user-1');
  });

  it('should throw when not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetPublicProfileQuery('missing'))).rejects.toThrow();
  });
});
