import { UpdateProfileHandler } from '@application/commands/profile/update-profile.handler';
import { UpdateProfileCommand } from '@application/commands/profile/update-profile.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock, createUserProfileRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateProfileHandler', () => {
  let handler: UpdateProfileHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  let profileRepo: ReturnType<typeof createUserProfileRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    profileRepo = createUserProfileRepositoryMock();
    handler = new UpdateProfileHandler(profileRepo as never, userRepo as never);
  });

  it('should update bio', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    const profile = UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    userRepo.findById.mockResolvedValue(user);
    profileRepo.findByUserId.mockResolvedValue(profile);

    const result = await handler.execute(
      new UpdateProfileCommand('user-1', { userId: 'user-1', bio: 'Hello world' })
    );
    expect(result.userId).toBe('user-1');
    expect(profileRepo.save).toHaveBeenCalled();
  });

  it('should throw when profile not found', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findById.mockResolvedValue(user);
    profileRepo.findByUserId.mockResolvedValue(null);

    await expect(
      handler.execute(new UpdateProfileCommand('user-1', { userId: 'user-1', bio: 'x' }))
    ).rejects.toThrow();
  });
});
