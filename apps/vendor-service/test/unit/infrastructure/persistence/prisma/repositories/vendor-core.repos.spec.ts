/**
 * Vendor core Prisma repositories — bulk tests
 */
import { jest } from '@jest/globals';
import { VendorPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor.prisma.repository.js';
import { VendorProfilePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-profile.prisma.repository.js';
import { VendorSettingsPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-settings.prisma.repository.js';
import { VendorDocumentPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-document.prisma.repository.js';
import { VendorVerificationPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-verification.prisma.repository.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeVendorRow(): never {
  return {
    id: UUID, userId: UUID, name: 'Acme', slug: 'acme', displayName: 'Acme',
    description: null, type: 'individual', businessType: 'retailer',
    status: 'active', tier: 'bronze', email: 'a@b.com',
    phone: null, website: null, logoUrl: null, bannerUrl: null,
    addressLine1: '123', addressLine2: null, area: null,
    upazila: 'Savar', district: 'Dhaka', division: 'Dhaka',
    postalCode: '1340', country: 'BD',
    rating: 4.5, totalSales: 0, totalOrders: 0,
    isVerified: false, isFeatured: false,
    joinedAt: NOW, approvedAt: null, suspendedAt: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeProfileRow(): never {
  return {
    id: UUID, vendorId: UUID, tagline: null, about: null,
    logoUrl: null, bannerUrl: null, website: null,
    socialLinks: {}, categories: [], languages: [],
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeSettingsRow(): never {
  return {
    id: UUID, vendorId: UUID,
    autoAcceptOrders: false, autoConfirmPayout: false,
    vacationMode: false, vacationMessage: null,
    timezone: 'Asia/Dhaka', locale: 'bn-BD', currency: 'BDT',
    notifications: { orderAlerts: true, payoutAlerts: true, reviewAlerts: true, stockAlerts: true, emailEnabled: true, smsEnabled: false, pushEnabled: true },
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeDocRow(): never {
  return {
    id: UUID, vendorId: UUID, type: 'identity_proof', status: 'pending',
    fileUrl: 'https://x.com/d.pdf', fileName: 'd.pdf', mimeType: 'application/pdf',
    fileSize: 1024, documentNumber: null, issuedAt: null, expiresAt: null,
    verifiedAt: null, verifiedBy: null, rejectionReason: null, notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makeVerRow(): never {
  return {
    id: UUID, vendorId: UUID, overallStatus: 'pending', checks: [],
    submittedAt: null, reviewedAt: null, reviewedBy: null,
    rejectionReason: null, expiresAt: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;
}

function makePrisma() {
  const vendorDelegate = {
    findFirst: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0),
    create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn(),
    groupBy: jest.fn().mockResolvedValue([]), aggregate: jest.fn().mockResolvedValue({ _avg: {}, _sum: {} }),
  };
  const profileDelegate = { findFirst: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0), create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() };
  const settingsDelegate = { findFirst: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0), create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() };
  const docDelegate = { findFirst: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0), create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() };
  const verDelegate = { findFirst: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0), create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() };
  return {
    vendor: vendorDelegate,
    vendorProfile: profileDelegate,
    vendorSettings: settingsDelegate,
    vendorDocument: docDelegate,
    vendorVerification: verDelegate,
  } as never;
}

describe('VendorPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorPrismaRepository(prisma); });

  it('findById delegates findFirst', async () => {
    (prisma as never as { vendor: { findFirst: jest.Mock } }).vendor.findFirst.mockResolvedValue(makeVendorRow());
    const r = await repo.findById(UUID);
    expect(r?.id).toBe(UUID);
  });
  it('findById returns null when not found', async () => {
    (prisma as never as { vendor: { findFirst: jest.Mock } }).vendor.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });
  it('findAll returns list', async () => {
    (prisma as never as { vendor: { findMany: jest.Mock } }).vendor.findMany.mockResolvedValue([makeVendorRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findBySlug uses slug filter', async () => {
    (prisma as never as { vendor: { findFirst: jest.Mock } }).vendor.findFirst.mockResolvedValue(null);
    await repo.findBySlug({ value: 'acme' } as never);
    expect((prisma as never as { vendor: { findFirst: jest.Mock } }).vendor.findFirst).toHaveBeenCalled();
  });
  it('existsBySlug returns false for count 0', async () => {
    (prisma as never as { vendor: { count: jest.Mock } }).vendor.count.mockResolvedValue(0);
    expect(await repo.existsBySlug({ value: 'acme' } as never)).toBe(false);
  });
  it('existsByUserId returns true for count 1', async () => {
    (prisma as never as { vendor: { count: jest.Mock } }).vendor.count.mockResolvedValue(1);
    expect(await repo.existsByUserId(UUID)).toBe(true);
  });
  it('findPaginated returns paginated result', async () => {
    (prisma as never as { vendor: { findMany: jest.Mock } }).vendor.findMany.mockResolvedValue([makeVendorRow()]);
    (prisma as never as { vendor: { count: jest.Mock } }).vendor.count.mockResolvedValue(1);
    const r = await repo.findPaginated({ page: 1, limit: 20 });
    expect(r.total).toBe(1);
    expect(r.totalPages).toBe(1);
  });
  it('save creates when not existing', async () => {
    (prisma as never as { vendor: { findFirst: jest.Mock } }).vendor.findFirst.mockResolvedValue(null);
    (prisma as never as { vendor: { create: jest.Mock } }).vendor.create.mockResolvedValue(makeVendorRow());
    const { VendorEntity } = await import('../../../../../../src/module/domain/entities/vendor.entity.js');
    const { VendorNameVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js');
    const { VendorSlugVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js');
    const { VendorEmailVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js');
    const { VendorTypeVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js');
    const { VendorBusinessTypeVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js');
    const { VendorTierVO } = await import('../../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js');
    const { RatingScoreVO } = await import('../../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js');
    const e = VendorEntity.create({
      id: UUID, now: NOW.toISOString(),
      props: {
        userId: UUID, name: VendorNameVO.create('Acme'), slug: VendorSlugVO.create('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'), businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'), tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(), totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW.toISOString(),
      },
    });
    const r = await repo.save(e);
    expect(r.id).toBe(UUID);
  });
  it('delete calls delegate', async () => {
    await repo.delete(UUID);
    expect((prisma as never as { vendor: { delete: jest.Mock } }).vendor.delete).toHaveBeenCalled();
  });
  it('softDelete uses update', async () => {
    (prisma as never as { vendor: { update: jest.Mock } }).vendor.update.mockResolvedValue(makeVendorRow());
    await repo.softDelete(UUID);
    expect((prisma as never as { vendor: { update: jest.Mock } }).vendor.update).toHaveBeenCalled();
  });
});

describe('VendorProfilePrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorProfilePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorProfilePrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    (prisma as never as { vendorProfile: { findFirst: jest.Mock } }).vendorProfile.findFirst.mockResolvedValue(null);
    expect(await repo.findByVendorId(UUID)).toBeNull();
  });
  it('existsByVendorId false for count 0', async () => {
    (prisma as never as { vendorProfile: { count: jest.Mock } }).vendorProfile.count.mockResolvedValue(0);
    expect(await repo.existsByVendorId(UUID)).toBe(false);
  });
  it('findWithoutLogo delegates', async () => {
    (prisma as never as { vendorProfile: { findMany: jest.Mock } }).vendorProfile.findMany.mockResolvedValue([]);
    expect(await repo.findWithoutLogo()).toEqual([]);
  });
});

describe('VendorSettingsPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorSettingsPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorSettingsPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    (prisma as never as { vendorSettings: { findFirst: jest.Mock } }).vendorSettings.findFirst.mockResolvedValue(makeSettingsRow());
    const r = await repo.findByVendorId(UUID);
    expect(r?.vendorId).toBe(UUID);
  });
  it('existsByVendorId true for count 1', async () => {
    (prisma as never as { vendorSettings: { count: jest.Mock } }).vendorSettings.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('findOnVacation filters', async () => {
    (prisma as never as { vendorSettings: { findMany: jest.Mock } }).vendorSettings.findMany.mockResolvedValue([]);
    expect(await repo.findOnVacation()).toEqual([]);
  });
});

describe('VendorDocumentPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorDocumentPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorDocumentPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    (prisma as never as { vendorDocument: { findMany: jest.Mock } }).vendorDocument.findMany.mockResolvedValue([makeDocRow()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findPendingReview filters', async () => {
    (prisma as never as { vendorDocument: { findMany: jest.Mock } }).vendorDocument.findMany.mockResolvedValue([]);
    expect(await repo.findPendingReview()).toEqual([]);
  });
  it('countByVendor delegates', async () => {
    (prisma as never as { vendorDocument: { count: jest.Mock } }).vendorDocument.count.mockResolvedValue(3);
    expect(await repo.countByVendor(UUID)).toBe(3);
  });
});

describe('VendorVerificationPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorVerificationPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorVerificationPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => {
    (prisma as never as { vendorVerification: { findFirst: jest.Mock } }).vendorVerification.findFirst.mockResolvedValue(makeVerRow());
    const r = await repo.findByVendorId(UUID);
    expect(r?.vendorId).toBe(UUID);
  });
  it('existsByVendorId true', async () => {
    (prisma as never as { vendorVerification: { count: jest.Mock } }).vendorVerification.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('findPendingReview delegates', async () => {
    (prisma as never as { vendorVerification: { findMany: jest.Mock } }).vendorVerification.findMany.mockResolvedValue([]);
    expect(await repo.findPendingReview()).toEqual([]);
  });
});
