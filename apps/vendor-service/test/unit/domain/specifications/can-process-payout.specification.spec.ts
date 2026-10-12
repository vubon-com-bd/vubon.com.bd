import { CanProcessPayoutSpecification } from '../../../../src/module/domain/specifications/can-process-payout.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';

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

function makePayout(amount: number = 5000): VendorPayoutEntity {
  return VendorPayoutEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      payoutNumber: 'PO-TEST-000001',
      method: PayoutMethodVO.reconstitute('bank_transfer'),
      cycle: PayoutCycleVO.reconstitute('on_demand'),
      amount: PayoutAmountVO.create(amount, 'BDT'),
      netAmount: PayoutAmountVO.create(amount, 'BDT'),
      periodStart: NOW,
      periodEnd: NOW,
      bankAccountId: UUID,
    },
  });
}

describe('CanProcessPayoutSpecification', () => {
  const spec = new CanProcessPayoutSpecification();

  it('false when vendor not operational', () => {
    expect(
      spec.isSatisfiedBy({
        vendor: makeVendor(),
        payout: makePayout(),
        bankAccountVerified: true,
      }),
    ).toBe(false);
  });

  it('false when bank not verified', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(
      spec.isSatisfiedBy({
        vendor: v,
        payout: makePayout(),
        bankAccountVerified: false,
      }),
    ).toBe(false);
  });

  it('true when all conditions met', () => {
    const v = makeVendor();
    v.approve(UUID, NOW);
    v.activate(NOW);
    expect(
      spec.isSatisfiedBy({
        vendor: v,
        payout: makePayout(),
        bankAccountVerified: true,
      }),
    ).toBe(true);
  });

  describe('explain()', () => {
    it('reason when not operational', () => {
      const msg = spec.explain({
        vendor: makeVendor(),
        payout: makePayout(),
        bankAccountVerified: true,
      });
      expect(msg).toContain('not operational');
    });

    it('reason when bank not verified', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      const msg = spec.explain({
        vendor: v,
        payout: makePayout(),
        bankAccountVerified: false,
      });
      expect(msg).toContain('bank account');
    });

    it('null when can process', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(
        spec.explain({
          vendor: v,
          payout: makePayout(),
          bankAccountVerified: true,
        }),
      ).toBeNull();
    });
  });
});
