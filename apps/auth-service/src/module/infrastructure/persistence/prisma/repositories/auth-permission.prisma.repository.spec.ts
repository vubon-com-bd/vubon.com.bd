/**
 * AuthPermissionPrismaRepository — Unit Tests
 */
import { jest } from '@jest/globals';

import { AuthPermissionPrismaRepository } from './auth-permission.prisma.repository.js';
import { PermissionNameVO } from '../../../../domain/value-objects/primitives/permission-name.vo.js';

const mockPrisma = () => ({
  authPermission: {
    findUnique: jest.fn<() => Promise<unknown>>(),
    findMany: jest.fn<() => Promise<unknown>>(),
    create: jest.fn<() => Promise<unknown>>(),
    update: jest.fn<() => Promise<unknown>>(),
    delete: jest.fn<() => Promise<unknown>>(),
    count: jest.fn<() => Promise<unknown>>(),
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
