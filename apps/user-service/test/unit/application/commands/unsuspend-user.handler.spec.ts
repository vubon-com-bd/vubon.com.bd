import { UnsuspendUserHandler } from '@application/commands/user/unsuspend-user.handler';
import { UnsuspendUserCommand } from '@application/commands/user/unsuspend-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UnsuspendUserHandler', () => {
  let handler: UnsuspendUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new UnsuspendUserHandler(userRepo);
  });

  it('should reactivate suspended user', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    user.suspend('test', now);
    userRepo.findById.mockResolvedValue(user);

    const result = await handler.execute(new UnsuspendUserCommand('user-1'));
    expect(result.status).toBe('active');
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(handler.execute(new UnsuspendUserCommand('missing'))).rejects.toThrow();
  });
});
