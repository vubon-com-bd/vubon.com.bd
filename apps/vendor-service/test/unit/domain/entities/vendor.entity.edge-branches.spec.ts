/**
 * VendorEntity — Final edge branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBrandingVO } from '../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorLocationVO } from '../../../../src/module/domain/value-objects/composites/vendor-location.vo.js';
import { VendorAddressVO } from '../../../../src/module/domain/value-objects/primitives/vendor-address.vo.js';
import { VendorDivisionVO } from '../../../../src/module/domain/value-objects/primitives/vendor-division.vo.js';
import { VendorDistrictVO } from '../../../../src/module/domain/value-objects/primitives/vendor-district.vo.js';
import { VendorUpazilaVO } from '../../../../src/module/domain/value-objects/primitives/vendor-upazila.vo.js';
import { CommissionPercentVO } from '../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { VendorCommissionConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-commission-config.vo.js';
import { VendorPayoutConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-payout-config.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const ACTOR = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';

function fullProps() {
  const contact = VendorContactVO.create({
    email: VendorEmailVO.create('hello@acme.com'),
  });
  const location = VendorLocationVO.create({
    address: VendorAddressVO.create({
      line1: '123 Test Street',
      upazila: 'Mirpur',
      district: 'Dhaka',
      division: 'Dhaka',
      country: 'BD',
    }),
    division: VendorDivisionVO.create('Dhaka'),
    district: VendorDistrictVO.create('Dhaka'),
    upazila: VendorUpazilaVO.create('Mirpur'),
  });
  const branding = VendorBrandingVO.empty();
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

  return {
    userId: '22222222-2222-4222-8222-222222222222',
    name: VendorNameVO.create('Acme Store'),
    slug: VendorSlugVO.reconstitute('acme-store'),
    displayName: VendorNameVO.create('Acme'),
    type: VendorTypeVO.create('individual'),
    businessType: VendorBusinessTypeVO.create('retailer'),
    email: VendorEmailVO.create('hello@acme.com'),
    tier: VendorTierVO.reconstitute('bronze'),
    rating: RatingScoreVO.zero(),
    totalSales: 0,
    totalOrders: 0,
    isVerified: false,
    isFeatured: false,
    joinedAt: NOW,
    contact,
    location,
    branding,
    commission,
    payoutConfig,
  };
}

describe('VendorEntity — edge branches (line 207)', () => {
  it('isFullyOnboarded false when only contact present', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        userId: 'u', name: VendorNameVO.create('Acme'), slug: VendorSlugVO.reconstitute('a'),
        displayName: VendorNameVO.create('Acme'),
        type: VendorTypeVO.create('individual'),
        businessType: VendorBusinessTypeVO.create('retailer'),
        email: VendorEmailVO.create('a@b.com'),
        tier: VendorTierVO.reconstitute('bronze'),
        rating: RatingScoreVO.zero(),
        totalSales: 0, totalOrders: 0,
        isVerified: false, isFeatured: false, joinedAt: NOW,
        contact: VendorContactVO.create({ email: VendorEmailVO.create('a@b.com') }),
      },
    });
    expect(v.isFullyOnboarded()).toBe(false);
  });

  it('isFullyOnboarded false when contact + location present', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        ...fullProps(),
        branding: undefined,
        commission: undefined,
        payoutConfig: undefined,
      },
    });
    expect(v.isFullyOnboarded()).toBe(false);
  });

  it('isFullyOnboarded false when contact + location + branding present', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        ...fullProps(),
        commission: undefined,
        payoutConfig: undefined,
      },
    });
    expect(v.isFullyOnboarded()).toBe(false);
  });

  it('isFullyOnboarded false when only commission missing', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: {
        ...fullProps(),
        commission: undefined,
      },
    });
    expect(v.isFullyOnboarded()).toBe(false);
  });

  it('isFullyOnboarded TRUE when all present (last && branch)', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: fullProps(),
    });
    expect(v.isFullyOnboarded()).toBe(true);
  });
});

describe('VendorEntity — edge branches (line 385)', () => {
  it('updateProfile on editable status does NOT throw (false branch)', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: fullProps(),
    });
    expect(() =>
      v.updateProfile({ name: VendorNameVO.create('New Name') }, NOW),
    ).not.toThrow();
  });

  it('updateProfile on pending (editable) does NOT throw', () => {
    const v = VendorEntity.create({
      id: UUID, now: NOW, props: fullProps(),
    });
    expect(() =>
      v.updateProfile({ displayName: VendorNameVO.create('NewDN') }, NOW),
    ).not.toThrow();
  });

  it('updateProfile on deleted throws (true branch)', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('deleted'),
      props: fullProps(),
    });
    expect(() =>
      v.updateProfile({ name: VendorNameVO.create('XY') }, NOW),
    ).toThrow();
  });
});

describe('VendorEntity — edge branches (line 660 — changedAt default)', () => {
  it('emitStatusChange uses default changedAt when approving (line 660)', () => {
    // When we call approve() with no now, its internal emitStatusChange
    // receives no changedAt, so line 660's default arg fires.
    const v = VendorEntity.create({ id: UUID, now: NOW, props: fullProps() });
    v.approve(ACTOR); // ← no `now` passed → changedAt default
    expect(v.status.value).toBe('approved');
    // Verify the event was emitted with an ISO string changedAt
    const events = v.domainEvents;
    const statusChanged = events.find((e) => e.type === 'vendor.status_changed');
    expect(statusChanged).toBeDefined();
    expect(typeof (statusChanged!.payload as { changedAt?: string }).changedAt).toBe('string');
  });

  it('emitStatusChange uses default changedAt when deactivating', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: fullProps(),
    });
    v.deactivate('maint');
    expect(v.status.value).toBe('inactive');
  });
});
