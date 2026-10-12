import { CanRequestPayoutSpecification } from '../../../../src/module/domain/specifications/can-request-payout.specification.js';
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
  v.approve(UUID, NOW);
  v.activate(NOW);
  return v;
}

describe('CanRequestPayoutSpecification', () => {
  const spec = new CanRequestPayoutSpecification();

  it('true when all conditions met', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        amount: 5000,
        availableBalance: 10_000,
        hasPendingPayout: false,
        bankAccountVerified: true,
        payoutsToday: 0,
      }),
    ).toBe(true);
  });

  it('false when amount exceeds balance', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        amount: 20_000,
        availableBalance: 10_000,
        hasPendingPayout: false,
        bankAccountVerified: true,
        payoutsToday: 0,
      }),
    ).toBe(false);
  });

  it('false when has pending payout', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        amount: 5000,
        availableBalance: 10_000,
        hasPendingPayout: true,
        bankAccountVerified: true,
        payoutsToday: 0,
      }),
    ).toBe(false);
  });

  it('false when bank not verified', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        amount: 5000,
        availableBalance: 10_000,
        hasPendingPayout: false,
        bankAccountVerified: false,
        payoutsToday: 0,
      }),
    ).toBe(false);
  });

  it('false when daily limit reached', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        amount: 5000,
        availableBalance: 10_000,
        hasPendingPayout: false,
        bankAccountVerified: true,
        payoutsToday: 99,
      }),
    ).toBe(false);
  });

  describe('explain()', () => {
    it('reason when exceeds balance', () => {
      const msg = spec.explain({
        vendor: makeVendor(),
        amount: 20_000,
        availableBalance: 10_000,
        hasPendingPayout: false,
        bankAccountVerified: true,
        payoutsToday: 0,
      });
      expect(msg).toContain('exceeds');
    });

    it('reason when pending payout', () => {
      const msg = spec.explain({
        vendor: makeVendor(),
        amount: 5000,
        availableBalance: 10_000,
        hasPendingPayout: true,
        bankAccountVerified: true,
        payoutsToday: 0,
      });
      expect(msg).toContain('pending');
    });

    it('null when can request', () => {
      expect(
        spec.explain({
          vendor: makeVendor(),
          amount: 5000,
          availableBalance: 10_000,
          hasPendingPayout: false,
          bankAccountVerified: true,
          payoutsToday: 0,
        }),
      ).toBeNull();
    });
  });
});
