/**
 * UserKycPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserKycPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-kyc.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const kycRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  status: 'pending',
  documents: [],
  submittedAt: new Date(),
  verifiedAt: null,
  rejectedAt: null,
  rejectionReason: null,
  expiresAt: null,
  reviewedBy: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('UserKycPrismaRepository', () => {
  let repo: UserKycPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userKyc'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userKyc']);
    model = prisma.userKyc as never;
    repo = new UserKycPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(kycRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByIdVO delegates', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(kycRow());
    expect(await repo.findByIdVO({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(kycRow());
    expect(await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(kycRow());
    expect(await repo.findByUserIdRaw(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([kycRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(kycRow());
    (model.update as jest.Mock).mockResolvedValue(kycRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(kycRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(kycRow());
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
      kycRow({ status: 'pending' }),
      kycRow({ id: TEST_IDS.USER_ID_2, status: 'verified' }),
      kycRow({ id: TEST_IDS.ROLE_ID, status: 'rejected' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(3);
    expect(stats.pendingCount).toBe(1);
    expect(stats.verifiedCount).toBe(1);
    expect(stats.rejectedCount).toBe(1);
  });

  it('findPending queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findPending(24);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findExpiring queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findExpiring(30);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(kycRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(kycRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
