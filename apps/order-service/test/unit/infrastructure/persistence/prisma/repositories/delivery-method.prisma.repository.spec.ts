import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryMethodPrismaRepository } from '@infrastructure/repos/delivery-method.prisma.repository';
import type { PrismaDeliveryMethodRow } from '@infrastructure/mappers/delivery-method.prisma.mapper';

const makeRow = (overrides: Partial<PrismaDeliveryMethodRow> = {}): PrismaDeliveryMethodRow => ({
  id: 'method-1',
  name: 'Standard',
  type: 'standard',
  carrier: null,
  baseCost: 60,
  currency: 'BDT',
  estimatedDays: 3,
  isActive: true,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('DeliveryMethodPrismaRepository', () => {
  let repo: DeliveryMethodPrismaRepository;
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
    repo = new DeliveryMethodPrismaRepository(mockPrisma as never);
  });

  it('findActive filters by isActive', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findActive();
    expect(result.length).toBe(1);
    expect(mockDelegate.findMany).toHaveBeenCalledWith({ where: { isActive: true } });
  });

  it('findFree filters by baseCost 0', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow({ baseCost: 0 })]);
    const result = await repo.findFree();
    expect(result.length).toBe(1);
  });
});
