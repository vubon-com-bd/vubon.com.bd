import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderReturnPrismaRepository } from '@infrastructure/repos/order-return.prisma.repository';
import type { PrismaOrderReturnRow } from '@infrastructure/mappers/order-return.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderReturnRow> = {}): PrismaOrderReturnRow => ({
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
  ...overrides,
});

describe('OrderReturnPrismaRepository', () => {
  let repo: OrderReturnPrismaRepository;
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
    repo = new OrderReturnPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByOrder('order-1');
    expect(result.length).toBe(1);
  });

  it('findAwaitingInspection filters by status', async () => {
    mockDelegate.findMany.mockResolvedValue([]);
    await repo.findAwaitingInspection();
    const call = mockDelegate.findMany.mock.calls[0][0] as { where: { status: string } };
    expect(call.where.status).toBe('received');
  });
});
