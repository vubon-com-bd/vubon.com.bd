/**
 * AuthRecoveryCodePrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthRecoveryCodePrismaRepository } from '@infrastructure/persistence/prisma/repositories/auth-recovery-code.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const recoveryRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.TOKEN_ID,
  userId: TEST_IDS.USER_ID,
  code: 'ABCD1234EF',
  status: 'active',
  usedAt: null,
  usedFromIp: null,
  generatedAt: new Date(),
  expiresAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('AuthRecoveryCodePrismaRepository', () => {
  let repo: AuthRecoveryCodePrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authRecoveryCode'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authRecoveryCode']);
    model = prisma.authRecoveryCode as never;
    repo = new AuthRecoveryCodePrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(recoveryRow());
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).not.toBeNull();
  });

  it('findByAuthId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([recoveryRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findActiveByAuthId queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([recoveryRow()]);
    await repo.findActiveByAuthId({ value: TEST_IDS.USER_ID } as never);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('countActiveByAuthId returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countActiveByAuthId({ value: TEST_IDS.USER_ID } as never)).toBe(5);
  });

  it('findByCode queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(recoveryRow());
    await repo.findByCode({ value: TEST_IDS.USER_ID } as never, 'ABCD1234EF');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([recoveryRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(recoveryRow());
    (model.update as jest.Mock).mockResolvedValue(recoveryRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(recoveryRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(recoveryRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('revokeAllByAuthId count', async () => {
    (model.updateMany as jest.Mock).mockResolvedValue({ count: 5 });
    expect(await repo.revokeAllByAuthId({ value: TEST_IDS.USER_ID } as never)).toBe(5);
  });

  it('deleteAllByAuthId count', async () => {
    (model.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });
    expect(await repo.deleteAllByAuthId({ value: TEST_IDS.USER_ID } as never)).toBe(5);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(recoveryRow());
    await repo.delete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(recoveryRow());
    await repo.softDelete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TOKEN_ID)).toBe(true);
  });
});
