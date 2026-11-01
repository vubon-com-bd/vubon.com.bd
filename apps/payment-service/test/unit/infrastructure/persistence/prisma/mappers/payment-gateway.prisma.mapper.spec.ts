/**
 * PaymentGatewayPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentGatewayPrismaMapper } from '@infrastructure/mappers/payment-gateway.prisma.mapper';
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';

const ROW = {
  id: 'gw-1',
  provider: 'stripe',
  providerEnv: 'sandbox',
  displayName: 'Stripe',
  isActive: true,
  isMaintenance: false,
  supportedCurrencies: ['BDT', 'USD'],
  minAmount: 1,
  maxAmount: 100000,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('PaymentGatewayPrismaMapper', () => {
  it('maps a full row', () => {
    const entity = PaymentGatewayPrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(PaymentGatewayEntity);
    expect(entity.provider.provider).toBe('stripe');
    expect(entity.provider.env).toBe('sandbox');
    expect(entity.displayName).toBe('Stripe');
    expect(entity.isActive).toBe(true);
    expect(entity.isMaintenance).toBe(false);
    expect(entity.supportedCurrencies).toEqual(['BDT', 'USD']);
    expect(entity.minAmount).toBe(1);
    expect(entity.maxAmount).toBe(100000);
  });

  it('preserves currency array', () => {
    const entity = PaymentGatewayPrismaMapper.toDomain(ROW);
    expect(entity.supportsCurrency('BDT')).toBe(true);
    expect(entity.supportsCurrency('EUR')).toBe(false);
  });

  it('round-trips via toPersistence', () => {
    const entity = PaymentGatewayPrismaMapper.toDomain(ROW);
    const data = PaymentGatewayPrismaMapper.toPersistence(entity);
    expect(data['provider']).toBe('stripe');
    expect(data['providerEnv']).toBe('sandbox');
    expect(data['supportedCurrencies']).toEqual(['BDT', 'USD']);
  });
});
