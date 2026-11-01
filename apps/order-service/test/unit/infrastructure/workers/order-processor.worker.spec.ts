import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderProcessorWorker } from '@infrastructure/workers/order-processor.worker';
import { OrderPrismaMapper } from '@infrastructure/mappers/order.prisma.mapper';
import type { PrismaOrderRow } from '@infrastructure/mappers/order.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderRow> = {}): PrismaOrderRow => ({
  id: 'order-1',
  orderNumber: 'ORD-2024-000001',
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
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('OrderProcessorWorker', () => {
  let worker: OrderProcessorWorker;
  let mockQueue: { registerWorker: jest.Mock };
  let mockRepo: { findByIdVO: jest.Mock };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    mockRepo = { findByIdVO: jest.fn() };
    worker = new OrderProcessorWorker(mockQueue as never, mockRepo as never);
  });

  type HandleFn = (payload: { orderId: string }) => Promise<unknown>;

  it('processes existing order', async () => {
    mockRepo.findByIdVO.mockResolvedValue(OrderPrismaMapper.toDomain(makeRow()));
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ orderId: 'order-1' });
    expect(result).toEqual({ processed: true, status: 'pending' });
  });

  it('returns skipped when order not found', async () => {
    mockRepo.findByIdVO.mockResolvedValue(null);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ orderId: 'missing' });
    expect(result).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('queue name + jobNames set correctly', () => {
    const qn = (worker as unknown as { queueName: string }).queueName;
    const jn = (worker as unknown as { jobNames: readonly string[] }).jobNames;
    expect(qn).toBe('order_processing');
    expect(jn).toEqual(['process-order']);
  });

  it('concurrency is 3', () => {
    const c = (worker as unknown as { concurrency: () => number }).concurrency.bind(worker);
    expect(c()).toBe(3);
  });
});
