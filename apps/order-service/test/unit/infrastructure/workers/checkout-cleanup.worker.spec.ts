import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutCleanupWorker } from '@infrastructure/workers/checkout-cleanup.worker';
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

describe('CheckoutCleanupWorker', () => {
  let worker: CheckoutCleanupWorker;
  let mockQueue: { registerWorker: jest.Mock };
  let mockRepo: { findById: jest.Mock; softDelete: jest.Mock };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    mockRepo = { findById: jest.fn(), softDelete: jest.fn() };
    worker = new CheckoutCleanupWorker(mockQueue as never, mockRepo as never);
  });

  type HandleFn = (payload: { checkoutId: string }) => Promise<unknown>;

  it('skips when checkout not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    expect(await handle({ checkoutId: 'x' })).toEqual({ skipped: true });
  });

  it('cleans expired checkout', async () => {
    const row = makeRow({ expiresAt: new Date('2020-01-01T00:00:00Z') });
    mockRepo.findById.mockResolvedValue(CheckoutPrismaMapper.toDomain(row));
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ checkoutId: 'checkout-1' });
    expect(result).toEqual({ cleaned: true });
    expect(mockRepo.softDelete).toHaveBeenCalledWith('checkout-1');
  });

  it('does not clean non-expired checkout', async () => {
    mockRepo.findById.mockResolvedValue(CheckoutPrismaMapper.toDomain(makeRow()));
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({ checkoutId: 'checkout-1' });
    expect(result).toEqual({ cleaned: false });
    expect(mockRepo.softDelete).not.toHaveBeenCalled();
  });
});
