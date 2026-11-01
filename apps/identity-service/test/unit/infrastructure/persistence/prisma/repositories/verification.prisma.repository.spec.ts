/**
 * VerificationPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { VerificationPrismaRepository } from '@infrastructure/persistence/prisma/repositories/verification.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const verificationRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.TOKEN_ID,
  userId: TEST_IDS.USER_ID,
  type: 'email',
  target: 'test@example.com',
  status: 'pending',
  code: '123456',
  attempts: 0,
  expiresAt: new Date(Date.now() + 300000),
  verifiedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('VerificationPrismaRepository', () => {
  let repo: VerificationPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userVerification'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userVerification']);
    model = prisma.userVerification as never;
    repo = new VerificationPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(verificationRow());
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).not.toBeNull();
  });

  it('findById null when deletedAt', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(verificationRow({ deletedAt: new Date() }));
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findByAuthId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([verificationRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([verificationRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findPendingByTarget returns null (stub)', async () => {
    expect(await repo.findPendingByTarget('test@x.com', 'email_verify')).toBeNull();
  });

  it('findLatestByAuthId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(verificationRow());
    expect(await repo.findLatestByAuthId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(verificationRow());
    (model.update as jest.Mock).mockResolvedValue(verificationRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(verificationRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(verificationRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('findPaginated result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    (model.count as jest.Mock).mockResolvedValue(0);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('getStats computes', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([
      verificationRow({ status: 'verified' }),
      verificationRow({ status: 'pending' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.verifiedCount).toBe(1);
    expect(stats.pendingCount).toBe(1);
  });

  it('findExpired queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findExpired();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findPendingOlderThan queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findPendingOlderThan(60);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('purge count', async () => {
    (model.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });
    expect(await repo.purge(new Date().toISOString())).toBe(5);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(verificationRow());
    await repo.delete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(verificationRow());
    await repo.softDelete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TOKEN_ID)).toBe(true);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([verificationRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });
});
