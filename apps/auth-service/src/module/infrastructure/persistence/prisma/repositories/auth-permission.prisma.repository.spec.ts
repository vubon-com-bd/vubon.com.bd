/**
 * AuthPermissionPrismaRepository — Unit Tests
 */
import { AuthPermissionPrismaRepository } from './auth-permission.prisma.repository';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo';

const mockPrisma = () => ({
  authPermission: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaPerm = (name = 'user:view') => ({
  id: 'perm-1',
  name,
  resource: name.split(':')[0],
  action: name.split(':')[1],
  description: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

describe('AuthPermissionPrismaRepository', () => {
  let repo: AuthPermissionPrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthPermissionPrismaRepository(prisma as never);
  });

  it('findByName maps entity', async () => {
    prisma.authPermission.findUnique.mockResolvedValue(prismaPerm());
    const result = await repo.findByName(PermissionNameVO.of('user:view'));
    expect(result?.name.value).toBe('user:view');
    expect(result?.resource.value).toBe('user');
    expect(result?.action.value).toBe('view');
  });

  it('findByResource returns list', async () => {
    prisma.authPermission.findMany.mockResolvedValue([prismaPerm()]);
    const result = await repo.findByResource('user');
    expect(result).toHaveLength(1);
  });

  it('findManyByNames returns empty for empty input', async () => {
    expect(await repo.findManyByNames([])).toEqual([]);
    expect(prisma.authPermission.findMany).not.toHaveBeenCalled();
  });
});
