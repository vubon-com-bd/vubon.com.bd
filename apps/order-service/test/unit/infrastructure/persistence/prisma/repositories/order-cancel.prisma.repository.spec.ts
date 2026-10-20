import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderCancelPrismaRepository } from '@infrastructure/repos/order-cancel.prisma.repository';
import type { PrismaOrderCancelRow } from '@infrastructure/mappers/order-cancel.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderCancelRow> = {}): PrismaOrderCancelRow => ({
  id: 'cancel-1',
  orderId: 'order-1',
  reason: 'customer_request',
  status: 'requested',
  requestedBy: 'user-1',
  approvedBy: null,
  notes: null,
  refundAmount: null,
  currency: 'BDT',
  restockInventory: true,
  requestedAt: new Date('2024-01-02T10:00:00Z'),
  processedAt: null,
  createdAt: new Date('2024-01-02T10:00:00Z'),
  updatedAt: new Date('2024-01-02T10:00:00Z'),
  ...overrides,
});

describe('OrderCancelPrismaRepository', () => {
  let repo: OrderCancelPrismaRepository;
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
    repo = new OrderCancelPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByOrder('order-1');
    expect(result.length).toBe(1);
  });

  it('findPendingOlderThan filters by status and time', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    await repo.findPendingOlderThan(30);
    const call = mockDelegate.findMany.mock.calls[0][0] as { where: { status: string } };
    expect(call.where.status).toBe('requested');
  });
});
