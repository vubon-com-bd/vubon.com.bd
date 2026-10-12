/**
 * VendorPrismaMapper — unit tests
 * @module vendor-service/test/unit/infrastructure
 */
import { VendorPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makePrismaRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    userId: UUID,
    name: 'Acme Store',
    slug: 'acme-store',
    displayName: 'Acme',
    description: 'We sell quality products.',
    type: 'individual',
    businessType: 'retailer',
    status: 'active',
    tier: 'bronze',
    email: 'shop@acme.com',
    phone: '01712345678',
    website: 'https://acme.com',
    logoUrl: 'https://cdn.example.com/logo.png',
    bannerUrl: 'https://cdn.example.com/banner.jpg',
    addressLine1: '123 Main St',
    addressLine2: null,
    area: null,
    upazila: 'Savar',
    district: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1340',
    country: 'BD',
    rating: 4.5,
    totalSales: 10000,
    totalOrders: 50,
    isVerified: true,
    isFeatured: false,
    joinedAt: NOW,
    approvedAt: null,
    suspendedAt: null,
    version: 3,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorPrismaMapper', () => {
  describe('toDomain()', () => {
    it('maps all fields', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.id).toBe(UUID);
      expect(e.name.value).toBe('Acme Store');
      expect(e.slug.value).toBe('acme-store');
      expect(e.displayName.value).toBe('Acme');
      expect(e.status.value).toBe('active');
      expect(e.tier.value).toBe('bronze');
      expect(e.type.value).toBe('individual');
      expect(e.businessType.value).toBe('retailer');
      expect(e.email.value).toBe('shop@acme.com');
    });

    it('maps contact fields', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.contact?.phone?.value).toBe('01712345678');
      expect(e.contact?.website?.value).toBe('https://acme.com');
    });

    it('maps location', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.location?.address.value.line1).toBe('123 Main St');
      expect(e.location?.district.value).toBe('Dhaka');
    });

    it('maps branding', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.branding?.logo?.value).toBe('https://cdn.example.com/logo.png');
    });

    it('maps numeric fields correctly', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.rating.value).toBe(4.5);
      expect(e.totalSales).toBe(10000);
      expect(e.totalOrders).toBe(50);
    });

    it('maps flags', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow());
      expect(e.isVerified).toBe(true);
      expect(e.isFeatured).toBe(false);
    });

    it('maps version', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow({ version: 7 }));
      expect(e.version).toBe(7);
    });

    it('handles deleted row', () => {
      const e = VendorPrismaMapper.toDomain(makePrismaRow({ deletedAt: NOW }));
      expect(e.deletedAt).toBe(NOW.toISOString());
    });

    it('handles null optional fields', () => {
      const e = VendorPrismaMapper.toDomain(
        makePrismaRow({ description: null, phone: null, website: null, logoUrl: null, bannerUrl: null }),
      );
      expect(e.description).toBeUndefined();
      expect(e.contact?.phone).toBeUndefined();
    });
  });
});
