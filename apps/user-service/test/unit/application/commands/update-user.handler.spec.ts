/**
 * UpdateUserHandler Unit Test
 */
import { UpdateUserHandler } from '@application/commands/user/update-user.handler';
import { UpdateUserCommand } from '@application/commands/user/update-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new UpdateUserHandler(userRepo);
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should mark email verified when payload indicates', async () => {
    userRepo.findById.mockResolvedValue(buildUser());

    const result = await handler.execute(
      new UpdateUserCommand('user-1', { emailVerified: true })
    );

    expect(result.emailVerified).toBe(true);
    expect(userRepo.save).toHaveBeenCalled();
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(
      handler.execute(new UpdateUserCommand('missing', { emailVerified: true }))
    ).rejects.toThrow('not found');
  });
});
