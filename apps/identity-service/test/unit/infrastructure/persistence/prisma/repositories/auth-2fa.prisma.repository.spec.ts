/**
 * Auth2FaPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Auth2FaPrismaRepository } from '@infrastructure/persistence/prisma/repositories/auth-2fa.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const twoFaRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  method: 'totp',
  backupMethods: [] as string[],
  secret: 'JBSWY3DPEHPK3PXP',
  verified: true,
  status: 'enabled',
  verifiedAt: new Date(),
  enabledAt: new Date(),
  disabledAt: null,
  failedAttempts: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('Auth2FaPrismaRepository', () => {
  let repo: Auth2FaPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['auth2Fa'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['auth2Fa']);
    model = prisma.auth2Fa as never;
    repo = new Auth2FaPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(twoFaRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByAuthId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(twoFaRow());
    expect(await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByAuthIdRaw delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(twoFaRow());
    expect(await repo.findByAuthIdRaw(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findEnabledByAuthId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(twoFaRow());
    await repo.findEnabledByAuthId({ value: TEST_IDS.USER_ID } as never);
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([twoFaRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(twoFaRow());
    (model.update as jest.Mock).mockResolvedValue(twoFaRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(twoFaRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(twoFaRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(twoFaRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(twoFaRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('findLocked queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findLocked();
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findUnverified queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findUnverified(24);
    expect(model.findMany).toHaveBeenCalled();
  });
});
