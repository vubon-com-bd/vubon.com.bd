/**
 * VendorEntity — Branch coverage: default args + edge conditions
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
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBrandingVO } from '../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { CommissionPercentVO } from '../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { VendorCommissionConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-commission-config.vo.js';
import { VendorPayoutConfigVO } from '../../../../src/module/domain/value-objects/composites/vendor-payout-config.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const ACTOR = '33333333-3333-4333-8333-333333333333';
const NOW = '2025-01-01T00:00:00.000Z';

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

function makeActive() {
  return VendorEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW,
    status: VendorStatusVO.reconstitute('active'),
    props: baseProps(),
  });
}

function makePending() {
  return VendorEntity.create({ id: UUID, now: NOW, props: baseProps() });
}

describe('VendorEntity — default `now` arg branches', () => {
  it('approve() without now uses default', () => {
    const v = makePending();
    v.approve(ACTOR);
    expect(v.status.value).toBe('approved');
  });

  it('reject() without now uses default', () => {
    const v = makePending();
    v.reject(ACTOR, 'bad docs');
    expect(v.status.value).toBe('rejected');
  });

  it('activate() without now uses default', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('approved'),
      props: baseProps(),
    });
    v.activate();
    expect(v.status.value).toBe('active');
  });

  it('deactivate() without now uses default', () => {
    const v = makeActive();
    v.deactivate('maint');
    expect(v.status.value).toBe('inactive');
  });

  it('suspend() without now uses default', () => {
    const v = makeActive();
    v.suspend('policy', 30, ACTOR);
    expect(v.status.value).toBe('suspended');
  });

  it('liftSuspension() without now uses default', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('suspended'),
      props: baseProps(),
    });
    v.liftSuspension(ACTOR);
    expect(v.status.value).toBe('active');
  });

  it('block() without now uses default', () => {
    const v = makeActive();
    v.block('fraud', ACTOR);
    expect(v.status.value).toBe('blocked');
  });

  it('softDelete() without now uses default', () => {
    const v = makeActive();
    v.softDelete(ACTOR);
    expect(v.status.value).toBe('deleted');
  });

  it('updateProfile() without now uses default', () => {
    const v = makePending();
    v.updateProfile({ name: VendorNameVO.create('New') });
    expect(v.name.value).toBe('New');
  });

  it('updateProfile() with only displayName (changes.name false branch)', () => {
    const v = makePending();
    v.updateProfile({ displayName: VendorNameVO.create('DN') }, NOW);
    expect(v.displayName.value).toBe('DN');
  });

  it('updateProfile() with all three fields', () => {
    const v = makePending();
    v.updateProfile({
      name: VendorNameVO.create('New Name'),
      displayName: VendorNameVO.create('Display Name'),
      description: BusinessDescriptionVO.create('A long description'),
    }, NOW);
    expect(v.name.value).toBe('New Name');
    expect(v.displayName.value).toBe('Display Name');
    expect(v.description?.value).toBe('A long description');
  });

  it('updateContact() without now uses default', () => {
    const v = makePending();
    const contact = VendorContactVO.create({
      email: VendorEmailVO.create('new@acme.com'),
    });
    v.updateContact(contact);
    expect(v.contact?.email.value).toBe('new@acme.com');
  });

  it('updateBranding() without now uses default', () => {
    const v = makePending();
    v.updateBranding(VendorBrandingVO.empty());
    expect(v.branding).toBeDefined();
  });

  it('configureCommission() without now uses default', () => {
    const v = makePending();
    const c = VendorCommissionConfigVO.create({
      type: 'percentage',
      percent: CommissionPercentVO.create(15),
      fixedAmount: CommissionAmountVO.zero('BDT'),
      applyOnShipping: false,
      applyOnTax: false,
      effectiveFrom: NOW,
    });
    v.configureCommission(c);
    expect(v.commission).toBeDefined();
  });

  it('configurePayout() without now uses default', () => {
    const v = makePending();
    const p = VendorPayoutConfigVO.create({
      method: 'bank_transfer',
      cycle: 'weekly',
      minAmount: PayoutAmountVO.minimum('BDT'),
      autoPayout: false,
      requireApproval: true,
      bankAccountId: 'acct-1',
    });
    v.configurePayout(p);
    expect(v.payoutConfig).toBeDefined();
  });

  it('markVerified() without now uses default', () => {
    const v = makeActive();
    v.markVerified();
    expect(v.isVerified).toBe(true);
  });

  it('feature() without now uses default', () => {
    const v = makeActive();
    v.feature(ACTOR);
    expect(v.isFeatured).toBe(true);
  });

  it('unfeature() on featured vendor without now uses default', () => {
    const v = makeActive();
    v.feature(ACTOR, NOW);
    v.unfeature();
    expect(v.isFeatured).toBe(false);
  });

  it('upgradeTier() without now uses default', () => {
    const v = makeActive();
    v.upgradeTier(VendorTierVO.reconstitute('gold'), 'sales');
    expect(v.tier.value).toBe('gold');
  });

  it('downgradeTier() without now uses default', () => {
    const v = VendorEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      status: VendorStatusVO.reconstitute('active'),
      props: { ...baseProps(), tier: VendorTierVO.reconstitute('gold') },
    });
    v.downgradeTier(VendorTierVO.reconstitute('silver'), 'drop');
    expect(v.tier.value).toBe('silver');
  });

  it('updateRating() without now uses default', () => {
    const v = makePending();
    v.updateRating(RatingScoreVO.create(4), 5);
    expect(v.rating.value).toBe(4);
  });

  it('updateRating() same rating + 0 reviews → early return', () => {
    const v = makePending();
    const before = v.domainEvents.length;
    v.updateRating(RatingScoreVO.zero(), 0, NOW);
    expect(v.domainEvents.length).toBe(before);
  });

  it('recordSale() without now uses default', () => {
    const v = makeActive();
    v.recordSale('ord-1', 500, 'BDT');
    expect(v.totalSales).toBe(500);
  });
});

describe('VendorEntity — edge branches', () => {
  it('unfeature() on non-featured vendor → early return (line 207 all false)', () => {
    const v = makeActive(); // active but not featured
    const before = v.domainEvents.length;
    v.unfeature();
    expect(v.domainEvents.length).toBe(before);
  });
});
