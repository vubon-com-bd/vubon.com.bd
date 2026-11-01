/**
 * BackupCodePrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BackupCodePrismaRepository } from '@infrastructure/persistence/prisma/repositories/backup-code.prisma.repository.js';
import { makeMockPrismaService, prismaRecoveryCodeRow, TEST_IDS } from '@fixtures/index.js';

describe('BackupCodePrismaRepository', () => {
  let repo: BackupCodePrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authRecoveryCode'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authRecoveryCode']);
    model = prisma.authRecoveryCode as never;
    repo = new BackupCodePrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    expect(await repo.findById(TEST_IDS.TOKEN_ID)).not.toBeNull();
  });

  it('findByAuthId returns list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaRecoveryCodeRow()]);
    expect((await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findUnusedByAuthId queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findUnusedByAuthId({ value: TEST_IDS.USER_ID } as never);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('countUnusedByAuthId returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countUnusedByAuthId({ value: TEST_IDS.USER_ID } as never)).toBe(5);
  });

  it('findByCode queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    await repo.findByCode({ value: TEST_IDS.USER_ID } as never, 'ABCD1234');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('save always calls create', async () => {
    (model.create as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    const entity = await repo.findById(TEST_IDS.TOKEN_ID);
    (model.findUnique as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    const e = await repo.findById(TEST_IDS.TOKEN_ID);
    void entity;
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('findPaginated returns result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaRecoveryCodeRow()]);
    (model.count as jest.Mock).mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
  });

  it('deleteAllByAuthId count', async () => {
    (model.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });
    expect(await repo.deleteAllByAuthId({ value: TEST_IDS.USER_ID } as never)).toBe(5);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    await repo.delete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaRecoveryCodeRow());
    await repo.softDelete(TEST_IDS.TOKEN_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.TOKEN_ID)).toBe(true);
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaRecoveryCodeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });
});
