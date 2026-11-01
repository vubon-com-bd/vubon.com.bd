import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutPrismaRepository } from '@infrastructure/repos/checkout.prisma.repository';
import { CheckoutPrismaMapper } from '@infrastructure/mappers/checkout.prisma.mapper';
import type { PrismaCheckoutRow } from '@infrastructure/mappers/checkout.prisma.mapper';

const makeRow = (overrides: Partial<PrismaCheckoutRow> = {}): PrismaCheckoutRow => ({
  id: 'checkout-1',
  customerId: 'cust-1',
  cartId: null,
  status: 'started',
  step: 'cart',
  type: 'registered',
  subtotal: 0,
  discountAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  total: 0,
  currency: 'BDT',
  shippingAddressId: null,
  billingAddressId: null,
  shippingMethodId: null,
  paymentMethod: null,
  orderId: null,
  expiresAt: new Date('2099-01-01T00:00:00Z'),
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('CheckoutPrismaRepository', () => {
  let repo: CheckoutPrismaRepository;
  let mockDelegate: Record<string, jest.Mock>;
  let mockPrisma: { getModel: jest.Mock };

  beforeEach(() => {
    mockDelegate = {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };
    mockPrisma = { getModel: jest.fn(() => mockDelegate) };
    repo = new CheckoutPrismaRepository(mockPrisma as never);
  });

  it('findById returns entity', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findById('checkout-1');
    expect(result?.id).toBe('checkout-1');
  });

  it('findByCustomer returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByCustomer('cust-1');
    expect(result.length).toBe(1);
  });

  it('save creates when not exists', async () => {
    mockDelegate.findUnique.mockResolvedValue(null);
    mockDelegate.create.mockResolvedValue(makeRow());
    const entity = CheckoutPrismaMapper.toDomain(makeRow());
    const saved = await repo.save(entity);
    expect(saved.id).toBe('checkout-1');
  });
});
