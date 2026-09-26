/**
 * ListUsersHandler — Unit Tests
 */
import { ListUsersHandler } from './list-users.handler';
import { ListUsersQuery } from './list-users.query';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = (id: string, email: string) =>
  UserEntity.create({
    id: id as never,
    email: UserEmailVO.of(email),
    passwordHash: '$2b$12$hash',
    name: UserNameVO.of('User'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findAll: jest.fn() });

describe('ListUsersHandler', () => {
  let handler: ListUsersHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListUsersHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUsersQuery');
  });

  it('should return list of user DTOs', async () => {
    repo.findAll.mockResolvedValue([
      buildUser('u1', 'a@example.com'),
      buildUser('u2', 'b@example.com'),
    ]);
    const query = new ListUsersQuery(50, 0);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe('u1');
  });

  it('should handle empty list', async () => {
    repo.findAll.mockResolvedValue([]);
    const query = new ListUsersQuery();

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
