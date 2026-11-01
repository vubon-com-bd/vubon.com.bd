import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryPrismaRepository } from '@infrastructure/repos/delivery.prisma.repository';
import type { PrismaDeliveryRow } from '@infrastructure/mappers/delivery.prisma.mapper';

const makeRow = (overrides: Partial<PrismaDeliveryRow> = {}): PrismaDeliveryRow => ({
  id: 'delivery-1',
  orderId: 'order-1',
  deliveryMethodId: 'method-1',
  status: 'pending',
  type: 'standard',
  trackingNumber: null,
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

describe('DeliveryPrismaRepository', () => {
  let repo: DeliveryPrismaRepository;
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
    repo = new DeliveryPrismaRepository(mockPrisma as never);
  });

  it('findById returns entity', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findById('delivery-1');
    expect(result?.id).toBe('delivery-1');
  });

  it('findByTrackingNumber filters', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow({ trackingNumber: 'TRK-1' }));
    const result = await repo.findByTrackingNumber('TRK-1');
    expect(result?.id).toBe('delivery-1');
  });

  it('findPaginated returns result', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    mockDelegate.count.mockResolvedValue(1);
    const result = await repo.findPaginated({ page: 1, limit: 10 });
    expect(result.total).toBe(1);
  });
});
