import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderFulfillmentPrismaRepository } from '@infrastructure/repos/order-fulfillment.prisma.repository';
import type { PrismaOrderFulfillmentRow } from '@infrastructure/mappers/order-fulfillment.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderFulfillmentRow> = {}): PrismaOrderFulfillmentRow => ({
  id: 'fulfillment-1',
  orderId: 'order-1',
  vendorId: 'vendor-1',
  status: 'unfulfilled',
  type: 'standard',
  itemIds: ['item-1'],
  trackingNumber: null,
  courierId: null,
  warehouseId: 'wh-1',
  shippingCost: null,
  currency: 'BDT',
  fulfilledAt: null,
  deliveredAt: null,
  notes: null,
  createdAt: new Date('2024-01-03T10:00:00Z'),
  updatedAt: new Date('2024-01-03T10:00:00Z'),
  ...overrides,
});

describe('OrderFulfillmentPrismaRepository', () => {
  let repo: OrderFulfillmentPrismaRepository;
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
    repo = new OrderFulfillmentPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByOrder('order-1');
    expect(result.length).toBe(1);
  });

  it('findByVendor filters', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    await repo.findByVendor('vendor-1');
    expect(mockDelegate.findMany).toHaveBeenCalledWith({ where: { vendorId: 'vendor-1' } });
  });

  it('findAwaitingFulfillment filters by status', async () => {
    mockDelegate.findMany.mockResolvedValue([]);
    await repo.findAwaitingFulfillment();
    const call = mockDelegate.findMany.mock.calls[0][0] as { where: { status: { in: string[] } } };
    expect(call.where.status.in).toEqual(['unfulfilled', 'pending']);
  });
});
