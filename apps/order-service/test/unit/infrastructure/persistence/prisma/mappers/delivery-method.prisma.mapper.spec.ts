import { describe, it, expect } from '@jest/globals';
import { DeliveryMethodPrismaMapper } from '@infrastructure/mappers/delivery-method.prisma.mapper';
import type { PrismaDeliveryMethodRow } from '@infrastructure/mappers/delivery-method.prisma.mapper';

const makeRow = (overrides: Partial<PrismaDeliveryMethodRow> = {}): PrismaDeliveryMethodRow => ({
  id: 'method-1',
  name: 'Standard Delivery',
  type: 'standard',
  carrier: 'Pathao',
  baseCost: 60,
  currency: 'BDT',
  estimatedDays: 3,
  isActive: true,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('DeliveryMethodPrismaMapper', () => {
  it('maps row to DeliveryMethodEntity', () => {
    const entity = DeliveryMethodPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('method-1');
    expect(entity.name).toBe('Standard Delivery');
    expect(entity.vo.type.value).toBe('standard');
    expect(entity.vo.carrier).toBe('Pathao');
    expect(entity.vo.baseCost).toBe(60);
    expect(entity.vo.estimatedDays).toBe(3);
    expect(entity.vo.isActive).toBe(true);
  });

  it('handles null carrier', () => {
    const entity = DeliveryMethodPrismaMapper.toDomain(makeRow({ carrier: null }));
    expect(entity.vo.carrier).toBeUndefined();
  });

  it('maps entity to persistence object', () => {
    const entity = DeliveryMethodPrismaMapper.toDomain(makeRow());
    const data = DeliveryMethodPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('method-1');
    expect(data['name']).toBe('Standard Delivery');
    expect(data['baseCost']).toBe(60);
    expect(data['isActive']).toBe(true);
  });
});
