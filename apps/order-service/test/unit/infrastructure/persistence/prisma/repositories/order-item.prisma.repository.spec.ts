import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderItemPrismaRepository } from '@infrastructure/repos/order-item.prisma.repository';
import { OrderItemPrismaMapper } from '@infrastructure/mappers/order-item.prisma.mapper';
import type { PrismaOrderItemRow } from '@infrastructure/mappers/order-item.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderItemRow> = {}): PrismaOrderItemRow => ({
  id: 'item-1',
  orderId: 'order-1',
  productId: 'prod-1',
  variantId: null,
  vendorId: null,
  sku: 'SKU-001',
  name: 'Product',
  imageUrl: null,
  type: 'product',
  status: 'pending',
  quantity: 1,
  unitPrice: 100,
  compareAtPrice: null,
  subtotal: 100,
  discountAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  total: 100,
  currency: 'BDT',
  attributes: null,
  notes: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('OrderItemPrismaRepository', () => {
  let repo: OrderItemPrismaRepository;
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
    repo = new OrderItemPrismaRepository(mockPrisma as never);
  });

  it('findById returns entity', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findById('item-1');
    expect(result?.id).toBe('item-1');
  });

  it('findByOrder returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow(), makeRow({ id: 'item-2' })]);
    const result = await repo.findByOrder('order-1');
    expect(result.length).toBe(2);
  });

  it('findByProduct filters', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    await repo.findByProduct('prod-1');
    expect(mockDelegate.findMany).toHaveBeenCalledWith({
      where: { productId: 'prod-1', deletedAt: null },
    });
  });

  it('save creates when not exists', async () => {
    mockDelegate.findUnique.mockResolvedValue(null);
    mockDelegate.create.mockResolvedValue(makeRow());
    const entity = OrderItemPrismaMapper.toDomain(makeRow());
    const saved = await repo.save(entity);
    expect(saved.id).toBe('item-1');
    expect(mockDelegate.create).toHaveBeenCalled();
  });
});
