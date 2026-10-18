/**
 * UserPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { makeMockPrismaService, prismaUserRow, TEST_IDS, TEST_EMAIL } from '@fixtures/index.js';

describe('UserPrismaRepository', () => {
  let repo: UserPrismaRepository;
  let user: ReturnType<typeof makeMockPrismaService>['user'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['user']);
    user = prisma.user as never;
    repo = new UserPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (user.findUnique as jest.Mock).mockResolvedValue(prismaUserRow());
    const u = await repo.findById(TEST_IDS.USER_ID);
    expect(u).not.toBeNull();
    expect(u!.id).toBe(TEST_IDS.USER_ID);
  });

  it('findByEmailRaw queries via findFirst', async () => {
    (user.findFirst as jest.Mock).mockResolvedValue(prismaUserRow());
    const u = await repo.findByEmailRaw(TEST_EMAIL);
    expect(u).not.toBeNull();
    expect(user.findFirst).toHaveBeenCalled();
  });

  it('findByEmail delegates to findByEmailRaw', async () => {
    (user.findFirst as jest.Mock).mockResolvedValue(prismaUserRow());
    expect(await repo.findByEmail({ value: TEST_EMAIL } as never)).not.toBeNull();
  });

  it('findByPhone queries', async () => {
    (user.findFirst as jest.Mock).mockResolvedValue(prismaUserRow());
    await repo.findByPhone('+8801700000000');
    expect(user.findFirst).toHaveBeenCalled();
  });

  it('findByUsername returns null', async () => {
    expect(await repo.findByUsername('foo')).toBeNull();
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

  it('findPaginated applies filters', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    (user.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 10, filter: { status: 'active', search: 'x' } });
    expect(user.findMany).toHaveBeenCalled();
  });

  it('getStats computes', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([
      prismaUserRow({ status: 'active', role: 'customer' }),
      prismaUserRow({ id: TEST_IDS.USER_ID_2, status: 'suspended', role: 'admin' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.activeCount).toBe(1);
  });

  it('findActive queries', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findActive();
    expect(user.findMany).toHaveBeenCalled();
  });

  it('findByRole queries', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findByRole('admin');
    expect(user.findMany).toHaveBeenCalled();
  });

  it('delete uses update (soft delete)', async () => {
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

  it('exists count>0 true', async () => {
    (user.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('exists count=0 false', async () => {
    (user.count as jest.Mock).mockResolvedValue(0);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(false);
  });

  it('findAll maps', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([prismaUserRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findInactive / findUnverified query', async () => {
    (user.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findInactive(30);
    await repo.findUnverified(24);
    expect(user.findMany).toHaveBeenCalledTimes(2);
  });
});
