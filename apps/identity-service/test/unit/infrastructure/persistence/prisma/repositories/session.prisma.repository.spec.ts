/**
 * SessionPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SessionPrismaRepository } from '@infrastructure/persistence/prisma/repositories/session.prisma.repository.js';
import { makeMockPrismaService, prismaSessionRow, TEST_IDS } from '@fixtures/index.js';

describe('SessionPrismaRepository', () => {
  let repo: SessionPrismaRepository;
  let session: ReturnType<typeof makeMockPrismaService>['authSession'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authSession']);
    session = prisma.authSession as never;
    repo = new SessionPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (session.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.SESSION_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (session.findUnique as jest.Mock).mockResolvedValue(prismaSessionRow());
    const s = await repo.findById(TEST_IDS.SESSION_ID);
    expect(s!.userId.value).toBe(TEST_IDS.USER_ID);
  });

  it('findById revoked status when revokedAt set', async () => {
    (session.findUnique as jest.Mock).mockResolvedValue(prismaSessionRow({ revokedAt: new Date() }));
    const s = await repo.findById(TEST_IDS.SESSION_ID);
    expect(s!.status.isRevoked()).toBe(true);
  });

  it('findByUserId returns list', async () => {
    (session.findMany as jest.Mock).mockResolvedValue([prismaSessionRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findActiveByUserId queries', async () => {
    (session.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findActiveByUserId({ value: TEST_IDS.USER_ID } as never);
    expect(session.findMany).toHaveBeenCalled();
  });

  it('countActiveByUserId returns count', async () => {
    (session.count as jest.Mock).mockResolvedValue(3);
    expect(await repo.countActiveByUserId({ value: TEST_IDS.USER_ID } as never)).toBe(3);
  });

  it('save update path', async () => {
    (session.findUnique as jest.Mock).mockResolvedValue(prismaSessionRow());
    (session.update as jest.Mock).mockResolvedValue(prismaSessionRow());
    const entity = await repo.findById(TEST_IDS.SESSION_ID);
    await repo.save(entity!);
    expect(session.update).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (session.findMany as jest.Mock).mockResolvedValue([prismaSessionRow()]);
    (session.count as jest.Mock).mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
  });

  it('getStats computes', async () => {
    (session.findMany as jest.Mock).mockResolvedValue([
      prismaSessionRow(),
      prismaSessionRow({ id: TEST_IDS.SESSION_ID_2, revokedAt: new Date() }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.activeCount).toBe(1);
  });

  it('findExpired queries', async () => {
    (session.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findExpired();
    expect(session.findMany).toHaveBeenCalled();
  });

  it('findOldestByUserId uses findFirst', async () => {
    (session.findFirst as jest.Mock).mockResolvedValue(prismaSessionRow());
    expect(await repo.findOldestByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findOldestByUserId null when empty', async () => {
    (session.findFirst as jest.Mock).mockResolvedValue(null);
    expect(await repo.findOldestByUserId({ value: TEST_IDS.USER_ID } as never)).toBeNull();
  });

  it('revokeAllByUserId count', async () => {
    (session.updateMany as jest.Mock).mockResolvedValue({ count: 4 });
    expect(await repo.revokeAllByUserId({ value: TEST_IDS.USER_ID } as never, 'logout')).toBe(4);
  });

  it('delete uses update', async () => {
    (session.update as jest.Mock).mockResolvedValue(prismaSessionRow({ deletedAt: new Date() }));
    await repo.delete(TEST_IDS.SESSION_ID);
    expect(session.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: TEST_IDS.SESSION_ID } }),
    );
  });

  it('softDelete delegates', async () => {
    (session.update as jest.Mock).mockResolvedValue(prismaSessionRow());
    await repo.softDelete(TEST_IDS.SESSION_ID);
    expect(session.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (session.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.SESSION_ID)).toBe(true);
  });
});
