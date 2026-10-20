import { describe, it, expect } from '@jest/globals';
import { DeliveryPrismaMapper } from '@infrastructure/mappers/delivery.prisma.mapper';
import type { PrismaDeliveryRow } from '@infrastructure/mappers/delivery.prisma.mapper';

const makeRow = (overrides: Partial<PrismaDeliveryRow> = {}): PrismaDeliveryRow => ({
  id: 'delivery-1',
  orderId: 'order-1',
  deliveryMethodId: 'method-1',
  status: 'pending',
  type: 'standard',
  trackingNumber: 'TRK-12345678',
  courierId: 'courier-1',
  estimatedAt: new Date('2024-01-03T10:00:00Z'),
  deliveredAt: null,
  attempts: 0,
  notes: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('DeliveryPrismaMapper', () => {
  it('maps row to DeliveryEntity', () => {
    const entity = DeliveryPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('delivery-1');
    expect(entity.vo.orderId.value).toBe('order-1');
    expect(entity.vo.status.value).toBe('pending');
    expect(entity.vo.type.value).toBe('standard');
    expect(entity.vo.trackingNumber?.value).toBe('TRK-12345678');
    expect(entity.vo.attempts).toBe(0);
  });

  it('handles null trackingNumber', () => {
    const entity = DeliveryPrismaMapper.toDomain(makeRow({ trackingNumber: null }));
    expect(entity.vo.trackingNumber).toBeUndefined();
  });

  it('maps entity to persistence object', () => {
    const entity = DeliveryPrismaMapper.toDomain(makeRow());
    const data = DeliveryPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('delivery-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['status']).toBe('pending');
    expect(data['trackingNumber']).toBe('TRK-12345678');
  });
});
