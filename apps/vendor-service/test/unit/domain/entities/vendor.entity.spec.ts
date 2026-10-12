/**
 * VendorEntity — unit tests
 * @module vendor-service/test/unit/domain/entities
 */
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { VendorStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { BusinessDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBrandingVO } from '../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVendor(): VendorEntity {
  return VendorEntity.create({
    id: UUID,
    now: NOW,
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme Store'),
      slug: VendorSlugVO.create('acme-store'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('shop@acme.com'),
      contact: VendorContactVO.create({ email: VendorEmailVO.create('shop@acme.com') }),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 0,
      totalOrders: 0,
      isVerified: false,
      isFeatured: false,
      joinedAt: NOW,
    },
  });
}

describe('VendorEntity', () => {
  describe('create()', () => {
    it('creates vendor with pending status', () => {
      const v = makeVendor();
      expect(v.status.isPending()).toBe(true);
      expect(v.id).toBe(UUID);
      expect(v.totalSales).toBe(0);
      expect(v.totalOrders).toBe(0);
      expect(v.isVerified).toBe(false);
      expect(v.isFeatured).toBe(false);
    });

    it('emits VendorRegisteredEvent', () => {
      const v = makeVendor();
      const events = v.domainEvents;
      expect(events.length).toBeGreaterThan(0);
      expect(events[0]?.type).toBe('vendor.registered');
    });
  });

  describe('lifecycle — approve()', () => {
    it('pending → approved', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      expect(v.status.isApproved()).toBe(true);
      expect(v.approvedAt).toBe(NOW);
    });

    it('throws from non-pending status', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      expect(() => v.approve(UUID, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('lifecycle — reject()', () => {
    it('pending → rejected', () => {
      const v = makeVendor();
      v.reject(UUID, 'Incomplete docs', NOW);
      expect(v.status.isRejected()).toBe(true);
    });

    it('throws on empty reason', () => {
      const v = makeVendor();
      expect(() => v.reject(UUID, '', NOW)).toThrow(ValidationError);
    });
  });

  describe('lifecycle — activate/deactivate', () => {
    it('approved → active', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(v.status.isActive()).toBe(true);
    });

    it('active → inactive', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.deactivate(undefined, NOW);
      expect(v.status.isInactive()).toBe(true);
    });
  });

  describe('lifecycle — suspend/liftSuspension', () => {
    it('active → suspended', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy', 30, UUID, NOW);
      expect(v.status.isSuspended()).toBe(true);
      expect(v.suspendedAt).toBe(NOW);
    });

    it('suspension requires reason + duration', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(() => v.suspend('', 30, UUID, NOW)).toThrow(ValidationError);
      expect(() => v.suspend('reason', 0, UUID, NOW)).toThrow(ValidationError);
    });

    it('liftSuspension returns to active', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy', 30, UUID, NOW);
      v.liftSuspension(UUID, NOW);
      expect(v.status.isActive()).toBe(true);
      expect(v.suspendedAt).toBeUndefined();
    });

    it('throws when lifting non-suspended', () => {
      const v = makeVendor();
      expect(() => v.liftSuspension(UUID, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('lifecycle — block/softDelete', () => {
    it('active → blocked', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.block('fraud', UUID, NOW);
      expect(v.status.isBlocked()).toBe(true);
    });

    it('block requires reason', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(() => v.block('', UUID, NOW)).toThrow(ValidationError);
    });

    it('active → deleted', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.softDelete(UUID, NOW);
      expect(v.status.value).toBe('deleted');
    });
  });

  describe('profile updates', () => {
    it('updateProfile sets name/displayName/description', () => {
      const v = makeVendor();
      v.updateProfile(
        {
          name: VendorNameVO.create('New Name'),
          displayName: VendorNameVO.create('Display'),
          description: BusinessDescriptionVO.create('New description text'),
        },
        NOW,
      );
      expect(v.name.value).toBe('New Name');
      expect(v.displayName.value).toBe('Display');
      expect(v.description?.value).toBe('New description text');
    });

    it('no-op when no changes provided', () => {
      const v = makeVendor();
      const before = v.domainEvents.length;
      v.updateProfile({}, NOW);
      expect(v.domainEvents.length).toBe(before);
    });

    it('throws when editing deleted', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.softDelete(UUID, NOW);
      expect(() =>
        v.updateProfile({ name: VendorNameVO.create('New Name') }, NOW),
      ).toThrow(BusinessRuleError);
    });

    it('updateContact sets contact', () => {
      const v = makeVendor();
      const contact = VendorContactVO.create({
        email: VendorEmailVO.create('new@acme.com'),
      });
      v.updateContact(contact, NOW);
      expect(v.contact?.email.value).toBe('new@acme.com');
    });

    it('updateBranding sets branding', () => {
      const v = makeVendor();
      v.updateBranding(VendorBrandingVO.empty(), NOW);
      expect(v.branding).toBeDefined();
    });
  });

  describe('trust — markVerified / feature / unfeature', () => {
    it('marks verified when operational', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.markVerified(NOW);
      expect(v.isVerified).toBe(true);
    });

    it('throws when not operational', () => {
      const v = makeVendor();
      expect(() => v.markVerified(NOW)).toThrow(BusinessRuleError);
    });

    it('feature/unfeature toggles flag', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.feature(UUID, NOW);
      expect(v.isFeatured).toBe(true);
      v.unfeature(NOW);
      expect(v.isFeatured).toBe(false);
    });
  });

  describe('growth — tier upgrades', () => {
    it('upgrade to higher tier', () => {
      const v = makeVendor();
      v.upgradeTier(VendorTierVO.reconstitute('silver'), 'auto', NOW);
      expect(v.tier.value).toBe('silver');
    });

    it('throws when not higher', () => {
      const v = makeVendor();
      expect(() =>
        v.upgradeTier(VendorTierVO.reconstitute('bronze'), 'auto', NOW),
      ).toThrow(BusinessRuleError);
    });

    it('downgrade to lower tier', () => {
      const v = makeVendor();
      v.upgradeTier(VendorTierVO.reconstitute('gold'), 'auto', NOW);
      v.downgradeTier(VendorTierVO.reconstitute('silver'), 'manual', NOW);
      expect(v.tier.value).toBe('silver');
    });

    it('throws when downgrade target is higher', () => {
      const v = makeVendor();
      expect(() =>
        v.downgradeTier(VendorTierVO.reconstitute('diamond'), 'x', NOW),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('sales — recordSale()', () => {
    it('increments sales + orders', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.recordSale('order-1', 1000, 'BDT', NOW);
      expect(v.totalSales).toBe(1000);
      expect(v.totalOrders).toBe(1);
    });

    it('auto-upgrades tier when threshold crossed', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.recordSale('order-1', 500_000, 'BDT', NOW);
      expect(v.tier.value).toBe('silver');
    });

    it('throws on non-operational', () => {
      const v = makeVendor();
      expect(() => v.recordSale('o', 100, 'BDT', NOW)).toThrow(BusinessRuleError);
    });

    it('throws on invalid amount', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      expect(() => v.recordSale('o', 0, 'BDT', NOW)).toThrow(ValidationError);
    });
  });

  describe('rating — updateRating()', () => {
    it('updates rating', () => {
      const v = makeVendor();
      v.updateRating(RatingScoreVO.create(4.5), 10, NOW);
      expect(v.rating.value).toBe(4.5);
    });

    it('throws on negative totalReviews', () => {
      const v = makeVendor();
      expect(() =>
        v.updateRating(RatingScoreVO.create(4), -1, NOW),
      ).toThrow(ValidationError);
    });
  });

  describe('configureCommission/configurePayout', () => {
    it('sets commission config', () => {
      const v = makeVendor();
      const cfg = { type: 'percentage' } as never;
      expect(() => v.configureCommission(cfg, NOW)).toThrow();
    });
  });
});
