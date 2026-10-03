import { jest } from '@jest/globals';
import { OrderTrackingPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-tracking.prisma.repository.js';
import { TrackingStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { mockPrisma, UUID_ORDER, NOW_DATE } from './_prisma-mock.js';

const UUID_TRACK = 'tttttttt-tttt-4ttt-8ttt-tttttttttttt';

function trRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_TRACK, orderId: UUID_ORDER, event: 'order_placed',
    message: 'Order placed', location: null, latitude: null, longitude: null,
    trackingNumber: null, createdBy: null, metadata: null,
    occurredAt: NOW_DATE, createdAt: NOW_DATE, ...o,
  };
}

describe('OrderTrackingPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderTrackingPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new OrderTrackingPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.orderTracking.findUnique as jest.Mock).mockResolvedValue(trRow());
    expect((await repo.findById(UUID_TRACK))?.id).toBe(UUID_TRACK);
    (prisma.orderTracking.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_TRACK)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.orderTracking.findUnique as jest.Mock).mockResolvedValue(trRow());
    await repo.findByIdVO({ value: UUID_TRACK } as never);
    expect(prisma.orderTracking.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByTrackingNumber + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect(await repo.findByTrackingNumber('TRK-AAA')).toHaveLength(1);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByTrackingNumber('TRK-AAA')).toEqual([]);
  });
  it('findLatestByOrder + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect((await repo.findLatestByOrder(OrderIdVO.create(UUID_ORDER)))?.id).toBe(UUID_TRACK);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findLatestByOrder(OrderIdVO.create(UUID_ORDER))).toBeNull();
  });
  it('findByEvent + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect(await repo.findByEvent(OrderIdVO.create(UUID_ORDER), TrackingStatusVO.create('order_placed'))).toHaveLength(1);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByEvent(OrderIdVO.create(UUID_ORDER), TrackingStatusVO.create('order_placed'))).toEqual([]);
  });
  it('countByOrder + error', async () => {
    (prisma.orderTracking.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(5);
    (prisma.orderTracking.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(0);
  });
  it('findOldToPrune + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect(await repo.findOldToPrune(new Date().toISOString())).toHaveLength(1);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findOldToPrune(new Date().toISOString())).toEqual([]);
  });
  it('findAll + error', async () => {
    (prisma.orderTracking.findMany as jest.Mock).mockResolvedValue([trRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.orderTracking.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.orderTracking.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_TRACK)).toBe(true);
    (prisma.orderTracking.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_TRACK)).toBe(false);
  });
  it('save + error + delete', async () => {
    (prisma.orderTracking.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderTracking.create as jest.Mock).mockResolvedValue(trRow());
    const e = { id: UUID_TRACK, orderId: { value: UUID_ORDER },
      event: { value: 'order_placed' }, message: 'Order placed',
      location: undefined, latitude: undefined, longitude: undefined,
      trackingNumber: undefined, createdBy: undefined, metadata: undefined,
      occurredAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_TRACK);
    (prisma.orderTracking.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_TRACK } as never)).rejects.toThrow();

    (prisma.orderTracking.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });
    await repo.delete(UUID_TRACK);
    (prisma.orderTracking.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_TRACK)).resolves.toBeUndefined();
  });
});
