/**
 * DevicePrismaRepository unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DevicePrismaRepository } from '@infrastructure/persistence/prisma/repositories/device.prisma.repository.js';
import { makeMockPrismaService, prismaDeviceRow, TEST_IDS } from '@fixtures/index.js';

describe('DevicePrismaRepository', () => {
  let repo: DevicePrismaRepository;
  let model: ReturnType<typeof makeMockPrismaService>['authDevice'];

  beforeEach(() => {
    jest.clearAllMocks();
    const prisma = makeMockPrismaService(['authDevice']);
    model = prisma.authDevice as never;
    repo = new DevicePrismaRepository(prisma as never);
  });

  it('findById null on miss', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(TEST_IDS.DEVICE_ID)).toBeNull();
  });

  it('findById maps row', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaDeviceRow());
    expect(await repo.findById(TEST_IDS.DEVICE_ID)).not.toBeNull();
  });

  it('findByUserId list', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([prismaDeviceRow()]);
    expect((await repo.findByUserId({ value: TEST_IDS.USER_ID } as never)).length).toBe(1);
  });

  it('findByFingerprint queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaDeviceRow());
    await repo.findByFingerprint({ value: TEST_IDS.USER_ID } as never, 'fp');
    expect(model.findFirst).toHaveBeenCalled();
  });

  it('countByUserId returns count', async () => {
    (model.count as jest.Mock).mockResolvedValue(3);
    expect(await repo.countByUserId({ value: TEST_IDS.USER_ID } as never)).toBe(3);
  });

  it('save update path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValue(prismaDeviceRow());
    (model.update as jest.Mock).mockResolvedValue(prismaDeviceRow());
    const e = await repo.findById(TEST_IDS.DEVICE_ID);
    await repo.save(e!);
    expect(model.update).toHaveBeenCalled();
  });

  it('save create path', async () => {
    (model.findUnique as jest.Mock).mockResolvedValueOnce(prismaDeviceRow()).mockResolvedValueOnce(null);
    (model.create as jest.Mock).mockResolvedValue(prismaDeviceRow());
    const e = await repo.findById(TEST_IDS.DEVICE_ID);
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
      prismaDeviceRow({ type: 'desktop', status: 'trusted' }),
      prismaDeviceRow({ type: 'mobile', status: 'untrusted' }),
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.trustedCount).toBe(1);
  });

  it('findStale queries', async () => {
    (model.findMany as jest.Mock).mockResolvedValue([]);
    await repo.findStale(90);
    expect(model.findMany).toHaveBeenCalled();
  });

  it('findOldestByUserId queries', async () => {
    (model.findFirst as jest.Mock).mockResolvedValue(prismaDeviceRow());
    expect(await repo.findOldestByUserId({ value: TEST_IDS.USER_ID } as never)).not.toBeNull();
  });

  it('findExpiredTrust returns [] (stub)', async () => {
    const result = await repo.findExpiredTrust();
    expect(result).toEqual([]);
  });

  it('removeExpiredTrust count', async () => {
    (model.updateMany as jest.Mock).mockResolvedValue({ count: 2 });
    expect(await repo.removeExpiredTrust()).toBe(2);
  });

  it('delete uses update', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaDeviceRow());
    await repo.delete(TEST_IDS.DEVICE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('softDelete delegates', async () => {
    (model.update as jest.Mock).mockResolvedValue(prismaDeviceRow());
    await repo.softDelete(TEST_IDS.DEVICE_ID);
    expect(model.update).toHaveBeenCalled();
  });

  it('exists count>0', async () => {
    (model.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(TEST_IDS.DEVICE_ID)).toBe(true);
  });
});
