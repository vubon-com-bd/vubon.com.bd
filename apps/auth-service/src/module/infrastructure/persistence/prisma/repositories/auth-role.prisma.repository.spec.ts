/**
 * AuthRolePrismaRepository — Unit Tests
 */
import { AuthRolePrismaRepository } from './auth-role.prisma.repository';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo';

const mockPrisma = () => ({
  authRole: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  authRolePermission: {
    findMany: jest.fn(),
    upsert: jest.fn(),
    deleteMany: jest.fn(),
  },
  authPermission: {
    findUnique: jest.fn(),
  },
});

const now = new Date('2024-01-01T00:00:00.000Z');

const prismaRole = (name = 'admin') => ({
  id: 'role-1',
  name,
  description: `${name} role`,
  isSystem: false,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
});

describe('AuthRolePrismaRepository', () => {
  let repo: AuthRolePrismaRepository;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new AuthRolePrismaRepository(prisma as never);
  });

  it('findByName maps entity', async () => {
    prisma.authRole.findUnique.mockResolvedValue(prismaRole());
    const result = await repo.findByName(RoleNameVO.of('admin'));
    expect(result?.name.value).toBe('admin');
    expect(result?.description.value).toBe('admin role');
  });

  it('findManyByNames returns empty for empty', async () => {
    expect(await repo.findManyByNames([])).toEqual([]);
    expect(prisma.authRole.findMany).not.toHaveBeenCalled();
  });

  it('addPermissionToRole throws if permission missing', async () => {
    prisma.authPermission.findUnique.mockResolvedValue(null);
    await expect(
      repo.addPermissionToRole('role-1', { value: 'user:view' } as never),
    ).rejects.toThrow();
  });

  it('removePermissionFromRole returns early if not found', async () => {
    prisma.authPermission.findUnique.mockResolvedValue(null);
    await repo.removePermissionFromRole('role-1', { value: 'user:view' } as never);
    expect(prisma.authRolePermission.deleteMany).not.toHaveBeenCalled();
  });
});
