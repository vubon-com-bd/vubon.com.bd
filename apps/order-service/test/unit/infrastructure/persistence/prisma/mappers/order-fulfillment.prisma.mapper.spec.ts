import { describe, it, expect } from '@jest/globals';
import { OrderFulfillmentPrismaMapper } from '@infrastructure/mappers/order-fulfillment.prisma.mapper';
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
  shippingCost: 60,
  currency: 'BDT',
  fulfilledAt: null,
  deliveredAt: null,
  notes: null,
  createdAt: new Date('2024-01-03T10:00:00Z'),
  updatedAt: new Date('2024-01-03T10:00:00Z'),
  ...overrides,
});

describe('OrderFulfillmentPrismaMapper', () => {
  it('maps row to OrderFulfillmentEntity', () => {
    const entity = OrderFulfillmentPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('fulfillment-1');
    expect(entity.vo.orderId.value).toBe('order-1');
    expect(entity.vo.vendorId?.value).toBe('vendor-1');
    expect(entity.vo.status.value).toBe('unfulfilled');
    expect(entity.vo.warehouseId).toBe('wh-1');
    expect(entity.vo.itemIds.length).toBe(1);
  });

  it('handles null vendorId', () => {
    const entity = OrderFulfillmentPrismaMapper.toDomain(
      makeRow({ vendorId: null }),
    );
    expect(entity.vo.vendorId).toBeUndefined();
  });

  it('maps entity to persistence object', () => {
    const entity = OrderFulfillmentPrismaMapper.toDomain(makeRow());
    const data = OrderFulfillmentPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('fulfillment-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['status']).toBe('unfulfilled');
    expect(data['vendorId']).toBe('vendor-1');
  });
});
