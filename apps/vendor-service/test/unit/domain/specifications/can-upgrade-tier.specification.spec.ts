import { CanUpgradeTierSpecification } from '../../../../src/module/domain/specifications/can-upgrade-tier.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVendor(): VendorEntity {
  return VendorEntity.create({
    id: UUID,
    now: NOW,
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme'),
      slug: VendorSlugVO.create('acme'),
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

function makeVendorWithSales(tier: string, sales: number): VendorEntity {
  return VendorEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    status: VendorStatusVO.approved(),
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme'),
      slug: VendorSlugVO.create('acme'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('shop@acme.com'),
      tier: VendorTierVO.reconstitute(tier),
      rating: RatingScoreVO.zero(),
      totalSales: sales,
      totalOrders: 1,
      isVerified: false,
      isFeatured: false,
      joinedAt: NOW,
    },
  });
}

describe('CanUpgradeTierSpecification', () => {
  const spec = new CanUpgradeTierSpecification();

  it('false when vendor not operational', () => {
    const v = makeVendor();
    expect(spec.isSatisfiedBy({ vendor: v, performanceScore: 90, openDisputes: 0 })).toBe(false);
  });

  it('false when open disputes exist', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(spec.isSatisfiedBy({ vendor: v, performanceScore: 90, openDisputes: 1 })).toBe(false);
  });

  it('false when performance score too low', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(spec.isSatisfiedBy({ vendor: v, performanceScore: 50, openDisputes: 0 })).toBe(false);
  });

  it('false when no higher tier is available', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(spec.isSatisfiedBy({ vendor: v, performanceScore: 95, openDisputes: 0 })).toBe(false);
  });

  it('true when all conditions met', () => {
    const v = makeVendorWithSales('bronze', 500_000);
    expect(spec.isSatisfiedBy({ vendor: v, performanceScore: 95, openDisputes: 0 })).toBe(true);
  });

  describe('explain()', () => {
    it('null when can upgrade', () => {
      const v = makeVendorWithSales('bronze', 500_000);
      expect(spec.explain({ vendor: v, performanceScore: 95, openDisputes: 0 })).toBeNull();
    });

    it('reason when not operational', () => {
      const v = makeVendor();
      expect(spec.explain({ vendor: v, performanceScore: 95, openDisputes: 0 })).toContain('operational');
    });

    it('reason when open disputes', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(spec.explain({ vendor: v, performanceScore: 95, openDisputes: 2 })).toContain('disputes');
    });

    it('reason when performance low', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(spec.explain({ vendor: v, performanceScore: 50, openDisputes: 0 })).toContain('performance');
    });
  });
});
