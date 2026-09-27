/**
 * GetUserHandler Unit Test
 */
import { GetUserHandler } from '@application/queries/user/get-user.handler';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetUserHandler', () => {
  let handler: GetUserHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new GetUserHandler(userRepo);
  });

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should return user DTO when found', async () => {
    userRepo.findById.mockResolvedValue(buildUser());

    const result = await handler.execute(new GetUserQuery('user-1'));

    expect(result.id).toBe('user-1');
    expect(result.email).toBe('user@example.com');
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(handler.execute(new GetUserQuery('missing'))).rejects.toThrow(
      'not found'
    );
  });

  it('should call repo with correct id', async () => {
    userRepo.findById.mockResolvedValue(buildUser());
    await handler.execute(new GetUserQuery('user-1'));
    expect(userRepo.findById).toHaveBeenCalledWith('user-1');
  });
});
