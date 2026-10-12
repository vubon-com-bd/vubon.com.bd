/**
 * VendorEntity — Branch coverage expansion
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
import { BusinessDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { VendorPhoneVO } from '../../../../src/module/domain/value-objects/primitives/vendor-phone.vo.js';
import { VendorWebsiteVO } from '../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';
import { VendorLogoVO } from '../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';
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

const NOW = '2025-01-01T00:00:00.000Z';
const UUID = '11111111-1111-4111-8111-111111111111';
const ACTOR = '33333333-3333-4333-8333-333333333333';

function baseProps() {
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
  };
}

function makeVendor() {
  return VendorEntity.create({
    id: UUID,
    now: NOW,
    props: baseProps(),
  });
}

function makeReconstituted(status = 'pending') {
  return VendorEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    status: VendorStatusVO.reconstitute(status),
    props: baseProps(),
  });
}

describe('VendorEntity — invariants & constructors', () => {
  it('rejects negative totalSales', () => {
    expect(() =>
      VendorEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        status: VendorStatusVO.pending(),
        props: { ...baseProps(), totalSales: -1 },
      }),
    ).toThrow(/Total sales cannot be negative/);
  });

  it('rejects non-integer totalOrders', () => {
    expect(() =>
      VendorEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        status: VendorStatusVO.pending(),
        props: { ...baseProps(), totalOrders: 1.5 },
      }),
    ).toThrow(/Total orders must be a non-negative integer/);
  });

  it('rejects totalSales above system limit', () => {
    expect(() =>
      VendorEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        status: VendorStatusVO.pending(),
        props: { ...baseProps(), totalSales: 1e18 },
      }),
    ).toThrow(/Total sales exceeds system limit/);
  });

  it('creates with valid props and emits registered event', () => {
    const v = makeVendor();
    expect(v.id).toBe(UUID);
    expect(v.domainEvents.length).toBeGreaterThan(0);
    expect(v.domainEvents[0]!.type).toBe('vendor.registered');
  });
});

describe('VendorEntity — getters', () => {
  it('returns all scalar getters', () => {
    const v = makeVendor();
    expect(v.userId).toBe('22222222-2222-4222-8222-222222222222');
    expect(v.name.value).toBe('Acme Store');
    expect(v.slug.value).toBe('acme-store');
    expect(v.displayName.value).toBe('Acme');
    expect(v.email.value).toBe('hello@acme.com');
    expect(v.type.value).toBe('individual');
    expect(v.businessType.value).toBe('retailer');
    expect(v.status.value).toBe('pending');
    expect(v.tier.value).toBe('bronze');
    expect(v.rating.value).toBe(0);
    expect(v.totalSales).toBe(0);
    expect(v.totalOrders).toBe(0);
    expect(v.isVerified).toBe(false);
    expect(v.isFeatured).toBe(false);
    expect(v.joinedAt).toBe(NOW);
    expect(v.approvedAt).toBeUndefined();
    expect(v.suspendedAt).toBeUndefined();
  });

  it('optional getters return undefined when not set', () => {
    const v = makeVendor();
    expect(v.description).toBeUndefined();
    expect(v.contact).toBeUndefined();
    expect(v.businessInfo).toBeUndefined();
    expect(v.location).toBeUndefined();
    expect(v.branding).toBeUndefined();
    expect(v.commission).toBeUndefined();
    expect(v.payoutConfig).toBeUndefined();
  });

  it('toIdVO returns VendorIdVO', () => {
    const v = makeVendor();
    expect(v.toIdVO.value).toBe(UUID);
  });
});

describe('VendorEntity — predicates', () => {
  it('isPending/isApproved/... all statuses', () => {
    const v = makeVendor();
    expect(v.isPending()).toBe(true);
    expect(v.isApproved()).toBe(false);
    expect(v.isActive()).toBe(false);
    expect(v.isInactive()).toBe(false);
    expect(v.isSuspended()).toBe(false);
    expect(v.isRejected()).toBe(false);
    expect(v.isBlocked()).toBe(false);
    expect(v.isDeleted()).toBe(false);
  });

  it('isOperational false for pending', () => {
    expect(makeVendor().isOperational()).toBe(false);
  });

  it('isOperational true for active', () => {
    expect(makeReconstituted('active').isOperational()).toBe(true);
  });

  it('isOperational true for approved', () => {
    expect(makeReconstituted('approved').isOperational()).toBe(true);
  });

  it('isFullyOnboarded false when no composites', () => {
    expect(makeVendor().isFullyOnboarded()).toBe(false);
  });
});

describe('VendorEntity — lifecycle methods', () => {
  it('approve transitions pending → approved', () => {
    const v = makeVendor();
    v.approve(ACTOR, NOW);
    expect(v.status.value).toBe('approved');
    expect(v.approvedAt).toBe(NOW);
  });

  it('reject transitions pending → rejected', () => {
    const v = makeVendor();
    v.reject(ACTOR, 'bad docs', NOW);
    expect(v.status.value).toBe('rejected');
  });

  it('reject throws on empty reason', () => {
    const v = makeVendor();
    expect(() => v.reject(ACTOR, '', NOW)).toThrow();
  });

  it('activate transitions approved → active', () => {
    const v = makeReconstituted('approved');
    v.activate(NOW);
    expect(v.status.value).toBe('active');
  });

  it('deactivate transitions active → inactive', () => {
    const v = makeReconstituted('active');
    v.deactivate('maintenance', NOW);
    expect(v.status.value).toBe('inactive');
  });

  it('deactivate without reason', () => {
    const v = makeReconstituted('active');
    v.deactivate(undefined, NOW);
    expect(v.status.value).toBe('inactive');
  });

  it('suspend transitions active → suspended', () => {
    const v = makeReconstituted('active');
    v.suspend('policy', 30, ACTOR, NOW);
    expect(v.status.value).toBe('suspended');
    expect(v.suspendedAt).toBe(NOW);
  });

  it('suspend throws on empty reason', () => {
    const v = makeReconstituted('active');
    expect(() => v.suspend('', 30, ACTOR, NOW)).toThrow();
  });

  it('suspend throws on non-positive duration', () => {
    const v = makeReconstituted('active');
    expect(() => v.suspend('policy', 0, ACTOR, NOW)).toThrow();
    expect(() => v.suspend('policy', -1, ACTOR, NOW)).toThrow();
  });

  it('liftSuspension on non-suspended throws', () => {
    const v = makeVendor();
    expect(() => v.liftSuspension(ACTOR, NOW)).toThrow();
  });

  it('liftSuspension transitions suspended → active', () => {
    const v = makeReconstituted('suspended');
    v.liftSuspension(ACTOR, NOW);
    expect(v.status.value).toBe('active');
    expect(v.suspendedAt).toBeUndefined();
  });

  it('block transitions active → blocked', () => {
    const v = makeReconstituted('active');
    v.block('fraud', ACTOR, NOW);
    expect(v.status.value).toBe('blocked');
  });

  it('block throws on empty reason', () => {
    const v = makeReconstituted('active');
    expect(() => v.block('', ACTOR, NOW)).toThrow();
  });

  it('softDelete transitions active → deleted', () => {
    const v = makeReconstituted('active');
    v.softDelete(ACTOR, NOW);
    expect(v.status.value).toBe('deleted');
  });

  it('softDelete without actor', () => {
    const v = makeReconstituted('active');
    v.softDelete(undefined, NOW);
    expect(v.status.value).toBe('deleted');
  });

  it('invalid transition throws (approve from active)', () => {
    const v = makeReconstituted('active');
    expect(() => v.approve(ACTOR, NOW)).toThrow();
  });
});

describe('VendorEntity — profile updates', () => {
  it('updateProfile with name only', () => {
    const v = makeVendor();
    v.updateProfile({ name: VendorNameVO.create('New Name') }, NOW);
    expect(v.name.value).toBe('New Name');
  });

  it('updateProfile with displayName only', () => {
    const v = makeVendor();
    v.updateProfile({ displayName: VendorNameVO.create('NN') }, NOW);
    expect(v.displayName.value).toBe('NN');
  });

  it('updateProfile with description only', () => {
    const v = makeVendor();
    v.updateProfile(
      { description: BusinessDescriptionVO.create('A longer description') },
      NOW,
    );
    expect(v.description?.value).toBe('A longer description');
  });

  it('updateProfile with no changes is a no-op', () => {
    const v = makeVendor();
    const events = v.domainEvents.length;
    v.updateProfile({}, NOW);
    expect(v.domainEvents.length).toBe(events);
  });

  it('updateProfile on blocked vendor throws', () => {
    const v = makeReconstituted('blocked');
    expect(() => v.updateProfile({ name: VendorNameVO.create('X') }, NOW)).toThrow();
  });

  it('updateContact replaces contact', () => {
    const v = makeVendor();
    const contact = VendorContactVO.create({
      email: VendorEmailVO.create('new@acme.com'),
      phone: VendorPhoneVO.create('01712345678'),
    });
    v.updateContact(contact, NOW);
    expect(v.contact?.email.value).toBe('new@acme.com');
    expect(v.contact?.phone?.value).toBe('01712345678');
  });

  it('updateContact rejects non-VO', () => {
    const v = makeVendor();
    expect(() => v.updateContact({} as never, NOW)).toThrow();
  });

  it('updateBranding replaces branding', () => {
    const v = makeVendor();
    const branding = VendorBrandingVO.create({
      logo: VendorLogoVO.create('https://x.com/logo.png'),
      banner: VendorBannerVO.create('https://x.com/banner.jpg'),
    });
    v.updateBranding(branding, NOW);
    expect(v.branding?.hasLogo()).toBe(true);
    expect(v.branding?.hasBanner()).toBe(true);
  });

  it('updateBranding rejects non-VO', () => {
    const v = makeVendor();
    expect(() => v.updateBranding({} as never, NOW)).toThrow();
  });
});

describe('VendorEntity — commission & payout config', () => {
  it('configureCommission sets commission', () => {
    const v = makeVendor();
    const config = VendorCommissionConfigVO.create({
      type: 'percentage',
      percent: CommissionPercentVO.create(15),
      fixedAmount: CommissionAmountVO.zero('BDT'),
      applyOnShipping: false,
      applyOnTax: false,
      effectiveFrom: NOW,
    });
    v.configureCommission(config, NOW);
    expect(v.commission?.percent.value).toBe(15);
  });

  it('configureCommission rejects non-VO', () => {
    const v = makeVendor();
    expect(() => v.configureCommission({} as never, NOW)).toThrow();
  });

  it('configurePayout sets payoutConfig', () => {
    const v = makeVendor();
    const config = VendorPayoutConfigVO.create({
      method: 'bank_transfer',
      cycle: 'weekly',
      minAmount: PayoutAmountVO.minimum('BDT'),
      autoPayout: false,
      requireApproval: true,
      bankAccountId: 'acct-1',
    });
    v.configurePayout(config, NOW);
    expect(v.payoutConfig?.method).toBe('bank_transfer');
  });

  it('configurePayout rejects non-VO', () => {
    const v = makeVendor();
    expect(() => v.configurePayout({} as never, NOW)).toThrow();
  });
});

describe('VendorEntity — verification & featured', () => {
  it('markVerified sets isVerified', () => {
    const v = makeReconstituted('active');
    v.markVerified(NOW);
    expect(v.isVerified).toBe(true);
  });

  it('markVerified is idempotent', () => {
    const v = makeReconstituted('active');
    v.markVerified(NOW);
    const events = v.domainEvents.length;
    v.markVerified(NOW);
    expect(v.domainEvents.length).toBe(events);
  });

  it('markVerified on non-operational throws', () => {
    const v = makeVendor();
    expect(() => v.markVerified(NOW)).toThrow();
  });

  it('feature sets isFeatured', () => {
    const v = makeReconstituted('active');
    v.feature(ACTOR, NOW);
    expect(v.isFeatured).toBe(true);
  });

  it('feature is idempotent', () => {
    const v = makeReconstituted('active');
    v.feature(ACTOR, NOW);
    const events = v.domainEvents.length;
    v.feature(ACTOR, NOW);
    expect(v.domainEvents.length).toBe(events);
  });

  it('feature on non-operational throws', () => {
    const v = makeVendor();
    expect(() => v.feature(ACTOR, NOW)).toThrow();
  });

  it('unfeature sets isFeatured false', () => {
    const v = makeReconstituted('active');
    v.feature(ACTOR, NOW);
    v.unfeature(NOW);
    expect(v.isFeatured).toBe(false);
  });

  it('unfeature is idempotent when not featured', () => {
    const v = makeVendor();
    const events = v.domainEvents.length;
    v.unfeature(NOW);
    expect(v.domainEvents.length).toBe(events);
  });
});

describe('VendorEntity — tier methods', () => {
  it('upgradeTier to higher tier', () => {
    const v = makeReconstituted('active');
    v.upgradeTier(VendorTierVO.reconstitute('gold'), 'sales', NOW);
    expect(v.tier.value).toBe('gold');
  });

  it('upgradeTier to lower throws', () => {
    const v = makeReconstituted('active');
    expect(() =>
      v.upgradeTier(VendorTierVO.reconstitute('bronze'), 'x', NOW),
    ).toThrow();
  });

  it('downgradeTier to lower tier', () => {
    const v = VendorEntity.reconstitute({
      id: UUID,
      createdAt: NOW,
      updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: { ...baseProps(), tier: VendorTierVO.reconstitute('gold') },
    });
    v.downgradeTier(VendorTierVO.reconstitute('silver'), 'sales drop', NOW);
    expect(v.tier.value).toBe('silver');
  });

  it('downgradeTier to higher throws', () => {
    const v = makeReconstituted('active');
    expect(() =>
      v.downgradeTier(VendorTierVO.reconstitute('gold'), 'x', NOW),
    ).toThrow();
  });
});

describe('VendorEntity — rating & sales', () => {
  it('updateRating changes rating', () => {
    const v = makeVendor();
    v.updateRating(RatingScoreVO.create(4.5), 10, NOW);
    expect(v.rating.value).toBe(4.5);
  });

  it('updateRating rejects non-integer totalReviews', () => {
    const v = makeVendor();
    expect(() => v.updateRating(RatingScoreVO.create(4), 1.5, NOW)).toThrow();
  });

  it('recordSale adds to totals + emits event', () => {
    const v = makeReconstituted('active');
    v.recordSale('ord-1', 1000, 'BDT', NOW);
    expect(v.totalSales).toBe(1000);
    expect(v.totalOrders).toBe(1);
  });

  it('recordSale rejects non-positive amount', () => {
    const v = makeReconstituted('active');
    expect(() => v.recordSale('ord-1', 0, 'BDT', NOW)).toThrow();
    expect(() => v.recordSale('ord-1', -5, 'BDT', NOW)).toThrow();
  });

  it('recordSale on non-operational throws', () => {
    const v = makeVendor();
    expect(() => v.recordSale('ord-1', 1000, 'BDT', NOW)).toThrow();
  });

  it('recordSale auto-upgrades tier when threshold crossed', () => {
    const v = makeReconstituted('active');
    // Big sale crossing to silver threshold (100001+)
    v.recordSale('ord-1', 200000, 'BDT', NOW);
    expect(v.tier.value).not.toBe('bronze');
  });
});

describe('VendorEntity — reconstitute with version', () => {
  it('reconstitute accepts version', () => {
    const v = VendorEntity.reconstitute({
      id: UUID,
      createdAt: NOW,
      updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: baseProps(),
      version: 5,
    });
    expect(v.version).toBe(5);
  });

  it('reconstitute accepts deletedAt', () => {
    const v = VendorEntity.reconstitute({
      id: UUID,
      createdAt: NOW,
      updatedAt: NOW,
      status: VendorStatusVO.reconstitute('deleted'),
      props: baseProps(),
      deletedAt: NOW,
    });
    expect(v.deletedAt).toBe(NOW);
  });
});
