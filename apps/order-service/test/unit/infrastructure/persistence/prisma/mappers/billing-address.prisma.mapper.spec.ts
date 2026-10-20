import { describe, it, expect } from '@jest/globals';
import { BillingAddressPrismaMapper } from '@infrastructure/mappers/billing-address.prisma.mapper';
import type { PrismaBillingAddressRow } from '@infrastructure/mappers/billing-address.prisma.mapper';

const makeRow = (overrides: Partial<PrismaBillingAddressRow> = {}): PrismaBillingAddressRow => ({
  id: 'addr-2',
  orderId: 'order-1',
  customerId: 'cust-1',
  fullName: 'Jane Doe',
  phone: '+8801800000000',
  line1: '456 Other Street',
  line2: null,
  city: 'Chittagong',
  state: 'Chittagong',
  postalCode: '4000',
  country: 'BD',
  label: 'Office',
  createdAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('BillingAddressPrismaMapper', () => {
  it('maps row to BillingAddressEntity', () => {
    const entity = BillingAddressPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('addr-2');
    expect(entity.vo.recipientName).toBe('Jane Doe');
    expect(entity.vo.city).toBe('Chittagong');
    expect(entity.vo.postalCode).toBe('4000');
    expect(entity.vo.country).toBe('BD');
  });

  it('handles optional null fields', () => {
    const entity = BillingAddressPrismaMapper.toDomain(
      makeRow({ line2: null, state: null, postalCode: null }),
    );
    expect(entity.vo.line2).toBeUndefined();
    expect(entity.vo.district).toBeUndefined();
  });
});
