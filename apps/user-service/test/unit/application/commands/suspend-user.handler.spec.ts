/**
 * SuspendUserHandler Unit Test
 */
import { SuspendUserHandler } from '@application/commands/user/suspend-user.handler';
import { SuspendUserCommand } from '@application/commands/user/suspend-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('SuspendUserHandler', () => {
  let handler: SuspendUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new SuspendUserHandler(userRepo);
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should suspend user with reason', async () => {
    userRepo.findById.mockResolvedValue(buildUser());

    const result = await handler.execute(
      new SuspendUserCommand('user-1', 'policy violation')
    );

    expect(result.status).toBe('suspended');
    expect(userRepo.save).toHaveBeenCalled();
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(
      handler.execute(new SuspendUserCommand('missing', 'test'))
    ).rejects.toThrow('not found');
  });

  it('should fail when trying to suspend admin', async () => {
    const admin = UserEntity.create({
      id: UserIdVO.create('admin-1'),
      email: UserEmailVO.create('admin@example.com'),
      name: UserNameVO.create('Admin User'),
      type: UserTypeVO.create('admin'),
      now,
    });
    userRepo.findById.mockResolvedValue(admin);

    await expect(
      handler.execute(new SuspendUserCommand('admin-1', 'test'))
    ).rejects.toThrow();
  });
});
