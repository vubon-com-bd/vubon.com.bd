import { CanLiftSuspensionSpecification } from '../../../../src/module/domain/specifications/can-lift-suspension.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorSuspensionEntity } from '../../../../src/module/domain/entities/vendor-suspension.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { SuspensionReasonVO } from '../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';

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

function makeSuspension(): VendorSuspensionEntity {
  return VendorSuspensionEntity.create({
    id: UUID,
    vendorId: UUID,
    reason: SuspensionReasonVO.create('poor_performance'),
    durationDays: 30,
    suspendedBy: UUID,
    now: NOW,
  });
}

describe('CanLiftSuspensionSpecification', () => {
  const spec = new CanLiftSuspensionSpecification();

  it('false when vendor not suspended', () => {
    const v = makeVendor();
    const s = makeSuspension();
    expect(spec.isSatisfiedBy({ vendor: v, suspension: s })).toBe(false);
  });

  it('true when vendor suspended and no disputes', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.suspend('policy', 30, UUID, NOW);
    const s = makeSuspension();
    expect(spec.isSatisfiedBy({ vendor: v, suspension: s })).toBe(true);
  });

  it('false when suspension already lifted', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.suspend('policy', 30, UUID, NOW);
    const s = makeSuspension();
    s.lift(UUID, NOW);
    expect(spec.isSatisfiedBy({ vendor: v, suspension: s })).toBe(false);
  });

  it('false when has open disputes', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    v.suspend('policy', 30, UUID, NOW);
    const s = makeSuspension();
    expect(spec.isSatisfiedBy({ vendor: v, suspension: s, hasOpenDisputes: true })).toBe(false);
  });

  describe('explain()', () => {
    it('null when can lift', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy', 30, UUID, NOW);
      const s = makeSuspension();
      expect(spec.explain({ vendor: v, suspension: s })).toBeNull();
    });

    it('reason when not suspended', () => {
      const v = makeVendor();
      const s = makeSuspension();
      expect(spec.explain({ vendor: v, suspension: s })).toContain('not suspended');
    });

    it('reason when already lifted', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy', 30, UUID, NOW);
      const s = makeSuspension();
      s.lift(UUID, NOW);
      expect(spec.explain({ vendor: v, suspension: s })).toContain('lifted');
    });

    it('reason when open disputes', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy', 30, UUID, NOW);
      const s = makeSuspension();
      expect(spec.explain({ vendor: v, suspension: s, hasOpenDisputes: true })).toContain('disputes');
    });
  });
});
