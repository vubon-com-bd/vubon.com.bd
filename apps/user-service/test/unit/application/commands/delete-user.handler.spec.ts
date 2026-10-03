/**
 * DeleteUserHandler Unit Test
 */
import { DeleteUserHandler } from '@application/commands/user/delete-user.handler';
import { DeleteUserCommand } from '@application/commands/user/delete-user.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new DeleteUserHandler(userRepo);
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should soft delete (save) by default', async () => {
    userRepo.findById.mockResolvedValue(buildUser());

    const result = await handler.execute(new DeleteUserCommand('user-1'));

    expect(result.success).toBe(true);
    expect(userRepo.save).toHaveBeenCalled();
    expect(userRepo.delete).not.toHaveBeenCalled();
  });

  it('should hard delete when flag is true', async () => {
    userRepo.findById.mockResolvedValue(buildUser());

    const result = await handler.execute(
      new DeleteUserCommand('user-1', 'GDPR request', true)
    );

    expect(result.success).toBe(true);
    expect(userRepo.delete).toHaveBeenCalledWith('user-1');
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(
      handler.execute(new DeleteUserCommand('missing'))
    ).rejects.toThrow('not found');
  });
});
