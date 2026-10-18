/**
 * PermissionPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PermissionPrismaRepository } from '@infrastructure/persistence/prisma/repositories/permission.prisma.repository.js';
import { makeMockPrismaService, prismaPermissionRow, TEST_IDS } from '@fixtures/index.js';

describe('PermissionPrismaRepository', () => {
  let repo: PermissionPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authPermission'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authPermission']);
    model = prisma.authPermission as never;
    repo = new PermissionPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.ROLE_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaPermissionRow());
    expect(await repo.findById(TEST_IDS.ROLE_ID)).not.toBeNull();
  });

  it('findByName queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaPermissionRow());
    await repo.findByName('auth:login');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findByCategory queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findByCategory('auth');
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findSensitive queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findSensitive();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaPermissionRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaPermissionRow());
    (model.update as jest.Mock).mockResolvedValue(prismaPermissionRow());
    const e = await repo.findById(TEST_IDS.ROLE_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaPermissionRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaPermissionRow());
    const e = await repo.findById(TEST_IDS.ROLE_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    (model.count as jest.Mock).mockResolvedValue(0);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('getStats computes', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([
      prismaPermissionRow({ resource: 'auth', action: 'login' }),
      prismaPermissionRow({ id: TEST_IDS.ROLE_ID_2, resource: 'user', action: 'delete' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.sensitiveCount).toBe(1);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaPermissionRow());
    await repo.delete(TEST_IDS.ROLE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaPermissionRow());
    await repo.softDelete(TEST_IDS.ROLE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.ROLE_ID)).toBe(true);
  });
});
