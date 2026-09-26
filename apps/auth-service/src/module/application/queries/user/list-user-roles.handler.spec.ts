/**
 * ListUserRolesHandler — Unit Tests
 */
import { ListUserRolesHandler } from './list-user-roles.handler';
import { ListUserRolesQuery } from './list-user-roles.query';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../../../domain/value-objects/primitives/role-description.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildRole = (name: string) =>
  AuthRoleEntity.create({
    id: `role-${name}`,
    name: RoleNameVO.of(name),
    description: RoleDescriptionVO.of(`${name} role`),
    permissions: [],
    isSystem: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockService = () => ({
  listForUser: jest.fn(),
  toResponse: jest.fn((r: AuthRoleEntity) => ({
    id: r.id,
    name: r.name.value,
    description: r.description.value,
    permissions: [],
    isSystem: r.isSystem,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  })),
});

describe('ListUserRolesHandler', () => {
  let handler: ListUserRolesHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new ListUserRolesHandler(service as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUserRolesQuery');
  });

  it('should return mapped roles', async () => {
    service.listForUser.mockResolvedValue([buildRole('admin'), buildRole('customer')]);
    const query = new ListUserRolesQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.name).toBe('admin');
  });

  it('should handle empty list', async () => {
    service.listForUser.mockResolvedValue([]);
    const query = new ListUserRolesQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
