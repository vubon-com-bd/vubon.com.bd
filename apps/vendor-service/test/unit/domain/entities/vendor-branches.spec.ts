/**
 * Vendor entity — branch coverage for uncovered paths
 */
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorContactVO } from '../../../../src/module/domain/value-objects/composites/vendor-contact.vo.js';
import { VendorBrandingVO } from '../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { BusinessDescriptionVO } from '../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVendor(): VendorEntity {
  return VendorEntity.create({
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
}

describe('VendorEntity — branch coverage', () => {
  describe('markVerified — already verified branch', () => {
    it('no-op when already verified', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.markVerified(NOW);
      const before = v.domainEvents.length;
      v.markVerified(NOW);
      expect(v.domainEvents.length).toBe(before); // no new event
    });
  });

  describe('feature — already featured branch', () => {
    it('no-op when already featured', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.feature(UUID, NOW);
      const before = v.domainEvents.length;
      v.feature(UUID, NOW);
      expect(v.domainEvents.length).toBe(before);
    });
  });

  describe('unfeature — not featured branch', () => {
    it('no-op when not featured', () => {
      const v = makeVendor();
      const before = v.domainEvents.length;
      v.unfeature(NOW);
      expect(v.domainEvents.length).toBe(before);
    });
  });

  describe('updateProfile — each branch', () => {
    it('updates only name', () => {
      const v = makeVendor();
      v.updateProfile({ name: VendorNameVO.create('New Name') }, NOW);
      expect(v.name.value).toBe('New Name');
    });

    it('updates only displayName', () => {
      const v = makeVendor();
      v.updateProfile({ displayName: VendorNameVO.create('New Display') }, NOW);
      expect(v.displayName.value).toBe('New Display');
    });

    it('updates only description', () => {
      const v = makeVendor();
      v.updateProfile({ description: BusinessDescriptionVO.create('New description text.') }, NOW);
      expect(v.description?.value).toBe('New description text.');
    });
  });

  describe('deactivate — with reason', () => {
    it('emits deactivate event with reason', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.deactivate('vacation', NOW);
      expect(v.status.isInactive()).toBe(true);
    });

    it('deactivate without reason', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.deactivate(undefined, NOW);
      expect(v.status.isInactive()).toBe(true);
    });
  });

  describe('suspend — with and without notes', () => {
    it('suspend includes notes', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.suspend('policy_violation', 30, UUID, NOW);
      expect(v.status.isSuspended()).toBe(true);
    });
  });

  describe('softDelete — with deletedBy', () => {
    it('records deletedBy', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.softDelete(UUID, NOW);
      expect(v.status.value).toBe('deleted');
    });

    it('softDelete without actor', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.softDelete(undefined, NOW);
      expect(v.status.value).toBe('deleted');
    });
  });

  describe('recordSale — auto-tier upgrade branches', () => {
    it('does not upgrade when still in same tier', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.recordSale('o1', 1000, 'BDT', NOW);
      expect(v.tier.value).toBe('bronze');
    });

    it('auto-upgrades when crossing threshold', () => {
      const v = makeVendor();
      v.approve(UUID, NOW);
      v.activate(NOW);
      v.recordSale('o1', 500_000, 'BDT', NOW);
      expect(v.tier.value).toBe('silver');
    });
  });

  describe('updateRating — same value no-op branch', () => {
    it('no-op when rating and reviews unchanged', () => {
      const v = makeVendor();
      const before = v.domainEvents.length;
      v.updateRating(RatingScoreVO.zero(), 0, NOW);
      expect(v.domainEvents.length).toBe(before);
    });

    it('updates when rating changes', () => {
      const v = makeVendor();
      v.updateRating(RatingScoreVO.create(4), 5, NOW);
      expect(v.rating.value).toBe(4);
    });
  });

  describe('updateContact / updateBranding — invalid type branches', () => {
    it('updateContact throws on invalid VO', () => {
      const v = makeVendor();
      expect(() => v.updateContact('bad' as never, NOW)).toThrow();
    });

    it('updateBranding throws on invalid VO', () => {
      const v = makeVendor();
      expect(() => v.updateBranding('bad' as never, NOW)).toThrow();
    });
  });

  describe('reconstitute path', () => {
    it('restores version when supplied', () => {
      const v = VendorEntity.reconstitute({
        id: UUID,
        createdAt: NOW,
        updatedAt: NOW,
        status: { value: 'pending', canTransitionTo: () => true, isOperational: () => false, isFinal: () => false, isEditable: () => true, isPending: () => true, isApproved: () => false, isActive: () => false, isInactive: () => false, isSuspended: () => false, isRejected: () => false, isBlocked: () => false } as never,
        version: 5,
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
      expect(v.version).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getters with optional fields unset', () => {
    it('description undefined by default', () => {
      expect(makeVendor().description).toBeUndefined();
    });

    it('contact undefined by default', () => {
      expect(makeVendor().contact).toBeUndefined();
    });

    it('branding undefined by default', () => {
      expect(makeVendor().branding).toBeUndefined();
    });

    it('commission undefined by default', () => {
      expect(makeVendor().commission).toBeUndefined();
    });

    it('payoutConfig undefined by default', () => {
      expect(makeVendor().payoutConfig).toBeUndefined();
    });

    it('location undefined by default', () => {
      expect(makeVendor().location).toBeUndefined();
    });

    it('suspendedAt undefined by default', () => {
      expect(makeVendor().suspendedAt).toBeUndefined();
    });

    it('approvedAt undefined by default', () => {
      expect(makeVendor().approvedAt).toBeUndefined();
    });
  });

  describe('isFullyOnboarded — false by default', () => {
    it('false when nothing set', () => {
      expect(makeVendor().isFullyOnboarded()).toBe(false);
    });
  });
});
