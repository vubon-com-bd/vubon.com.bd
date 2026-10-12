import { VendorProfilePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-profile.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    vendorId: UUID,
    tagline: 'Best store in town',
    about: 'We sell quality products.',
    logoUrl: 'https://cdn.example.com/logo.png',
    bannerUrl: 'https://cdn.example.com/banner.jpg',
    website: 'https://acme.com',
    socialLinks: { facebook: 'https://facebook.com/acme' },
    categories: ['electronics'],
    languages: ['en'],
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorProfilePrismaMapper', () => {
  it('maps all fields', () => {
    const e = VendorProfilePrismaMapper.toDomain(makeRow());
    expect(e.vendorId).toBe(UUID);
    expect(e.tagline).toBe('Best store in town');
    expect(e.about?.value).toBe('We sell quality products.');
    expect(e.logo?.value).toBe('https://cdn.example.com/logo.png');
    expect(e.banner?.value).toBe('https://cdn.example.com/banner.jpg');
  });

  it('maps socialLinks', () => {
    const e = VendorProfilePrismaMapper.toDomain(makeRow());
    expect(e.socialLinks['facebook']).toBe('https://facebook.com/acme');
  });

  it('maps categories + languages', () => {
    const e = VendorProfilePrismaMapper.toDomain(makeRow());
    expect(e.categories).toEqual(['electronics']);
    expect(e.languages).toEqual(['en']);
  });

  it('handles null optional fields', () => {
    const e = VendorProfilePrismaMapper.toDomain(
      makeRow({ tagline: null, about: null, logoUrl: null, bannerUrl: null, website: null }),
    );
    expect(e.tagline).toBeUndefined();
    expect(e.logo).toBeUndefined();
  });

  it('toPersistence roundtrip', () => {
    const domain = VendorProfilePrismaMapper.toDomain(makeRow());
    const persisted = VendorProfilePrismaMapper.toPersistence(domain);
    expect(persisted.id).toBe(UUID);
    expect(persisted.tagline).toBe('Best store in town');
  });
});
