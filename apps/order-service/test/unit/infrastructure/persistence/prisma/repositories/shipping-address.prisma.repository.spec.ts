import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ShippingAddressPrismaRepository } from '@infrastructure/repos/shipping-address.prisma.repository';
import { ShippingAddressPrismaMapper } from '@infrastructure/mappers/shipping-address.prisma.mapper';
import type { PrismaShippingAddressRow } from '@infrastructure/mappers/shipping-address.prisma.mapper';

const makeRow = (overrides: Partial<PrismaShippingAddressRow> = {}): PrismaShippingAddressRow => ({
  id: 'addr-1',
  orderId: 'order-1',
  customerId: 'cust-1',
  fullName: 'John Doe',
  phone: '+8801700000000',
  line1: '123 Main St',
  line2: null,
  city: 'Dhaka',
  state: null,
  postalCode: null,
  country: 'BD',
  label: null,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('ShippingAddressPrismaRepository', () => {
  let repo: ShippingAddressPrismaRepository;
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
    repo = new ShippingAddressPrismaRepository(mockPrisma as never);
  });

  it('findByOrder returns address', async () => {
    mockDelegate.findFirst.mockResolvedValue(makeRow());
    const result = await repo.findByOrder('order-1');
    expect(result?.id).toBe('addr-1');
  });

  it('save creates when not exists', async () => {
    mockDelegate.findUnique.mockResolvedValue(null);
    mockDelegate.create.mockResolvedValue(makeRow());
    const entity = ShippingAddressPrismaMapper.toDomain(makeRow());
    const saved = await repo.save(entity);
    expect(saved.id).toBe('addr-1');
  });
});
