/**
 * AuthPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthPrismaRepository } from '@infrastructure/persistence/prisma/repositories/auth.prisma.repository.js';
import { makeMockPrismaService, prismaUserRow, TEST_IDS } from '@fixtures/index.js';

describe('AuthPrismaRepository', () => {
  let repo: AuthPrismaRepository;
  let user: ReturnType<typeof makeMockPrismaService>['user'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['user']);
    user = prisma.user as never;
    repo = new AuthPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById null when soft-deleted', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(prismaUserRow({ deletedAt: new Date() }));
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row → AuthEntity', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(prismaUserRow());
    const auth = await repo.findById(TEST_IDS.USER_ID);
    expect(auth).not.toBeNull();
    expect(auth!.id).toBe(TEST_IDS.USER_ID);
  });

  it('findByIdVO delegates', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(prismaUserRow());
    expect(await repo.findByIdVO({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserId empty when not found', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    expect(await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).toEqual([]);
  });

  it('findByUserId returns array', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([prismaUserRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByIdentifier queries OR email/phone', async () => {
    (user.findFirst as jest.Mock).mockResolvedValue(prismaUserRow());
    await repo.findByIdentifier('any@test.com');
    expect(user.findFirst).toHaveBeenCalled();
  });

  it('findByIdentifier returns null on miss', async () => {
    (user.findFirst as jest.Mock).mockResolvedValue(null);
    expect(await repo.findByIdentifier('missing@x.com')).toBeNull();
  });

  it('findAll maps all rows', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([prismaUserRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('exists true when count>0', async () => {
    (user.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('exists false when count=0', async () => {
    (user.count as jest.Mock).mockResolvedValue(0);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(false);
  });

  it('save update path', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(prismaUserRow());
    (user.update as jest.Mock).mockResolvedValue(prismaUserRow());
    const entity = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(entity!);
    expect(user.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (user.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaUserRow())
      .mockResolvedValueOnce(null);
    (user.create as jest.Mock).mockResolvedValue(prismaUserRow());
    const entity = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(entity!);
    expect(user.create).toHaveBeenCalled();
  });

  it('delete sets deletedAt via update', async () => {
    (user.update as jest.Mock).mockResolvedValue(prismaUserRow({ deletedAt: new Date() }));
    await repo.delete(TEST_IDS.USER_ID);
    expect(user.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: TEST_IDS.USER_ID } }),
    );
  });

  it('softDelete delegates to delete', async () => {
    (user.update as jest.Mock).mockResolvedValue(prismaUserRow({ deletedAt: new Date() }));
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(user.update).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([prismaUserRow()]);
    (user.count as jest.Mock).mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
    expect(r.totalPages).toBe(1);
  });

  it('findPaginated applies status filter', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    (user.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 10, filter: { status: 'active' } });
    expect(user.findMany).toHaveBeenCalled();
  });

  it('getStats computes', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([
      prismaUserRow({ status: 'active' }),
      prismaUserRow({ id: TEST_IDS.USER_ID_2, status: 'inactive' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.activeCount).toBe(1);
  });

  it('findLockedExpired queries locked status', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    const result = await repo.findLockedExpired();
    expect(user.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: 'locked' }),
      }),
    );
    expect(result).toEqual([]);
  });

  it('findInactive queries', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findInactive(30);
    expect(user.findMany).toHaveBeenCalled();
  });

  it('findUnverified queries', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findUnverified(24);
    expect(user.findMany).toHaveBeenCalled();
  });
});
