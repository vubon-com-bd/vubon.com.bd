import { DeactivateUserHandler } from '@application/commands/user/deactivate-user.handler';
import { DeactivateUserCommand } from '@application/commands/user/deactivate-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('DeactivateUserHandler', () => {
  let handler: DeactivateUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new DeactivateUserHandler(userRepo);
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should deactivate (suspend) user', async () => {
    userRepo.findById.mockResolvedValue(buildUser());
    const result = await handler.execute(new DeactivateUserCommand('user-1', 'test'));
    expect(result.status).toBe('suspended');
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(handler.execute(new DeactivateUserCommand('missing'))).rejects.toThrow();
  });
});
