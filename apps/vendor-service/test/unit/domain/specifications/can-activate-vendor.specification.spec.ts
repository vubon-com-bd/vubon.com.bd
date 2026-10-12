import { CanActivateVendorSpecification } from '../../../../src/module/domain/specifications/can-activate-vendor.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorLocationVO } from '../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';

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

describe('CanActivateVendorSpecification', () => {
  const spec = new CanActivateVendorSpecification();

  it('false for pending vendor', () => {
    expect(spec.isSatisfiedBy({ vendor: makeVendor() })).toBe(false);
  });

  it('false when approved but no location', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
  });

  it('false when approved but no contact', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    // no contact update
    expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
  });

  it('throws or false when verification checks incomplete', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    const ver = VendorVerificationEntity.create({ id: UUID, vendorId: UUID, now: NOW });
    const result = spec.isSatisfiedBy({ vendor: v, verification: ver });
    expect(result).toBe(false);
  });

  describe('explain()', () => {
    it('contains reason for pending', () => {
      expect(spec.explain({ vendor: makeVendor() })).toContain('not approved');
    });
  });
});
