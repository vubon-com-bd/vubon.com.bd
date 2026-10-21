/**
 * PaymentMethodPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodPrismaMapper } from '@infrastructure/mappers/payment-method.prisma.mapper';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';

const ROW = {
  id: '11111111-1111-4111-8111-111111111111',
  method: 'card',
  methodType: 'online',
  provider: 'stripe',
  providerEnv: 'sandbox',
  label: 'Visa ending 4242',
  isActive: true,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('PaymentMethodPrismaMapper', () => {
  it('maps a full row to entity', () => {
    const entity = PaymentMethodPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(PaymentMethodEntity);
    expect(entity.id).toBe(ROW.id);
    expect(entity.type.method).toBe('card');
    expect(entity.type.type).toBe('online');
    expect(entity.provider?.provider).toBe('stripe');
    expect(entity.provider?.env).toBe('sandbox');
    expect(entity.label).toBe('Visa ending 4242');
    expect(entity.isActive).toBe(true);
  });

  it('handles null provider', () => {
    const entity = PaymentMethodPrismaMapper.toDomain({
      ...ROW,
      provider: null,
      providerEnv: null,
      method: 'cash_on_delivery',
      methodType: 'offline',
    });
    expect(entity.provider).toBeUndefined();
  });

  it('round-trips via toPersistence', () => {
    const entity = PaymentMethodPrismaMapper.toDomain(ROW);
    const data = PaymentMethodPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe(ROW.id);
    expect(data['method']).toBe('card');
    expect(data['methodType']).toBe('online');
    expect(data['label']).toBe('Visa ending 4242');
    expect(data['isActive']).toBe(true);
  });
});
