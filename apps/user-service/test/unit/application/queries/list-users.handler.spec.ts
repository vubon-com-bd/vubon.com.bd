/**
 * ListUsersHandler Unit Test
 */
import { ListUsersHandler } from '@application/queries/user/list-users.handler';
import { ListUsersQuery } from '@application/queries/user/list-users.query';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ListUsersHandler', () => {
  let handler: ListUsersHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new ListUsersHandler(userRepo);
  });

  const buildUser = (id: string) =>
    UserEntity.create({
      id: UserIdVO.create(id),
      email: UserEmailVO.create(`${id}@example.com`),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should return paginated result', async () => {
    userRepo.findPaginated.mockResolvedValue({
      items: [buildUser('u-1'), buildUser('u-2')],
      total: 2,
    });

    const result = await handler.execute(new ListUsersQuery(1, 20));

    expect(result.items.length).toBe(2);
    expect(result.total).toBe(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.totalPages).toBe(1);
  });

  it('should calculate totalPages correctly', async () => {
    userRepo.findPaginated.mockResolvedValue({
      items: [buildUser('u-1')],
      total: 55,
    });

    const result = await handler.execute(new ListUsersQuery(1, 20));
    expect(result.totalPages).toBe(3);
  });

  it('should pass filter options to repo', async () => {
    userRepo.findPaginated.mockResolvedValue({ items: [], total: 0 });

    await handler.execute(new ListUsersQuery(1, 10, 'active', 'individual', 'john'));

    const call = userRepo.findPaginated.mock.calls[0][0];
    expect(call.page).toBe(1);
    expect(call.limit).toBe(10);
    expect(call.search).toBe('john');
  });
});
