/**
 * UserProfilePrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserProfilePrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-profile.prisma.repository.js';
import { makeMockPrismaService, prismaUserProfileRow, TEST_IDS } from '@fixtures/index.js';

describe('UserProfilePrismaRepository', () => {
  let repo: UserProfilePrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userProfile'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userProfile']);
    model = prisma.userProfile as never;
    repo = new UserProfilePrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId queries findFirst', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    expect(await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findByUserIdRaw delegates', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    expect(await repo.findByUserIdRaw(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaUserProfileRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    (model.update as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock)
      .mockResolvedValueOnce(prismaUserProfileRow())
      .mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaUserProfileRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });

  it('findIncomplete returns [] (stub)', async () => {
    const result = await repo.findIncomplete();
    expect(result).toEqual([]);
  });
});
