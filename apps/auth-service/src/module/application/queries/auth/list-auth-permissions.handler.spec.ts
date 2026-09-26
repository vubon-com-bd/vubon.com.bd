/**
 * ListAuthPermissionsHandler — Unit Tests
 */
import { ListAuthPermissionsHandler } from './list-auth-permissions.handler';
import { ListAuthPermissionsQuery } from './list-auth-permissions.query';
import { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../../../domain/value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../../../domain/value-objects/primitives/permission-resource.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildPermission = (name: string) => {
  const [resource, action] = name.split(':') as [string, string];
  return AuthPermissionEntity.create({
    id: `perm-${name}`,
    name: PermissionNameVO.of(name),
    resource: PermissionResourceVO.of(resource),
    action: PermissionActionVO.of(action),
    createdAt: NOW,
    updatedAt: NOW,
  });
};

const mockRepo = () => ({ findAll: jest.fn(), findByResource: jest.fn() });

describe('ListAuthPermissionsHandler', () => {
  let handler: ListAuthPermissionsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListAuthPermissionsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListAuthPermissionsQuery');
  });

  it('should list all permissions when no resource filter', async () => {
    repo.findAll.mockResolvedValue([
      buildPermission('user:view'),
      buildPermission('product:view'),
    ]);
    const query = new ListAuthPermissionsQuery();

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('should filter by resource when provided', async () => {
    repo.findByResource.mockResolvedValue([buildPermission('user:view')]);
    const query = new ListAuthPermissionsQuery('user');

    const result = await handler.execute(query);

    expect(result).toHaveLength(1);
    expect(repo.findByResource).toHaveBeenCalledWith('user');
  });

  it('should map permission DTOs correctly', async () => {
    repo.findAll.mockResolvedValue([buildPermission('user:view')]);
    const query = new ListAuthPermissionsQuery();

    const result = await handler.execute(query);

    expect(result[0]?.name).toBe('user:view');
    expect(result[0]?.resource).toBe('user');
    expect(result[0]?.action).toBe('view');
  });
});
