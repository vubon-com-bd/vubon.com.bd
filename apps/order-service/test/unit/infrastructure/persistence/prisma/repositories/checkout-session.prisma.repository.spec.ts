import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutSessionPrismaRepository } from '@infrastructure/repos/checkout-session.prisma.repository';
import { CheckoutSessionPrismaMapper } from '@infrastructure/mappers/checkout-session.prisma.mapper';
import type { PrismaCheckoutSessionRow } from '@infrastructure/mappers/checkout-session.prisma.mapper';

const makeRow = (overrides: Partial<PrismaCheckoutSessionRow> = {}): PrismaCheckoutSessionRow => ({
  id: 'session-1',
  checkoutId: 'checkout-1',
  customerId: 'cust-1',
  token: 'token-1',
  stepData: { status: 'started', currentStep: 'cart' },
  ipAddress: null,
  userAgent: null,
  expiresAt: new Date('2099-01-01T00:00:00Z'),
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('CheckoutSessionPrismaRepository', () => {
  let repo: CheckoutSessionPrismaRepository;
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
    repo = new CheckoutSessionPrismaRepository(mockPrisma as never);
  });

  it('findById returns entity', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findById('session-1');
    expect(result?.id).toBe('session-1');
  });

  it('findByCheckout returns list', async () => {
    mockDelegate.findMany.mockResolvedValue([makeRow()]);
    const result = await repo.findByCheckout('checkout-1');
    expect(result.length).toBe(1);
  });

  it('findLatestByCheckout returns latest', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findLatestByCheckout('checkout-1');
    expect(result?.id).toBe('session-1');
  });
});
