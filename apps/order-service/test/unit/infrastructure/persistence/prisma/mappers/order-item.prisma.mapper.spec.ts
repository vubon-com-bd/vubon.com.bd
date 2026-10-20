import { describe, it, expect } from '@jest/globals';
import { OrderItemPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/order-item.prisma.mapper.js';
import type { PrismaOrderItemRow } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/order-item.prisma.mapper.js';

const makeRow = (overrides: Partial<PrismaOrderItemRow> = {}): PrismaOrderItemRow => ({
  id: 'item-1',
  orderId: 'order-1',
  productId: 'prod-1',
  variantId: 'var-1',
  vendorId: 'vendor-1',
  sku: 'SKU-001',
  name: 'Test Product',
  imageUrl: null,
  type: 'product',
  status: 'pending',
  quantity: 2,
  unitPrice: 500,
  compareAtPrice: null,
  subtotal: 1000,
  discountAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  total: 1000,
  currency: 'BDT',
  attributes: null,
  notes: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('OrderItemPrismaMapper', () => {
  it('maps row to OrderItemEntity', () => {
    const entity = OrderItemPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('item-1');
    expect(entity.orderId.value).toBe('order-1');
    expect(entity.productId.value).toBe('prod-1');
    expect(entity.vo.variantId?.value).toBe('var-1');
    expect(entity.vo.vendorId?.value).toBe('vendor-1');
    expect(entity.vo.quantity.value).toBe(2);
    expect(entity.vo.unitPrice.amount).toBe(500);
    expect(entity.status.value).toBe('pending');
    expect(entity.lineTotal).toBe(1000);
  });

  it('handles null variantId and vendorId', () => {
    const entity = OrderItemPrismaMapper.toDomain(
      makeRow({ variantId: null, vendorId: null }),
    );
    expect(entity.vo.variantId).toBeUndefined();
    expect(entity.vo.vendorId).toBeUndefined();
  });

  it('maps entity to persistence object', () => {
    const entity = OrderItemPrismaMapper.toDomain(makeRow());
    const data = OrderItemPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('item-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['productId']).toBe('prod-1');
    expect(data['quantity']).toBe(2);
    expect(data['unitPrice']).toBe(500);
    expect(data['subtotal']).toBe(1000);
    expect(data['total']).toBe(1000);
    expect(data['currency']).toBe('BDT');
  });
});
