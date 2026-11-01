/**
 * TokenPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { TokenPrismaRepository } from '@infrastructure/persistence/prisma/repositories/token.prisma.repository.js';
import { makeMockPrismaService, prismaTokenRow, TEST_IDS } from '@fixtures/index.js';

describe('TokenPrismaRepository', () => {
  let repo: TokenPrismaRepository;
  let token: ReturnType<typeof makeMockPrismaService>['authToken'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authToken']);
    token = prisma.authToken as never;
    repo = new TokenPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (token.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (token.findUnique as jest.Mock).mockResolvedValue(prismaTokenRow());
    const t = await repo.findById(TEST_IDS.TOKEN_ID);
    expect(t!.userId.value).toBe(TEST_IDS.USER_ID);
    expect(t!.type.value).toBe('access');
  });

  it('findByJti delegates to findById', async () => {
    (token.findUnique as jest.Mock).mockResolvedValue(prismaTokenRow());
    expect(await repo.findByJti(TEST_IDS.TOKEN_ID)).not.toBeNull();
  });

  it('findByUserId returns list', async () => {
    (token.findMany as jest.Mock).mockResolvedValue([prismaTokenRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('save update path', async () => {
    (token.findUnique as jest.Mock).mockResolvedValue(prismaTokenRow());
    (token.update as jest.Mock).mockResolvedValue(prismaTokenRow());
    const entity = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(entity!);
    expect(token.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (token.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaTokenRow())
      .mockResolvedValueOnce(null);
    (token.create as jest.Mock).mockResolvedValue(prismaTokenRow());
    const entity = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(entity!);
    expect(token.create).toHaveBeenCalled();
  });

  it('delete uses update (soft delete)', async () => {
    (token.update as jest.Mock).mockResolvedValue(prismaTokenRow({ deletedAt: new Date() }));
    await repo.delete(TEST_IDS.TOKEN_ID);
    expect(token.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (token.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TOKEN_ID)).toBe(true);
  });

  it('findExpired queries', async () => {
    (token.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findExpired();
    expect(token.findMany).toHaveBeenCalled();
  });

  it('revokeAllByUserId count', async () => {
    (token.updateMany as jest.Mock).mockResolvedValue({ count: 5 });
    expect(await repo.revokeAllByUserId({ value: TEST_IDS.USER_ID } as never, 'logout')).toBe(5);
  });

  it('purge count', async () => {
    (token.deleteMany as jest.Mock).mockResolvedValue({ count: 10 });
    expect(await repo.purge(new Date().toISOString())).toBe(10);
  });

  it('findPaginated applies filters', async () => {
    (token.findMany as jest.Mock).mockResolvedValue([]);
    (token.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 10, filter: { userId: TEST_IDS.USER_ID, type: 'access' } });
    expect(token.findMany).toHaveBeenCalled();
  });

  it('getStats computes', async () => {
    (token.findMany as jest.Mock).mockResolvedValue([
      prismaTokenRow({ tokenType: 'access' }),
      prismaTokenRow({ id: TEST_IDS.TOKEN_ID_2, tokenType: 'refresh' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.byType['access']).toBe(1);
  });

  it('softDelete delegates to delete', async () => {
    (token.update as jest.Mock).mockResolvedValue(prismaTokenRow());
    await repo.softDelete(TEST_IDS.TOKEN_ID);
    expect(token.update).toHaveBeenCalled();
  });
});
