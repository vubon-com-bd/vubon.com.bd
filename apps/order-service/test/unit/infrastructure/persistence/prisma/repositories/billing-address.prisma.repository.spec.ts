import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BillingAddressPrismaRepository } from '@infrastructure/repos/billing-address.prisma.repository';
import { BillingAddressPrismaMapper } from '@infrastructure/mappers/billing-address.prisma.mapper';
import type { PrismaBillingAddressRow } from '@infrastructure/mappers/billing-address.prisma.mapper';

const makeRow = (overrides: Partial<PrismaBillingAddressRow> = {}): PrismaBillingAddressRow => ({
  id: 'addr-2',
  orderId: 'order-1',
  customerId: 'cust-1',
  fullName: 'Jane Doe',
  phone: '+8801800000000',
  line1: '456 Other St',
  line2: null,
  city: 'Chittagong',
  state: null,
  postalCode: null,
  country: 'BD',
  label: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('BillingAddressPrismaRepository', () => {
  let repo: BillingAddressPrismaRepository;
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
    repo = new BillingAddressPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns address', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findByOrder('order-1');
    expect(result?.id).toBe('addr-2');
  });

  it('save creates entity', async () => {
    mockDelegate.findUnique.mockResolvedValue(null);
    mockDelegate.create.mockResolvedValue(makeRow());
    const entity = BillingAddressPrismaMapper.toDomain(makeRow());
    const saved = await repo.save(entity);
    expect(saved.id).toBe('addr-2');
  });
});
