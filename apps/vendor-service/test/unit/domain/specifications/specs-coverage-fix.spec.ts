/**
 * Specifications — Comprehensive branch coverage
 * @module vendor-service/test/unit/domain/specifications
 *
 * Covers: can-activate-vendor, can-approve-vendor, can-feature-vendor,
 *         can-process-payout, can-request-payout, is-vendor-in-good-standing,
 *         can-upgrade-tier
 */
import { describe, it, expect } from '@jest/globals';

import { CanActivateVendorSpecification } from '../../../../src/module/domain/specifications/can-activate-vendor.specification.js';
import { CanApproveVendorSpecification } from '../../../../src/module/domain/specifications/can-approve-vendor.specification.js';
import { CanFeatureVendorSpecification } from '../../../../src/module/domain/specifications/can-feature-vendor.specification.js';
import { CanProcessPayoutSpecification } from '../../../../src/module/domain/specifications/can-process-payout.specification.js';
import { CanRequestPayoutSpecification } from '../../../../src/module/domain/specifications/can-request-payout.specification.js';
import { IsVendorInGoodStandingSpecification } from '../../../../src/module/domain/specifications/is-vendor-in-good-standing.specification.js';
import { CanUpgradeTierSpecification } from '../../../../src/module/domain/specifications/can-upgrade-tier.specification.js';

import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';

import { VendorStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorPhoneVO } from '../../../../src/module/domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorWebsiteVO } from '../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';
import { CommissionPercentVO } from '../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';

import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorLocationVO } from '../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorCommissionConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-commission-config.vo.js';
import { VendorPayoutConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-payout-config.vo.js';
import { VendorAddressVO } from '../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const NOW = '2025-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';

// ═══════════════ Helpers ═══════════════
function makeFullVendor(status: 'approved' | 'active' | 'pending' = 'approved') {
  const contact = VendorContactVO.create({
    email: VendorEmailVO.create('hello@acme.com'),
    phone: VendorPhoneVO.create('01712345678'),
    website: VendorWebsiteVO.create('https://acme.com'),
  });
  const location = VendorLocationVO.create({
    address: VendorAddressVO.create({
      line1: '123 Main Street',
      upazila: 'Mirpur',
      district: 'Dhaka',
      division: 'Dhaka',
      country: 'BD',
    }),
    division: VendorDivisionVO.create('Dhaka'),
    district: VendorDistrictVO.create('Dhaka'),
    upazila: VendorUpazilaVO.create('Mirpur'),
  });
  const commission = VendorCommissionConfigVO.create({
    type: 'percentage',
    percent: CommissionPercentVO.create(15),
    fixedAmount: CommissionAmountVO.zero('BDT'),
    applyOnShipping: false,
    applyOnTax: false,
    effectiveFrom: NOW,
  });
  const payoutConfig = VendorPayoutConfigVO.create({
    method: 'bank_transfer',
    cycle: 'weekly',
    minAmount: PayoutAmountVO.minimum('BDT'),
    autoPayout: false,
    requireApproval: true,
    bankAccountId: 'acct-1',
  });

  return VendorEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    status: VendorStatusVO.reconstitute(status),
    props: {
      userId: 'user-1',
      name: VendorNameVO.create('Acme'),
      slug: VendorSlugVO.reconstitute('acme'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('a@b.com'),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.create(4.5),
      totalSales: 50000,
      totalOrders: 100,
      isVerified: true,
      isFeatured: false,
      joinedAt: NOW,
      contact,
      location,
      commission,
      payoutConfig,
    },
  });
}

function makeVerification(overallStatus: string, allChecksPassed = true) {
  const checks = allChecksPassed
    ? [
        { type: 'email', status: 'approved' },
        { type: 'phone', status: 'approved' },
        { type: 'business_license', status: 'approved' },
        { type: 'tax_id', status: 'approved' },
        { type: 'bank_account', status: 'approved' },
        { type: 'identity', status: 'approved' },
      ]
    : [{ type: 'email', status: 'approved' }];

  return VendorVerificationEntity.reconstitute({
    id: 'ver-1',
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: UUID,
      overallStatus: { value: overallStatus } as never,
      checks: checks.map((c) => ({
        type: { value: c.type } as never,
        status: { value: c.status, isApproved: () => c.status === 'approved' } as never,
      })),
    } as never,
  });
}

// ═══════════════════════════════════════════════════════════════════
// 1. CanActivateVendorSpecification — 25% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('CanActivateVendorSpecification — full coverage', () => {
  const spec = new CanActivateVendorSpecification();

  it('isSatisfiedBy true when all conditions met', () => {
    const vendor = makeFullVendor('approved');
    const verification = makeVerification('approved', true);
    expect(spec.isSatisfiedBy({ vendor, verification })).toBe(true);
  });

  it('isSatisfiedBy true without verification param', () => {
    const vendor = makeFullVendor('approved');
    expect(spec.isSatisfiedBy({ vendor })).toBe(true);
  });

  it('isSatisfiedBy false when not approved', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy({ vendor })).toBe(false);
  });

  it('isSatisfiedBy false when no location', () => {
    const vendor = makeFullVendor('approved');
    // Create a vendor without location
    const vendorNoLoc = VendorEntity.reconstitute({
      id: UUID,
      createdAt: NOW,
      updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('a'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0,
        totalOrders: 0,
        isVerified: false,
        isFeatured: false,
        joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy({ vendor: vendorNoLoc })).toBe(false);
    void vendor;
  });

  it('isSatisfiedBy false when contact incomplete', () => {
    const fullVendor = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: fullVendor.id,
      createdAt: NOW,
      updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('a'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0,
        totalOrders: 0,
        isVerified: false,
        isFeatured: false,
        joinedAt: NOW,
        contact: VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') }),
        location: fullVendor.location,
        commission: fullVendor.commission,
        payoutConfig: fullVendor.payoutConfig,
      },
    });
    expect(spec.isSatisfiedBy({ vendor })).toBe(false);
  });

  it('isSatisfiedBy false when no payoutConfig', () => {
    const full = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: full.contact,
        location: full.location,
        commission: full.commission,
      },
    });
    expect(spec.isSatisfiedBy({ vendor })).toBe(false);
  });

  it('isSatisfiedBy false when no commission', () => {
    const full = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: full.contact,
        location: full.location,
        payoutConfig: full.payoutConfig,
      },
    });
    expect(spec.isSatisfiedBy({ vendor })).toBe(false);
  });

  it('isSatisfiedBy false when verification incomplete', () => {
    const vendor = makeFullVendor('approved');
    const verification = makeVerification('pending', false);
    expect(spec.isSatisfiedBy({ vendor, verification })).toBe(false);
  });

  // ─── explain() — all branches ───
  it('explain null when satisfied', () => {
    const vendor = makeFullVendor('approved');
    expect(spec.explain({ vendor })).toBeNull();
  });

  it('explain returns not-approved message', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor })).toContain('not approved');
  });

  it('explain returns no-location message', () => {
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0, isVerified: false, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.explain({ vendor })).toContain('no location');
  });

  it('explain returns contact-incomplete message', () => {
    const full = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0, isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') }),
        location: full.location,
        commission: full.commission,
        payoutConfig: full.payoutConfig,
      },
    });
    expect(spec.explain({ vendor })).toContain('contact');
  });

  it('explain returns payout-config-missing message', () => {
    const full = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0, isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: full.contact,
        location: full.location,
        commission: full.commission,
      },
    });
    expect(spec.explain({ vendor })).toContain('payout config');
  });

  it('explain returns commission-missing message', () => {
    const full = makeFullVendor('approved');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0, isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: full.contact,
        location: full.location,
        payoutConfig: full.payoutConfig,
      },
    });
    expect(spec.explain({ vendor })).toContain('commission');
  });

  it('explain returns verification-incomplete message', () => {
    const vendor = makeFullVendor('approved');
    const verification = makeVerification('pending', false);
    expect(spec.explain({ vendor, verification })).toContain('verification');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 2. CanApproveVendorSpecification — 69% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('CanApproveVendorSpecification — full coverage', () => {
  const spec = new CanApproveVendorSpecification();

  it('true when pending + no flags + verification ok', () => {
    const vendor = makeFullVendor('pending');
    const verification = makeVerification('pending', true);
    expect(spec.isSatisfiedBy({ vendor, verification })).toBe(true);
  });

  it('false when hasFraudFlags', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy({ vendor, hasFraudFlags: true })).toBe(false);
  });

  it('false when isDuplicate', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy({ vendor, isDuplicate: true })).toBe(false);
  });

  it('false when cannot transition', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor })).toBe(false);
  });

  it('false when verification incomplete', () => {
    const vendor = makeFullVendor('pending');
    const verification = makeVerification('pending', false);
    expect(spec.isSatisfiedBy({ vendor, verification })).toBe(false);
  });

  it('explain null when satisfied', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor })).toBeNull();
  });

  it('explain fraud message', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor, hasFraudFlags: true })).toContain('fraud');
  });

  it('explain duplicate message', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor, isDuplicate: true })).toContain('duplicate');
  });

  it('explain cannot-approve message', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor })).toContain('cannot approve');
  });

  it('explain verification-incomplete message', () => {
    const vendor = makeFullVendor('pending');
    const verification = makeVerification('pending', false);
    expect(spec.explain({ vendor, verification })).toContain('verification');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 3. CanFeatureVendorSpecification — 75% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('CanFeatureVendorSpecification — full coverage', () => {
  const spec = new CanFeatureVendorSpecification();

  it('true for operational + verified + good rating + not featured', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy(vendor)).toBe(true);
  });

  it('false when not operational', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy(vendor)).toBe(false);
  });

  it('false when already featured', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: true, isFeatured: true, joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy(vendor)).toBe(false);
  });

  it('false when rating too low', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.create(1.5),
        totalSales: 0, totalOrders: 0,
        isVerified: true, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy(vendor)).toBe(false);
    void base;
  });

  it('false when not verified', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy(vendor)).toBe(false);
  });

  it('explain null when satisfied', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain(vendor)).toBeNull();
  });

  it('explain not-operational message', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain(vendor)).toContain('not operational');
  });

  it('explain already-featured message', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: true, isFeatured: true, joinedAt: NOW,
      },
    });
    expect(spec.explain(vendor)).toContain('already featured');
  });

  it('explain low-rating message', () => {
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.create(1.5),
        totalSales: 0, totalOrders: 0,
        isVerified: true, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.explain(vendor)).toContain('rating');
  });

  it('explain not-verified message', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.explain(vendor)).toContain('not verified');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 4. CanProcessPayoutSpecification — 61.53% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('CanProcessPayoutSpecification — full coverage', () => {
  const spec = new CanProcessPayoutSpecification();

  function makePayout(status: string) {
    return VendorPayoutEntity.reconstitute({
      id: 'payout-1',
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vendorId: UUID,
        payoutNumber: 'PO-20250101-ABC123',
        status: { value: status, isPending: () => status === 'pending', isApproved: () => status === 'approved', isPaid: () => status === 'paid', isFailed: () => status === 'failed' } as never,
        method: PayoutMethodVO.create('bank_transfer'),
        cycle: PayoutCycleVO.create('weekly'),
        amount: PayoutAmountVO.create(5000, 'BDT'),
        netAmount: PayoutAmountVO.create(5000, 'BDT'),
        periodStart: NOW,
        periodEnd: FUTURE,
        bankAccountId: 'acct-1',
        requestedAt: NOW,
      } as never,
    });
  }

  it('true when all conditions met', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('pending');
    expect(spec.isSatisfiedBy({ vendor, payout, bankAccountVerified: true })).toBe(true);
  });

  it('false when vendor not operational', () => {
    const vendor = makeFullVendor('pending');
    const payout = makePayout('pending');
    expect(spec.isSatisfiedBy({ vendor, payout, bankAccountVerified: true })).toBe(false);
  });

  it('false when bank account not verified', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('pending');
    expect(spec.isSatisfiedBy({ vendor, payout, bankAccountVerified: false })).toBe(false);
  });

  it('false when payout status not pending/approved', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('paid');
    expect(spec.isSatisfiedBy({ vendor, payout, bankAccountVerified: true })).toBe(false);
  });

  it('explain null when satisfied', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('pending');
    expect(spec.explain({ vendor, payout, bankAccountVerified: true })).toBeNull();
  });

  it('explain not-operational message', () => {
    const vendor = makeFullVendor('pending');
    const payout = makePayout('pending');
    expect(spec.explain({ vendor, payout, bankAccountVerified: true })).toContain('not operational');
  });

  it('explain bank-not-verified message', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('pending');
    expect(spec.explain({ vendor, payout, bankAccountVerified: false })).toContain('bank account');
  });

  it('explain payout-already-paid message', () => {
    const vendor = makeFullVendor('active');
    const payout = makePayout('paid');
    expect(spec.explain({ vendor, payout, bankAccountVerified: true })).toContain('already paid');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 5. CanRequestPayoutSpecification — 78.57% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('CanRequestPayoutSpecification — full coverage', () => {
  const spec = new CanRequestPayoutSpecification();

  function ctx(overrides: Record<string, unknown> = {}) {
    return {
      vendor: makeFullVendor('active'),
      amount: 5000,
      availableBalance: 10000,
      hasPendingPayout: false,
      bankAccountVerified: true,
      payoutsToday: 0,
      ...overrides,
    } as never;
  }

  it('true when all conditions met', () => {
    expect(spec.isSatisfiedBy(ctx())).toBe(true);
  });

  it('false when vendor not operational', () => {
    expect(spec.isSatisfiedBy(ctx({ vendor: makeFullVendor('pending') }))).toBe(false);
  });

  it('false when bank not verified', () => {
    expect(spec.isSatisfiedBy(ctx({ bankAccountVerified: false }))).toBe(false);
  });

  it('false when has pending payout', () => {
    expect(spec.isSatisfiedBy(ctx({ hasPendingPayout: true }))).toBe(false);
  });

  it('false when amount > availableBalance', () => {
    expect(spec.isSatisfiedBy(ctx({ amount: 20000 }))).toBe(false);
  });

  it('false when amount below minimum', () => {
    expect(spec.isSatisfiedBy(ctx({ amount: 10 }))).toBe(false);
  });

  it('false when daily limit reached', () => {
    expect(spec.isSatisfiedBy(ctx({ payoutsToday: 100 }))).toBe(false);
  });

  it('explain null when satisfied', () => {
    expect(spec.explain(ctx())).toBeNull();
  });

  it('explain not-operational', () => {
    expect(spec.explain(ctx({ vendor: makeFullVendor('pending') }))).toContain('not operational');
  });

  it('explain bank-not-verified', () => {
    expect(spec.explain(ctx({ bankAccountVerified: false }))).toContain('bank account');
  });

  it('explain has-pending-payout', () => {
    expect(spec.explain(ctx({ hasPendingPayout: true }))).toContain('pending payout');
  });

  it('explain exceeds-available', () => {
    expect(spec.explain(ctx({ amount: 20000 }))).toContain('exceeds available');
  });

  it('explain below-minimum', () => {
    expect(spec.explain(ctx({ amount: 10 }))).toContain('below minimum');
  });

  it('explain daily-limit', () => {
    expect(spec.explain(ctx({ payoutsToday: 100 }))).toContain('daily limit');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 6. IsVendorInGoodStandingSpecification — 71.42% → 90%+
// ═══════════════════════════════════════════════════════════════════
describe('IsVendorInGoodStandingSpecification — full coverage', () => {
  const spec = new IsVendorInGoodStandingSpecification();

  it('true for good standing vendor', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toBe(true);
  });

  it('false when not operational', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toBe(false);
  });

  it('false when not verified', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toBe(false);
  });

  it('false when rating too low', () => {
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.create(1.5),
        totalSales: 0, totalOrders: 0,
        isVerified: true, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toBe(false);
  });

  it('false when has overdue invoice', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: true, openDisputes: 0 })).toBe(false);
  });

  it('false when open disputes', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor, hasOverdueInvoice: false, openDisputes: 3 })).toBe(false);
  });

  it('explain null when satisfied', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toBeNull();
  });

  it('explain not-operational', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toContain('not operational');
  });

  it('explain not-verified', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
      },
    });
    expect(spec.explain({ vendor, hasOverdueInvoice: false, openDisputes: 0 })).toContain('not verified');
  });

  it('explain has-overdue-invoice', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor, hasOverdueInvoice: true, openDisputes: 0 })).toContain('overdue');
  });

  it('explain open-disputes', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor, hasOverdueInvoice: false, openDisputes: 3 })).toContain('disputes');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 7. CanUpgradeTierSpecification — 87.5% → 95%+
// ═══════════════════════════════════════════════════════════════════
describe('CanUpgradeTierSpecification — full coverage', () => {
  const spec = new CanUpgradeTierSpecification();

  it('true when upgrade criteria met', () => {
    // Silver threshold starts at 100001 — need sales above that
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 500000,  // silver/gold threshold
        totalOrders: 100,
        isVerified: true,
        isFeatured: false,
        joinedAt: NOW,
        contact: base.contact,
        location: base.location,
        commission: base.commission,
        payoutConfig: base.payoutConfig,
      },
    });
    expect(spec.isSatisfiedBy({ vendor, performanceScore: 90, openDisputes: 0 })).toBe(true);
  });

  it('false when not operational', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.isSatisfiedBy({ vendor, performanceScore: 90, openDisputes: 0 })).toBe(false);
  });

  it('false when performance too low', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor, performanceScore: 50, openDisputes: 0 })).toBe(false);
  });

  it('false when open disputes', () => {
    const vendor = makeFullVendor('active');
    expect(spec.isSatisfiedBy({ vendor, performanceScore: 90, openDisputes: 1 })).toBe(false);
  });

  it('explain null when satisfied', () => {
    const base = makeFullVendor('active');
    const vendor = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u',
        name: VendorNameVO.create('Acme'),
        slug: VendorSlugVO.reconstitute('acme'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: base.rating,
        totalSales: 500000,
        totalOrders: 100,
        isVerified: true,
        isFeatured: false,
        joinedAt: NOW,
        contact: base.contact,
        location: base.location,
        commission: base.commission,
        payoutConfig: base.payoutConfig,
      },
    });
    expect(spec.explain({ vendor, performanceScore: 90, openDisputes: 0 })).toBeNull();
  });

  it('explain not-operational', () => {
    const vendor = makeFullVendor('pending');
    expect(spec.explain({ vendor, performanceScore: 90, openDisputes: 0 })).toContain('not operational');
  });

  it('explain performance-too-low', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor, performanceScore: 50, openDisputes: 0 })).toContain('performance');
  });

  it('explain open-disputes', () => {
    const vendor = makeFullVendor('active');
    expect(spec.explain({ vendor, performanceScore: 90, openDisputes: 3 })).toContain('disputes');
  });
});
