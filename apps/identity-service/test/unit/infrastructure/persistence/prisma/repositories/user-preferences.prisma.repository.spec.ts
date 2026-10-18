/**
 * UserPreferencesPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserPreferencesPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-preferences.prisma.repository.js';
import { makeMockPrismaService, prismaUserPreferencesRow, TEST_IDS } from '@fixtures/index.js';

describe('UserPreferencesPrismaRepository', () => {
  let repo: UserPreferencesPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userPreferences'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userPreferences']);
    model = prisma.userPreferences as never;
    repo = new UserPreferencesPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    expect(await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    expect(await repo.findByUserIdRaw(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaUserPreferencesRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    (model.update as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaUserPreferencesRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaUserPreferencesRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('findWithMarketing queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findWithMarketing();
    expect(model.findMany).toHaveBeenCalled();
  });
});
