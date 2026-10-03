import { jest } from '@jest/globals';
import { OrderFulfillmentPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-fulfillment.prisma.repository.js';
import { FulfillmentStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { mockPrisma, UUID_ORDER, UUID_ITEM, UUID_VENDOR, NOW_DATE } from './_prisma-mock.js';

const UUID_FULFILL = 'ffffffff-ffff-4fff-8fff-ffffffffffff';

function fRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_FULFILL, orderId: UUID_ORDER, vendorId: UUID_VENDOR,
    status: 'unfulfilled', type: 'standard', itemIds: [UUID_ITEM],
    trackingNumber: null, courierId: null, warehouseId: null,
    shippingCost: null, currency: 'BDT', fulfilledAt: null, deliveredAt: null,
    notes: null, createdAt: NOW_DATE, updatedAt: NOW_DATE,
    ...o,
  };
}

describe('OrderFulfillmentPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderFulfillmentPrismaRepository;
  beforeEach(() => { prisma = mockPrisma(); repo = new OrderFulfillmentPrismaRepository(prisma as never); });

  it('findById + error', async () => {
    (prisma.orderFulfillment.findUnique as jest.Mock).mockResolvedValue(fRow());
    expect((await repo.findById(UUID_FULFILL))?.id).toBe(UUID_FULFILL);
    (prisma.orderFulfillment.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_FULFILL)).toBeNull();
  });
  it('findByIdVO', async () => {
    (prisma.orderFulfillment.findUnique as jest.Mock).mockResolvedValue(fRow());
    await repo.findByIdVO({ value: UUID_FULFILL } as never);
    expect(prisma.orderFulfillment.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId + error', async () => {
    (prisma.orderFulfillment.findMany as jest.Mock).mockResolvedValue([fRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
    (prisma.orderFulfillment.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByVendorId + error', async () => {
    (prisma.orderFulfillment.findMany as jest.Mock).mockResolvedValue([fRow()]);
    expect(await repo.findByVendorId(VendorIdVO.create(UUID_VENDOR))).toHaveLength(1);
    (prisma.orderFulfillment.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByVendorId(VendorIdVO.create(UUID_VENDOR))).toEqual([]);
  });
  it('findByStatus + error', async () => {
    (prisma.orderFulfillment.findMany as jest.Mock).mockResolvedValue([fRow()]);
    expect(await repo.findByStatus(FulfillmentStatusVO.unfulfilled())).toHaveLength(1);
    (prisma.orderFulfillment.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(FulfillmentStatusVO.unfulfilled())).toEqual([]);
  });
  it('findByTrackingNumber + error', async () => {
    (prisma.orderFulfillment.findFirst as jest.Mock).mockResolvedValue(fRow());
    expect((await repo.findByTrackingNumber('TRK-AAA'))?.id).toBe(UUID_FULFILL);
    (prisma.orderFulfillment.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByTrackingNumber('TRK-AAA')).toBeNull();
  });
  it('findActiveByOrder + error', async () => {
    (prisma.orderFulfillment.findFirst as jest.Mock).mockResolvedValue(fRow());
    expect((await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER)))?.id).toBe(UUID_FULFILL);
    (prisma.orderFulfillment.findFirst as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findActiveByOrder(OrderIdVO.create(UUID_ORDER))).toBeNull();
  });
  it('countByOrder + error', async () => {
    (prisma.orderFulfillment.count as jest.Mock).mockResolvedValue(3);
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(3);
    (prisma.orderFulfillment.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(0);
  });
  it('findAll + error', async () => {
    (prisma.orderFulfillment.findMany as jest.Mock).mockResolvedValue([fRow()]);
    expect(await repo.findAll()).toHaveLength(1);
    (prisma.orderFulfillment.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('exists + error', async () => {
    (prisma.orderFulfillment.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_FULFILL)).toBe(true);
    (prisma.orderFulfillment.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_FULFILL)).toBe(false);
  });
  it('save + error', async () => {
    (prisma.orderFulfillment.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderFulfillment.create as jest.Mock).mockResolvedValue(fRow());
    const e = { id: UUID_FULFILL, orderId: { value: UUID_ORDER }, vendorId: { value: UUID_VENDOR },
      status: { value: 'unfulfilled' }, type: 'standard', itemIds: [{ value: UUID_ITEM }],
      trackingNumber: undefined, courierId: undefined, warehouseId: undefined,
      shippingCost: undefined, currency: 'BDT', fulfilledAt: undefined, deliveredAt: undefined,
      notes: undefined, updatedAt: NOW_DATE.toISOString() };
    expect((await repo.save(e as never)).id).toBe(UUID_FULFILL);
    (prisma.orderFulfillment.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_FULFILL } as never)).rejects.toThrow();
  });
  it('delete + error', async () => {
    (prisma.orderFulfillment.update as jest.Mock).mockResolvedValue(fRow());
    await repo.delete(UUID_FULFILL);
    (prisma.orderFulfillment.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_FULFILL)).resolves.toBeUndefined();
  });
});
