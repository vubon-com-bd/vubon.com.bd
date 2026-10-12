import { jest } from '@jest/globals';
import { VendorSearchService } from '../../../../src/module/application/services/impl/vendor-search.service.js';
import type { VendorRepository } from '../../../../src/module/domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';

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
    findPaginated: jest.fn(),
  } as unknown as jest.Mocked<VendorRepository>;
}

describe('VendorSearchService', () => {
  let service: VendorSearchService;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSearchService(repo);
  });

  it('search() returns paginated result', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [makeVendor()],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    });
    const r = await service.search({ page: 1, limit: 20 });
    expect(r.items).toHaveLength(1);
    expect(r.total).toBe(1);
  });

  it('searchPublic() returns public list', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [makeVendor()],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
    const r = await service.searchPublic('acme', 10);
    expect(r).toHaveLength(1);
  });

  it('findTopRated() returns list', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [makeVendor()],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
    const r = await service.findTopRated(10);
    expect(r).toHaveLength(1);
  });

  it('findFeatured() returns public list', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [makeVendor()],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });
    const r = await service.findFeatured(10);
    expect(r).toHaveLength(1);
  });
});
