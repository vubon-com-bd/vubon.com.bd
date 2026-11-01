/**
 * MfaPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { MfaPrismaRepository } from '@infrastructure/persistence/prisma/repositories/mfa.prisma.repository.js';
import { makeMockPrismaService, prismaMfaRow, TEST_IDS } from '@fixtures/index.js';

describe('MfaPrismaRepository', () => {
  let repo: MfaPrismaRepository;
  let mfa: ReturnType<typeof makeMockPrismaService>['authMfa'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authMfa']);
    mfa = prisma.authMfa as never;
    repo = new MfaPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (mfa.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.MFA_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (mfa.findUnique as jest.Mock).mockResolvedValue(prismaMfaRow());
    const e = await repo.findById(TEST_IDS.MFA_ID);
    expect(e!.method.value).toBe('totp');
  });

  it('findByAuthId returns list', async () => {
    (mfa.findMany as jest.Mock).mockResolvedValue([prismaMfaRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.AUTH_ID } as never)).length).toBe(1);
  });

  it('findPrimaryByAuthId uses findFirst', async () => {
    (mfa.findFirst as jest.Mock).mockResolvedValue(prismaMfaRow());
    expect(await repo.findPrimaryByAuthId({ value: TEST_IDS.AUTH_ID } as never)).not.toBeNull();
  });

  it('findEnabledByAuthId queries', async () => {
    (mfa.findFirst as jest.Mock).mockResolvedValue(prismaMfaRow());
    await repo.findEnabledByAuthId({ value: TEST_IDS.AUTH_ID } as never);
    expect(mfa.findFirst).toHaveBeenCalled();
  });

  it('save update path', async () => {
    (mfa.findUnique as jest.Mock).mockResolvedValue(prismaMfaRow());
    (mfa.update as jest.Mock).mockResolvedValue(prismaMfaRow());
    const e = await repo.findById(TEST_IDS.MFA_ID);
    await repo.save(e!);
    expect(mfa.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (mfa.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaMfaRow())
      .mockResolvedValueOnce(null);
    (mfa.create as jest.Mock).mockResolvedValue(prismaMfaRow());
    const e = await repo.findById(TEST_IDS.MFA_ID);
    await repo.save(e!);
    expect(mfa.create).toHaveBeenCalled();
  });

  it('findPaginated applies filters', async () => {
    (mfa.findMany as jest.Mock).mockResolvedValue([]);
    (mfa.count as jest.Mock).mockResolvedValue(0);
    await repo.findPaginated({ page: 1, limit: 10, filter: { authId: TEST_IDS.AUTH_ID, method: 'totp' } });
    expect(mfa.findMany).toHaveBeenCalled();
  });

  it('getStats computes via enabledAt/lastVerifiedAt', async () => {
    const past = new Date(Date.now() - 86400000);
    (mfa.findMany as jest.Mock).mockResolvedValue([
      prismaMfaRow({ type: 'totp', enabledAt: past, lastVerifiedAt: past }),
      prismaMfaRow({
        id: TEST_IDS.MFA_ID_2,
        type: 'sms',
        enabledAt: null,
        lastVerifiedAt: null,
      }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.enabledCount).toBe(1);
  });

  it('findUnverified queries', async () => {
    (mfa.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findUnverified(24);
    expect(mfa.findMany).toHaveBeenCalled();
  });

  it('findFailing returns []', async () => {
    expect(await repo.findFailing(3)).toEqual([]);
  });

  it('delete uses update', async () => {
    (mfa.update as jest.Mock).mockResolvedValue(prismaMfaRow({ deletedAt: new Date() }));
    await repo.delete(TEST_IDS.MFA_ID);
    expect(mfa.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: TEST_IDS.MFA_ID } }),
    );
  });

  it('softDelete delegates to delete', async () => {
    (mfa.update as jest.Mock).mockResolvedValue(prismaMfaRow());
    await repo.softDelete(TEST_IDS.MFA_ID);
    expect(mfa.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (mfa.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.MFA_ID)).toBe(true);
  });
});
