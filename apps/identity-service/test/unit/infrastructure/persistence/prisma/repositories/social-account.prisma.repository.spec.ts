/**
 * SocialAccountPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SocialAccountPrismaRepository } from '@infrastructure/persistence/prisma/repositories/social-account.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const socialRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  provider: 'google',
  providerUserId: 'g-12345',
  email: 'test@example.com',
  name: 'Test',
  avatarUrl: null,
  lastUsedAt: null,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('SocialAccountPrismaRepository', () => {
  let repo: SocialAccountPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authSocial'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authSocial']);
    model = prisma.authSocial as never;
    repo = new SocialAccountPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(socialRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([socialRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByProviderAndProviderUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(socialRow());
    await repo.findByProviderAndProviderUserId('google', 'g-12345');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findByUserIdAndProvider queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(socialRow());
    await repo.findByUserIdAndProvider({ value: TEST_IDS.USER_ID } as never, 'google');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([socialRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(socialRow());
    (model.update as jest.Mock).mockResolvedValue(socialRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(socialRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(socialRow());
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
      socialRow({ provider: 'google', isActive: true }),
      socialRow({ id: TEST_IDS.USER_ID_2, provider: 'github', isActive: false }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.activeCount).toBe(1);
  });

  it('findInactive queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findInactive(90);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(socialRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(socialRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
