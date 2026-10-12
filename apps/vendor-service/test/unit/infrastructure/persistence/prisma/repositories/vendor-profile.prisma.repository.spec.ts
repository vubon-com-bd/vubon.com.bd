import { jest } from '@jest/globals';
import { VendorProfilePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-profile.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    tagline: 'Best store',
    about: 'We sell quality products.',
    logoUrl: 'https://cdn.example.com/logo.png',
    bannerUrl: 'https://cdn.example.com/banner.jpg',
    website: 'https://acme.com',
    socialLinks: {},
    categories: ['electronics'],
    languages: ['en'],
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorProfilePrismaRepository', () => {
  let repo: VendorProfilePrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorProfilePrismaRepository(prisma.prisma);
  });

  it('findById returns entity', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorProfile.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findByVendorId(UUID))?.vendorId).toBe(UUID);
  });

  it('existsByVendorId true', async () => {
    prisma.mock.vendorProfile.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });

  it('existsByVendorId false', async () => {
    prisma.mock.vendorProfile.count.mockResolvedValue(0);
    expect(await repo.existsByVendorId(UUID)).toBe(false);
  });

  it('upsert creates when new', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(null);
    prisma.mock.vendorProfile.create.mockResolvedValue(makeRow());
    const { VendorProfileEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-profile.entity.js'
    );
    const entity = VendorProfileEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: { vendorId: UUID },
    });
    const r = await repo.upsert(entity);
    expect(r.id).toBe(UUID);
  });

  it('upsert updates when existing', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorProfile.update.mockResolvedValue(makeRow());
    const { VendorProfileEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-profile.entity.js'
    );
    const entity = VendorProfileEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        socialLinks: {},
        categories: [],
        languages: [],
      },
    });
    const r = await repo.upsert(entity);
    expect(prisma.mock.vendorProfile.update).toHaveBeenCalled();
    expect(r).toBeDefined();
  });

  it('save delegates to upsert', async () => {
    prisma.mock.vendorProfile.findFirst.mockResolvedValue(null);
    prisma.mock.vendorProfile.create.mockResolvedValue(makeRow());
    const { VendorProfileEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-profile.entity.js'
    );
    const entity = VendorProfileEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: { vendorId: UUID },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });

  it('delete', async () => {
    prisma.mock.vendorProfile.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorProfile.delete).toHaveBeenCalledWith({ where: { id: UUID } });
  });

  it('exists true', async () => {
    prisma.mock.vendorProfile.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('deleteByVendorId', async () => {
    prisma.mock.vendorProfile.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorProfile.updateMany).toHaveBeenCalled();
  });

  it('findIncomplete', async () => {
    prisma.mock.vendorProfile.findMany.mockResolvedValue([]);
    expect(await repo.findIncomplete()).toEqual([]);
  });

  it('findWithoutLogo', async () => {
    prisma.mock.vendorProfile.findMany.mockResolvedValue([]);
    expect(await repo.findWithoutLogo()).toEqual([]);
  });

  it('findByCategory', async () => {
    prisma.mock.vendorProfile.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findByCategory('electronics')).length).toBe(1);
  });
});
