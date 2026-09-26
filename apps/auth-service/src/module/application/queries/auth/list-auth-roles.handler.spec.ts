/**
 * ListAuthRolesHandler — Unit Tests
 */
import { ListAuthRolesHandler } from './list-auth-roles.handler';
import { ListAuthRolesQuery } from './list-auth-roles.query';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../../../domain/value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildRole = (name: string, perms: string[] = []) =>
  AuthRoleEntity.create({
    id: `role-${name}`,
    name: RoleNameVO.of(name),
    description: RoleDescriptionVO.of(`${name} role`),
    permissions: perms.map((p) => PermissionNameVO.of(p)),
    isSystem: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findAll: jest.fn() });

describe('ListAuthRolesHandler', () => {
  let handler: ListAuthRolesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthRolesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthRolesQuery');
  });

  it('should return mapped roles', async () => {
    repo.findAll.mockResolvedValue([
      buildRole('admin', ['user:view', 'user:create']),
      buildRole('customer'),
    ]);
    const query = new ListAuthRolesQuery();

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe('admin');
    expect(result[0]?.permissions).toContain('user:view');
  });

  it('should handle empty list', async () => {
    repo.findAll.mockResolvedValue([]);
    const query = new ListAuthRolesQuery();

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
