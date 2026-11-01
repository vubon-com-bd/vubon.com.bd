import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderTrackingPrismaRepository } from '@infrastructure/repos/order-tracking.prisma.repository';
import type { PrismaOrderTrackingRow } from '@infrastructure/mappers/order-tracking.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderTrackingRow> = {}): PrismaOrderTrackingRow => ({
  id: 'tracking-1',
  orderId: 'order-1',
  event: 'in_transit',
  message: 'In transit',
  location: 'Dhaka',
  latitude: null,
  longitude: null,
  trackingNumber: 'TRK-1',
  createdBy: 'system',
  metadata: null,
  occurredAt: new Date('2024-01-03T10:00:00Z'),
  createdAt: new Date('2024-01-03T10:00:00Z'),
  ...overrides,
});

describe('OrderTrackingPrismaRepository', () => {
  let repo: OrderTrackingPrismaRepository;
  let mockDelegate: Record<string, jest.Mock>;
  let mockPrisma: { getModel: jest.Mock };

  beforeEach(() => {
    mockDelegate = {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };
    mockPrisma = { getModel: jest.fn(() => mockDelegate) };
    repo = new OrderTrackingPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns list (ordered by occurredAt asc)', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByOrder('order-1');
    expect(result.length).toBe(1);
    expect(mockDelegate.findMany).toHaveBeenCalledWith({
      where: { orderId: 'order-1' },
      orderBy: { occurredAt: 'asc' },
    });
  });

  it('findLatestByOrder returns latest (desc)', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findLatestByOrder('order-1');
    expect(result?.id).toBe('tracking-1');
    expect(mockDelegate.findFirst).toHaveBeenCalledWith({
      where: { orderId: 'order-1' },
      orderBy: { occurredAt: 'desc' },
    });
  });

  it('findByTrackingNumber filters', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    await repo.findByTrackingNumber('TRK-1');
    expect(mockDelegate.findMany).toHaveBeenCalledWith({
      where: { trackingNumber: 'TRK-1' },
      orderBy: { occurredAt: 'asc' },
    });
  });
});
