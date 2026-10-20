import { describe, it, expect } from '@jest/globals';
import { CheckoutSessionPrismaMapper } from '@infrastructure/mappers/checkout-session.prisma.mapper';
import type { PrismaCheckoutSessionRow } from '@infrastructure/mappers/checkout-session.prisma.mapper';

const makeRow = (overrides: Partial<PrismaCheckoutSessionRow> = {}): PrismaCheckoutSessionRow => ({
  id: 'session-1',
  checkoutId: 'checkout-1',
  customerId: 'cust-1',
  token: 'token-abc',
  stepData: {
    status: 'in_progress',
    currentStep: 'shipping_address',
  },
  ipAddress: '127.0.0.1',
  userAgent: 'Mozilla/5.0',
  expiresAt: new Date('2024-01-01T11:00:00Z'),
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('CheckoutSessionPrismaMapper', () => {
  it('maps row to CheckoutSessionEntity', () => {
    const entity = CheckoutSessionPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('session-1');
    expect(entity.vo.checkoutId.value).toBe('checkout-1');
    expect(entity.vo.status.value).toBe('in_progress');
    expect(entity.vo.currentStep.value).toBe('shipping_address');
  });

  it('handles empty stepData (defaults)', () => {
    const entity = CheckoutSessionPrismaMapper.toDomain(
      makeRow({ stepData: null }),
    );
    expect(entity.vo.status.value).toBe('started');
    expect(entity.vo.currentStep.value).toBe('cart');
  });

  it('maps entity to persistence object', () => {
    const entity = CheckoutSessionPrismaMapper.toDomain(makeRow());
    const data = CheckoutSessionPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('session-1');
    expect(data['checkoutId']).toBe('checkout-1');
    expect(data['stepData']).toBeDefined();
  });
});
