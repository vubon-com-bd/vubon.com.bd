import { jest } from '@jest/globals';
import { VendorProfileService } from '../../../../src/module/application/services/impl/vendor-profile.service.js';
import type { VendorRepository } from '../../../../src/module/domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorNotFoundError } from '../../../../src/module/application/errors/vendor.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

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
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 0, totalOrders: 0,
      isVerified: false, isFeatured: false,
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

describe('VendorProfileService', () => {
  let service: VendorProfileService;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorProfileService(repo);
  });

  it('update() modifies profile', async () => {
    const v = makeVendor();
    repo.findByIdVO.mockResolvedValue(v);
    repo.save.mockResolvedValue(v);
    const r = await service.update({ vendorId: UUID, about: 'We sell quality products.' });
    expect(r.id).toBe(UUID);
  });

  it('update() with logo', async () => {
    const v = makeVendor();
    repo.findByIdVO.mockResolvedValue(v);
    repo.save.mockResolvedValue(v);
    const r = await service.update({
      vendorId: UUID,
      logoUrl: 'https://cdn.example.com/logo.png',
    });
    expect(r.id).toBe(UUID);
  });

  it('update() throws when not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.update({ vendorId: UUID })).rejects.toThrow(VendorNotFoundError);
  });

  it('getByVendorId() returns vendor', async () => {
    repo.findByIdVO.mockResolvedValue(makeVendor());
    const r = await service.getByVendorId(UUID);
    expect(r.id).toBe(UUID);
  });

  it('getByVendorId() throws when not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.getByVendorId(UUID)).rejects.toThrow(VendorNotFoundError);
  });
});
