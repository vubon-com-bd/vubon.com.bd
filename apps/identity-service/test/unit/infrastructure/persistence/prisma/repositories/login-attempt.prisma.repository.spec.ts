/**
 * LoginAttemptPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LoginAttemptPrismaRepository } from '@infrastructure/persistence/prisma/repositories/login-attempt.prisma.repository.js';
import { makeMockPrismaService, prismaLoginAttemptRow, TEST_IDS } from '@fixtures/index.js';

describe('LoginAttemptPrismaRepository', () => {
  let repo: LoginAttemptPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authLoginAttempt'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authLoginAttempt']);
    model = prisma.authLoginAttempt as never;
    repo = new LoginAttemptPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaLoginAttemptRow());
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).not.toBeNull();
  });

  it('findByIdentifier queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findByIdentifier('test@x.com', 10);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findByIp queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findByIp('1.2.3.4', 10);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findRecent queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findRecent('test@x.com', 300);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('countRecent returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(3);
    expect(await repo.countRecent('test@x.com', 300)).toBe(3);
  });

  it('countRecentByIp returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countRecentByIp('1.2.3.4', 300)).toBe(5);
  });

  it('save always calls create', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaLoginAttemptRow());
    (model.create as jest.Mock).mockResolvedValue(prismaLoginAttemptRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
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
      prismaLoginAttemptRow({ status: 'success' }),
      prismaLoginAttemptRow({ status: 'failed' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.successCount).toBe(1);
    expect(stats.failureCount).toBe(1);
  });

  it('purge count', async () => {
    (model.deleteMany as jest.Mock).mockResolvedValue({ count: 10 });
    expect(await repo.purge(new Date().toISOString())).toBe(10);
  });

  it('delete calls delegate.delete', async () => {
    (model.delete as jest.Mock).mockResolvedValue(prismaLoginAttemptRow());
    await repo.delete(TEST_IDS.TOKEN_ID);
    expect(model.delete).toHaveBeenCalled();
  });

  it('softDelete delegates to delete', async () => {
    (model.delete as jest.Mock).mockResolvedValue(prismaLoginAttemptRow());
    await repo.softDelete(TEST_IDS.TOKEN_ID);
    expect(model.delete).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TOKEN_ID)).toBe(true);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaLoginAttemptRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });
});
