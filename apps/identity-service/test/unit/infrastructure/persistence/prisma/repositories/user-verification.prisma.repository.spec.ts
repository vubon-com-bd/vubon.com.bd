/**
 * UserVerificationPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserVerificationPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-verification.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const userVerifRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  type: 'email',
  target: 'test@example.com',
  status: 'verified',
  attempts: 1,
  expiresAt: new Date(Date.now() + 86400000),
  verifiedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('UserVerificationPrismaRepository', () => {
  let repo: UserVerificationPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userVerification'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userVerification']);
    model = prisma.userVerification as never;
    repo = new UserVerificationPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(userVerifRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(userVerifRow());
    expect(await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(userVerifRow());
    expect(await repo.findByUserIdRaw(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([userVerifRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(userVerifRow());
    (model.update as jest.Mock).mockResolvedValue(userVerifRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(userVerifRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(userVerifRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('getStats computes', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([
      userVerifRow({ type: 'email', status: 'verified' }),
      userVerifRow({ id: TEST_IDS.USER_ID_2, type: 'phone', status: 'verified' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.emailVerifiedCount).toBe(1);
    expect(stats.phoneVerifiedCount).toBe(1);
  });

  it('findUnverifiedUsers queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findUnverifiedUsers();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(userVerifRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(userVerifRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
