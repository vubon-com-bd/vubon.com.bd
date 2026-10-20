import { describe, it, expect } from '@jest/globals';
import { OrderReturnPrismaMapper } from '@infrastructure/mappers/order-return.prisma.mapper';
import type { PrismaOrderReturnRow } from '@infrastructure/mappers/order-return.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderReturnRow> = {}): PrismaOrderReturnRow => ({
  id: 'return-1',
  orderId: 'order-1',
  customerId: 'cust-1',
  status: 'requested',
  reason: 'defective',
  itemIds: ['item-1', 'item-2'],
  images: [],
  notes: 'Item broken',
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

describe('OrderReturnPrismaMapper', () => {
  it('maps row to OrderReturnEntity', () => {
    const entity = OrderReturnPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('return-1');
    expect(entity.vo.orderId.value).toBe('order-1');
    expect(entity.vo.customerId.value).toBe('cust-1');
    expect(entity.vo.status.value).toBe('requested');
    expect(entity.vo.reason.value).toBe('defective');
    expect(entity.vo.itemIds.length).toBe(2);
  });

  it('handles images array', () => {
    const entity = OrderReturnPrismaMapper.toDomain(
      makeRow({ images: ['https://example.com/img1.jpg'] }),
    );
    expect(entity.vo.imageUrls?.length).toBe(1);
  });

  it('maps entity to persistence object', () => {
    const entity = OrderReturnPrismaMapper.toDomain(makeRow());
    const data = OrderReturnPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('return-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['status']).toBe('requested');
    expect(data['reason']).toBe('defective');
  });
});
