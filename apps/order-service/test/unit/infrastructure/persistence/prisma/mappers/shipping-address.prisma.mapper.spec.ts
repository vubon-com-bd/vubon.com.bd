import { describe, it, expect } from '@jest/globals';
import { ShippingAddressPrismaMapper } from '@infrastructure/mappers/shipping-address.prisma.mapper';
import type { PrismaShippingAddressRow } from '@infrastructure/mappers/shipping-address.prisma.mapper';

const makeRow = (overrides: Partial<PrismaShippingAddressRow> = {}): PrismaShippingAddressRow => ({
  id: 'addr-1',
  orderId: 'order-1',
  customerId: 'cust-1',
  fullName: 'John Doe',
  phone: '+8801700000000',
  line1: '123 Main Street',
  line2: 'Apt 4B',
  city: 'Dhaka',
  state: 'Dhaka',
  postalCode: '1000',
  country: 'BD',
  label: 'Home',
  createdAt: new Date('2024-01-01T10:00:00Z'),
  ...overrides,
});

describe('ShippingAddressPrismaMapper', () => {
  it('maps row to ShippingAddressEntity', () => {
    const entity = ShippingAddressPrismaMapper.toDomain(makeRow());
    expect(entity.id).toBe('addr-1');
    expect(entity.vo.recipientName).toBe('John Doe');
    expect(entity.vo.phone).toBe('+8801700000000');
    expect(entity.vo.line1).toBe('123 Main Street');
    expect(entity.vo.city).toBe('Dhaka');
    expect(entity.vo.country).toBe('BD');
  });

  it('handles optional fields (null)', () => {
    const entity = ShippingAddressPrismaMapper.toDomain(
      makeRow({ line2: null, state: null, postalCode: null, label: null }),
    );
    expect(entity.vo.line2).toBeUndefined();
    expect(entity.vo.district).toBeUndefined();
    expect(entity.vo.postalCode).toBeUndefined();
  });
});
