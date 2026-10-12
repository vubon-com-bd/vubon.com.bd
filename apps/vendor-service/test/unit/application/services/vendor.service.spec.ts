/**
 * VendorService — unit tests with mocked repository
 * @module vendor-service/test/unit/application/services
 */
import { jest } from '@jest/globals';
import { VendorService } from '../../../../src/module/application/services/impl/vendor.service.js';
import type { VendorRepository } from '../../../../src/module/domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorNotFoundError } from '../../../../src/module/application/errors/vendor.errors.js';
import { VendorAlreadyExistsError } from '../../../../src/module/application/errors/vendor.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const UUID2 = '8c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVendor(): VendorEntity {
  return VendorEntity.create({
    id: UUID,
    now: NOW,
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('shop@acme.com'),
      contact: VendorContactVO.create({
        email: VendorEmailVO.create('shop@acme.com'),
      }),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 0,
      totalOrders: 0,
      isVerified: false,
      isFeatured: false,
      joinedAt: NOW,
    },
  });
}

function makeRepoMock(): jest.Mocked<VendorRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    findBySlug: jest.fn(),
    findByEmail: jest.fn(),
    findByUserId: jest.fn(),
    findByStatus: jest.fn(),
    findByType: jest.fn(),
    findByTier: jest.fn(),
    findFeatured: jest.fn(),
    findVerified: jest.fn(),
    findPaginated: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    existsBySlug: jest.fn(),
    existsByEmail: jest.fn(),
    existsByUserId: jest.fn(),
    findPendingApprovalPastSla: jest.fn(),
    findInactiveSince: jest.fn(),
    findTierUpgradeCandidates: jest.fn(),
    countByStatus: jest.fn(),
    getAggregateStats: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<VendorRepository>;
}

describe('VendorService', () => {
  let service: VendorService;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    const mockEventBridge = { publishFromEntity: jest.fn().mockResolvedValue(undefined) };
    service = new VendorService(repo, mockEventBridge as never);
  });

  // ═══ Read ═══
  describe('getById()', () => {
    it('returns vendor response', async () => {
      const v = makeVendor();
      repo.findByIdVO.mockResolvedValue(v);
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
      expect(r.name).toBe('Acme Store');
    });

    it('throws VendorNotFoundError when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow(VendorNotFoundError);
    });
  });

  describe('getPublic()', () => {
    it('returns public response', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor());
      const r = await service.getPublic(UUID);
      expect(r.id).toBe(UUID);
      expect(r.slug).toBe('acme-store');
    });
  });

  describe('getBySlug()', () => {
    it('returns by slug', async () => {
      repo.findBySlug.mockResolvedValue(makeVendor());
      const r = await service.getBySlug('acme-store');
      expect(r.slug).toBe('acme-store');
    });

    it('throws when not found', async () => {
      repo.findBySlug.mockResolvedValue(null);
      await expect(service.getBySlug('nope')).rejects.toThrow(VendorNotFoundError);
    });
  });

  describe('getSummary()', () => {
    it('returns summary', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor());
      const r = await service.getSummary(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  // ═══ List ═══
  describe('list()', () => {
    it('returns paginated result', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeVendor()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
      const r = await service.list({ page: 1, limit: 20 });
      expect(r.items).toHaveLength(1);
      expect(r.total).toBe(1);
      expect(r.hasNext).toBe(false);
      expect(r.hasPrev).toBe(false);
    });
  });

  // ═══ Lifecycle — approve ═══
  describe('approve()', () => {
    it('approves pending vendor', async () => {
      const v = makeVendor();
      repo.findByIdVO.mockResolvedValue(v);
      repo.save.mockResolvedValue(v);
      const r = await service.approve({ vendorId: UUID, reviewedBy: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when vendor not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.approve({ vendorId: UUID, reviewedBy: UUID }),
      ).rejects.toThrow(VendorNotFoundError);
    });
  });

  // ═══ Lifecycle — reject ═══
  describe('reject()', () => {
    it('rejects pending vendor', async () => {
      const v = makeVendor();
      repo.findByIdVO.mockResolvedValue(v);
      repo.save.mockResolvedValue(v);
      const r = await service.reject({
        vendorId: UUID,
        reviewedBy: UUID,
        reason: 'incomplete_documents',
      });
      expect(r.id).toBe(UUID);
    });
  });

  // ═══ Lifecycle — activate ═══
  describe('activate()', () => {
    it('activates approved vendor', async () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      repo.findByIdVO.mockResolvedValue(v);
      repo.save.mockResolvedValue(v);
      const r = await service.activate({ vendorId: UUID });
      expect(r.id).toBe(UUID);
    });
  });

  // ═══ Lifecycle — suspend ═══
  describe('suspend()', () => {
    it('suspends active vendor', async () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      repo.findByIdVO.mockResolvedValue(v);
      repo.save.mockResolvedValue(v);
      const r = await service.suspend({
        vendorId: UUID,
        reason: 'poor_performance',
        durationDays: 30,
        suspendedBy: UUID,
      });
      expect(r.id).toBe(UUID);
    });
  });

  // ═══ Delete ═══
  describe('softDelete()', () => {
    it('calls repo.save with updated vendor', async () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      repo.findByIdVO.mockResolvedValue(v);
      repo.save.mockResolvedValue(v);
      await service.softDelete({ vendorId: UUID });
      expect(repo.save).toHaveBeenCalled();
    });
  });

  // ═══ Registration ═══
  describe('register()', () => {
    it('throws when ownerId already has vendor', async () => {
      repo.existsByUserId.mockResolvedValue(true);
      await expect(
        service.register({
          ownerId: UUID,
          businessName: 'Acme Store',
          displayName: 'Acme',
          vendorType: 'individual',
          businessType: 'retailer',
          contactEmail: 'shop@acme.com',
          contactPhone: '01712345678',
          addressLine1: '123 Main St',
          division: 'Dhaka',
          district: 'Dhaka',
          acceptTerms: true,
        } as never),
      ).rejects.toThrow(VendorAlreadyExistsError);
    });

    it('throws when email already taken', async () => {
      repo.existsByUserId.mockResolvedValue(false);
      repo.existsByEmail.mockResolvedValue(true);
      await expect(
        service.register({
          ownerId: UUID,
          businessName: 'Acme Store',
          displayName: 'Acme',
          vendorType: 'individual',
          businessType: 'retailer',
          contactEmail: 'shop@acme.com',
          contactPhone: '01712345678',
          addressLine1: '123 Main St',
          division: 'Dhaka',
          district: 'Dhaka',
          acceptTerms: true,
        } as never),
      ).rejects.toThrow(VendorAlreadyExistsError);
    });
  });
});
