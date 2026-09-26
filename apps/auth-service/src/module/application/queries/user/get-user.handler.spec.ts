/**
 * GetUserHandler — Unit Tests
 * @module auth-service/application/queries/user
 */
import { GetUserHandler } from './get-user.handler';
import { GetUserQuery } from './get-user.query';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import { UserNotFoundAppError } from '../../errors/user.errors';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = () =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$hash',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findById: jest.fn() });

describe('GetUserHandler', () => {
  let handler: GetUserHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserQuery');
  });

  it('should throw when user not found', async () => {
    repo.findById.mockResolvedValue(null);
    const query = new GetUserQuery('missing' as never);

    await expect(handler.execute(query)).rejects.toThrow(UserNotFoundAppError);
  });

  it('should return mapped user DTO', async () => {
    repo.findById.mockResolvedValue(buildUser());
    const query = new GetUserQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result.id).toBe('user-1');
    expect(result.email).toBe('john@example.com');
    expect(result.roles).toContain('customer');
  });

  it('should NOT expose passwordHash', async () => {
    repo.findById.mockResolvedValue(buildUser());
    const query = new GetUserQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(JSON.stringify(result)).not.toContain('$2b$');
  });
});
