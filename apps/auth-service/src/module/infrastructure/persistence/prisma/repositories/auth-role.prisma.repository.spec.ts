/**
 * AuthRolePrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { AuthRolePrismaRepository } from './auth-role.prisma.repository.js';
import { RoleNameVO } from '../../../../domain/value-objects/primitives/role-name.vo.js';

const mockPrisma = () => ({
  authRole: {
    findUnique: jest.fn() as jest.Mock,
    findMany: jest.fn() as jest.Mock,
    create: jest.fn() as jest.Mock,
    update: jest.fn() as jest.Mock,
    delete: jest.fn() as jest.Mock,
    count: jest.fn() as jest.Mock,
  },
  authRolePermission: {
    findMany: jest.fn() as jest.Mock,
    upsert: jest.fn() as jest.Mock,
    deleteMany: jest.fn() as jest.Mock,
  },
  authPermission: {
    findUnique: jest.fn() as jest.Mock,
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
