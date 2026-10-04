/**
 * GetProfileHandler Unit Test
 */
import { GetProfileHandler } from '@application/queries/profile/get-profile.handler';
import { GetProfileQuery } from '@application/queries/profile/get-profile.query';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetProfileHandler', () => {
  let handler: GetProfileHandler;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    profileRepo = createUserProfileRepositoryMock();
    handler = new GetProfileHandler(profileRepo);
  });

  it('should return profile DTO when found', async () => {
    const profile = UserProfileEntity.create({
      id: 'p-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(new GetProfileQuery('user-1'));
    expect(result.userId).toBe('user-1');
    expect(result.visibility).toBe('public');
  });

  it('should throw when profile not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetProfileQuery('missing'))).rejects.toThrow();
  });
});
