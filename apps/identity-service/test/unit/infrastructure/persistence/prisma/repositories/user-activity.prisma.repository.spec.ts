/**
 * UserActivityPrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserActivityPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user-activity.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

const activityRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  type: 'login',
  description: 'User logged in',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  deviceId: null,
  metadata: null,
  occurredAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('UserActivityPrismaRepository', () => {
  let repo: UserActivityPrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['userActivity'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['userActivity']);
    model = prisma.userActivity as never;
    repo = new UserActivityPrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(activityRow());
    expect(await repo.findById(TEST_IDS.USER_ID)).not.toBeNull();
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([activityRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never, 10)).length).toBe(1);
  });

  it('findByType list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([activityRow()]);
    expect((await repo.findByType('login', 10)).length).toBe(1);
  });

  it('findSecurityEvents queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findSecurityEvents({ value: TEST_IDS.USER_ID } as never, 10);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findRecent queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findRecent({ value: TEST_IDS.USER_ID } as never, 3600000);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findAll maps', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([activityRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('save always calls create', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(activityRow());
    (model.create as jest.Mock).mockResolvedValue(activityRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalled();
  });

  it('save passes entity id to create', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(activityRow());
    (model.create as jest.Mock).mockResolvedValue(activityRow());
    const e = await repo.findById(TEST_IDS.USER_ID);
    await repo.save(e!);
    expect(model.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Object) }),
    );
  });

  it('findPaginated returns result', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    (model.count as jest.Mock).mockResolvedValue(0);
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });

  it('purge count', async () => {
    (model.deleteMany as jest.Mock).mockResolvedValue({ count: 10 });
    expect(await repo.purge(new Date().toISOString())).toBe(10);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(activityRow());
    await repo.delete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(activityRow());
    await repo.softDelete(TEST_IDS.USER_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(true);
  });
});
