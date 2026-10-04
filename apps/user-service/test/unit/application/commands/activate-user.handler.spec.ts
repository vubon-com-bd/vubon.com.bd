/**
 * ActivateUserHandler Unit Test
 */
import { ActivateUserHandler } from '@application/commands/user/activate-user.handler';
import { ActivateUserCommand } from '@application/commands/user/activate-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ActivateUserHandler', () => {
  let handler: ActivateUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new ActivateUserHandler(userRepo);
  });

  const buildExistingUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should activate a pending user', async () => {
    const user = buildExistingUser();
    userRepo.findById.mockResolvedValue(user);

    const result = await handler.execute(new ActivateUserCommand('user-1'));

    expect(result.status).toBe('active');
    expect(userRepo.save).toHaveBeenCalledTimes(1);
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(handler.execute(new ActivateUserCommand('missing'))).rejects.toThrow(
      'not found'
    );
  });

  it('should not save when user is already active', async () => {
    const user = buildExistingUser();
    user.activate(now);
    userRepo.findById.mockResolvedValue(user);

    await handler.execute(new ActivateUserCommand('user-1'));
    expect(userRepo.save).toHaveBeenCalled();
  });
});
