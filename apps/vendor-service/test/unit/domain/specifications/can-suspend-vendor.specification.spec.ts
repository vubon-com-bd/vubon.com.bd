import { CanSuspendVendorSpecification } from '../../../../src/module/domain/specifications/can-suspend-vendor.specification.js';
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

describe('CanSuspendVendorSpecification', () => {
  const spec = new CanSuspendVendorSpecification();

  it('false for pending vendor', () => {
    expect(spec.isSatisfiedBy(makeVendor())).toBe(false);
  });

  it('true for active vendor', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(spec.isSatisfiedBy(v)).toBe(true);
  });

  it('false for already suspended vendor', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.suspend('policy', 30, UUID, NOW);
    expect(spec.isSatisfiedBy(v)).toBe(false);
  });

  describe('explain()', () => {
    it('null when can suspend', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(spec.explain(v)).toBeNull();
    });

    it('reason when cannot', () => {
      const v = makeVendor();
      expect(spec.explain(v)).toContain('pending');
    });
  });
});
