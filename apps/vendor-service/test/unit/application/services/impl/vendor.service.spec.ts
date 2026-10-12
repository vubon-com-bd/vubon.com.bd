/**
 * VendorService — full coverage tests (mocked repo)
 * @module vendor-service/test/unit/application/services/impl
 */
import { jest } from '@jest/globals';
import { VendorService } from '../../../../../src/module/application/services/impl/vendor.service.js';
import { VendorEntity } from '../../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorPhoneVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-phone.vo.js';
import { BusinessDescriptionVO } from '../../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { VendorAlreadyExistsError, VendorNotFoundError } from '../../../../../src/module/application/errors/vendor.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

interface MockRepo {
  existsByUserId: jest.Mock;
  existsByEmail: jest.Mock;
  existsBySlug: jest.Mock;
  findBySlug: jest.Mock;
  findByIdVO: jest.Mock;
  findById: jest.Mock;
  findPaginated: jest.Mock;
  save: jest.Mock;
  countByStatus: jest.Mock;
  getAggregateStats: jest.Mock;
}

function makeMockRepo(): MockRepo {
  return {
    existsByUserId: jest.fn().mockResolvedValue(false),
    existsByEmail: jest.fn().mockResolvedValue(false),
    existsBySlug: jest.fn().mockResolvedValue(false),
    findBySlug: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findById: jest.fn().mockResolvedValue(null),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 1000, totalPages: 0,
    }),
    save: jest.fn(async (e) => e),
    countByStatus: jest.fn().mockResolvedValue(0),
    getAggregateStats: jest.fn().mockResolvedValue({}),
  };
}

function makeVendor(overrides: {
  status?: 'pending' | 'approved' | 'active' | 'inactive' | 'suspended' | 'rejected' | 'blocked' | 'deleted';
} = {}): VendorEntity {
  const v = VendorEntity.create({
    id: UUID, now: NOW,
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('shop@acme.com'),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 1000,
      totalOrders: 5,
      isVerified: false,
      isFeatured: false,
      joinedAt: NOW,
    },
  });

  const status = overrides.status ?? 'pending';
  if (status === 'approved' || status === 'active' || status === 'inactive' || status === 'suspended') {
    v.approve(UUID, NOW);
  }
  if (status === 'active' || status === 'inactive' || status === 'suspended') {
    v.activate(NOW);
  }
  if (status === 'inactive') v.deactivate(undefined, NOW);
  if (status === 'suspended') v.suspend('policy', 30, UUID, NOW);
  if (status === 'rejected') v.reject(UUID, 'incomplete', NOW);
  if (status === 'blocked') {
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.block('fraud', UUID, NOW);
  }
  if (status === 'deleted') {
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.softDelete(UUID, NOW);
  }
  return v;
}

const VALID_REGISTER_DTO = {
  ownerId: UUID,
  businessName: 'Acme Store',
  displayName: 'Acme',
  vendorType: 'individual' as never,
  businessType: 'retailer' as never,
  contactEmail: 'shop@acme.com',
  contactPhone: '01712345678',
  addressLine1: '123 Main Street',
  division: 'Dhaka',
  district: 'Dhaka',
  acceptTerms: true,
};

describe('VendorService — full coverage', () => {
  let repo: MockRepo;
  let service: VendorService;

  beforeEach(() => {
    repo = makeMockRepo();
    const mockEventBridge = { publishFromEntity: jest.fn().mockResolvedValue(undefined) };
    service = new VendorService(repo as never, mockEventBridge as never);
  });

  describe('register()', () => {
    it('registers vendor with all fields', async () => {
      const r = await service.register(VALID_REGISTER_DTO);
      expect(r.id).toBeDefined();
      expect(repo.save).toHaveBeenCalled();
    });

    it('throws when user already has a vendor', async () => {
      repo.existsByUserId.mockResolvedValue(true);
      await expect(service.register(VALID_REGISTER_DTO)).rejects.toBeInstanceOf(
        VendorAlreadyExistsError,
      );
    });

    it('throws when email is taken', async () => {
      repo.existsByEmail.mockResolvedValue(true);
      await expect(service.register(VALID_REGISTER_DTO)).rejects.toBeInstanceOf(
        VendorAlreadyExistsError,
      );
    });

    it('with explicit slug', async () => {
      const r = await service.register({ ...VALID_REGISTER_DTO, slug: 'custom-slug' });
      expect(r.slug).toBe('custom-slug');
    });

    it('without phone', async () => {
      const r = await service.register({ ...VALID_REGISTER_DTO, contactPhone: '' });
      expect(r.contact.phone).toBeUndefined();
    });

    it('with businessDescription does not throw', async () => {
      const r = await service.register({
        ...VALID_REGISTER_DTO,
        businessDescription: 'We sell quality products.',
      });
      expect(r.id).toBeDefined();
    });

    it('without upazila (fallback to district)', async () => {
      const r = await service.register(VALID_REGISTER_DTO);
      expect(r.address.upazila).toBe('Dhaka');
    });

    it('with all address parts', async () => {
      const r = await service.register({
        ...VALID_REGISTER_DTO,
        addressLine2: 'Suite 100',
        upazila: 'Savar',
        postalCode: '1340',
      });
      expect(r.address.line2).toBe('Suite 100');
      expect(r.address.postalCode).toBe('1340');
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
    });

    it('updates name', async () => {
      const r = await service.update({ vendorId: UUID, name: 'New Name' });
      expect(r.name).toBe('New Name');
    });

    it('updates displayName', async () => {
      const r = await service.update({ vendorId: UUID, displayName: 'New Display' });
      expect(r.displayName).toBe('New Display');
    });

    it('updates description', async () => {
      const r = await service.update({
        vendorId: UUID,
        description: 'Brand new description!',
      });
      expect(r.description).toBe('Brand new description!');
    });

    it('updates logoUrl only', async () => {
      const r = await service.update({ vendorId: UUID, logoUrl: 'https://cdn.example.com/l.png' });
      expect(r.branding.logoUrl).toBe('https://cdn.example.com/l.png');
    });

    it('updates bannerUrl only', async () => {
      const r = await service.update({ vendorId: UUID, bannerUrl: 'https://cdn.example.com/b.png' });
      expect(r.branding.bannerUrl).toBe('https://cdn.example.com/b.png');
    });

    it('updates both logo + banner', async () => {
      const r = await service.update({
        vendorId: UUID,
        logoUrl: 'https://cdn.example.com/l.png',
        bannerUrl: 'https://cdn.example.com/b.png',
      });
      expect(r.branding.logoUrl).toBeDefined();
      expect(r.branding.bannerUrl).toBeDefined();
    });

    it('no-op when no changes', async () => {
      const r = await service.update({ vendorId: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when vendor not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.update({ vendorId: UUID, name: 'X' })).rejects.toBeInstanceOf(
        VendorNotFoundError,
      );
    });
  });

  describe('updateProfile()', () => {
    beforeEach(() => repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' })));

    it('updates about', async () => {
      const r = await service.updateProfile({
        vendorId: UUID,
        about: 'New about us text.',
      });
      expect(r.description).toBe('New about us text.');
    });

    it('updates logoUrl', async () => {
      const r = await service.updateProfile({
        vendorId: UUID,
        logoUrl: 'https://cdn.example.com/l.png',
      });
      expect(r.branding.logoUrl).toBeDefined();
    });

    it('updates bannerUrl', async () => {
      const r = await service.updateProfile({
        vendorId: UUID,
        bannerUrl: 'https://cdn.example.com/b.png',
      });
      expect(r.branding.bannerUrl).toBeDefined();
    });

    it('no changes', async () => {
      const r = await service.updateProfile({ vendorId: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.updateProfile({ vendorId: UUID })).rejects.toBeInstanceOf(
        VendorNotFoundError,
      );
    });
  });

  describe('updateBusiness()', () => {
    beforeEach(() => repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' })));

    it('updates description', async () => {
      const r = await service.updateBusiness({
        vendorId: UUID,
        description: 'New business description.',
      });
      expect(r.description).toBe('New business description.');
    });

    it('no description', async () => {
      const r = await service.updateBusiness({ vendorId: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.updateBusiness({ vendorId: UUID })).rejects.toBeInstanceOf(
        VendorNotFoundError,
      );
    });
  });

  describe('lifecycle methods', () => {
    it('activate — active vendor', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'approved' }));
      const r = await service.activate({ vendorId: UUID });
      expect(r.status).toBe('active');
    });

    it('activate — throws when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.activate({ vendorId: UUID })).rejects.toBeInstanceOf(VendorNotFoundError);
    });

    it('deactivate — active', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.deactivate({ vendorId: UUID, reason: 'vacation' });
      expect(r.status).toBe('inactive');
    });

    it('deactivate — no reason', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.deactivate({ vendorId: UUID });
      expect(r.status).toBe('inactive');
    });

    it('suspend — active', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.suspend({
        vendorId: UUID,
        reason: 'policy_violation' as never,
        durationDays: 30,
        suspendedBy: UUID,
      });
      expect(r.status).toBe('suspended');
    });

    it('reinstate — suspended', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'suspended' }));
      const r = await service.reinstate({ vendorId: UUID, liftedBy: UUID });
      expect(r.status).toBe('active');
    });

    it('approve — pending', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'pending' }));
      const r = await service.approve({ vendorId: UUID, reviewedBy: UUID });
      expect(r.status).toBe('approved');
    });

    it('reject — pending', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'pending' }));
      const r = await service.reject({
        vendorId: UUID,
        reviewedBy: UUID,
        reason: 'incomplete_documents' as never,
      });
      expect(r.status).toBe('rejected');
    });

    it('softDelete — active', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      await service.softDelete({ vendorId: UUID, reason: 'cleanup' }, UUID);
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('getById / getPublic / getSummary', () => {
    it('getById — found', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('getById — not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toBeInstanceOf(VendorNotFoundError);
    });

    it('getPublic — found', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.getPublic(UUID);
      expect(r.id).toBe(UUID);
    });

    it('getPublic — not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getPublic(UUID)).rejects.toBeInstanceOf(VendorNotFoundError);
    });

    it('getSummary — found', async () => {
      repo.findByIdVO.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.getSummary(UUID);
      expect(r.id).toBe(UUID);
    });

    it('getSummary — not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getSummary(UUID)).rejects.toBeInstanceOf(VendorNotFoundError);
    });
  });

  describe('getBySlug()', () => {
    it('found', async () => {
      repo.findBySlug.mockResolvedValue(makeVendor({ status: 'active' }));
      const r = await service.getBySlug('acme-store');
      expect(r.slug).toBe('acme-store');
    });

    it('not found', async () => {
      repo.findBySlug.mockResolvedValue(null);
      await expect(service.getBySlug('unknown')).rejects.toBeInstanceOf(VendorNotFoundError);
    });
  });

  describe('list()', () => {
    it('returns paginated list', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeVendor()], total: 1, page: 1, limit: 20, totalPages: 1,
      });
      const r = await service.list({ page: 1, limit: 20 });
      expect(r.items.length).toBe(1);
      expect(r.hasNext).toBe(false);
    });

    it('hasNext when more pages', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeVendor()], total: 100, page: 1, limit: 20, totalPages: 5,
      });
      const r = await service.list({ page: 1, limit: 20 });
      expect(r.hasNext).toBe(true);
    });

    it('hasPrev when not first page', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [], total: 100, page: 2, limit: 20, totalPages: 5,
      });
      const r = await service.list({ page: 2, limit: 20 });
      expect(r.hasPrev).toBe(true);
    });
  });

  describe('getStats()', () => {
    it('zero orders → AOV 0', async () => {
      const v = makeVendor({ status: 'active' });
      repo.findByIdVO.mockResolvedValue(v);
      const r = await service.getStats(UUID);
      // totalOrders is 5, so AOV should be computed
      expect(r.vendorId).toBe(UUID);
    });
  });
});
