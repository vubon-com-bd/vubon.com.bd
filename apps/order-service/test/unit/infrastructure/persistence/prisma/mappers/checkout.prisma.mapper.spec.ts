import { describe, it, expect } from '@jest/globals';
import { CheckoutPrismaMapper } from '@infrastructure/mappers/checkout.prisma.mapper';
import type { PrismaCheckoutRow } from '@infrastructure/mappers/checkout.prisma.mapper';

const makeRow = (overrides: Partial<PrismaCheckoutRow> = {}): PrismaCheckoutRow => ({
  id: 'checkout-1',
  customerId: 'cust-1',
  cartId: 'cart-1',
  status: 'started',
  step: 'cart',
  type: 'registered',
  subtotal: 1000,
  discountAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  total: 1000,
  currency: 'BDT',
  shippingAddressId: null,
  billingAddressId: null,
  shippingMethodId: null,
  paymentMethod: null,
  orderId: null,
  expiresAt: new Date('2024-01-01T11:00:00Z'),
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('CheckoutPrismaMapper', () => {
  it('maps row to CheckoutEntity', () => {
    const entity = CheckoutPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('checkout-1');
    expect(entity.vo.customerId.value).toBe('cust-1');
    expect(entity.vo.status.value).toBe('started');
    expect(entity.vo.currentStep.value).toBe('cart');
  });

  it('maps entity to persistence object', () => {
    const entity = CheckoutPrismaMapper.toDomain(makeRow());
    const data = CheckoutPrismaMapper.toPersistence(entity);
    expect(data['id']).toBe('checkout-1');
    expect(data['customerId']).toBe('cust-1');
    expect(data['status']).toBe('started');
    expect(data['step']).toBe('cart');
    expect(data['currency']).toBe('BDT');
  });
});
