import { describe, it, expect } from '@jest/globals';
import { OrderCancelPrismaMapper } from '@infrastructure/mappers/order-cancel.prisma.mapper';
import type { PrismaOrderCancelRow } from '@infrastructure/mappers/order-cancel.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderCancelRow> = {}): PrismaOrderCancelRow => ({
  id: 'cancel-1',
  orderId: 'order-1',
  reason: 'customer_request',
  status: 'requested',
  requestedBy: 'user-1',
  approvedBy: null,
  notes: 'Customer changed mind',
  refundAmount: null,
  currency: 'BDT',
  restockInventory: true,
  requestedAt: new Date('2024-01-02T10:00:00Z'),
  processedAt: null,
  createdAt: new Date('2024-01-02T10:00:00Z'),
  updatedAt: new Date('2024-01-02T10:00:00Z'),
  ...overrides,
});

describe('OrderCancelPrismaMapper', () => {
  it('maps row to OrderCancelEntity', () => {
    const entity = OrderCancelPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('cancel-1');
    expect(entity.vo.orderId.value).toBe('order-1');
    expect(entity.vo.reason.value).toBe('customer_request');
    expect(entity.vo.status.value).toBe('requested');
    expect(entity.vo.requestedBy).toBe('user-1');
  });

  it('handles optional fields', () => {
    const entity = OrderCancelPrismaMapper.toDomain(
      makeRow({ approvedBy: 'admin-1', processedAt: new Date() }),
    );
    expect(entity.vo.approvedBy).toBe('admin-1');
    expect(entity.vo.processedAt).toBeDefined();
  });

  it('maps entity to persistence object', () => {
    const entity = OrderCancelPrismaMapper.toDomain(makeRow());
    const data = OrderCancelPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('cancel-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['reason']).toBe('customer_request');
    expect(data['status']).toBe('requested');
  });
});
