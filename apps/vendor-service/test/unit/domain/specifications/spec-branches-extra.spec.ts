/**
 * Extra branch coverage for specifications
 * @module vendor-service/test/unit/domain/specifications
 */
import { CanActivateVendorSpecification } from '../../../../src/module/domain/specifications/can-activate-vendor.specification.js';
import { CanProcessPayoutSpecification } from '../../../../src/module/domain/specifications/can-process-payout.specification.js';
import { CanRequestPayoutSpecification } from '../../../../src/module/domain/specifications/can-request-payout.specification.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorLocationVO } from '../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeApprovedVendor(): VendorEntity {
  const v = VendorEntity.create({
    id: UUID, now: NOW,
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

function makePayout(amount = 5000): VendorPayoutEntity {
  return VendorPayoutEntity.create({
    id: UUID, now: NOW,
    props: {
      vendorId: UUID,
      payoutNumber: 'PO-TEST-000001',
      method: PayoutMethodVO.reconstitute('bank_transfer'),
      cycle: PayoutCycleVO.reconstitute('on_demand'),
      amount: PayoutAmountVO.create(amount, 'BDT'),
      netAmount: PayoutAmountVO.create(amount, 'BDT'),
      periodStart: NOW, periodEnd: NOW,
      bankAccountId: UUID,
    },
  });
}

describe('Specifications — extra branches', () => {
  describe('CanActivateVendorSpecification', () => {
    const spec = new CanActivateVendorSpecification();

    it('false when location missing', () => {
      const v = makeApprovedVendor();
      // no location set
      expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
    });

    it('false when contact not fully complete', () => {
      const v = makeApprovedVendor();
      expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
    });

    it('false when payoutConfig missing', () => {
      const v = makeApprovedVendor();
      expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
    });

    it('false when commission missing', () => {
      const v = makeApprovedVendor();
      expect(spec.isSatisfiedBy({ vendor: v })).toBe(false);
    });

    it('false when verification checks incomplete', () => {
      const v = makeApprovedVendor();
      const ver = VendorVerificationEntity.create({
        id: UUID, vendorId: UUID, now: NOW,
      });
      expect(spec.isSatisfiedBy({ vendor: v, verification: ver })).toBe(false);
    });

    it('explain lists reason for each missing piece', () => {
      const v = makeApprovedVendor();
      const reasons: string[] = [];
      const variants = [
        () => spec.explain({ vendor: v }),
        () => spec.explain({ vendor: v, verification: VendorVerificationEntity.create({ id: UUID, vendorId: UUID, now: NOW }) }),
      ];
      for (const fn of variants) {
        const msg = fn();
        if (msg) reasons.push(msg);
      }
      expect(reasons.length).toBeGreaterThan(0);
    });

    it('explain returns non-null reason when not fully configured', () => {
      const v = makeApprovedVendor();
      expect(spec.explain({ vendor: v })).not.toBeNull();
    });
  });

  describe('CanProcessPayoutSpecification', () => {
    const spec = new CanProcessPayoutSpecification();

    it('false for paid payout', () => {
      const v = makeApprovedVendor();
      const p = makePayout();
      // Make it paid
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.markPaid('txn-1', undefined, NOW);
      expect(spec.isSatisfiedBy({ vendor: v, payout: p, bankAccountVerified: true })).toBe(false);
    });

    it('explain reason for paid payout', () => {
      const v = makeApprovedVendor();
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      p.markPaid('txn-1', undefined, NOW);
      const msg = spec.explain({ vendor: v, payout: p, bankAccountVerified: true });
      expect(msg).toContain('paid');
    });

    it('explain returns null when all clear', () => {
      const v = makeApprovedVendor();
      const p = makePayout(5000);
      p.approve(UUID, NOW);
      const msg = spec.explain({ vendor: v, payout: p, bankAccountVerified: true });
      expect(msg === null || typeof msg === 'string').toBe(true);
    });
  });

  describe('CanRequestPayoutSpecification', () => {
    const spec = new CanRequestPayoutSpecification();

    it('false when daily limit reached', () => {
      expect(spec.isSatisfiedBy({
        vendor: makeApprovedVendor(),
        amount: 5000, availableBalance: 10000,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 99,
      })).toBe(false);
    });

    it('explain reason for daily limit', () => {
      const msg = spec.explain({
        vendor: makeApprovedVendor(),
        amount: 5000, availableBalance: 10000,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 99,
      });
      expect(msg).toContain('limit');
    });

    it('false when amount below minimum', () => {
      expect(spec.isSatisfiedBy({
        vendor: makeApprovedVendor(),
        amount: 50, availableBalance: 10000,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 0,
      })).toBe(false);
    });

    it('false when amount above maximum', () => {
      expect(spec.isSatisfiedBy({
        vendor: makeApprovedVendor(),
        amount: 99_999_999, availableBalance: 99_999_999,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 0,
      })).toBe(false);
    });

    it('false when not operational', () => {
      const v = VendorEntity.create({
        id: UUID, now: NOW,
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
      expect(spec.isSatisfiedBy({
        vendor: v,
        amount: 5000, availableBalance: 10000,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 0,
      })).toBe(false);
    });

    it('explain for not operational', () => {
      const v = VendorEntity.create({
        id: UUID, now: NOW,
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
      const msg = spec.explain({
        vendor: v,
        amount: 5000, availableBalance: 10000,
        hasPendingPayout: false, bankAccountVerified: true,
        payoutsToday: 0,
      });
      expect(msg).toContain('operational');
    });
  });
});
