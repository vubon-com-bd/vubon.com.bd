import { IsVendorInGoodStandingSpecification } from '../../../../src/module/domain/specifications/is-vendor-in-good-standing.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVerifiedVendor(): VendorEntity {
  const v = VendorEntity.create({
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
      rating: RatingScoreVO.create(4.5),
      totalSales: 0, totalOrders: 0,
      isVerified: false, isFeatured: false,
      joinedAt: NOW,
    },
  });
  v.approve(UUID, NOW);
  v.activate(NOW);
  v.markVerified(NOW);
  v.updateRating(RatingScoreVO.create(4.5), 10, NOW);
  return v;
}

describe('IsVendorInGoodStandingSpecification', () => {
  const spec = new IsVendorInGoodStandingSpecification();

  it('true for operational + verified vendor', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVerifiedVendor(),
        hasOverdueInvoice: false,
        openDisputes: 0,
      }),
    ).toBe(true);
  });

  it('false when not operational', () => {
    const v = VendorEntity.create({
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
    expect(
      spec.isSatisfiedBy({ vendor: v, hasOverdueInvoice: false, openDisputes: 0 }),
    ).toBe(false);
  });

  it('false when has overdue invoice', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVerifiedVendor(),
        hasOverdueInvoice: true,
        openDisputes: 0,
      }),
    ).toBe(false);
  });

  it('false when has open disputes', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVerifiedVendor(),
        hasOverdueInvoice: false,
        openDisputes: 2,
      }),
    ).toBe(false);
  });

  describe('explain()', () => {
    it('null when in good standing', () => {
      expect(
        spec.explain({
          vendor: makeVerifiedVendor(),
          hasOverdueInvoice: false,
          openDisputes: 0,
        }),
      ).toBeNull();
    });

    it('reason when not operational', () => {
      const v = VendorEntity.create({
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
      expect(
        spec.explain({ vendor: v, hasOverdueInvoice: false, openDisputes: 0 }),
      ).toContain('not operational');
    });

    it('reason when overdue invoice', () => {
      expect(
        spec.explain({
          vendor: makeVerifiedVendor(),
          hasOverdueInvoice: true,
          openDisputes: 0,
        }),
      ).toContain('overdue');
    });

    it('reason when open disputes', () => {
      expect(
        spec.explain({
          vendor: makeVerifiedVendor(),
          hasOverdueInvoice: false,
          openDisputes: 2,
        }),
      ).toContain('disputes');
    });
  });
});
