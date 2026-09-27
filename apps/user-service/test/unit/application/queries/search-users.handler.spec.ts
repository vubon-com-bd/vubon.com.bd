/**
 * SearchUsersHandler Unit Test
 */
import { SearchUsersHandler } from '@application/queries/user/search-users.handler';
import { SearchUsersQuery } from '@application/queries/user/search-users.query';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock } from '../../../helpers/user-repository.mock';

describe('SearchUsersHandler', () => {
  let handler: SearchUsersHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    handler = new SearchUsersHandler(userRepo);
  });

  it('should return empty result for term shorter than 2 chars', async () => {
    const result = await handler.execute(new SearchUsersQuery('a'));
    expect(result.items.length).toBe(0);
    expect(result.total).toBe(0);
    expect(userRepo.findPaginated).not.toHaveBeenCalled();
  });

  it('should search when term >= 2 chars', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('john@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findPaginated.mockResolvedValue({ items: [user], total: 1 });

    const result = await handler.execute(new SearchUsersQuery('john'));
    expect(result.items.length).toBe(1);
    expect(result.term).toBe('john');
  });

  it('should trim term', async () => {
    userRepo.findPaginated.mockResolvedValue({ items: [], total: 0 });
    const result = await handler.execute(new SearchUsersQuery('  john  '));
    expect(result.term).toBe('john');
  });
});
