import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderTimeoutWorker } from '@infrastructure/workers/order-timeout.worker';
import { OrderPrismaMapper } from '@infrastructure/mappers/order.prisma.mapper';
import type { PrismaOrderRow } from '@infrastructure/mappers/order.prisma.mapper';

const makeRow = (id: string): PrismaOrderRow => ({
  id,
  orderNumber: `ORD-${id}`,
  customerId: 'cust-1',
  vendorIds: [],
  type: 'regular',
  status: 'pending',
  priority: 'normal',
  subtotal: 1000,
  discountAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  total: 1000,
  currency: 'BDT',
  paymentId: null,
  paymentStatus: null,
  paymentMethod: null,
  shippingMethod: null,
  trackingNumber: null,
  notes: null,
  customerNotes: null,
  confirmedAt: null,
  shippedAt: null,
  deliveredAt: null,
  cancelledAt: null,
  completedAt: null,
  version: 0,
  createdAt: new Date('2020-01-01T10:00:00Z'),
  updatedAt: new Date('2020-01-01T10:00:00Z'),
  deletedAt: null,
});

describe('OrderTimeoutWorker', () => {
  let worker: OrderTimeoutWorker;
  let mockQueue: { registerWorker: jest.Mock };
  let mockRepo: {
    findStalePending: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    mockRepo = {
      findStalePending: jest.fn(),
      save: jest.fn().mockResolvedValue(undefined),
    };
    worker = new OrderTimeoutWorker(mockQueue as never, mockRepo as never);
  });

  type HandleFn = (payload: { orderId?: string }) => Promise<unknown>;

  it('cancels specific order by id when found', async () => {
    const entity = OrderPrismaMapper.toDomain(makeRow('order-1'));
    mockRepo.findStalePending.mockResolvedValue([entity]);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ orderId: 'order-1' });
    expect(result).toEqual({ cancelled: true });
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('skips specific order when not in stale list', async () => {
    mockRepo.findStalePending.mockResolvedValue([]);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ orderId: 'order-x' });
    expect(result).toEqual({ skipped: true });
  });

  it('batch cancels all stale orders', async () => {
    const orders = [
      OrderPrismaMapper.toDomain(makeRow('order-1')),
      OrderPrismaMapper.toDomain(makeRow('order-2')),
    ];
    mockRepo.findStalePending.mockResolvedValue(orders);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({});
    expect(result).toEqual({ cancelledCount: 2 });
    expect(mockRepo.save).toHaveBeenCalledTimes(2);
  });

  it('concurrency is 1', () => {
    const c = (worker as unknown as { concurrency: () => number }).concurrency.bind(worker);
    expect(c()).toBe(1);
  });
});
