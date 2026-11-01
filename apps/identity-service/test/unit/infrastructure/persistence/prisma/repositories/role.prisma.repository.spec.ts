/**
 * RolePrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RolePrismaRepository } from '@infrastructure/persistence/prisma/repositories/role.prisma.repository.js';
import { makeMockPrismaService, prismaRoleRow, TEST_IDS } from '@fixtures/index.js';

describe('RolePrismaRepository', () => {
  let repo: RolePrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authRole'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authRole']);
    model = prisma.authRole as never;
    repo = new RolePrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.ROLE_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaRoleRow());
    expect(await repo.findById(TEST_IDS.ROLE_ID)).not.toBeNull();
  });

  it('findByIdVO delegates', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaRoleRow());
    expect(await repo.findByIdVO({ value: TEST_IDS.ROLE_ID } as never)).not.toBeNull();
  });

  it('findByName queries via findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaRoleRow());
    await repo.findByName('customer');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findSystemRoles queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findSystemRoles();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findWithPermission returns [] (stub)', async () => {
    const result = await repo.findWithPermission('auth:login');
    expect(result).toEqual([]);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaRoleRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaRoleRow());
    (model.update as jest.Mock).mockResolvedValue(prismaRoleRow());
    const e = await repo.findById(TEST_IDS.ROLE_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaRoleRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaRoleRow());
    const e = await repo.findById(TEST_IDS.ROLE_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaRoleRow()]);
    (model.count as jest.Mock).mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
  });

  it('getStats computes', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([
      prismaRoleRow({ isSystem: true }),
      prismaRoleRow({ id: TEST_IDS.ROLE_ID_2, isSystem: false }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.systemRoleCount).toBe(1);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaRoleRow());
    await repo.delete(TEST_IDS.ROLE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaRoleRow());
    await repo.softDelete(TEST_IDS.ROLE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.ROLE_ID)).toBe(true);
  });
});
