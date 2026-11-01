import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryTrackerWorker } from '@infrastructure/workers/delivery-tracker.worker';
import { DeliveryPrismaMapper } from '@infrastructure/mappers/delivery.prisma.mapper';
import type { PrismaDeliveryRow } from '@infrastructure/mappers/delivery.prisma.mapper';

const makeRow = (overrides: Partial<PrismaDeliveryRow> = {}): PrismaDeliveryRow => ({
  id: 'delivery-1',
  orderId: 'order-1',
  deliveryMethodId: null,
  status: 'in_transit',
  type: 'standard',
  trackingNumber: 'TRK-1',
  courierId: null,
  estimatedAt: null,
  deliveredAt: null,
  attempts: 0,
  notes: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('DeliveryTrackerWorker', () => {
  let worker: DeliveryTrackerWorker;
  let mockQueue: { registerWorker: jest.Mock };
  let mockRepo: { findByTrackingNumber: jest.Mock };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    mockRepo = { findByTrackingNumber: jest.fn() };
    worker = new DeliveryTrackerWorker(mockQueue as never, mockRepo as never);
  });

  type HandleFn = (payload: {
    trackingNumber: string;
    orderId: string;
  }) => Promise<unknown>;

  it('skips when delivery not found', async () => {
    mockRepo.findByTrackingNumber.mockResolvedValue(null);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    expect(await handle({ trackingNumber: 'TRK-1', orderId: 'order-1' })).toEqual({
      skipped: true,
      reason: 'not_found',
    });
  });

  it('tracks delivery when found', async () => {
    mockRepo.findByTrackingNumber.mockResolvedValue(
      DeliveryPrismaMapper.toDomain(makeRow()),
    );
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ trackingNumber: 'TRK-1', orderId: 'order-1' });
    expect(result).toEqual({ tracked: true, status: 'in_transit' });
  });
});
