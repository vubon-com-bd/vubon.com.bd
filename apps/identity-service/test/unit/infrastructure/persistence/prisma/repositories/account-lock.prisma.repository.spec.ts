/**
 * AccountLockPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AccountLockPrismaRepository } from '@infrastructure/persistence/prisma/repositories/account-lock.prisma.repository.js';
import { makeMockPrismaService, prismaAccountLockRow, TEST_IDS } from '@fixtures/index.js';

describe('AccountLockPrismaRepository', () => {
  let repo: AccountLockPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authAccountLock'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authAccountLock']);
    model = prisma.authAccountLock as never;
    repo = new AccountLockPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findActiveByAuthId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    await repo.findActiveByAuthId({ value: TEST_IDS.USER_ID } as never);
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findActiveByUserId delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    expect(await repo.findActiveByUserId(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByAuthId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaAccountLockRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    (model.update as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValueOnce(prismaAccountLockRow()).mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
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
      prismaAccountLockRow({ reason: 'too_many_attempts' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(1);
  });

  it('findExpired queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findExpired();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('autoUnlockExpired count', async () => {
    (model.updateMany as jest.Mock).mockResolvedValue({ count: 3 });
    expect(await repo.autoUnlockExpired()).toBe(3);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaAccountLockRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaAccountLockRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });
});
