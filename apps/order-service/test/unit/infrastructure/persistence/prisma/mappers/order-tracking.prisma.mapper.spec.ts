import { describe, it, expect } from '@jest/globals';
import { OrderTrackingPrismaMapper } from '@infrastructure/mappers/order-tracking.prisma.mapper';
import type { PrismaOrderTrackingRow } from '@infrastructure/mappers/order-tracking.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderTrackingRow> = {}): PrismaOrderTrackingRow => ({
  id: 'tracking-1',
  orderId: 'order-1',
  event: 'in_transit',
  message: 'Package is in transit',
  location: 'Dhaka Hub',
  latitude: 23.8103,
  longitude: 90.4125,
  trackingNumber: 'TRK-12345678',
  createdBy: 'system',
  metadata: { carrier: 'Pathao' },
  occurredAt: new Date('2024-01-03T10:00:00Z'),
  createdAt: new Date('2024-01-03T10:00:00Z'),
  ...overrides,
});

describe('OrderTrackingPrismaMapper', () => {
  it('maps row to OrderTrackingEntity', () => {
    const entity = OrderTrackingPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('tracking-1');
    expect(entity.vo.orderId.value).toBe('order-1');
    expect(entity.vo.message).toBe('Package is in transit');
    expect(entity.vo.trackingNumber.value).toBe('TRK-12345678');
    expect(entity.vo.location).toBe('Dhaka Hub');
  });

  it('handles null trackingNumber (fallback to id)', () => {
    const entity = OrderTrackingPrismaMapper.toDomain(
      makeRow({ trackingNumber: null }),
    );
    expect(entity.vo.trackingNumber.value).toBe('tracking-1');
  });

  it('maps entity to persistence object', () => {
    const entity = OrderTrackingPrismaMapper.toDomain(makeRow());
    const data = OrderTrackingPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('tracking-1');
    expect(data['orderId']).toBe('order-1');
    expect(data['message']).toBe('Package is in transit');
    expect(data['trackingNumber']).toBe('TRK-12345678');
  });
});
