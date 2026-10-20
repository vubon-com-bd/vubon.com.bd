import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ReturnProcessorWorker } from '@infrastructure/workers/return-processor.worker';
import { OrderReturnPrismaMapper } from '@infrastructure/mappers/order-return.prisma.mapper';
import type { PrismaOrderReturnRow } from '@infrastructure/mappers/order-return.prisma.mapper';

const makeRow = (): PrismaOrderReturnRow => ({
  id: 'return-1',
  orderId: 'order-1',
  customerId: 'cust-1',
  status: 'requested',
  reason: 'defective',
  itemIds: ['item-1'],
  images: [],
  notes: null,
  refundAmount: null,
  restockFee: null,
  currency: 'BDT',
  requestedAt: new Date('2024-01-05T10:00:00Z'),
  approvedAt: null,
  pickedUpAt: null,
  receivedAt: null,
  refundedAt: null,
  closedAt: null,
  createdAt: new Date('2024-01-05T10:00:00Z'),
  updatedAt: new Date('2024-01-05T10:00:00Z'),
});

describe('ReturnProcessorWorker', () => {
  let worker: ReturnProcessorWorker;
  let mockQueue: { registerWorker: jest.Mock };
  let mockRepo: { findById: jest.Mock };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    mockRepo = { findById: jest.fn() };
    worker = new ReturnProcessorWorker(mockQueue as never, mockRepo as never);
  });

  type HandleFn = (payload: { returnId: string }) => Promise<unknown>;

  it('skips when return not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    expect(await handle({ returnId: 'x' })).toEqual({ skipped: true });
  });

  it('processes return when found', async () => {
    mockRepo.findById.mockResolvedValue(OrderReturnPrismaMapper.toDomain(makeRow()));
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    expect(await handle({ returnId: 'return-1' })).toEqual({ processed: true });
  });

  it('concurrency is 2', () => {
    const c = (worker as unknown as { concurrency: () => number }).concurrency.bind(worker);
    expect(c()).toBe(2);
  });
});
