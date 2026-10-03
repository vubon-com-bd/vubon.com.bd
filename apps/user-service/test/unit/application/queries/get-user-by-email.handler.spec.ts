import { GetUserByEmailHandler } from '@application/queries/user/get-user-by-email.handler';
import { GetUserByEmailQuery } from '@application/queries/user/get-user-by-email.query';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetUserByEmailHandler', () => {
  let handler: GetUserByEmailHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new GetUserByEmailHandler(userRepo);
  });

  it('should return user DTO by email', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findByEmail.mockResolvedValue(user);

    const result = await handler.execute(new GetUserByEmailQuery('user@example.com'));
    expect(result.id).toBe('user-1');
    expect(result.email).toBe('user@example.com');
  });

  it('should throw when not found', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    await expect(handler.execute(new GetUserByEmailQuery('missing@example.com'))).rejects.toThrow();
  });
});
